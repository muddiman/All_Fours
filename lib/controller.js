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
/* import { Mouse     } from "./mouse.mjs";
import { Touch     } from "./touch.mjs";
import { Keyboard  } from "./keyboard.mjs";
import { debug     } from "./debugging.mjs";

loadScript(scriptArray[]);
 */

/* mouse controller object  */
var Mouse = {
    currentX:           null,
    currentY:           null,
    clickX:             null,
    clickY:             null,
    onClick:            function (event, hand, displayScale, xOffset, yOffset, handLocationY) {
                            this.clickX = event.clientX - xOffset;    
                            this.clickY = event.clientY - yOffset;     
                            debug.console(`Click location: (Xcoord: ${this.clickX}, Ycoord: ${this.clickY})`);
                            return clickEvents(hand, displayScale, handLocationY);
                        },
};
/********************************************************************************************************************************************** */

 
//  ----------------------------------------------------------------------------------------------------------------------------------------

function clickEvents(hand, currentScale, yHandPosition) {

    for (let index = 0; index < hand.length; index++) { 
        //  cycle through cards in hand, and match curson location to card location
        const card = hand[index];
        if (didMouseClickOnCard(index, card, hand.length, Mouse.clickX, Mouse.clickY, currentScale, yHandPosition) === true) {
            index++;
            return index.toString();
        }
    }
}   

function moveEvents(Controller, hand, currentScale, yHandPosition) {
/*  let clickX = Controller.clickPosition.X;
    let clickY = Controller.clickPosition.Y; */
    for (let index = 0; index < hand.length; index++) {                //  cycle through cards in hand
        const card = hand[index];
        if (isMouseOverCard(index, card, hand.length, Mouse.currentX, Mouse.currentY, currentScale, yHandPosition) === true) {
            index++;
            let key = index.toString();
            let action = Controller.bindings[key];
            if (Controller.isMyTurn === true) {
                /* if (Controller.actions[action] === false) {
                    Controller.actions[action] =   true;
                } */
            }
        }   
    }
}

function isMouseOverCard(cardNumber, card, arrayLength, x, y, scaleFactor, yOrdinate) {
    return  checkPointerLocation(cardNumber, card, arrayLength, x, y, scaleFactor, yOrdinate); 
}

function didMouseClickOnCard(cardNumber, card, arrayLength, x, y, scaleFactor, yOrdinate) {
    return  checkPointerLocation(cardNumber, card, arrayLength, x, y, scaleFactor, yOrdinate); 
}

function checkPointerLocation(cardNumber, card, arrayLength, x, y, scale, handLocY) {
    let upperLeftCornerX = scale * xCardLocation(cardNumber, card, arrayLength);
    let upperLeftCornerY = scale * handLocY;

    if (upperLeftCornerX < x && x < upperLeftCornerX + (scale * card.CARD_W / 2)) {
        if (upperLeftCornerY < y && y < upperLeftCornerY + (scale * card.CARD_H)) {
            return true;
        }
    }
    if (cardNumber === arrayLength - 1) {           //  LAST CARD
        if (upperLeftCornerX < x && x < upperLeftCornerX + (scale * card.CARD_W)) {
            if (upperLeftCornerY < y && y < upperLeftCornerY + (scale * card.CARD_H)) {
                return true;
            }
        }    
    }
    return false;
}

function xCardLocation(i, card, arrayLength) {
    let xCenter = WIDTH / 2;      //    Game.Screens.gameScreen.canvas.width/2;
    let xLocation = xCenter - Math.ceil(arrayLength / 2) * card.CARD_W/2 +  i * card.CARD_W/2 ;
    return xLocation; 
}

/*  KEYBOARD controls   */

var Keyboard = {
    pressedKey:     null,
    onKeyDown:  function (event) {
                    this.pressedKey = event.key;
                    if (this.pressedKey) {
                        debug.console("ID: ", this.pressedKey);                             // ASCII id of key thats was pressed
                    }
                    return this.pressedKey;
                },
};

/*  TOUCH controls  */
//  not ready yet


/******************************************************************************************************************************************* */

    /*  ALL controls  */
var Controller = {
listeners:      function (screen, hand, callback) {        // add mouse, touch & keyboard
                    screen.canvas.addEventListener("click", (e) => {
                                                                let key = Mouse.onClick(e, hand, screen.getScale(), screen.xOffset, screen.yOffset, USERHAND_Y);
                                                                let action =  this.bindings[key];
                                                                console.log(`${key}!!`);
                                                                // this.actions[action] = true;
                                                                callback(action);
                                                            }, true);
                    window.addEventListener("keydown", (e) => {
                                                                let key = Keyboard.onKeyDown(e);
                                                                let action = this.bindings[key];
                                                                // this.actions[action] =   true;
                                                                callback(action);
                                                            }, true);
                    screen.canvas.addEventListener("touch", (e) => {
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
 *  @version   0.9.1
 *  @since     2018-10-1
 *  @license   NON-Commercial
 *  @See:      http://www.twomanallfours.com/allfours/license.html
 *             http://www.twomanallfours.com/allfours/copyright.html
 */
