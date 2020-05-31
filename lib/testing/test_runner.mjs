//  /lib/testing/test_runner.mjs

/*
                                Title:  ALL FOURS GAME
                                Language: Javascript
                                Programmer: .muddicode 
                                Code: Main Program 

    DESCRIPTION: AUTOMATED TEST RUNNER FOR THE CODE BASE 
    PURPOSE: Ensures new functions does not break the existing code base, protects the code base
*/


/*
        Use Mocha for testing framework
        Use Chai for assertion(testing) functions


log = console.log
expect = require('chai').expect
should = require('chai').should()
*/
// var assert = require('../public/lib/testing/unittest_functions');
/*              Manual Tests            */
// Load allFours.js and unittest_functions.js

// function loadTestFile() {}
// function openTestFile()
// function readTestFile()

import {describe, it, assertIsEqual} from "/lib/testing/assertion_functions.mjs";
import {testFirstJackDeal} from "/lib/testing/manual_unittests.mjs";
// import {it} from "/lib/testing/unittest_functions.mjs";
describe("Testing All Fours Game code");
it(`conducting manual, individual function tests`);
testFirstJackDeal();

//-------------------------------------------------------------------------------------------------------
                                /*      UTILITIES       */

function loadJSONTestsFile() {
  let JSONTestsFile;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        JSONTestsFile = this.responseText;
    }
  };
  xhttp.open("GET", "atmtests.JSON", true);
  xhttp.send();
  return JSONTestsFile;
}

function parseJSONTestsFile(JSONfile) {
  let testsObj = JSON.parse(JSONfile);
  return testsObj;
}

function displayFile() {
  var fs = require('fs');
  var rawfile = fs.readFileSync('/lib/keys.JSON');
  var jsonFile = JSON.parse(rawfile);
  console.log(jsonFile);
}

function saveData() {
  var data = JSON.stringify(dataObj);
  fs.writeFile('/lib/newfile.JSON', data, finished);
}

function finished(err) {
        console.log(`All set.`);
}


//-----------------------------------------------------------------------------------------------------
                                /*      AUTOMATED TESTS (entire code base)      */

function testFcnFormat() {
    describe(firstJackDeal);
    it(`should take return a random player`);
    let passFail = assertIsEqual(firstJackDeal, human, `return expected result.`, `did NOT return expected result.`);
    if (passFail === true) {
            console.log(`Success! No Errors in function.`);
    } else {
            console.log(`Errors found in code base! Please check code.`);
    }
}

function automatedTests(testsObj) {
    let testIndex = 0;
    let passedTests = 0;
    let failedTests = 0;
    // run through the object of test functions to execute
    for (let test in testsObj) {
        testIndex++;
        if (testsObj[test] === true) {
            passedTests++;
            testString = test;
            testString += "()";
            // turn string into a valid function
            // run funtion
            tests();
            console.log(`${testString} function pass.`);
        } 
    }
}

//      Run Automated Test
function runTestsfile(testFileJSON) {
    let JSONfile = loadJSONTestsFile(testFileJSON);
    let testObj = parseJSONTestsFile(JSONfile);
    automatedTests(testObj);
}


const TESTFILE = `/lib/testing/test_runner_config.JSON`;

console.log(`*******************************************************************************`);
console.log(`*                                                                             *`);
console.log(`*                      ALL FOUR GAME                                          *`);
console.log(`*                      JavaScript Automated Test Runner                       *`);
console.log(`*                      Version: 1.0.0                                         *`);
console.log(`*                                                                             *`);
console.log(`*******************************************************************************`);

runTestsfile(TESTFILE);
// results
failedTests = testIndex - passedTests;
console.log('-------------------------------------------------------------------------------------------------------');
console.log(`Ran ${n} tests in ${runtime}ms.`);
console.log(`Pass: ${passedTests}`);
console.log(`Fail: ${failedTests}`);
if (failedTests === 0) {
    console.log('OK');
} else {
    console.log('Check your code.');
    console.log(`Error Log:`);
}
