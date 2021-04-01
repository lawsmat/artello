const EventEmitter = require("events");
const { AR } = require('./js-aruco2/aruco')
const POS = require("./js-aruco2/posit1")

class AlignmentController extends EventEmitter {
    /**
     * creates a new AlignmentController
     * @param {import("tello-drone")} drone Drone to send `rc` commands to.
     * @param {number} range Success range.
     * @param {number} markerSize size of markers in milimeters
     * @param {number} fl Focal length (tello: 2)
     * @param {number} speed speed that drone goes to get to position (-100 to 100) | negative values will result in failure!
     */
    constructor(drone, range, markerSize, fl, speed) {
        super()
        this.drone = drone
        this.range = range
        this.positioning = AR
        this.markerSize = markerSize
        this.detector = new AR.Detector({
            dictionaryName: "ARUCO"
        })
        // the positionator 3000
        this.positionator = new POS.Posit(markerSize,fl)
    }

    drone
    range
    detector
    markerSize
    positionator
    fl
    speed

    async travel(target) {
        if(!this.drone.connected) {
            this.emit("error")
            throw new Error("Drone not connected.")
        }
        this.emit("travelling")
        // work on the y value
        if(this.getPosition(markers).bestTranslation.y - target.y)
        await this.#send(`speed ${this.speed}`)
        await this.#send("")

        // rotate
        this.#send("rc",{
            a: 0, // left/right
            b: 0, // forward/backward
            c: 0, // up/down
            d: 0 // YAW
        })

        // forward
        this.#send("rc",{
            a: 0, // left/right
            b: 0, // forward/backward
            c: 0, // up/down
            d: 0 // YAW
        })

        // pivot
        this.#send("rc",{
            a: 0, // left/right
            b: 0, // forward/backward
            c: 0, // up/down
            d: 0 // YAW
        })
    }

    async #send(m,a) {
        await this.drone.send(m,a)
    }

    onDetect(i,ml) {
        if(ml.length == 0) return;
        this.emit("markers",ml)
    }

    streamData(d) {
        this.detector.detectStream(d)
    }

    startDetector() {
        this.detector.detectStreamInit(640,480,this.onDetect)
    }

    getPosition(markers) {
        var pose = this.positionator.pose(markers)
        return pose
    }
}

module.exports = AlignmentController