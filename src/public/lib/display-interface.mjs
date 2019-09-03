//  filename:   display-interface.mjs
//  path:       /lib/display-interface.mjs

/*
                                                Title: THE ALL FOURS GAME
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Display Interface    (custom Object Methods  that renders the game compnents on the screen)                        
*/
/*  globals */
// const LEFTOFFSET=15;
// const TOPOFFSET=180;
const WIDTH=700;
const HEIGHT=450;
// const devWidth=window.innerWidth;
// const devHeight=window.innerHeight;

const MARGIN=5;
const scoreboardWIDTH=260;
const scoreboardHEIGHT=120;
// const OPAQUE=1.0;
// const TRANSPARENT=0;
const CARD_W=72;
const CARD_H=96;
export const USERHAND_Y=340;
// var displayScale = scale(devWidth, devHeight);
/* const gameWIDTH  = Math.floor(displayScale * devWidth);
const gameHEIGHT = Math.floor(displayScale * devHeight);
const gameMARGIN = Math.floor(displayScale * MARGIN);
const gameLEFTOFFSET = Math.floor(displayScale * LEFTOFFSET);
const gameTOPOFFSET = Math.floor(displayScale * TOPOFFSET);
const gameCARD_W = Math.floor(displayScale * CARD_W);
const gameCARD_H = Math.floor(displayScale * CARD_H);
const gameUSERHAND_Y = Math.floor(displayScale * USERHAND_Y);
const gameScoreboardWIDTH = Math.floor(displayScale * scoreboardWIDTH);
const gameScoreboardHEIGHT = Math.floor(displayScale * scoreboardHEIGHT); */

/*  IMPORTS */
/*  the screens  */
import { gCanvasLayer } from "./screen.mjs";

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
                    let fontSize = Math.floor(this.onBackground.scale * 15);    
                    this.onBackground.setFont(`bold ${fontSize}px Arial`).text("TRUMP", "rgba(254,254,254,1.0)", 15, 30 + CARD_H); 
                    for (let index = 0; index < hand.length; index++) {
                        this.onBackground.text(index + 1, "rgba(254,254,254,1.0)", cardLocation(index, hand.length)  + CARD_W / 4, HEIGHT - 2);
                    }
                    return this;
                },
    scoreboard: function (players) {
                    let c = this.onBackground.canvas;
                    const x = this.onBackground.ctx;
                    const upperLeftCornerX = WIDTH - scoreboardWIDTH - MARGIN;         //   (LxB: 260 x 120 box; x,y => 400,5)
                    const upperLeftCornerY = MARGIN;
                    this.onBackground.drawRectangle("black", 4, upperLeftCornerX, upperLeftCornerY, scoreboardWIDTH, scoreboardHEIGHT, "#663300")
                        .shadow("black", 10, 10, 40);
                    let fontSize = Math.floor(this.onBackground.scale * 30);    
                    this.onBackground.setFont(`bold ${fontSize}px Arial`)
                        .text(players.computer.name,  "#ffffff", upperLeftCornerX + 15, 40, false)
                        .text(players.human.name,     "#ffffff", upperLeftCornerX + 15, 105, false)
                        .text(players.computer.score, "#ffffff", upperLeftCornerX + 215, 40, false)               
                        .text(players.human.score,    "#ffffff", upperLeftCornerX + 215, 105, false);               
                    return this;
                }, 
    adbox:      function (adImage) {
                    const x = 2 * MARGIN;
                    const y = HEIGHT - 2 * MARGIN - CARD_H;
                    const adWidth  = CARD_H;
                    const adHeight = CARD_H;
                    this.onBackground.drawRectangle("white", 3, x, y, adWidth, adHeight, "rgba(0, 0, 0, 0)")
                    .shadow("black", 10, 10, 40); 
                    this.onBackground.placeImage(adImage, x+2, y+2, adWidth-4, adHeight-4);                  
                },                             
    trump:      function (card) {
                    const topCornerX = MARGIN;      // 5 pixels in
                    const topCornerY = MARGIN;
                    this.onBackground.placeImage(card.image, topCornerX, topCornerY, CARD_W, CARD_H); // upper left corner (x,y) => (5,5)
                    return this;
                },
    playCard:   function (playPosition, card) {
                    const c = this.onCardScreen.canvas;
                    const x = this.onCardScreen.ctx;
                    const xCenter = WIDTH  / 2;
                    const yCenter = HEIGHT / 2;
                    switch (playPosition) {
                        case "left":
                            this.onCardScreen.placeImage(card.image, xCenter - 60, yCenter - 30, CARD_W, CARD_H);
                            break;
                        case "top":
                            this.onCardScreen.placeImage(card.image, xCenter - 40, yCenter - 50, CARD_W, CARD_H);
                            break;
                        case "right":
                            this.onCardScreen.placeImage(card.image, xCenter - 20, yCenter - 30, CARD_W, CARD_H);
                            break;
                        case "bottom":
                            this.onCardScreen.placeImage(card.image, xCenter - 40, yCenter - 10, CARD_W, CARD_H);
                            break;
                        default:
                            this.onCardScreen.placeImage(card.image, xCenter - 60, yCenter - 30, CARD_W, CARD_H);
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
                    this.onCardScreen.placeImage(bigCard.image, WIDTH / 2 - 0.75 * CARD_W, HEIGHT - 1.5 * CARD_H, 1.5 * CARD_W, 1.5 * CARD_H);
                },                                   
    message:    function (msgboard) {
                    this.onMsgScreen.canvas.style.visibility = "visible";
                    let fontSize = Math.floor(this.onBackground.scale * 20);    
                    this.onMsgScreen.setFont(`bold ${fontSize}px Monaco`);
                     for (let i=0;i<msgboard.text.length;i++) {
                         this.onMsgScreen.text(msgboard.text[i], "rgba(0, 255, 0, 1.0)", (WIDTH / 2), 200 + i*25, true);
                    }
                        // .text(msgboard.text, "rgba(255, 255, 0, 1.0)", WIDTH / 2, 200, true);
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
                    let fontSize = Math.floor(this.onBackground.scale * 30);    
                    let fontSize1 = Math.floor(this.onBackground.scale * 100);    
                    let fontSize2 = Math.floor(this.onBackground.scale * 50);    
                    this.onMenuScreen.setFont(`${fontSize}px Arial`)
                        .text("Lets play", "rgba(254,254,254,1.0)", 200, 125, false )
                        .setFont(`${fontSize1}px Arial`)
                        .text("All Fours", "rgba(254,254,254,1.0)", 75, 250, false )
                        .setFont(`${fontSize2}px Arial`)
                        .text("loading...", "rgba(254,254,254,1.0)", 200, 415, false );
                },
    video:      function (videoclip) {
                    const vWidth = 960/2;                     //  size(50%)
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
                        let fontSize = Math.floor(this.onBackground.scale * 50);    
                        this.onVideoScreen.setFont(`${fontSize}px serif`);
                        let centerX = WIDTH / 2;                //  - Number(textSize.width) / 2;
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

function cardLocation(i, arrayLength) {
    let xCenter = WIDTH/2;                      //  Display.onBackground.canvas.width/2;
    let xLocation = xCenter - Math.ceil(arrayLength / 2) * CARD_W/2 +  i * CARD_W/2 ;
    return xLocation; 
}

/** **************************************************************************************************************************************************************
 * 
 *  @copyright (c) 2019 Roger A. Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com             (muddi@muddicode.com | rclarke@roger-clarke.com) 
 *  @version   0.9.0
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
