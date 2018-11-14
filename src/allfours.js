/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode                             
*/

/**
 *  @author: Roger Clarke (muddiman | .muddicode)
 *      see: https://www.roger-clarke.com
 *  @license: Dual license - MIT & GPL
 *       See: http://www.gnu.org/licenses/gpl.html
 *            http://www.
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

var gameBoard = {
//  Object: gameBoard
    canvas : document.createElement("canvas"), 
    // ctx : this.canvas.getContext("2d"),
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

/* the globals */
var xCenter = gameBoard.width/2;
var yCenter = gameBoard.height/2;


/** 
 * ask if player wishes to play All Fours
 * @param: null
 * @returns: void
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
    var aCard = new Card(0,2,'c');
    var x = gameBoard.ctx;
    x.drawImage(aCard.image, 5,5);
    console.log(aCard.face + aCard.suit);
    console.log(aCard.rank + "."+aCard.getCardName() + "."+aCard.image.src);
}

/**
 * @param: null 
 * @return: deck
 */
function createDeck() {
    var suits = ['c', 'd', 'h', 's'];
    var faces = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a']
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
 */
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

/**  
 * place a card on the gameBoard
 * @param: postion (relative to center) of the gameBoard, Id of the card object
 * Note: use card object instead; get the Id from card.getCardName function
 * @returns: void
*/
function playCard(playPosition, cardId) {
    /* var c = document.getElementById("game_board");
    var gameBoard.ctx = c.getContext("2d"); */
    var cardImg = document.getElementById(cardId); 
    switch (playPosition) {
        case "left":
            gameBoard.ctx.drawImage(cardImg, xCenter-60, yCenter-30);
            break;
        case "top":
            gameBoard.ctx.drawImage(cardImg, xCenter-40, yCenter-50);
            break;
        case "right":
            gameBoard.ctx.drawImage(cardImg, xCenter-20, yCenter-30);
            break;
        case "bottom": 
            gameBoard.ctx.drawImage(cardImg, xCenter-40, yCenter-10);
            break;
        default:
            gameBoard.ctx.drawImage(cardImg, xCenter-60, yCenter-30);

    }
    // remove cardId (card object) from hand & DOM (<div>), if it is there
    if (cardImg.parentNode === document.getElementById("tophand")) {
        cardImg.parentNode.removeChild(cardImg);
    }
}

function loadCard(card, hand_div) {
// displays card in specified hand (HTML <div>) on webpage inside the game control panel
    var x1 = document.createElement("a");
    x1.href = "#";
    var x2 = document.createElement("img");   
    x2.id = card.getCardName();
    x2.src = "img/" + card.getCardName() + ".png";
    x1.appendChild(x2);
    hand_div.appendChild(x1);
    //x2.setAttribute("onclick", "playCard('left', '" + card.getCardName() + "')");
    //var y = element.appendChild(x1); 
    //y.appendChild(x2);
}

function getHand(deck, n) {
    // gets the next 3 cards from the deck
    // temporary function just to get the game to work
    // TODO: Randomize the deck. ie: return random cards.
    // parameters: deck of cards ie array of cards
    // return: and array of 3 cards.
    var three_cards = [deck[n], deck[n+1], deck[n+2]];  
    return three_cards;  
}
  
function dealHand(pos, cards) {
    // send the 3 cards to be placed in the player 1 section
    // parameters: pos - <div> id in the control panel ie: tophand, bottomhand, firstbeg & secondbeg, cards - array of 3 cards
    // return: void
    for (i = 0; i < cards.length; i++) {
        loadCard(cards[i], document.getElementById(pos)); 
    }
    /*
    for (i = 3; i < cards.length; i++) {
        loadCard(cards[i], document.getElementById(bottomhand));
    }
    */
}

function displayTrump(trump) {
// Displays the kickcard/trump in the top left corner of the gameboard
// parameters: a card
// returns: void    
    gameBoard.ctx.drawImage(trump.image, 5, 5);
}

/**
 * @test: displays the trump card and prints cardFace & cardSuit in console
 * @param: null 
 * @return: void
 */
function unitTestForDisplayTrump() {
    var deck = createDeck(); 
    var n = Math.floor(Math.random() * 52); // randomize trump card
    var trumpCard = deck[n];
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
        gameBoard.ctx.clearRect(gameboard.canvas.width - 335, 15, 260, 120);
    }
};

function displayScoreboard(a, b) {
    // draws scoreboard on the gameboard
    // draw rectangle border

    var x = gameBoard.ctx;
    var c = gameBoard.canvas;
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
    try {
        scoreboard.init();
    }
    catch(err) {
        console.log("Scoreboard not initializing");
    }; 
    console.log(scoreboard.teamA);
    console.log(scoreboard.teamB);
    scoreboard.display();
    try {
        scoreboard.clear(); //setTimeout(scoreboard.clear(), 5000);
    }
    catch(err) {
        console.log(err);
    };
    scoreboard.update(3, 6);
    console.log(scoreboard.teamA);
    console.log(scoreboard.teamB);
    scoreboard.display();
    setTimeout(scoreboard.clear(), 5000);
    scoreboard.update(8, 5)
    console.log(scoreboard.teamA);
    console.log(scoreboard.teamB);
    scoreboard.display();
}

//  
function humanPlayTurn() {
// waits for player to select a card to play by clicking on it
// parameters: null
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
    var pos = 'left';
    document.getElementsByClassName('hand').addEventListener("click", playCard(pos, event.target.id));
    //card.face = event.target.id[0];
    //card.suit = event.target.id[1];
    //return card;
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
}

function mainGameLoop() {
// repeat game rounds until  a player gets 14 points or quit() ==> ESC key (do - while loop)
// parameters: null
// return: void
// Deal subroutine
// TODO: shuffle deck

    var theDeck = createDeck();
    var player1Hand = getHand(theDeck, 0);

    gameBoard.init();
    dealHand('tophand', player1Hand);
    var computer1Hand = getHand(theDeck, 3);
    player1Hand = getHand(theDeck, 6);
    dealHand('bottomhand', getHand(theDeck, 6));
    computer1Hand = getHand(theDeck, 9);
    var kickcard = theDeck[12]; // kickcard gets the next card from the deck after all hands has been dealt
    displayTrump(kickcard);
    // trumpUnitTest(trump);
    do {
        //var callCard = humanPlayTurn(player1Hand);
        humanPlayTurn();
        var playedCard = computerPlayTurn(computer1Hand);
        determineWinner(callCard, playedCard);
        /* if (player1 == determinWnner(callCard, playedCard)) {
                player1Lift = callCard + playedCard;
            } else {
                computerLift = callCard + playedCard;
          }; */
    } while (player1Hand == null);
    // TODO: the beg handler
    
}


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


     
