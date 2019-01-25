

/*  Unit Test Functions  */

/*  Describe    */
function describeFunction(description) {
    let descriptionString = description;
    console.log(`Function Purpose: ${description}`);
}
                                            /*  Unit Test Types */
                                            
/*  expect  */

/*  EqualTo */
function assertEqual(testFunction, expected_value, n) {         //  n = testNumber
    if (testFunction(testParameters) === expected_value) {
        console.log('Test '+ n +': pass.');
        return true;
    } else {
        console.log('Test '+ n +': fail.');
        return false;
    }
}

/*  Greater Than    */
function assertGreater(testFunction, lowerBoundary, n) {         //  n = testNumber
    if (testFunction(testParameters) > lowerBoundary) {
        console.log('Test '+ n +': pass.');
        return true;
    } else {
        console.log('Test '+ n +': fail.');
        return false;
    }
}

/*  Less Than   */
function assertLess(testFunction, upperBoundary, n) {         //  n = testNumber
    if (testFunction(testParameters) < upperBoundary) {
        console.log('Test '+ n +': pass.');
        return true;
    } else {
        console.log('Test '+ n +': fail.');
        return false;
    }
}

/*  Type Test    */
function assertType(testFunction, expected_type, n) {         //  n = testNumber
    if (testFunction(testParameters) === expected_type) {
        console.log('Test '+ n +': pass.');
        return true;
    } else {
        console.log('Test '+ n +': fail.');
        return false;
    }
}


                                            /*  Batch Tests */


function assertEqualBatchTests(assertEqualObject, testFunction) {
    let passedTests=0;
    let failedTests=0;
    let n=0;
    for (var item in assertEqualObject) {
        if (assertEqual(testFunction, assertEqualObject(item), n)) {
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