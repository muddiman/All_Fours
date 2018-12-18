
// import deck from '../allfours.js';
// import * as gfx from 'graphicslib.js';



/*  Asset Objects   */
var cardImageAssets = {              // a deck of cards
    loadImages:         function () {
                            DECK.deck.init();
                        },
    checkImages:        function ()  {
                            this.loadImages();
                            if (DECK.deck.cards.length === 52)   {
                                this.allImagesLoaded = true;
                            } else {
                                this.allImagesLoaded = false;
                            }
                            return this.allImagesLoaded;
                        },
    allImagesLoaded:    false,                    
    errorMsg:           "Sorry, All card images did not load.",
    successMsg:         "All card images loaded successfully.",                    
};
var gameBoardAssets = {                // draws game board
    loadImages:         function ()  {
                            GFX.gameBoard.init();
                        },
    checkImages:        function () {
                            if (Document.getElementbyId("game_board"))   {
                                allImagesLoaded=TRUE;
                            } else {
                                allImagesLoaded=FALSE;
                            }
                            return this.allImagesLoaded;
                        },
    allImagesLoaded:    false,
    errorMsg:           "Sorry, the game board did not load.",
    successMsg:         "The game board loaded successfully.",
};

/*  Array of assets  */
var assets = [
    cardImageAssets, 
    gameBoardAssets
    ];           //  [cardImages, initializeCanvas, imgAssets, sprites, audioAssets,];

    /*  customizable confirmation message    */
    function msg(msg) {
        console.log(msg);
    }
 /*  
     let msg = function (msg) {
        return new Promise(function (resolve) {
           resolve(console.log(msg));
        });
    };
 */


    /*  for each asset  */
    let loadAsset = function (a) {
        return new Promise(function (resolve) {
        //function loadAsset(a, callback) {
            a.loadImages();
            console.log('Loading ...' + a);
            resolve(a);                // return callback(a);    
        });   // resolve(a)
    };
    
    /* load check */
    let checkAsset = function (asset) {
        return new Promise(function (resolve, reject) {
    //function checkAsset(asset) {
        if (asset.checkImages) {
            // msg(asset.successMsg);
            resolve(asset.successMsg);   //  return True;
        } else {
            // msg(asset.errorMsg);  
            reject(asset.errorMsg);        //  return False; 
        }
    });
    };

/*  load all assets sequentially    */
function loadAllAssets(assetObjectsArr) {
    var successCounter=0;
    var errorCounter=0;
    
    assetObjectsArr.forEach(element => { 
        //  Promise.all([loadAsset(element), checkAsset(), msg()]).then(function(){console.log('All Assets Loaded.');});         
    //for (var assetObject in assetObjectsArr ) {
        loadAsset(element).then(function(passedObj) {
            return checkAsset(passedObj);
        }).then(function (fromResolve) {
            successCounter++;
            msg(fromResolve);
        }).catch(function (fromReject) {
            errorCounter++;
            msg(fromReject);
        });
    });

    var msg = "All "+ successCounter +" assets loaded.";
    var error = "Could not load all assets. " + errorCounter + " image sets did not load.";
    if (errorCounter > 0) {
        return error;
    } else {
        return msg;
    }
}

/*  function calls to load everything   */
function loadGame() {
    //var GFX = require("./graphicslib");         // Graphics Library
    //var DECK = require("./cards");              // Card Library

    //import {*} as gfx from "../graphicslib.js";
    console.time("loadTime");
   // console.log(loadAllScripts(scripts));
    console.log(loadAllAssets(assets));
    console.log('GAME LOADED!');
    console.log('Game did not load!');
    console.timeEnd("loadTime");
}