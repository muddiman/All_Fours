// import { gameBoard } from "/lib/graphicslib";

// import { displayScoreboard } from "./lib/graphicslib";

// import { CANVAS_LAYER } from "./lib/graphicslib";


// import { Card } from "./lib/card.js";

/*
                Title:  ALL FOURS GAME
                Language: Javascript
                Programmer: .muddicode 
                Code: Main Program                            
*/

/**
 *  @copyright (c) 2018 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com  
 *  @version   0.6.3
 *  @since     2018-10-1
 *  @download  https://www.github.com/muddiman/All_Fours
 *  @license   NOT for 'commercial use'.
 *  @See:      http://www.roger-clarke.com/allfours/license.html
 *             Free to use and/or distribute for personal or academic purposes.
 *             Must site the source code using the following format at beginning or end of source code file where it was used:
 *             "Clarke, Roger A. (2018) All Fours Game (ver. 0.6.3) [Source Code]. New York, 
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
     Display Module     ==> DispInt.mjs     --> screens.mjs, 
     Controller Module  ==> controls.mjs    --> mouse.mjs, keyboard.mjs, touch.mjs, keymap.JSON
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
import { Player }       from "/lib/player.mjs";
import { Engine }       from "/lib/engine.mjs";
import { gCanvasLayer } from "/lib/screen.mjs";
// import { Display } from "/lib/disp-int.mjs";

/* the globals */
/* necessary game dimensions */
const WIDTH   = 700; //use window.innerWidth;  for fullscreen gaming
const HEIGHT  = 450; //use window.innerHeight; for fullscreen gaming
const CARD_W  =  72; // card width
const CARD_H  =  96; // card height

/* card FACES & SUITS arrays */
const SUITS = ['c', 'd', 'h', 's'];
const FACES = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'];

/* Clear/Opaque */
const TRANSPARENT = 0;
const OPAQUE = 1.0;

/* Frame Rate */
// const LOW_REFRESH_RATE = 2; // IN FPS (frames per second)
// const FIVE_REFRESH_RATE = 5;
// const TEN_REFRESH_RATE = 10;
// const HIGH_REFRESH_RATE = 30; // in FPS (frames per second)
// const FPS_2 = (1 / LOW_REFRESH_RATE) * 1000; // in milliseconds
// const FPS_5 = (1 / FIVE_REFRESH_RATE) * 1000;
// const FPS_30 = (1 / HIGH_REFRESH_RATE) * 1000;
// const FPS_10 = (1 / TEN_REFRESH_RATE) * 1000;

/* Players */
const PLAYER1_NAME = "Computer";
const PLAYER2_NAME = "Roger";

/* Canvas top-left corner coords (in px) */
const LEFTOFFSET = 15;
const TOPOFFSET = 110;

/* Animation Constants */
// const CONVERT_TO_RADIANS = Math.PI / 180;




//------------------------------------------------------------------------------------------------------------------
/*  THE CLASSES/OBJECT CONSTRUCTORS  */



/* function gCanvasLayer(ID, _WIDTH, _HEIGHT, OPACITY, Z, red, green, blue) {          //drawScreenFcn, period
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
        // this.refresh = setInterval(drawScreenFcn(), period);
    };
    this.clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
     this.stop = function () {
        clearInterval(this.refresh);
    }; 
}
 */
// var gAssetCacheArr = [];    OR as an object:    var gAssetCacheObj = {};
/* Card Class/Object Constructor */
function Card(rank, face, suit) {               // Card object constructor (TODO: Change to a Class)
    this.suit = suit; // ['c', 'd', 'h', 's'],  MAX_SUITS=4
    this.face = face; // ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'],     MAX_FACES=13
    this.rank = rank; // [0, 1,.. 12], to assist in determining who played the higher card
    this.getCardName = function () {
        return this.face + this.suit; // string of two letters uniquely identifying the card (like a 'key')    MAX_CHARACTERS=2
    };
    this.init = function () {
        if (gCardImageCacheObj[this.getCardName()]) {
            this.image = gCardImageCacheObj[this.getCardName()];
            console.log(`${gCardImageCacheObj[this.getCardName()].id} image retrieved from cache.`);
        } else {
            this.image = new Image();
            this.image.id = this.getCardName();
//            this.image.src = "img/" + this.getCardName() + ".png";
            this.image.src = `img/${this.getCardName()}.png`;
            gCardImageCacheObj[this.getCardName()] = this.image;
            this.image.onload = () => {
               // let card = this.getCardName();
               if (gCardImageCacheObj[this.getCardName()] === this.image) {
                //console.log(`${this.getCardName()} image loaded into cache object.`);
               }
            };
        }
    };
}


/**
 *     Player object constructor (or class)
 *     
 */
/* Player Class/Object Constructor 
function Player() { // Add a "Team" constructor when coding the 4-player version: function Team(playerA, playerB)
    this.init = function () {
        this.hand = [];     // MAX_CARDS_IN_HAND=12;
        this.points = 0;    // MAX_POINTS=14;
        this.lift = [];     // MAX_CARDS_IN_LIFT=48;
        this.name = "";     // MAX_CHARACTERS=12;
    };
    //this.player1 = playerA;
    //this.player2 = playerB;
    //this.team = "";
    //this.setPlayerName = function (name) {this.name = name;}
    //this.setPlayerTeam = function (team) {this.team = team;}
    //this.setTeamName   = function (name) {this.teamName = name;}
    //this.setTeamPlayers = function (player1, player2) {this.teamPlayers = [player1, player2];}
}
*/

//-------------------------------------------------------------------------------------------------------------------------
/*          THE OBJECTS             */


//  obtain objects from .JSON files or external class files

/*  Image Cache  */
// card images
var gCardImageCacheObj = {}; // object of cached card images

/* game board object */
// import gameBoard from '/lib/graphicslib.js';         INCL. score board, trump...

/* Game.Background = {
    //  Object: gameBoard --> TODO: turn into a "class"
    canvas: document.createElement("canvas"),
    init: function () {
        // initialize gameBoard by applying context & inserting the canvas in the "game_container" <div> 
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.canvas.id = "game_board";
        this.ctx = this.canvas.getContext("2d");
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById("game_board").style = "position: absolute; left: " + LEFTOFFSET + "px; top: " + TOPOFFSET + "px; z-index:0; background-color: darkolivegreen; border: 5px solid black;";
        this.refresh = setInterval(_drawGameBoard, FPS_2);
    },
    clear: function () {
        // wipes the entire gameBoard clean
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    // this.frameNo =0;
    // if 'setInterval is used, there should be stop function
    stop: function () {
        clearInterval(this.refresh);
    }
};
 */
/*  Remove game_board and use game Background instead.
    there is no need to constantly update the background @ 30 fps.
    All game components that are not frequently updated can be placed in the background
*/


/*  Main Game Object (parent object)    */
var Game = {
    //  Display : Display,
    Components : {},
    Background : {},                // OPAQUE Canvas scoreboard, labels, trump
    Screens    : {},                // Transparent canvas cardLayer, menulayer, msgLayer --> msgBoard, gameMenu, gameBoard 
    Player     : {},
    Controller : {},
    Engine     : new Engine(1000/24, _renderAllScreens)
};
/*  Prototypes  */
Game.Components = {
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
    updateBackground : function () {
        isUpdated = true;
    }
/*     init        : function () {
        this.scoreboard = null;
        // this.labels     = null;
        this.trump      = null;
    }  */
};

Game.Screens = {
    gameScreen  : null,
    menuScreen  : new gCanvasLayer("menu_layer",LEFTOFFSET, TOPOFFSET, WIDTH, HEIGHT, OPAQUE, 3,    0,  0,   0),
    msgScreen   : null
};
Game.Player = {
    computer : new Player(PLAYER2_NAME, "Androids"),
    human    : new Player(PLAYER1_NAME, "A-Team")
};


Game.Background.display = {
    //  Object: gameBoard --> TODO: turn into a "class"
    canvas: document.createElement("canvas"),
    init: function () {
        // initialize gameBoard by applying context & inserting the canvas in the "game_container" <div> 
        this.canvas.width  = WIDTH;
        this.canvas.height = HEIGHT;
        this.canvas.id = "game_board";
        this.ctx = this.canvas.getContext("2d");
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById("game_board").style = "position: absolute; left: " + LEFTOFFSET + "px; top: " + TOPOFFSET + "px; z-index:0; background-color: darkolivegreen; border: 5px solid black;";
        //  this.refresh = setInterval(_drawGameBoard, FPS_2);
    },
    clear: function () {
        // wipes the entire gameBoard clean
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    setFont: function (fontString) {
        this.ctx.font = fontString;
    }
    // this.frameNo =0;
    // if 'setInterval is used, there should be stop function
/*     stop: function () {
        clearInterval(this.refresh);
    }   */
  }; 
 

// var cardLayer   = new gCanvasLayer("card_layer", WIDTH, HEIGHT, TRANSPARENT, _drawCardScreen, FPS_30, 1, 255, 255, 255);
/* Card layer object */

// var cardLayer = {
Game.Screens.gameScreen = {                                                               //  Object: cardLayer --> TODO: turn into a "class"
    canvas: document.createElement("canvas"),
    init: function () {
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.canvas.id = "card_layer";
        this.ctx = this.canvas.getContext("2d");
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById("card_layer").style = "position: absolute; left: " + LEFTOFFSET + "px; top:  " + TOPOFFSET + "px; z-index: 1; background-color: rgba(255, 255, 255," + TRANSPARENT + ");";
        // this.refresh = setInterval(_drawCardScreen, FPS_30);
    },
    clear: function () {                                                        // wipes the entire card screen clean
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
/*     stop: function () {                                                         // if 'setInterval is used, there should be stop function
        clearInterval(this.refresh);
    }, */
    // this.frameNo =0;
};


/* Message layer object */
//var msgLayer  = new gCanvasLayer("msg_layer",   WIDTH, HEIGHT, TRANSPARENT, _drawMsgScreen,  FPS_2,  2, 255, 255, 255);

Game.Screens.msgScreen = {
// var msgLayer = {        //  Object: msgLayer --> TODO: turn into a "class"
    canvas: document.createElement("canvas"),
    init: function () {
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.canvas.id = "msg_layer";
        this.ctx = this.canvas.getContext("2d");
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById("msg_layer").style = "position: absolute; left: " + LEFTOFFSET + "px; top: " + TOPOFFSET + "px; z-index: 2; background-color: rgba(255, 255, 255," + TRANSPARENT + ");";
        // this.refresh = setInterval(_drawMsgScreen, FPS_2);
    },
    clear: function () { // wipes the entire gameBoard clean
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },/* 
    stop: function () { // if 'setInterval is used, there should be stop function
        clearInterval(this.refresh);
    }, */
    // this.frameNo =0;
};

/* Menu layer object */

/* Canvas Layer Objects */
//                     new gCanvasLayer(ID,            _WIDTH,_HEIGHT,OPACITY,      _drawScreenFcn,  period, Z, red, green, blue)
//  var gameBoard    = new gCanvasLayer("game_board",  WIDTH, HEIGHT, OPAQUE,       _drawScreenFcn,          0,              );
//  var cardsLayer   = new gCanvasLayer("cards_layer", WIDTH, HEIGHT, TRANSPARENT,  _drawScreenFcn,          1,              );
//  var msgLayer     = new gCanvasLayer("msg_layer",   WIDTH, HEIGHT, TRANSPARENT,  _drawMsgScreen,  FPS_2,  2, 255, 255, 255);
//  var menuLayer    = new gCanvasLayer("menu_layer",  WIDTH, HEIGHT, OPAQUE,       _drawMenuScreen, FPS_30, 3,    0,  0,   0);

/*  Image Cache  */
// card images
// var gCardImageCacheObj = {};

/* Deck of cards objects   */
Game.Components.deck = {
//  var deck = {
    // deck object: Game.Components.deck.init(), Game.Components.deck.shuffle(), Game.Components.deck.cut(), Game.Components.deck.deal()    
    cards: [],
    trump: null,
    init: function () {
        /** creates deck (array of all 52 cards)
         *  @param: null
         *  @returns: deck
         */
        // var SUITS = ['c', 'd', 'h', 's'];
        // var FACES = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'];
        return new Promise(() => {
            let n = 0;
            for (let y = 0; y < SUITS.length; y++) {
                var rank = 1;
                for (let x = 0; x < FACES.length; x++) {
                    this.cards[n] = new Card(rank, FACES[x], SUITS[y]);
                    this.cards[n].init(); //  get card images from image files or image cache object
                    n++;
                    rank++;
                }
            }
        });

        // return this.cards;
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
        //return this.cards;
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
        updateBackground();
    },
    getTrump: function (card) {
        return this.trump; //  = card;
    },
    deal: function (human, computer) {
        /** randomly mixes up the cards in the deck
         *  @param: human, computer (players' hand --array-of-cards )
         *  @returns: randomized deck
         */
        var n = 0;
        while (human.hand.length < 6) {
            let card = this.cards.shift();
            Game.Player.human.addCardToHand(card, updateBackground);
            card = this.cards.shift();
            Game.Player.computer.addCardToHand(card, updateBackground);
            n++;
        }
        let trump = this.cards.shift();
        this.setTrump(trump);
        //return human, computer;
    },
    beg: function (human, computer) {
        /** randomly mixes up the cards in the deck
         *  @param: null
         *  @returns: void
         */
        while (human.length <= 9) {
            human.hand = this.cards.shift();
            computer.hand = this.cards.shift();
        }
        if (this.trump.suit != this.cards[0].suit) {
            this.trump = this.cards.shift();
        } else {
            this.trump = this.cards.shift();
            while (human.length <= 12) {
                human = this.cards.shift();
                computer = this.cards.shift();
            }
            if (this.trump.suit === this.cards[0].suit) {
                this.trump = this.cards.shift();
                this.trump = this.cards.shift();
            } else {
                this.trump = this.cards.shift();
            }
        }
        // return this.cards;
    },
};

//  Load JSON file from file system
// var fs = require('fs');


//  message board object
Game.Components.msgboard = {
// var msgboard = {
    visible     : false,
    isUpdated   : false,
    text        : null,
    init        : function () {
                    this.visible = false;
                    this.text = null;
                    this.isUpdated = false;
                },
    makeVisible : function () {
        this.visible = true;
    },
    makeInvisible : function () {
        this.visible = false;
    },
    message     : function (text) {
        this.text = text;
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
    },
    listenForSelectCard: function (callback) {
        this.listeningForSelectCard = setInterval(callback, 250);
    },
    listenForUserCard: function (callback) {
        this.listen = setInterval(callback, 250);
    },
    stopListening: function () {
            clearInterval(this.listen);
            clearInterval(this.listeningForSelectCard);
    },
    updateGameboard:    function () {
        this.isUpdated = true;
    }

};

/**
 *  Manages ALL user input (mouse, touch and keyboard) as an Object
 */
Game.Controller = {
// var Game.Controller = {
    clickPosition: [],
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
        ' '         : 'confirmSelection',
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
    },
    clickState: [],
    keyState: {},
    bind: function (key, action) {
        this.bindings[key] = action;
    },
    init: function () {
        this.clickPosition = [];
        this.cardSelection = null;
        this.refresh = setInterval(inputUpdate, 250); //      FPS_2
    },
    stop: function () {
        clearInterval(this.refresh);
    },
};


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
/*  INPUT SECTION   */

function removeInputListener() {
    return new Promise(function (resolve) {
        console.log('event listener removed');
        document.getElementById('card_layer').removeEventListener('click', mouseEventHandler(event)); // change to cardsLayer 
    });
}

// listens for touch events, captures and returns its location as a position array --> [x.y]
//      document.getElementById('game_board').addEventListener('touch', onTouch(e));
/*  touch input */
/**
 * 
 * @param {*} touchEvent 
 */
function onTouch(touchEvent) {
    let x = touchEvent.clientX; // click location
    let y = touchEvent.clientY;
    let posArr = [x, y];
    document.getElementById('game_board').removeEventListener('touch', onTouch(e));
    touchEventHandler(posArr);
}

/**
 * 
 * @param {[x,y]} positionArray 
 */
function touchEventHandler(positionArray) {
    return new Promise(function (resolve, reject) {
        var n = null;
        var x = positionArray[0];
        console.log(x);
        var y = positionArray[1];
        console.log(y);
        var p = x - 160;
        if (y > 450) {
            switch (true) {
                case (p < 36):
                    n = 0;
                    break;
                case (p < 72):
                    n = 1;
                    break;
                case (p < 108):
                    n = 2;
                    break;
                case p < 144:
                    n = 3;
                    break;
                case p < 180:
                    n = 4;
                    break;
                case (p < 252):
                    n = 5;
                    break;
                default:
                    n = 'Out of Range'; // change to zero from  null; 
            }
        } else {
            n = 'Please click on a card!';
        }
        //resolve(n);
        if (n != null && n < 6) {
            console.log(n);
            resolve(n);
        } else {
            reject(n);
        }
    });
}


/*  keyboard input  */
function onKeystroke(keyboardEvent) {
    // case-switch a keystroke to corresponding card number in hand
    // => {
    let code = keyboardEvent.keyCode;
    let action = Game.Controller.bindings[code];
    if (action) {
        Game.Controller.actions[action] = true;
    }

    let yourHand = human.hand;
    let i = 0;
    let arrowKeyRight = 8594;
    let arrowKeyLeft = 8592;
    if (keyboardEvent == 27) {
        alert('Sure you wish to quit game?');
    }
    // while (keyboardEvent.code == arrowKeyRight || keyboardEvent.code == arrowKeyLeft) {
    if (arrowKeyRight == keyboardEvent.code) {
        enlargeCard(i);
    } else if (arrowKeyLeft == keyboardEvent.code) {
        enlargeCard(-i);
    }
    i = i % yourHand.length + 1;
    // }
}

function gControllerListeners() {
    document.getElementById("card_layer").addEventListener("mousedown", onMouseDown, true);   
 //   document.getElementById("card_layer").addEventListener("mouseup", onMouseUp, true);   
    window.addEventListener('keydown', onKeyDown);       // keyboard
    window.addEventListener("keyup", onKeyUp);
    console.log("All listeners loaded");
}

function onMouseOver(event) {
    let posx = event.clientX; // x,y position of the mouse pointer on canvas when event occurs
    let posy = event.clientY;
    console.log("(", posx, ", ", posy, ")");
}

function mouseOverSelect() {
    // pass;
    // select
}

function clickConfirmation() {
    // Pass;
}

function arrowKeySelect() {
    // Pass;
    if (Game.Controller.keyState[KEY_RA]) {
        Game.Background.select = hand[i];
    }
    if (Game.Controller.keyState[KEY_LA]) {
        Game.Background.select = hand[-i];
    }
}

function enterConfirm() {

}

function onMouseDown(event) {
    let locX = event.clientX - LEFTOFFSET;
    let locY = event.clientY - TOPOFFSET;
    console.log("Click location: (", locX, ", ", locY, ")");
    Game.Controller.clickPosition[1] = locX;
    Game.Controller.clickPosition[2] = locY;
    document.getElementById("card_layer").removeEventListener("mousedown", onMouseDown, true);
}

function onMouseUp(event) {
    for (action in Game.Controller.actions) {
        if (Game.Controller.actions[action] == true) {
            Game.Controller.actions[action] = false;
        }
    }
    document.getElementById("card_layer").addEventListener("mousedown", onMouseDown, true);   
}

function clickEventHandler() {
    let myHand = Game.Player.human.hand;
    let handPosX = 134;
    let handPosY = 340;
    let locX = Game.Controller.clickPosition[1];
    // console.log("X --> ", locX);
    let locY = Game.Controller.clickPosition[2];
    // console.log("Y --> ", locY);
    if (locY > handPosY && locY < handPosY + CARD_H) {
        for (let i = 1; i <= myHand.length; i++) {
            if (locX > handPosX + (i - 1) * CARD_W / 2 && locX < handPosX + i * CARD_W / 2) {
                // play(i);
                // Game.Background.user = myHand[i - 1];
                // play(i - 1);
                let key = i.toString();
                // console.log(key);
                let action = Game.Controller.bindings[key];
                if (Game.Controller.actions[action] === false) {
                    Game.Controller.actions[action] = true;
                }
                break;
            }
            if (i == myHand.length && locX > handPosX + (i - 1) * CARD_W / 2 && locX < handPosX + i * CARD_W / 2 + CARD_W / 2) {
                let key = i.toString();
                let action = Game.Controller.bindings[key];
                if (Game.Controller.actions[action] === false) {
                    Game.Controller.actions[action] = true;
                }
                break;
            }
        }
    }
}

async function onKeyDown(event) {
    let key = event.key;
    window.removeEventListener('keydown', onKeyDown); // keyboard
    // await gWaitState(1);
    if (key) {
        console.log("ID: ", key); // ASCII id of key thats was pressed
        //  stop listening
    }
    let action = Game.Controller.bindings[key];
    if (Game.Controller.actions[action] === false) {
        Game.Controller.actions[action] = true;
    }
}

function onKeyUp(event) {
    let key = event.key;
    let action = Game.Controller.bindings[key];
    Game.Controller.actions[action] = false;
    window.addEventListener('keydown', onKeyDown); // keyboard
}

function toggleMenuScreen() {
    //  probe all game keys
    if (Game.Controller.actions['showMenuScreen']) {           // toggle menu screen
        if (document.getElementById('menu_layer').style.visibility == 'visible') {
            document.getElementById('menu_layer').style.visibility = 'hidden';
        } else {
            document.getElementById('menu_layer').style.visibility = 'visible';
        }
    }
}

function inputUpdate() {
    toggleMenuScreen();                                 // Esc returns player to the Menu Screen where he can 'quit game', adjust game options, etc
    clickEventHandler();

    if (Game.Controller.actions['playCard_1']) {      // queries the key's state, and calls the corresponding function
        if (Game.Background.user === null) {
            Game.Background.user = human.hand[0];
            human.hand.splice(0, 1);
        }
    }
    if (Game.Controller.actions['playCard_2']) {
        if (Game.Background.user === null) {
            Game.Background.user = human.hand[1];
            human.hand.splice(1, 1);
        }
    }
    if (Game.Controller.actions['playCard_3']) {
        if (Game.Background.user === null) {
            Game.Background.user = human.hand[2];       // 
            human.hand.splice(2, 1);
        }
    }
    if (Game.Controller.actions['playCard_4']) {
        if (Game.Background.user === null) {
            Game.Background.user = human.hand[3];       // 
            human.hand.splice(3, 1);
        }
    }
    if (Game.Controller.actions['playCard_5']) {
        if (Game.Background.user === null) {
            Game.Background.user = human.hand[4];       //
            human.hand.splice(4, 1);

        }
    }
    if (Game.Controller.actions['playCard_6']) {
        if (Game.Background.user === null) {
            Game.Background.user = human.hand[5];       // 
            human.hand.splice(5, 1);
        }
    }
    if (Game.Controller.actions['selectNext']) {
        if (Game.Background.select) {
            for (i=0; i < human.hand.length; i++) {
                if (i < human.hand.length - 1) {
                    if (Game.Background.select === human.hand[i]) {
                        Game.Background.select = human.hand[i+1];
                        console.log(i);
                        break;
                    }
                } else {
                    Game.Background.select = null;
                }
            }
        } else {
                Game.Background.select = human.hand[0];
        }  
    }

    if (Game.Controller.actions['selectPrevious']) {
        if (Game.Background.select) {
            for (i=human.hand.length; i >=0; i--) {
                if (i > 0) {
                    if (Game.Background.select === human.hand[i]) {
                            Game.Background.select = human.hand[i-1];
                            console.log(i);
                            break;
                    }
                } else {
                    Game.Background.select = null;
                }
            }  
        } else {
            Game.Background.select = human.hand[-1];
        }
    }

    if (Game.Controller.actions['confirmSelection']) {
        if (!Game.Background.user) {
            // Game.Background.user = Game.Background.select;
            for (i=0; i<human.hand.length; i++) {
                if (Game.Background.select === human.hand[i]) {
                    Game.Background.user = human.hand[i];
                    human.hand.splice(i,1);
                    Game.Background.select = null;
                }
            }
        }
    }

}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*  game play functions   */

async function gWaitState(secs) {                       // institutes a wait state for specified time interval
    console.log(`Waiting ${secs} seconds...`)
    await new Promise((resolve, reject) => setTimeout(resolve, secs * 1000));
}

function listCardOnBoard() {                                    // debugging function to view the played cards in memory
    console.log(`User: ${Game.Background.user.getCardName()}`);
    console.log(`Computer: ${Game.Background.computer.getCardName()}`);
}

function firstJackDeal() {
    let flipACoin = Math.floor(Math.random() * 2); // temporaily use coin flip to simulate firtsJackDeal between two players
    if (flipACoin == 0) {
        return Game.Player.computer;
    } else {                // flipACoin == 1
        return Game.Player.human;
    }
}

async function dealHandFcn(dealer) {
    // let dealer = null;
    /*  Deal Cards  */
    //assign dealer -->      TODO: animation
    if (!dealer) {              // then firstJackDeal();
        dealer = firstJackDeal();
    } else if (dealer === human) {               // switch dealer
        dealer = Game.Player.computer;
        //playFirst = human;
    } else {
        dealer = Game.Player.human;
    }
    // deal
    // if (computer.hand.length == 0 && human.hand.length == 0) {
        console.log(`${dealer.name} deals.`);
        Game.Components.deck.init();
        Game.Components.deck.shuffle();
        Game.Components.deck.deal(Game.Player.human, Game.Player.computer);
        dealer.points += kickPoints(Game.Components.deck.getTrump());
        console.log(`${dealer.name} gets ${kickPoints(Game.Components.deck.trump)} points.`);
        if (dealer === Game.Player.human) {             // assign who plays first as a result of dealing
            var whoPlaysFirst = Game.Player.computer;
        } else {
            whoPlaysFirst = Game.Player.human;
        }
   // }
    return whoPlaysFirst;
}

function allocatePoints() {
    // game
    if (countForGame(computer) > countForGame(human)) {
        Game.Player.computer.points += GAME;
    } else {
        Game.Player.human.points += GAME;
    }
    // high
    let playedHigh = whoPlayedHigh();
    playedHigh.points += HIGH;
    // low
    // jack
    if (didPlayerPlayedJack(computer) == true) {
        Game.Player.computer.points += JACK;
    } 
    if (didPlayerPlayedJack(human) == true) {
        Game.Player.human.points += JACK;
    }
    // continue game if there is no winner as yet
    if (Game.Player.computer.points < 14 && Game.Player.human.points < 14) {
        playGameRound();
    }
}


function didUserPlayCard() {
    let listen = setInterval(inputUpdate(), 250);
    for (var action in Game.Controller.actions) {
        if (Game.Controller.actions[action] === true) {
            // Game.Controller.stop();
            clearInterval(listen);
            return true;
        }
    }
}

async function playGameRound(whoPlaysFirst) {
    let winner = null;
    //  let time=4;
    // let whoPlaysFirst = null;
    /*  deal, play rounds, distribute points --> repeat    */
   // while (computer.hand.length > 0 && human.hand.length > 0) {
        await Game.Components.gameboard.init();
        await gWaitState(4);                                                         // initialize/clear game play... (just as a precaution)
        if (whoPlaysFirst === Game.Player.computer) {
            console.log(`${whoPlaysFirst.name} plays first!`);
            computerPlay(computerAI());                                             // if human deal, computer plays first 
            await Game.Components.gameboard.listenForUserCard(async () => {
                if (Game.Components.gameboard.user) {
                    Game.Components.gameboard.stopListening();
                    winner = determineWinner(Game.Components.gameboard.computer, Game.Components.gameboard.user);
                    whoPlaysFirst = winner;
                    postPlay(winner);
                }
            });
        } else {  
            whoPlaysFirst = Game.Player.human;                                      //  else human plays first
            console.log(`${whoPlaysFirst.name} plays first!`);
            await Game.Components.gameboard.listenForUserCard(async() => {
                if (Game.Components.gameboard.user) {
                    Game.Components.gameboard.stopListening();
                    computerPlay(computerAI());
                    winner = determineWinner(Game.Components.gameboard.user, Game.Components.gameboard.computer);
                    whoPlaysFirst = winner;
                    postPlay(winner);
                }
            });
            console.log(`lets see if it reaches here!`);
        }
   // }
}

async function postPlay(winner) {
    let time=4;
    Game.Components.msgboard.text =  `${winner.name} won!`;                         // announce winner
    Game.Components.msgboard.visible = true;
    await gWaitState(time);
    console.log(`Wait ${time} seconds.`);
    winner.lift += Game.Components.gameboard.computer;
    winner.lift += Game.Components.gameboard.human;
    Game.Components.msgboard.text = `${winner.name} will play first.`;
    Game.Components.msgboard.visible = true;
    await gWaitState(time);
    console.log(`Wait ${time} seconds.`);
    // await Game.Components.gameboard.init();
    if (Game.Player.human.hand.length === Game.Player.computer.hand.length) {        //  while card in hand hasn't finish, keep playing
        if (Game.Player.computer.hand.length > 0) {
            console.log(`Call playGameRound function.`);
            playGameRound(winner);
        } else {
            console.log(`Round finish. Calculating points.`);
            allocatePoints();
        }
    } else {
        console.log(`Error!`);
    }
}

   function didPlayerPlayedJack(player) {
    for (let eachCard in player.lift) {
        if (player.lift[eachCard].suit == Game.Components.deck.trump.suit) {
            if (player.lift[eachCard].face == j) {
                return true;
            }
        } 
    }
    return false;
}

    /* 
        GAME RHYTHM:
    publish who plays first
    wait
    play
    wait
    play 
    wait
    determineWinner
    publish winner
    wait
    init
    */

/**
 * 
 * @param {*} human.hand  the human player's hand (array of cards)
 * @returns card or error
 */
function humanPlay() {
    //let cardChoice;
    return new Promise(function (resolve) {
        let hand = Game.Player.human.hand;
        let cardChoice = Game.Components.Game.Background.user;
        let i = hand.indexOf(cardChoice);
        let cardName = cardChoice.getCardName(); // not needed - delete after debugging
        console.log(cardName);
        hand.splice(i, 1);
        if (cardChoice === null) {
            reject("Did not get user input");
        } else {
            resolve(cardChoice);
        }
    });
}

function computerAI() {
    // play a random card
    let compHand = Game.Player.computer.hand;
    let i = Math.floor(Math.random() * compHand.length);
    console.log("Computer chooses " + i + "th card.");
    return i;
}

/**
 * 
 * @param {int} i integer [0 .. length of computer's hand]
 */
function computerPlay(i) {                          // run the 'thinking animation'
    Game.Components.gameboard.computer = Game.Player.computer.hand[i];
    let card = Game.Player.computer.hand[i];
    let cardName = card.getCardName();
    console.log(cardName);
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
            win = called; // replace console.log with msgboard text
        } else {
            win = played;
        }
    } else if (played.suit === Game.Components.deck.trump.suit) {
        win = played;
    } else {
        win = called;
    }
    if (win === Game.Components.Game.Background.user) {
        return Game.Player.human;
    } else {
        return Game.Player.computer;
    }
}

//  Points associated with KickCard
function kickPoints(card) {
    switch (card.face) {
        case 'a':
            Game.Components.msgboard.text = "Kick Ace! Dealer gets 1 pt.";
            Game.Components.msgboard.visible = true;
            return 1;
        case '6':
            Game.Components.msgboard.text = "Kick Six!! Dealer gets 2 pts.";
            Game.Components.msgboard.visible = true;
            return 2;
        case 'j':
            Game.Components.msgboard.text = "Kick Jack!!! Dealer gets 3 pts.";
            Game.Components.msgboard.visible = true;
            return 3;
        default:
            Game.Components.msgboard.text = "Kicks nothing!! Wham? like yuh toe buss?";
            Game.Components.msgboard.visible = true;
            return 0;
    }
}

function countForGame(player) {
    var points = 0;
    for (let eachCard in player.lift) {
        // var card = player.lift.pop;
        switch (player.lift[eachCard].face) {
            case 'a':
                points += 4;
                break;
            case 'k':
                points += 3;
                break;
            case 'q':
                points += 2;
                break;
            case 'j':
                points += 1;
                break;
            case 't':
                points += 10;
                break;
            default:
                points += 0;
        }
    }
    return points;
}

//  End of game round subroutines
//if (userHand.length == 0) {
//    distributePoints();

//  deal (toggle dealer)
// if (human.points >= 14) {
//   let declaredWinner = "Congrations ", + human.name +"You beat us at All Fours";
//    console.log(declaredWinner);
// msgBoard.text = declared Winner;
// msgBoard.visible = true;
//}

/*
    function distributePoints() {
        //  Game
        let hGamePoints = countForGame(human);
        let cGamePoints = countForGame(computer);
        // logic to determine assignment of game points
        if (hGamePoints == cGamePoints) {
            dealer.points += GAME;
        } else if (hGamePoints > cGamePoints) {
            human.points += GAME;
        } else {
            computer.points += GAME;
        }
        
        //  High
        //  Low
        //  Jack
        //  Hang Jack
        

    }
  */

// rank_highest_trump --> player += HIGH
function whoPlayedHigh() {
    let highestHumanTrumpCard = null;
    let highestComputerTrumpCard = null;
    for (var eachCard in human.lift) {
        if (eachCard.suit === Game.Components.deck.trump.suit && highestHumanTrumpCard.rank < eachCard.rank) {
            highestTrumpCard = eachCard;
        }
    }
    for (var eachAndEveryCard in computer.lift) {
        if (eachAndEveryCard.suit === Game.Components.deck.trump.suit && highestComputerTrumpCard < eachAndEveryCard.rank) {
            highestComputerTrumpCard = eachAndEveryCard;
        }
    }
    if (highestComputerTrumpCard > highestHumanTrumpCard) {
        return computer;
    } else {
        return human;
    }
}

// Hang Jack --> player.points += HANG_JACK
function isHangJack(playedCard, calledCard) {
    if (playedCard.suit === Game.Components.deck.trump.suit && calledCard.suit === Game.Components.deck.trump.suit) {
        if (playedCard.face === 'j' || calledCard.face === 'j') {
            if (playedCard.rank > 9 || calledCard.rank > 9) { // rank of jack = 9, (check)
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*  Display Functions   */


function displayCardCache() {
    for (card in gCardImageCacheObj) {
        console.log(`${card} : ${gCardImageCacheObj[card].id}`);
    }
}

//  labels on game objects in the Background                                                         
function displayLabels() {
    //  let c=Game.Background.display.canvas;
    let bgx = Game.Background.display.ctx;
    Game.Background.display.setFont("15px Arial");
    // bgx.font = "15px Arial";
    bgx.fillStyle = "rgba(254,254,254,1.0)"; // white, opaque
    //  Game.Background.display.setFillStyle("rgba(255,255,255,1.0");
    let labelUserCards = "1     2       3       4       5       6";
    bgx.fillText("TRUMP", 15, 30 + CARD_H); // user keyboard play labels
    bgx.fillText(labelUserCards, 134 + CARD_W / 4, HEIGHT - 2); // trump label
}


function displayUserCard() {
    playCard('bottom', Game.Components.gameboard.user);
}

function displayComputerCard() {
    playCard('top', Game.Components.gameboard.computer);
}

function displayShowcaseCard() {
    // poll the Gameboard object for a card in the select-property and displays it 1.5x its normal size
    let bigCard = Game.Components.gameboard.select;
    let c = Game.Screens.gameScreen.canvas;
    let gsx = Game.Screens.gameScreen.ctx;
    gsx.drawImage(bigCard.image, WIDTH / 2 - 0.75 * CARD_W, HEIGHT - 1.5 * CARD_H, 1.5 * CARD_W, 1.5 * CARD_H);
}

function emphasizeTrump() {
    // displays an oversize trumpcard for two secs
    let bigCard = Game.Components.deck.trump;
    let gsx = Game.Screens.gameScreen.ctx;
    let posX = 5;
    let posY = 5;
    gsx.drawImage(bigCard.image, posX, posY, 1.5 * CARD_W, 1.5 * CARD_H);
}

/**  
 * place a card around the center of the gameBoard
 * @param card object
 * @param playPosition --Position relative to the center of the gameboard
 * @returns: void
 */
function playCard(playPosition, card) {
    var c = Game.Screens.gameScreen.canvas;
    var x = Game.Screens.gameScreen.ctx;
    var xCenter = c.width / 2;
    var yCenter = c.height / 2;
    switch (playPosition) {
        case "left":
            x.drawImage(card.image, xCenter - 60, yCenter - 30);
            break;
        case "top":
            x.drawImage(card.image, xCenter - 40, yCenter - 50);
            break;
        case "right":
            x.drawImage(card.image, xCenter - 20, yCenter - 30);
            break;
        case "bottom":
            x.drawImage(card.image, xCenter - 40, yCenter - 10);
            break;
        default:
            x.drawImage(card.image, xCenter - 60, yCenter - 30);
    }
}


function rotateImage(img, x, y, angle) {
    Game.Screens.gameScreen.ctx.save();

    Game.Screens.gameScreen.ctx.translate(x, y);
    Game.Screens.gameScreen.ctx.rotate(angle * this.CONVERT_TO_RADIANS);

    Game.Screens.gameScreen.ctx.drawImage(img,
        -(img.width / 2),
        -(img.height / 2));

    Game.Screens.gameScreen.ctx.restore();
}


function selectCard(player) {
    let hand = player.hand;
    let card = hand[0];
    let image = card.image;
    let c = Game.Screens.gameScreen.canvas;
    let gsx = Game.Screens.gameScreen.ctx;
    // let cardImgs = gCardImageCacheObj['jh'];
    gsx.drawImage(image, 350, 300, 1.5 * CARD_W, 1.5 * CARD_H); //, 142, 192);
    // cardLayer.ctx.scale(2,2);
}

function enlargeCard(cardNo) {
    let hand = player.hand;
    let card = hand[cardNo];
    let image = card.image;
    let c = Game.Screens.gameScreen.canvas;
    let gsx = Game.Screens.gameScreen.ctx;
    // let cardImgs = gCardImageCacheObj['jh'];
    gsx.drawImage(image, 350, 300, 1.5 * CARD_W, 1.5 * CARD_H); //, 142, 192);
    // cardLayer.ctx.scale(2,2);
}

function mouseOver(e) {
    let canvasX = e.clientX - LEFTOFFSET;
    let canvasY = e.clientY - TOPOFFSET;
    let n = null; //  n --> cardNumber
    let p = canvasX - 160; //  p --> position
    if (canvasY > 350 && canvasY < 450) {
        switch (true) {
            case (p < 36):
                n = 0;
                break;
            case (p < 72):
                n = 1;
                break;
            case (p < 108):
                n = 2;
                break;
            case p < 144:
                n = 3;
                break;
            case p < 180:
                n = 4;
                break;
            case (p < 252):
                n = 5;
                break;
            default:
                n = 'Out of Range'; // change to zero from  null; 
        }
    }
    enlargeCard(n);
}


/**
 * 
 * @param {object} player object
 */
function displayPlayerHand(player) {
    return new Promise(function (resolve) {
        let c = Game.Screens.gameScreen.canvas;
        let x = Game.Screens.gameScreen.ctx;
        let xCenter = c.width / 2;
        let coordX = xCenter - (3 * CARD_W); // 350 - 3 * 72 = 134
        let coordY = 340;
        for (let i = 0; i < player.hand.length; i++) {
            //x.drawImage(player.hand[i].image, xCenter - (CARD_W*(6-i)/2), 340, CARD_W, CARD_H); // display cards on the game board        // playCard('left', player.hand[i]);
            x.drawImage(player.hand[i].image, coordX + i * CARD_W / 2, coordY, CARD_W, CARD_H);
        }
    });
}

/**
 * Displays the kickcard/trump in the top left corner of the gameboard
 * @param {*} trump -Card
 * @returns void 
 */
function displayTrump(trump) {
    let topCornerX = 5; // 5 pixels in
    let topCornerY = 5;
    let gbx = Game.Background.display.ctx;
    gbx.drawImage(trump.image, topCornerX, topCornerY); // upper left corner (x,y) => (5,5)
}

function acquireImage() {
    let x = Game.Screens.gameScreen.ctx;
    let imgData = x.getImageData(5, 5, CARD_W, CARD_H); // capture image from gameboard
    x.putImageData(imgData, 200, 200); // place captured image info elsewhere
    if (x.getImageData(200, 200, CARD_W, CARD_H)) {
        return console.log('Pass: image object exists.');
    } else {
        return console.log('Fail: image object does NOT exist!');
    }
}

function message() {
    document.getElementById("msg_layer").style.visibility = "visible";
    var m = Game.Screens.msgScreen.canvas;
    var c = Game.Screens.msgScreen.ctx;
    c.beginPath();
    c.lineWidth = 2;
    c.strokeStyle = "white";
    c.rect(170, 100, 400, 200);
    c.stroke();
    //c.globalAlpha=0.4;
    c.fillStyle = "rgba(0,0,0, 0.7)"; // black, transparent
    c.fillRect(170, 100, 400, 200);
    // c.globalAlpha=0.1;
    c.font = "20px Arial";
    c.fillStyle = "rgba(254,254,254,1.0)"; // white
    // let msgText = msgboard.text;
    c.fillText(Game.Components.msgboard.text, 200, 200);
    document.getElementById("msg_layer").addEventListener("click", clearMsgBoard);
    let pause = setTimeout(clearMsgBoard, 3000);
    // clearTimeout(pause);    //  garbage collection
}
 
function clearMsgBoard() { // garbage collection
    Game.Components.msgboard.init();
    document.getElementById("msg_layer").removeEventListener("click", clearMsgBoard);
    document.getElementById("msg_layer").style.visibility = "hidden";
}

function gameMenu() {
    // pass;
    // menuLayer.init();
}

function removeGameMenu() {
    document.getElementById('menu_layer').style.visibility = "hidden";
}

function cleanBoard() {
    var c = Game.Background.display.ctx;
    Game.Background.display.clear();
    // c.clearRect(170, 100, 400, 200);
}

/**
 * draws score on the gameboard
 * @param {object} a Team A's current score - int
 * @param {object} b Team B's current score - int
 * @returns void
 */
function displayScore(playerA, playerB) {
    var c = Game.Background.display.canvas;
    var x = Game.Background.display.ctx;
    var upperLeftCornerX = c.width - 265; //   (LxB: 260 x 120 box; x,y => 400,5)
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
    x.shadowOffsetX = 10;
    x.shadowOffsetY = 10;
    x.shadowColor = "black";
    x.fillStyle = "#ff0000"; // red
    x.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    // text
    x.fillStyle = "#ffffff"; // white
    x.font = "30px Arial";
    x.fillText(playerA.name, upperLeftCornerX + 15, 40);
    x.fillText(playerB.name, upperLeftCornerX + 15, 105);
    // score tiles (numbers)
    x.fillText(playerA.points, upperLeftCornerX + 215, 40);
    x.fillText(playerB.points, upperLeftCornerX + 215, 105);
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
function loadGameAssets() {
    return new Promise(function (resolve, reject) {
        Game.Components.deck.init()             // Promise: load all  card images into cache   and daisy chain all other tasks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            images into cache array
        .then(Game.Components.gameboard.init()) // game play cards cache for display

        //  load all graphical assets and screen objects/canvas layers, to cache
        .then(_initializeScreens())
    // init, draw, stop, clear, remove

    // initialize all game objects & components
    .then(Game.Controller.init()) // load/initialize user input
    //  from classes & constructor functions       
    // let gObjectsArr = _initializePlayers();
    //  load objects
    .then(Game.Screens.menuScreen.init())            // print welcome message
    .then(Game.Components.msgboard.init());

    //  sound components      
    // return gObjectsArr;
    resolve(`Assets loaded.`);
    reject(`Error: Assets were not all loaded.`);
    });
}
    

/*  INITIALIZE GRAPHICS OBJECTS */
function _initializeScreens() {
    let s = [];
/*     let s0 = Promise.resolve(Game.Background.init()); // screens[0] = gameBoard;
    let s1 = Promise.resolve(cardLayer.init()); // screens[1] = cardsLayer;
    let s2 = Promise.resolve(msgLayer.init());  // screens[2] = msgLayer;
    let s3 = Promise.resolve(menuLayer.init()); // screens[3] = menuLayer; */
    s[0] = Promise.resolve(Game.Background.display.init()); // screens[0] = gameBoard;
    s[1] = Promise.resolve(Game.Screens.gameScreen.init()); // screens[1] = cardsLayer;
    s[2] = Promise.resolve(Game.Screens.msgScreen.init());  // screens[2] = msgLayer;
    s[3] = Promise.resolve(Game.Screens.menuScreen.init()); // screens[3] = menuLayer;
    Promise.all([s[0], s[1], s[2], s[3]]).then((s) => {
        console.log("Screens initialized");
        return(s);
    });
    //  return screens;
    //  for (screen in screens) {
    //    screen.init();
    //  }
    // return s;
}

function loadScreenCache() {
    let screens = [];
    screens[0] = gameBoard;     // and scoreLayer 
    screens[1] = cardsLayer;
    screens[2] = msgLayer;
    screens[3] = menuLayer;
    return screens;             // screens array
}

//  update object boards & render (execute draw functions) object screens
/* 
function updateGameScreen() {
    displayScore(computer, human);
    if (Game.Components.deck.trump) {
        displayTrump(Game.Components.deck.trump);
    }
    displayLabels();
}
 */
function updateBackground() {
    Game.Background.isUpdated = true;
}


function displayBackground() {
    displayLabels();
    displayScore(Game.Player.computer, Game.Player.human);
    displayTrump(Game.Components.deck.getTrump());
}

function updateGameScreen() {
    Game.Components.gameboard.isUpdated = true;
}

function displayGameScreen() {
    if (Game.Components.gameboard.computer) {
        displayComputerCard();
    }
    if (Game.Components.gameboard.user) {
        displayUserCard();
    }
    if (Game.Player.human.hand) {
        displayPlayerHand(Game.Player.human);
        //selectCard(human);
    }
    if (Game.Components.gameboard.select) {
        displayShowcaseCard();
    }
}


    //  Game.Background.isUpdated = true;
    // emphasizeTrump();
    /*

    */

/* 
function updateMsgScreen() {
    if (msgboard.visible === true) { // if message object is true, then
        message(); // call the msg box function 
    }
}
 */
 function updateMsgScreen() {
     //     toggle visibility
     if (Game.Components.msgboard.visible === true) {
         // Game.msgboard.visible = false;
         message(); 
     } else {
         Game.Components.msgboard.visible = true;
     }
     Game.Components.msgboard.isUpdated = true;
 }

function _updateGame() {
    //  updateBackground();
    //  updateGameScreen();
    //  updateMsgScreen();
    //  updateMenuScreen();
}

/* function updateMenuScreen() { //  game pauses and menu comes up  when 'ESC' key is pressed.
    var c = menuLayer.ctx;
    c.font = "70px Arial";
    c.fillStyle = "rgba(254,254,254,1.0)"; // white, opaque
    let welcomeMsg = "Let's play";
    c.fillText(welcomeMsg, 200, 125);
    c.font = "100px Arial";
    let gamelogo = "ALL FOURS!";
    c.fillText(gamelogo, 75, 250);
    c.font = "50px Arial";
    let loading = "LOADING . . .";
    c.fillText(loading, 200, 415);
}
 */
function _drawGameScreen() {
    if (Game.Components.gameboard.isUpdated === true) {
        Game.Screens.gameScreen.clear();
        displayGameScreen();
        Game.Components.gameboard.isUpdated = false;
    }
}
function updateMsgboard() {
    Game.Components.msgboard. isUpdated = true;
}
function _drawMsgScreen() {
    if (Game.Components.msgboard.isUpdated === true) {
    Game.Screens.msgScreen.clear();
    message();
    // updateMsgScreen();
    }
}

function _drawMenuScreen() {
    Game.Screens.menuScreen.clear();
    displayMenuScreen();
    //  updateMenuScreen();
}

function _drawBackground() {
    if (Game.Background.isUpdated === true) {
        Game.Background.display.clear();
        displayBackground();
        Game.Background.isUpdated = false;
    }
}



function displayMenuScreen() {
    // Game.Screens.menuScreen.clear();
    let c = Game.Screens.menuScreen.ctx;
    c.font = "70px Arial";
    c.fillStyle = "rgba(254,254,254,1.0)"; // white, opaque
    let welcomeMsg = "Let's play";
    c.fillText(welcomeMsg, 200, 125);
    c.font = "100px Arial";
    let gamelogo = "ALL FOURS!";
    c.fillText(gamelogo, 75, 250);
    c.font = "50px Arial";
    let loading = "LOADING . . .";
    c.fillText(loading, 200, 415);
}

function _renderAllScreens() {
    _drawBackground();
    _drawGameScreen();
    _drawMsgScreen();
    _drawMenuScreen();
}
    // _drawBackground()
    // _drawGameScreen();      // displayscore();    displayTrump(); //     displayPlayerHand();    displayOtherHands();
    //_drawMsgScreen();        // displayMessage();
    // _drawMenuScreen();      



function _stopEngine() {
  Game.Engine.stop();
}

function _clearAllScreens() {
    for (var screen in screens) {
        screen.clear();
    }
}
/*
function firstJackDeal(player1, player2) {
    let player = player1;
    let i=0;
    while (deck[i].face != 'j' && i < Game.Components.deck.length) {
        if (player == player1) {        // toggle player1 & player2
            player = player2;
        } else {
            player = player2; 
        }
        i++;
    }
    return player;
}
*/

/********************************************************************************************************************************************************************************** */
//                                                                      THE MAIN GAME FUNCTION

/* All Fours Points */
const HIGH = 1;
const LOW = 1;
const JACK = 1;
const GAME = 1;
const HANG_JACK = 3;

/** 
 *   repeat game rounds until a player  quit() ==> ESC key (do - while loop)
 *   @param: null
 *   @return: void
 */
function mainGameLoop() {

    //  Load game assets (graphics into cache etc)
    //  Initialize game properties
    
    //  Play game

    //  Initialize game properties
    //  Play 14 pts Game --> multiple dealt rounds --> Players play cards
    //  Quit or replay

    // var gObjectsArr = 
    loadGameAssets() 
    .then(() => {
        setTimeout(() => { // remove menu screen when all game assets are loaded and game is ready to be played
            // Game.Screens.menuScreen.stop();
            Game.Screens.menuScreen.clear();
            removeGameMenu();
        }, 4000);
        console.log(Game.Player.human.hand);
    })             // passes an array of all game object 
    .then(gControllerListeners())             //  mouse, keyboard & touch  
    .then(Game.Engine.start())          //  gentlemen start your engines
    .then(() => {
        console.log("playGameRound");
        playGameRound(dealHandFcn());
    });
    //while (human.points <= 14 && computer.points <= 14) {


    console.log("END OF GAME!!!");
    //  Promises to control game flow

}


//------------------------------------------------------------------------------------------------------------------

/*  Distribute points   */
// rank_lowest_trump --> player += LOW
function whoPlayedLow() {
    //  pass;
    //  return Player;
}


//whoPlayedHigh.points += HIGH;

// jack of trump --> player += JACK
function whoPlayedJack() {
    //  pass;
    //  return Player;
}
//whoPlayedJack.points += JACK;

function postRoundFcn() {
    return null;
}





    //          GARBAGE COLLECTION
    // clear setTimeouts and setIntervals, remove Event Listeners etc.
    //          QUIT FUNCTION --> ESC or 'X' --> confirm exit window


//                                                                            THE END!
/**************************************************************************************************************************************************************************************************** */




// while (human.hand.length && computer.hand.length > 0)
// while (human.points || computer.points < 14)


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                               TODO: 
// }
// DISTRIBUTE POINTS: hi, low, jack, game, hangjack
//    }
/*
        // assessPoints()       // hi, low, jack, game 
    } 
        */

/*
Libs:
BackEnd:
    Engine (server side): wGameEngine -> engine for the web; mGameEngine -> for mobile (PWA)
                            gFXengine -> engine for rendering graphics
    AI Library
FrontEnd:
    Display Library
    Testing Library
    Sound Library
*/

/* 
          break up the "mainGameLoop" into separate modules (functions)
          and call each one separately, and sequentially... noting its
          completion on the console. 
*/

/*
              Create animation layer, 
              hang jack animation shows video clip of mute-rapper dis 
*/

/*  call the main program   */
mainGameLoop();
/********************************************************************************************** */
/*                 Copyright (c) 2018-2018 Roger A. Clarke. All Rights Reserved                 */
/********************************************************************************************** */
