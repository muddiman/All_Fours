//      /src/public/lib/mouse.mjs
/*
                Title:  ALL FOURS GAME
                Language: Javascript
                Programmer: .muddicode 
                Code: Mouse Input Class Module  (allfours.js)   
    
    DESCRIPTION:    mouse module for All Fours Game
    PURPOSE:        mouse class, handles mouse input for all fours game
*/
/*  imports */
// import { Display, USERHAND_Y  } from "./display-interface.mjs";
// import { debug     }            from "./debugging.mjs";
console.log(`Reading the 'mouse' script`);

/*  globals  */
// const handLocY = 340;//  USERHAND_Y;
// const screen   = Display.onCardScreen;
// const scale    = screen.getScale();
// const xOffset  = screen.xOffset;
// const yOffset  = screen.yOffset;
// console.log(`Scale: ${scale}`);

/* mouse controller object  */
var Mouse = {
    currentX:           null,
    currentY:           null,
    clickX:             null,
    clickY:             null,
    onClick:            function (event, hand, displayScale=1, xOffset=15, yOffset=180, handLocationY=340) {
                            this.clickX = event.clientX - xOffset;    
                            this.clickY = event.clientY - yOffset;     
                            debug.console(`Click location: (Xcoord: ${this.clickX}, Ycoord: ${this.clickY})`);
                            return clickEvents(hand, displayScale, handLocationY);
                        },
};
/********************************************************************************************************************************************** */

 
//  ----------------------------------------------------------------------------------------------------------------------------------------

function clickEvents(hand, currentScale, yHandPosition) {
    for (let index = 0; index < hand.length; index++) {                //  cycle through cards in hand, and match curson location to card location
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

function checkPointerLocation(cardNumber, card, arrayLength, x, scale, handLocY) {
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

/*********************************************************************************************************************************************
 *  @copyright (c) 2018 - 2019 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com (OR: https://www.muddicode.com)
 *  @version   0.9.1
 *  @since     2018-10-1
 *  @license   NON-Commercial
 *  @See:      http://www.roger-clarke.com/allfours/license.html
 *             http://www.roger-clarke.com/allfours/copyright.html
 */
