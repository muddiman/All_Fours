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

export var Controller = {       //};
    eventHandlers:          function (Controller, hand) {
                                Mouse.eventsHandler(Controller, hand);
                                Touch.eventsHandler(Controller, hand);
                                Keyboard.eventsHandler(Controller);
                            },
    listeners:              function (Controller, hand) {
                                document.getElementById("card_layer").addEventListener("mousedown", (e)=> {
                                                                                                        Mouse.onMouseDown(e, Controller);
                                                                                                    }, true);   
                                document.getElementById("card_layer").addEventListener("mousemove",  (e)=> {
                                                                                                        Mouse.onMouseMove(e, hand);
                                                                                                    }, true);   
                                document.getElementById("card_layer").addEventListener("touchstart", (e)=> {
                                                                                                        Touch.onTouchStart(e, Controller);
                                                                                                    }, true);   
                                document.getElementById("card_layer").addEventListener("touchmove",  (e)=> {
                                                                                                        Touch.onTouchMove(e, hand);
                                                                                                    }, true);   
                                // document.getElementById("card_layer").addEventListener("touchend", onTouchEnd, true);
                                window.addEventListener('keydown', Keyboard.onKeyDown);       // keyboard
                                // window.addEventListener("keyup", onKeyUp);   
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
