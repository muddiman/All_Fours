//      /src/public/lib/screen_update.mjs

/*
                Title:  ALL FOURS GAME
                Language: Javascript
                Programmer: .muddicode 
                Code: Screen Class Module  (allfours.js)   
    
    DESCRIPTION:    screen module for All Fours Game
    PURPOSE:        screen class, generates new screens for all fours game, hides all canvas methods
*/

/*  globals  */
const defaultWIDTH=700;
const defaultHEIGHT=450;
const LEFTOFFSET=15;
const TOPOFFSET=180;

/* mobile width:
    tablet width:
    desktop/laptop width:
*/

var viewportWIDTH = window.innerWidth;
var viewportHEIGHT= window.innerHeight;
var WIDTH;
var HEIGHT;
export var RATIO;

(function () {
    switch (viewportWIDTH) {
        case viewportWIDTH < 450:
            WIDTH=300;
            break;
        case viewportWIDTH > 450 && viewportWIDTH < 750:
            WIDTH=450;
            break;
        case viewportWIDTH > 750:
            WIDTH=700;
            break;
        default:
            break;
    }
    RATIO=(WIDTH / defaultWIDTH);
    HEIGHT = Math.floor((WIDTH / defaultWIDTH) * defaultHEIGHT);
})();

/*  screen canvas class */
export function gCanvasLayer(ID, Z, color) {
    this.canvas = document.createElement("canvas");
    this.init = function () {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.id = ID;
        this.canvas.setAttribute("class", "screen");
        this.ctx = this.canvas.getContext('2d');
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById(ID).style = `position: absolute; left: ${this.xOffset}px; top: ${this.yOffset}px; z-index: ${Z}; background-color: ${color});`;
        console.log(`New ${this.canvas.id} canvas initialized.`);
        return this;
    };
}
/*  Prototypes  */
//  universal properties
gCanvasLayer.prototype.width    = WIDTH;
gCanvasLayer.prototype.height   = HEIGHT;
gCanvasLayer.prototype.xOffset  = LEFTOFFSET;
gCanvasLayer.prototype.yOffset  = TOPOFFSET;
//  universal methods
gCanvasLayer.prototype.clear    = function () {
                                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                                    return this;
                                };
gCanvasLayer.prototype.clearSection    = function (x, y, width, height) {
                                    this.ctx.clearRect(x, y, width, height);
                                    return this;
                                };
gCanvasLayer.prototype.setFont  = function (fontString) {
                                     this.ctx.font = fontString;
                                     return this;
                                };
/*  drawing functions    */                            
gCanvasLayer.prototype.text = function (text, color, x, y) {
                                    this.ctx.fillStyle = color;         //  in rgb or rgba string
                                    this.ctx.fillText(text, x, y);
                                    return this;
                                };
gCanvasLayer.prototype.image = function (image, x, y, width, height) {
                                    this.ctx.drawImage(image, x, y, width, height);
                                    return this;
                                };
//================================================================================================================================

/**
 *  @copyright (c) 2018 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com  
 *  @version   0.8.3
 *  @since     2018-10-1
 *  @download  https://www.github.com/muddiman/All_Fours
 *  @license   NOT for 'commercial use'.
 *  @See:      http://www.roger-clarke.com/allfours/license.html
 *             Free to use and/or distribute for personal or academic purposes.
 *             Must site the source code using the following format at beginning or end of source code file where it was used:
 *             "Clarke, Roger A. (2018) All Fours Game (ver. 0.6.3) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman". 
 */

