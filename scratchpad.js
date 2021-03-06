/*

    Used to test code for the AF game

*/

document.createElement("canvas")
document.getElementById("game_board").width = gameWidth;
document.getElementById("game_board").height = gameHeight;
document.getElementById("game_board").width = gameWidth;

function quit() {
    window.confirm("Are you sure you want to exit game?");
}
/*
document.createElement("img")

document.getElementById("2c").src = "2_clubs.png";
document.getElementById("3c").src = "3_clubs.png";
document.getElementById("4c").src = "4_clubs.png";
document.getElementById("5c").src = "5_clubs.png";
document.getElementById("6c").src = "6_clubs.png";
document.getElementById("7c").src = "7_clubs.png";
document.getElementById("8c").src = "8_clubs.png";
document.getElementById("9c").src = "9_clubs.png";
document.getElementById("10c").src = "10_clubs.png";
document.getElementById("jc").src = "jack_clubs.png";
document.getElementById("qc").src = "queen_clubs.png";
document.getElementById("kc").src = "king_clubs.png";
document.getElementById("ac").src = "ace_clubs.png";

document.getElementById("2h").src = "2_hearts.png";
document.getElementById("3h").src = "3_hearts.png";
document.getElementById("4h").src = "4_hearts.png";
document.getElementById("5h").src = "5_hearts.png";
document.getElementById("6h").src = "6_hearts.png";
document.getElementById("7h").src = "7_hearts.png";
document.getElementById("8h").src = "8_hearts.png";
document.getElementById("9h").src = "9_hearts.png";
document.getElementById("10h").src = "10_hearts.png";
document.getElementById("jh").src = "jack_hearts.png";
document.getElementById("qh").src = "queen_hearts.png";
document.getElementById("kh").src = "king_hearts.png";
document.getElementById("ah").src = "ace_hearts.png";
*/

var gameObj = {
    quit: false,
    board: document.getElementById("game_board"),
    ctx: this.board.getContext("2d"),
    gameWidth: 700, 
    gameHeight: 450,
    xCenter: this.gameWidth/2,
    yCenter: this.gameHeight/2,
    initializeGame: function() {
        document.createElement("canvas");
        document.createAttribute("id") = "game_board"
        document.getElementById("game_board").width = this.gameWidth;
        document.getElementById("game_board").height = this.gameHeight;
    }   
};

hand = [];
function cardLocation(i, arrayLength) {
    card[i].x = xCenter - Math.ceil(arrayLength / 2) + i * CARD_W / 2;
}


function mainLoop() {
    // initialize game object
    // game.quit = false
    while (!game.quit) {
        var playerAPts = 0;
        var playerBPts = 0;

        //deal();
        do {
            // Keep playing round after round until a player acquires 14  pts.
            // playRound();
            
        } while (playerAPts < 14 || playerBPts < 14);
        
        // quit if a player clicks quit
        document.getElementById("quitBtn").onclick = function() {quitFunction()};
        function quitfunction() {
            game.quit = true;
            break;
        }
        // quit if a player presses the 'ESC' key.
    }
}

/* playRound() {
    // if whoPlaysFirst() == computer {
            callcard = computerPlay();
       } else { 
            callcard = humanPlay();
       }
    // Your turn.
    otherPlayerPlay();
    whoWon(); // winner takes lift

    //iplay();
    
    //computerPlay(); / consultAI();
    //whoWon(); // determine who won 'game' and distribute the points
} */

function humanPlay() {
    // "Play a card."
    var card = "";
    document.getElementById("2c").addEventListener("click", function () {
        card = this.id;
        this.removeEventListener("click",function () {

        });
        this.removeChild;
    });
    playCard("bottom",card);
    return card;
}

function getHand() {
  var three_cards = ['2c', 'jh', 'as'];
  return three_cards;  
}

function dealHand(pos, cards) {
    // three cards at a time. Hand: 3-card array
    // pos: display position in the control panel is: tophand, bottomhand, firstbeg & secondbeg
    for (i = 0; i < hand.length; i++) {
        displayCard(hand[i], document.getElementById(pos));
    }
}
function loadCard(face, suit, element) {
    // displays hand on webpage beside the game
    var x1 = element.appendChild("a");
    x1.href = "#";
    var x2 = x1.appendChild("img");
    x2.id = card;
    x2.src = "playing_cards/" + face + "_" + suit + ".png";
    // x2.onclick = "";
}
loadCard('5', 'clubs', document.getElementById('tophand'));


// new gameboard, card object etc


var singleCard;

function startGame() {
    singleCard = new card(30, 30, "red", 10, 120);
    game_board.start();
}

var game_board = {
    // object: game_board
    canvas : document.getElementById("game_board"),
    start : function() {
        // this.canvas.width = 480; already defined in HTML
        // this.canvas.height = 270; already defined in HTML
        this.context = this.canvas.getContext("2d");
        // document.body.insertBefore(this.canvas, document.body.childNodes[0]); Already positioned in HTML
        this.interval = setInterval(updateGameBoard, 20); //refresh game_board 50x per minute
    },
    clear : function() {
        // wipe the game_board clean
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function card(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = game_board.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.image = new Image();
    this.image.src = "img/" + this.getCardName() + ".png";
}

function updateGameBoard() {
    game_board.clear();
    singleCard.update();
}