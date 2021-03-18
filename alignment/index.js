const EventEmitter = require("node:events");
const { AR } = require('./js-aruco2/aruco')
const POS = require("./js-aruco2/posit1")

class AlignmentController extends EventEmitter {
    /**
     * creates a new AlignmentController
     * @param {import("tello-drone")} drone Drone to send `rc` commands to.
     * @param {number} range Success range.
     * @param {number} markerSize size of markers in milimeters
     * @param {number} fl Focal length (tello: 2)
     */
    constructor(drone, range, markerSize, fl) {
        super()
        this.drone = drone
        this.range = range
        this.positioning = AR
        this.markerSize = markerSize
        this.detector = new AR.Detector()
        // the positionator 3000
        this.positionator = new POS.Posit(markerSize,fl)
    }

    drone
    range
    detector
    markerSize
    positionator
    fl

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
        this.getPosition()
    }

    streamData(d) {
        this.detector.detectStream(d)
    }

    startDetector() {
        this.detector.detectStreamInit(1280,720,this.onDetect)
    }

    getPosition(markers) {
        
    }

    getImage() {

    }
}

module.exports = AlignmentController