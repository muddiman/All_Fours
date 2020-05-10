//      /src/public/lib/keyboard.mjs

/*
                Title:  ALL FOURS GAME
                Language: Javascript
                Programmer: .muddicode 
                Code: Keyboard Input Class Module  (allfours.js)   
    
    DESCRIPTION:    keyboard module for All Fours Game
    PURPOSE:        keyboard class, handles mouse input for all fours game
*/

/*  globals  */
// import { debug } from "./debugging.mjs";

var Keyboard = {
    pressedKey:     null,
  /*   eventsHandler:  function () {
                        // keyEvents(Game);
                    }, */
    onKeyDown:  function (event) {
                    this.pressedKey = event.key;
                    if (this.pressedKey) {
                        debug.console("ID: ", this.pressedKey);                             // ASCII id of key thats was pressed
                    }
                    return this.pressedKey;
                },
/*     onKeyUp:    function (Controller) {
                    window.removeEventListener('keyup', () => {
                                                            this.onKeyUp(Controller);
                                                        });            // keyboard
                    window.addEventListener('keydown', (e) =>{
                                                            Keyboard.onKeyDown(e, Controller);
                                                        });                    // let key = event.key;
                    let action = Controller.bindings[this.pressedKey];
                    if (Controller.actions[action] === true) {
                        Controller.actions[action] = false;
                    }
                }, */
};






/**
 *  @copyright (c) 2018 - 2019 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com (OR: https://www.muddicode.com)
 *  @version   0.9.1
 *  @since     2018-10-1
 *  @license   NON-Commercial
 *  @See:      http://www.roger-clarke.com/allfours/license.html
 *             http://www.roger-clarke.com/allfours/copyright.html
 */
