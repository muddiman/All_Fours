//      allfours.test.mjs

/*
                                Title:  ALL FOURS GAME
                                Language: Javascript
                                Programmer: .muddicode 
                                Code: Main Program ('allfours.js')

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

import {describe, it, assertIsEqual} from "/lib/testing/assertion_functions.mjs";
describe("Testing All Fours Game code");
it(`conducting manual, individual function tests`);
testFirstJackDeal();
postRoundFcnTest();
var jSONFile = loadJSONTestsFile();
console.log(parseJSONTestsFile(jSONFile));

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
  xhttp.open("GET", "/lib/testing/test_runner_config.JSON", true);
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
//---------------------------------------------------------------------------------------------------
                                /*      MANUAL TESTS (individual functions)     */


function testFirstJackDeal() {
        let resultsArr = [];
        let returnComputer = false;
        let returnHuman = false;
        let passFail = false;
        describe("firstJackDeal");
        it(`return a random player`);
        for (let i=0; i<10; i++) {
                resultsArr[i] += firstJackDeal();
        }
        for (let item in resultsArr) {
                if (resultsArr[item] === human) {
                        returnHuman = true;
                }
                if (resultsArr[item] === computer) {
                        returnComputer = true;
                }
        }
        if (returnComputer === true && returnHuman === true) {
                passFail = true;
        } else {
                passFail = false;
        }
        // let passFail = assertIsEqual(firstJackDeal, human, `return expected result.`, `did NOT return expected result.`);
        let msg;
        let status;
        if (passFail === true) {
                status = "pass!";
                msg =`TEST COMPLETE: Function OK!`;
        } else {
                status = "fail!";
                msg = `TEST COMPLETE: Errors found in code.`;
        }
        console.log(`STATUS:                    ${status}`);
        console.log(`----------------------------------------------------------------------------`);
        console.log(msg);
        return passFail;
}

function postRoundFcnTest() {
  // After around, restart a round, assign a new dealer, deal, and trigger another set of rounds
  describe(`postRoundFcn`);
    it(`allow the game to end or continue if both players have 14 or less points.`);
    it(`Assign a new Dealer different from the last dealer`);
    it(`let the game go back to deal and playGameRounds`);
  describe(`14 points or more`);
    it(`end the game`);
    assertIsEqual(postRoundFcn(), true, 1, `Function performed as expected.`, `customFailMsg`);
  describe(`14 points or less`);
    describe(`assign a dealer`);
      describe(`last dealer human`);
        it(`let dealer be computer`);
      describe(`last dealer computer`);
        it(`let dealer be human`);
    it(`deal`);
    it(`playGameRounds`); 
}





/********************************************************************************************** */
/*                 Copyright (c) 2018-2018 Roger A. Clarke. All Rights Reserved                 */
/********************************************************************************************** */