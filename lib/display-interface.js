//  filename:   display-interface.js
//  path:       /lib/display-interface.js

/*
                                                Title: THE ALL FOURS GAME
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Display Interface    (custom Object Methods  that renders the game compnents on the screen)                        
*/
/*  globals */

console.log(`Reading the 'Display' script`);

// const MARGIN=5;
const scoreboardWIDTH=260;
const scoreboardHEIGHT=120;

/*  IMPORTS */
/*  the screens  */
// import { gCanvasLayer } from "./screen.mjs";
const defaultWIDTH=700;
const defaultHEIGHT=450;

/*  screen canvas class */
function gCanvasLayer(ID, zIndex, color) {
    this.width  =  Math.floor(this.scale * defaultWIDTH);   //  WIDTH;
    this.height =  Math.floor(this.scale * defaultHEIGHT);  //  HEIGHT;
    this.canvas =  document.createElement("canvas");
    this.init = function () {
        this.canvas.width  = this.width;
        this.canvas.height = this.height;
        this.canvas.id = ID;
        this.z = zIndex;
        this.color = color;
        this.canvas.setAttribute("class", "screen");
        this.ctx = this.canvas.getContext('2d');
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById(ID).style = `position: absolute; left: ${this.xOffset}px; top: ${this.yOffset}px; z-index: ${this.z}; background-color: ${this.color};`;
        console.log(`New ${this.canvas.id} canvas initialized.`);
        return this;
    };
}
/*  Prototypes  */
// universal properties
gCanvasLayer.prototype.scale    = setScale(window.innerWidth, window.innerHeight);   // 1;
gCanvasLayer.prototype.getScale = function () {
                                    return this.scale;
                                };
gCanvasLayer.prototype.xOffset  = LEFTOFFSET;  //  Math.floor(this.scale * LEFTOFFSET);
gCanvasLayer.prototype.yOffset  = TOPOFFSET;  //    Math.floor(this.scale * TOPOFFSET);
//  universal methods
gCanvasLayer.prototype.clear    = function () {
                                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                                    return this;
                                };
gCanvasLayer.prototype.clearSection  = function (x, y, width, height) {
                                    this.ctx.clearRect(this.scale * x, this.scale * y, this.scale * width, this.scale * height);
                                    return this;
                                };
gCanvasLayer.prototype.setFont  = function (fontString) {
                                     this.ctx.font = fontString;
                                     return this;
                                };
/*  the universal drawing functions    */                            
gCanvasLayer.prototype.text = function (text, color, x, y, centered) {
                                    if (centered === true){
                                        this.ctx.textAlign    = "center";
                                        this.ctx.textBaseline = "middle";
                                    }
                                    this.ctx.fillStyle = color;         //  in rgb or rgba string
                                    this.ctx.fillText(text, this.scale * x, this.scale * y);
                                    return this;
                                };
gCanvasLayer.prototype.placeImage = function (image, x, y, width, height) {
                                    this.ctx.drawImage(image, this.scale * x, this.scale * y, this.scale * width, this.scale * height);
                                    return this;
                                };
gCanvasLayer.prototype.drawRectangle = function (strokeStyle, lineWidth, x, y, width, height, color) {
                                    this.ctx.beginPath();
                                    this.ctx.lineWidth = lineWidth; //  4
                                    this.ctx.strokeStyle = strokeStyle; //  "black";
                                    this.ctx.rect(this.scale * x, this.scale * y, this.scale * width, this.scale * height);
                                    this.ctx.stroke();
                                    this.ctx.fillStyle = color;
                                    this.ctx.fillRect(this.scale * x, this.scale * y, this.scale * width, this.scale * height); 
                                    return this;
                                };
gCanvasLayer.prototype.shadow = function (color, xOffset, yOffset, blur) {
                                    this.ctx.shadowBlur = blur;
                                    this.ctx.shadowOffsetX = this.scale * xOffset;
                                    this.ctx.shadowOffsetY = this.scale * yOffset;
                                    this.ctx.shadowColor = color;
                                    return this;
                                }; 

function setScale(deviceWidth, deviceHeight) {
    let scale = 1;
    if (deviceWidth <= defaultWIDTH + MARGIN || deviceHeight <= defaultHEIGHT + MARGIN) {
        if (deviceWidth <= deviceHeight) {
            scale = deviceWidth /  (defaultWIDTH + MARGIN);
        } else { 
            scale = deviceHeight / (defaultHEIGHT + MARGIN);
        }        
    }
    console.log(`Screen Scale = ${scale}.`);
    return scale;
}
                                

/*  The Display OBJECT  */
var Display = {
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
                    // this.onMsgScreen.canvas.style.visibility = "hidden";     
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
                    // const c = this.onCardScreen.canvas;
                    // const x = this.onCardScreen.ctx;
                    const xCenter = WIDTH  / 2;
                    const yCenter = HEIGHT / 2;
                    switch (playPosition) {
                        case "left":
                            if (card) { 
                                this.onCardScreen.placeImage(card.image, xCenter - 60, yCenter - 30, CARD_W, CARD_H);
                            }
                            break;
                        case "top":
                            if (card) {
                                this.onCardScreen.placeImage(card.image, xCenter - 40, yCenter - 50, CARD_W, CARD_H);
                            }
                            break;
                        case "right":
                            if (card) {
                                this.onCardScreen.placeImage(card.image, xCenter - 20, yCenter - 30, CARD_W, CARD_H);
                            }
                            break;
                        case "bottom":
                            if (card) {
                                this.onCardScreen.placeImage(card.image, xCenter - 40, yCenter - 10, CARD_W, CARD_H);
                            }
                            break;
                        default:
                         /*    if (card) {
                                this.onCardScreen.placeImage(card.image, xCenter - 60, yCenter - 30, CARD_W, CARD_H);
                            } */
                    }
                    return this;
                },
    hand:       function (hand) {
                    // console.log(`${hand[0]}`);
                    if (hand) {
                        let coordX=0;
                        const coordY = USERHAND_Y;
                        for (let i = 0; i < hand.length; i++) {
                            // coordX = cardLocation(i, hand.length);
                            coordX = (WIDTH/2) - Math.ceil(hand.length / 2) * CARD_W/2 +  i * CARD_W/2 ;
                            // cardLocation(i, hand.length);
                            // console.log(`X: ${coordX}.  Y: ${coordY}`);
                            this.onCardScreen.placeImage(hand[i].image, coordX, coordY, CARD_W, CARD_H);
                        }
                    }
                    return this;
                },
    showcaseCard:   function (bigCard) {
                    if (bigCard) {
                        // poll the Gameboard object for a card in the select-property and displays it 1.5x its normal size
                        const c = Display.onCardScreen.canvas;
                        this.onCardScreen.placeImage(bigCard.image, WIDTH / 2 - 0.75 * CARD_W, HEIGHT - 1.5 * CARD_H, 1.5 * CARD_W, 1.5 * CARD_H);
                    }
                    return this;
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
    msgBox:     function (message) {
                    this.onMsgScreen.canvas.style.visibility = "visible";
                    this.onMsgScreen.drawImage("solid", "2px", 200, 150, 200, 150, "rgb(0, 255, 0)");
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
    // console.log(i +", "+ arrayLength);
    // let xCenter = (WIDTH/2);                      //  Display.onBackground.canvas.width/2;
    return (WIDTH/2) - Math.ceil(arrayLength / 2) * CARD_W/2 +  i * CARD_W/2;
}

/** **************************************************************************************************************************************************************
 * 
 *  @copyright (c) 2019 Roger A. Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com             (muddi@muddicode.com | rclarke@roger-clarke.com) 
 *  @version   0.9.1
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
