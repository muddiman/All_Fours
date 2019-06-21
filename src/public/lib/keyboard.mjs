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
    eventsHandler:  function (Controller) {
                        // keyEvents(Game);
                    },
    onKeyDown:  function (event, Controller) {
                    let key = event.key;
                    window.removeEventListener('keydown', this.onKeyDown);           // keyboard
                    window.addEventListener('keyup', this.onKeyUp);                      // keyboard
                    if (key) {
                        debug.console("ID: ", key);                             // ASCII id of key thats was pressed
                    }
                    let action = Controller.bindings[key];
                    if (Controller.isMyTurn===true) {
                        if (Controller.actions[action] === false) {
                            Controller.actions[action] = true;
                        }
                    }
                },
    onKeyUp:    function (event, Controller) {
                    window.removeEventListener('keyup', this.onKeyUp);           // keyboard
                    let key = event.key;
                    let action = Controller.bindings[key];
                    if (Controller.actions[action] === true) {
                        Controller.actions[action] = false;
                    }
                    window.addEventListener('keydown', this.onKeyDown);                      // keyboard
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
 *  @version   0.7.2
 *  @since     2018-10-1
 *  @license   NON-Commercial
 *  @See:      http://www.roger-clarke.com/allfours/license.html
 *             http://www.roger-clarke.com/allfours/copyright.html
 */
