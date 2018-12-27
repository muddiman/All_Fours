/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode 
                     Code: Unit Test                            
*/
/**
 *      Unit Tests Template
 *      @author .Muddicode
 *      @version 0.1.3
 */

 /* Globals */
var pass = 0;
var fail = 0;
var n = 0;
var test = 0;
var runtime = 0;
var hand = human.hand;

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
    console.log('Ran '+ numberOfTests + ' tests in '+ runtime +' msecs.');
    console.log(pass +' passed.');
    console.log(fail +' failed.');
    if (fail === 0) {
        console.log('OK');
    } else {
        console.log('Check your code.');
    }
}

var Tests = [       // An array of test objects
    {
        parameter :  hand,        // array of six cards [jc, qh, 3d, 6s, th, 8d, ac]
        expect : 'jc',   // one card: jack of clubs
        method : humanPlayTurn(),
    },
    {
        parameter : 'place parameters here',
        expect : 'place the expected value here',
        method : humanPlayTurn(),
    },
    {
        parameter : 'place parameters here',
        expect : 'place the expected value here',
        method : humanPlayTurn(),
    },
];

function unittest() {
    var Timer = new Date();
    var start = Timer.getMilliseconds();
    for (test in Tests) {
        n++;
        // setup(Test.method, Test.parameter, Test.parameterTwo, Test.expect, n);
        var testCase = Test.method(Test.parameter);
       if (assertEqual(testCase, Test.expect, n)) {
           pass++;
       } else {
           fail++;
       } 
    }
    var stop = Timer.getMilliseconds();
    runtime = stop - start;
    summary(n, pass, fail, runtime);
}