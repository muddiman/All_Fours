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
 *  @version   0.9.0
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
import { SETTINGS }                 from "./lib/settings.mjs";
import { Display }                  from "./lib/display-interface.mjs";
import { Player }                   from "./lib/player.mjs";
import { Card, gCardImageCacheObj } from "./lib/card.mjs";
import { Engine }                   from "./lib/engine.mjs";
import { computerAI }               from "./lib/ai.mjs";
import { sndFx, bkgndMusic }        from "./lib/soundlib.mjs";
import { tickertape }               from "./lib/tickertape.mjs";
import { debug, DEBUG_MODE }        from "./lib/debugging.mjs";
import { Controller }               from "./lib/controller.mjs";

// import { playSoundInstance, Sound }    from "./lib/soundlib.mjs";
// import { Display } from "/lib/displayInterface.mjs";

/***************************************     the globals *  ********************************************************/

/*  Flags   */
const MAGNIFY_CARD=SETTINGS.MOUSE_OVER;
const ON=true;
const OFF=false;
const ADS=OFF;

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
const OPAQUE      = 1.0;


/* Players */
const PLAYER1_NAME = "Computer";
const PLAYER2_NAME = "You";

/* Canvas top-left corner coords (in px) */
const LEFTOFFSET =  15;
const TOPOFFSET  = 180;

/* IMAGES   */
const caribLogo = new Image();

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
// import gameBoard from '/lib/graphicslib.js';         INCL. score board, trump...

/*  Remove game_board and use game Background instead.
    there is no need to constantly update the background @ 30 fps.
    All game components that are not frequently updated can be placed in the background
*/

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
    debug      : debug,
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

Game.Screens = {
    // pauseScreen : new gCanvasLayer("pause_screen", LEFTOFFSET, TOPOFFSET, WIDTH + 0, HEIGHT + 0, 0.8,         4, 204, 204, 204),        //  to be removed
};

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
            this.cards.forEach(element => {
                if (element.imageLoaded === true) {
                    this.counter++;
                }
             });
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
        ' '         : 'confirmSelection',
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
        console.log(`YOUR TURN!`);
            console.log(`Listening for card!`);
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
                Game.Components.msgboard.message("HANG JACK!!!");
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
    Game.Components.deck.init().cardImagesLoaded().init().cardImagesLoaded();    // .cardImagesLoaded();     //  .isDeckLoaded();
    resolve(`1`);
});
var asset2 = new Promise(function (resolve, reject) {
    Game.Components.gameboard.init();
               // if card image not loaded, create new image and assign it to cache
        // let logo = new Image();
        caribLogo.id = `coors_logo`;
        caribLogo.src = `lib/img/${caribLogo.id}.jpg`;
        caribLogo.onload =  () => {
            //    this.imageLoaded = true;
            //    counter++;
            console.log(`${caribLogo.id} loaded.`);
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
    Game.Controller.init();
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
        Display.adbox(caribLogo);
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
    if (Game.Components.gameboard.computer) {
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
    }
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


export function gameLoop() {
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
            let text = `${gameWinner.getName()} WON!!!`;
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
        Controller.listeners(document.getElementById("card_layer"), Game.Player.human.hand, inputUpdate);
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
    }
    entBtn.addEventListener('click', stopBtnListener);
}
function changePlayerName() {
    let nameInput = document.getElementById("player_name");
    if (nameInput.value.length != 0) {
        Game.Player.human.changeName(nameInput.value);
    }
}const messageArray = [
            `Play Two-Man All Fours`,
            `Coors Light, taste the rockies!`,
            `Stag, a man's beer`,
            `A beer is a Carib`,
        ];
const tempArray = [`Play Two-Man All Fours`,];

tickertape(tempArray);
// mainGameLoop();
let pauseID = setTimeout(function () {
    mainGameLoop();
    clearTimeout(pauseID);
}, 3000);
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
    Testing Module          (abandoned)
    Debug Module
    Sound Module
    Game Module --> components etc... objects & classes
*/


/********************************************************************************************** */
/*                 Copyright (c) 2018-2019 Prodigy Engineering LLC, NY. All Rights Reserved                 */
/********************************************************************************************** */
