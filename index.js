const Tello = require('tello-drone')
const chalk = require('chalk')
const ora = require('ora')
const prompts = require('prompts')
const open = require('open')
const video = require('./video')
const ws = require('ws')
const fs = require("fs").promises
const path = require('path')

const drone = new Tello()
const progress = ora("Connecting to drone...").start()

drone.events.setMaxListeners(Infinity)

let recording = false;
let starttime
let output = []
let file = path.join(__dirname,"recordings","latest.json")

function getTimestamp() {
    return Date.now() - starttime
}

async function sendCommand(c,a) {
    if(recording) {
        output.push(
            {
                timestamp: getTimestamp(),
                command: {
                    name: c,
                    args: a
                }
            }
        )
    }
    await drone.forceSend(c,a)
}

drone.on("connection",async () => {
    drone.events.setMaxListeners(Infinity)
    progress.succeed("[!] Connected!")
    await drone.send("battery?")
    recording = await confirm()
    progress.start("📹 Beginning video stream...")
    await video.createServer()
    await drone.send('streamon')
    // await new Promise(r => setTimeout(r,3000))
    await video.stream()
    progress.text = "🚀 Starting HTTP server..."
    open("http://localhost:3000/index.html")
    progress.text = "🕹 Starting control server..."
    await controlServer()
    progress.succeed("Started control server, have fun!")
    console.log(chalk.green.bold`The drone is ready!`)
    starttime = Date.now()
})

async function confirm() {
    const confirmation = await prompts({
        type: 'confirm',
        name: "bool",
        message: "Record this flight?"
    })
    if(!confirmation.bool) {
        console.log(chalk.red`[R] Recording disabled.`)
        return false;
    }else{
        console.log(chalk.green`[R] Recording enabled!`)
        return true;
    }
}

process.on("SIGINT",async () => {
    if(!drone.connected) process.exit(1)
    sendCommand("land")
    drone.send("streamoff")
    if(recording) {
        console.log(chalk.yellow.bold`[R] Saving recording...`)
        await fs.writeFile(file,JSON.stringify(output))
        console.log(chalk.green.bold`[R] Recording saved!`)
    }
    console.log(chalk.bgRed.white`[!] emergency landing engaged`)
    setTimeout(() => {
        console.log(chalk.red`[!] process exited`)
        process.exit()
    }, 3000);
})

async function controlServer() {
    const server = new ws.Server({
        port: 3002
    },() => {
        return;
    })

    server.on("connection",(c) => {
        console.log(chalk.bold`🕹 Control server connection!`)
        c.on("message",(instruction) => {
            if(instruction == "land") {
                sendCommand('land')
                return;
            }
            if(instruction == "takeoff") {
                sendCommand('takeoff')
                return;
            }
            if(instruction == "doaflip") {
                sendCommand('flip f')
                return;
            }
            var d = JSON.parse(instruction).state
            sendCommand(`rc`,{
                a: d.yaw,
                b: d.x,
                c: d.y,
                d: d.strafe
            })
        })
        c.on("close",() => {
            console.log(chalk.bold`🕹 Control server disconnect.`)
        })
    })
    return server;
}

drone.on('message',m => {
    console.log(m)
    if(typeof wserver != "undefined") return;
    if(m == "error") {
        wserver
    }
})