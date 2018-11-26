/**
 *      Unit Tests Template
 *      @author .Muddicode
 *      @version 1.0.0
 */

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

var Tests = [       // An array of test objects
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