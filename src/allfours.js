/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode                             
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

/*  

    Because the fisrt letter of every suit AND face of all cards are unique letters
    i can simplify the id of each card to a 'two-letter' string.
    ie: ace of heart is 'ah', ten of clubs is 'tc' and nine of diamonds is '9d'
    This simplifies coding tremendously.

        object Game... will have a gameBoard, context
    var Game = {
        gb: document.getElementById("game_board"),
        gameBoard.ctx: getContext("2d"),
        gameWidth: 750,
        gameHeight: 450,
        xCenter: gameWidth/2,
        yCenter: gameHeight/2,
        createGameBoard() {
            createElement("canvas").Id("game_board");

        },
    }
*/

var gameBoard = {
//  Object: gameBoard
    canvas : document.getElementById("game_board"),
    width : 750,
    height : 450,
    // ctx : this.canvas.getContext("2d"),
    init : function () {
    // initialize gameBoard by applying context
        this.ctx = this.canvas.getContext("2d");
    },
    clearBoard : function () {
    // wipes the entire gameBoard clean
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
};


// var gameWidth = 750;
// var gameHeight = 450; 
var xCenter = gameBoard.width/2;
var yCenter = gameBoard.height/2;


// ask if player wishes to play All Fours
function startAsk() {
    if (confirm("Click 'OK' to play All Fours or 'Cancel' to exit game.")) {
        game.quit = false;
        mainLoop();
    } else {
        quit = true;
    }
}



function Card(rank, face, suit) {
// Card object constructor
    this.suit = suit; // ['c', 'd', 'h', 's'],
    this.face = face; // ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'],
    this.rank = rank;     // [0, 1,.. 12], to assist in determining who played the higher card
    this.getCardName = function () {
        return this.face + this.suit; // used as cardId, image filename, etc
    };
}

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

function UnitTestObjects(deck) {
    for (i = 0; i < 52; i++) {
        console.log(i); 
        //  aCard = deck[i].face + " of " + deck[i].fuit;
        var aCard = deck[i].getCardName();
        console.log(aCard);
    }
}

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
function playCard(playPosition, cardId) {
/*  place a card on the gameBoard
    parameters: postion (relative to center) of the gameBoard, Id of the card object
    Note: use card object instead; get the Id from card.getCardName function
*/ 
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
    }
    // remove cardId from hand
    cardImg.parentNode.removeChild(cardImg);
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
    // peform a trick, place it elsewhere on the html document and quickly place it on the canvas
    /* var c = document.getElementById("game_board");
    var gameBoard.ctx = c.getContext("2d"); */ 
    // var cardImage = document.createElement('img');
    var cardImage = new Image();
    // cardImage.id = trump.getCardName();
    cardImage.src = "img/" + trump.getCardName() + ".png";
    // var x = document.getElementById('beg2');
    // x.appendChild(cardImage); 
    gameBoard.init();
    gameBoard.clearBoard();   
    gameBoard.ctx.drawImage(cardImage, 5, 5);
    // x.removeChild(cardImage);
}

function unitTestForDisplayTrump() {
// Unit test for the function displayTrump(): displays the trump card and prints cardFace & cardSuit in console
// parameters: null
// return: void
    // var c = document.getElementById("game_board");
    // var gameBoard.ctx = c.getContext("2d"); 
    // gameBoard.init();
    var deck = createDeck();
    // TODO: randomize trump card
    var trumpCard = deck[0];
    console.log(trumpCard.face);
    console.log(trumpCard.suit);
    displayTrump(trumpCard);
}

function trumpUnitTest(card) {
// Unit tests for Card Object: displays card name in console
// parameters: card object
// return: void
    console.log(card.getCardName());
}

function scoreboard() {
    // draws scoreboard on the gameboard
    // draw rectangle border
    // var c = document.getElementById("game_board");
    // var gameBoard.ctx = c.getContext("2d"); 
    gameBoard.ctx.beginPath();
    gameBoard.ctx.lineWidth = 8;
    gameBoard.ctx.strokeStyle = "red";
    gameBoard.ctx.rect(gameWidth - 335, 15, 260, 120);
    gameBoard.ctx.stroke(); 
    // fill rectangle
    gameBoard.ctx.fillStyle = "#993399";
    gameBoard.ctx.fillRect(gameWidth - 335, 15, 260, 120);
    // write in rectangle
    gameBoard.ctx.fillStyle = "#ffffff";
    gameBoard.ctx.font = "30px Arial";
    gameBoard.ctx.fillText("Team A:", gameWidth - 320, 50);
    gameBoard.ctx.fillText("Team B:", gameWidth - 320, 115);
    // score tiles
    gameBoard.ctx.fillText("14", gameWidth - 140, 50);
    gameBoard.ctx.fillText("10", gameWidth - 140, 115);
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
    gameBoard.ctx.clearRect(0, 0, gameWidth, gameHeight);
    gameBoard.ctx.beginPath();
    gameBoard.ctx.drawImage(img, x, y);
    gameBoard.ctx.stroke();
    x += dx;
    y += dy;
} */
 // Build the page using javascript only


     
