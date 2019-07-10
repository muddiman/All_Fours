
function initCanvas(img) {
    let canvas = document.createElement("canvas");
    canvas.id     = "videolayer";
    canvas.width  = window.innerWidth;
    canvas.height =  window.innerHeight;
    canvas.style  = "z-index = 0;";
    let ctx = canvas.getContext("2d");
    // ctx.fillStyle = "rgb(255, 0, 0)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.body.appendChild(canvas);
    if (canvas.width <= 350) {
        console.log("mobile");
    }

   var left = window.innerWidth / 2 - 125;
    document.getElementById("click").style = `left: ${left}px;`;
    
    /*  image   */
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
/*     let clip = setUpVideo();
    clip.play();
    let videoDisplayID = setInterval(() => {
        drawNewFrame(canvas, ctx, clip);
    }, 1000/15);
    clip.addEventListener("end", () => {
        clearInterval(videoDisplayID);
    }); */
}
/* 
function imageSize(params) {
    
} */
/* 
function drawNewFrame(canvas, ctx, video) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}

function setUpVideo() {
    let video = document.createElement("video");
    video.setAttribute("id", "vid1");
    let videoSource = document.createElement("source");
    videoSource.setAttribute("src", "img/vid1.mp4");
    videoSource.setAttribute("type", "video/mp4");
    video.appendChild(videoSource);
    return video;
}
 */
