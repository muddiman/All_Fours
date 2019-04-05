//      /src/public/lib/screen.mjs

/*
                Title:  ALL FOURS GAME
                Language: Javascript
                Programmer: .muddicode 
                Code: Screen Class Module  (allfours.js)   
    
    DESCRIPTION:    screen module for All Fours Game
    PURPOSE:    screen class, generates new screens for all fours game
*/

/*  globals  */


/*  screen canvas class */
export function gCanvasLayer(ID, _LEFTOFFSET, _TOPOFFSET, _WIDTH, _HEIGHT, _OPACITY, Z, red, green, blue) {
    this.canvas = document.createElement("canvas");
    this.init = function () {
        this.canvas.width = _WIDTH;
        this.canvas.height = _HEIGHT;
        this.canvas.id = ID;
        this.ctx = this.canvas.getContext('2d');
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById(ID).style = `position: absolute; left: ${_LEFTOFFSET}px; top: ${_TOPOFFSET}px; z-index: ${Z}; background-color: rgba(${red}, ${green}, ${blue}, ${_OPACITY});`;
        console.log(`New ${this.canvas.id} canvas initialized.`);
        // this.canvas.style="background-color: rgba(255, 255, 255," + OPAQUE + ");";     // in rgba format
        // this.refresh = setInterval(drawScreenFcn(), period);
    };
}
//  Prototypes
//  gCanvasLayer.prototype.ctx      = this.canvas.getContext('2d');
gCanvasLayer.prototype.clear    = function () {
                                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                                };

gCanvasLayer.prototype.setFont  = function (fontString) {
                                     this.ctx.font = fontString;
                                };

//================================================================================================================================

/**
 *  @copyright (c) 2018 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com  
 *  @version   0.6.5
 *  @since     2018-10-1
 *  @download  https://www.github.com/muddiman/All_Fours
 *  @license   NOT for 'commercial use'.
 *  @See:      http://www.roger-clarke.com/allfours/license.html
 *             Free to use and/or distribute for personal or academic purposes.
 *             Must site the source code using the following format at beginning or end of source code file where it was used:
 *             "Clarke, Roger A. (2018) All Fours Game (ver. 0.6.3) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman". 
 */

