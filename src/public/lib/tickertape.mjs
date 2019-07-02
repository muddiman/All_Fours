//  filename:   tickertape.mjs
//  path:       /lib/tickertape.mjs   
/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode 
                     Code: Informational Tickertape Library                             
*/
import { gCanvasLayer } from "./screen.mjs";


export function tickertape(message) {
    var width=window.innerWidth;
    var height=50;
    var x=0;
    var y=0;
    var t = new gCanvasLayer("tck_board", 0, 0, width, height, 1.0, 0, 0, 0, 0);
    var tb = t.canvas;
    // document.getElementById("game_container").removeChild(tb);
    document.getElementById("ticker").appendChild(tb);
    t.init();
    tb.style.position = "static";       // setAttribute("position", "static");
    var tbx = t.ctx;
   // document.getElementById("game_container").appendChild(document.getElementById("tck_board"));
    // tb.style="position: absolute; left: 0; top: 0; z-index: 1;";
    // tb.style.backgroundColor="rgba(0,0,0, 0.7)";
    t.setFont("30px Dot Matrix");
    // tbx.font = "30px Dot Matrix";    //  Microsoft Yahei UI";         document.getElementById("tck_board")   digital-clock-font
    tbx.fillStyle= "yellow";
    //tbx.fillText(message, 690, 40);
    x=width;
    y=40;
    setInterval(function () {       // anonymous function for handling the animation
        if (x<-400) {
            x=width;
        } 
        t.clear();
        x--;
        tbx.fillText(message, x, y);
    }, 5);
}


/** **************************************************************************************************************************************************************
 * 
 *  @copyright (c) 2019 Roger A. Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com             (muddi@muddicode.com | rclarke@roger-clarke.com) 
 *  @version   0.7.2
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

