//  filename:   tickertape.mjs
//  path:       /lib/tickertape.mjs   
/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode 
                     Code: Informational Tickertape Library                             
*/
// import { gCanvasLayer } from "./screen.mjs";

function tickertape(messageArr) {
    const width=window.innerWidth;
    const height=50;
    let i=0;
    var x=0;
    var y=0;
    var t = new gCanvasLayer("tck_board", 0, "black");      //  , width, height, 1.0, 0, 0, 0, 0);
    let tb = t.canvas;
    t.height = height;
    t.width = t.scale * width;
    document.getElementById("ticker").appendChild(tb);
    t.init();
    tb.style.position = "static";       // setAttribute("position", "static");
    let tbx = t.ctx;
    let fontSize = t.scale * 30;
    t.setFont(`${fontSize}px Dot Matrix`);
    tbx.fillStyle = "yellow";
    x=width;
    y=40;
    let ID = setInterval(function () {       // anonymous function for handling the animation
        if (x<-400) {
            x=width;
            //  change message index
            i = (i + 1) % messageArr.length;
        } 
        t.clear();
        x-=2;
        tbx.fillText(messageArr[i], x, y);
    }, 1000/60);
}


/** **************************************************************************************************************************************************************
 * 
 *  @copyright (c) 2019 Roger A. Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com             (muddi@muddicode.com | rclarke@roger-clarke.com) 
 *  @version   1.0.2
 *  @since     2019-02-7
 *  @download  https://www.github.com/muddiman/AllFours
 *  @license   NOT for 'commercial use', otherwise free to use, free to distribute
 *  @See:      http://www.roger-clarke.com/tickertape/license.html
 *             Free to use and/or distribute for personal or academic purposes.
 *             Must site the source code using the following format at beginning or end of source code file where it was used (in whole or part):
 *             "Clarke, Roger A. (2019) All Fours Game (ver. 1.0.0) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman". 
 * 
***************************************************************************************************************************************************************************************** */

