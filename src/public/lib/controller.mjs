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

/* export var inputDevices = {       //};
                            // ON INPUT DEVICE DOWN, RETURN AN ACTION
    listeners:              function (canvasLayer, hand) {
                            canvasLayer.addEventListener("click", (e)=> {
                                                                    let key = Mouse.onClick(e, hand);
                                                                    let action =  Controller.bindings[key];
                                                                    Controller.actions[action] = true;
                                                                }, true);    */                               
/*         canvasLayer.addEventListener("mousedown", (e)=> {
            let key = Mouse.onMouseDown(e, Controller, hand);
            let action =  Controller.bindings[key];
            Controller.actions[action] = true;
        }, true);   
                   */             /*  canvasLayer.addEventListener("mousemove",  (e)=> {
                                                                                                        Mouse.onMouseMove(e, hand, gameboard);
                                                                                                    }, true);   
                                canvasLayer.addEventListener("touchstart", (e)=> {
                                                                                                        Touch.onTouchStart(e, Controller, hand);
                                                                                                    }, true);   
                                canvasLayer.addEventListener("touchmove",  (e)=> {
                                                                                                        Touch.onTouchMove(e, hand, gameboard);
                                                                                                    }, true);   
                                // canvasLayer.addEventListener("touchend", onTouchEnd, true);
                                window.addEventListener('keydown', (e) =>{
                                                                    Keyboard.onKeyDown(e, Controller);
                                                                });   */     // keyboard
                                // window.addEventListener("keyup", onKeyUp);   
                                // debug.console("All listeners started.");
                            // },
  /*   removeListeners:        function (canvasLayer) {
                                window.removeEventListener('keydown', (e) => {
                                                                            this.onKeyDown(e, Controller);
                                                                        });           // keyboard
                                canvasLayer.removeEventListener("mousedown", (e) => {
                                                                                                            this.onMouseDown(e, Controller); 
                                                                                                        }, true); 
                                canvasLayer.removeEventListener("mousemove",  (e)=> {
                                                                                                            Mouse.onMouseMove(e, hand, gameboard);
                                                                                                        }, true);                                         
                                document.getElementById('game_board').removeEventListener('touchstart', (e) => {
                                                                                                            this.onTouchStart(e, Controller);
                                                                                                        }, true);
                                canvasLayer.removeEventListener("touchmove",  (e)=> {
                                                                                                            Touch.onTouchMove(e, hand, gameboard);
                                                                                                        }, true); 
                            }, */
// };

export var Controller = {
    /*  mouse controls  */
listeners:      function (canvasLayer, hand, callback) {
                    canvasLayer.addEventListener("click", (e) => {
                                                                let key = Mouse.onClick(e, hand);
                                                                let action =  this.bindings[key];
                                                                // this.actions[action] = true;
                                                                callback(action);
                                                            }, true);
                    window.addEventListener("keydown", (e) => {
                                                                let key = Keyboard.onKeyDown(e);
                                                                let action = this.bindings[key];
                                                                // this.actions[action] =   true;
                                                                callback(action);
                                                            }, true);
                    canvasLayer.addEventListener("touch", (e) => {
                                                                let key = Touch.onTouch(e, hand);
                                                                let action =  this.bindings[key];
                                                                // this.actions[action] = true;
                                                                callback(action);
                                                            }, true);                                         
                    debug.console("All listeners started.");
                },     
bindings: {
    'Escape'    : 'toggleMenuScreen',
    '1'         : 'playCard_1',
    '2'         : 'playCard_2',
    '3'         : 'playCard_3',
    '4'         : 'playCard_4',
    '5'         : 'playCard_5',
    '6'         : 'playCard_6',
    '7'         : 'playCard_7',
    '8'         : 'playCard_8',
    '9'         : 'playCard_9',
    'ArrowRight': 'selectNext',
    'ArrowLeft' : 'selectPrevious',
    'Enter'     : 'confirmSelection',
    ' '         : 'confirmSelection',
    'p'         : 'togglePause',
    'm'         : 'toggleMute'
 },

 actions: {
    'toggleMenuScreen': false,
    'playCard_1'    : false,
    'playCard_2'    : false,
    'playCard_3'    : false,
    'playCard_4'    : false,
    'playCard_5'    : false,
    'playCard_6'    : false,
    'playCard_7'    : false,
    'playCard_8'    : false,
    'playCard_9'    : false,
    'selectNext'    : false,
    'selectPrevious': false,
    'confirmSelection': false,
    'togglePause'         : false,
    'toggleMute'          : false,
 },
};  


/**
 *  @copyright (c) 2018 - 2019 Prodigy Engineering, LLC. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com (OR: https://www.muddicode.com)
 *  @version   0.8.4
 *  @since     2018-10-1
 *  @license   NON-Commercial
 *  @See:      http://www.twomanallfours.com/allfours/license.html
 *             http://www.twomanallfours.com/allfours/copyright.html
 */
