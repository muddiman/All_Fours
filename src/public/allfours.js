// import { gameBoard } from "./lib/graphicslib";

// import { displayScoreboard } from "./lib/graphicslib";

// import { CANVAS_LAYER } from "./lib/graphicslib";

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
 *                                     c --> bug fixes
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
*/

/*  Programming Note:
    Assets Outstanding: Back of cards, background music, sound effects.
    Because the fisrt letter of every suit AND face of all cards are unique letters
    i can simplify the id of each card to a 'two-letter' string.
    ie: ace of heart is simply 'ah', ten of clubs is 'tc' and nine of diamonds is '9d'
    This simplifies coding tremendously. All filenames of card images were adjusted accordingly. ie: 2d.png is the 'two of diamonds' image file.
*/

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
const LOW_REFRESH_RATE = 2; // IN FPS (frames per second)
const FIVE_REFRESH_RATE = 5;
const TEN_REFRESH_RATE = 10;
const HIGH_REFRESH_RATE = 30; // in FPS (frames per second)
const FPS_2 = (1 / LOW_REFRESH_RATE) * 1000; // in milliseconds
const FPS_5 = (1 / FIVE_REFRESH_RATE) * 1000;
const FPS_30 = (1 / HIGH_REFRESH_RATE) * 1000;
const FPS_10 = (1 / TEN_REFRESH_RATE) * 1000;

/* Players */
const PLAYER1_NAME = "Computer";
const PLAYER2_NAME = "Roger";

/* Canvas top-left corner coords (in px) */
const LEFTOFFSET = 15;
const TOPOFFSET = 110;

/* Animation Constants */
const CONVERT_TO_RADIANS = Math.PI / 180;




//------------------------------------------------------------------------------------------------------------------
/*  THE CLASSES/OBJECT CONSTRUCTORS  */



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

// var gAssetCacheArr = [];    OR as an object:    var gAssetCacheObj = {};
/* Card Class/Object Constructor */
function Card(rank, face, suit) {               // Card object constructor (TODO: Change to a Class)
    this.suit = suit; // ['c', 'd', 'h', 's'],  MAX_SUITS=4
    this.face = face; // ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'],     MAX_FACES=13
    this.rank = rank; // [0, 1,.. 12], to assist in determining who played the higher card
    this.getCardName = function () {
        return this.face + this.suit; // string of two letters uniquely identifying the card (like a 'key')    MAX_CHARACTERS=2
    };
    this.init = () => {
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
                console.log(`${this.getCardName()} image loaded into cache object.`);
               }
            };
        }
    };
}


/**
 *     Player object constructor (or class)
 *     
 */
/* Player Class/Object Constructor */
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


//-------------------------------------------------------------------------------------------------------------------------
/*          THE OBJECTS             */


//  obtain objects from .JSON files or external class files

/*  Image Cache  */
// card images
var gCardImageCacheObj = {}; // object of cached card images

/* game board object */
// import gameBoard from '/lib/graphicslib.js';         INCL. score board, trump...

var gameBoard = {
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

// var cardLayer   = new gCanvasLayer("card_layer", WIDTH, HEIGHT, TRANSPARENT, _drawCardScreen, FPS_30, 1, 255, 255, 255);
/* Card layer object */

var cardLayer = {                                                               //  Object: cardLayer --> TODO: turn into a "class"
    canvas: document.createElement("canvas"),
    init: function () {
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.canvas.id = "card_layer";
        this.ctx = this.canvas.getContext("2d");
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById("card_layer").style = "position: absolute; left: " + LEFTOFFSET + "px; top:  " + TOPOFFSET + "px; z-index: 1; background-color: rgba(255, 255, 255," + TRANSPARENT + ");";
        this.refresh = setInterval(_drawCardScreen, FPS_30);
    },
    clear: function () {                                                        // wipes the entire card screen clean
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {                                                         // if 'setInterval is used, there should be stop function
        clearInterval(this.refresh);
    },
    // this.frameNo =0;
};


/* Message layer object */
//var msgLayer  = new gCanvasLayer("msg_layer",   WIDTH, HEIGHT, TRANSPARENT, _drawMsgScreen,  FPS_2,  2, 255, 255, 255);

var msgLayer = { //  Object: msgLayer --> TODO: turn into a "class"
    canvas: document.createElement("canvas"),
    init: function () {
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.canvas.id = "msg_layer";
        this.ctx = this.canvas.getContext("2d");
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById("msg_layer").style = "position: absolute; left: " + LEFTOFFSET + "px; top: " + TOPOFFSET + "px; z-index: 2; background-color: rgba(255, 255, 255," + TRANSPARENT + ");";
        this.refresh = setInterval(_drawMsgScreen, FPS_2);
    },
    clear: function () { // wipes the entire gameBoard clean
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () { // if 'setInterval is used, there should be stop function
        clearInterval(this.refresh);
    },
    // this.frameNo =0;
};

/* Menu layer object */

/* Canvas Layer Objects */
//                     new gCanvasLayer(ID,            _WIDTH,_HEIGHT,OPACITY,      _drawScreenFcn,  period, Z, red, green, blue)
//  var gameBoard    = new gCanvasLayer("game_board",  WIDTH, HEIGHT, OPAQUE,       _drawScreenFcn,          0,              );
//  var cardsLayer   = new gCanvasLayer("cards_layer", WIDTH, HEIGHT, TRANSPARENT,  _drawScreenFcn,          1,              );
//  var msgLayer     = new gCanvasLayer("msg_layer",   WIDTH, HEIGHT, TRANSPARENT,  _drawMsgScreen,  FPS_2,  2, 255, 255, 255);
    var menuLayer    = new gCanvasLayer("menu_layer",  WIDTH, HEIGHT, OPAQUE,       _drawMenuScreen, FPS_30, 3,    0,  0,   0);

/*  Image Cache  */
// card images
// var gCardImageCacheObj = {};

/* Deck of cards objects   */
var deck = {
    // deck object: deck.init(), deck.shuffle(), deck.cut(), deck.deal()    
    cards: [],
    trump: null,
    init: function () {
        /** creates deck (array of all 52 cards)
         *  @param: null
         *  @returns: deck
         */
        // var SUITS = ['c', 'd', 'h', 's'];
        // var FACES = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'];
        var n = 0;
        for (y = 0; y < SUITS.length; y++) {
            var rank = 1;
            for (x = 0; x < FACES.length; x++) {
                this.cards[n] = new Card(rank, FACES[x], SUITS[y]);
                this.cards[n].init(); //  get card images from image files or image cache object
                n++;
                rank++;
            }
        }
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
    deal: function (human, computer) {
        /** randomly mixes up the cards in the deck
         *  @param: human, computer (players' hand --array-of-cards )
         *  @returns: randomized deck
         */
        var n = 0;
        while (human.hand.length < 6) {
            human.hand[n] = this.cards.shift();
            computer.hand[n] = this.cards.shift();
            n++;
        }
        this.trump = this.cards.shift();
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
    }
};

//  Load JSON file from file system
// var fs = require('fs');


//  message board object
var msgboard = {
    visible: false,
    text: null,
    init: function () {
        this.visible = false;
        this.text = null;
    }
};

var cardToBoard = {         // gPlay display object
    user: null,
    computer: null,
    select: null,
    init: function () {
        this.user = null;
        this.computer = null;
        this.select = null;
    },
    listenForSelectCard: (callback) => {
        this.listeningForSelectCard = setInterval(callback, FPS_2);
    },
    listenForUserCard: (callback) => {
        this.listen = setInterval(callback, FPS_2);
    },
    stopListening: () => {
            clearInterval(this.listen);
            clearInterval(this.listeningForSelectCard);
    },
};

/**
 *  Manages ALL user input (mouse, touch and keyboard) as an Object
 */

var inputMgr = {
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
        this.refresh = setInterval(inputUpdate, FPS_5); //      FPS_2
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
    let action = inputMgr.bindings[code];
    if (action) {
        inputMgr.actions[action] = true;
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
    document.getElementById("card_layer").addEventListener("mouseup", onMouseUp, true);   
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
    if (inputMgr.keyState[KEY_RA]) {
        cardToBoard.select = hand[i];
    }
    if (inputMgr.keyState[KEY_LA]) {
        cardToBoard.select = hand[-i];
    }
}

function enterConfirm() {

}

function onMouseDown(event) {
    let locX = event.clientX - LEFTOFFSET;
    let locY = event.clientY - TOPOFFSET;
    console.log("Click location: (", locX, ", ", locY, ")");
    inputMgr.clickPosition[1] = locX;
    inputMgr.clickPosition[2] = locY;
}

function onMouseUp(event) {
    for (action in inputMgr.actions) {
        if (inputMgr.actions[action] == true) {
            inputMgr.actions[action] = false;
        }
    }
    // window.addEventListener('keydown', onKeyDown);
}

function clickEventHandler() {
    let myHand = human.hand;
    let handPosX = 134;
    let handPosY = 340;
    let locX = inputMgr.clickPosition[1];
    // console.log("X --> ", locX);
    let locY = inputMgr.clickPosition[2];
    // console.log("Y --> ", locY);
    if (locY > handPosY && locY < handPosY + CARD_H) {
        for (let i = 1; i <= myHand.length; i++) {
            if (locX > handPosX + (i - 1) * CARD_W / 2 && locX < handPosX + i * CARD_W / 2) {
                // play(i);
                // cardToBoard.user = myHand[i - 1];
                // play(i - 1);
                let key = i.toString();
                // console.log(key);
                let action = inputMgr.bindings[key];
                if (inputMgr.actions[action] === false) {
                    inputMgr.actions[action] = true;
                }
                break;
            }
            if (i == myHand.length && locX > handPosX + (i - 1) * CARD_W / 2 && locX < handPosX + i * CARD_W / 2 + CARD_W / 2) {
                let key = i.toString();
                let action = inputMgr.bindings[key];
                if (inputMgr.actions[action] === false) {
                    inputMgr.actions[action] = true;
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
    let action = inputMgr.bindings[key];
    if (inputMgr.actions[action] === false) {
        inputMgr.actions[action] = true;
    }
}

function onKeyUp(event) {
    let key = event.key;
    let action = inputMgr.bindings[key];
    inputMgr.actions[action] = false;
    window.addEventListener('keydown', onKeyDown); // keyboard
}

function toggleMenuScreen() {
    //  probe all game keys
    if (inputMgr.actions['showMenuScreen']) { // toggle menu screen
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

    if (inputMgr.actions['playCard_1']) {      // queries the key's state, and calls the corresponding function
        if (cardToBoard.user === null) {
            cardToBoard.user = human.hand[0];
            human.hand.splice(0, 1);
        }
    }
    if (inputMgr.actions['playCard_2']) {
        if (cardToBoard.user === null) {
            cardToBoard.user = human.hand[1];
            human.hand.splice(1, 1);
        }
    }
    if (inputMgr.actions['playCard_3']) {
        if (cardToBoard.user === null) {
            cardToBoard.user = human.hand[2];       // 
            human.hand.splice(2, 1);
        }
    }
    if (inputMgr.actions['playCard_4']) {
        if (cardToBoard.user === null) {
            cardToBoard.user = human.hand[3];       // 
            human.hand.splice(3, 1);
        }
    }
    if (inputMgr.actions['playCard_5']) {
        if (cardToBoard.user === null) {
            cardToBoard.user = human.hand[4];       //
            human.hand.splice(4, 1);

        }
    }
    if (inputMgr.actions['playCard_6']) {
        if (cardToBoard.user === null) {
            cardToBoard.user = human.hand[5];       // 
            human.hand.splice(5, 1);
        }
    }
    if (inputMgr.actions['selectNext']) {
        if (cardToBoard.select) {
            for (i=0; i < human.hand.length; i++) {
                if (i < human.hand.length - 1) {
                    if (cardToBoard.select === human.hand[i]) {
                        cardToBoard.select = human.hand[i+1];
                        console.log(i);
                        break;
                    }
                } else {
                    cardToBoard.select = null;
                }
            }
        } else {
                cardToBoard.select = human.hand[0];
        }  
    }

    if (inputMgr.actions['selectPrevious']) {
        if (cardToBoard.select) {
            for (i=human.hand.length; i >=0; i--) {
                if (i > 0) {
                    if (cardToBoard.select === human.hand[i]) {
                            cardToBoard.select = human.hand[i-1];
                            console.log(i);
                            break;
                    }
                } else {
                    cardToBoard.select = null;
                }
            }  
        } else {
            cardToBoard.select = human.hand[-1];
        }
    }

    if (inputMgr.actions['confirmSelection']) {
        if (!cardToBoard.user) {
            // cardToBoard.user = cardToBoard.select;
            for (i=0; i<human.hand.length; i++) {
                if (cardToBoard.select === human.hand[i]) {
                    cardToBoard.user = human.hand[i];
                    human.hand.splice(i,1);
                    cardToBoard.select = null;
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
    console.log(`User: ${cardToBoard.user.getCardName()}`);
    console.log(`Computer: ${cardToBoard.computer.getCardName()}`);
}

function firstJackDeal() {
    let flipACoin = Math.floor(Math.random() * 2); // temporaily use coin flip to simulate firtsJackDeal between two players
    if (flipACoin == 0) {
        return computer;
    } else {                // flipACoin == 1
        return human;
    }
}

async function dealHandFcn(dealer) {
   // let dealer = null;
    /*  Deal Cards  */
    //assign dealer -->      TODO: animation
    if (!dealer) {              // then firstJackDeal();
        dealer = firstJackDeal();
    } else if (dealer == human) {               // switch dealer
        dealer = computer;
        //playFirst = human;
    } else {
        dealer = human;
    }
    // deal
    // if (computer.hand.length == 0 && human.hand.length == 0) {
        console.log(`${dealer.name} deals.`);
        deck.init();
        deck.shuffle();
        deck.deal(human, computer);
        dealer.points += kickPoints(deck.trump);
        console.log(`${dealer.name} gets ${kickPoints(deck.trump)} points.`);
        if (dealer === human) {             // assign who plays first as a result of dealing
            whoPlaysFirst = computer;
        } else {
            whoPlaysFirst = human;
        }
   // }
    return whoPlaysFirst;
}

function allocatePoints() {
    // game
    if (countForGame(computer) > countForGame(human)) {
        computer.points += GAME;
    } else {
        human.points += GAME;
    }
    // high
    let playedHigh = whoPlayedHigh();
    playedHigh.points += HIGH;
    // low
    // jack
    if (didPlayerPlayedJack(computer) == true) {
        computer.points += JACK;
    } 
    if (didPlayerPlayedJack(human) == true) {
        human.points += JACK;
    }
    // continue game if there is no winner as yet
    if (computer.points < 14 && human.points < 14) {
        playGameRound();
    }
}


function didUserPlayCard() {
    let listen = setInterval(inputUpdate(), 250);
    for (var action in inputMgr.actions) {
        if (inputMgr.actions[action] === true) {
            // inputMgr.stop();
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
        await cardToBoard.init();
        await gWaitState(4);                                                         // initialize/clear game play... (just as a precaution)
        if (whoPlaysFirst === computer) {
            console.log(`${whoPlaysFirst.name} plays first!`);
            computerPlay(computerAI());                                             // if human deal, computer plays first 
            await cardToBoard.listenForUserCard(async () => {
                if (cardToBoard.user) {
                    cardToBoard.stopListening();
                    winner = determineWinner(cardToBoard.computer, cardToBoard.user);
                    whoPlaysFirst = winner;
                    postPlay(winner);
                }
            });
        } else {                                        //  else human plays first
            console.log(`${whoPlaysFirst.name} plays first!`);
            await cardToBoard.listenForUserCard(async() => {
                if (cardToBoard.user) {
                    cardToBoard.stopListening();
                    computerPlay(computerAI());
                    winner = determineWinner(cardToBoard.user, cardToBoard.computer);
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
    msgboard.text =  `${winner.name} won!`;                         // announce winner
    msgboard.visible = true;
    await gWaitState(time);
    console.log(`Wait ${time} seconds.`);
    winner.lift += cardToBoard.computer;
    winner.lift += cardToBoard.human;
    msgboard.text = `${winner.name} will play first.`;
    msgboard.visible = true;
    await gWaitState(time);
    console.log(`Wait ${time} seconds.`);
    // await cardToBoard.init();
    if (human.hand.length === computer.hand.length) {        //  while card in hand hasn't finish, keep playing
        if (computer.hand.length > 0) {
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
        if (player.lift[eachCard].suit == deck.trump.suit) {
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
        let hand = human.hand;
        let cardChoice = cardToBoard.user;
        let i = hand.indexOf(cardChoice);
        let cardName = cardChoice.getCardName(); // not needed - delete after debugging
        console.log(cardName);
        human.hand.splice(i, 1);
        if (cardChoice === null) {
            reject("Did not get user input");
        } else {
            resolve(cardChoice);
        }
    });
}

function computerAI() {
    // play a random card
    let compHand = computer.hand;
    let i = Math.floor(Math.random() * compHand.length);
    console.log("Computer chooses " + i + "th card.");
    return i;
}

/**
 * 
 * @param {*} i integer [0 .. length of computer's hand]
 */
function computerPlay(i) {                          // run the 'thinking animation'
    cardToBoard.computer = computer.hand[i];
    let card = computer.hand[i];
    let cardName = card.getCardName();
    console.log(cardName);
    computer.hand.splice(i, 1);
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
    } else if (played.suit === deck.trump.suit) {
        win = played;
    } else {
        win = called;
    }
    if (win === cardToBoard.user) {
        return human;
    } else {
        return computer;
    }
}

//  Points associated with KickCard
function kickPoints(card) {
    switch (card.face) {
        case 'a':
            msgboard.text = "Kick Ace! Dealer gets 1 pt.";
            msgboard.visible = true;
            return 1;
        case '6':
            msgboard.text = "Kick Six!! Dealer gets 2 pts.";
            msgboard.visible = true;
            return 2;
        case 'j':
            msgboard.text = "Kick Jack!!! Dealer gets 3 pts.";
            msgboard.visible = true;
            return 3;
        default:
            msgboard.text = "Kicks nothing!! Wham? like yuh toe buss?";
            msgboard.visible = true;
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
        if (eachCard.suit === deck.trump.suit && highestHumanTrumpCard.rank < eachCard.rank) {
            highestTrumpCard = eachCard;
        }
    }
    for (var eachAndEveryCard in computer.lift) {
        if (eachAndEveryCard.suit === deck.trump.suit && highestComputerTrumpCard < eachAndEveryCard.rank) {
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
    if (playedCard.suit === deck.trump.suit && calledCard.suit === deck.trump.suit) {
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

//  labels on game objects on the game board                                                          
function displayLabels() {
    // let c=gameBoard.canvas;
    let x = gameBoard.ctx;
    x.font = "15px Arial";
    x.fillStyle = "rgba(254,254,254,1.0)"; // white, opaque
    let labelUserCards = "1     2       3       4       5       6";
    x.fillText("TRUMP", 15, 30 + CARD_H); // user keyboard play labels
    x.fillText(labelUserCards, 134 + CARD_W / 4, HEIGHT - 2); // trump label
}


function displayUserCard() {
    playCard('bottom', cardToBoard.user);
}

function displayComputerCard() {
    playCard('top', cardToBoard.computer);
}

function displayShowcaseCard() {
    // poll the cardToBoard object for a card in the select-property and displays it 1.5x its normal size
    let bigCard = cardToBoard.select;
    let c = cardLayer.canvas;
    let x = cardLayer.ctx;
    x.drawImage(bigCard.image, WIDTH / 2 - 0.75 * CARD_W, HEIGHT - 1.5 * CARD_H, 1.5 * CARD_W, 1.5 * CARD_H);
}

function emphasizeTrump() {
    // displays an oversize trumpcard for two secs
    let bigCard = deck.trump;
    let x = cardLayer.ctx;
    let posX = 5;
    let posY = 5;
    x.drawImage(bigCard.image, posX, posY, 1.5 * CARD_W, 1.5 * CARD_H);
}

/**  
 * place a card around the center of the gameBoard
 * @param card object
 * @param playPosition --Position relative to the center of the gameboard
 * @returns: void
 */
function playCard(playPosition, card) {
    var c = cardLayer.canvas;
    var x = cardLayer.ctx;
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
    cardLayer.ctx.save();

    cardLayer.ctx.translate(x, y);
    cardLayer.ctx.rotate(angle * this.CONVERT_TO_RADIANS);

    cardLayer.ctx.drawImage(img,
        -(img.width / 2),
        -(img.height / 2));

    cardLayer.ctx.restore();
}


function selectCard(player) {
    let hand = player.hand;
    let card = hand[0];
    let image = card.image;
    let c = cardLayer.canvas;
    let x = cardLayer.ctx;
    // let cardImgs = gCardImageCacheObj['jh'];
    x.drawImage(image, 350, 300, 1.5 * CARD_W, 1.5 * CARD_H); //, 142, 192);
    // cardLayer.ctx.scale(2,2);
}

function enlargeCard(cardNo) {
    let hand = player.hand;
    let card = hand[cardNo];
    let image = card.image;
    let c = cardLayer.canvas;
    let x = cardLayer.ctx;
    // let cardImgs = gCardImageCacheObj['jh'];
    x.drawImage(image, 350, 300, 1.5 * CARD_W, 1.5 * CARD_H); //, 142, 192);
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
 * @param {*} player object
 */
function displayPlayerHand(player) {
    return new Promise(function (resolve) {
        let c = cardLayer.canvas;
        let x = cardLayer.ctx;
        let xCenter = c.width / 2;
        let coordX = xCenter - (3 * CARD_W); // 350 - 3 * 72 = 134
        let coordY = 340;
        for (i = 0; i < player.hand.length; i++) {
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
    let x = gameBoard.ctx;
    x.drawImage(trump.image, topCornerX, topCornerY); // upper left corner (x,y) => (5,5)
}

function acquireImage() {
    let x = gameBoard.ctx;
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
    var m = msgLayer.canvas;
    var c = msgLayer.ctx;
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
    c.fillText(msgboard.text, 200, 200);
    document.getElementById("msg_layer").addEventListener("click", clearMsgBoard);
    let pause = setTimeout(clearMsgBoard, 3000);
    // clearTimeout(pause);    //  garbage collection
}
 
function clearMsgBoard() { // garbage collection
    msgboard.init();
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
    var c = gameBoard.ctx;
    gameBoard.clearBoard();
    // c.clearRect(170, 100, 400, 200);
}

/**
 * draws score on the gameboard
 * @param {*} a Team A's current score - int
 * @param {*} b Team B's current score - int
 * @returns void
 */
function displayScore(playerA, playerB) {
    var c = gameBoard.canvas;
    var x = gameBoard.ctx;
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
const computer = new Player(); // --> Team A
const human = new Player(); // --> Team B

/*  initialize players   */
function _initializePlayers() {
    computer.init();
    human.init();
    computer.name = PLAYER1_NAME;
    human.name = PLAYER2_NAME;
    var playerArr = [computer, human];
    return playerArr; // an array of ALL game players
}

/**
 *  to make sure all the games assets are fully loaded before the game runs
 *  this will be handled by game-loader.js in the final version
 */
function loadGameAssets() {
    //  load all graphical screen objects/canvas layers
    _initializeScreens();
    // init, draw, stop, clear, remove
    menuLayer.init(); // print welcome message
    setTimeout(() => { // remove menu screen when all game assets are loaded and game is ready to be played
        menuLayer.stop();
        menuLayer.clear();
        removeGameMenu();
    }, 4000);
    // initialize all game objects
    inputMgr.init(); // load/initialize user input
    //  from classes & constructor functions
    let gObjectsArr = _initializePlayers();
    //  load objects
    msgboard.init();
    deck.init(); // load all  card images into cache                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               images into cache array
    cardToBoard.init(); // game play cards cache for display
    //  sound components      
    return gObjectsArr;
}

/*  INITIALIZE GRAPHICS OBJECTS */
function _initializeScreens() {
    let s0 = Promise.resolve(gameBoard.init()); // screens[0] = gameBoard;
    let s1 = Promise.resolve(cardLayer.init()); // screens[1] = cardsLayer;
    let s2 = Promise.resolve(msgLayer.init());  // screens[2] = msgLayer;
    let s3 = Promise.resolve(menuLayer.init()); // screens[3] = menuLayer;
    // Promise.all(s0, s1, s2, s3).then(() => resolve(console.log("all screens initialized")));
    //  return screens;
    //  for (screen in screens) {
    //    screen.init();
    //  }
}

function loadScreenCache() {
    let screens = [];
    screens[0] = gameBoard;     // and scoreLayer 
    screens[1] = cardsLayer;
    screens[2] = msgLayer;
    screens[3] = menuLayer;
    return screens;             // screens array
}

function updateGameScreen() {
    displayScore(computer, human);
    if (deck.trump) {
        displayTrump(deck.trump);
    }
    displayLabels();
}

function updateCardScreen() {
    if (cardToBoard.computer) {
        displayComputerCard();
    }
    if (cardToBoard.user) {
        displayUserCard();
    }
    if (human.hand) {
        displayPlayerHand(human);
        //selectCard(human);
    }
    if (cardToBoard.select) {
        displayShowcaseCard();
    }
    // emphasizeTrump();
    /*

    */
}

function updateMsgScreen() {
    if (msgboard.visible === true) { // if message object is true, then
        message(); // call the msg box function 
    }
}

function updateMenuScreen() { //  game pauses and menu comes up  when 'ESC' key is pressed.
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

function _drawCardScreen() {
    cardLayer.clear();
    updateCardScreen();
}

function _drawMsgScreen() {
    msgLayer.clear();
    updateMsgScreen();
}

function _drawGameBoard() {
    gameBoard.clear();
    updateGameScreen();
}


function _drawMenuScreen() {
    menuLayer.clear();
    updateMenuScreen();
}

function _renderAllScreens() {
    for (var screen in screens) {
        screen.refresh;
    }
    // _drawGameScreen();      // displayscore();    displayTrump(); //     displayPlayerHand();    displayOtherHands();
    //_drawMsgScreen();        // displayMessage();
    // _drawScoreScreen();      // displayscore();
    // _drawGameBoard();
}


function _stopAllScreens() {
    for (var screen in screens) {
        screen.stop();
    }
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
    while (deck[i].face != 'j' && i < deck.length) {
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
async function mainGameLoop() {
    // var gObjectsArr = loadGameAssets();              // passes an array of all game object 
    // if (document.getElementById('card_layer')) {console.log('Card Screen exists.');} else {console.log('No card screen found!');}
    /*  document.getElementById('card_layer').addEventListener('keydown', (event) => {
        let x = event.keyID;
        console.log("Key ID: ", x);
    });           // onKeyDown(event)       
    */

    gControllerListeners();

    // initializeInputControllers();

    // show menu screen
    // load all image and sound files to cache
    // load all graphics elements
    // _initializeScreens();
    // load .JSON files: - objects & settings
    // loadScripts & modules
    // manipulate settings - save to .JSON files, cookies

    /*  mainGameLoop:        
         Deal subroutine: shuffle, cut, distribute
         gameLoop:
            Deal
            playedRoundLoop: 
                players play cards: 
                determineWinner()
            countForGame()
    //      assessPoints(): high, low, jack, game, hangJack
    */

    // read game settings from .JSON FILE
    // In-game globals
    //do until human.points || computer.points >= 14

    /*  Dealing subroutines    */
    /*
        deck.shuffle();
        deck.deal(human, computer);
        dealer.points += kickPoints(deck.trump);
        console.log("Dealer Points: ", + dealer.points);

        
            // who plays first
        var winner;
        if (dealer == computer) {
            playFirst = human;
        } else {
            playFirst = computer;
        }

     */
    /*  Actual Game Engine  */



    //while (human.points <= 14 && computer.points <= 14) {
        console.log("playGameRound");
        await playGameRound(dealHandFcn());
    // }

    /*
    var playedCard; // add playedBy attribute
    var calledCard; // add playedBy attribute
    //Round Play Loop:      --> Loop until player.hand.length == 0
    for (var i = human.hand.length; i > 1; i--) {
        if (winner == computer || playFirst == computer) { // if winner = computer, then computer plays first and vice-versa
            calledCard = computerPlay(computer, null);
            msgboard.text = human.name + "'s turn. Please play a card.";
            msgboard.visible = true;
            //setTimeout(() => {
            humanPlay()
            .then((card) => {
                playedCard = card;
                // document.getElementById('card_layer').removeEventListener('click', mouseEventHandler(event));
                let higherCard = determineWinner(calledCard, playedCard);
                if (higherCard == calledCard) {
                    winner = computer;
                } else {
                    winner = human;
                }
                let winnerName = winner.name;
                console.log(winnerName, +' Wins!'); // add msg box
                msgboard.text = winnerName + " Won!!! " + winnerName + " plays first.";
                msgboard.visible = true;
                winner.lift.push(calledCard, playedCard);
                let delayTwoSec = setTimeout(function () {
                    cardToBoard.init();
                }, 4000);
                console.log('END OF ROUND!!!');
                //clearTimeout(delayTwoSec);
            })
            .catch(err => console.log(err))
        //}, 4000);
    } else { // if winner = human, then human plays first
        msgboard.text = human.name + " play first. Please select a card.";
        msgboard.visible = true;
        //setTimeout(() => {
        humanPlay()
        .then((resolvedCard) => {
                calledCard = resolvedCard;
                // document.getElementById('card_layer').removeEventListener('click', mouseEventHandler(event));
                playedCard = computerPlay(computer, calledCard);
                let winningCard = determineWinner(calledCard, playedCard);
                if (winningCard == playedCard) {
      
                    winner = computer;
                } else {
                    winner = human;
                }
                let winnerName = winner.name;
                console.log(winnerName, +' Wins!');
                msgboard.text = winnerName + " Won!!!";
                msgboard.visible = true;
                winner.lift.push(calledCard, playedCard);
                setTimeout(function () {
                    cardToBoard.init();
                }, 2000);
                console.log('END OF ROUND!!!');
            })
            .catch(err => console.log(err));
            //}, 4000);                 
        }
    }
*/
    /*
                //  Count for game
                var hGamePoints = countForGame(human);
                var cGamePoints = countForGame(computer);
                // logic to determine assignment of game points
                if (hGamePoints == cGamePoints) {
                    dealer.points += GAME;
                } else if (hGamePoints > cGamePoints) {
                    human.points += GAME;
                } else {
                    computer.points += GAME;
                }
     */


    //          GARBAGE COLLECTION
    // clear setTimeouts and setIntervals, remove Event Listeners etc.
    //          QUIT FUNCTION --> ESC or 'X' --> confirm exit window
    console.log("END OF GAME!!!");
}

//                                                                            THE END!
/**************************************************************************************************************************************************************************************************** */

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