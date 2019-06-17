/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode 
                     Code: USER INPUT LIBRARY MODULE - 'UserInput.js'                            
*/

/**
 *  @copyright (c) 2018 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com (OR: https://www.muddicode.com)
 *  @version   0.3.2
 *  @since     2018-10-1
 *  @license   Dual license - MIT & GPL
 *  @See:      http://www.gnu.org/licenses/gpl.html
 *             http://www.mit.edu/license
 */

/**
 * 
 *          Handles the different forms of user input
 *          ie: keystrokes, mouse clicks or touch.
 */

function onMouseOver(event) {
    let posX = event.clientX; // x,y position of the mouse pointer on canvas when event occurs
    let posY = event.clientY;
    console.log("(", posx, ", ", posy, ")");
    mouseOverSelect(posX, posY);
}

function mouseOverSelect(x, y) {
    // pass;
    // select
    
}

function cardLocation(i, arrayLength) {
    let location = xCenter - Math.ceil(arrayLength / 2) * CARD_W / 2 + i * CARD_W / 2;
    return location;
}

function isMouseOverCard(cardNumber, arrayLength, x, y) {
    // let upperLeftCornerX = cardNumber * CARD_W / 2 + XOFFSET;
    // let upperLeftCornerY = YOFFSET;
    let upperLeftCornerX = cardLocation(cardNumber, arrayLength);
    if (upperLeftCornerX < x && x < upperLeftCornerX + CARD_W / 2) {
        if (upperLeftCornerY < y && y < upperLeftCornerY + CARD_H) {
            return true;
        }
    }
    if (i === arrayLength - 1) {
        if (upperLeftCornerX < x && x < upperLeftCornerX + CARD_W) {
            if (upperLeftCornerY < y && y < upperLeftCornerY + CARD_H) {
                return true;
            }
        }    
    }
    return false;
}

//  cycle through cards in hand
for (let index = 0; index < hand.length; index++) {
    const element = hand[index];
    if (isMouseOverCard(index, hand.length, clickX, clickY) === true) {
        // playcard
        let key = index.toString();
        let action = Game.Controller.bindings[key];
        if (Game.Controller.isMyTurn === true) {
            if (Game.Controller.actions[action] === false) {
                Game.Controller.actions[action] = true;
            }
        }
    }   
}

/**
 *      captures clicks, convert into user's choice and store that choice in the userInput object
 */
 function mouseEventHandler() {
    document.getElementById('card_layer').addEventListener('click', function (e) {
        var x = e.clientX;      // click location
        var y = e.clientY;
        var posArr = [x,y];     // position array
        // console.log(posArr);
        inputMgr.setUserInput(posArr).then(function (resolve) {
            inputMgr.updateSelection();
            console.log(resolve);  
        }).catch(function(reject) {
            console.log(reject);
        }); 
    });
}

 function keyboardEventHandler() {
    // pass;
}

 function touchScreenEventHandler() {
    // pass;
}