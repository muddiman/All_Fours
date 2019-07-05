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
import { debug } from "./debugging.mjs";

export var Keyboard = {
    pressedKey:     null,
    eventsHandler:  function (Controller) {
                        // keyEvents(Game);
                    },
    onKeyDown:  function (event, Controller) {
                    this.pressedKey = event.key;
                    window.removeEventListener('keydown', (e) => {
                                                                this.onKeyDown(e, Controller);
                                                            });           // keyboard
                    window.addEventListener('keyup', () => {
                                                        this.onKeyUp(Controller);
                                                    });                      // keyboard
                    if (this.pressedKey) {
                        debug.console("ID: ", this.pressedKey);                             // ASCII id of key thats was pressed
                    }
                    let action = Controller.bindings[this.pressedKey];
                    if (Controller.isMyTurn===true) {
                        if (Controller.actions[action] === false) {
                            Controller.actions[action] =   true;
                            Controller.readAction();
                        }
                    }
                },
    onKeyUp:    function (Controller) {
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
                },
};
/*
function keyEvents(Game) {
    let key = Controller.pressedKey;
            let action = Controller.bindings[key];
            if (Controller.isMyTurn === true) {
                if (Controller.actions[action] === false) {
                    Controller.actions[action] =   true;
                }
            }
}

*/






/**
 *  @copyright (c) 2018 - 2019 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com (OR: https://www.muddicode.com)
 *  @version   0.8.1
 *  @since     2018-10-1
 *  @license   NON-Commercial
 *  @See:      http://www.roger-clarke.com/allfours/license.html
 *             http://www.roger-clarke.com/allfours/copyright.html
 */
