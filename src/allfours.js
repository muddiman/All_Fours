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
 *  @version   0.4.3
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
  *     Alpha:  Completed Functional/playable/useable Program w/most of the final features included
  *     Beta:   Completed Program w/ALL of the features included, bug-fixes found in alpha version
  *     Release Candidate: Final version of game, all bugs found in beta, fixed. released to select segment of the public
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
/* game board dimensions */
const WIDTH=700;    //use window.innerWidth;  for fullscreen gaming
const HEIGHT=450;   //use window.innerHeight; for fullscreen gaming
const CARDW=72;     // card width
const CARDH=96;     // card height

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
        // this.frameNo =0;
        // this.interval = setInterval(updateGameArea, 20);
    },
    // if 'setInterval is used, there should be stop function
    // stop : function () {clearInterval(this.interval);}
    clearBoard : function () {
    // wipes the entire gameBoard clean
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

/**
 * TEST: if game board is created on positioned correctly in the DOM
 * @param null
 * @returns void 
 */
function unitTestForGameBoard() {
// @test: if game board is created in intended place in the DOM
// @param: null
// @return: void  
    gameBoard.init();
    var x = gameBoard.ctx;
    x.fillStyle= "#FF0000"; 
    x.fillRect(0,0, 150,75);
    gameBoard.clearBoard();
}
/*
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
// var gCachedAssets = {};

function Card(rank, face, suit) {
// Card object constructor (game components are usually created writing a constructor for each type of component)
    this.suit = suit; // ['c', 'd', 'h', 's'],  MAX_SUITS=4
    this.face = face; // ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'],     MAX_FACES=13
    this.rank = rank;     // [0, 1,.. 12], to assist in determining who played the higher card
    this.getCardName = function () {
                            return this.face + this.suit; // used as cardId, image filename, etc    MAX_CHARACTERS=2
                        };
    this.image = new Image();
    // this.image.listen = this.image.addEventListener('click', this.onMouseClick);
    // this.image.stopListen = this.image.removeEventListener('click', this.onMouseClick);

    this.image.onload = console.log(this.getCardName() +' loaded');      // image creation callback function (to be changed into a useful function)

                            // this.image.addEventListener('click', this.onMouseClick);
                            // this.image.addEventListener('load', () => {console.log(this.getCardName +' loaded');});
                        
    this.image.id = this.getCardName();
    this.image.src = "img/" + this.getCardName() + ".png";
    // write new card.functions as needed, ie update function & location function
}

/**
 * @test: all properties of the Card object are initialized 
 * @param: null 
 * @return: void
 */
function unitTestForCardObjects() {
    var x = gameBoard.ctx;
    var r = 0; // r:rank => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    var f = 2; // f:face => [2, 3, 4, 5, 6, 7, 8, 9, t, j,  q,  k,  a]
    var s = 'c'; // s:suit => ['c', 's', 'd', 'h']
    try {
        var aCard = new Card(r,f,s);
        x.drawImage(aCard.image, 5,5);
        console.log({aCard}); 
    } catch (err) {
        console.log(err.name + ': ', err.message);
        console.log('Unit Test: Failed.');
    }
}

/**
 * UNIT TEST
 * @param: params, expected
 * @return: void
 *
var results = {
    bad     : 0,
    total   : 0,
};

function unittest(params, expected) {
    results.total++;
    var capturedResult = function(params);
    if (capturedResult != expected) {
        results.bad++;
        console.log("Test failed: Did not return expected result");
        console.log("Expected: " + expected + ", Function returned: " + capturedResult);
    }
}
*/


/*
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
 function Player() {    // change to "Team" when coding the 4-player version: function Team(playerA, playerB)
     this.hand = [];    // MAX_CARDS_IN_HAND=12;
     this.points = 0;   // MAX_POINTS=14;
     this.lift = [];    // MAX_CARDS_IN_LIFT=48;
     this.name = "";    // MAX_CHARACTERS=12;
     //this.player1 = playerA;
     //this.player2 = playerB;
     //this.team = "";
     //this.setPlayerName = function (name) {this.name = name;}
     //this.setPlayerTeam = function (team) {this.team = team;}
 }

/**
 * @test: the deck-array. All 52 unique card objects, with all their parameters
 * @param: null
 * @return: void
 */
function unitTestForDeckArray() {
    var deck = createDeck();
    for (i = 0; i < 52; i++) {
        setTimeout(function (i) {
            console.log(i); 
            var aCard = deck[i];
            var x = gameBoard.ctx;
            x.drawImage(aCard.image, 100,100);
            console.log(aCard.face + aCard.suit);
            console.log(aCard.rank + "."+aCard.getCardName() + "."+aCard.image.src);
        }, 1500);
    };
}

/**  
 * place a card on the gameBoard
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

/**
 * @test: pass random card into playCard @param 
 * @param: null
 * @returns: void
 */
function unitTestForPlayCard() {
    var n = Math.floor(Math.random() * 52);
    // var deck = createDeck();
    var randomCard = deck.cards[n];
    playCard("left", randomCard);
    playCard("top", randomCard);
    playCard("right", randomCard);
    playCard("bottom", randomCard);
}

function testgetCoords() {
    gameBoard.canvas.addEventListener("click", function (event) {
        var x=event.clientX; // x-20=0 on game board; 155 - 400
        var y=event.clientY; // y is much more flexible;    350 + 96
        console.log(x);
        console.log(y);
    });

}


/**
 *      captures clicks, and stores the position in the userInput object
 */
function mouseEventHandler() {
    document.getElementById('game_board').addEventListener('click', function (e) {
        var x = e.clientX;      // click location
        var y = e.clientY;
        var posArr = [x,y];     // position array
        // console.log(posArr);
        inputMgr.setUserInput(posArr).then(function (resolve) {
            inputMgr.updateSelection();
            console.log(resolve);  
        }).catch(function(reject) {
            console.log(reject);
        }); 
    });
}

function touchEventHandler(){
    document.getElementById('game_board').addEventListener('touch', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        var posArr = [x,y];     // position array
        // console.log(posArr);
        inputMgr.setUserInput(posArr).then(function (resolve) {
            inputMgr.updateSelection();
            console.log(resolve);  
        }).catch(function(reject) {
            console.log(reject);
        }); 
    });    
}

/**
 *  handles user Input is an Object
 */ 
var inputMgr = {
    clickPosition:      null,
    cardSelection:      null,
    init:               function () {
                            this.updateSelection();
                        },
    setUserInput:       function (pos) { 
                            return new Promise(function (resolve, reject) { 
                                console.log(pos);
                                this.clickPosition = pos;        // stores the user's position from mouse event handler into memory
                                if (this.clickPosition ==null) {
                                    reject('Error: Could not register position');    
                                } else {
                                    resolve('Position Saved!');
                                }
                            });
                           
                        },
    getUserInput:       function () {
                            return new Promise (function (resolve, reject) {
                                if (this.cardSelection !=null) {
                                    resolve(this.cardSelection);    // retrieves user's stored selection from memory
                                } else {
                                    reject('Error: Could not retrieve selected a card!'); // change to an Error Object
                                }      
                            });
                        },
    updateSelection:    function () {                       //  updates the user selected card every 200ms (5x per sec)
                            setInterval(this.getCardSelection, 200);
                        },
    getCardSelection:   function () {
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
                        console.log(n);
    },
};



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


function displayUserHand(player) {
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

/**
 * @test: displays the trump card and prints cardFace & cardSuit in console
 * @param: null 
 * @return: void
 */
function unitTestForDisplayTrump() {
    var n = Math.floor(Math.random() * 52); // randomize trump card
    var trumpCard = deck.cards[n];
    console.log(trumpCard.face);
    console.log(trumpCard.suit);
    displayTrump(trumpCard);
}

/**
 * Displays the score in the top right corner of the game board
 * @param: null
 * @returns: void
 */

var scoreboard = {
    teamA : 0,
    teamB : 0,
    init : function () {
        this.teamA = 0;
        this.teamB = 0;
    },
    update : function (teamApoints, teamBpoints) {
        this.teamA = this.teamA + teamApoints;
        this.teamB = this.teamB + teamBpoints;
    },
    display : function () {
        displayScoreboard(this.teamA, this.teamB);
    },
    clear : function () {
        // wipes the scoreboard clean
        var c = gameBoard.canvas;
        var x = gameBoard.ctx;
        x.clearRect(c.width - 335, 15, 260, 120);
    }
};

function message() {
    var c=gameBoard.ctx;
    c.beginPath();
    c.lineWidth = 2;
    c.strokeStyle = "white";
    c.rect(170,100, 400, 200);
    c.stroke();
    c.globalAlpha=0.4;
    c.fillStyle="#252525";  // black
    c.fillRect(170,100, 400,200);
    // c.globalAlpha=0.1;
    c.font = "50px Arial";
    c.fillStyle = "#ffffff";    // white
    c.fillText("HANG JACK!!!", 200, 200);
    
    // c.scale(0.5, 0.5);
    // c.rotate(100*Math.PI/180);
    // rgba 0.8
}

function cleanBoard() {
    var c=gameBoard.ctx;
    gameBoard.clearBoard();
    // c.clearRect(170, 100, 400, 200);
}

/**
 * draws scoreboard on the gameboard
 * @param {*} a Team A's current score - int
 * @param {*} b Team B's current score - int
 * @returns void
 */
function displayScoreboard(a, b) {
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
    x.fillText("Team A:", upperLeftCornerX + 15, 40);
    x.fillText("Team B:", upperLeftCornerX + 15, 105);
    // score tiles (numbers)
    x.fillText(a, upperLeftCornerX + 215, 40);
    x.fillText(b, upperLeftCornerX + 215, 105);
}

/**
 * @test: tests the scoreboard object
 * @param: null
 * @returns: void
 */
function unitTestForScoreboardObj() {
    var pause;
    scoreboard.init();
    try {       
        console.log(scoreboard.teamA);
        console.log(scoreboard.teamB);
    }
    catch(err) {
        console.log("Scoreboard not initializing");
    } 
    
    scoreboard.display();
    try {
        pause = setTimeout(scoreboard.clear(), 5000);
    }
    catch(err) {
        console.log(err);
    }
    try {
        scoreboard.update(3, 6);
        console.log(scoreboard.teamA);
        console.log(scoreboard.teamB);
    }
    catch(err){
        console.log(err);
    }
    scoreboard.display();
    pause;
    scoreboard.update(8, 5);
    console.log(scoreboard.teamA);
    console.log(scoreboard.teamB);
    scoreboard.display();
    clearTimeout(pause);
}

/**
 * 
 * @param {*} human.hand  the human player's hand (array of cards)
 * @returns card or null
 */  
function humanPlayTurn(humanHand) {
    return new Promise(function(resolve,reject) {
        var pos = 'bottom';         // Player 1 always play bottom of center 
        inputMgr.getUserInput().then(function(result) {
            var cardChoice = humanHand[result];
            playCard(pos, cardChoice);
            resolve(cardChoice);
        }).catch(function(error) {
            console.log(error);
            reject(error);
        });
    });  
}   



function unitTestForHumanPlayTurn() {
    var android = new Player();
    var test = "";
    var expected_value = 5;
    var i;
    for (i = 0; i < android.hand.length; i++) {
        hand[i] = deck.cards;
    }
    // Error handling code
    humanPlayTurn(android);
    if (android.hand.length === expected_value) {
        test = "Pass";
    } else {
        test = "Fail";
    }
    console.log(Test);
}

/**
 * 
 * @param {*} called Card 
 * @param {*} computerHand Players.Hand 
 */
function computerPlayTurn(computerHand) {
//play same suit
console.log({computerHand});
//console.log({calledCard});
var chosenCard, calledCard;
var i;
var n;
/* for (i = 0; i < computerHand.length; i++) {
    if (computerHand[i].suit === calledCard.suit) {
        chosenCard = computerHand[i];
        // delete computerHand[i];
        playCard('top',chosenCard);
        return chosenCard;
    }
} // play any card
*/
n = Math.floor(Math.random() * 6);
chosenCard = computerHand[n];
// delete computerHand[n];
playCard('top',chosenCard);
return chosenCard;
}

function determineWinner(called, played) {
// determines who played the higher rank in called suit or trump
// parameters: called and played card objects
// return: player (who won)
// pause
    return new Promise(function(resolve){
        if (called.suit === played.suit) {
            if (called.rank > played.rank) {
                msgs = 'Player 1 wins!'; // replace console.log with canvas text
            } else { 
                msgs ='Player 2 wins!';
            }
        } else if (played.suit === deck.trump.suit) {
            msgs='Player 2 wins!';
        } else {
            msgs='Player 1 wins!';
        }
        resolve(console.log(msgs));
    });
}

 /**
  * OBJECTS
  */
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
 *  to make sure all the games assets are fully loaded before the game runs
 *  this will be handled by game-loader.js in the final version
 */
async function loadGameAssets() {
    await gameBoard.init();
    await scoreboard.init();
    await scoreboard.display();
    await deck.init();
    // await inputMgr.init();
}

 /** 
*   repeat game rounds until  a player gets 14 points or quit() ==> ESC key (do - while loop)
*   @param: null
*   @return: void
*/
async function mainGameLoop() {

/*  mainGameLoop:        
     Deal subroutine: shuffle, cut, distribute
     gameLoop:
            playedRoundLoop: 
                players play cards: 
                determineWinner()
            countForGame()
//          assessPoints(): high, low, jack, game, hangJack
*/

    // read game settings from .JSON FILE
    // var player1Hand = getHand(theDeck, 0);
    var computer = new Player();
    var human = new Player();
    computer.name='Computer';
    human.name='Roger';

        deck.shuffle();
        deck.deal(human, computer);
        // displayHand(human);
        displayUserHand(human).then(mouseEventHandler()); // then setUserInput
        displayTrump(deck.trump);    // TODO: KICKCARD points => 'j' = 3, '6' = 2, 'a' = 1.
        // dealer.points = kickcardPoints
        var winner = human;  // eventually write a subroutine for "first jack deal"
        //gameRoundLoop:
       // while (human.hand.length > 0) {
            var playedCard;     // add playedBy attribute
            var calledCard;     // add playedBy attribute
            // winner plays first 
            //if (winner === human) {
           // while (!calledCard) {
                //setTimeout({}, 100);
            //}
              //  calledCard = humanPlayTurn(human.hand); // make program wait for input
                
               // playedCard = computerPlayTurn(calledCard, computer.hand);
           // } else {
               /*
                do {
                    if (winner == human) {
                        humanPlayTurn(human.hand).then(function (resolvedCard){
                            calledCard = resolvedCard;
                            return computerPlayTurn(computer.hand);
                        }).then(function (returnedCard) {
                            playedCard = returnedCard; 
                            return determineWinner(calledCard, playedCard);
                        }).then(function (resolvedPlayer) {
                            winner = resolvedPlayer; 
                            winner.lift.push(calledCard, playedCard);
                            msgBoard = winner + " won!";
                            message(msgBoard);
                            setTimeout(function () {
                                clearBoard;
                            }, 3000);
                        });
                    } else {
                        computerPlayTurn(computer.hand).then(function (resolvedCard){
                            calledCard = resolvedCard;
                            return humanPlayTurn(human.hand);
                        }).then(function (returnedCard) {
                            playedCard = returnedCard; 
                            return determineWinner(calledCard, playedCard);
                        }).then(function (resolvedPlayer) {
                            winner = resolvedPlayer; 
                            winner.lift.push(calledCard, playedCard);
                            msgBoard = winner + " won!";
                            message(msgBoard);
                            setTimeout(function () {
                                clearBoard;
                            }, 3000);
                        });
                    }
                } while (human.hand.length > 0);
               */
            calledCard = computerPlayTurn(computer.hand);
            setTimeout(function () {
                winner = humanPlayTurn(human.hand).then(function(resolve){
                    return determineWinner(calledCard, resolve);
                }).then(function(resolve) {
                    console.log(resolve.name, + ' Wins!');
                    winner.lift.push(calledCard, playedCard);
                    console.log('END OF GAME!!!');
                });
            }, 5000);
            //     
                
            //}
            // winner = await determineWinner(calledCard, playedCard); // winner: Player object
            

            // TODO: 
        // }
        // DISTRIBUTE POINTS: hi, low, jack, game, hangjack
        // human.lift > computer.lift;
    }
        /*
        function calcGame(Player.lift) {
            return score;
        }

        while (Cards in lift);
        // calcGame()
        // assessPoints()       // hi, low, jack, game 
    } 
    while (humanPoints || computerPoints < 14);    */

/*
Libs:
BackEnd:
    Engine (server side)
    AI Library
FrontEnd:
    Display Library
    Testing Library
*/

  /* 
            break up the "mainGameLoop" into separate modules (functions)
            and call each one separately, and sequentially... noting its
            completion from the console. 
  */
