const Drone = require("tello-drone");
const AlignmentController = require(".");
const vid = require("../video")
const canvas = require("canvas")

const d = new Drone()

const controller = new AlignmentController(null,5,100,2,20)

// d.on("connection",async () => {
async function a(e) {
    controller.on("markers",(d) => console.log(d))

    controller.startDetector()
    // await d.send("streamon")
    await new Promise((e) => setTimeout(() => e(),2000))
    await vid.stream()
    await new Promise((e) => setTimeout(() => e(),4000))
    await vid.createServer()
}

a()