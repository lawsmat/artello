const EventEmitter = require("node:events");
const { AR } = require('./js-aruco2/aruco')

class AlignmentController extends EventEmitter {
    /**
     * creates a new AlignmentController
     * @param {import("tello-drone")} drone Drone to send `rc` commands to.
     * @param {number} range Success range.
     */
    constructor(drone, range) {
        super()
        this.drone = drone
        this.range = range
        this.detector = new AR.Detector()
    }

    drone
    range
    detector

    travel(current,target) {
        if(!this.drone.connected) {
            this.emit("error")
            throw new Error("Drone not connected.")
        }
        this.emit("travelling")
        // work on the y value
        if(this.getPosition())
        this.#send("rc",{
            a: 2,
            b: 3,
            c: 4,
            d: 5
        })
    }

    #send(m,a) {
        this.drone.send(m,a)
    }

    onDetect(i,ml) {
        if(ml.length == 0) return;
        this.emit("markers",ml)
    }

    streamData(d) {
        this.detector.detectStream(d)
    }

    startDetector() {
        this.detector.detectStreamInit(1280,720,this.onDetect)
    }

    getPosition() {
        var markers = this.detector.de
    }

    getImage() {

    }
}

module.exports = AlignmentController