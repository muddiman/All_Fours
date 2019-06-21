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
const CARD_W=72;
const CARD_H=96;
const LEFTOFFSET =  15;
const TOPOFFSET  = 160;

export var Mouse = {
    eventsHandler:     function (Controller, hand) {
                                clickEvents(Controller, hand);              //  click, dbl click, mouse down, mouse up
                                mouseMoveEvents(Controller, hand);          //  mousemove, mouseover
                            }, 
    onMouseDown:            function (event, Controller) {
                                document.getElementById("card_layer").removeEventListener("mousedown", (e) => {
                                                                                                        this.onMouseDown(e, Controller); 
                                                                                                    }, true);  
                                document.getElementById("card_layer").addEventListener("mouseup", () => {
                                                                                                        this.onMouseUp(Controller); 
                                                                                                    }, true);    
                                let locX = event.clientX - LEFTOFFSET;  //  Game.Screens.gameScreen.canvas.offsetLeft;   // 
                                let locY = event.clientY - TOPOFFSET;   //  Game.Screens.gameScreen.canvas.offsetTop; //  
                                debug.console("Click location: (", locX, ", ", locY, ")");
                                Controller.clickPosition.X = locX;
                                Controller.clickPosition.Y = locY;
                            },
    onMouseUp:              function (Controller) {
                                document.getElementById("card_layer").removeEventListener("mouseup", () => {
                                                                                                        this.onMouseUp(Controller); 
                                                                                                    }, true);  
                                document.getElementById("card_layer").addEventListener("mousedown", (e) => {
                                                                                                        this.onMouseDown(e, Controller); 
                                                                                                    }, true);   
                                for (let action in Controller.actions) {
                                    if (Controller.actions[action] == true) {
                                        Controller.actions[action] = false;
                                    }
                                }
                            }, 
    onMouseMove:            function (event, hand) {
                                let posX = event.clientX - LEFTOFFSET; //  Game.Screens.gameScreen.canvas.offsetLeft; // x,y position of the mouse pointer on canvas when event occurs
                                let posY = event.clientY - TOPOFFSET; //  Game.Screens.gameScreen.canvas.offsetTop;
                                debug.console("(", posX, ", ", posY, ")");
                                debug.display(`(${posX}, ${posY})`);
                                for (let index = 0; index < hand.length; index++) {
                                    if (isMouseOverCard(index, hand.length, posX, posY) === true) {
                                        // enlargeCard(index);                 // enlarge Card      
                                    }
                                }
                            }    
};
/********************************************************************************************************************************************** */

 
//  ----------------------------------------------------------------------------------------------------------------------------------------

function clickEvents(Controller, hand) {
    // let hand = Game.Player.human.hand;
    let clickX = Controller.clickPosition.X;
    let clickY = Controller.clickPosition.Y;
    for (let index = 0; index < hand.length; index++) {                                 //  cycle through cards in hand
        if (didMouseClickOnCard(index, hand.length, clickX, clickY) === true) {
            index++;
            let key = index.toString();
            let action = Controller.bindings[key];
            if (Controller.isMyTurn === true) {
                if (Controller.actions[action] === false) {
                    Controller.actions[action] =   true;
                }
            }
        }   
    }
}

function mouseMoveEvents(Controller, hand) {
    // let hand = Game.Player.human.hand;
    let clickX = Controller.clickPosition.X;
    let clickY = Controller.clickPosition.Y;
    for (let index = 0; index < hand.length; index++) {                                 //  cycle through cards in hand
        if (isMouseOverCard(index, hand.length, clickX, clickY) === true) {
            index++;
            let key = index.toString();
            let action = Controller.bindings[key];
            if (Controller.isMyTurn === true) {
                if (Controller.actions[action] === false) {
                    Controller.actions[action] =   true;
                }
            }
        }   
    }
}

function isMouseOverCard(cardNumber, arrayLength, x, y) {
    return  checkPointerLocation(cardNumber, arrayLength, x, y); 
}

function didMouseClickOnCard(cardNumber, arrayLength, x, y) {
    return  checkPointerLocation(cardNumber, arrayLength, x, y); 
}

function checkPointerLocation(cardNumber, arrayLength, x, y) {
    let upperLeftCornerX = cardLocation(cardNumber, arrayLength);
    let upperLeftCornerY = 340;
    if (upperLeftCornerX < x && x < upperLeftCornerX + CARD_W / 2) {
        if (upperLeftCornerY < y && y < upperLeftCornerY + CARD_H) {
            return true;
        }
    }
    if (cardNumber === arrayLength - 1) {           //  LAST CARD
        if (upperLeftCornerX < x && x < upperLeftCornerX + CARD_W) {
            if (upperLeftCornerY < y && y < upperLeftCornerY + CARD_H) {
                return true;
            }
        }    
    }
    return false;
}

function cardLocation(i, arrayLength) {
    let xCenter = document.getElementById("card_layer").width /2;      //    Game.Screens.gameScreen.canvas.width/2;
    let xLocation = xCenter - Math.ceil(arrayLength / 2) * CARD_W/2 +  i * CARD_W/2 ;
    return xLocation; 
}

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
