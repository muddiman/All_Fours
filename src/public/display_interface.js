//  display_interface.mjs

/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode 
                     Code: DISPLAY INTERFACE    - 'Disp_int.mjs'                      
*/ 

//  interacts with the graphics library

//  import { displayScoreboard(a,b) } from '/lib/graphicslib.js';       // 'graphicslib.mjs'
// import * as graphics from './libs/graphicslib.mjs';
import * as gfx from '/src/lib/graphicslib';

//  Canvas for graphical layers
function gCanvasLayer(ID, _WIDTH, _HEIGHT, OPACITY, drawScreenFcn, period, Z, red, green, blue) {
    this.canvas = document.createElement("canvas");
    this.init = function () {
        this.canvas.width = _WIDTH;
        this.canvas.height = _HEIGHT;
        this.canvas.id = ID;
        this.ctx = this.canvas.getContext('2d');
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById(ID).style = "position: absolute; left: " + LEFTOFFSET + "px; top: " + TOPOFFSET + "px; z-index: " + Z + "; background-color: rgba(" + red + ", " + green + ", " + blue + ", " + OPACITY + ");";
        console.log("New " + this.canvas.id + " canvas initialized.");
        // this.canvas.style="background-color: rgba(255, 255, 255," + OPAQUE + ");";     // in rgba format
        this.refresh = setInterval(drawScreenFcn(), period);
    };
    this.clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    this.stop = function () {
        clearInterval(this.refresh);
    };
}

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