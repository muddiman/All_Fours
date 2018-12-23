function onImageLoad(img) {
    console.log(img.id);
    //var t = new CANVAS_LAYER(700,450, 0, 'test_board');
   // t.init();
    //var tb=t.canvas;
    //var tbx=t.ctx;
    //tbx.drawImage(img, 100,100);
}



let loadFrames = function () {
    return new Promise(function (resolve, reject) {
    var frames = [];
    for (var i=0; i<7;i++) {
        frames[i] = new Image();
        frames[i].onload = console.log(frames[i].id);        //onImageLoad(frames[i]);
        frames[i].src = "img/ken-sprites/fwd_jump"+i+".png"; // assets[i];
        //var frameNo = i;
        frames.id = 'jump' + i;
    }
    if (frames.length == 7) {
     resolve(frames);
    } else {
        reject('Did not load the game images');
    }
    });
};


function test() {
    var framez=[];
    var i=0;
    var randomX = 0;
    var randomY = 0;
    // var gb=gameBoard.canvas;
   // gameBoard.init();
   /* setInterval(function() {
       //for (i=0;i<1000;i++) {
        //displayScoreboard(randomX, randomY);
        gameBoard.clearBoard();
        i++;
        displayScoreboard(randomX+i, randomY+i);
       }, 100);
    //}, 20); */
    //var mb = new CANVAS_LAYER(WIDTH, HEIGHT, "msg_board");
    //mb.init();
   // var textMsg = "Roger A. Clarke is a serious programmer.";
   // message(textMsg, mb);
    // tickertape(textMsg);
    //var a = new CANVAS_LAYER(WIDTH, HEIGHT, 0.5,"anime_board");
   // a.init();
    //var ab = a.canvas;
   // var abx = a.ctx;
    //ab.style="position: absolute; left: 0; top: 0; z-index: 1;";
    //ab.style.backgroundColor="rgba(0,0,254, 0.2)";
    gameBoard.init();
    loadFrames().then(function (resolve) {      // Loads image frames into array then displays each
        var framez = resolve;
        for (var i=0; i<7; i++) {
            //gameBoard.ctx.drawImage(framez[i], 40+(30*i), 100);    //, 330, 900);
            console.log(framez[i].id);
            setTimeout(function () {
                animate(framez, 7, 0, 400);
            }, 3000);
        }
    }).catch(function (reject){
        console.log(reject);
    });
    
   // gameBoard.ctx.drawImage(framez[1], 200, 200, 330, 900);
}

