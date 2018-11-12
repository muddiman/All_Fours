/* 

            Contains unit tests functions for the allFours.js code base

*/

function UnitTestObjects(deck) {
// Test the deck-array. All 52 unique card objects, with all their parameters
    for (i = 0; i < 52; i++) {
        console.log(i); 
        //  aCard = deck[i].cardFace + " of " + deck[i].cardSuit;
        var aCard = deck[i].getCardName();
        console.log(aCard);
    }
}

function trumpUnitTest(card) {
// Unit tests for Card Object: displays card name in console
// parameters: card object
// return: void
    console.log(card.getCardName());
}

function unitTestForDisplayTrump() {
// Unit test for the function displayTrump(): displays the trump card and prints cardFace & cardSuit in console
// parameters: null
// return: void
    // var c = document.getElementById("game_board");
    // var gameBoard.ctx = c.getContext("2d"); 
    var deck = createDeck();
    // TODO: randomize trump card
    var trumpCard = deck[0];
    displayTrump(trumpCard);
    console.log(trumpCard.cardFace);
    console.log(trumpCard.cardSuit);
}