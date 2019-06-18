//      /src/public/lib/controller.mjs

/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode 
                     Code: Controller LIBRARY MODULE - 'controller.mjs'                            
*/


/**
 * 
 *          Handles the different forms of user input
 *          ie: keystrokes, mouse clicks or touch.
 */

/*  imports */ 
import { Mouse     } from "./mouse.mjs";
import { Touch     } from "./touch.mjs";
import { Keyboard  } from "./keyboard.mjs";
import { debug     } from "./debugging.mjs";

/* function cardLocation(i, arrayLength) {
    let location = xCenter - Math.ceil(arrayLength / 2) * CARD_W / 2 + i * CARD_W / 2;
    return location;
} */

export var Controller = {       //};
    eventHandlers:          function () {
                                Mouse.eventsHandler();
                                Touch.eventsHandler();
                                Keyboard.eventsHandler();
                            },

    listeners:              function () {
                                document.getElementById("card_layer").addEventListener("mousedown", Mouse.onMouseDown, true);   
                                document.getElementById("card_layer").addEventListener("mousemove", Mouse.onMouseOver, true);   
                                //   document.getElementById("card_layer").addEventListener("mouseup", onMouseUp, true);   
                                window.addEventListener('keydown', Keyboard.onKeyDown);       // keyboard
                                // window.addEventListener("keyup", onKeyUp);
                                document.getElementById("card_layer").addEventListener("touchstart", Touch.onTouchStart, true);   
                                document.getElementById("card_layer").addEventListener("touchmove",  Touch.onTouchMove, true);   
                                // document.getElementById("card_layer").addEventListener("touchend", onTouchEnd, true);   
                                debug.console("All listeners started.");
                            },
 
};

/**
 *  @copyright (c) 2018 - 2019 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com (OR: https://www.muddicode.com)
 *  @version   0.7.2
 *  @since     2018-10-1
 *  @license   NON-Commercial
 *  @See:      http://www.roger-clarke.com/allfours/license.html
 *             http://www.roger-clarke.com/allfours/copyright.html
 */