var detector = new AR.Detector()
var area
var acanvas 
var video
var vctx 
var context

document.addEventListener("DOMContentLoaded",() => {
    area = document.querySelector("#aruco-area")
    acanvas = document.querySelector("#aruco-canvas")
    video = document.querySelector("#video-canvas")
    vctx = video.getContext("2d")
    console.log(vctx,video)
    context = acanvas.getContext("2d")
    requestAnimationFrame(tick)
})

function tick() {
    acanvas.height = video.height
    acanvas.width = video.width
    var vd = vctx.getImageData(0,0,video.width,video.height)
    var markers = detector.detect(vd)
    if(markers.length == 0) {
        area.style.display = "none"
        return;
    }else{
        area.style.display = "block"
    }

    drawCorners(markers)
    drawId(markers)
}

function drawCorners(markers){
    var corners, corner, i, j;

    context.lineWidth = 3;

    for (i = 0; i !== markers.length; ++ i){
        corners = markers[i].corners;
        
        context.strokeStyle = "red";
        context.beginPath();
        
        for (j = 0; j !== corners.length; ++ j){
        corner = corners[j];
        context.moveTo(corner.x, corner.y);
        corner = corners[(j + 1) % corners.length];
        context.lineTo(corner.x, corner.y);
        }

        context.stroke();
        context.closePath();
        
        context.strokeStyle = "green";
        context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
    }
}

function drawId(markers){
    var corners, corner, x, y, i, j;

    context.strokeStyle = "blue";
    context.lineWidth = 1;

    for (i = 0; i !== markers.length; ++ i){
        corners = markers[i].corners;
        
        x = Infinity;
        y = Infinity;
        
        for (j = 0; j !== corners.length; ++ j){
        corner = corners[j];
        
        x = Math.min(x, corner.x);
        y = Math.min(y, corner.y);
        }

        context.strokeText(markers[i].id, x, y)
    }
}
