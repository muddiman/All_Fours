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

 function drawGameBoard() {
    gfx.gameBoard.init();
    gfx.displayScoreboard(2, 9);
 }

 function updateGameBoard(gameObjects) {
     gameBoard.ctx.clearBoard();
     for (objects in gameObjects) {
         // drawObject;
     }
     // pass
 }

 function updateGameArea(gameObjects, namedSection) {
     // pass;
     gameBoard.ctx.clearSection(namedSection);
     namedSection = {x, y, width, height};
     // load new section objects
     // draw new objects in specified section
 }

 /*
    function loadOjects {               // load objects to memory     
        gameObjects.push(newObject); 
    }

    function removeObjects {            // remove objects from memory
        gameObjectsRemove(object);
    }
 */