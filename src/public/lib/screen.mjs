//      /src/public/lib/screen.mjs

/*
                Title:  ALL FOURS GAME
                Language: Javascript
                Programmer: .muddicode 
                Code: Screen Class Module  (allfours.js)   
    
    DESCRIPTION:    screen module for All Fours Game
    PURPOSE:        screen class, generates new graphics screens for the game, interacts directly with the HTML5 Canvas
*/

/*  globals  */
const defaultWIDTH=700;
const defaultHEIGHT=450;
const LEFTOFFSET=15;
const TOPOFFSET=180;
const MARGIN=50;

/*  mobile width:    300,
    tablet width:    500,
    desktop/laptop width:   700,
*/

/*  screen canvas class */
export function gCanvasLayer(ID, zIndex, color) {
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
                                

//================================================================================================================================

/**
 *  @copyright (c) 2018-2019 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com  
 *  @version   0.8.7
 *  @since     2018-10-1
 *  @download  https://www.github.com/muddiman/All_Fours
 *  @license   NOT for 'commercial use'.
 *  @See:      http://www.roger-clarke.com/allfours/license.html
 *             Free to use and/or distribute for personal or academic purposes.
 *             Must site the source code using the following format at beginning or end of source code file where it was used:
 *             "Clarke, Roger A. (2018) All Fours Game (ver. 0.8.7) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman". 
 */

