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

/**
 *      captures clicks, convert into user's choice and store that choice in the userInput object
 */
export function mouseEventHandler() {
    var posX, posY;
    var n=null;
    do {
        gameBoard.canvas.addEventListener('click', function (event) {   
            posX = event.clientX;
            posY = event.clientY;
            console.log(posX);
            console.log(posY);
        });
        // parse the coords obtained into card choice [0 .. 11] ie 12 possible choices
        if (350 < posY < 496) {
            switch (x-155) {
                case x < 72/2:
                    n=0;
                    break;
                case 72/2 < x < 72*2/2:
                    n=1;
                    break;
                case 72*2/2 < x < 72*3/2:
                    n=2;
                    break;
                case 72*3/2 < x < 72*4/2:
                    n=3;
                    break;
                case 72*4/2 < x < 72*5/2:
                    n=4;
                    break;
                case 72*5/2 < x < (72*6/2)+36:
                    n=5;
                    break;
                default:
                    n=null;    // change to zero from  null; 
            }
        } else {
            n=null;
        } 
    } while (n != null);                // while loop hangs game. incorrectly set to !=null so the game can run to end.
    playerInput.setUserInput(n);        // store user's choice into memory
    console.log(n);
    gameBoard.canvas.removeEventListener('click', function (event) {
        posX = event.clientX;
        posY = event.clientY;
        console.log(posX, +', '+ posY);
    });               
}

export function keyboardEventHandler() {
    // pass;
}

export function touchScreenEventHandler() {
    // pass;
}