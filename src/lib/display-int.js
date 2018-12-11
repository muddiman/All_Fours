/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode 
                     Code: DISPLAY INTERFACE    - 'Disp_int.mjs'                      
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

 /*
        The game's display interface. The methods here interacts with 
        the graphical library to diplay game componenets. The game's main code tells
        the interface what to display on the board.
        -- The display interface tells the graphics library what to display and how to display it and where t should be diplayed.
        -- Methods include: Display played card, Display Trump Card, Display 
              players cards (hand), Remove card from hand, Display lift and display/update scoreboard
              display Text such as player names, titles, information signs etc

 */

 require('graphicslib');

 import { displayScoreboard(a,b) } from 'graphicslib';       // 'graphicslib.mjs'