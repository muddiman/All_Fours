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
const WIDTH = 700; //use window.innerWidth;  for fullscreen gaming
const HEIGHT = 450; //use window.innerHeight; for fullscreen gaming
const CARD_W = 72; // card width
const CARD_H = 96; // card height

/* Clear/Opaque */
const TRANSPARENT = 0;
const OPAQUE = 1.0;
const LOW_REFRESH_RATE = 2; // IN FPS (frames per second)
const HIGH_REFRESH_RATE = 30; // in FPS (frames per second)
const PERIOD_L = (1 / LOW_REFRESH_RATE) * 1000; // in milliseconds
const PERIOD_H = (1 / HIGH_REFRESH_RATE) * 1000;
const PLAYER1_NAME = "Computer";
const PLAYER2_NAME = "Roger";
const LEFTOFFSET = 15;
const TOPOFFSET = 110;
const CONVERT_TO_RADIANS = Math.PI / 180;

//------------------------------------------------------------------------------------------------------------------
/*  THE CLASSES/OBJECT CONSTRUCTORS  */

/*
//  
    function Layer(ID, WIDTH, HEIGHT, OPACITY, drawScreenFcn, period) {
        canvas = document.createElement("canvas");
        this.init = function () {         
            this.canvas.id = ID;
            this.canvas.width = WIDTH;
            this.canvas.height = HEIGHT;
            this.ctx = this.canvas.getContext('2d');
            Document.getElementById("game_container").appendChild(this.canvas);
            document.getElementById(ID).style="position: absolute; left: " + LEFTOFFSET +"px; top: "+ TOPOFFSET +"px; z-index: 1; background-color: rgba(255, 255, 255," + OPACITY + ");";
            console.log("New " + this.canvas.id + " canvas initialized.");
            this.refresh = setInterval(drawScreenFcn(), period);  
        };
        this.clear = function () {  
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
        this.stop = function () {
            clearInterval(this.refresh);
        }
    }
*/

// var gAssetCache = [];    OR as an object:    var gAssetCache = {};

/* Card Class/Object Constructor */
function Card(rank, face, suit) {
    // Card object constructor (game components are usually created writing a constructor for each type of component)
    this.suit = suit; // ['c', 'd', 'h', 's'],  MAX_SUITS=4
    this.face = face; // ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'],     MAX_FACES=13
    this.rank = rank; // [0, 1,.. 12], to assist in determining who played the higher card
    this.getCardName = function () {
        return this.face + this.suit; // used as cardId, image filename, etc    MAX_CHARACTERS=2
    };
    //this.image =            new Image();
    this.init = () => {
        if (gCardCache[this.getCardName]) {
            this.image = gCardCache[this.getCardName];
            console.log('Using cached version of image.');
        } else {
            this.image = new Image();
            this.image.id = this.getCardName();
            this.image.src = "img/" + this.getCardName() + ".png";
            this.image.onload = () => {
                gCardCache[this.getCardName] = this.image;
                console.log(this.getCardName() + ' loaded into cache.');
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
        this.hand = []; // MAX_CARDS_IN_HAND=12;
        this.points = 0; // MAX_POINTS=14;
        this.lift = []; // MAX_CARDS_IN_LIFT=48;
        this.name = ""; // MAX_CHARACTERS=12;
    };
    //this.player1 = playerA;
    //this.player2 = playerB;
    //this.team = "";
    //this.setPlayerName = function (name) {this.name = name;}
    //this.setPlayerTeam = function (team) {this.team = team;}
    //this.setTeamName = function (name) {this.teamName = name;}
    //this.setTeamPlayers = function (player1, player2) {this.teamPlayers = [player1, player2];}
}


//-------------------------------------------------------------------------------------------------------------------------
/*          THE OBJECTS             */

var gCardCache = {}; // object that cache card images

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
        this.refresh = setInterval(_drawGameBoard, PERIOD_L);
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

/* Card layer object */
var cardLayer = { //  Object: cardLayer --> TODO: turn into a "class"
    canvas: document.createElement("canvas"),
    init: function () {
        // initialize gameBoard by applying context & inserting the canvas in the "game_container" <div> 
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.canvas.id = "card_layer";
        this.ctx = this.canvas.getContext("2d");
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById("card_layer").style = "position: absolute; left: " + LEFTOFFSET + "px; top:  " + TOPOFFSET + "px; z-index: 1; background-color: rgba(255, 255, 255," + TRANSPARENT + ");";
        // this.canvas.style="background-color: rgba(255, 255, 255," + OPAQUE + ");";     // in rgba format
        this.refresh = setInterval(_drawCardScreen, PERIOD_H);
    },
    clear: function () { // wipes the entire card screen clean
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () { // if 'setInterval is used, there should be stop function
        clearInterval(this.refresh);
    },
    // this.frameNo =0;
};

/* Message layer object */
var msgLayer = { //  Object: msgLayer --> TODO: turn into a "class"
    canvas: document.createElement("canvas"),
    init: function () {
        // initialize gameBoard by applying context & inserting the canvas in the "game_container" <div> 
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.canvas.id = "msg_layer";
        this.ctx = this.canvas.getContext("2d");
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById("msg_layer").style = "position: absolute; left: " + LEFTOFFSET + "px; top: " + TOPOFFSET + "px; z-index: 2; background-color: rgba(255, 255, 255," + TRANSPARENT + ");";
        // this.canvas.style="background-color: rgba(255, 255, 255," + OPAQUE + ");";     // in rgba format
        this.refresh = setInterval(_drawMsgScreen, PERIOD_H);
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
var menuLayer = { //  Object: menuLayer --> TODO: turn into a "class"
    canvas: document.createElement("canvas"),
    init: function () {
        // initialize menu layer by applying context & inserting the canvas in the "game_container" <div> 
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.canvas.id = "menu_layer";
        this.ctx = this.canvas.getContext("2d");
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById("menu_layer").style = "position: absolute; left: " + LEFTOFFSET + "px; top: " + TOPOFFSET + "px; z-index: 3; background-color: rgba(0, 0, 0," + OPAQUE + "); border: 5px solid black;";
        this.refresh = setInterval(_drawMenuScreen, PERIOD_H);
    },
    clear: function () { // wipes the entire menu screen clean
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () { // if 'setInterval is used, there should be stop function
        clearInterval(this.refresh);
    },
    // this.frameNo =0;
};

/* Display Layer Objects */
// var gameBoard    = new CANVAS_LAYER(WIDTH, HEIGHT, OPAQUE,       "game_board",   0, drawScreenFcn);
// var scoreLayer   = new CANVAS_LAYER(WIDTH, HEIGHT, TRANSPARENT,  "cards_layer",  1, drawScreenFcn);
// var cardsLayer   = new CANVAS_LAYER(WIDTH, HEIGHT, TRANSPARENT,  "msgs_layer",   2, drawScreenFcn);
// var menuLayer    = new CANVAS_LAYER(WIDTH, HEIGHT, OPAQUE,       "menu_layer",   3, drawScreenFcn);


/*  Image Cache  */
// card images
var gCardCache = {};

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
        var suits = ['c', 'd', 'h', 's'];
        var faces = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'];
        var n = 0;
        for (y = 0; y < suits.length; y++) {
            var rank = 1;
            for (x = 0; x < faces.length; x++) {
                this.cards[n] = new Card(rank, faces[x], suits[y]);
                this.cards[n].init();
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

//  message board object
var msgboard = {
    visible: false,
    text: null,
    init: function () {
        this.visible = false;
        this.text = null;
    }
};

var cardToBoard = { // play object
    user: null,
    computer: null,
    select: null,
    init: function () {
        this.user = null;
        this.computer = null;
        this.select = null;
    }
};

/**
 *  Manages ALL user input (mouse, touch and keyboard) as an Object
 */

var inputMgr = {
    clickPosition: [],
    cardSelection: null,
    keys: {},
    bindings: {'Escape': 'showMenuScreen', '1': 'playCard_1', '2': 'playCard_2', '3': 'playCard_3', '4': 'playCard_4', '5': 'playCard_5', '6': 'playCard_6', },
    actions: {'showMenuScreen': false, 'playCard_1': false, 'playCard_2' : false, 'playCard_3' : false, 'playCard_4': false, 'playCard_5': false, 'playCard_6': false, },
    clickState: [],
    keyState: {},
    bind: function (key, action) {
        this.bindings[key] = action;
    },
    init: function () {
        this.clickPosition = [];
        this.cardSelection = null;
        this.refresh = setInterval(inputUpdate, 1000);           //      PERIOD_L
    },
    stop: function () {
        clearInterval(this.refresh);
    },
    setClickPosition: (positionalArr) => {
        this.clickPosition = positionalArr;
    },
    setCardSelection: (i, callbackFcn) => {
        this.cardSelection = i;
        callbackFcn();
    },
    getCardSelection: () => {
        return this.cardSelection;
    },
    setUserInput: function (pos) {
        return new Promise(function (resolve, reject) {
            console.log(pos);
            this.clickPosition = pos; // stores the user's position from mouse event handler into memory
            if (this.clickPosition != null) {
                //this.updateSelection();                                        
                resolve(this.clickPosition);
            } else {
                //this.updateSelection();
                reject('Error: Could not register mouse position');
            }
        });

    },
    getUserInput: function () {
        return new Promise(function (resolve, reject) {
            if (this.cardSelection != null) {
                this.getCardFromMemory = this.cardSelection;
                this.init();
                resolve(this.getCardFromMemory); // retrieves user's stored selection from memory
            } else {
                reject('Error: No card in memory!'); // change to an Error Object
            }
        });
    },
    updateSelection: function () {
        this.update = setInterval(this.convertPosToChoice, 200); //  updates the user selected card every 200ms (5x per sec) 
        console.log(this.cardSelection);
    },

    stopSelectionUpdate: function () {
        this.cleared = clearInterval(this.update, 200);
        //this.init();
    },
    convertPosToChoice: function () {
        // parses the coords saved onClick into a card choice [0 .. 11] ie max of 12 possible choices
        var n = null;
        var x = this.clickPosition[0];
        console.log(x);
        var y = this.clickPosition[1];
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
        this.cardSelection = n;
        if (n != null && n < 6) {
            console.log(n);
            this.stopSelectionUpdate();
        }
    },
    //      confirm card function needed
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
    // document.getElementById('card_layer').addEventListener('mouseover', onMouseOver); // start various listeners
    document.getElementById('card_layer').addEventListener('click', onClick);
    window.addEventListener('keydown', onKeyDown); // keyboard
    window.addEventListener("keyup", onKeyUp);
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

function keySelect() {
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

function updateInputMgr() {
    clickEventHandler();
    keyboardEventHandler();
    // mouseOverEventHandler();
    // arrowKeysEventHandler();
}

function onClick() {
    let locX = event.clientX - LEFTOFFSET;
    let locY = event.clientY - TOPOFFSET;
    console.log("Click location: (", locX, ", ", locY, ")");
    if (locX && locY) {
        // document.getElementById("card_layer").removeEventListener('click', onclick);
    }
    inputMgr.clickPosition[1] = locX;
    inputMgr.clickPosition[2] = locY;
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
                play(i - 1);
                break;
            }
            if (i == myHand.length && locX > handPosX + (i - 1) * CARD_W / 2 && locX < handPosX + i * CARD_W / 2 + CARD_W / 2) {
                //  play(i);
                //cardToBoard.user = myHand[i - 1];
                play(i - 1);
                break;
            }
        }
    }
}

function pauseEventListener(event, callbackFcn) {
    if (event === "click") {
        document.getElementById("card_layer").removeEventListener(event, callbackFcn);
        setTimeout((event, callbackFcn) => {
            document.getElementById("card_layer").addEventListener(event, callbackFcn);
        }, 1500);
    } else if (event == "keydown") {
        window.removeEventListener(event, callbackFcn); // keyboard
        setTimeout((event, callbackFcn) => {
            window.addEventListener(event, callbackFcn); // keyboard
        }, 1500);
    }
    if (event == "keyup") {
        window.removeEventListener(event, callbackFcn); // keyboard
        setTimeout((event, callbackFcn) => {
            window.addEventListener(event, callbackFcn); // keyboard
        }, 1500);
    }
}



function onKeyDown(event) {
    let key = event.key;
    if (key) {
        console.log("ID: ", key); // ASCII id of key thats was pressed
        // pauseEventListener("keydown", onKeyDown);
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
    // window.addEventListener('keydown', onKeyDown);
}

function keyboardEventHandler() { //  gets latest keystate & carry out its corresponding action
    /*  Game Keys   */
    const KEY_Q = 'q';
    const KEY_ESC = 'Escape';
    const KEY_1 = '1';
    const KEY_2 = '2';
    const KEY_3 = '3';
    const KEY_4 = '4';
    const KEY_5 = '5';
    const KEY_6 = '6';
    const KEY_LA = 'ArrowLeft';
    const KEY_RA = 'ArrowRight';
    const KEY_ENT = 'Enter';
    const KEY_SPB = ' ';
}

function inputUpdate() {
    //  probe all game keys
    if (inputMgr.actions['showMenuScreen']) {           // toggle menu screen
        if (document.getElementById('menu_layer').style.visibility == 'visible') {
            document.getElementById('menu_layer').style.visibility = 'hidden';
        } else {
            document.getElementById('menu_layer').style.visibility = 'visible';
        }
    }
    /*
        let hand = human.hand;
        for (let i=1; i<hand.length; i++) {
            let integer = i;
            let choiceString = toString(integer);
            if ( inputMgr.keyState[choiceString] === true) {
                play(integer--);
            }
        }
    
    if (inputMgr.action[SELECT_LEFT]) {
     selectCard(minusLeft);
    }    
    if (inputMgr.action[SELECT_RIGHT]) {
     selectCard(plusRight);
    }
    */

    if (inputMgr.actions['playCard_1']) {                 // queries the key's state, and calls the corresponding function
        if (cardToBoard.user === null) {
            let hand = human.hand;
            cardToBoard.user = hand[0];
            //play(0);                  // play
        }
    }
    if (inputMgr.actions['playCard_2']) {
        if (cardToBoard.user === null) {
            let hand = human.hand;
            cardToBoard.user = hand[1];
            //play(1);
        }
    }
    if (inputMgr.actions['playCard_3']) {
        if (cardToBoard.user === null) {
            let hand = human.hand;
            cardToBoard.user = hand[2]; // 
           // play(2);
        }
    }
    if (inputMgr.actions['playCard_4']) {
        if (cardToBoard.user === null) {
            play(3);
        }
    }
    if (inputMgr.actions['playCard_5']) {
        if (cardToBoard.user === null) {
            play(4);
        }
    }
    if (inputMgr.actions['playCard_6']) {
        if (cardToBoard.user === null) { 
            play(5);
        }
    }

}

/*  Input Manager keyboard extension   */
/*
inputmanager = Class.extend(
    {
        keys    :   {},                     // keys = {'KEY_LA' : false}                    keyCode --> state
        bindings:   {},                     // eg. bindings = {'KEY_LA' : 'SELECT_LEFT'}    keyCode --> action
        actions :   {},                     // eg. actions = {'SELECT_LEFT: false}          action --> state
    
    bind: function (key, action)            // Eg. key = KEY_LA; action = 'SELECT_LEFT';
    {
        this.bindings[key] = action[SELECT_LEFT];
    }

    onKeyDownEvent: function (keyCode, event)
    {
        var code = keyCode;
        var action = this.bindings[code];

        if (action) {                                // if 'true' means the action is 'occurring'
            this.actions[action] = true;
        }
    },
    });


keys:{},
bind: function (key, action)
*/

function keystrokeEventHandler(key) {
    // inputMgr.updateSelection(key).then(function(resolve))
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                                    /*  game play functions   */


    function playGameRound() {
        if (computer.hand.length==0 && human.hand.length == 0) {
            deck.init();
            deck.shuffle();
            deck.deal(human, computer);
            dealer.points += kickPoints(deck.trump);
        }
        while (computer.hand.length > 0 && human.hand.length > 0) {
            playRound(playFirst);
        }
        allocatePoints();
    }

    function allocatePoints() {
        if (countForGame(computer) > countForGame(human)) {
            computer.points += GAME;
        } else {
            human.points += GAME;
        }
    }

    function playRound(playFirst) {
        if (playFirst === computer) {
            cardToBoard.computer = computer.hand[computerAI];
            computer.hand.splice(computerAI, 1);
            cardToBoard.user = userPlay();
        } else {
            cardToBoard.user = userPlay();
            cardToBoard.computer = computer.hand[computerAI];
            computer.hand.splice(computerAI, 1);
        }
    }

    async function userPlay() {
        let playedCard = null;
        while (playedCard === null) {
            let i=0;
            for (action in inputMgr.actions) {
                if (inputMgr.actions[action]) {
                    playedCard = human.hand[i];
                    human.hand.splice(i,1);
                    return playedCard;
                };
                i++;
            }
        }
    }
                                                                
                                                                    
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
        if (cardChoice===null) {
            reject("Did not get user input");
        } else {
            resolve(cardChoice);
        }
    });
}
function computerAI() {
    // play a random card
    let i = Math.floor(Math.random() * computer.hand.length);
    return i;
}
/**
 * 
 * @param {*} called Card 
 * @param {*} computerHand Players.Hand 
 */
function computerPlay() { // run the 'thinking animation'
    return new Promise(function (resolve, reject) {
        var position = "top";
        var i = Math.floor(Math.random() * computer.hand.length);
        if (cardToBoard.user == null) { //  then computer plays first, choose a random card.
            //  play highest random card (thats not trump or ten)
            // playCard(position, computer.hand[i]);
            cardToBoard.computer = computer.hand[i];
            computer.hand.splice(computer.hand[i], 1);
            resolve(computer.hand[i]);
        } else { //  else choose a random card... more on computer AI later.
            cardToBoard.computer = computer.hand[i];
            computer.hand.splice(computer.hand[i], 1);
            resolve(computer.hand[i]);
            /*
        // Play higher card in same suit, (if 10, q, k, or a play trump if yu have to)
        for (var card in computer.hand) {
            if (card.suit === oppponentCard.suit) {
                if (card.rank > opponentCard.rank) {
                    computer.hand.splice(computer.hand.indexOf(card), 1);
                    // playCard('top', card);
                    cardToBoard.computer = card;
                    resolve(card);
                }
            }
        }
        // play any low card including trump
        for (var individualCard in computer.hand) {
            if (individualCard.rank < 10 && individualCard.suit != deck.trump.suit) {
                // playCard('top', individualCard);
                cardToBoard.computer = card;
                computer.hand.splice(computer.hand.indexOf(individualCard), 1);
                resolve(individualCard);
            } else {
                // play low trump
            }
        }
        // play any card
        //playCard('top', computer.hand[i]);
        //computer.hand.splice(i,1);
        //resolve(computer.hand[i]);
    }   */
            reject("Error: Computer could not select a card");
        }
    });
}

function determineWinner(called, played) {
    // determines the higher rank card
    // parameters: called and played card objects
    // return: player (who won)
    // pause
    var win;
    return new Promise(function (resolve) {
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
        // console.log(win);
        resolve(win);
    });
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
    while (player.lift.length > 0) {
        var card = player.lift.pop;
        switch (card.face) {
            case a:
                points += 4;
                break;
            case k:
                points += 3;
                break;
            case q:
                points += 2;
                break;
            case j:
                points += 1;
                break;
            case t:
                points += 10;
                break;
            default:
                points += 0;
        }
    }
    return points;
}

function endRoundPlay(handIndex) {
    //human.hand.splice(handIndex, 1);
    let whoWon = winner.name;
    console.log(whoWon, +" Wins!");
    msgboard.text = whoWon + " Won!!!";
    msgboard.visible = true;
    winner.lift.push(cardToBoard.computer, cardToBoard.human);
    cardToBoard.init();
}

function play(handIndex) {
    if (cardToBoard.computer) {                         // computer played first
        playSingleCard(human, handIndex);
        // cardToBoard.user = human.hand[handIndex];       // show my played card
        // computerPlay();
        if (determineWinner(cardToBoard.computer, human.hand[handIndex]) == cardToBoard.computer) {
            winner = computer;
        } else {
            winner = human;
        }
        setTimeout(() => {
            endRoundPlay(handIndex);
            if (winner == computer) {
                cardToBoard.computer = computerPlay();
            }            
        }, 2000);    
    } else {                                            // human played first
        playSingleCard(human, handIndex);
        // cardToBoard.human = human.hand[handIndex];      //  firstCard = userHand[handIndex];
        cardToBoard.computer = computerPlay();   // secondCard;
        if (determineWinner(cardToBoard.human, cardToBoard.computer) === cardToBoard.human) {
            winner = human;
        } else {
            winner = computer;
        }
        setTimeout(() => {
            endRoundPlay(handIndex);
            if (winner == computer) {
                cardToBoard.computer = computerPlay();
            }            
        }, 2000);
    };
    console.log('END OF ROUND!!!');
}

function playSingleCard(player, i) {
    cardToBoard.player = player.hand[i];
    player.hand.splice(i, 1);
}

    /* 
    setTimeout(() => {
        cardToBoard.init();
        if (winner == computer) {
            cardToBoard.computer = computerPlay(computer, null);
        }
    }, 1500);
    */
    
    /*   setTimeout(function () {
           msgboard.init();
           setTimeout(() => {
               cardToBoard.init();
               setTimeout(() => {
                   if (winner == computer) {
                       cardToBoard.computer = computerPlay(computer, null);
                   }
               }, 1500);
           }, 1500);
       }, 2500);
     */

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
function whoPlayedHigh(human, computer) {
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



//whoPlayedHigh.points += HIGH;

function confirmCardSelection(card) {
    // Enlarges Card and place front & center of the Hand
    var z = cardLayer.ctx;
    z.drawImage(card.image, gameBoard.width / 2 - 71, gameBoard.height - 2 * 96, 2 * 71, 2 * 96);
    z.scale(2, 2);
    cardLayer.canvas.addEventListener("click", function (event) {
        var x = event.clientX;
        var y = event.clientY;
        if (y > 250 && y < 496) {
            if (x > 280 && x < 420) {
                playCard('bot', card);
                return card;
            } else {
                // remove enlarged image;
            }
        } else {
            // remove enlarged image;
        }
    });
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*  Display Functions   */

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

function displayCardSelection() {
    // poll the cardToBoard object for a card in the select-property and displays it 1.5x its normal size
    let bigCard = cardToBoard.select;
    let c = cardLayer.canvas;
    let x = cardLayer.ctx;
    x.drawImage(bigCard.image, WIDTH / 2 - 0.75 * CARD_W, HEIGHT - CARD_H, 1.5 * CARD_W, 1.5 * CARD_H);
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
    // let cardImgs = gCardCache['jh'];
    x.drawImage(image, 350, 300, 1.5 * CARD_W, 1.5 * CARD_H); //, 142, 192);
    // cardLayer.ctx.scale(2,2);
}

function enlargeCard(cardNo) {
    let hand = player.hand;
    let card = hand[cardNo];
    let image = card.image;
    let c = cardLayer.canvas;
    let x = cardLayer.ctx;
    // let cardImgs = gCardCache['jh'];
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

/* function displayMsgFor(time) {
        return new Promise(function(resolve) {
        let ml=document.getElementById("msg_layer");
        msgboard.visible = true;
        time = time * 1000;
        setTimeout(() => {
            ml.style.visibility="hidden";
        }, time);
    });
} */

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
    var msgText = msgboard.text;
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
    menuLayer.init();
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
    // init, draw, stop, clear, remove
    menuLayer.init();
    // print welcome message
    setTimeout(() => {          // remove menu screen when all game assets are loaded and game is ready to be played
        menuLayer.stop();
        menuLayer.clear();
        // document.getElementById('menu_layer').style.visibility = 'hidden';
        document.getElementById("menu_layer").style.visibility = "hidden";
    }, 4000);
    // initialize all game objects
    inputMgr.init(); // load/initialize user input
    //  from classes & constructor functions
    let gObjectsArr = _initializePlayers();
    //  load objects
    msgboard.init();
    deck.init(); // load all  card images                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               images into cache array
    cardToBoard.init(); // game play cards cache for display
    //  other graphical objects
    _initializeScreens();
    //  sound components      
    return gObjectsArr;
}

/*  INITIALIZE GRAPHICS OBJECTS */
function _initializeScreens() {
    let s0 = Promise.resolve(gameBoard.init()); // screens[0] = gameBoard;
    let s1 = Promise.resolve(cardLayer.init()); // screens[1] = cardsLayer;
    let s2 = Promise.resolve(msgLayer.init());  // screens[2] = msgLayer;
    let s3 = Promise.resolve(menuLayer.init()); // screens[3] = menuLayer;
    //  Promise.all(s0, s1, s2, s3).then((screens) => resolve(screens);
    //  return screens;
    //  for (screen in screens) {
    //    screen.init();
    //  }
}

function loadScreenCache() {
    let screens = [];
    screens[0] = gameBoard; // and scoreLayer 
    screens[1] = cardsLayer;
    screens[2] = msgLayer;                                                                                        
    screens[3] = menuLayer;
    return screens; // screens array
}

function updateGameScreen() {

    displayScore(computer, human);
    if (deck.trump) {
        displayTrump(deck.trump);
        displayLabels();
    }
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
    // emphasizeTrump();
}

function updateMsgScreen() {
    if (msgboard.visible === true) { // if message object is true, then
        message(); // call the msg box function 
    }
}

function updateMenuScreen() {           //  game pauses and menu comes up  when 'ESC' key is pressed.
    var c = menuLayer.ctx;
    c.font = "70px Arial";
    c.fillStyle = "rgba(254,254,254,1.0)"; // white, opaque
    let welcomeMsg = "Let's play some";
    c.fillText(welcomeMsg, 95, 200);
    c.font="100px Arial";
    let gamelogo = "ALL FOURS!";
    c.fillText(gamelogo, 75, 350);
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

/*
function gWaitState() {
    // pass;
}
*/

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
function mainGameLoop() {
    // var gObjectsArr = loadGameAssets();              // passes an array of all game object 
    // if (document.getElementById('card_layer')) {console.log('Card Screen exists.');} else {console.log('No card srceen found!');}
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

    /*  Deal subroutines    */
    // firstJackDeal();         // along wth animation
    let flipACoin = Math.floor(Math.random() * 2); // simulate firtsJackDeal
    if (flipACoin == 0) {
        dealer = computer;
    } else {
        dealer = human;
    }
    deck.shuffle();
    deck.deal(human, computer);
    //displayPlayerHand(human); //.then(mouseEventHandler()); // then setUserInput
    dealer.points += kickPoints(deck.trump);

    var winner;
    if (dealer == computer) {
        playFirst = human;
    } else {
        playFirst = computer;
    }

                                                                              /*  Actual Game Engine  */


    // players play one card each
    // who plays first




    while (human.points <= 14 && computer.points <= 14) {
        playGameRound();
    }

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