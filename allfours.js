/*
                Title:  TWO-MAN ALL FOURS GAME
                Language: Javascript
                Programmer: .muddicode 
                Code: Main Program                            
*/

/**
 *  @copyright (c) 2018-2019 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com  
 *  @version   0.9.1
 *  @since     2018-10-1
 *  @download  https://www.github.com/muddiman/All_Fours
 *  @license   NOT for 'commercial use'.
 *  @See:      http://www.roger-clarke.com/allfours/license.html
 *             Free to use and/or distribute for personal or academic purposes.
 *             Must site the source code using the following format at beginning or end of source code file where it was used:
 *             "Clarke, Roger A. (2018) All Fours Game (ver. 0.6.6) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman". 
 */

/**
 *     Alpha:  Completed Functional/playable/useable Program w/most of the final features included -- released for internal testing (0.7.0)
 *     Beta:   Completed Program w/ALL of the features included, bug-fixes found in alpha version -- released for external testing  (0.8.0)
 *     Release Candidate: Final version of game, all bugs found in beta, fixed. released to select segment of the public            (0.9.0)
 *     Final Version:  Shipped Version, released to the entire public                                                               (1.0.0)
 *     Version: 0.0.0 (a.b.c) -- where a --> major update, redesign, cumulative group of new features
 *                                     b --> addition of features, cumulative group of bug fixes
 *                                     c --> incremental bug fixes
 */

/*
   Major Elements of A Game:
   I. Setup Game (Options)
   II. Game Loop:
        1. Poll and handle elements
        2. Update game elements
        3. Draw Surface
        4. Show Surface
   III. Shut Down Game 

   MVC Model:
     Display Module     ==> Display-Interface.mjs     --> screens.mjs, 
     Controller Module  ==> controller.mjs    --> mouse.mjs, keyboard.mjs, touch.mjs, keymap.JSON
     Game Engine        ==> engine.mjs     --> 
     Main Game          ==> allfours.js
*/

/*  Programming Note:
    Assets Outstanding: Back of cards, background music, sound effects.
    Because the fisrt letter of every suit AND face of all cards are unique letters
    i can simplify the id of each card to a 'two-letter' string.
    ie: ace of heart is simply 'ah', ten of clubs is 'tc' and nine of diamonds is '9d'
    This simplifies coding tremendously. All filenames of card images were adjusted accordingly. ie: 2d.png is the 'two of diamonds' image file.
*/

/*  imports */
// import { SETTINGS }                 from "./lib/settings.mjs";
// import { Display }                  from "./lib/display-interface.mjs";
// import { Player }                   from "./lib/player.mjs";
// import { Card, gCardImageCacheObj } from "./lib/card.mjs";
// import { Engine }                   from "./lib/engine.mjs";
// import { computerAI }               from "./lib/ai.mjs";
// import { sndFx, bkgndMusic }        from "./lib/soundlib.mjs";
// import { tickertape }               from "./lib/tickertape.mjs";
// import { debug, DEBUG_MODE }        from "./lib/debugging.mjs";
// import { Controller }               from "./lib/controller.mjs";

// import { playSoundInstance, Sound }    from "./lib/soundlib.mjs";
// import { Display } from "/lib/displayInterface.mjs";

/*  replace import statements with a script loader function */
// loadAllGameComponents();
/* scriptArray.forEach(element => {
    loadScript(element);
}); */

/*  IIFE */

/***************************************     the globals *  ********************************************************/

/*  boolean settings    */
const ON=true;
const OFF=false;
const ENABLED=true;
const DISABLED=false;

/*  Flags   */
const ADS=ON;
const MAGNIFY_CARD=ON;   //  SETTINGS.MOUSE_OVER;

/* necessary game dimensions */
const WIDTH   = 700; //use window.innerWidth;  for fullscreen gaming
const HEIGHT  = 450; //use window.innerHeight; for fullscreen gaming
const CARD_W  =  72; // card width
const CARD_H  =  96; // card height

/* card FACES & SUITS arrays */
const SUITS = ['c', 'd', 'h', 's'];
const FACES = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'];

/* Clear/Opaque */
const TRANSPARENT =   0;
const OPAQUE      = 1.0;


/* Players */
const PLAYER1_NAME = "Computer";
const PLAYER2_NAME = "You";

const MAX_CARDS_IN_HAND=12;
const MAX_POINTS=14;
const MAX_CARDS_IN_LIFT=48;
const MAX_CHARACTERS=10;

/* Canvas top-left corner coords (in px) */
const LEFTOFFSET =  15;
const TOPOFFSET  = 180;
const MARGIN=5;
const USERHAND_Y=340;


/* IMAGES   */
const advertisement = new Image();
var gCardImageCacheObj = {};

/*   different settings   */
const displayArr=["desktop", "tablet", "mobile"];
const playerArr=["TWO_PLAYER", "FOUR_PLAYER"];
const difficultyArr=["EASY", "HARD", "PRO"];
/*  Display Settings    */
const scoreboardWIDTH=260;
const scoreboardHEIGHT=120;
const defaultWIDTH=700;
const defaultHEIGHT=450;

/*  Sound  */
var sndFx = [];             //  load sound effects into array
/*  Background Music    */
var bkgndMusic = [];        //  load background music streams into array                                                                   
/* Animation Constants */
// const CONVERT_TO_RADIANS = Math.PI / 180;

//------------------------------------------------------------------------------------------------------------------
/*  THE CLASSES/OBJECT CONSTRUCTORS  */

// var gAssetCacheArr = [];    OR as an object:    var gAssetCacheObj = {};


//-------------------------------------------------------------------------------------------------------------------------
/*          THE OBJECTS             */


//  obtain objects from .JSON files or external class files

/*  Image Cache  */
// card images
// var gCardImageCacheObj = {}; // object of cached card images

/* game board object */

/*  NOTE: I Remove game_board and use game Background instead.
    There was no need to constantly update the background @ 24 fps.
    All game components that are not frequently updated can be placed in the background
*/
/*  default  SETTINGS  */
var SETTINGS = {
    SOUND       :   ENABLED,
    DEBUG_MODE  :   DISABLED,
    MOUSE_OVER  :   ENABLED,                //  card-higlight/mouse-over
    MASTER_VOLUME :   10,                    //  MASTER VOLUME: Range between 0 .. 10
    SOUNDmixer  :   {
                        SndFX:  [8, 8, 8],         //  n channels
                        Bkgnd:  [5, 5],         //  2 or 3 channels
                    },
    DISPLAY_MODE:   displayArr[0],
    MODE        :   playerArr[0],
    DIFFICULTY  :   difficultyArr[0],
    setSound    :   function (onOrOff) {
                        if (onOrOff === true || onOrOff === false) {
                            this.SOUND = onOrOff;
                        } else {
                            debug.console(`Invalid Type: Parameter ${onOrOff} must be of type boolean.`);
                        }
                    },
    setDebugging:   function (onOrOff) {
                        if (onOrOff === true || onOrOff === false) {
                            this.DEBUG_MODE = onOrOff;
                        } else {
                            debug.console(`Invalid Type: Parameter ${onOrOff} must be of type boolean.`);
                        }
                    },
    setMouseHighlight:  function (onOrOff) {
                            if (onOrOff === true || onOrOff === false) {
                                this.MOUSE_OVER = onOrOff;
                            } else {
                                debug.console(`Invalid Type: Parameter ${onOrOff} must be of type boolean.`);
                            }
                        },
    setVolume   :   function (volume) {
                        if (volume >= 0 && volume <= 10) {
                            this.MASTER_VOLUME = volume;
                        } else {
                            debug.console(`Invalid Type: Parameter ${volume} must be of type integer, between 0 and 10.`);
                        }
                    },
    setDisplayMode   :   function (mode) {
                        if (mode === displayArr[0] || mode === displayArr[1] || mode === displayArr[2]) {
                            this.DISPLAY_MODE = mode;
                        } else {
                            debug.console(`Invalid Input: Parameter ${mode} must be of ${displayArr}.`);
                        }
                    },
    setPlayerMode   :   function (mode) {
                        if (mode === playerArr[0] || mode === playerArr[1]) {
                            this.MODE = mode;
                        } else {
                            debug.console(`Invalid Input: Parameter ${mode} must be of ${playerArr}.`);
                        }
                    },
    setDifficultyMode:  function (mode) {
                        if (mode === difficultyArr[0] || mode === difficultyArr[1] || mode === difficultyArr[2]) {
                            this.DIFFICULTY = mode;
                        } else {
                            debug.console(`Invalid Input: Parameter ${mode} must be of ${difficultyArr}.`);
                        }
                    },
    init:           function (sound, debug, mouse, volume, display, players, difficulty, sndLevel, musLevel) {
                        this.setSound(sound);    // this.SOUND    =   sound;
                        this.setDebugging(debug);    //  this.DEBUG_MODE  =   debug;
                        this.setMouseHighlight(mouse);    //  this.MOUSE_OVER  =   mouse;         //  card-higlight/mouse-over
                        this.setVolume(volume);        //  MASTER VOLUME: Range between 0 .. 10
                        this.setDisplayMode(display);   //   displayArr[display];
                        this.setPlayerMode(players);       //   =   playerArr[players];
                        this.setDifficultyMode(difficulty); //  =   difficultyArr[difficulty];
                        this.SOUNDmixer.Bkgnd.forEach(channel => {
                            channel = musLevel;
                        });
                        this.SOUNDmixer.SndFX.forEach(channel => {
                            channel = sndLevel;
                        });
                    },
};

/*  load saved settings from json   */
function loadSettingJson(url) {
    settingsOBJ = getFile(url);
    // settingsOBJ  = JSON.parse(settingsJSON);
    SETTINGS.init(settingsOBJ.SOUND, settingsOBJ.DEBUG, settingsOBJ.MOUSE_OVER, settingsOBJ.MASTER_VOLUME, settingsOBJ.DISPLAY, settingsOBJ.MODE, settingsOBJ.DIFFICULTY, 7, 3);
}

function getFile(filenameJSON) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            // document.getElementById("demo").innerHTML = myObj.name;
        }
    };
    xmlhttp.open("GET", filenameJSON, true); 
    xmlhttp.send();
    return myObj;
}
function saveFile(settingsObject) {
    var jsonhttp = new XMLHttpRequest();
    var sendFile = JSON.stringify(settingsObject);
/*     jsonhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var sendFile = JSON.stringify(settingsObject);
        }
    }; */
    jsonhttp.open("POST", "settings.json", true);
    jsonhttp.send("settings.json");
}

/*
================================================================================================================================
*/
/*  screen canvas class */
console.log(`Reading the 'Screen' script`);
function gCanvasLayer(ID, zIndex, color) {
    this.width  =  Math.floor(this.scale * defaultWIDTH);   //  WIDTH;
    this.height =  Math.floor(this.scale * defaultHEIGHT);  //  HEIGHT;
    this.canvas =  document.createElement("canvas");
    this.init = function () {
        this.canvas.width  = this.width;
        this.canvas.height = this.height;
        this.canvas.id = ID;
        this.z = zIndex;
        this.color = color;
        this.canvas.setAttribute("class", "screen");
        this.ctx = this.canvas.getContext('2d');
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById(ID).style = `position: absolute; left: ${this.xOffset}px; top: ${this.yOffset}px; z-index: ${this.z}; background-color: ${this.color};`;
        console.log(`New ${this.canvas.id} canvas initialized.`);
        return this;
    };
}
/*  Prototypes  */
// universal properties
gCanvasLayer.prototype.scale    = setScale(window.innerWidth, window.innerHeight);   // 1;
gCanvasLayer.prototype.getScale = function () {
                                    return this.scale;
                                };
gCanvasLayer.prototype.xOffset  = LEFTOFFSET;  //  Math.floor(this.scale * LEFTOFFSET);
gCanvasLayer.prototype.yOffset  = TOPOFFSET;  //    Math.floor(this.scale * TOPOFFSET);
//  universal methods
gCanvasLayer.prototype.clear    = function () {
                                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                                    return this;
                                };
gCanvasLayer.prototype.clearSection  = function (x, y, width, height) {
                                    this.ctx.clearRect(this.scale * x, this.scale * y, this.scale * width, this.scale * height);
                                    return this;
                                };
gCanvasLayer.prototype.setFont  = function (fontString) {
                                     this.ctx.font = fontString;
                                     return this;
                                };
/*  the universal drawing functions    */                            
gCanvasLayer.prototype.text = function (text, color, x, y, centered) {
                                    if (centered === true){
                                        this.ctx.textAlign    = "center";
                                        this.ctx.textBaseline = "middle";
                                    }
                                    this.ctx.fillStyle = color;         //  in rgb or rgba string
                                    this.ctx.fillText(text, this.scale * x, this.scale * y);
                                    return this;
                                };
gCanvasLayer.prototype.placeImage = function (image, x, y, width, height) {
                                    this.ctx.drawImage(image, this.scale * x, this.scale * y, this.scale * width, this.scale * height);
                                    return this;
                                };
gCanvasLayer.prototype.drawRectangle = function (strokeStyle, lineWidth, x, y, width, height, color) {
                                    this.ctx.beginPath();
                                    this.ctx.lineWidth = lineWidth; //  4
                                    this.ctx.strokeStyle = strokeStyle; //  "black";
                                    this.ctx.rect(this.scale * x, this.scale * y, this.scale * width, this.scale * height);
                                    this.ctx.stroke();
                                    this.ctx.fillStyle = color;
                                    this.ctx.fillRect(this.scale * x, this.scale * y, this.scale * width, this.scale * height); 
                                    return this;
                                };
gCanvasLayer.prototype.shadow = function (color, xOffset, yOffset, blur) {
                                    this.ctx.shadowBlur = blur;
                                    this.ctx.shadowOffsetX = this.scale * xOffset;
                                    this.ctx.shadowOffsetY = this.scale * yOffset;
                                    this.ctx.shadowColor = color;
                                    return this;
                                }; 

function setScale(deviceWidth, deviceHeight) {
    let scale = 1;
    if (deviceWidth <= defaultWIDTH + MARGIN || deviceHeight <= defaultHEIGHT + MARGIN) {
        if (deviceWidth <= deviceHeight) {
            scale = deviceWidth /  (defaultWIDTH + MARGIN);
        } else { 
            scale = deviceHeight / (defaultHEIGHT + MARGIN);
        }        
    }
    console.log(`Screen Scale = ${scale}.`);
    return scale;
}
                                
/*
==============================================================================================================================
*/
/*  The Display OBJECT  */
console.log(`Reading the 'Display' script`);

var Display = {
    onBackground:          new gCanvasLayer("game_board",    0, "rgba( 68, 102, 210, 1.0)"),
    onCardScreen:          new gCanvasLayer("card_layer",    1, `rgba(  0,   0,   0, 0.0)`),
    onMsgScreen:           new gCanvasLayer("msg_layer",     2, `rgba(255, 255, 255, 0.0)`),
    onMenuScreen:          new gCanvasLayer("menu_layer",    3, `rgba(204, 204, 204, 0.8)`),
    onVideoScreen:         new gCanvasLayer("video_screen",  5, `rgba(  0,   0,   0, 0.0)`),
    init:       function () {
                    this.onBackground.init();
                    this.onCardScreen.init();
                    this.onMsgScreen.init();
                    this.onMenuScreen.init();
                    this.onVideoScreen.init();
                    // this.onMsgScreen.canvas.style.visibility = "hidden";     
                    this.onVideoScreen.canvas.style.visibility = "hidden";     
                    return this;
                },
/*  methods  */
    labels:     function (hand) {
                    let fontSize = Math.floor(this.onBackground.scale * 15);    
                    this.onBackground.setFont(`bold ${fontSize}px Arial`).text("TRUMP", "rgba(254,254,254,1.0)", 15, 30 + CARD_H); 
                    for (let index = 0; index < hand.length; index++) {
                        this.onBackground.text(index + 1, "rgba(254,254,254,1.0)", cardLocation(index, hand.length)  + CARD_W / 4, HEIGHT - 2);
                    }
                    return this;
                },
    scoreboard: function (players) {
                    let c = this.onBackground.canvas;
                    const x = this.onBackground.ctx;
                    const upperLeftCornerX = WIDTH - scoreboardWIDTH - MARGIN;         //   (LxB: 260 x 120 box; x,y => 400,5)
                    const upperLeftCornerY = MARGIN;
                    this.onBackground.drawRectangle("black", 4, upperLeftCornerX, upperLeftCornerY, scoreboardWIDTH, scoreboardHEIGHT, "#663300")
                        .shadow("black", 10, 10, 40);
                    let fontSize = Math.floor(this.onBackground.scale * 30);    
                    this.onBackground.setFont(`bold ${fontSize}px Arial`)
                        .text(players.computer.name,  "#ffffff", upperLeftCornerX + 15, 40, false)
                        .text(players.human.name,     "#ffffff", upperLeftCornerX + 15, 105, false)
                        .text(players.computer.score, "#ffffff", upperLeftCornerX + 215, 40, false)               
                        .text(players.human.score,    "#ffffff", upperLeftCornerX + 215, 105, false);               
                    return this;
                }, 
    adbox:      function (adImage) {
                    const x = 2 * MARGIN;
                    const y = HEIGHT - 2 * MARGIN - CARD_H;
                    const adWidth  = CARD_H;
                    const adHeight = CARD_H;
                    this.onBackground.drawRectangle("white", 3, x, y, adWidth, adHeight, "rgba(0, 0, 0, 0)")
                    .shadow("black", 10, 10, 40); 
                    this.onBackground.placeImage(adImage, x+2, y+2, adWidth-4, adHeight-4);                  
                },                             
    trump:      function (card) {
                    const topCornerX = MARGIN;      // 5 pixels in
                    const topCornerY = MARGIN;
                    this.onBackground.placeImage(card.image, topCornerX, topCornerY, CARD_W, CARD_H); // upper left corner (x,y) => (5,5)
                    return this;
                },
    playCard:   function (playPosition, card) {
                    // const c = this.onCardScreen.canvas;
                    // const x = this.onCardScreen.ctx;
                    const xCenter = WIDTH  / 2;
                    const yCenter = HEIGHT / 2;
                    switch (playPosition) {
                        case "left":
                            if (card) { 
                                this.onCardScreen.placeImage(card.image, xCenter - 60, yCenter - 30, CARD_W, CARD_H);
                            }
                            break;
                        case "top":
                            if (card) {
                                this.onCardScreen.placeImage(card.image, xCenter - 40, yCenter - 50, CARD_W, CARD_H);
                            }
                            break;
                        case "right":
                            if (card) {
                                this.onCardScreen.placeImage(card.image, xCenter - 20, yCenter - 30, CARD_W, CARD_H);
                            }
                            break;
                        case "bottom":
                            if (card) {
                                this.onCardScreen.placeImage(card.image, xCenter - 40, yCenter - 10, CARD_W, CARD_H);
                            }
                            break;
                        default:
                         /*    if (card) {
                                this.onCardScreen.placeImage(card.image, xCenter - 60, yCenter - 30, CARD_W, CARD_H);
                            } */
                    }
                    return this;
                },
    hand:       function (hand) {
                    // console.log(`${hand[0]}`);
                    if (hand) {
                        let coordX=0;
                        const coordY = USERHAND_Y;
                        for (let i = 0; i < hand.length; i++) {
                            // coordX = cardLocation(i, hand.length);
                            coordX = (WIDTH/2) - Math.ceil(hand.length / 2) * CARD_W/2 +  i * CARD_W/2 ;
                            // cardLocation(i, hand.length);
                            // console.log(`X: ${coordX}.  Y: ${coordY}`);
                            this.onCardScreen.placeImage(hand[i].image, coordX, coordY, CARD_W, CARD_H);
                        }
                    }
                    return this;
                },
    showcaseCard:   function (bigCard) {
                    if (bigCard) {
                        // poll the Gameboard object for a card in the select-property and displays it 1.5x its normal size
                        const c = Display.onCardScreen.canvas;
                        this.onCardScreen.placeImage(bigCard.image, WIDTH / 2 - 0.75 * CARD_W, HEIGHT - 1.5 * CARD_H, 1.5 * CARD_W, 1.5 * CARD_H);
                    }
                    return this;
                },                                   
    message:    function (msgboard) {
                    this.onMsgScreen.canvas.style.visibility = "visible";
                    let fontSize = Math.floor(this.onBackground.scale * 20);    
                    this.onMsgScreen.setFont(`bold ${fontSize}px Monaco`);
                      for (let i=0;i<msgboard.text.length;i++) {
                         this.onMsgScreen.text(msgboard.text[i], "rgba(0, 255, 0, 1.0)", (WIDTH / 2), 200 + i*25, true);
                      }
                        // .text(msgboard.text, "rgba(255, 255, 0, 1.0)", WIDTH / 2, 200, true);
                    this.onMsgScreen.canvas.addEventListener("click", this.clearMsgBoard);
                    let pauseID = setTimeout(()=>{
                        clearTimeout(pauseID);
                        this.clearMsgBoard(msgboard);
                    }, 3000);
                },
    msgBox:     function (message) {
                    this.onMsgScreen.canvas.style.visibility = "visible";
                    this.onMsgScreen.drawImage("solid", "2px", 200, 150, 200, 150, "rgb(0, 255, 0)");
                },
    clearMsgBoard:  function (msgboard) {
                    msgboard.init();
                    this.onMsgScreen.clear();
                    this.onMsgScreen.canvas.removeEventListener("click", this.clearMsgBoard);
                    this.onMsgScreen.canvas.style.visibility = "hidden";
                },
    menu:       function () {
                    let fontSize = Math.floor(this.onBackground.scale * 30);    
                    let fontSize1 = Math.floor(this.onBackground.scale * 100);    
                    let fontSize2 = Math.floor(this.onBackground.scale * 50);    
                    this.onMenuScreen.setFont(`${fontSize}px Arial`)
                        .text("Lets play", "rgba(254,254,254,1.0)", 200, 125, false )
                        .setFont(`${fontSize1}px Arial`)
                        .text("All Fours", "rgba(254,254,254,1.0)", 75, 250, false )
                        .setFont(`${fontSize2}px Arial`)
                        .text("loading...", "rgba(254,254,254,1.0)", 200, 415, false );
                },
    video:      function (videoclip) {
                    const vWidth = 960/2;                     //  size(50%)
                    const vHeight = 540/2;                    //  position
                    const posX = WIDTH/2 - vWidth/2;          //  center of board
                    const posY = HEIGHT/2 - vHeight/2;
                    videoclip.addEventListener("play", () => {
                        videoclip.addEventListener("end", () => {
                                                            clearInterval(intervalID);
                                                            this.removeVideo(videoclip);
                                                        });
                        this.onVideoScreen.canvas.addEventListener('click', () => {
                                                                                        clearInterval(intervalID);
                                                                                        this.removeVideo(videoclip);
                                                                                    });
                                            });
                    let intervalID = setInterval(() => {      
                        this.onVideoScreen.clear();
                        this.onVideoScreen.shadow("rgba(0, 0, 0, 0.7)", 10, 15 ,10);
                        this.onVideoScreen.placeImage(videoclip, posX, posY, vWidth, vHeight); 
                        let fontSize = Math.floor(this.onBackground.scale * 50);    
                        this.onVideoScreen.setFont(`${fontSize}px serif`);
                        let centerX = WIDTH / 2;                //  - Number(textSize.width) / 2;
                        this.onVideoScreen.text('Hang Jack!!!', 'rgb(255, 255, 255)', centerX, HEIGHT / 2, true);     
                    }, 1000/15);
                    this.onVideoScreen.canvas.style.visibility = "visible";    
                    videoclip.play();
                }, 
    removeVideo: function (videoclip) {
                    videoclip.pause();
                    this.onVideoScreen.clear();
                    this.onVideoScreen.canvas.removeEventListener('click', () => {
                                                                                    removeVideo(videoclip);
                                                                                    clearInterval(intervalID);
                                                                                });
                    videoclip.removeEventListener('end', () => {
                                                                                    removeVideo(videoclip);
                                                                                    clearInterval(intervalID);
                                                                                });
                    this.onVideoScreen.canvas.style.visibility = "hidden";    
                },            
};

function cardLocation(i, arrayLength) {
    // console.log(i +", "+ arrayLength);
    // let xCenter = (WIDTH/2);                      //  Display.onBackground.canvas.width/2;
    return (WIDTH/2) - Math.ceil(arrayLength / 2) * CARD_W/2 +  i * CARD_W/2;
}

/************************************************************************************************************************************ */
/*  Debugging Sections  */
console.log(`Reading the debugging script`);

const DEBUG_MODE=false;
const debug = {
    isUpdated:  false, 
    // screen:     new gCanvasLayer("debug_screen", 400 + 72, 450, 300 - 72, 150, 0.2, 4, 0, 0, 0),
    init:       () => {
                    if (DEBUG_MODE === true) {
                        let debugDiv = document.getElementById("debug_section");
                        let dbgHeading = document.createElement("H2");
                        dbgHeading.innerHTML = "DEBUGGING";
                        debugDiv.appendChild(dbgHeading);
                        let dbg = document.createElement("p");
                        dbg.id = "debug_p";
                        dbg.style.height = "200px";
                        dbg.innerHTML = "Testing...";
                        debugDiv.appendChild(dbg);
                    }
                },
    msg:        (text) => { 
                    if (DEBUG_MODE === true) {
                        let x = this.screen.ctx;
                        x.fillStyle = "#ffffff";
                        x.font = `20px Consolas`;                // white
                        // this.screen.setFont("30px Consolas");
                        x.fillText(text, 430, 480);            //  test
                    }
                },    
    console:    (msg) => {
                    if (DEBUG_MODE === true) {
                        console.log(msg);
                    }
                },
    display:    (msg) => {
                    if (DEBUG_MODE === true) {
                        // let d = document.getElementById("debug_section");
                        // d.innerHTML = msg;
                        document.getElementById("debug_section").style.backgroundColor = "rgb(217, 217, 217)";
                        let p = document.getElementById("debug_p");
                        // let p = document.createElement("p");
                        p.innerHTML = msg;
                        // d.appendChild(p);
                    }
                },         
    showComputerHand:    (computerHand) => {
                            if (DEBUG_MODE === true) {
                                computerHand.forEach(card => {
                                    console.log(`${card.getCardName()}`);
                                });
                            }
                        },
};

/*
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
*/
/*  CONTROLLER SECTIONS */
console.log(`Loading controller scripts...`);
/* mouse controller object  */
var Mouse = {
    currentX:           null,
    currentY:           null,
    clickX:             null,
    clickY:             null,
    onClick:            function (event, hand, displayScale, xOffset, yOffset, handLocationY) {
                            this.clickX = event.clientX - xOffset;    
                            this.clickY = event.clientY - yOffset;     
                            debug.console(`Click location: (Xcoord: ${this.clickX}, Ycoord: ${this.clickY})`);
                            return clickEvents(hand, displayScale, handLocationY);
                        },
};
/********************************************************************************************************************************************** */

 
//  ----------------------------------------------------------------------------------------------------------------------------------------

function clickEvents(hand, currentScale, yHandPosition) {

    for (let index = 0; index < hand.length; index++) { 
        //  cycle through cards in hand, and match curson location to card location
        const card = hand[index];
        if (didMouseClickOnCard(index, card, hand.length, Mouse.clickX, Mouse.clickY, currentScale, yHandPosition) === true) {
            index++;
            return index.toString();
        }
    }
}   

function moveEvents(Controller, hand, currentScale, yHandPosition) {
/*  let clickX = Controller.clickPosition.X;
    let clickY = Controller.clickPosition.Y; */
    for (let index = 0; index < hand.length; index++) {                //  cycle through cards in hand
        const card = hand[index];
        if (isMouseOverCard(index, card, hand.length, Mouse.currentX, Mouse.currentY, currentScale, yHandPosition) === true) {
            index++;
            let key = index.toString();
            let action = Controller.bindings[key];
            if (Controller.isMyTurn === true) {
                /* if (Controller.actions[action] === false) {
                    Controller.actions[action] =   true;
                } */
            }
        }   
    }
}

function isMouseOverCard(cardNumber, card, arrayLength, x, y, scaleFactor, yOrdinate) {
    return  checkPointerLocation(cardNumber, card, arrayLength, x, y, scaleFactor, yOrdinate); 
}

function didMouseClickOnCard(cardNumber, card, arrayLength, x, y, scaleFactor, yOrdinate) {
    return  checkPointerLocation(cardNumber, card, arrayLength, x, y, scaleFactor, yOrdinate); 
}

function checkPointerLocation(cardNumber, card, arrayLength, x, y, scale, handLocY) {
    let upperLeftCornerX = scale * xCardLocation(cardNumber, card, arrayLength);
    let upperLeftCornerY = scale * handLocY;

    if (upperLeftCornerX < x && x < upperLeftCornerX + (scale * card.CARD_W / 2)) {
        if (upperLeftCornerY < y && y < upperLeftCornerY + (scale * card.CARD_H)) {
            return true;
        }
    }
    if (cardNumber === arrayLength - 1) {           //  LAST CARD
        if (upperLeftCornerX < x && x < upperLeftCornerX + (scale * card.CARD_W)) {
            if (upperLeftCornerY < y && y < upperLeftCornerY + (scale * card.CARD_H)) {
                return true;
            }
        }    
    }
    return false;
}

function xCardLocation(i, card, arrayLength) {
    let xCenter = WIDTH / 2;      //    Game.Screens.gameScreen.canvas.width/2;
    let xLocation = xCenter - Math.ceil(arrayLength / 2) * card.CARD_W/2 +  i * card.CARD_W/2 ;
    return xLocation; 
}

/*  KEYBOARD controls   */

var Keyboard = {
    pressedKey:     null,
    onKeyDown:  function (event) {
                    this.pressedKey = event.key;
                    if (this.pressedKey) {
                        debug.console("ID: ", this.pressedKey);                             // ASCII id of key thats was pressed
                    }
                    return this.pressedKey;
                },
};

/*  TOUCH controls  */
//  not ready yet


/******************************************************************************************************************************************* */

    /*  ALL controls  */
var Controller = {
listeners:      function (screen, hand, callback) {        // add mouse, touch & keyboard
                    screen.canvas.addEventListener("click", (e) => {
                                                                let key = Mouse.onClick(e, hand, screen.getScale(), screen.xOffset, screen.yOffset, USERHAND_Y);
                                                                let action =  this.bindings[key];
                                                                console.log(`${key}!!`);
                                                                // this.actions[action] = true;
                                                                callback(action);
                                                            }, true);
                    window.addEventListener("keydown", (e) => {
                                                                let key = Keyboard.onKeyDown(e);
                                                                let action = this.bindings[key];
                                                                // this.actions[action] =   true;
                                                                callback(action);
                                                            }, true);
                    screen.canvas.addEventListener("touch", (e) => {
                                                                let key = Touch.onTouch(e, hand);
                                                                let action =  this.bindings[key];
                                                                // this.actions[action] = true;
                                                                callback(action);
                                                            }, true);                                         
                    debug.console("All listeners started.");
                },     
bindings: {
    'Escape'    : 'toggleMenuScreen',
    '1'         : 'playCard_1',
    '2'         : 'playCard_2',
    '3'         : 'playCard_3',
    '4'         : 'playCard_4',
    '5'         : 'playCard_5',
    '6'         : 'playCard_6',
    '7'         : 'playCard_7',
    '8'         : 'playCard_8',
    '9'         : 'playCard_9',
    'ArrowRight': 'selectNext',
    'ArrowLeft' : 'selectPrevious',
    'Enter'     : 'confirmSelection',
    ' '         : 'confirmSelection',
    'p'         : 'togglePause',
    'm'         : 'toggleMute'
 },

 actions: {
    'toggleMenuScreen': false,
    'playCard_1'    : false,
    'playCard_2'    : false,
    'playCard_3'    : false,
    'playCard_4'    : false,
    'playCard_5'    : false,
    'playCard_6'    : false,
    'playCard_7'    : false,
    'playCard_8'    : false,
    'playCard_9'    : false,
    'selectNext'    : false,
    'selectPrevious': false,
    'confirmSelection': false,
    'togglePause'         : false,
    'toggleMute'          : false,
 },
};  
/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/




/*  GAME ENGINE SECTION */
/*  flags   */
var METHODOLOGY="setInterval";      // or "requestAnimationFrame"
console.log(`Reading Engine script.`);
/*   Game Engine    */
var Engine = function(time_step, render, gameLoop) {
//  this.update         = update;                   // update function
    this.time_interval  = time_step;                // related to the games frame rate
    this.render         = render;                   // render function (undefined)
    this.gameLoop       = gameLoop;                 // game logic loop
    this.time           = 0;                        // previous time_stamp
    this.accumulated_time = 0;                      // amt. of time that has accumulated since last update fcn call
    this.loopCounter    = 0;
    this.isBehind       = false;                     // if Engine is running behind and getting trouble keeping up with current frame rate
    this.animate        = function () {
                            // console.trace('Animate - Request Animation Frame loop:');
                            this.loopCounter = (this.loopCounter + 1) % 60;
                                if (this.loopCounter === 0) {
                                    gameLoop();
                                    render();
                                }
                            // render();
                            // this.gameLoop();
                            requestAnimationFrame(this.animate);
                            // requestAnimationFrame(this.start());
                        }; 
    this.start          = function () {
                            // console.trace('RunID - setInterval loop:');
                            //  debug.console(`using ${METHODOLOGY}.`);
                            // this.init();
                            // var n=0;                // for debugging
                            // var r=0;
                            this.runID = setInterval(() => {
                            // render();
                                let time_stamp = Date.now();
                                if (this.time === 0) {
                                    this.time = time_stamp;
                                } 
                                this.accumulated_time += time_stamp - this.time;
                                // debug.console(this.accumulated_time);                     // debugging
                                this.time = time_stamp;
                                this.render();
                                this.loopCounter = (this.loopCounter + 1) % 24;
                                if (this.loopCounter === 0) {
                                    this.gameLoop();
                                }
                                /*  this check ensures the system won't crash trying to keep up with timely cycles 
                                it ignores updates & renders if the accumulated time extends for more than 3 cycles   */
                                if (this.accumulated_time >= this.time_interval * 3) {
                                    debug.console(`A lot behind ${this.accumilated_time}`);
                                    this.accumulated_time = 0;
                                    //  debug
                                    // n++;
                                }
                                /*  keeps the engine updated if cycle time lapses for more than a cycle     */
                                while (this.accumulated_time >= this.time_interval) {
                                    this.accumulated_time -= this.time_interval;
                                    //  this.update();
                                    this.isBehind = true;
                                }
                                if (this.isBehind) {       //  screen is drawn only when when the matrix is updated
                                    this.render();
                                    // r++;                    //   debugging
    /*                                 debug.console(`one behind ${r}`);  */
                                    // debug.console(this.accumulated_time); 
                                    this.isBehind = false;
                                }
                            }, this.time_interval);

                        };
    this.stop           = () => {
                               clearInterval(this.runID);
                               cancelAnimationFrame(this.animate);
                        };
};
/* Prototypes   */
Engine.prototype.init = function () {
    //  this.time_interval    = time_step;                // related to the games frame rate
    //  this.update           = update;                   // update function
    //  this.render           = render;                   // render function (undefined)
    this.time             = 0;                        // previous time_stamp
    this.accumulated_time = 0;                      // amt. of time that has accumulated since last update fcn call
    this.isBehind        = false;
    //  this.animate          = requestAnimationFrame(callback);
};

/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/
/*  SOUND LIBRARY   */

/*  sound constructor/class */
function Sound(src) {
    this.sound          = document.createElement("audio");
    this.sound.src      = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.audible = true;
    this.sound.trackVolume = 1.0;
    document.getElementById("game_container").appendChild(this.sound);
    // document.body.appendChild(this.sound);      //   Attach sound to 'canvas' instead of 'body' 
}
Sound.prototype.mainVolume      = SETTINGS.MASTER_VOLUME / 10;
Sound.prototype.mute        = false;
Sound.prototype.muteAll     = function () {
                                if (this.mute === false) {
                                    this.mute = true;
                                } else {
                                    this.mute = false;
                                }
                            };
Sound.prototype.setFxTrackVolume = function (n) {
                                this.sound.trackVolume = n / 10; // Math.floor((SETTINGS.MASTER_VOLUME / 10) * SETTINGS.SOUNDmixer.sndFx[n]) / 10;
                            }; 
Sound.prototype.setMusicTrackVolume = function (n) {
                                this.sound.trackVolume = n / 10; //  Math.floor((SETTINGS.MASTER_VOLUME / 10) * SETTINGS.SOUNDmixer.Bkgnd[n]) / 10;
                            };                                                     
Sound.prototype.play        = function() {
                                if (this.mute === false && SETTINGS.SOUND === true) {
                                    if (audible === true) {
                                        this.sound.play();  
                                    }
                                }
                            };
Sound.prototype.stop        = function() {
                                this.sound.pause();
                            };
Sound.prototype.loopAudio   = function () {
                            if (!this.sound.loop) {
                                this.sound.setAttribute("loop", "loop");
                            } else {
                                this.sound.removeAttribute("loop", "loop");
                            }
                        };
Sound.prototype.muteTrack   = function () {                 //  toggle the mute function
                            if (this.audible === false) {
                                // this.sound.setAttribute("muted", "muted");
                                this.audible = true;
                            } else {
                                // this.sound.removeAttribute("muted", "muted");
                                this.audible = false;
                            }
};
// Sound.prototype.loop    = false;

function playSoundInstance(src) {
    let soundObj = new Sound(src);
    soundObj.play();
}

/************************************************************************************************ */
/*  manually    */
const tracks = {
    soundEffects: [
        "./lib/snd/ui-sound-19.oga",
        "./lib/snd/ui-sound-20.oga",
        "./lib/snd/ui-sound-03.oga"
    ],
    backgroundMusic: [
        "./lib/snd/ui-sound-19.oga",
        "./lib/snd/ui-sound-20.oga"
    ],
};

/*  load audio tracks  apply settings to each track */
 function loadTracks(urlOBJ) {
    for (let index = 0; index < urlOBJ.soundEffects.length; index++) {
        sndFx[index] =  new Sound(urlOBJ.soundEffects[index]);
        console.log(urlOBJ.soundEffects[index]);
        sndFx[index].setFxTrackVolume(SETTINGS.SOUNDmixer.sndFx[index]);        
    }    
    for (let index = 0; index < urlOBJ.backgroundMusic.length; index++) {
        bkgndMusic[index] =  new Sound(urlOBJ.backgroundMusic[index]);
        bkgndMusic[index].setMusicTrackVolume(SETTINGS.SOUNDmixer.Bkgnd[index]);                
    }
}


function getFile(filenameJSON) {
    let myObj={};
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            // return myObj;
        }
    };
    xmlhttp.open("GET", filenameJSON, false);
    try {
        xmlhttp.send();
    } catch (error) {
      console.log(error);
      myObj = tracks;  
    } 
    return myObj;
}

/*  retrieve from json  */
function getTrackListing(url) {
    // let listingOBJ = getFile(url);
    // loadTracks(tracks);
}



/*
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
*/

/*  GAME AI */
console.log(`Reading the AI script`);

/*    STRATEGY    */
var strategy = {
   goForGame:         true,        // must always be the Default strategy
   goForHangJack:     false,
   defendJack:        false,
   init:              function () {
                        debug.console("Strategy initialized.");
                        this.goForGame = true;
                        this.defendJack = false;
                        this.goForHangJack = true;
                     },
   decideStrategy:    function (hand, trump) {
                        // this.goForGame = true;
                        // console.log("Default Strategy: Go For Game");
                        debug.console("Default Strategy: Go For Game");
                       /*  this.goForHangJack = false;
                        this.defendJack = false; */
                           let jackInHand = isJackInUserHand(hand, trump);
                           if (jackInHand === true) {
                              this.defendJack = true;
                              debug.console("Strategy: Defend Jack");
                              this.goForGame = false;
                           } 
                           let jackInPlay = isHangJackInPlay(hand, trump);
                           if (jackInPlay === true) { 
                              if (numberOfFaceTrump(hand, trump) > 0) {
                                 this.goForHangJack = true;
                                 // console.log("Strategy: Go For Hang Jack");
                                 debug.console("Strategy: Going For Hang Jack");
                                 this.goForGame = false;
                              }
                           }
                        }, 
   changeStrategyToGame:   function () {
                        if (this.goForHangJack === true) {
                           this.goForHangJack = false;
                           this.goForGame = true;
                        }
                        if (this.defendJack === true) {
                           this.defendJack = false;
                           this.goForGame = true;
                        }
                     }                     
};
/* determine the cards in hand that can be played   */
// scenarios: have the suit, dont have the suit, have trump, dont have trump
function getCardsInPlay(hand, trump, calledCard) {
   let cardsInPlay = [];
   // load cards of called suit  
   hand.forEach(card => {
      if (card.suit === calledCard.suit) {
         cardsInPlay.push(card);
      }
   });
   // no cards of called suit
   if (cardsInPlay.length === 0) {
      cardsInPlay = hand;              // All cards in play
   } else {
      // Add trump cards
      if (trump.suit != calledCard.suit) {    //  only if trump wasnt called
         // load up the trump cards
         hand.forEach(card => {
            if (card.suit === trump.suit) {
               cardsInPlay.push(card);
            }
         });
      }

   }
   return cardsInPlay;
}
/* Search for specific card   */
function searchHandForCard(cardName, hand) {
   for (let index = 0; index < hand.length; index++) {
      if (hand[index].getCardName() === cardName) {
         return index;
      }
   }
}

/*    Playing Face Trump to hang jack or get ten trump  */
function highTrump(hand, trump) {
   debug.console("Playing face trump cards!");   /* play highest face card in trump  */
   let highestFaceCard = null;
   for (let index = 0; index < hand.length; index++) {
      const card = hand[index];                                            
      if (card.suit === trump.suit) {                                //   if card is trump
         if (highestFaceCard === null && card.rank > 9) {                    //  if card is higher than jack and highest face card does NOT exist
            highestFaceCard = index;
         } else if (highestFaceCard != null && card.rank > hand[highestFaceCard].rank) {  // if highest face card exist and is higher than the current highest face card
            highestFaceCard = index;
         } 
      }
   }
   if (highestFaceCard === null) {
         strategy.changeStrategyToGame();
   }
   return highestFaceCard;
}

/*    Playing Face Trump to hang jack or get ten trump  */
function callJackOut(hand, trump) {
   debug.console("Calling Jack Out!");   /* play highest face card in trump  */
   let highestFaceCard = null;
   for (let index = 0; index < hand.length; index++) {
      const card = hand[index];                                            
      if (card.suit === trump.suit) {                                //   if card is trump
         if (highestFaceCard === null && card.rank > 9) {                    //  if card is higher than jack and highest face card does NOT exist
            highestFaceCard = index;
         } else if (highestFaceCard != null && card.rank > hand[highestFaceCard].rank) {  // if highest face card exist and is higher than the current highest face card
            highestFaceCard = index;
         } 
      }
   }
   if (highestFaceCard === null) {
         strategy.changeStrategyToGame();
   }
   return highestFaceCard;
}





function computerAI(hand, trump, calledCard=null) {
   console.trace('computerAI(hand, trump, calledCard=null):');
   /* Set Strategy before first play  */
   if (hand.length === 6) {
      strategy.init();
      strategy.decideStrategy(hand, trump);
   }
   /* if playing second */
   if (calledCard) { 
      let availCards = getCardsInPlay(hand, trump, calledCard);
      // strategy.defendJack:                         
      if (strategy.defendJack === true) {
         /* jack check  */
         if (searchHandForCard(`j${trump.suit}`, hand)) {
            if (calledCard.suit != trump.suit || calledCard.rank < 9) {              // pass jack
                  return searchHandForCard(`j${trump.suit}`, hand);                                                   
            } else {             // play bush
               for (let index; index < availCards.length; index++) {           // play any other card but jack
                  if (availCards[index].face != 'j' && availCards[index].suit === trump.suit) {
                     return searchHandForCard(availCards[index].getCardName(), hand);  
                  }
               }
               if (searchHandForCard(`j${trump.suit}`, hand)) {         //  have no choice, play jack
                  return searchHandForCard(`j${trump.suit}`, hand);
               }
            }
         }
      } else {
         strategy.changeStrategyToGame();
      }
      // strategy.goForHangJack: 
      if (strategy.goForHangJack === true) {
         if (calledCard.getCardName() === `j${trump.suit}`) {            //   if jack is thrown in face
            strategy.changeStrategyToGame(); 
            if (highTrump(hand, trump)) {
               return highTrump(hand, trump);                                         // play face trump & hang it
            }
         }
         if (selectLowerCard(availCards, trump, calledCard) != null) {              // lower card in suit
            let lowerCardName = availCards[selectLowerCard(availCards, trump, calledCard)].getCardName();
            return searchHandForCard(lowerCardName, hand);
         }
         if (calledCard.rank < 8 || calledCard.suit != trump.suit) {          // ten of suit (if present)
            if (searchHandForCard(`t${calledCard.suit}`, hand)) {
               return searchHandForCard(`t${calledCard.suit}`, hand);
            }
         }
         if (calledCard.rank < 8 || calledCard.suit != trump.suit) {          // ten of trump (if present)
            if (searchHandForCard(`t${trump.suit}`, hand)) {
               return searchHandForCard(`t${trump.suit}`, hand);
            }  
         } 
         /*  play highest face card in suit  */
         let lowestCard = availCards[selectLowestCard(availCards, trump)].getCardName();
         return searchHandForCard(lowestCard, hand);
      }
      // strategy.goForGame:  play ten, take ten, take face cards
      if (strategy.goForGame === true) {
         if (calledCard.face === "t") {                                         // play higher card 
            for (let index = 0; index < hand.length; index++) {
               if (hand[index].suit === calledCard.suit && hand[index].rank > 8 ) {
                  return index;
               }               
            }
            if (calledCard.suit != trump.suit) {
               for (let index = 0; index < hand.length; index++) {
                  if (hand[index].suit === trump.suit) {
                     return index;
                  }               
               }
            }
         }
         if (calledCard.rank > 8) {
            // play higher card or trump 
            for (let index = 0; index < hand.length; index++) {
               if (hand[index].suit === calledCard.suit && hand[index].rank > calledCard.rank ) {
                  return index;
               }               
            }
            if (calledCard.suit != trump.suit) {
               for (let index = 0; index < hand.length; index++) {
                  if (hand[index].suit === trump.suit) {
                     return index;
                  }               
               }
            }
         }
         if (calledCard.rank < 8) {                                          // play ten if you have it
            let tenOfSuit = searchHandForCard(`t${calledCard.suit}`, hand);
            if (tenOfSuit) {
               return tenOfSuit;
            }
            let tenOfTrump = searchHandForCard(`t${trump.suit}`, hand);
            if (tenOfTrump) {
               return tenOfTrump;
            }
            if (selectLowerCard(availCards, trump, calledCard)) {    // in higher difficulty mode, computer plays higher bush card (if no ten)
               let lowerCardName = availCards[selectLowerCard(availCards, trump, calledCard)].getCardName();
               return searchHandForCard(lowerCardName, hand);
            }
         }
         let lowestBushCard = availCards[selectLowestCard(availCards, trump)].getCardName();
         return searchHandForCard(lowestBushCard, hand);                     // else play lowest bush card
      }
   }

   
   /* if playing First  */
   if (!calledCard) { 
      // strategy.defendJack:                                 
      if (strategy.defendJack === true) {
         return selectLowestCard(hand, trump);                   //  play low to get off strike
      } 
      // strategy.goForHangJack:  
      if (strategy.goForHangJack === true) {          
         if (callJackOut(hand, trump) != null) {
            return callJackOut(hand, trump);                      // call high trump to hang jack
         } else {
            strategy.changeStrategyToGame();
         }
      }
      // strategy.goForGame:
      if (strategy.goForGame === true) {
         for (let i = 0; i < hand.length; i++) {
            if (hand[i].rank > 8 && hand[i].suit != trump.suit) {
               return i;
            }
         }
         for (let i = 0; i < hand.length; i++) {
            if (hand[i].rank > 8 && hand[i].suit === trump.suit) {
               return i;
            }
         }
         for (let i = 0; i < hand.length; i++) {
            if (hand[i].rank != 8 && hand[i].suit === trump.suit) {
               return i;
            }
         }
         return selectLowestCard(hand, trump);                                   
      }
      // return selectRandomCard(hand);                        // play high and save tens etc (jacks and queens)    
      // strategy.goForGame:  play face cards
/*       let lowestFaceCard = null;
      for (let i = 0; i < hand.length; i++) {
         if (hand[i].rank > 8 && hand[i].rank < lowestFaceCard.rank) {
            lowestFaceCard = i;                                                                                   // TODO: this section
         }         
      }
      if (lowestFaceCard) {
         return lowestFaceCard;
      } */
      return selectLowestCard(hand, trump);
   }

}

   
function selectRandomCard(remainingHand) {                            // select a random card
   // let compHand = Game.Player.computer.hand;
   let i = Math.floor(Math.random() * remainingHand.length);
   console.log("Computer chooses " + i + "th card.");
   return i;
}




         
function isJackInUserHand(hand, trump) {
   let jackInHand = false;
   for (let n=0; n < hand.length; n++) {
      if (hand[n].suit === trump.suit) {
         if (hand[n].face === 'j') {
            jackInHand = true;
         }
      }
   }
   return jackInHand;               // boolean
}

function selectLowestCard(hand, trump) {
   let lowestCardIndex = 0;
   for (let n=0; n < hand.length; n++) {
      if (hand[n].rank < hand[lowestCardIndex].rank && hand[n].suit != trump.suit) {
         lowestCardIndex = n;
      }
   }
   return lowestCardIndex;          // integer
}

function selectLowerCard(hand, trump, calledCard) {
   let lowerCardIndex = null;
   for (let n=0; n < hand.length; n++) {
      if (hand[n].suit === calledCard.suit) {
         if (hand[n].rank < calledCard.rank && hand[n].rank < 8) {         // play bush in same suit
            return n;
         }
      }
   }
   for (let n=0; n < hand.length; n++) {
      if (hand[n].suit === calledCard.suit) {
         if (hand[n].rank < calledCard.rank && hand[n].rank > 8) {         // play lower face card in same suit but not 10
            return n;
         }
      }
   }
      // search for ten
   let tenInPlay = false;
   for (let n=0; n < hand.length; n++) {
      if (hand[n].suit === calledCard.suit) {
         if (hand[n].face === 't' && hand[n].rank > calledCard.rank) {    
            return n;                     // play ten
         }
         if (hand[n].face === 't') {
            tenInPlay = true;
         }
      }
   }
   if (!tenInPlay) {                         // play higher card in suit, have no choice should be play HIGHEST card, adjust later
      for (let i = 0; i < hand.length; i++) {
         const card = hand[i];
         if (card.rank > calledCard.rank && card.suit === calledCard.suit) {
            return i;
         }
      }
   }

   // bare ten
   // higher cards

   return lowerCardIndex;          // integer
}

function isJackInLifts(userLift, computerLift, trump) {
   userLift.forEach(card => {
      if (card.face === 'j' && card.suit === trump.suit) {
         return true;
      }
   });
   computerLift.forEach(card => {
      if (card.face === 'j' && card.suit === trump.suit) {
         return true;
      }
   });
   return false;
}

function numberOfFaceTrump(hand, trump) {
   let faceTrump = 0;
   hand.forEach(card => {
      if (card.suit === trump.suit && card.rank > 9) {
         faceTrump++; 
      }
   });
   return faceTrump;
}

function isHangJackInPlay(hand, kickCard) {
   // let userLift = ;
   // let computerLift = ;
   /* check to see if jack kick  */
   if (kickCard.face === 'j') {        // jack was kicked
      return false;                    // jack not in play
   }
   /*  check if jack in user hand */
   if (isJackInUserHand(hand, kickCard)) { 
      return false;
   }
   /* check if jack played already  */
   // if (isJackInLifts(userLift, computerLift, kickCard)) {          // jack in lift, was played earlier
   //    return false;                    // jack not in play
   // }
   return true;                        // jack is in play
}





/* loading all game components and assets including sounds, videos, images, animations, scripts */
/*  load card images    */
function loadImageCache() {
    let cardCounter=0;
    SUITS.forEach(suit => {     //  SUITS
        FACES.forEach(face => {     //  FACES
            let image = new Image();
            image.id =  `${face}${suit}`;
            image.src = `img/${face}${suit}.png`;    //  `img/${this.getCardName()}.png`;
            image.onload =  () => {
                gCardImageCacheObj[image.id] = image;
                cardCounter++;
                console.log(`${face}${suit} loaded. ${cardCounter} cards loaded.`);
            };
        });
    });
}

// loadAllGameComponents();

/*

*/

function Card(rank, face, suit) {               // Card object constructor (TODO: Change to a Class)
    this.suit = suit; // ['c', 'd', 'h', 's'],  MAX_SUITS=4
    this.face = face; // ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'],     MAX_FACES=13
    this.rank = rank; // [0, 1,.. 12], to assist in determining who played the higher card
    this.imageLoaded = false;
    this.getCardName = function () {
        return this.face + this.suit; // string of two letters uniquely identifying the card (like a 'key')    MAX_CHARACTERS=2
    };
    this.init =  function () {                   //  load card image
        if (gCardImageCacheObj[this.getCardName()]) {   // check if card image is loaded to cache
            this.image = gCardImageCacheObj[this.getCardName()];
            this.imageLoaded = true;
        } else {  //*/               // if card image not loaded, create new image and assign it to cache
            this.image = new Image();
            this.image.id = this.getCardName();
            this.image.src = `img/${this.getCardName()}.png`;
            this.image.onload =  () => {
                   gCardImageCacheObj[this.getCardName()] = this.image;
                   this.imageLoaded = true;         //    counter++;
                   console.log(`${this.getCardName()} loaded.`);
            };
        }
    };
} 
Card.prototype.CARD_W=72;
Card.prototype.CARD_H=96;
Card.prototype.getFace = function () {
                            return this.face;
                        };
Card.prototype.getSuit = function () {
                            return this.suit;
                        };

/* Player Class/Object Constructor */
function Player(playerName, teamName) {         // Add a "Team" constructor when coding the 4-player version: function Team(playerA, playerB)
    /*  Properties  */
    this.hand       = [];
    this.lift       = [];
    this.score      = 0;
    this.name       = playerName;
    this.team       = teamName;
    //  Methods
    this.addCardToHand  = (card) => {
                        this.hand.push(card); 
                     };
    this.addPoints  = (points) => {
                        this.score += points;
                    };
    this.getPoints  = () => {
                        return this.score;
                    };
                    
}
/*  Prototypes  */
Player.prototype.init           = function () {
                                    this.hand   = [];       // MAX_CARDS_IN_HAND=12;
                                    this.score  =  0;       // MAX_POINTS=14;
                                    this.lift   = [];       // MAX_CARDS_IN_LIFT=48;
                                    // this.name   = "";       // MAX_CHARACTERS=12;
                                };

Player.prototype.getHand        = function () {
                                    return this.hand;
                                };
Player.prototype.getName        = function () {
                                    return this.name;
                                };
Player.prototype.changeName        = function (name) {
                                    /*  Triggered by function setPlayerName   */
                                    this.name = name;    //  
                                    // return this.name;
                                };                                
Player.prototype.getLift        = function () {
                                    return this.lift;
                                };
Player.prototype.pointsInit     = function () {
                                    this.points = 0;            
                                };
Player.prototype.liftInit       = function () {
                                    this.lift = [];            
                                };
Player.prototype.handInit       = function () {
                                    this.hand = [];            
                                };
Player.prototype.removeCardFromHand = function (card) {
                                    for (let index = 0; index < this.hand.length; index++) {
                                        if (this.hand[index] === card) {
                                            this.hand = this.hand.splice(index, 1);
                                            // callback();
                                        }                                        
                                    }
                                }; 
Player.prototype.addCardsToLift = function (cardArr) {
                                    this.lift = this.lift.concat(cardArr);
                                };                               
Player.prototype.setTeamName    =   function (name) {
                                      try {
                                        if (name.length >= MAX_CHARACTERS) throw (`Invalid input: name has too many characters.`);
                                        this.team = name;                                
                                      } 
                                      catch(err) {
                                            console.log(err);
                                      }
                                    };
Player.prototype.setPlayerName  =   function (name) {
                                        try {
                                            if (name.length >= MAX_CHARACTERS) throw (`Invalid input: name has too many characters.`);
                                            this.name = name;                                
                                        } 
                                        catch(err) {
                                                console.log(err);
                                        } 
                                        // callback();       // callback may not be necessary                            
                                    };

//-----------------------------------------------------------------------------------------------------------------------------------


// gWaitState(4);
//  putting everything in an IIFE
var pauseGameID = setTimeout(()=>{

(function(){


/*  Main Game Object (parent object)    */
var Game = {
    SETTINGS   : {},
    //  Display : Display,
    //  Sound   : gSM,  
    GamePlay   : {},
    Components : {},
    Background : {},                // OPAQUE Canvas scoreboard, labels, trump
    Screens    : {},                // Transparent canvas cardLayer, menulayer, msgLayer --> msgBoard, gameMenu, gameBoard 
    Player     : {},
    Controller : {},
    State      : {},
    Engine     : new Engine(1000/24, _renderAllScreens, gameLoop),
    // debug      : debug,
};
Game.SETTINGS = SETTINGS;

Game.SETTINGS.init(OFF, OFF, OFF, 7, 0, 0, 0, 7, 5);      //  see settings.mjs

Game.GamePlay = {
    HI:     null,
    LOW:    null,
    whoPlayedJack:  null,
    whoPlayedHi:    null,
    whoPlayedLow:   null,
    whoHangedJack:  null,
    init:   function ()  {
                this.HI = null;
                this.LOW = null;
                this.whoPlayedHi = null;
                this.whoPlayedLow = null;
                this.whoPlayedJack = null;
                this.whoHangedJack = null;
            },
};

/*  Prototypes  */
Game.Components = {
    Sound       : {},
    gameboard   : null,                     //   or:    "gameTable"
    msgBoard    : null,
    gameMenu    : null,
    deck        : null
};

Game.Background = {
    display     : {},       //  new gCanvasLayer("gameboard", WIDTH, HEIGHT, OPAQUE,  0,    0,  255,   0),
    scoreboard  : null,
    labels      : null,
    trump       : null,
    isUpdated   : false,
    update : function (trueOrFalse) {
        this.isUpdated = trueOrFalse;
    }
};

/* Game.Screens = {
    // pauseScreen : new gCanvasLayer("pause_screen", LEFTOFFSET, TOPOFFSET, WIDTH + 0, HEIGHT + 0, 0.8,         4, 204, 204, 204),        //  to be removed
}; */

Game.Player = {
    computer    : new Player(PLAYER1_NAME, "Androids"),
    human       : new Player(PLAYER2_NAME, "A-Team")
};

function setPlayerName() {
    let playerName = document.getElementById("player_name").value;
    Game.Player.human.changeName(playerName);
    debug.console(Game.Player.human.getName());
}

Game.Background.scoreboard = {
    playerAname    :   Game.Player.computer.getName(),
    playerBname    :   Game.Player.human.getName(),
    playerAscore   :   Game.Player.computer.score, //  getPoints(),
    playerBscore   :   Game.Player.human.score,    //  getPoints(),
    init           :   function () {
                            this.playerAname = Game.Player.computer.getName();  // `${PLAYER1_NAME}`;
                            this.playerBname = Game.Player.human.getName();     // `${PLAYER2_NAME}`;        
                            this.playerAscore = 0;
                            this.playerBscore = 0;
                            Game.Background.update(true);
                        },
    update         :   function () {
                            this.playerAname = Game.Player.computer.getName();
                            this.playerBname = Game.Player.human.getName();
                            this.playerAscore = Game.Player.computer.getPoints();
                            this.playerBscore = Game.Player.human.getPoints();
                            Game.Background.update(true);
                        },
    setNames       :   function (nameA, nameB) {
                            this.playerAname = nameA;
                            this.playerBname = nameB;
                            Game.Background.update(true);
                        },
    setScores      :   function (scoreA, scoreB) {
                            this.playerAscore = scoreA;
                            this.playerBscore = scoreB;
                            Game.Background.update(true);
                        }
};
/*  Sound Elements  */
Game.Components.Sound = {
    sndFx:      sndFx,
    bkgndMusic: bkgndMusic,
};
// cardSlideSnd.play();Game.Components.Sound.cardSlideSnd
Game.Components.cutScenes = [];
/* Deck of cards objects   */
Game.Components.deck = {
    cards: [],
    trump: null,
    counter: 0,
    cardImagesLoaded:   function () {
        let percent = Math.floor((this.counter / 52) * 100);
        console.log(`${this.counter} card images loaded: ${percent}%`);
        let delayID = setTimeout(() => {
            clearTimeout(delayID);
            while (this.counter < 52) {
                this.cards.forEach(card => {
                    if (card.imageLoaded === true) {
                        this.counter++;
                    } else {
                        card.init();
                    }
                });    
            }
            percent = Math.floor((this.counter / 52) * 100);
            console.log(`${this.counter} card images loaded: ${percent}%`);          
        }, 3000);
        return this;
        /* if (this.counter !== 52) {
            this.init();
        } */
    },
        /** creates deck (array of all 52 cards)
         *  @param: null
         *  @returns: deck
         */
    init: function () {
            this.counter = 0;
            let n = 0; 
            for (let y = 0; y < SUITS.length; y++) {
                var rank = 1;
                for (let x = 0; x < FACES.length; x++) {
                    this.cards[n] = new Card(rank, FACES[x], SUITS[y]);
                    this.cards[n].init(); //  get card images from image files or image cache object
                    //  if (this.cards[n].isLoaded === true) {}
                    n++;
                    rank++;
                }
            }
            // console.log(`card images loaded: ${this.counter}`);
            // this.cardImagesLoaded();
            return this;
    },
    shuffle: function () {
        /** randomly mixes up the cards in the deck
         *  @param:
         *  @returns: randomized deck
         */
        var i, j;
        for (i = 0; i < this.cards.length; i++) {
            j = Math.floor(Math.random() * 52);
            var temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
        return this;
    },
    cut: function (n) {
        /** randomly mixes up the cards in the deck
         *  @param: null
         *  @returns: cuts deck
         */
        /*  var temp = this.cards.slice(0, n);
          this.cards = this.cards + temp;
          return this.cards; */
    },
    setTrump: function (card) {
        this.trump  = card;
        Game.Background.update(true);
    },
    getTrump: function () {
        return this.trump; //  = card;
    },
    deal: function () {
        /** randomly mixes up the cards in the deck
         *  @param: human, computer (players' hand --array-of-cards )
         *  @returns: randomized deck
         */
        var n = 0;
        while (Game.Player.human.hand.length < 6) {
            // let card = this.cards.shift();
            Game.Player.human.addCardToHand(this.cards.shift());
            Game.Components.gameboard.update(true);
            // card = this.cards.shift();
            Game.Player.computer.addCardToHand(this.cards.shift());
            Game.Components.gameboard.update(true);
            n++;
        }
        let trump = this.cards.shift();
        this.setTrump(trump);
        // sndFx[2].play();
        Game.Background.update(true);
    },
    beg: function (human, computer) {
        /** randomly mixes up the cards in the deck
         *  @param: null
         *  @returns: void
         */
        while (Game.Player.human.length <= 9) {
            Game.Player.human.hand = this.cards.shift();
            Game.Player.computer.hand = this.cards.shift();
        }
        if (this.trump.suit != this.cards[0].suit) {
            this.setTrump(this.cards.shift());
        } else {
            this.setTrump(this.cards.shift());
            while (Game.Player.human.length <= 12) {
                Game.Player.human = this.cards.shift();
                Game.Player.computer = this.cards.shift();
            }
            if (this.trump.suit === this.cards[0].suit) {
                this.setTrump(this.cards.shift());
                this.setTrump(this.cards.shift());
            } else {
                this.setTrump(this.cards.shift());
                // this.trump = this.cards.shift();
            }
        }
        // return this.cards;
    },
};

//  Load JSON file from file system
// var fs = require('fs');

/*   game states */
Game.State = {
    assetsLoaded:    false,
    startOfFourteen:    false,
    startOfRound:   false,
    startOfGame:    false,
    deal:           false,
    playFirst:      null,
    dealer:         null,
    whoPlayedCallCard: null,
    userTurn:        false,
    computerTurn:    false,
    userPlayed:       false,
    computerPlayed:   false,
    endOfRound:     false,
    endOfGame:      false,
    endOfFourteen:  false,
    init:           function () {
                        this.startOfFourteen =    false;
                        this.startOfRound =   false;
                        this.startOfGame =    false;
                        this.deal =           false;
                        this.userPlay =       false;
                        this.computerPlay =   false;
                        this.endOfRound =     false;
                        this.endOfGame =      false;
                        this.endOfFourteen =  false;
                        this.dealer =           null;
                        this.playFirst =        null;
                        this.whoPlayedCallCard = null;
                    },
};

/* Game.Components.Sound = {
    // cardSlideSnd:  new Sound("./lib/snd/ui-sound3.oga"),
    uiSnd:         new Sound("./lib/snd/ui-sound-19.oga"),
    uiSnd2:        new Sound("./lib/snd/ui-sound-20.oga"),
    init:          function () {
                    // play;
                },
}; */
//  message board object
Game.Components.msgboard = {
    visible     : false,
    isUpdated   : false,
    text        : [],
    init        : function () {
                    this.visible = false;
                    this.text = [];
                    this.isUpdated = false;
                    return this;
                },
    update      : function () {
                    this.isUpdated = true;
                },
    makeVisible : function () {
                    this.visible = true;
                },
    makeInvisible : function () {
                    this.visible = false;
                },
    message     : function (textArr) {
                    this.text = textArr;
                    return this;
                }
};

Game.Components.gameboard = {                       // the gameplay board
    user: null,
    computer: null,
    select: null,
    listen: null,
    listeningForSelectCard: null,
    isUpdated: false,
    init: function () {
        this.user = null;
        this.computer = null;
        this.select = null;
        this.isUpdated = true;
        this.stopListening();
        this.isListening = false;
    },
    setUserCard: function (card) {
        this.user = card;
        this.isUpdated = true;
    },
    setComputerCard: function (card) {
        this.computer = card;
        this.isUpdated = true;
    },
    listenForSelectCard: function (callback) {
        this.listeningForSelectCard = setInterval(callback, 250);
    },
    listenForUserCard: function (callback) {
        if (this.isListening === false) {
            this.isListening =   true;
            this.listen = setInterval(callback, 250);
        }
    },
    stopListening: function () {
        this.isListening = false;
            clearInterval(this.listen);
            clearInterval(this.listeningForSelectCard);
    },
    update:    function (trueOrFalse) {
        this.isUpdated = trueOrFalse;
    }

};

/**
 *  Manages ALL user input (mouse, touch and keyboard) as an Object
 */
Game.Controller = {
// var Controller = {
   /*  clickPosition: {
        X:  null,
        Y:  null,
    },
    listeners: Controller.listeners,
    eventHandlers:  Controller.eventHandlers,    
    touchPosition: {
        X:  null,
        Y:  null,
    }, */
    cardSelection: null,
    keys: {},
    bindings: {
        'Escape'    : 'showMenuScreen',
        '1'         : 'playCard_1',
        '2'         : 'playCard_2',
        '3'         : 'playCard_3',
        '4'         : 'playCard_4',
        '5'         : 'playCard_5',
        '6'         : 'playCard_6',
        '7'         : 'playCard_7',
        '8'         : 'playCard_8',
        '9'         : 'playCard_9',
        'ArrowRight': 'selectNext',
        'ArrowLeft' : 'selectPrevious',
        'Enter'     : 'confirmSelection',
        ' '         : 'confirmSelection',           //  spacebar
        'p'         : 'pause',
        'm'         : 'mute'
    },
    actions: {
        'showMenuScreen': false,
        'playCard_1'    : false,
        'playCard_2'    : false,
        'playCard_3'    : false,
        'playCard_4'    : false,
        'playCard_5'    : false,
        'playCard_6'    : false,
        'playCard_7'    : false,
        'playCard_8'    : false,
        'playCard_9'    : false,
        'selectNext'    : false,
        'selectPrevious': false,
        'confirmSelection': false,
        'pause'         : false,
        'mute'          : false,
    },
    isMyTurn:   false,
    clickState: [],
    keyState: {},
    bind: function (key, action) {
        this.bindings[key] = action;
    },
    init: function () {
        this.isMyTurn = false;
        // this.clickPosition = [];
        this.cardSelection = null;
        // this.refresh = setInterval(inputUpdate, 1000/20); //      FPS_2
        for (let action in this.actions) {
            this.actions[action] = false;
        }    
    },
/*     stop: function () {
        clearInterval(this.refresh);
    }, */
    readAction: function () {
        inputUpdate();
    }
};


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
/*  INPUT SECTION   */

function cardLocation(i, arrayLength) {
    let xCenter = Game.Screens.gameScreen.canvas.width/2;
    let xLocation = xCenter - Math.ceil(arrayLength / 2) * CARD_W/2 +  i * CARD_W/2 ;
    return xLocation; 
}

function togglePause(action) {
    //  probe all game keys
    if (action === 'togglePause') {
        if (document.getElementById('pause_screen').style.visibility === 'visible') {
            document.getElementById('pause_screen').style.visibility = 'hidden';
            pauseGame();
        } else {
            document.getElementById('pause_screen').style.visibility = 'visible';
            unPauseGame();
        }
        Game.Controller.init();
    }
}

function toggleMenuScreen(action) {
    //  probe all game keys
    if (action === 'toggleMenuScreen') {           // toggle menu screen
        if (document.getElementById('home_screen').style.visibility === 'visible') {
            document.getElementById('home_screen').style.visibility = 'hidden';
        } else {
            document.getElementById('home_screen').style.visibility = 'visible';
        }
        // Game.Controller.init();
    }
}
/*  toggle mute */
function toggleMute(action) {
    if (action === 'toggleMute') {           // toggle menu screen
        Game.Components.Sound.muteAll();
        // Game.Components.Sound.sndFx[1].muteTrack();
        // Game.Controller.init();
    }
}

function inputUpdate(action) {
    debug.console(`controller callback:`);
    toggleMenuScreen(action);                                 // Esc returns player to the Menu Screen where he can 'quit game', adjust game options, etc
    toggleMute(action);
    togglePause(action);

    /*  invoke specific game 'action'  */ 
    for (let i=0; i<9; i++) {
        let play = `playCard_${i+1}`;
        if (action === play) {      // queries the key's state, and calls the corresponding function
          if (Game.Components.gameboard.user === null) {
              Game.Components.gameboard.setUserCard(Game.Player.human.hand[i]);
            //   sndFx[1].play();
              Game.Player.human.hand.splice(i, 1);
              Game.Controller.init();
          }
        }
      }

    /*  Highlight card  */ 

    if (action === 'selectNext') {
        if (Game.Components.gameboard.select) {
            for (let i=0; i < Game.Player.human.hand.length; i++) {
                if (i < Game.Player.human.hand.length - 1) {
                    if (Game.Components.gameboard.select === Game.Player.human.hand[i]) {
                        Game.Components.gameboard.select = Game.Player.human.hand[i+1];
                        debug.console(i);
                        // Game.Controller.init();
                        break;
                    }
                } else {
                    Game.Components.gameboard.select = null;
                }
            }
        } else {
                Game.Components.gameboard.select = Game.Player.human.hand[0];
                // Game.Controller.init();
        }  
    }

    if (action === 'selectPrevious') {
        if (Game.Components.gameboard.select) {
            for (let i=Game.Player.human.hand.length; i >=0; i--) {
                if (i > 0) {
                    if (Game.Components.gameboard.select === Game.Player.human.hand[i]) {
                            Game.Components.gameboard.select = Game.Player.human.hand[i-1];
                            debug.console(i);
                            break;
                    }
                } else {
                    Game.Components.gameboard.select = null;
                }
            }  
        } else {
            Game.Components.gameboard.select = Game.Player.human.hand[-1];
        }
    }
    /*  play highlighted card   */
    if (action === 'confirmSelection') {
        if (!Game.Components.gameboard.user) {
            for (let i=0; i<Game.Player.human.hand.length; i++) {
                if (Game.Components.gameboard.select === Game.Player.human.hand[i]) {
                    Game.Components.gameboard.setUserCard(Game.Player.human.hand[i]);
                    Game.Player.human.hand.splice(i,1);
                    Game.Components.gameboard.select = null;
                }
            }
        }
    }
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*  game play functions   */

function gWaitState(secs) {                       // institutes a wait state for specified time interval
    return new Promise((resolve, reject) => {
        console.log(`Waiting ${secs} seconds...`);
        setTimeout(resolve, secs * 1000);
    });
}

/* function listCardOnBoard() {                                    // debugging function to view the played cards in memory
    console.log(`User: ${Game.Components.gameboard.user.getCardName()}`);
    console.log(`Computer: ${Game.Background.computer.getCardName()}`);
} */

function firstJackDeal() {
    let flipACoin = Math.floor(Math.random() * 2); // temporaily use coin flip to simulate firtsJackDeal between two players
    if (flipACoin == 0) {
        return Game.Player.computer;
    } else {                // flipACoin == 1
        return Game.Player.human;
    }
}

function dealHandFcn(dealer) {
    /*  Deal Cards  */
    //assign dealer -->      TODO: animation
    if (!dealer) {              // then firstJackDeal();
        dealer = firstJackDeal();
    }       //      else if (dealer === human) {               // switch dealer
        console.log(`${dealer.getName()} deals.`);
        // Game.Components.deck.init();
        Game.Components.deck.init().shuffle().shuffle().shuffle().deal();
        // Game.Components.Sound.sndEffect[0].play();
        let kick_points = kickPoints(Game.Components.deck.getTrump());
        dealer.addPoints(kick_points);
        // Game.Background.scoreboard.update();
        console.log(`${dealer.name} gets ${kickPoints(Game.Components.deck.getTrump())} points.`);
        if (dealer === Game.Player.human) {             // assign who plays first as a result of dealing
            var whoPlaysFirst = Game.Player.computer;
        } else {
            whoPlaysFirst = Game.Player.human;
        }
    return whoPlaysFirst;
}

function allocatePoints() {
    /*  game  */
    let textArray = [];
    let i=0;
    let computerPoints = countForGame(Game.Player.computer);
    let humanPoints    = countForGame(Game.Player.human);
    debug.display(`${Game.Player.computer.getName()} Game Points: ${computerPoints}`);
    debug.display(`${Game.Player.human.getName()} Game Points: ${humanPoints}`);
    if (computerPoints > humanPoints) {
        Game.Player.computer.addPoints(GAME);
        textArray[i] = `${Game.Player.computer.getName()} gets GAME.`;
        debug.console(textArray[i]);
        i++;
        // Game.Components.msgboard.init().message(text).makeVisible();
    } else {
        Game.Player.human.addPoints(GAME);      //   += GAME;
        textArray[i] = `${Game.Player.human.getName()} gets GAME.`;
        debug.console(textArray[i]);
        i++;
        // Game.Components.msgboard.init().message(text).makeVisible();
    }
    /*  high  */
    if (Game.GamePlay.whoPlayedHi) {
        Game.GamePlay.whoPlayedHi.addPoints(HIGH);
        textArray[i] =`${Game.GamePlay.whoPlayedHi.getName()} played HIGH.`;
        debug.console(textArray[i]);
        i++;
        // Game.Components.msgboard.init().message(`${Game.GamePlay.whoPlayedHi.getName()} played HIGH.`).makeVisible();
        // debug.display(`${Game.GamePlay.whoPlayedHi.getName()} played HIGH.`);
    }
    /*  low */
    if (Game.GamePlay.whoPlayedLow) {
        Game.GamePlay.whoPlayedLow.addPoints(LOW);
        textArray[i] = `${Game.GamePlay.whoPlayedLow.getName()} played LOW.`;
        debug.console(textArray[i]);
        i++;
        // Game.Components. msgboard.init().message(`${Game.GamePlay.whoPlayedLow.getName()} played LOW.`).makeVisible();
        // debug.display(`${Game.GamePlay.whoPlayedLow.getName()} played LOW.`);
    }
    /*  jack  */ 
    if (Game.GamePlay.whoPlayedJack) {
        Game.GamePlay.whoPlayedJack.addPoints(JACK);
        textArray[i] = `${Game.GamePlay.whoPlayedJack.getName()} played JACK.`;
        debug.console(textArray[i]);
        i++;
        // Game.Components.msgboard.init().message(`${Game.GamePlay.whoPlayedJack.getName()} played JACK.`).makeVisible();
        // debug.display(`${Game.GamePlay.whoPlayedJack.getName()} played JACK.`);
    }
    /*  hang jack  */
    if (Game.GamePlay.whoHangedJack) {
        Game.GamePlay.whoHangedJack.addPoints(HANG_JACK);
        textArray[i] = `${Game.GamePlay.whoHangedJack.getName()} hanged JACK.`;
        debug.console(textArray[i]);
        i++;
        // Game.Components.msgboard.init().message(`${Game.GamePlay.whoHangedJack.getName()} hanged JACK.`).makeVisible();
        // debug.display(`${Game.GamePlay.whoHangedJack.getName()} hanged JACK.`);
    }
    Game.Components.msgboard.init().message(textArray).makeVisible();
    Game.GamePlay.init();
}


function play(player) {
    return new Promise((resolve, reject) => {
        // Game.Components.Sound.sndEffect[1].play();
      if (player === Game.Player.computer) {
          if (Game.Components.gameboard.user) {
            computerPlay(computerAI(Game.Player.computer.getHand(), Game.Components.deck.getTrump(), Game.Components.gameboard.user));
            resolve(`${Game.Player.computer.getName()} played a card.`);
        } else {
            computerPlay(computerAI(Game.Player.computer.getHand(), Game.Components.deck.getTrump())); 
            resolve(`${Game.Player.computer.getName()} played a card.`);
        }
        //  check the card for trump if its lower than existing
        //  computer gets low, high, jack
        if (Game.Components.gameboard.computer.suit === Game.Components.deck.trump.suit) {
             trackCards(Game.Player.computer, Game.Components.gameboard.computer);
        }
    } else {
        Game.Controller.isMyTurn = true; 
        // console.log(`YOUR TURN!`);
            // console.log(`Listening for card!`);
            if (Game.Components.gameboard.user) {
                Game.Controller.isMyTurn = false;
                resolve(`${Game.Player.human.getName()} picked a card.`);
            } 
        if (Game.Components.gameboard.user) {
            if (Game.Components.gameboard.user.suit === Game.Components.deck.trump.suit) {
                trackCards(Game.Player.human, Game.Components.gameboard.user);
            };    
            resolve(`${Game.Player.human.getName()} picked a card.`);
        }
      }
    }); 
}



function trackCards(player, cardPlayed) {
    if (!Game.GamePlay.HI) {
        Game.GamePlay.HI = cardPlayed;
        Game.GamePlay.whoPlayedHi = player;
        debug.console(`${player.getName()} played ${cardPlayed.getCardName()} for HI.`);
        Game.GamePlay.LOW = cardPlayed;
        Game.GamePlay.whoPlayedLow = player;
        debug.console(`${player.getName()} played ${cardPlayed.getCardName()} for LOW.`);                
    }
    if (cardPlayed.rank > Game.GamePlay.HI.rank) {
        Game.GamePlay.HI = cardPlayed;
        Game.GamePlay.whoPlayedHi = player;
        debug.console(`${player.getName()} played ${cardPlayed.getCardName()} for HI.`);
    }
    if (cardPlayed.rank < Game.GamePlay.LOW.rank) {
        Game.GamePlay.LOW = cardPlayed;
        Game.GamePlay.whoPlayedLow = player;
        debug.console(`${player.getName()} played ${cardPlayed.getCardName()} for LOW.`);                
    }    
    if (cardPlayed.face === 'j') {
        Game.GamePlay.whoPlayedJack = player;
        debug.console(`${player.getName()} is trying pass JACK!.`);                
    }
    if (Game.GamePlay.whoHangedJack) {
        Game.GamePlay.whoPlayedJack = null;
        debug.console(`${player.getName()} Jack get string-up!!!`);                
    }
}


/**
 * 
 * @param {int} i integer [0 .. length of computer's hand]
 */
function computerPlay(i) {  
    // console.trace('computerPlay(i):');                        // run the 'thinking animation'
    const card = Game.Player.computer.hand[i];
    Game.Components.gameboard.computer = card;
    debug.console(card.getCardName());
    Game.Player.computer.hand.splice(i, 1);
}

/**
 * Compares compares cards from both players and returns who won.
 * @param {*} called  Card
 * @param {*} played  Card
 * @returns player 
 */
function determineWinner(called, played) {
    // determines the higher rank card
    // parameters: called and played card objects
    // return: player (who won)
    let win = null;
    if (called.suit === played.suit) {
        if (called.rank > played.rank) {
            win = called;                               // replace console.log with msgboard text
        } else {
            win = played;
        }
    } else if (played.suit === Game.Components.deck.trump.suit) {
        win = played;
    } else {
        win = called;
    }
    if (win === Game.Components.gameboard.user) {
        return Game.Player.human;
    } else {
        return Game.Player.computer;
    }
}

//  Points associated with KickCard
function kickPoints(card) {
    switch (card.face) {
        case 'a':
            Game.Components.msgboard.text[0] = "Kick Ace! Dealer gets 1 pt.";
            Game.Components.msgboard.visible = true;
            return 1;
        case '6':
            Game.Components.msgboard.text[0] = "Kick Six!! Dealer gets 2 pts.";
            Game.Components.msgboard.visible = true;
            return 2;
        case 'j':
            Game.Components.msgboard.text[0] = "Kick Jack!!! Dealer gets 3 pts.";
            Game.Components.msgboard.visible = true;
            return 3;
        default:
            Game.Components.msgboard.text[0] = "Kicks nothing!! Wham? like yuh toe buss?";
            Game.Components.msgboard.visible = true;
            return 0;
    }
}
/**
 * 
 * @param {*} player 
 */
function countForGame(player) {
    let points = 0;
    let lift = player.getLift();
    console.log(lift);
    for (let eachCard in lift) {
        // var card = player.lift.pop;
        switch (lift[eachCard].getFace()) {
            case 'a':
                points +=  4;
                break;
            case 'k':
                points +=  3;
                break;
            case 'q':
                points +=  2;
                break;
            case 'j':
                points +=  1;
                break;
            case 't':
                points += 10;
                break;
            default:
                points +=  0;
        }
    }
    let text = `${player.getName()} has ${points} points`;
    debug.display(text);
    debug.console(text);
    return points;
}


// Hang Jack --> player.points += HANG_JACK
function isHangJack(playedCard, calledCard) {
    if (playedCard.suit === Game.Components.deck.trump.suit && calledCard.suit === Game.Components.deck.trump.suit) {
        if (playedCard.face === 'j' || calledCard.face === 'j') {
            if (playedCard.rank > 9 || calledCard.rank > 9) { // rank of jack = 9, (check)
                Game.Components.msgboard.message(["HANG JACK!!!",]);
                Game.Components.msgboard.makeVisible();
                /*  play video  */
                let twoSecPause = setTimeout(() => {
                    Game.Components.msgboard.init();
                    clearTimeout(twoSecPause);
                    Display.video(Game.Components.cutScenes[0]);
                }, 1500);
                return true;
            }
        }
    } else {
        return false;
    }
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*  Display Functions   */


function displayCardCache() {                   //  A debugging function
    for (card in gCardImageCacheObj) {
        debug.console(`${card} : ${gCardImageCacheObj[card].id}`);
    }
}

function removeUtilityScreens() {
    document.getElementById('menu_layer').style.visibility = "hidden";
    // document.getElementById('pause_screen').style.visibility = "hidden";
}



//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*       ANIMATION FUNCTIONS     */


//------------------------------------------------------------------------------------------------------------------------
//                                              INITIALIZE GAME COMPONENTS

/*  create the players  */
// const computer = new Player("Jarvis", "The Androids"); // --> Team A
// const human = new Player("Roger", "The Humans"); // --> Team B

/*  initialize players   */
/* function _initializePlayers() {
    computer.init();
    human.init();
    // computer.name = PLAYER1_NAME;
    // human.name = PLAYER2_NAME;
    var playerArr = [computer, human];
    return playerArr; // an array of ALL game players
}
 */
/**
 *  to make sure all the games assets are fully loaded before the game runs
 *  this will be handled by game-loader.js in the final version
 */
var asset1 = new Promise(function (resolve, reject) {
    getTrackListing("./soundtracks.json");
    Game.Components.deck.init().cardImagesLoaded();     //  .init().cardImagesLoaded();    // .cardImagesLoaded();     //  .isDeckLoaded();
    resolve(`1`);
});
var asset2 = new Promise(function (resolve, reject) {
    Game.Components.gameboard.init();
               // if card image not loaded, create new image and assign it to cache
        // let logo = new Image();
        advertisement.id = `coors_logo`;
        advertisement.src = `lib/img/${advertisement.id}.jpg`;
        advertisement.onload =  () => {
            //    this.imageLoaded = true;
            //    counter++;
            console.log(`${advertisement.id} loaded.`);
        };
        // gCardImageCacheObj[logo.id] = logo;
    resolve(`2`);
});
var asset3 = new Promise(function (resolve, reject) {
    // _initializeScreens();
    Display.init();
    resolve(`3`);
});
var asset4 = new Promise(function (resolve, reject) {
    // Game.Controller.init();
    resolve(`4`);
});
var asset5 = new Promise(function (resolve, reject) {
    Game.Components.msgboard.init();
    resolve(`5`);
});
var asset6 = new Promise(function (resolve, reject) {
    Game.State.init();
    resolve(`6`);
});
var asset7 = new Promise(function (resolve, reject) {
    loadCutScenes();
    resolve(`7`);
});
/* var asset8 = new Promise(function (resolve, reject) {
    Game.Sound.init();
    resolve(`8`);
    // var cardSlideSnd = new Sound("./lib/snd/ui-sound3.oga");

}); */
/* var asset9 = new Promise(function (resolve, reject) {
    Game.Settings.init();
    resolve(`9`);
}); */

/*  //  sound components      
    // return gObjectsArr;
    resolve(`Assets loaded.`);
    reject(`Error: Assets were not all loaded.`);
    };
}
    */ 

/*  INITIALIZE GRAPHICS OBJECTS */
function _initializeScreens() {
    let s = [];
    s[0] = Promise.resolve(Display.init()); // screens[0] = gameBoard;    s[5] = Promise.resolve(Game.Screens.pauseScreen.init());// screens[5] = pause_screen;
    // s[1] = Promise.resolve(Game.Screens.pauseScreen.init());// screens[5] = pause_screen;
    Promise.all([s[0]]).then((s) => {
        console.log("Screens initialized");
        return(s);
    });
}

function loadCutScenes() {                  //  load array of video clips in memory, not on the DOM
    Game.Components.cutScenes[0] = document.createElement("video");
    Game.Components.cutScenes[0].setAttribute("id", "hangjack_video");
    let videoSource = document.createElement("source");
    videoSource.setAttribute("src", "vid/hangjack_Large.mp4");
    videoSource.setAttribute("type", "video/mp4");
    Game.Components.cutScenes[0].appendChild(videoSource); 
}
/*
function loadScreenCache() {                    //  screen cache, used in debugging
    let screens = [];
    screens[0] = Display.onBackground;    
    screens[1] = Display.onCardScreen;
    screens[2] = Display.onMsgScreen;
    screens[3] = Display.onMenuScreen;
    screens[4] = Display.onVideoScreen;
    screens[5] = Game.Screens.pauseScreen;
    if (DEBUG_MODE === true) {
        screen[6] = debug_screen;
    }
    return screens;                             // screens array
}
*/
function displayDebugScreen() {
    //  Game.debug
    let c = Game.debug.screen.canvas;
    let x = Game.debug.screen.ctx;
     Game.debug.msg("TEST");
    // x.fillStyle = "#ffffff"; // white
    // x.font = "30px Consolas";
    // x.fillText(Game.Player.computer.name, 0, 0);            //  test
}
/*
function updateGameScreen() {
    Game.Components.gameboard.isUpdated = true;
}
*/

function displayBackground() {
    Display.labels(Game.Player.human.hand).scoreboard(Game.Player);
    if (Game.Components.deck.getTrump()) {
        Display.trump(Game.Components.deck.getTrump());
    }
    if (ADS) {
        Display.adbox(advertisement);
    }
}
/* 
function displayAds() {
    Display.labels(Game.Player.human.hand).scoreboard(Game.Player);
    if (Game.Components.deck.getTrump()) {
        Display.trump(Game.Components.deck.getTrump());
    }
}
 */
function displayGameScreen() {
/*     if (Game.Components.gameboard.computer) {
        Display.playCard('top', Game.Components.gameboard.computer);
    }
    if (Game.Components.gameboard.user) {
        Display.playCard('bottom', Game.Components.gameboard.user);
    }
    if (Game.Player.human.hand) {
        Display.hand(Game.Player.human.hand);
    }
    if (Game.Components.gameboard.select) {
        Display.showcaseCard(Game.Components.gameboard.select);
    } */
    Display.hand(Game.Player.human.getHand()).playCard('top', Game.Components.gameboard.computer)
        .playCard('bottom', Game.Components.gameboard.user).showcaseCard(Game.Components.gameboard.select);
}

function _drawGameScreen() {
    if (Game.Components.gameboard.isUpdated === true) {
        Display.onCardScreen.clear();
        displayGameScreen();
        Game.Components.gameboard.isUpdated = false;
    }
    Display.onCardScreen.clear();
    displayGameScreen();
}

function updateMsgboard() {
    Game.Components.msgboard. isUpdated = true;
}

/* function _drawVideoScreen() {
    Display.onVideoScreen.clear();
} */

function _drawMsgScreen() {
    if (Game.Components.msgboard.visible === true) {
        Display.onMsgScreen.clear();
        Display.message(Game.Components.msgboard);
    }
}

function _drawMenuScreen() {
    Display.onMenuScreen.clear();
    Display.menu();
    // displayMenuScreen();
}

function _drawPauseScreen() {
    Game.Screens.pauseScreen.clear();
    // displayPauseScreen();
}

function _drawBackground() {
    Display.onBackground.clear();
    displayBackground(); 
}

function _drawDebugScreen() {
    if (Game.debug.isUpdated === true) {
        Game.debug.screen.clear();
        displayDebugScreen();
    } else {
        document.getElementById("debug_screen").style.visibility = "hidden";
    }
}


function _renderAllScreens() {   
    _drawBackground();              //      Display.onBackground.labels()       //  .trump(state).scoreboard(score);
    _drawGameScreen();
    _drawMsgScreen();
    _drawMenuScreen();
    // _drawVideoScreen();
    // _drawPauseScreen();
    /* if (DEBUG_MODE === true) {
        _drawDebugScreen();
    } */
}
    

function _startEngine() {
    Game.Engine.start();
}
      

function _stopEngine() {
  Game.Engine.stop();
}

function _clearAllScreens() {
    for (var screen in screens) {
        screen.clear();
    }
}


function gameLoop() {
    /*  A series of 'game states'   */
    // inputUpdate();
    if (Game.State.startOfGame === true) {   
        Game.State.startOfGame = false;
        console.log(`Start of game is true. Set it to false.`);
        if (!Game.State.dealer) {
            Game.State.dealer = firstJackDeal();
        } else {
            if (Game.State.dealer === Game.Player.computer) {               //  switch/toggle dealer
                Game.State.dealer   = Game.Player.human;  
            } else {
                Game.State.dealer   = Game.Player.computer;   
            }
        }
        Game.State.deal = true; 
    }
    
    if (Game.State.deal === true) {
        Game.State.deal   = false;
        Game.State.playFirst = dealHandFcn(Game.State.dealer);                  //      TODO: refactor deal function
    }
    if (Game.State.playFirst === Game.Player.computer) {
        Game.State.playFirst   = null;
        Game.State.whoPlayedCallCard = Game.Player.computer;
        Game.State.computerTurn = true;
    } 
    if (Game.State.playFirst === Game.Player.human) { 
        Game.State.playFirst   = null;
        Game.State.whoPlayedCallCard = Game.Player.human;
        Game.State.userTurn    = true;
    }
    if (Game.State.userTurn === true) {
        Game.State.userTurn   = false;
        play(Game.Player.human);
    } 
    if (Game.State.computerTurn === true) {
        Game.State.computerTurn   = false;
        play(Game.Player.computer);
    }
    if (Game.Components.gameboard.computer) {
        Game.State.computerPlayed = true;
        if (Game.Components.gameboard.computer.suit === Game.Components.deck.trump.suit) {
            trackCards(Game.Player.computer, Game.Components.gameboard.computer);
        }
    }
    if (Game.Components.gameboard.user) {
        Game.State.userPlayed = true;
        Game.Controller.isMyTurn = false;
        if (Game.Components.gameboard.user.suit === Game.Components.deck.trump.suit) {
            trackCards(Game.Player.human, Game.Components.gameboard.user);
        }
    }
    if (Game.State.userPlayed === false && Game.State.computerPlayed === true) {
        Game.State.userTurn = true;
    }
    if (Game.State.userPlayed === true && Game.State.computerPlayed === false) {
        Game.State.computerTurn = true;
    }
    if (Game.State.userPlayed === true && Game.State.computerPlayed === true) {
        Game.Engine.stop();
        console.log(`Engine Stopped!`);
        Game.State.userPlayed     = false;
        Game.State.computerPlayed = false;
        //  pause game engine
        /*  End of Round Logic  */
        if (Game.State.whoPlayedCallCard === Game.Player.computer) {
            Game.State.whoPlayedCallCard   = null;
            var winner = determineWinner(Game.Components.gameboard.computer, Game.Components.gameboard.user);
            if (isHangJack(Game.Components.gameboard.computer, Game.Components.gameboard.user) === true  &&  Game.GamePlay.whoHangedJack === null) {
                Game.GamePlay.whoHangedJack = winner;
            };
        }
        if (Game.State.whoPlayedCallCard === Game.Player.human) {
            Game.State.whoPlayedCallCard   = null;
            winner = determineWinner(Game.Components.gameboard.user, Game.Components.gameboard.computer);
                if (isHangJack(Game.Components.gameboard.user, Game.Components.gameboard.computer)) {
                    Game.GamePlay.whoHangedJack = winner;
                }
        }
        debug.console(`${winner.getName()}!`);
        debug.console(Game.Components.gameboard.user.getCardName()); 
        debug.console(Game.Components.gameboard.computer.getCardName());
        // postPlay(winner);
        winner.lift.push(Game.Components.gameboard.user);
        winner.lift.push(Game.Components.gameboard.computer);
        let tmOutID = setTimeout(() => {
            if (Game.Player.computer.hand.length > 0 && Game.Player.human.hand.length > 0) {
                Game.State.playFirst = winner;
            }
            if (Game.Player.computer.hand.length === 0 && Game.Player.computer.hand.length === 0) { 
                debug.console(Game.Player.human.lift);                                //  if -ve, throw an error
                debug.console(Game.Player.computer.lift);                                //  if -ve, throw an error
                allocatePoints();
                Game.Player.computer.liftInit();
                Game.Player.human.liftInit();
                Game.State.endOfGame = true;
            }
            Game.Components.gameboard.init();
            Game.Engine.start();
            debug.console(`Engine Restarted!`);
            clearTimeout(tmOutID);
        }, 1500); 
    }   
    if (Game.State.endOfGame === true) {
        Game.State.endOfGame = false;
        Game.Components.gameboard.init();

        if (Game.Player.human.getPoints() < 14 && Game.Player.computer.getPoints() < 14) {
            Game.State.startOfGame = true;          //  restart game
        }   else {
            /*  announce winner!    */
            let gameWinner = null;
            if (Game.Player.human.getPoints() >= 14) {
                gameWinner = Game.Player.human;
            } else {
                gameWinner = Game.Player.computer;
            }
            let text = [`${gameWinner.getName()} WON!!!`,];
            Game.Engine.stop();
            debug.console(`Engine Stopped!`);
            debug.console(`Game has ended!`);
            Game.Components.msgboard.init().message(text).makeVisible();
        }   
    }
}


/********************************************************************************************************************************************************************************** */
//                                                                      THE MAIN GAME FUNCTION

/* All Fours Points */
const HIGH = 1;
const LOW  = 1;
const JACK = 1;
const GAME = 1;
const HANG_JACK = 3;

var Empty = {
    select: null,
};
/** 
 *   
 *   @param: null
 *   @return: void
 */
function mainGameLoop() {


    /*  PRE-GAME    */
    Promise.all([asset1, asset2, asset3, asset4, asset5, asset6, asset7]) 
    .then(() => {
        if (DEBUG_MODE === true) {
            // Game.debug.console("DEBUG MODE ON!");
            // Game.debug.screen.init();
            // Game.debug.msg("DEBUG MODE ON!");
            // Game.debug.display("DEBUG MODE ON!");
            // Game.debug.loadScreen();
        }
        // debug.console(Game.Player.human.hand);
        Display.onMenuScreen.clear();
        removeUtilityScreens();
        var gBoard = Empty;
        if (MAGNIFY_CARD === true) {
            gBoard = Game.Components.gameboard;
        } else {
            gBoard = Empty;
        };
        Controller.listeners(Display.onCardScreen, Game.Player.human.hand, inputUpdate);
        // debug.init();
        playerNameChangeListener();
        Game.State.startOfGame = true;
        Game.Engine.start();
    })  
/*     .then(() => { 
        // displayCutScene();
        // Game.Components.Sound.cardSlideSnd.muteAudio(); 
        // playSoundInstance("./lib/snd/ui-sound3.oga");   
        // console.log("playGameRound");
        // setTimeout(() => {
            // Game.State.startOfGame = true;
            // Game.Player.playFirst = dealHandFcn();
            // Game.Engine.start();                            //  Start Game
        // }, 5000);
        // Game.Player.playFirst = dealHandFcn();              //  dealing here because objects not loading properly in gameLoop()
    })  */            
    .catch((err) => {
        console.error(`${err} something went wrong somewhere.`);
    });
}

function pauseGame() {
    // Game.Engine.stop();
    let bgx = Display.onBackground.ctx;
    let gsx = Display.onCardScreen.ctx;
    let msx = Display.onMenuScreen.ctx;  
    /*  turn Background display to grayscale    */
    let bgdImgData = bgx.getImageData(0, 0, WIDTH, 4*HEIGHT);
    let gscImgData = gsx.getImageData(0, 0, WIDTH, 4*HEIGHT);
    for (let index = 0; index < bgdImgData.data.length; index++) {
        bgdImgData.data[index] = bgdImgData.data[index] + gscImgData.data[index];      
    };
    let grayBkgnd = grayScale(bgdImgData);
    msx.putImageData(grayBkgnd, 0, 0);
    /*  turn gamescreen to greyscale */
    let grayGameScreen = grayScale(gscImgData);
    // msx.putImageData(grayGameScreen, 0, 0);
}

function grayScale(dataFile) {
    for (let i = 0; i < dataFile.data.length/4; i+=4) {
            let r = dataFile.data[i];
            let g = dataFile.data[i+1];
            let b = dataFile.data[i+2];
            let brightness = (3*r+4*g+b)/8;
        dataFile.data[i]   = brightness;
        dataFile.data[i+1] = brightness;
        dataFile.data[i+2] = brightness;
        // dataFile.data[i+3] = 255;    
    }
    return dataFile;
}

function unPauseGame() {
    Game.Engine.start();
}

function playerNameChangeListener() {
    clickEnterButton();
    let nameInput = document.getElementById("player_name");
    nameInput.addEventListener('input', changePlayerName);
}

function clickEnterButton() {
    let entBtn = document.getElementById("enter_btn");
    let nameInput = document.getElementById("player_name");
    function stopBtnListener() {
        nameInput.removeEventListener('input', changePlayerName);
        entBtn.removeEventListener('click', stopBtnListener);
        nameInput.value = null;
    }
    entBtn.addEventListener('click', stopBtnListener);
}
function changePlayerName() {
    let nameInput = document.getElementById("player_name");
    if (nameInput.value.length != 0) {
        Game.Player.human.changeName(nameInput.value);
    }
}

// loadScript(scriptArray[8]);     //  loads the tickertape script
// loadScript(scriptArray[6]);     //  loads the tickertape screen
/* scriptArray.forEach(element => {
    loadScript(element);
}); */
const messageArray = [
            `Play Two-Man All Fours`,
            `Coors Light, taste the rockies!`,
            // `Stag, a man's beer`,
            // `A beer is a Carib`,
        ];
const tempArray = [`Play Two-Man All Fours`,];
// 
// tickertape(tempArray);
// mainGameLoop();
    let pauseID = setTimeout(function () {
        tickertape(messageArray);
        mainGameLoop();
        clearTimeout(pauseID);
    }, 5000);
    })();
}, 8000);
/*
##################################################################################################################################
*/

/*  Tickertape Functions    */
function tickertape(messageArr) {
    const width=window.innerWidth;
    const height=50;
    let i=0;
    var x=0;
    var y=0;
    var t = new gCanvasLayer("tck_board", 0, "black");      //  , width, height, 1.0, 0, 0, 0, 0);
    let tb = t.canvas;
    t.height = height;
    t.width = t.scale * width;
    document.getElementById("ticker").appendChild(tb);
    t.init();
    tb.style.position = "static";       // setAttribute("position", "static");
    let tbx = t.ctx;
    let fontSize = t.scale * 30;
    t.setFont(`${fontSize}px Dot Matrix`);
    tbx.fillStyle = "yellow";
    x=width;
    y=40;
    let ID = setInterval(function () {       // anonymous function for handling the animation
        if (x<-400) {
            x=width;
            //  change message index
            i = (i + 1) % messageArr.length;
        } 
        t.clear();
        x-=2;
        tbx.fillText(messageArr[i], x, y);
    }, 1000/60);
}

//------------------------------------------------------------------------------------------------------------------

    //          GARBAGE COLLECTION
    // clear setTimeouts and setIntervals, remove Event Listeners etc.
    //          QUIT FUNCTION --> ESC or 'X' --> confirm exit window


//                                                                            THE END!
/**************************************************************************************************************************************************************************************************** */

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                               TODO: 
//      ***KNOWN BUGS***
//      AI needs tweeking
//      
//      
//


/*
Libs:
BackEnd:
    Engine (server side): wGameEngine -> engine for the web; mGameEngine -> for mobile (PWA)
                            Display -> engine for rendering graphics
    AI Library
FrontEnd:
    Display Module
    Controller Module
    Testing Module          (abandoned: did not use test-driven development)
    Debug Module
    Sound Module
    Game Module --> game components, objects & classes etc...
*/


/********************************************************************************************** */
/*                 Copyright (c) 2018-2019 Prodigy Engineering LLC, NY. All Rights Reserved                 */
/********************************************************************************************** */
