/* 

            Contains unit tests functions for the allFours.js code base

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
function unitTestForCardObjects() {
// @test: all properties of the Card object are initialized
// @param: null
// @return: void
        var aCard = new Card(0,2,'c');
        var x = gameBoard.ctx;
        x.drawImage(aCard.image, 5,5);
        console.log(aCard.face + aCard.suit);
        console.log(aCard.rank + "."+aCard.getCardName() + "."+aCard.image.src);
    }

function unitTestForDeckArray() {
// @test: the deck-array. All 52 unique card objects, with all their parameters
// @param: deck (array of Cards)
// @return: void
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

function trumpUnitTest(card) {
// Unit tests for Card Object: displays card name in console
// parameters: card object
// return: void
    console.log(card.getCardName());
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