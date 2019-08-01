//  filename:   display-interface.mjs
//  path:       /lib/display-interface.mjs

/*
                                                Title: THE ALL FOURS GAME
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Display Interface    (Class Methods & that draws the graphics for the game)                        
*/
/*  globals */
var dWidth = 1;
var dHeight = 1;
const LEFTOFFSET=15;
const TOPOFFSET=180;
const WIDTH=700;
const HEIGHT=450;
const SCALE=scale(dWidth, dHeight);
const MARGIN=5;
const scoreboardwIDTH=260;
const scoreboardHEIGHT=120;
const OPAQUE=1.0;
const TRANSPARENT=0;
const CARD_W=72;
const CARD_H=96;
const USERHAND_Y=340;

/*  IMPORTS */
/*  the screens  */
import { gCanvasLayer } from "./screen_update.mjs";

/*  The Display OBJECT  */

export var Display = {
    onBackground:          new gCanvasLayer("game_board",    0, "rgba( 68, 102, 210, 1.0)"),
    onCardScreen:          new gCanvasLayer("card_layer",    1, `rgba(  0,   0,   0, 0.0)`),
    onMsgScreen:           new gCanvasLayer("msg_layer",     2, `rgba(255, 255, 255, 0.0)`),
    onMenuScreen:          new gCanvasLayer("menu_layer",    3, `rgba(204, 204, 204, 0.8)`),
    onVideoScreen:         new gCanvasLayer("video_screen",  5, `rgba(  0,   0,   0, 0.0)`),
    init:       function () {
                    this.onBackground.init();
                    this.onCardScreen.init();
                    this.onMsgScreen.init();
                    this.onMenuScreen.init();
                    this.onVideoScreen.init();
                    this.onVideoScreen.canvas.style.visibility = "hidden";     
                    return this;
                },
/*  methods  */
    labels:     function (hand) {
                    this.onBackground.setFont("bold 15px Arial").text("TRUMP", "rgba(254,254,254,1.0)", 15, 30 + CARD_H); 
                    for (let index = 0; index < hand.length; index++) {
                        this.onBackground.text(index + 1, "rgba(254,254,254,1.0)", cardLocation(index, hand.length)  + CARD_W / 4, HEIGHT - 2);
                    }
                    return this;
                },
    scoreboard: function (players) {
                    let c = this.onBackground.canvas;
                    const x = this.onBackground.ctx;
                    const upperLeftCornerX = c.width - scoreboardwIDTH - MARGIN;         //   (LxB: 260 x 120 box; x,y => 400,5)
                    const upperLeftCornerY = MARGIN;
                    this.onBackground.drawRectangle("black", 4, upperLeftCornerX, upperLeftCornerY, scoreboardwIDTH, scoreboardHEIGHT, "#ff0000")
                        .shadow("black", 10, 10, 40);
                    this.onBackground.setFont("bold 30px Arial")
                        .text(players.computer.name,  "#ffffff", upperLeftCornerX + 15, 40, false)
                        .text(players.human.name,     "#ffffff", upperLeftCornerX + 15, 105, false)
                        .text(players.computer.score, "#ffffff", upperLeftCornerX + 215, 40, false)      //          
                        .text(players.human.score,    "#ffffff", upperLeftCornerX + 215, 105, false);      //          
                    return this;
                },                  
    trump:      function (card) {
                    const topCornerX = MARGIN; // 5 pixels in
                    const topCornerY = MARGIN;
                    this.onBackground.placeImage(card.image, topCornerX, topCornerY, CARD_W, CARD_H); // upper left corner (x,y) => (5,5)
                    return this;
                },
    playCard:   function (playPosition, card) {
                    const c = this.onCardScreen.canvas;
                    const x = this.onCardScreen.ctx;
                    const xCenter = c.width  / 2;
                    const yCenter = c.height / 2;
                    switch (playPosition) {
                        case "left":
                            x.drawImage(card.image, xCenter - 60, yCenter - 30);
                            break;
                        case "top":
                            x.drawImage(card.image, xCenter - 40, yCenter - 50);
                            break;
                        case "right":
                            x.drawImage(card.image, xCenter - 20, yCenter - 30);
                            break;
                        case "bottom":
                            x.drawImage(card.image, xCenter - 40, yCenter - 10);
                            break;
                        default:
                            x.drawImage(card.image, xCenter - 60, yCenter - 30);
                    }
                },
    hand:       function (hand) {
                        let coordX;
                        const coordY = USERHAND_Y;
                        for (let i = 0; i < hand.length; i++) {
                            coordX = cardLocation(i, hand.length);
                            this.onCardScreen.placeImage(hand[i].image, coordX, coordY, CARD_W, CARD_H);
                        }
                        return this;
                },
    showcaseCard:   function (bigCard) {
                    // poll the Gameboard object for a card in the select-property and displays it 1.5x its normal size
                    const c = Display.onCardScreen.canvas;
                    this.onCardScreen.placeImage(bigCard.image, c.width / 2 - 0.75 * CARD_W, c.height - 1.5 * CARD_H, 1.5 * CARD_W, 1.5 * CARD_H);
                },                
                    
    message:    function (msgboard) {
                    this.onMsgScreen.canvas.style.visibility = "visible";
                    this.onMsgScreen.setFont("bold 20px Monaco")
                        .text(msgboard.text, "rgba(255, 255, 0, 1.0)", WIDTH / 2, 200, true);
                    this.onMsgScreen.canvas.addEventListener("click", this.clearMsgBoard);
                    let pauseID = setTimeout(()=>{
                        clearTimeout(pauseID);
                        this.clearMsgBoard(msgboard);
                    }, 3000);
                },
    clearMsgBoard:  function (msgboard) {
                    msgboard.init();
                    this.onMsgScreen.clear();
                    this.onMsgScreen.canvas.removeEventListener("click", this.clearMsgBoard);
                    this.onMsgScreen.canvas.style.visibility = "hidden";
                },
    menu:       function () {
                    this.onMenuScreen.setFont("70px Arial")
                        .text("Lets play", "rgba(254,254,254,1.0)", 200, 125, false )
                        .setFont("100px Arial")
                        .text("All Fours", "rgba(254,254,254,1.0)", 75, 250, false )
                        .setFont("50px Arial")
                        .text("loading...", "rgba(254,254,254,1.0)", 200, 415, false );
                },
    video:      function (videoclip) {
                    const vWidth = 960/2;                     //  size(33%)
                    const vHeight = 540/2;                    //  position
                    const posX = WIDTH/2 - vWidth/2;          //  center of board
                    const posY = HEIGHT/2 - vHeight/2;
                    videoclip.addEventListener("play", () => {
                        videoclip.addEventListener("end", () => {
                                                            clearInterval(intervalID);
                                                            this.removeVideo(videoclip);
                                                        });
                        this.onVideoScreen.canvas.addEventListener('click', () => {
                                                                                        clearInterval(intervalID);
                                                                                        this.removeVideo(videoclip);
                                                                                    });
                                            });
                    let intervalID = setInterval(() => {      
                        this.onVideoScreen.clear();
                        this.onVideoScreen.shadow("rgba(0, 0, 0, 0.7)", 10, 15 ,10);
                        this.onVideoScreen.placeImage(videoclip, posX, posY, vWidth, vHeight); 
                        this.onVideoScreen.setFont('50px serif');
                        let centerX = WIDTH / 2; //  - Number(textSize.width) / 2;
                        this.onVideoScreen.text('Hang Jack!!!', 'rgb(255, 255, 255)', centerX, HEIGHT / 2, true);     
                    }, 1000/15);
                    this.onVideoScreen.canvas.style.visibility = "visible";    
                    videoclip.play();
                }, 
    removeVideo: function (videoclip) {
                    videoclip.pause();
                    this.onVideoScreen.clear();
                    this.onVideoScreen.canvas.removeEventListener('click', () => {
                                                                                    removeVideo(videoclip);
                                                                                    clearInterval(intervalID);
                                                                                });
                    videoclip.removeEventListener('end', () => {
                                                                                    removeVideo(videoclip);
                                                                                    clearInterval(intervalID);
                                                                                });
                    this.onVideoScreen.canvas.style.visibility = "hidden";    
                },            
};

function scale(device_width, device_height) {
    let scale_factor = 1;
    if (device_width <= device_height) {
        scale_factor = WIDTH / device_width;
    } else {
        scale_factor = HEIGHT / device_height;
    }
    return scale_factor;
}

function displayCardCache() {
    for (card in gCardImageCacheObj) {
        console.log(`${card} : ${gCardImageCacheObj[card].id}`);
    }
}

function emphasizeTrump() {
    /* displays an oversize trumpcard for two secs  */
    let bigCard = Game.Components.deck.trump;
    let gsx = Game.Screens.gameScreen.ctx;
    let posX = 5;
    let posY = 5;
    gsx.drawImage(bigCard.image, posX, posY, 1.5 * CARD_W, 1.5 * CARD_H);
}

function rotateImage(img, x, y, angle) {
    Game.Screens.gameScreen.ctx.save();

    Game.Screens.gameScreen.ctx.translate(x, y);
    Game.Screens.gameScreen.ctx.rotate(angle * this.CONVERT_TO_RADIANS);

    Game.Screens.gameScreen.ctx.drawImage(img,
        -(img.width / 2),
        -(img.height / 2));
    Game.Screens.gameScreen.ctx.restore();
}

function selectCard(player) {
    let hand = player.hand;
    let card = hand[0];
    let image = card.image;
    let c = Game.Screens.gameScreen.canvas;
    let gsx = Game.Screens.gameScreen.ctx;
    // let cardImgs = gCardImageCacheObj['jh'];
    gsx.drawImage(image, 350, 300, 1.5 * CARD_W, 1.5 * CARD_H); //, 142, 192);
    // cardLayer.ctx.scale(2,2);
}

function enlargeCard(cardNo) {
    let hand = player.hand;
    let card = hand[cardNo];
    let image = card.image;
    let c = Game.Screens.gameScreen.canvas;
    let gsx = Game.Screens.gameScreen.ctx;
    // let cardImgs = gCardImageCacheObj['jh'];
    gsx.drawImage(image, 350, 300, 1.5 * CARD_W, 1.5 * CARD_H); //, 142, 192);
    // cardLayer.ctx.scale(2,2);
}

function acquireImage() {
    let x = Game.Screens.gameScreen.ctx;
    let imgData = x.getImageData(5, 5, CARD_W, CARD_H); // capture image from gameboard
    x.putImageData(imgData, 200, 200); // place captured image info elsewhere
    if (x.getImageData(200, 200, CARD_W, CARD_H)) {
        return console.log('Pass: image object exists.');
    } else {
        return console.log('Fail: image object does NOT exist!');
    }
}

function clearMsgBoard() { // garbage collection
    // Game.Components.Sound.cardSlideSnd.play();
    Game.Components.msgboard.init();
    document.getElementById("msg_layer").removeEventListener("click", clearMsgBoard);
    document.getElementById("msg_layer").style.visibility = "hidden";
}

function gameMenu() {
    // pass;
    // menuLayer.init();
}

function removeGameMenu() {
    document.getElementById('menu_layer').style.visibility = "hidden";
}

function cleanBoard() {
    var c = Game.Background.ctx;
    Game.Background.clear();
    // c.clearRect(170, 100, 400, 200);
}

function cardLocation(i, arrayLength) {
    let xCenter = Display.onBackground.canvas.width/2;
    let xLocation = xCenter - Math.ceil(arrayLength / 2) * CARD_W/2 +  i * CARD_W/2 ;
    return xLocation; 
}
/** **************************************************************************************************************************************************************
 * 
 *  @copyright (c) 2019 Roger A. Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com             (muddi@muddicode.com | rclarke@roger-clarke.com) 
 *  @version   0.8.6
 *  @since     2019-02-7
 *  @download  https://www.github.com/muddiman/AllFours
 *  @license   NOT for 'commercial use', otherwise free to use, free to distribute
 *  @See:      http://www.roger-clarke.com/Matrix/license.html
 *             Free to use and/or distribute for personal or academic purposes.
 *             Must site the source code using the following format at beginning or end of source code file where it was used (in whole or part):
 *             "Clarke, Roger A. (2019) All Fours Game (ver. 1.0.0) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman". 
 * 
***************************************************************************************************************************************************************************************** */
