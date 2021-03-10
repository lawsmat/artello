const Tello = require('tello-drone')
const chalk = require('chalk')
const ora = require('ora')
const prompts = require('prompts')
const open = require('open')
const video = require('./video')
const ws = require('ws')

const drone = new Tello()
const progress = ora("Connecting to drone...").start()


drone.on("connection",async () => {
    drone.events.setMaxListeners(Infinity)
    progress.succeed("Connected!")
    await drone.send("battery?")
    await confirm()
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
    // await takeoff()
})

async function confirm() {
    const confirmation = await prompts({
        type: 'confirm',
        name: "bool",
        message: "Take off?"
    })
    if(!confirmation.bool) {
        console.log(chalk.red`Drone takeoff cancelled.`)
        process.exit(1)
    }
}

async function takeoff() {
    progress.start("Taking off!")
    await drone.send("takeoff")
    progress.succeed("Done, have fun!")
}

process.on("SIGINT",async () => {
    if(!drone.connected) process.exit(1)
    console.log(chalk.bgRed.white`emergency landing engaged`)
    drone.send("land")
    setTimeout(() => {
        console.log(chalk.red`process exited`)
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
                drone.send('land')
                return;
            }
            if(instruction == "takeoff") {
                drone.send('takeoff')
                return;
            }
            var d = JSON.parse(instruction).state
            // drone.send(`rc`,{
            //     a: d.strafe,
            //     b: d.x,
            //     c: d.y,
            //     d: d.yaw
            // })
            drone.send(`rc`,{
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
}

drone.on('message',m => console.log(m))