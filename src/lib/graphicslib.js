/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode 
                     Code: Main Program                            
*/

/**
 *  @copyright (c) 2018 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com (OR: https://www.muddicode.com)
 *  @version   0.1.1
 *  @since     2018-10-1
 *  @license   Dual license - MIT & GPL
 *  @See:      http://www.gnu.org/licenses/gpl.html
 *             http://www.mit.edu/license
 */

 /*
        The games graphics engine. The methods here draws directly on the HTML Canvas.
        --Initialize the game board via a constructor when the "new" keyword is used.
        --sets the frame rate (typically > 60fps)
        --adds and remove components to the gameboards
        --keeps an inventory of components on the canvas (eg. via an array of objects)
        --listens for mouse events in specified areas on the canvas
        --stops listening for mouse events
        --can only be access through the game's display interface, never directly from game
        --animate motion
        --clear the game board
        --update the game board

 */