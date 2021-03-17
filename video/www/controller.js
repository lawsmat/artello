let wsConnection = new WebSocket("ws://localhost:3002")
let color = "#00f"
let borderelm;

document.addEventListener("DOMContentLoaded",() => {
    borderelm = document.querySelector("#video-canvas")
    color = borderelm.style.color
})

wsConnection.addEventListener("open", () => {
    console.log("🕹 Controller socket connected!")
})

function flicker(ncolor) {
    var d = false
    var n = 0
    var i = setInterval(() => {
        if(!borderelm) return;
        n++
        d = !d
        borderelm.style.color = d ? color : ncolor
        if(n == 10) {
            clearInterval(i)
        }
    },200)
}

wsConnection.addEventListener("message", m => {
    if(m == "error") {
        flicker("#f00")
    }else if(m == "success") {
        flicker("#0f0")
    }
})

let speed = 75

let state = {
    strafe: 0,
    x: 0,
    y: 0,
    yaw: 0
}

function sendState() {
    if(wsConnection.readyState != WebSocket.OPEN) return;
    wsConnection.send(
        JSON.stringify({
            state
        })
    )
}

document.onkeyup = (event) => {
    if(wsConnection.readyState != WebSocket.OPEN) return;
    var key = event.key
    if(key == 'w') {
        state.x = 0
    }
    if(key == 's') {
        state.x = 0
    }
    if(key == 'a') {
        state.strafe = 0
    }
    if(key == 'd') {
        state.strafe = 0
    }
    if(key == 'q') {
        state.yaw = 0
    }
    if(key == 'e') {
        state.yaw = 0
    }
    if(key == 'r') {
        state.y = 0
    }
    if(key == 'f') {
        state.y = 0
    }
    sendState()
}

document.onkeydown = (event) => {
    if(wsConnection.readyState != WebSocket.OPEN) return;
    var key = event.key
    if(key == 'w') {
        state.x = speed
    }
    if(key == 's') {
        state.x = -speed
    }
    if(key == 'a') {
        state.strafe = -speed
    }
    if(key == 'd') {
        state.strafe = speed
    }
    if(key == 'q') {
        state.yaw = -speed
    }
    if(key == 'e') {
        state.yaw = speed
    }
    if(key == 'r') {
        state.y = speed
    }
    if(key == 'f') {
        state.y = -speed
    }
    sendState()
}
document.onkeypress = (k) => {
    if(k.key == "l") {
        wsConnection.send('land')
    }
    if(k.key == "t") {
        wsConnection.send('takeoff')
    }
    if(k.key == "o") {
        wsConnection.send('doaflip')
    }
}