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

export var Keyboard = {
    eventsHandler:  function () {
    
                    },
    onKeyDown:  function (event) {
                    let key = event.key;
                    window.removeEventListener('keydown', onKeyDown);           // keyboard
                    window.addEventListener('keyup', onKeyUp);                      // keyboard
                    if (key) {
                        debug.console("ID: ", key);                             // ASCII id of key thats was pressed
                    }
                    let action = Game.Controller.bindings[key];
                    if (Game.Controller.isMyTurn===true) {
                        if (Game.Controller.actions[action] === false) {
                            Game.Controller.actions[action] = true;
                        }
                    }
                },
    onKeyUp:    function (event) {
                    window.removeEventListener('keyup', this.onKeyUp);           // keyboard
                    let key = event.key;
                    let action = Game.Controller.bindings[key];
                    if (Game.Controller.actions[action] === true) {
                        Game.Controller.actions[action] = false;
                    }
                    window.addEventListener('keydown', this.onKeyDown);                      // keyboard
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
