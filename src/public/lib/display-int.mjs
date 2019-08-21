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

 //require('graphicslib');

 /*   the globals */
const WIDTH=700;
const HEIGHT=480;
const OPAQUE=0;
const TRANSPARENT=1.0;
const LEFTOFFSET=15;
const TOPOFFSET=110;      

import { gCanvasLayer } from "/lib/screen.mjs";       // 'graphicslib.mjs'

 /* Canvas Layer Objects */
//                     new gCanvasLayer(ID,            _WIDTH,_HEIGHT,OPACITY,      _drawScreenFcn,  period, Z, red, green, blue)
//  var gameBoard    = new gCanvasLayer("game_board",  WIDTH, HEIGHT, OPAQUE,       _drawScreenFcn,          0,              );
//  var cardsLayer   = new gCanvasLayer("cards_layer", WIDTH, HEIGHT, TRANSPARENT,  _drawScreenFcn,          1,              );
//  var msgLayer     = new gCanvasLayer("msg_layer",   WIDTH, HEIGHT, TRANSPARENT,  _drawMsgScreen,  FPS_2,  2, 255, 255, 255);
var menuLayer        = new gCanvasLayer("menu_layer",  _WIDTH, _HEIGHT, OPAQUE,     _drawMenuScreen, FPS_30, 3,    0,  0,   0);

export var Display = {
      //    Properties
      Screens:  {
      //    Properties
            BkgndScreen :  new gCanvasLayer("menu_layer",LEFTOFFSET, TOPOFFSET, WIDTH, HEIGHT, OPAQUE, 0,    0,  255,   0),
            gameScreen  :  new gCanvasLayer("menu_layer",LEFTOFFSET, TOPOFFSET, WIDTH, HEIGHT, TRANSPARENT, 1,    0,  0,   0),
            msgScreen   :  new gCanvasLayer("menu_layer",LEFTOFFSET, TOPOFFSET, WIDTH, HEIGHT, TRANSPARENT, 2,    0,  0,   0),
            menuScreen  :  new gCanvasLayer("menu_layer",LEFTOFFSET, TOPOFFSET, WIDTH, HEIGHT, OPAQUE, 3,    0,  0,   0),
      },
      //    Methods
      init: function () {
            this.Screens.BkgndScreen.init();
            this.Screens.gameScreen.init();
            this.Screens.msgScreen.init();
            this.Screens.menuScreen.init();
      }
};

/*    Menu Screen       */
/*    Card Screen       *
/*    Game Board        */
/*    Msg Screen        */