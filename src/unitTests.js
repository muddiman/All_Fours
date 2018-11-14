/* 

            Contains unit tests functions for the allFours.js code base
            TODO: Add try->throw->catch->finally to all unit test functions
            @title: All Fours Game
            @author: .muddicode

*/

/**  
 * @test: if game board is created in intended place in the DOM
 * @param: null
 * @return: void 
*/
function unitTestForGameBoard() { 
    gameBoard.init();
    var x = gameBoard.ctx;
    x.fillStyle= "#FF0000";
    x.fillRect(0,0, 150,75);
    gameBoard.clearBoard();
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
 * @test: the deck-array. All 52 unique card objects, with all their parameters
 * @param: deck (array of Cards)
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

/* 
==============================================================================================================
                                            TEMPLATES
*/

/**
 * ERROR HANDLING
 */
try {
    statements; // test case:
}
catch(err) {
    statements; // Block of code to handle errors;
} 
finally {
    statements; // Block of code to be executed regardless of the try / catch result
}

/**
 * UNIT TEST CODE
 * @param:
 * @returns:
 */
function unitTestForFunction() {
    statements; // Error handling code
}