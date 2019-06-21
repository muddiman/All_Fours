//      /src/public/lib/touch.mjs

/*
                Title:  ALL FOURS GAME
                Language: Javascript
                Programmer: .muddicode 
                Code: Touch Input Class Module  (allfours.js)   
    
    DESCRIPTION:    Touch module for All Fours Game
    PURPOSE:        Touch class, handles mouse input for all fours game
*/

/*  imports  */
import { debug } from "./debugging.mjs";

/*  globals  */
const CARD_W=72;
const CARD_H=96;
const LEFTOFFSET =  15;
const TOPOFFSET  = 160;

/*  objects  */
export var Touch = {
    eventsHandler:     function (Controller, hand) {
                                // let hand = Game.Player.human.hand;
                                let touchX = Controller.clickPosition.X;
                                let touchY = Controller.clickPosition.Y;
                                // let touchX = X;
                                // let touchY = Y;
                                for (let index = 0; index < hand.length; index++) {                                 //  cycle through cards in hand
                                    if (wasCardTouched(index, hand.length, touchX, touchY) === true) {
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
                            },
    onTouchStart:           function (touchEvent, Controller) {
                                document.getElementById('game_board').removeEventListener('touchstart', (e) => {
                                                                                                            this.onTouchStart(e, Controller);
                                                                                                        }, true);
                                document.getElementById("card_layer").addEventListener("touchend", () => {
                                                                                                        this.onTouchEnd(Controller);
                                                                                                    }, true);
                                let locX = touchEvent.clientX - LEFTOFFSET;     //  Game.Screens.gameScreen.canvas.offsetLeft;   // 
                                let locY = touchEvent.clientY - TOPOFFSET;  //   Game.Screens.gameScreen.canvas.offsetTop; //  
                                debug.console("Click location: (", locX, ", ", locY, ")");
                                Controller.touchPosition.X = locX;
                                Controller.touchPosition.Y = locY;
                                // touchEventHandler(locX, locY); 
                            },
    onTouchEnd:             function (Controller) {
                                document.getElementById("card_layer").removeEventListener("touchend", () => {
                                                                                                            this.onTouchEnd(Controller);
                                                                                                        }, true);  
                                document.getElementById("card_layer").addEventListener("touchstart", (e) => {
                                                                                                            this.onTouchStart(e, Controller);
                                                                                                        }, true);   
                                for (action in Controller.actions) {
                                    if (Controller.actions[action] === true) {
                                        Controller.actions[action] = false;
                                    }
                                }
                                document.getElementById("card_layer").addEventListener("touchstart", this.onTouchStart, true);     
                            },
    onTouchMove:            function (e, hand) {
                                let posX = e.clientX - LEFTOFFSET;   //  Game.Screens.gameScreen.canvas.offsetLeft; // x,y position of the mouse pointer on canvas when event occurs
                                let posY = e.clientY - TOPOFFSET;   //  Game.Screens.gameScreen.canvas.offsetTop;
                                debug.console("(", posX, ", ", posY, ")");
                                debug.display(`(${posX}, ${posY})`);
                                for (let index = 0; index < hand.length; index++) {
                                    if (wasCardTouched(index, hand.length, posX, posY) === true) {
                                        enlargeCard(index);                 // enlarge Card      
                                    }
                                }    
                            },
};
 
/*  functions */
function wasCardTouched(cardNumber, arrayLength, x, y) {
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
    // let xCenter = Game.Screens.gameScreen.canvas.width/2;
    let xLocation = xCenter - Math.ceil(arrayLength / 2) * CARD_W/2 +  i * CARD_W/2 ;
    return xLocation; 
}

/******************************************************************************************************************* */


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
