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
const LEFTOFFSET =  15;
const TOPOFFSET  = 160;
/*  classes */
/*  objects  */
export var Touch = {
    touchX:             null,
    touchY:             null,
    eventsHandler:     function (Controller, hand) {
                                // let hand = Game.Player.human.hand;
                                let touchX = Controller.clickPosition.X;
                                let touchY = Controller.clickPosition.Y;
                                // let touchX = X;
                                // let touchY = Y;
                                for (let index = 0; index < hand.length; index++) { //  cycle through cards in hand
                                    const card = hand[index];                         
                                    if (wasCardTouched(index, card, hand.length, touchX, touchY) === true) {
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
    onTouch:                function (touchEvent, hand) {
                                this.touchX = touchEvent.clientX - LEFTOFFSET;
                                this.touchY = touchEvent.clientY - TOPOFFSET;
                                debug.console(`Click location: (${this.touchX}, ${this.touchY})`);
                                // return touchEvents(hand);
                            },                        
    onTouchStart:           function (touchEvent, hand) {
/*                                 document.getElementById('game_board').removeEventListener('touchstart', (e) => {
                                                                                                            this.onTouchStart(e, Controller);
                                                                                                        }, true);
                                document.getElementById("card_layer").addEventListener("touchend", () => {
                                                                                                        this.onTouchEnd(Controller);
                                                                                                    }, true); */
                                this.touchX = touchEvent.clientX - LEFTOFFSET;     //  Game.Screens.gameScreen.canvas.offsetLeft;   // 
                                this.touchY = touchEvent.clientY - TOPOFFSET;  //   Game.Screens.gameScreen.canvas.offsetTop; //  
                                debug.console(`Click location: (${this.touchX}, ${this.touchY})`);
                                // Controller.touchPosition.X = locX;
                                // Controller.touchPosition.Y = locY;
                                // touchEventHandler(locX, locY); 
                                // return touchEvents(hand);
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
                                    const card = hand[index];
                                    if (wasCardTouched(index, card, hand.length, posX, posY) === true) {
                                        enlargeCard(index);                 // enlarge Card      
                                    }
                                }    
                            },
};
 
/*  functions */
function wasCardTouched(cardNumber, card, arrayLength, x, y) {
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
    let xCenter = document.getElementById("card_layer").width /2;      //    Game.Screens.gameScreen.canvas.width/2;
    // let xCenter = Game.Screens.gameScreen.canvas.width/2;
    let xLocation = xCenter - Math.ceil(arrayLength / 2) * card.CARD_W/2 +  i * card.CARD_W/2 ;
    return xLocation; 
}

/******************************************************************************************************************* */


/**
 *  @copyright (c) 2018 - 2019 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com (OR: https://www.muddicode.com)
 *  @version   0.8.6
 *  @since     2018-10-1
 *  @license   NON-Commercial
 *  @See:      http://www.roger-clarke.com/allfours/license.html
 *             http://www.roger-clarke.com/allfours/copyright.html
 */
