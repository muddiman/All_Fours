//  unittest_functions.mjs

/*                              Title:      Unit Test Library Functions
                                Programmer: .Muddicode
                                Language:   JavaScript
                                Code:       Assertion Functions Library

*/ 
// generic assertion functions, can be use with any code       

/*  Describe    */
export function describe(Title) {
    //let descriptionString = Title;
    console.log(`Function ${Title}:`);
}

export function it(verboseDescription) {
    console.log(`   should ${verboseDescription}`);
}
                                            /*  Unit Test Types */
                                            
/*  Assertion Functions  */

/*  EqualTo */
export function assertIsEqual(testFunction, expected_value, n, customPassMsg, customFailMsg) {         //  n = testNumber
    if (testFunction === expected_value) {
        console.log(`   --> Test ${n}: pass. ${customPassMsg}`);
        return true;
    } else {
        console.log(`   ==> Test ${n}: fail. ${customFailMsg}`);
        console.log(`   --> Received: ${testFunction}`);
        console.log(`   --> Expected: ${expected_value}`);
        return false;
    }
}

/*  Greater Than    */
function assertIsAbove(testFunction, lowerBoundary, n) {         //  n = testNumber
    if (testFunction(testParameters) > lowerBoundary) {
        console.log(`Test ${n}: pass. ${customPassMsg}`);
        return true;
    } else {
        console.log(`Test ${n}: fail. ${customFailMsg}`);
        return false;
    }
}

/*  Less Than   */
function assertIsBelow(testFunction, upperBoundary, n) {         //  n = testNumber
    if (testFunction(testParameters) < upperBoundary) {
        console.log(`Test ${n}: pass. ${customPassMsg}`);
        return true;
    } else {
        console.log(`Test ${n}: fail. ${customFailMsg}`);
        return false;
    }
}

/*  If defined/undefined   */
function assertIsDefined(testFunction, n) {         //  n = testNumber
    if (testFunction(testParameters) < upperBoundary) {
        console.log(`Test ${n}: pass. ${customPassMsg}`);
        return true;
    } else {
        console.log(`Test ${n}: fail. ${customFailMsg}`);
        return false;
    }
}

/*  If equal to null   */
function assertIsNull(testFunction, n) {         //  n = testNumber
    if (testFunction(testParameters) === null) {
        console.log(`Test ${n}: pass. ${customPassMsg}`);
        return true;
    } else {
        console.log(`Test ${n}: fail. ${customFailMsg}`);
        return false;
    }
}


/*  Type Test    */
function assertTypeOf(testFunction, expected_type, n) {         //  n = testNumber
    if (testFunction(testParameters) === expected_type) {
        console.log(`Test ${n}: pass. ${customPassMsg}`);
        return true;
    } else {
        console.log(`Test ${n}: fail. ${customFailMsg}`);
        return false;
    }
}


                                            /*  Batch Tests */


function assertEqualBatchTests(assertEqualObject, testFunction) {
    let passedTests=0;
    let failedTests=0;
    let n=0;
    for (var item in assertEqualObject) {
        if (assertEqual(testFunction, assertEqualObject[item], n)) {
            passedTests++;
        } else {
            failedTests++;
        } 
        n++;
    }
    // results
    console.log('-------------------------------------------------------------------------------------------------------');
    console.log('Ran '+ n + 'tests in '+ runtime +' secs.');
    console.log(`Pass: ${passedTests}`);
    console.log(`Fail: ${failedTests}`);
    if (failedTests === 0) {
        console.log('OK');
    } else {
        console.log('Check your code.');
    }
}
var expectedValues = "functionReturns";
var testObject = {                              //  assertEqual test object format (JSON notation also accepted)
    functionParameters : expectedValues,
};

function jsonParser(jsonFile) {
    return JSON.parse(jsonFile);
}

                                                /*      AUTOMATED BATTERY of TESTS       */
 
//  Generate paramaters and expectedValues
//  place in an object
//  run multiple batch tests, all test types
//  test all aspects of code base, all functions                                           





/********************************************************************************************** */
/*                 Copyright (c) 2018-2018 Roger A. Clarke. All Rights Reserved                 */
/********************************************************************************************** */