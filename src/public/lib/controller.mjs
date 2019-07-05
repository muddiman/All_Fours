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

export var inputDevices = {       //};
/*     eventHandlers:          function (Controller, hand) {
                                // Mouse.eventsHandler(Controller, hand);
                                Touch.eventsHandler(Controller, hand);
                                Keyboard.eventsHandler(Controller);
                            }, */

                            // ON INPUT DEVICE DOWN, RETURN AN ACTION
    listeners:              function (Controller, hand, gameboard) {
                                document.getElementById("card_layer").addEventListener("mousedown", (e)=> {
                                                                                                        Mouse.onMouseDown(e, Controller, hand);
                                                                                                    }, true);   
                                document.getElementById("card_layer").addEventListener("mousemove",  (e)=> {
                                                                                                        Mouse.onMouseMove(e, hand, gameboard);
                                                                                                    }, true);   
                                document.getElementById("card_layer").addEventListener("touchstart", (e)=> {
                                                                                                        Touch.onTouchStart(e, Controller, hand);
                                                                                                    }, true);   
                                document.getElementById("card_layer").addEventListener("touchmove",  (e)=> {
                                                                                                        Touch.onTouchMove(e, hand, gameboard);
                                                                                                    }, true);   
                                // document.getElementById("card_layer").addEventListener("touchend", onTouchEnd, true);
                                window.addEventListener('keydown', (e) =>{
                                                                    Keyboard.onKeyDown(e, Controller);
                                                                });       // keyboard
                                // window.addEventListener("keyup", onKeyUp);   
                                debug.console("All listeners started.");
                            },
    removeListeners:        function () {
                                window.removeEventListener('keydown', (e) => {
                                                                            this.onKeyDown(e, Controller);
                                                                        });           // keyboard
                                document.getElementById("card_layer").removeEventListener("mousedown", (e) => {
                                                                                                            this.onMouseDown(e, Controller); 
                                                                                                        }, true); 
                                document.getElementById("card_layer").removeEventListener("mousemove",  (e)=> {
                                                                                                            Mouse.onMouseMove(e, hand, gameboard);
                                                                                                        }, true);                                         
                                document.getElementById('game_board').removeEventListener('touchstart', (e) => {
                                                                                                            this.onTouchStart(e, Controller);
                                                                                                        }, true);
                                document.getElementById("card_layer").removeEventListener("touchmove",  (e)=> {
                                                                                                            Touch.onTouchMove(e, hand, gameboard);
                                                                                                        }, true); 
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
