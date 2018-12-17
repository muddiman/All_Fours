/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode 
                     Code: GRAPHICS LIBRARY MODULE - 'graphicslib.js'                            
*/

/**
 *  @copyright (c) 2018 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com (OR: https://www.muddicode.com)
 *  @version   0.4.3
 *  @since     2018-10-1
 *  @license   Dual license - MIT & GPL
 *  @See:      http://www.gnu.org/licenses/gpl.html
 *             http://www.mit.edu/license
 */

 /*
       MODULE: graphicslib.mjs:
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

 /**
  *    Game Board object:
  *    Size - depending on the device on which it's being played 
  *    Only one "instance of the gameBoard object" is used for the entire duration of game play because of the nature of the platform (HTML Canvas)
  */

 /**  globals   */
 /**  CONSTANTS   */
 /**  Graphical Dimensions  */
const WIDTH=700;  //FOR Mobile Phones use: 400px;   // for fullscreen gaming use: window.innerWidth;
const HEIGHT=450;  //FOR Mobile Phones use: 600px;  // for fullscreen gaming use: window.innerHeight;
const CARDW=71;     // WIDTH of Cards in px
const CARDH=96;     // HEIGHT of Cards in px

export var gameBoard = {
       //  Object: gameBoard
           canvas : document.createElement("canvas"), 
           init : function () {    // initialize gameBoard by applying context & inserting the canvas in the "game_container" <div> 
               this.canvas.width = WIDTH;
               this.canvas.height = HEIGHT;
               this.canvas.id = "game_board";
               this.ctx = this.canvas.getContext("2d");
               document.getElementById("game_container").appendChild(this.canvas);   // attach gameBoard to the DOM
               // this.frameNo =0;
               // this.interval = setInterval(updateGameBoard, 20);      // 50fps: for animation
               // background-color set in 'style.css'
           },
           // if 'setInterval is used, there should be stop function
           // stop : function () {clearInterval(this.interval);}
           clearBoard : function () {
           // wipes the entire gameBoard clean
               this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
           },
           clearSection : function (x, y, width, height) {
           // wipes a section of gameBoard clean
           this.ctx.clearRect(this.x, this.y, this.width, this.height);
        },
       };

// Animation Board has its own transparent game board
// var gb[3] = new canvas
// ab = gb[3]
function animate(object) {
    var x, y;
    var frames = [];                // an array of screen_shots
    var fps = 30;                   // frame rate in frames per second
    var period = (1/fps)*1000 ;     // converted to milliseconds(ms)
    function frame() {
        gameBoard.clearBoard();
        gameBoard.ctx.drawImage(frames[frame], x,y);        // draw frame on game board;
        var frame = (frame + 1) % frames.length;            // loop back counter with out all the conditionals or loop statements
    }
    var animation = setInterval(frame,period);
    clearInterval(animation);   // stops animation
}  

/*
            Atlas
            Packing smaller images into one larger image
            texture atlasing - grouping textures --> software tool: texture packer
            (sprite sheet is used only for animating objects)
*/
function parseAtlas(atlasJSON) {
    var parsed = JSON.parse(atlasJSON);

    for (var key in parsed.frames) {
        var sprite = parsed.frames[key];
        // define the center of the sprite as an offset (hence the negative)
        var cx = -sprite.frame.w * 0.5;
        var cy = -sprite.frame.h * 0.5;

        // define the sprite for this sheet
        this.defSprite(key, sprite.frame.x, sprite.frame.y, sprite.frame.w, sprite.frame.h, spite.frame.cx, sprite.frame.cy);
    }
}

/*
        rendering images from the texture atlas/sprite sheet on the canvas

*/
function drawSprite(spritename, posX, posY) {
    // code here
}

function __drawSpriteInternal(spt, sheet, posX, posY) {
    // code here
}

/**
 * Display Scores in the top right corner for large display devices
 * or top middle for small devices in profile orientation
 * @param {*} a 
 * @param {*} b 
 */


// score Board has its own transparent game board
// var gb[2] = new canvas
// sb = gb[2]
 /**
* draws scoreboard on the gameboard
* @param {*} a Team A's current score - int
* @param {*} b Team B's current score - int
* @returns void
*/
export function displayScoreboard(a, b) {
   var c = gameBoard.canvas;
   var x = gameBoard.ctx;
   var upperLeftCornerX = c.width - 265;   //   (LxB: 260 x 120 box; x,y => 400,5)
   var upperLeftCornerY = 5;
   var width = 260;
   var height = 120;
   x.beginPath();
   x.lineWidth = 4;
   x.strokeStyle = "black";
   x.rect(upperLeftCornerX, upperLeftCornerY, width, height);
   x.stroke(); 
   // fill rectangle
   x.shadowBlur = 40;
   x.shadowColor = "black";
   x.fillStyle = "#ff0000";    // red
   x.fillRect(upperLeftCornerX, upperLeftCornerY, width, height); 
   // text
   x.fillStyle = "#ffffff";    // white
   x.font = "30px Arial";
   x.fillText("Team A:", upperLeftCornerX + 15, 40);
   x.fillText("Team B:", upperLeftCornerX + 15, 105);
   // score tiles (numbers)
   x.fillText(a, upperLeftCornerX + 215, 40);
   x.fillText(b, upperLeftCornerX + 215, 105);
}

//     Display Trump in top left corner
//     Display Lift 
//     "Count for game" animation
//     Display Human players hand
//     Display the played cards of a player relative to where the player is positioned
//     wipe board after each round of game play
//     wipe center of board after all player plays his card
//     display hang jack animation 
//     Display game winner w/congratulatort message
//     Display message

/**
 * TODO: determine the offset, given the string length, to draw msg on the dead center of the canvas
 * Draws the text on the canvas (gameBoard) at the center
 * @returns: null
 * @param {*} text -> message to display on gameBoard - string
 */
// Message Board has its own transparent game board
// var gb[1] = new canvas
// mb = gb[1]

export function message(text) {
       var gb = gameBoard.canvas;
       var gbx = gameBoard.ctx;
       var mBoxWidth = 10;      // message box dimensions
       var mboxHeight = 30;
       var x = gbx.width/2 - mBoxWidth/2;   // location of message box in relation to center of board
       var y = gbx.height/2 - mboxHeight/2;
       rect(x,y,mBoxWidth,mboxHeight);
       fillRect(x,y,mBoxWidth,mboxHeight); 
       x.fillText(text, x, y);
}

//     Draw image of card onto the gameBoard according the positioning parameters

// module.exports = new GAME_BOARD
// module.exports = new MESSAGE
// module.exports = new SCORE_BOARD
// module.exports = new ANIMATION