/**
 *      Unit Tests Template
 *      @author .Muddicode
 *      @version 1.0.0
 */

/**
 * UNIT TEST
 * @param: params, expected
 * @return: void
 */
var results = {
    bad     : 0,
    total   : 0,
};

function unittest(params, expected) {
    results.total++;
    var capturedResult = origFunction(params);
    if (capturedResult != expected) {
        results.bad++;
        console.log("Test failed: Did not return expected result");
        console.log("Expected: " + expected + ", Function returned: " + capturedResult);
    }
}



 /* Globals */
var pass = 0;
var fail = 0;
var n = 0;
var test = 0;

/**
 * 
 * @param {*} testCase 
 * @param {*} expected_value 
 * @param {*} n 
 * @returns boolean
 */
function assertEqual(testCase, expected_value, n) { // n = testNumber
    if (testCase === expected_value) {
        console.log('Test '+ n +': pass.');
        return true;
    } else {
        console.log('Test '+ n +': fail.');
        return false;
    }
}
/**
 * 
 * @param {*} numberOfTests 
 * @param {*} pass 
 * @param {*} fail 
 * @param {*} runtime 
 */
function summary(numberOfTests, pass, fail, runtime ) {
    console.log('----------------------------------------------------------------------------------------');
    console.log('Ran '+ numberOfTests + 'tests in '+ runtime +' secs.');
    console.log(pass +' passed.');
    console.log(fail +' failed.');
    if (fail === 0) {
        console.log('OK');
    } else {
        console.log('Check your code.');
    }
}

var Tests = [       // An array of test objects, included in a JSON file
    {
        parameter : 'place parameters here',
        parameterTwo : 'place parameters here',
        expect : 'place the expected value here',
        method : theNameOfTheFunction(),
    },
    {
        parameter : 'place parameters here',
        parameterTwo : 'place parameters here',
        expect : 'place the expected value here',
        method : theNameOfTheFunction(),
    },
    {
        parameter : 'place parameters here',
        parameterTwo : 'place parameters here',
        expect : 'place the expected value here',
        method : theNameOfTheFunction(),
    },
];

function unittest() {
    for (test in Tests) {
        n++;
        // setup(Test.method, Test.parameter, Test.parameterTwo, Test.expect, n);
        var testCase = Test.method(Test.parameter, Test.parameterTwo);
       if (assertEqual(testCase, Test.expect, n)) {
           pass++;
       } else {
           fail++;
       } 
    }
    summary(n, pass, fail, runtime);
}

//------------------------------------------------------------------------------------------------------------
                    /*  Specific unittests for each function    */

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

    //------------------------------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------------------------------------

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
    }
}

//--------------------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------------------

function testgetCoords() {
    gameBoard.canvas.addEventListener("click", function (event) {
        var x=event.clientX; // x-20=0 on game board; 155 - 400
        var y=event.clientY; // y is much more flexible;    350 + 96
        console.log(x);
        console.log(y);
    });

}

//-----------------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------------------


