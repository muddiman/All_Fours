/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode 
                     Code: DISPLAY INTERFACE    - 'Disp_int.mjs'                      
*/ 

// ;

 //import { displayScoreboard(a,b) } from '/lib/graphicslib.js';       // 'graphicslib.mjs'
// import * as graphics from './libs/graphicslib.mjs';
import * as gfx from '/src/lib/graphicslib';

/**
 * draws the game Area on Screen/webpage
 */

 function drawBoard() {
    gfx.gameBoard.init();
    gfx.displayScoreboard(2, 9);
 }
