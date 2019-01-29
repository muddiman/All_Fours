/*
                                Title:  ALL FOURS GAME
                                Language: Javascript
                                Programmer: .muddicode 
                                Code: Main Program 

    DESCRIPTION: AUTOMATED TESTS FOR THE CODE BASE 
    PURPOSE: Ensures new functions does not break the code base, protects the code base
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

function testFcn() {
        describe(firstJackDeal);
        it(`should take return a random player`);
        let passFail = assertIsEqual(firstJackDeal, human, `return expected result.`, `did NOT return expected result.`);
        if (passFail === true) {
                console.log(`Success! No Errors in function.`);
        } else {
                console.log(`Errors found in code base! Please check code.`);
        }
}

function automatedTests() {
        let testIndex = 0;
        // import json as an object
        let testObj = {};
        // run through the object of test functions to execute
        for (let tests in testObj) {
                if (testObj[tests] === true) {
                        testIndex++;
                        // turn string into a valid function
                        // run funtion
                        tests(); 
                } 
        }
}