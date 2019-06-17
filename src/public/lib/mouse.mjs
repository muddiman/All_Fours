//      /src/public/lib/mouse.mjs

/*
                Title:  ALL FOURS GAME
                Language: Javascript
                Programmer: .muddicode 
                Code: Mouse Input Class Module  (allfours.js)   
    
    DESCRIPTION:    mouse module for All Fours Game
    PURPOSE:        mouse class, handles mouse input for all fours game
*/

/*  globals  */
export var Mouse = {
    eventsHandler:     function () {
                                clickEvents();              //  click, dbl click, mouse down, mouse up
                                mouseOverEvents();          //  mousemove, mouseover
                            }, 
    onMouseDown:            function (event) {
                                document.getElementById("card_layer").removeEventListener("mousedown", this.onMouseDown, true);  
                                document.getElementById("card_layer").addEventListener("mouseup", this.onMouseUp, true);    
                                let locX = event.clientX - Game.Screens.gameScreen.canvas.offsetLeft;   // LEFTOFFSET;
                                let locY = event.clientY - Game.Screens.gameScreen.canvas.offsetTop; //  TOPOFFSET;
                                debug.console("Click location: (", locX, ", ", locY, ")");
                                Game.Controller.clickPosition.X = locX;
                                Game.Controller.clickPosition.Y = locY;
                            },
    onMouseUp:              function (e) {
                                document.getElementById("card_layer").removeEventListener("mouseup", this.onMouseUp, true);  
                                document.getElementById("card_layer").addEventListener("mousedown", this.onMouseDown, true);   
                                for (action in Game.Controller.actions) {
                                    if (Game.Controller.actions[action] == true) {
                                        Game.Controller.actions[action] = false;
                                    }
                                }
                                // document.getElementById("card_layer").addEventListener("mousedown", this.onMouseDown, true);     
                            }, 
    onMouseOver:            function (event) {
                                let posX = event.clientX - Game.Screens.gameScreen.canvas.offsetLeft; // x,y position of the mouse pointer on canvas when event occurs
                                let posY = event.clientY - Game.Screens.gameScreen.canvas.offsetTop;
                                debug.console("(", posX, ", ", posY, ")");
                                //  mouseOverSelect(posX, posY);
                                debug.display(`(${posX}, ${posY})`);
                                for (let index = 0; index < Game.Player.human.hand.length; index++) {
                                    if (isMouseOverCard(index, Game.Player.human.hand.length, posX, posY) === true) {
                                        enlargeCard(index);                 // enlarge Card      
                                    }
                                }
                            }    
};
/********************************************************************************************************************************************** */

 

/************************************************************************************************************************** */





function onClick(e) {
    
}

function mouseOverSelect(x, y) {
    // pass;
    // select   
}

//  ----------------------------------------------------------------------------------------------------------------------------------------

function clickEvents() {
    let hand = Game.Player.human.hand;
    let clickX = Game.Controller.clickPosition.X;
    let clickY = Game.Controller.clickPosition.Y;
    for (let index = 0; index < hand.length; index++) {                                 //  cycle through cards in hand
        if (didMouseClickOnCard(index, hand.length, clickX, clickY) === true) {
            index++;
            let key = index.toString();
            let action = Game.Controller.bindings[key];
            if (Game.Controller.isMyTurn === true) {
                if (Game.Controller.actions[action] === false) {
                    Game.Controller.actions[action] =   true;
                }
            }
        }   
    }
}

function isMouseOverCard(cardNumber, arrayLength, x, y) {
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

function didMouseClickOnCard(cardNumber, arrayLength, x, y) {
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
    let xCenter = Game.Screens.gameScreen.canvas.width/2;
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
