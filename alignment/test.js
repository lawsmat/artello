const Drone = require("tello-drone");
const AlignmentController = require(".");
const vid = require("../video")

const d = new Drone()

const controller = new AlignmentController(null,5,100,2,20)

d.on("connection",async () => {
    controller.on("marker",(d) => console.log(d))

    await controller.startDetector()
    await d.send("streamon")
    await new Promise((e) => setTimeout(() => e(),2000))
    await vid.stream()
    await new Promise((e) => setTimeout(() => e(),4000))
    await vid.createServer(controller)
})