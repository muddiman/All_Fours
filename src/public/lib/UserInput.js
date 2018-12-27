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
 function mouseEventHandler() {
    document.getElementById('game_board').addEventListener('click', function (e) {
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