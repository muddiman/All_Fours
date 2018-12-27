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
 *  @link      https://www.roger-clarke.com (OR: https://www.muddicode.com)
 *  @version   0.6.3
 *  @since     2018-10-1
 *  @download  https://www.github.com/muddiman/All_Fours
 *  @license   NOT for 'commercial use'.
 *  @See:      http://www.roger-clarke.com/allfours/license.html
 *             Free to use for personal or academic purposes.
 *             Please site the source code using the following format:
 *             "Clarke, Roger A. (2018) All Fours Game (ver. 0.1.1) [Source Code]. New York, 
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
const WIDTH=700;    //use window.innerWidth;  for fullscreen gaming
const HEIGHT=450;   //use window.innerHeight; for fullscreen gaming
const CARDW=72;     // card width
const CARDH=96;     // card height

/* Clear/Opaque */
const TRANSPARENT=0;
const OPAQUE=1.0;
const REFRESH_RATE=2;                   // in FPS (frames per second)
const PERIOD=(1/REFRESH_RATE)*1000;     // in milliseconds

const PLAYER1_NAME="Computer";
const PLAYER2_NAME="You";

//-------------------------------------------------------------------------------------------------------------------------
                                    /*          THE OBJECTS             */

/* game board object */
// import gameBoard from '/lib/graphicslib.js';

var gameBoard = {
//  Object: gameBoard --> TODO: turn into a "class"
    canvas : document.createElement("canvas"), 
    init : function () {
    // initialize gameBoard by applying context & inserting the canvas in the "game_container" <div> 
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.canvas.id = "game_board";
        this.ctx = this.canvas.getContext("2d");
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById("game_board").style="position: absolute; left: 10px; top: 110px; z-index:0;";
        this.refresh = setInterval(_drawGameBoard, PERIOD);   
    },
    clear   : function () {
                    // wipes the entire gameBoard clean
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                },
        // this.frameNo =0;
    // if 'setInterval is used, there should be stop function
    stop    :    function () {
                    clearInterval(this.refresh);    
                }
};


/* Message layer object */
var msgLayer = {        //  Object: gameBoard --> TODO: turn into a "class"
    canvas : document.createElement("canvas"), 
    init    :   function () {
            // initialize gameBoard by applying context & inserting the canvas in the "game_container" <div> 
                this.canvas.width = WIDTH;
                this.canvas.height = HEIGHT;
                this.canvas.id = "msg_layer";
                this.ctx = this.canvas.getContext("2d");
                document.getElementById("game_container").appendChild(this.canvas);
                document.getElementById("msg_layer").style="position: absolute; left: 10px; top: 110px; z-index: 1; background-color: rgba(255, 255, 255," + TRANSPARENT + ");";
                // this.canvas.style="background-color: rgba(255, 255, 255," + OPAQUE + ");";     // in rgba format
                this.refresh = setInterval(_drawMsgScreen, PERIOD);   
            },
    clear   :   function () {           // wipes the entire gameBoard clean
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                },
    stop    :   function () {           // if 'setInterval is used, there should be stop function
                    clearInterval(this.refresh);
                },
                            // this.frameNo =0;
};

/* Display Layer Objects */
// var gameBoard    = new CANVAS_LAYER(WIDTH, HEIGHT, OPAQUE, "game_board", 0);
// var scoreLayer   = new CANVAS_LAYER(WIDTH, HEIGHT, TRANSPARENT, "score_layer", 1);
// var cardsLayer   = new CANVAS_LAYER(WIDTH, HEIGHT, TRANSPARENT, "cards_layer", 2);
// var msgLayer     = new CANVAS_LAYER(WIDTH, HEIGHT, TRANSPARENT, "msg_layer", 3);

 /* Deck of cards objects   */
 var deck = {
 // deck object: deck.init(), deck.shuffle(), deck.cut(), deck.deal()    
    cards : [],
    trump : null,
    init : function() {
    /** creates deck (array of all 52 cards)
     *  @param: null
     *  @returns: deck
     */
    var suits = ['c', 'd', 'h', 's'];
    var faces = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'];
    var n = 0;
    for (y = 0; y < suits.length; y++)  {
        var rank = 1;
        for (x = 0; x < faces.length; x++) {
            this.cards[n] = new Card(rank, faces[x], suits[y]);
            n++;
            rank++;
        }
    }
    // return this.cards;
    },
    shuffle : function() {
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
    cut : function(n) {
    /** randomly mixes up the cards in the deck
     *  @param: null
     *  @returns: cuts deck
     */
      /*  var temp = this.cards.slice(0, n);
        this.cards = this.cards + temp;
        return this.cards; */
    },
    deal : function(human, computer) {
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
    beg : function(human, computer) {
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

 /**
 * Displays the score in the top right corner of the game board
 * @param: null
 * @returns: void
 */

var score = {
    teamA : 0,  // Computer
    teamB : 0,  // You
    init : function () {
        this.teamA = 0;
        this.teamB = 0;
    },
    update : function (newTeamApoints, newTeamBpoints) {
        this.teamA = this.teamA + newTeamApoints;
        this.teamB = this.teamB + newTeamBpoints;
    },
 /*   display : function () {
        displayscore(playerA, playerB);
    },
 */
    clear : function () {
        // wipes the score clean
        var c = gameBoard.canvas;       // change to scoreLayer when implemented
        var x = gameBoard.ctx;
        x.clearRect(c.width - 335, 15, 260, 120);
    }
};

var msgboard = {
    visible     :   false,
    text        :   null,
    init        :   function () {
                        this.visible = false;
                        this.text = null;
    }
};

var cardToBoard = {
    user    : null,
    computer: null,
    init    : function () {
                this.user=null;
                this.computer=null;
              }
};

/*
var scoreboard = {
    visible     :   true,
    text        :   null,
    init        :   function () {
                        this.visible = true;
                        this.text = null;
    }
};
*/

/**
 *  Manages ALL user input (mouse, touch and keyboard) as an Object
 */ 
var inputMgr = {
    clickPosition:      null,
    cardSelection:      null,
    init:               function () {
                            this.clickPosition=null;
                            this.cardSelection=null;
                            //this.updateSelection();
                        },
    setUserInput:       function (pos) { 
                            return new Promise(function (resolve, reject) { 
                                console.log(pos);
                                this.clickPosition = pos;        // stores the user's position from mouse event handler into memory
                                if (this.clickPosition !=null) {
                                    //this.updateSelection();                                        
                                    resolve(this.clickPosition);
                                } else {
                                    //this.updateSelection();
                                    reject('Error: Could not register mouse position');
                                }
                            });
                           
                        },
    getUserInput:       function () {
                            return new Promise(function (resolve, reject) {
                                if (this.cardSelection != null) {
                                    this.getCardFromMemory=this.cardSelection;
                                    this.init();
                                    resolve(this.getCardFromMemory);    // retrieves user's stored selection from memory
                                } else {
                                    reject('Error: No card in memory!'); // change to an Error Object
                                }      
                            });
                        },
    updateSelection:    function () {
                            this.update = setInterval(this.convertPosToChoice, 200);                      //  updates the user selected card every 200ms (5x per sec) 
                            console.log(this.cardSelection);
                        },
                        
    stopSelectionUpdate: function () {
                            this.cleared = clearInterval(this.update, 200);
                            //this.init();
                        },
    convertPosToChoice:   function () {
                        // parses the coords saved onClick into a card choice [0 .. 11] ie max of 12 possible choices
                        var n=null;
                        var x=this.clickPosition[0];
                        console.log(x);
                        var y=this.clickPosition[1];
                        console.log(y);
                        var p=x-160;
                        if (y > 450) {
                            switch (true) {
                                case (p < 36):
                                    n=0;
                                    break;
                                case (p < 72):
                                    n=1;
                                    break;
                                case (p < 108):
                                    n=2;
                                    break;
                                case p < 144:
                                    n=3;
                                    break;
                                case p < 180:
                                    n=4;
                                    break;
                                case (p < 252):
                                    n=5;
                                    break;
                                default:
                                    n='Out of Range';    // change to zero from  null; 
                            }
                        } else {
                            n='Please click on a card!';
                        }
                        this.cardSelection=n;
                        if (n != null  && n < 6) {
                            console.log(n);
                            this.stopSelectionUpdate();
                        }
    },
    //      confirm card function needed
};

//------------------------------------------------------------------------------------------------------------------
                                    /*  THE CLASSES/OBJECT CONSTRUCTORS  */

/*
//  
    function GameBoard(ID, WIDTH, HEIGHT, OPACITY) {
        canvas = document.createElement("canvas");
        this.init = function () {         
            this.canvas.id = ID;
            this.canvas.width = WIDTH;
            this.canvas.height = HEIGHT;
            this.ctx = this.canvas.getContext('2d');
            Document.getElementById("game_container").appendChild(this.canvas);
            this.canvas.style="background-color: rgba(255, 255, 255," + OPACITY + ")";     // in rgba format
            console.log("New " + this.canvas.id + " canvas initialized.");
        }
        this.clearBoard = function (){  
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
*/

// var gCachedAssets = [];

/* Card Class/Object Constructor */
function Card(rank, face, suit) {
// Card object constructor (game components are usually created writing a constructor for each type of component)
    this.suit = suit; // ['c', 'd', 'h', 's'],  MAX_SUITS=4
    this.face = face; // ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'],     MAX_FACES=13
    this.rank = rank;     // [0, 1,.. 12], to assist in determining who played the higher card
    this.getCardName = function () {
                            return this.face + this.suit; // used as cardId, image filename, etc    MAX_CHARACTERS=2
                        };
    this.image = new Image();

    this.image.onload = console.log(this.getCardName() +' loaded');      // image creation callback function (to be changed into a useful function)
                        
    this.image.id = this.getCardName();
    this.image.src = "img/" + this.getCardName() + ".png";
}

/*
//      Team Object Constructor
        function Team() {
            this.name = "";                         // MAX_CHARACTERS=8;
            this.members = [Player, Player];        // array of Player; MAX_TEAM_MEMBERS=2;
            this.points = 0;                
            this.lift = [Cards, Cards, Cards];
            this.setTeamName = function (name) {this.name = name;};
            this.getTeamName = function (name) {this.name = name;}
        }
*/
 /**
  *     Player object constructor (or class)
  *     
  */
 /* Player Class/Object Constructor */
 function Player() {    // Add a "Team" constructor when coding the 4-player version: function Team(playerA, playerB)
    this.init  = function () {
                this.hand = [];    // MAX_CARDS_IN_HAND=12;
                this.points = 0;   // MAX_POINTS=14;
                this.lift = [];    // MAX_CARDS_IN_LIFT=48;
                this.name = "";    // MAX_CHARACTERS=12;
            };
     //this.player1 = playerA;
     //this.player2 = playerB;
     //this.team = "";
     //this.setPlayerName = function (name) {this.name = name;}
     //this.setPlayerTeam = function (team) {this.team = team;}
     //this.setTeamName = function (name) {this.teamName = name;}
     //this.setTeamPlayers = function (player1, player2) {this.teamPlayers = [player1, player2];}
 }

 //---------------------------------------------------------------------------------------------------------------------------
 
/**  
 * place a card around the center of the gameBoard
 * @param card object
 * @param playPosition --Position relative to the center of the gameboard
 * @returns: void
*/
function playCard(playPosition, card) {
    var c = gameBoard.canvas;
    var x = gameBoard.ctx; 
    var xCenter = c.width/2;
    var yCenter = c.height/2;
    switch (playPosition) {
        case "left":
            x.drawImage(card.image, xCenter-60, yCenter-30);
            break;
        case "top":
            x.drawImage(card.image, xCenter-40, yCenter-50);
            break;
        case "right":
            x.drawImage(card.image, xCenter-20, yCenter-30);
            break;
        case "bottom": 
            x.drawImage(card.image, xCenter-40, yCenter-10);
            break;
        default:
            x.drawImage(card.image, xCenter-60, yCenter-30);
    }
}

/*
// listens for mouse clicks, captures and returns its location as a position array --> [x.y]
function onClick() {
    document.getElementById('game_board').addEventListener('click', function (e) {
        var x = e.clientX;      // click location
        var y = e.clientY;
    });
    var posArr = [x,y];
    document.getElementById('game_board').removeEventListener('click', function (e) {
        var x = e.clientX;      // click location
        var y = e.clientY;
    });       
    return posArr;
}
*/

//-------------------------------------------------------------------------------------------------------------------------------
                                        /*  INPUT SECTION   */
                                
function onClick() {
    return new Promise(function(resolve, reject) {
            document.getElementById('game_board').addEventListener('click', function(e) {   // change to cardLayer 
                var x = e.clientX;
                var y = e.clientY;
                var posArr = [x,y];
                resolve(posArr);
            });    
            //console.log(err);
            //reject(err);
    });
}

function removeInputListener() {
    return new Promise(function(resolve) {
        document.getElementById('game_board').removeEventListener('click', onClick(event));    // change to cardsLayer 
    });
}

/**
 * 
 * @param {*} positionArray 
 */
function mouseEventHandler(positionArray) {   
    return new Promise(function (resolve, reject) {
    var n=null;
    var x=positionArray[0];
    console.log(x);
    var y=positionArray[1];
    console.log(y);
    var p=x-160;
    if (y > 450) {
        switch (true) {
            case (p < 36):
                n=0;
                break;
            case (p < 72):
                n=1;
                break;
            case (p < 108):
                n=2;
                break;
            case p < 144:
                n=3;
                break;
            case p < 180:
                n=4;
                break;
            case (p < 252):
                n=5;
                break;
            default:
                n='Out of Range';    // change to zero from  null; 
        }
    } else {
        n='Please click on a card!';
    }
    //resolve(n);
    if (n != null  && n < 6) {
        console.log(n);
        resolve(n);
    } else {
        reject(n);
    }
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
    var x = touchEvent.clientX;      // click location
    var y = touchEvent.clientY;
    var posArr = [x,y];
    document.getElementById('game_board').removeEventListener('touch', onTouch(e));
    touchEventHandler(posArr);
}

/**
 * 
 * @param {[x,y]} positionArray 
 */
function touchEventHandler(positionArray) {
    return new Promise(function (resolve, reject) {
        var n=null;
        var x=positionArray[0];
        console.log(x);
        var y=positionArray[1];
        console.log(y);
        var p=x-160;
        if (y > 450) {
            switch (true) {
                case (p < 36):
                    n=0;
                    break;
                case (p < 72):
                    n=1;
                    break;
                case (p < 108):
                    n=2;
                    break;
                case p < 144:
                    n=3;
                    break;
                case p < 180:
                    n=4;
                    break;
                case (p < 252):
                    n=5;
                    break;
                default:
                    n='Out of Range';    // change to zero from  null; 
            }
        } else {
            n='Please click on a card!';
        }
        //resolve(n);
        if (n != null  && n < 6) {
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
}
function keystrokeEventHandler(key) {
    // inputMgr.updateSelection(key).then(function(resolve))
}


//----------------------------------------------------------------------------------------------------------
                                    /*  game play   */

function confirmCardSelection(card) {
    // Enlarges Card and place front & center of the Hand
    var z=gameBoard.ctx;
    z.drawImage(card.image, gameBoard.width/2 - 71, gameBoard.height-2*96, 2*71, 2*96);
    z.scale(2,2);
    gameBoard.canvas.addEventListener("click", function (event) {
        var x=event.clientX;
        var y=event.clientY;
        if (250 < y < 496) {
            if (280 < x < 420) {
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


//-------------------------------------------------------------------------------------------------------------------------------------
                                            /*  Display Functions   */
/**
 * 
 * @param {*} player object
 */
function displayPlayerHand(player) {
    return new Promise(function(resolve) {
         var c = gameBoard.canvas;
         var x = gameBoard.ctx;
         var xCenter = c.width/2;
         var yCenter = c.height/2;
         for (i = 0; i < player.hand.length; i++) {
             x.drawImage(player.hand[i].image, xCenter - (72*(6-i)/2), 340, 71, 96); // display cards on the game board        // playCard('left', player.hand[i]);
         }
    });
}

/**
 * Displays the kickcard/trump in the top left corner of the gameboard
 * @param {*} trump -Card
 * @returns void 
 */
function displayTrump(trump) {
    // gameBoard.clearBoard();
    var x = gameBoard.ctx;
    x.drawImage(trump.image, 5, 5);     // upper left corner (x,y) => (5,5)
   // x.scale(2,2);
}

function acquireImage() {
    var x = gameBoard.ctx;
    var imgData = x.getImageData(5, 5, 71, 96); // capture image from gameboard
    x.putImageData(imgData, 200, 200);  // place captured image info elsewhere
   if (x.getImageData(200,200, 71,96)) {
       return console.log('Pass: image object exists.');
   } else {
       return console.log('Fail: image object does NOT exist!');
   }
}


function message() {
    document.getElementById("msg_layer").style.visibility="visible";
    var m = msgLayer.canvas;
    var c=msgLayer.ctx;
    c.beginPath();
    c.lineWidth = 2;
    c.strokeStyle = "white";
    c.rect(170,100, 400, 200);
    c.stroke();
    //c.globalAlpha=0.4;
    c.fillStyle="rgba(0,0,0, 0.4)";  // black, transparent
    c.fillRect(170,100, 400,200);
    // c.globalAlpha=0.1;
    c.font = "20px Arial";
    c.fillStyle = "rgba(254,254,254,1.0)";    // white
    var msgText = msgboard.text;
    c.fillText(msgText, 200, 200);
    document.getElementById("msg_layer").addEventListener("click", function () {
        msgboard.visible = false;
        document.getElementById("msg_layer").style.visibility="hidden";
    });
    setTimeout(function () {
        msgboard.visible = false;
        document.getElementById("msg_layer").style.visibility="hidden";
    }, 4000);
}
 
function clearMessage() {
    msgLayer.clear();
}

function cleanBoard() {
    var c=gameBoard.ctx;
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
    x.shadowOffsetX=10;
    x.shadowOffsetY=10;
    x.shadowColor = "black";
    x.fillStyle = "#ff0000";    // red
    x.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);  
    // text
    x.fillStyle = "#ffffff";    // white
    x.font = "30px Arial";
    x.fillText(playerA.name, upperLeftCornerX + 15, 40);
    x.fillText(playerB.name, upperLeftCornerX + 15, 105);
    // score tiles (numbers)
    x.fillText(playerA.points, upperLeftCornerX + 215, 40);
    x.fillText(playerB.points, upperLeftCornerX + 215, 105);
}

/**
 * 
 * @param {*} human.hand  the human player's hand (array of cards)
 * @returns card or null
 */  
function humanPlayTurn(player) {
    return new Promise(function(resolve, reject) {
        var pos = 'bottom';         // Player 1 always play bottom of center
        msgboard.text = "Your turn, Please play a card.";
        msgboard.visible = true;
        onClick()
        .then(onResolved => {
            return mouseEventHandler(onResolved);
        })
        //.then(onFulfilled => {
        //    console.log(onFulfilled);
        //    return inputMgr.getUserInput();            
        //})
        .then(userInput => {
            var cardChoice = player.hand[userInput];
            var cardName = cardChoice.getCardName();
            console.log(cardName);
            removeInputListener();
            // playCard(pos, cardChoice);
            cardToBoard.user = cardChoice;
            player.hand.splice(userInput, 1);
            displayPlayerHand(player);        // show new hand after play, remove this when cardsLayer becomes active 
            resolve(cardChoice);
        })
        .catch(err => console.log(err));
    });  
}   

/**
 * 
 * @param {*} called Card 
 * @param {*} computerHand Players.Hand 
 */
function computerPlayTurn(computer, opponentCard) {  // run the 'thinking animation'
return new Promise(function (resolve, reject) {
    var position = "top";
    var i = Math.floor(Math.random() * computer.hand.length);
    if (opponentCard == null) {
        //  play highest random card (thats not trump or ten)
        // playCard(position, computer.hand[i]);
        cardToBoard.computer = computer.hand[i];
        computer.hand.splice(computer.hand[i], 1);
        resolve(computer.hand[i]);
    } else {
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
    return new Promise(function(resolve){
        if (called.suit === played.suit) {
            if (called.rank > played.rank) {
                win = called;       // replace console.log with msgboard text
            } else { 
                win = played;
            }
        } else if (played.suit === deck.trump.suit) {
            win=played;
        } else {
            win=called;
        }
       // console.log(win);
        resolve(win);
    });
}

//  Points associated with KickCard
function kickPoints(card) {
    switch (card.face) {
        case 'a':
            return 1;
        case '6':
            return 2;             
        case 'j':
            return 3;
        default:
            return 0;
    }
}

function countForGame(player) {
    var points=0;
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

/*  create the players  */
const computer = new Player();        // --> Team A
const human = new Player();           // --> Team B

/*  create and initialize players   */
function _initializePlayers() {
    computer.init();          
    human.init();
    computer.name=PLAYER1_NAME;
    human.name=PLAYER2_NAME;
    var playerArr = [computer, human];
    return playerArr;                // an array of ALL game players
}

/**
 *  to make sure all the games assets are fully loaded before the game runs
 *  this will be handled by game-loader.js in the final version
 */
function loadGameAssets() {         // initialize all game objects
    //  from classes & constructor functions
    var gameObjectsArr = _initializePlayers();
    //  load objects
    msgboard.init();
    deck.init();               // load all images into cache array
    cardToBoard.init();        // game play cards cache for display
    //  graphical objects
    _initializeScreens();       
    return gameObjectsArr;
}
/*  INITIALIZE GRAPHICS OBJECTS */
function _initializeScreens() {
    let s0 = Promise.resolve(gameBoard.init());           // screens[0] = gameBoard;
    // let s1 = Promise.resolve(scoreLayer.init());       // screens[1] = scoreLayer;
    // let s2 = Promise.resolve(cardsLayer.init());       // screens[2] = cardsLayer;
    let s3 = Promise.resolve(msgLayer.init());         // screens[3] = msgLayer;
    //Promise.all(s0, s1, s2, s3).then((screens) => {
     //   return screens;
    //});
}

function loadScreenCache() {
    var screens = [];
    screens[0] = gameBoard;
    // screens[1] = scoreLayer;
    // screens[2] = cardsLayer;
    screens[3] = msgLayer;
}

function updateMsgScreen() {
    if (msgboard.visible === true) {                       // if message object is true, then
        message();                                          // call the msg box function 
    // } else {
        // msgLayer.clear();
    }
}

function displayUserCard() {
    playCard('bottom', cardToBoard.user);
}

function displayComputerCard() {
    playCard('top', cardToBoard.computer);
}

function updateGameScreen() {
    displayScore(computer, human);
    if (deck.trump) {
        displayTrump(deck.trump);
    }
    if (human.hand) {
        displayPlayerHand(human);
    }
    if (cardToBoard.user) {
        displayUserCard();
    }
    if (cardToBoard.computer) {
        displayComputerCard();
    }
}


function _drawMsgScreen() {
    msgLayer.clear();
    updateMsgScreen();
}

function _drawGameBoard() {
    gameBoard.clear();
    updateGameScreen();
}


/*
function gWaitState() {
    // pass;
}

function _drawCardScreen() {
    cardLayer.clear();
    updateCardScreen();
}

function updateCardScreen() {
            displayTrump(deck.trump);
    }
    if (human.hand) {
        displayPlayerHand(human);
    }
    if (cardToBoard.user) {
        displayUserCard();
    }
    if (cardToBoard.computer) {
        displayComputerCard();
    }
}

function cardsScreen() {
    displayPlayerHand(human);
    displayTrump(deck.trump);
    // displayPlayedCards()
}

function _drawScoreLayer() {
    scoreLayer.refresh(scoreScreen);
}

function _drawCardsLayer() {
    cardsLayer.refresh(cardsScreen);
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

/** 
*   repeat game rounds until  a player gets 14 points or quit() ==> ESC key (do - while loop)
*   @param: null
*   @return: void
*/
async function mainGameLoop() {
    var gObjectArr = loadGameAssets();              // passes an array of all game object 
    //_initializeScreens();
    // _loadObjects from .JSON files
    // _loadGameSettings from .JSON files   
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
    /*  point awards    */
    const HIGH = 1;
    const LOW = 1;
    const GAME = 1;
    const JACK = 1;
    const HANG_JACK = 3;


    var dealer = human;              // assign dealer --> 1st Jack deal
   // _renderScreens();                   // display all graphics before the game loops

    // gameRoundLoop:           --> Loop until human.points || computer.points >= 14
    // firstJackDeal(); 
        if (dealer == human) {
            dealer = computer;
        } else { 
            dealer = human;
        }
        deck.shuffle();
        deck.deal(human, computer);
        //displayTrump(deck.trump);    // TODO: KICKCARD points => 'j' = 3, '6' = 2, 'a' = 1.
        //displayPlayerHand(human); //.then(mouseEventHandler()); // then setUserInput
        dealer.points += kickPoints(deck.trump);
        //UPDATE score --> 
        //score.clear();
        //score.update(computer.points, human.points);
        //displayScore(computer, human);
        var winner = human;  // since human dealt fisrt eventually write a subroutine for "first jack deal"
        var playedCard;     // add playedBy attribute
        var calledCard;     // add playedBy attribute
        //Round Play Loop:      --> Loop until player.hand.length == 0
        for (var i=human.hand.length; i>1; i--) {
      
            if (winner == computer) {               // if winner = computer, then computer plays first and vice-versa
                calledCard = computerPlayTurn(computer, null);
                    humanPlayTurn(human)
                    .then((card) => {
                        playedCard = card;
                        return determineWinner(calledCard, playedCard);
                    })
                    .then((higherCard) => {
                        if (higherCard == calledCard) {
                            winner = computer;
                        } else {
                            winner = human;
                        }
                        let winnerName = winner.name;
                        console.log(winnerName, + ' Wins!');      // add msg box
                        msgboard.text = winnerName + " Won!!!";
                        msgboard.visible = true;
                        winner.lift.push(calledCard, playedCard);
                        let delayTwoSec = setTimeout(function () {
                            cardToBoard.init();
                        }, 2000);
                        console.log('END OF ROUND!!!');
                    })
                    .catch(err => console.log(err));
                } else {                   // if winner = human, then human plays first
                msgboard.text = "Your turn. Please select a card.";
                msgboard.visible = true;
                    humanPlayTurn(human)
                    .then((resolvedCard) => {
                        calledCard = resolvedCard;
                        playedCard = computerPlayTurn(computer, calledCard);
                        return determineWinner(calledCard, playedCard);
                    })
                    .then((winningCard) => {
                        if (winningCard == playedCard) {
                            winner = computer;
                        } else {
                            winner = human;
                        }
                        let winnerName = winner.name;
                        console.log(winnerName, + ' Wins!');      
                        msgboard.text = winnerName + " Won!!!";
                        msgboard.visible = true;
                        winner.lift.push(calledCard, playedCard);
                        setTimeout(function () {
                            cardToBoard.init();
                        }, 2000);
                        console.log('END OF ROUND!!!');
                    })
                    .catch(err => console.log(err));                  
                }
            }    
        

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

                                                                    /*  Distribute points   */
            // rank_lowest_trump --> player += LOW
            function whoPlayedLow() {
                //  pass;
                //  return Player;
            }

            // rank_highest_trump --> player += HIGH
            function whoPlayedHigh() {
                let highestHumanTrumpCard = null;
                let highestComputerTrumpCard = null;
                for (var eachCard in human.lift) {
                    if (eachCard.suit === deck.trump.suit && highestHumanTrumpCard.rank < eachCard.rank){
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
            //whoPlayedHigh.points += HIGH;

            // jack of trump --> player += JACK
            function whoPlayedJack() {
                //  pass;
                //  return Player;
            }
            //whoPlayedJack.points += JACK;

            // Hang Jack --> player.points += HANG_JACK
            function isHangJack(playedCard, calledCard) {
                if (playedCard.suit === deck.trump.suit && (playedCard.face = 'j' || calledCard.face === 'j')) {
                    if (playedCard.rank > 9 || calledCard.rank > 9) {           // rank of jack = 9, (check)
                        return true;
                    } else {
                        return false;
                    }                  
                } else {
                    return false;
                }
            }

            console.log("END OF GAME!!!");
            //          GARBAGE COLLECTION
                    // clear setTimeouts and setIntervals, remove Event Listeners etc.
            //          QUIT FUNCTION --> ESC or 'X' --> confirm exit window
}
            // while (human.hand.length && computer.hand.length > 0)

                
            //}            

            // TODO: 
        // }
        // DISTRIBUTE POINTS: hi, low, jack, game, hangjack
//    }
        /*
        // assessPoints()       // hi, low, jack, game 
    } 
    while (human.points || computer.points < 14);    */

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
 