const chalk = require("chalk")
const prompts = require("prompts")
const fs = require("fs").promises
const path = require("path")
const Tello = require("tello-drone")
const videou = require("./video")
const ora = require("ora")

const drone = new Tello()

async function welcome() {
    console.log(chalk.bold.blue.underline`Welcome to the Replay Center!`)
    let files = await fs.readdir(path.join(__dirname, "recordings"))
    files = files.filter((f) => f.endsWith(".json"))
    const selection = await prompts({
        type: "select",
        message: "Please select a recording from the list.",
        name: "file",
        choices: files
    })
    const file = files[selection.file]
    if(!file) {
        console.log(chalk.red.bold`No file was selected, exiting cleanly.`)
        process.exit()
    }
    console.log(chalk.blue`Selected recording: ${file}`)
    console.log(chalk.blue`Retrieving file...`)
    const rawdata = await fs.readFile(path.join(__dirname,"recordings",file))
    console.log(chalk.blue`Done, processing JSON...`)
    const data = JSON.parse(rawdata)
    console.log(chalk.green.bold`Done!`)
    if(await confirm()) {
        playRecording(data)
    }else{
        welcome()
        return;
    }
}

async function confirm() {
    const ans = await prompts([{
        type: "confirm",
        message: "Play recording?",
        name: "confirmed"
    },{
        type: "toggle",
        message: "Stream video?",
        name: "video"
    }])
    if(ans.video) {
        const spinner = ora("Starting video stream...").start()
        await startVideo()
        spinner.succeed("Video stream started, opening in browser...")
        open("http://localhost:3000/index.html")
    }
    if(ans.confirmed) {
        console.log(chalk.green`Playing recording...`)
        return true;
    }else{
        return false;
    }
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r,ms))
}

async function startVideo() {
    await videou.createServer()
    await drone.send("streamon")
    await videou.stream()
    await sleep(1000)
}

async function playRecording(data) {
    for (let i = 0; i < data.length; i++) {
        console.log(chalk.blue`Pos ${i + 1}/${data.length}`)
        const d = data[i];
        // console.log(chalk.blue.bold`Sent command: ${d.command.name} with args: ${d.command.args}`)
        drone.forceSend(d.command.name,d.command.args)
        const next = data[i+1]
        if(next) {
            await sleep(next.timestamp - d.timestamp)
        }else{
            await sleep(200)
            console.log(chalk.green.bold`Recording finished.`)
            process.exit(1)
        }
    }
}

process.on("SIGINT",() => {
    setTimeout(() => process.exit(0),500)
    drone.send("land")
    drone.send("streamoff")
})

welcome()