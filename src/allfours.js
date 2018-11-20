/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode                             
*/

/**
 *  @copyright (c) 2018 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com (OR: https://www.muddicode.com)
 *  @version   1.0
 *  @since     2018-10-1
 *  @license   Dual license - MIT & GPL
 *  @See:      http://www.gnu.org/licenses/gpl.html
 *             http://www.mit.edu/license
 */

/*
   Major Elements of A Game:
   I. Setup Game
   II. Game Loop:
        1. Poll and handle elements
        2. Update game elements
        3. Draw Surface
        4. Show Surface
   III. Shut Down Game 
*/

/*  Programming Note:
    Because the fisrt letter of every suit AND face of all cards are unique letters
    i can simplify the id of each card to a 'two-letter' string.
    ie: ace of heart is simply 'ah', ten of clubs is 'tc' and nine of diamonds is '9d'
    This simplifies coding tremendously. All filenames of card images were adjusted accordingly. ie: 2d.png is the 'two of diamonds' image file.
*/

/* the globals */
// NONE

var gameBoard = {
//  Object: gameBoard
    canvas : document.createElement("canvas"), 
    init : function () {
    // initialize gameBoard by applying context & inserting the canvas in the "game_container" <div> 
        this.canvas.width = 700;
        this.canvas.height = 450;
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

/** 
 * ask if player wishes to play All Fours
 * @param null
 * @returns void
 *
function startAsk() {
    if (confirm("Click 'OK' to play All Fours or 'Cancel' to exit game.")) {
        game.quit = false;
        mainGameLoop();
    } else {
        quit = true;
    }
}
*/


function Card(rank, face, suit) {
// Card object constructor (game components are usually created writing a constructor for each type of component)
    this.suit = suit; // ['c', 'd', 'h', 's'],
    this.face = face; // ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'],
    this.rank = rank;     // [0, 1,.. 12], to assist in determining who played the higher card
    this.getCardName = function () {
        return this.face + this.suit; // used as cardId, image filename, etc
    };
    this.image = new Image();
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

 /**
  *     Player object constructor (or class)
  *     
  */
 function Player() {    // change to "Team" when coding the 4-player version: function Team(playerA, playerB)
     this.hand = [];
     this.points = 0;
     this.lift = [];
     //this.player1 = playerA;
     //this.player2 = playerB;
     //this.team = "";
     //this.setPlayerName = function (name) {this.name = name;}
     //this.setPlayerTeam = function (team) {this.team = team;}
 }

/**
 * @param: null 
 * @return: deck
 *
function createDeck() {
    var suits = ['c', 'd', 'h', 's'];
    var faces = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'];
    var n = 0;
    var deck = [];
    for (y = 0; y < suits.length; y++)  {
        var rank = 1;
        for (x = 0; x < faces.length; x++) {
            deck[n] = new Card(rank, faces[x], suits[y]);
            n++;
            rank++;
        }
    }
    return deck;
}
*/

/**
 * @test: the deck-array. All 52 unique card objects, with all their parameters
 * @param: null
 * @return: void
 */
function unitTestForDeckArray() {
    var deck = createDeck();
    for (i = 0; i < 52; i++) {
        setTimeout(function () {
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
 * @param: null
 * @returns: void 
 *
function cardDisplay() {
// test function to display cards on game board

    var img1 = document.getElementById("kingHearts");
    var img2 = document.getElementById("jackDiamonds");
    gameBoard.ctx.drawImage(img1, xCenter-60, yCenter-30);
    gameBoard.ctx.drawImage(img2, xCenter-40, yCenter-50);
    gameBoard.ctx.drawImage(img1, xCenter-20, yCenter-30);
    gameBoard.ctx.drawImage(img2, xCenter-40, yCenter-10);
    // img.moveTo(100,100);
    animate_card();
}
*/

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
    // remove cardId (card object) from hand & DOM (<div>), if it is there
    if (card.image.parentNode === document.getElementById("tophand")) {
        card.image.parentNode.removeChild(card.image);
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
/**
 * displays card in specified hand (HTML <div>) on webpage inside the game control panel
 * @param {*} card object
 * @param {*} hand_div html <div> where the cards will be displayed
 */
function loadCard(card, hand_div) {
    var x1 = document.createElement("a");
    x1.href = "#";
    x1.appendChild(card.image);
    hand_div.appendChild(x1);
    //x2.setAttribute("onclick", "playCard('left', '" + card.getCardName() + "')");
    //var y = element.appendChild(x1); 
    //y.appendChild(x2);
}

/**
 * @param {*} deck 
 * @param {*} n 
 * @returns {Array} cards
 *
function getHand(deck, n) {
    // gets the next 3 cards from the deck
    // temporary function just to get the game to work
    // TODO: Randomize the deck. ie: return random cards.
    // parameters: deck of cards ie array of cards
    // return: and array of 3 cards.
    var three_cards = [deck[n], deck[n+1], deck[n+2]];  
    return three_cards;  
}
*/

/**
 * sends the cards to be loaded onto the DOM, Player 1 section ("tophand" <div>)
 * @param {*} player 
 * @returns void
 */
function displayHand(player) {
    // parameters: pos - <div> id in the control panel ie: tophand, bottomhand, firstbeg & secondbeg, cards - array of 3 cards
    for (i = 0; i < player.hand.length; i++) {
        loadCard(player.hand[i], document.getElementById("tophand")); 
    }
}

/**
 * Displays the kickcard/trump in the top left corner of the gameboard
 * @param {*} trump -Card
 * @returns void 
 */
function displayTrump(trump) {
    gameBoard.ctx.drawImage(trump.image, 5, 5);
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

function displayScoreboard(a, b) {
    // draws scoreboard on the gameboard
    // draw rectangle border
    var c = gameBoard.canvas;
    var x = gameBoard.ctx;
    x.beginPath();
    x.lineWidth = 8;
    x.strokeStyle = "red";
    x.rect(c.width - 335, 15, 260, 120);
    x.stroke(); 
    // fill rectangle
    x.fillStyle = "#993399";
    x.fillRect(c.width - 335, 15, 260, 120);
    // write in rectangle
    x.fillStyle = "#ffffff";
    x.font = "30px Arial";
    x.fillText("Team A:", c.width - 320, 50);
    x.fillText("Team B:", c.width - 320, 115);
    // score tiles
    x.fillText(a, c.width - 140, 50);
    x.fillText(b, c.width - 140, 115);
}

/**
 * @test: tests the scoreboard object
 * @param: null
 * @returns: void
 */
function unitTestForScoreboardObj() {
    scoreboard.init();
    try {       
        console.log(scoreboard.teamA);
        console.log(scoreboard.teamB);
    }
    catch(err) {
        console.log("Scoreboard not initializing");
    }; 
    
    scoreboard.display();
    try {
        var pause = setTimeout(scoreboard.clear(), 50000);
    }
    catch(err) {
        console.log(err);
    };
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
    scoreboard.update(8, 5)
    console.log(scoreboard.teamA);
    console.log(scoreboard.teamB);
    scoreboard.display();
    clearTimeout(pause);
}

//  
function humanPlayTurn(human) {
// waits for player to select a card to play by clicking on it
// parameters: hand, array of cards
// return: void
    /* display card on board (playCard) and returns card
    // Get the modal
    var modal = document.getElementById('id01');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}       listens for card to be clicked on
        gets the id of card clicked 
        plays card in player spot 
    */
    // var cardId = event.target.id;
    var capture;
    var id = "";
    var pos = 'bottom'; // Player 1 always play left of center
    document.getElementById('tophand').addEventListener("click", function () {
        capture = event.target;
        id = capture.getAttributeNode("id").value;
        var i;
        for (i = 0; i < human.hand.length; i++) {
            if (human.hand[i].image.id === id) {
                playCard(pos, human.hand[i]);
                capture.parentNode.removeChild(capture);
                delete human.hand[i];
                break;
            }
        }
    });
    // stop listening
    return human.hand;
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
 
function computerPlayTurn(computerHand) {
//consults computer AI and selects a card to play
    computerAI(hand);
    return card;
}

function determineWinner(called, played) {
// determines who played the higher rank in called suit or trump
// parameters: called and played card objects
// return: player (who won)
    if (called.suit === played.suit) {
        if (called.rank > played.rank) {
            return console.log('Player 1 wins!');
        } else { 
            return console.log('Player 2 wins!');
        }
    }
    if (played.suit === deck.trump.suit) {
        return console.log('Player 2 wins!');
    } else {
        return console.log('Player 1 wins!');
    }
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
*   repeat game rounds until  a player gets 14 points or quit() ==> ESC key (do - while loop)
*   @param: null
*   @return: void
*/
function mainGameLoop() {

/*  mainGameLoop:        
     Deal subroutine: shuffle, cut, distribute
     gameLoop:
            playedRoundLoop: 
                players play cards: 
                determineWinner()
            countForGame()
//          assessPoints(): high, low, jack, game, hangJack
*/
    // var player1Hand = getHand(theDeck, 0);
    var computer = new Player();
    var human = new Player();

    gameBoard.init();
    scoreboard.init();
    scoreboard.display();
    // var dealer = human;
    //do {
    //gameLoop:
        // if (dealer === computer) {dealer = human;} else {dealer = computer;}
        deck.init();
        deck.shuffle();
        deck.deal(human, computer);
        displayHand(human);

        displayTrump(deck.trump); // TODO: KICKCARD points => 'j' = 3, '6' = 2, 'a' = 1.
        // dealer.points = kickcardPoints
        var winner = human;
        //gameRoundLoop:
        while (human.hand.length > 0) {
            var playedCard;
            var calledCard;
            // winner plays first 
            if (winner === human) {
                calledCard = humanPlayTurn(human);
                playedCard = computerPlayTurn(computer);
            } else {
                calledCard = computerPlayTurn(computer);
                playedCard = humanPlayTurn(computer);
            }
            winner = determineWinner(calledCard, playedCard); // winner: Player object
            winner.lift = calledCard + playedCard;
            // TODO: write computerPlayTurn
        }
        // DETERMINE POINTS: hi, low, jack, game, hangjack
        // human.lift > computer.lift;
    }
        /*
        dealHand('tophand', player1Hand);
        var computer1Hand = getHand(theDeck, 3);
        player1Hand = getHand(theDeck, 6);
        dealHand('bottomhand', getHand(theDeck, 6));
        computer1Hand = getHand(theDeck, 9);
        var kickcard = theDeck[12]; // kickcard gets the next card from the deck after all hands has been dealt
        displayTrump(kickcard);           
        //playedRoundLoop:
        do { // do-while loop
            /* if (winner === computer) {
                callCard = computerPlayedCard();
            } else {
                callCard = humanPlayedCard();
            }
            //var callCard = humanPlayTurn(player1Hand);
            humanPlayedCard = humanSelectCard();
                computerPlayedCard = computerAI();
                determineWinner(); // returns winner
                if (winner === human) {
                    playerLift = callCard + playedCard;
                } else {
                    computerLift = callCard + playedCard;
                }

            
            humanPlayTurn(humanHand);
            var playedCard = computerPlayTurn(computer1Hand);
            determineWinner(callCard, playedCard);
            /* if (player1 == determinWnner(callCard, playedCard)) {
                    player1Lift = callCard + playedCard;
                } else {
                    computerLift = callCard + playedCard;
            }; 
        } 
        while (player1Hand != null);
        // calcGame()
        // assessPoints() 
    } 
    while (humanPoints || computerPoints < 14);    */



/* var x = 10;
var y = 10;
var dx = 4;
var dy = 4;
function animate_card() {
    requestAnimationFrame(animate_card);
    gameBoard.ctx.clearRect(0, 0, c.width, gameHeight);
    gameBoard.ctx.beginPath();
    gameBoard.ctx.drawImage(img, x, y);
    gameBoard.ctx.stroke();
    x += dx;
    y += dy;
} */
 // Build the page using javascript only


     
