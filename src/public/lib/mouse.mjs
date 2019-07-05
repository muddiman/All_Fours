//      /src/public/lib/mouse.mjs

/*
                Title:  ALL FOURS GAME
                Language: Javascript
                Programmer: .muddicode 
                Code: Mouse Input Class Module  (allfours.js)   
    
    DESCRIPTION:    mouse module for All Fours Game
    PURPOSE:        mouse class, handles mouse input for all fours game
*/
import { debug     } from "./debugging.mjs";
// import { Game      } from "/allfours.js";

/*  globals  */
/* const CARD_W=72;
const CARD_H=96; */
const LEFTOFFSET =  15;
const TOPOFFSET  = 160;

export var Mouse = {
    currentX:           null,
    currentY:           null,
    clickX:             null,
    clickY:             null,
 /*    eventsHandler:     function (Controller, hand) {
                                clickEvents(Controller, hand);              //  click, dbl click, mouse down, mouse up
                                mouseMoveEvents(Controller, hand);          //  mousemove, mouseover
                            },  */
    onClick:            function (event, hand) {
                                this.clickX = event.clientX - LEFTOFFSET;  //  Game.Screens.gameScreen.canvas.offsetLeft;   // 
                                this.clickY = event.clientY - TOPOFFSET;   //  Game.Screens.gameScreen.canvas.offsetTop; //   
                                debug.console("Click location: (", this.clickX, ", ", this.clickY, ")");
                                return clickEvents(hand);
                            },
/*     onMouseDown:            function (event, canvasLayer, Controller, hand) {
                                this.clickX = event.clientX - LEFTOFFSET;  //  Game.Screens.gameScreen.canvas.offsetLeft;   // 
                                this.clickY = event.clientY - TOPOFFSET;    *///  Game.Screens.gameScreen.canvas.offsetTop; //  
                             /*    canvasLayer.removeEventListener("mousedown", (e) => {
                                                                                    this.onMouseDown(e, Controller, hand); 
                                                                                }, true);   */
   /*                              canvasLayer.addEventListener("mouseup", () => {
                                                                            this.onMouseUp(Controller, hand); 
                                                                        }, true);    
                                debug.console("Click location: (", this.clickX, ", ", this.clickY, ")");
                                return clickEvents(hand);
                            },
    onMouseUp:              function (Controller, hand) {
                                canvasLayer.removeEventListener("mouseup", () => {
                                                                                                        this.onMouseUp(Controller, hand); 
                                                                                                    }, true);  
                                canvasLayer.addEventListener("mousedown", (e) => {
                                                                                                        this.onMouseDown(e, Controller, hand); 
                                                                                                    }, true);   
                                for (let action in Controller.actions) {
                                    if (Controller.actions[action] == true) {
                                        Controller.actions[action] = false;
                                    }
                                }
                            }, 
    onMouseMove:            function (event, hand, gameboard) {
                                this.currentX = event.clientX - LEFTOFFSET; //  Game.Screens.gameScreen.canvas.offsetLeft; // x,y position of the mouse pointer on canvas when event occurs
                                this.currentY = event.clientY - TOPOFFSET; //  Game.Screens.gameScreen.canvas.offsetTop;
                                debug.console("(", this.currentX, ", ", this.currentY, ")");
                                debug.display(`(${this.currentX}, ${this.currentY})`);
                                for (let index = 0; index < hand.length; index++) {
                                    const card = hand[index];
                                    if (isMouseOverCard(index, card, hand.length, this.currentX, this.currentY) === true) {
                                        gameboard.select = card;
                                    }
                                }
                            }     */
};
/********************************************************************************************************************************************** */

 
//  ----------------------------------------------------------------------------------------------------------------------------------------

function clickEvents(hand) {
/*     let clickX = Controller.clickPosition.X;
    let clickY = Controller.clickPosition.Y; */
    for (let index = 0; index < hand.length; index++) {                                 //  cycle through cards in hand
        const card = hand[index];
        if (didMouseClickOnCard(index, card, hand.length, Mouse.clickX, Mouse.clickY) === true) {
            index++;
            return index.toString();
           /*  let key = index.toString();
            let action = Controller.bindings[key];
            if (Controller.isMyTurn === true) {
                if (Controller.actions[action] === false) {
                    Controller.actions[action] =   true;
                    Controller.readAction(); */
                }
            }
        }   
    // }
// }

function mouseMoveEvents(Controller, hand) {
/*     let clickX = Controller.clickPosition.X;
    let clickY = Controller.clickPosition.Y; */
    for (let index = 0; index < hand.length; index++) {                                 //  cycle through cards in hand
        const card = hand[index];
        if (isMouseOverCard(index, card, hand.length, Mouse.currentX, Mouse.currentY) === true) {
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

function isMouseOverCard(cardNumber, card, arrayLength, x, y) {
    return  checkPointerLocation(cardNumber, card, arrayLength, x, y); 
}

function didMouseClickOnCard(cardNumber, card, arrayLength, x, y) {
    return  checkPointerLocation(cardNumber, card, arrayLength, x, y); 
}

function checkPointerLocation(cardNumber, card, arrayLength, x, y) {
    let upperLeftCornerX = cardLocation(cardNumber, card, arrayLength);
    let upperLeftCornerY = 340;
    if (upperLeftCornerX < x && x < upperLeftCornerX + card.CARD_W / 2) {
        if (upperLeftCornerY < y && y < upperLeftCornerY + card.CARD_H) {
            return true;
        }
    }
    if (cardNumber === arrayLength - 1) {           //  LAST CARD
        if (upperLeftCornerX < x && x < upperLeftCornerX + card.CARD_W) {
            if (upperLeftCornerY < y && y < upperLeftCornerY + card.CARD_H) {
                return true;
            }
        }    
    }
    return false;
}

function cardLocation(i, card, arrayLength) {
    let xCenter = 700 /2;      //    Game.Screens.gameScreen.canvas.width/2;
    let xLocation = xCenter - Math.ceil(arrayLength / 2) * card.CARD_W/2 +  i * card.CARD_W/2 ;
    return xLocation; 
}

/**
 *  @copyright (c) 2018 - 2019 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com (OR: https://www.muddicode.com)
 *  @version   0.8.0
 *  @since     2018-10-1
 *  @license   NON-Commercial
 *  @See:      http://www.roger-clarke.com/allfours/license.html
 *             http://www.roger-clarke.com/allfours/copyright.html
 */
