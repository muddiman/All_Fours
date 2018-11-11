/*
==================================================================
|                                                                |
|                                                                |
|                       ALL FOURS                                |
|                     BY: .muddicode                             |
|                                                                |
|                                                                |
==================================================================
*/

/* 
        @author: Roger Clarke (muddiman | .muddicode)
        Copyright (c) 2018. All Rights Reserved.

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
        ctx: getContext("2d"),
        gameWidth: 750,
        gameHeight: 450,
        xCenter: gameWidth/2,
        yCenter: gameHeight/2,
        createGameBoard() {
            createElement("canvas").Id("game_board");

        },
    }
*/

var gameWidth = 750;
var gameHeight = 450; 
var xCenter = 750/2;
var yCenter = 450/2;


// ask if player wishes to play All Fours
function startAsk() {
    if (confirm("Click 'OK' to play All Fours or 'Cancel' to exit game.")) {
        game.quit = false;
        mainLoop();
    } else {
        quit = true;
    }
}

// Card object constructor

function Card(rank, face, suit) {
    this.cardSuit = suit; // ['c', 'd', 'h', 's'],
    this.cardFace = face; // ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'],
    this.rank = rank;     // [0, 1,.. 12], to assist in determining who played the higher card
    this.getCardName = function () {
        return this.cardFace + this.cardSuit; // used as cardId, image filename, etc
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
        //  aCard = deck[i].cardFace + " of " + deck[i].cardSuit;
        var aCard = deck[i].getCardName();
        console.log(aCard);
    };
}

function cardDisplay(ctx) {
    // test function to display cards on game board
    var img1 = document.getElementById("kingHearts");
    var img2 = document.getElementById("jackDiamonds");
    ctx.drawImage(img1, xCenter-60, yCenter-30);
    ctx.drawImage(img2, xCenter-40, yCenter-50);
    ctx.drawImage(img1, xCenter-20, yCenter-30);
    ctx.drawImage(img2, xCenter-40, yCenter-10);
    // img.moveTo(100,100);
    animate_card();
}
// place a card on the game table
function playCard(ctx, playPosition, cardId) {
    /* var c = document.getElementById("game_board");
    var ctx = c.getContext("2d"); */
    var cardImg = document.getElementById(cardId); 
    switch (playPosition) {
        case "left":
            ctx.drawImage(cardImg, xCenter-60, yCenter-30);
            break;
        case "top":
            ctx.drawImage(cardImg, xCenter-40, yCenter-50);
            break;
        case "right":
            ctx.drawImage(cardImg, xCenter-20, yCenter-30);
            break;
        case "bottom": 
            ctx.drawImage(cardImg, xCenter-40, yCenter-10);
            break;
    }
    // remove cardId from hand
    cardImg.parentNode.removeChild(cardImg);
}

function loadCard(card, hand_div) {
    // displays card in specified hand on webpage inside the game control panel
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
    // temporary function just to get the game to work
    // TODO: Randomize this function. ie: return random cards.
    // var 
    var three_cards = [deck[n], deck[n+1], deck[n+2]];  
    return three_cards;  
}
  
function dealHand(pos, cards) {
    // three cards at a time. Hand: 3-card array
    // pos: display position in the control panel is: tophand, bottomhand, firstbeg & secondbeg
    for (i = 0; i < cards.length; i++) {
        loadCard(cards[i], document.getElementById(pos)); 
    }
    /*
    for (i = 3; i < cards.length; i++) {
        loadCard(cards[i], document.getElementById(bottomhand));
    }
    */
}

function displayTrump(ctx, trump) {
    // parameters:
    // returns: 
    // Displays the kickcard/trump in the top left corner of the gameboard 
    // peform a trick, place it elsewhere on the html document and quickly place it on the canvas
    /* var c = document.getElementById("game_board");
    var ctx = c.getContext("2d"); */ 
    var cardImage = document.createElement('img');
    cardImage.id = trump.getCardName();
    cardImage.src = "img/" + trump.getCardName() + ".png";
    // var x = document.getElementById('beg2');
    //x.appendChild(cardImage);    
    ctx.drawImage(cardImage, 5, 5);
    // x.removeChild(cardImage);
}

function unitTestForDisplayTrump() {
    // tests the function's inner code
    // parameters:
    // return:
    var c = document.getElementById("game_board");
    var ctx = c.getContext("2d"); 
    var deck = createDeck();
    var trumpCard = deck[0];
    displayTrump(ctx, trumpCard);
    console.log(trumpCard.cardFace);
}

function trumpUnitTest(card) {
    console.log(card.getCardName());
}

function scoreboard() {
    // draws scoreboard on the gameboard
    // draw rectangle border
    var c = document.getElementById("game_board");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.strokeStyle = "red";
    ctx.rect(gameWidth - 335, 15, 260, 120);
    ctx.stroke(); 
    // fill rectangle
    ctx.fillStyle = "#993399";
    ctx.fillRect(gameWidth - 335, 15, 260, 120);
    // write in rectangle
    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Arial";
    ctx.fillText("Team A:", gameWidth - 320, 50);
    ctx.fillText("Team B:", gameWidth - 320, 115);
    // score tiles
    ctx.fillText("14", gameWidth - 140, 50);
    ctx.fillText("10", gameWidth - 140, 115);
}

//  
function humanPlayTurn(ctx) {
    // waits for player to click on a card
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
    document.getElementsByClassName('hand').addEventListener("click", playCard(ctx, pos, event.target.id));
    //card.face = event.target.id[0];
    //card.suit = event.target.id[1];
    //return card;
}
 
function computerPlayTurn(computerHand) {
    //consult computer AI
    computerAI(hand);
    return card;
}

function determineWinner(called, played) {
    // higher rank in called suit wins
    // Except: other player plays trump
}

function mainGameLoop() {
    // play rounds until  somebody reach 14 or quit() --> ESC key (do - while loop)
    // Deal subroutine
    // TODO: shuffle deck

    var c = document.getElementById("game_board");
    var ctx = c.getContext("2d");
    var theDeck = createDeck();
    var player1Hand = getHand(theDeck, 0);

    dealHand('tophand', player1Hand);
    var computer1Hand = getHand(theDeck, 3);
    player1Hand = getHand(theDeck, 6);
    dealHand('bottomhand', getHand(theDeck, 6));
    computer1Hand = getHand(theDeck, 9);
    var trump = theDeck[12];
    displayTrump(ctx, trump);
    // trumpUnitTest(trump);
    do {
        //var callCard = humanPlayTurn(player1Hand);
        humanPlayTurn(ctx);
        var playedCard = computerPlayTurn(computer1Hand);
        determineWinner(callCard, playedCard);
        // player1Lift = callCard + playedCard;
        // computerLift = callCard + playedCard;
    } while (player1Hand == null);
    // beg handler
    
}


/* var x = 10;
var y = 10;
var dx = 4;
var dy = 4;
function animate_card() {
    requestAnimationFrame(animate_card);
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    ctx.beginPath();
    ctx.drawImage(img, x, y);
    ctx.stroke();
    x += dx;
    y += dy;
} */
 // Build the page using javascript only


     
