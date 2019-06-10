//  filename:   display-interface.mjs
//  path:       /lib/display-interface.mjs

/*
                                                Title: THE ALL FOURS GAME
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Display Interface    (Class Methods & that draws the graphics for the game)                        
*/

/*  IMPORTS */
/*  import screens  */
import { gCanvasLayer } from "./lib/screen.mjs";

/*  CLASSES */
/*  OJECTS  */
var Game = {
    Background: {},
    Screens:    {}
};

export var Display = {
    labels:      function () {
                    // let c=Game.Background.canvas;
                    let bgx = Game.Background.ctx;
                    bgx.setFont("15px Arial");
                    // bgx.font = "15px Arial";
                    bgx.fillStyle = "rgba(254,254,254,1.0)"; // white, opaque
                    //  Game.Background.display.setFillStyle("rgba(255,255,255,1.0");
                    let labelUserCards = "1     2       3       4       5       6";
                    bgx.fillText("TRUMP", 15, 30 + CARD_H); // user keyboard play labels
                    bgx.fillText(labelUserCards, 134 + CARD_W / 4, HEIGHT - 2); // trump label
                },
    
    userCard:   function () {
                    playCard('bottom', Game.Components.gameboard.user);
                },
    computerCard:   function () {
                    playCard('top', Game.Components.gameboard.computer);
                },
    trump:      function (trump) {
                    let topCornerX = 5; // 5 pixels in
                    let topCornerY = 5;
                    let gbx = Game.Background.ctx;
                    gbx.drawImage(trump.image, topCornerX, topCornerY); // upper left corner (x,y) => (5,5)
                },
    playerHand: function (player) {
                    return new Promise(function (resolve) {
                        let c = Game.Screens.gameScreen.canvas;
                        let x = Game.Screens.gameScreen.ctx;
                        let xCenter = c.width / 2;
                        // let coordX = xCenter - Math.ceil(player.hand.length / 2) + i * CARD_W / 2;
                        let coordY = 340;
                        for (let i = 0; i < player.hand.length; i++) {
                            //x.drawImage(player.hand[i].image, xCenter - (CARD_W*(6-i)/2), 340, CARD_W, CARD_H); // display cards on the game board 
                            let coordX = xCenter - Math.ceil(player.hand.length / 2) + i * CARD_W / 2;       // playCard('left', player.hand[i]);
                            x.drawImage(player.hand[i].image, coordX, coordY, CARD_W, CARD_H);
                        }
                    });
                },
    score:      function (scoreboard) {
                    var c = Game.Background.canvas;
                    var x = Game.Background.ctx;
                    var upperLeftCornerX = c.width - 265; //   (LxB: 260 x 120 box; x,y => 400,5)
                    var upperLeftCornerY = 5;
                    var width = 260;
                    var height = 120;
                    x.beginPath();
                    x.lineWidth = 4;
                    x.strokeStyle = "black";
                    x.rect(upperLeftCornerX, upperLeftCornerY, width, height);
                    x.stroke();
                    // fill rectangle
                    x.shadowBlur = 40;
                    x.shadowOffsetX = 10;
                    x.shadowOffsetY = 10;
                    x.shadowColor = "black";
                    x.fillStyle = "#ff0000"; // red
                    x.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
                    // text
                    x.fillStyle = "#ffffff"; // white
                    x.font = "30px Arial";
                    x.fillText(Game.Player.computer.name, upperLeftCornerX + 15, 40);
                    x.fillText(Game.Player.human.name, upperLeftCornerX + 15, 105);
                    // score tiles (numbers)
                    x.fillText(Game.Player.computer.score, upperLeftCornerX + 215, 40);
                    x.fillText(Game.Player.human.score, upperLeftCornerX + 215, 105);
                },
    message:    function () {
                    document.getElementById("msg_layer").style.visibility = "visible";
                    var m = Game.Screens.msgScreen.canvas;
                    var c = Game.Screens.msgScreen.ctx;
                    c.beginPath();
                    c.lineWidth = 2;
                    c.strokeStyle = "black";
                    c.rect(170, 100, 400, 200);
                    c.stroke();
                    //c.globalAlpha=0.4;
                    c.fillStyle = "rgba(0,0,0, 0.0)"; // black, transparent
                    c.fillRect(170, 100, 400, 200);
                    // c.globalAlpha=0.1;
                    c.font = "60px Monaco";
                    c.fillStyle = "rgba(255,255,0,1.0)"; // white
                    // let msgText = msgboard.text;
                    c.fillText(Game.Components.msgboard.text, 200, 200);
                    document.getElementById("msg_layer").addEventListener("click", clearMsgBoard);
                    let pause = setTimeout(clearMsgBoard, 3000);
                }
};


function displayCardCache() {
    for (card in gCardImageCacheObj) {
        console.log(`${card} : ${gCardImageCacheObj[card].id}`);
    }
}

//  labels on game objects in the Background                                                         

/* 
function displayUserCard() {
    playCard('bottom', Game.Components.gameboard.user);
}

function displayComputerCard() {
    playCard('top', Game.Components.gameboard.computer);
}
 */
function displayShowcaseCard() {
    // poll the Gameboard object for a card in the select-property and displays it 1.5x its normal size
    let bigCard = Game.Components.gameboard.select;
    let c = Game.Screens.gameScreen.canvas;
    let gsx = Game.Screens.gameScreen.ctx;
    gsx.drawImage(bigCard.image, WIDTH / 2 - 0.75 * CARD_W, HEIGHT - 1.5 * CARD_H, 1.5 * CARD_W, 1.5 * CARD_H);
}

function emphasizeTrump() {
    // displays an oversize trumpcard for two secs
    let bigCard = Game.Components.deck.trump;
    let gsx = Game.Screens.gameScreen.ctx;
    let posX = 5;
    let posY = 5;
    gsx.drawImage(bigCard.image, posX, posY, 1.5 * CARD_W, 1.5 * CARD_H);
}

/**  
 * place a card around the center of the gameBoard
 * @param card object
 * @param playPosition --Position relative to the center of the gameboard
 * @returns: void
 */
function playCard(playPosition, card) {
    var c = Game.Screens.gameScreen.canvas;
    var x = Game.Screens.gameScreen.ctx;
    var xCenter = c.width / 2;
    var yCenter = c.height / 2;
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
    // Game.Components.Sound.cardSlideSnd.play();
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

function mouseOver(e) {
    let canvasX = e.clientX - LEFTOFFSET;
    let canvasY = e.clientY - TOPOFFSET;
    let n = null; //  n --> cardNumber
    let p = canvasX - 160; //  p --> position
    if (canvasY > 350 && canvasY < 450) {
        switch (true) {
            case (p < 36):
                n = 0;
                break;
            case (p < 72):
                n = 1;
                break;
            case (p < 108):
                n = 2;
                break;
            case p < 144:
                n = 3;
                break;
            case p < 180:
                n = 4;
                break;
            case (p < 252):
                n = 5;
                break;
            default:
                n = 'Out of Range'; // change to zero from  null; 
        }
    }
    enlargeCard(n);
}


/**
 * 
 * @param {object} player object
 */


/**
 * Displays the kickcard/trump in the top left corner of the gameboard
 * @param {*} trump -Card
 * @returns void 
 */
/* function displayTrump(trump) {
    let topCornerX = 5; // 5 pixels in
    let topCornerY = 5;
    let gbx = Game.Background.display.ctx;
    gbx.drawImage(trump.image, topCornerX, topCornerY); // upper left corner (x,y) => (5,5)
}
 */
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

/**
 * draws score on the gameboard
 * @param {object} a Team A's current score - int
 * @param {object} b Team B's current score - int
 * @returns void
 */


Game.Background.display = new gCanvasLayer("game_board", LEFTOFFSET, TOPOFFSET, WIDTH, HEIGHT, OPAQUE,     0, 68, 102,    0);
Game.Screens = {
    gameScreen  : null,         //  new gCanvasLayer("cards_layer",LEFTOFFSET, TOPOFFSET, WIDTH, HEIGHT, TRANSPARENT,  1,     255, 255, 255),
    menuScreen  : new gCanvasLayer("menu_layer",   LEFTOFFSET, TOPOFFSET, WIDTH + 5, HEIGHT + 5, 0.8,         3, 204, 204, 204),
    msgScreen   : new gCanvasLayer("msg_layer",    LEFTOFFSET, TOPOFFSET, WIDTH + 5, HEIGHT + 5, TRANSPARENT, 2, 255, 255, 255),
    pauseScreen : new gCanvasLayer("pause_screen", LEFTOFFSET, TOPOFFSET, WIDTH + 5, HEIGHT + 5, 0.6,         4, 204, 204, 204),
    videoScreen : new gCanvasLayer("video_screen", LEFTOFFSET, TOPOFFSET, WIDTH + 5, HEIGHT + 5, TRANSPARENT, 5,   0,   0,   0),  
};

Game.Screens.gameScreen = {                                                               //  Object: cardLayer --> TODO: turn into a "class"
    canvas: document.createElement("canvas"),
    init: function () {
        this.canvas.width  = WIDTH;
        this.canvas.height = HEIGHT;
        this.canvas.id = "card_layer";
        this.ctx = this.canvas.getContext("2d");
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById("card_layer").style = "position: absolute; left: " + LEFTOFFSET + "px; top:  " + TOPOFFSET + "px; z-index: 1; background-color: rgba(255, 255, 255," + TRANSPARENT + ");";
        console.log(`New ${this.canvas.id} canvas initialized.`);
    },
    clear: function () {                                                        // wipes the entire card screen clean
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
};

/** **************************************************************************************************************************************************************
 * 
 *  @copyright (c) 2019 Roger A. Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com             (muddi@muddicode.com | rclarke@roger-clarke.com) 
 *  @version   0.7.1
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
