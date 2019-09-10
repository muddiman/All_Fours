/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode 
                     Code: Game Loader Module                            
*/

/**
 *  @copyright (c) 2018 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com (OR: https://www.muddicode.com)
 *  @version   0.6.3
 *  @since     2018-10-1
 *  @download  https://www.github.com/muddiman/All_Fours
 *  @license   NOT for 'commercial use'.
 *  @See:      http://www.roger-clarke.com/allfours/license.html
 *             Free to use for personal or academic purposes.
 *             However, user must site the source code when used:
 *             "Clarke, Roger A. (2018) All Fours Game (ver. 0.4.2) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman". 
 */

/*
            LOAD SEQUENCE

            1. Title Screen
            2. Load the Scripts
            3. Load the Assets - user input handling, graphics & sound, according to settings chosen
            4. Game fully loaded 
*/

        //  Title Screen
        //  Regiser, Login, Options/Settings, Start Game
        //  Define system and asset needs: resolution, game board size and orientation, sound on/off,  
        //  Load scripts, sequencially, callback functions when loaded successfully or throw errors when they occur
        //  Load needed Assets from the options selected on Title Screen, and the 

//import deck from '../allfours.js';
//import * as gfx from 'graphicslib.js';


/*  Asset Objects   */
var cardImageAssets = {              // a deck of cards
    loadImages:         function () {
                            return deck.init();
                        },
    checkImages:        function ()  {
                            this.loadImages();
                            if (deck.cards.length === 52)   {
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
                            gfx.gameBoard.init();
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

/*  Script Objects  */
var mainScript = {
    filepath: "../allfours.js", 
    errorMsg: "Something happened. Main Game Script did not load!",
    successMsg: "Main program loaded sucessfully",
};
var inputScript = {
    filepath: "UserInput.js",
    errorMsg: "Something happened. User input Script did not load!",
    successMsg: "User input script loaded sucessfully",
};
var gfxEngine = {
    filepath: "graphicslib.js",
    errorMsg: "Something happened. Graphics Engine did not load!",
    successMsg: "Graphics Engine loaded sucessfully",
};
var DisplayInterface = {
    filepath: "display-int.js",
    errorMsg: "Something happened. Could not load Interface!",
    successMsg: "Display interface loaded sucessfully",
};

/*  Array of script objects */
var scripts = [
    mainScript, 
    inputScript, 
    gfxEngine, 
    DisplayInterface
    ];

/*  customizable confirmation message    */
function msg(msg) {
    console.log(msg);
}

/*  for each script */
function loadScript(s, callback) {
    var script_tag = document.createElement('script');
    var h = document.head;
    script_tag.src=s.filepath;
    h.appendChild(script_tag);
    return callback(script_tag);
}

/* load check */
function checkScript(scriptElement) {
    for (var head_tags in document.head) {
        if (document.head[head_tags] === scriptElement) {
            msg('Script successfully Loaded.');
            return True;
        }
    } 
    msg('Error: Script did not load.');  
    return False;
}

/*  for each asset  */
//  let loadAsset = new Promise(function (resolve, reject) {
function loadAsset(a, callback) {
    a.loadImages();
    return callback(a);    
}

/* load check */
function checkAsset(asset) {
    if (asset.checkImages) {
        msg(asset.successMsg);
        return True;
    } 
    msg(asset.errorMsg);  
    return False;
}

/*  load all  scripts sequentially   */
function loadAllScripts(scriptObjects) {
    var errorCounter=0;
    var successCounter=0;

    scriptObjects.forEach(function (item) {
        if (loadScript(item), checkScript) {
            successCounter++;
        } else {
            errorCounter++;
        }    
    });
    var msg = "All "+ successCounter +"scripts loaded.";
    var error = "Could not load all scripts. " + errorCounter + " scripting files did not load.";
    if (errorCounter > 0) {
        return error;
    } else {
        return msg;
    }
}

/*  load all assets sequentially    */
function loadAllAssets(assetObjects) {
    var successCounter=0;
    var errorCounter=0;
    for (var assetObject in assetObjects ) {
        if (loadAsset(assetObjects[assetObject]), checkAsset) {
            successCounter++;
        } else {
            errorCounter++;
        }
    }
    var msg = "All "+ successCounter +"assets loaded.";
    var error = "Could not load all assets. " + errorCounter + " image sets did not load.";
    if (errorCounter > 0) {
        return error;
    } else {
        return msg;
    }
}

/*  Assets  */
/*
*       var Assets = {
*           Images: { cards: cards[52], Decals: null, backgroundObjects: null, },
*           Sounds: { backgroundMusic: null, eventMusic: null, soundEffects: null },
*           Videos: { cutScenes[1] }
*       };       
*/

//  Assets --> Images --> Cards
import { Card, gCardImageCacheObj } from "./lib/card.mjs";

//  Card methods
function createDeck() {
    let cards = [];
    const SUITS= [];
    const FACES= [];
    let n = 0;
    for (let y = 0; y < SUITS.length; y++) {
        var rank = 1;
        for (let x = 0; x < FACES.length; x++) {
            cards[n] = new Card(rank, FACES[x], SUITS[y]);
            cards[n].init(); //  load images into cache object
            n++;
            rank++;
        }
    }
    return gCardImageCacheObj;
}
function percent(amount, total) {
    let percentage = (amount / total) * 100; 
    return Math.floor(percentage);
}

/*  function calls to load everything   */
function main() {
    //import {*} as gfx from "../graphicslib.js";
    console.time("loadTime");
    console.log(loadAllScripts(scripts));
    console.log(loadAllAssets(assets));
    //  console.log(loadAllModules);
    console.log('GAME LOADED!');
    console.timeEnd("loadTime");
}
    // remove title screen so user can get to play game on canvas behind title UI/screen


    // var modal = document.getElementById('home_screen');
    // modal.style.display = "none";

    // a better way: remove restriction on closing the title UI till everything loads


/**
 *      function loadGfxEngine() {
 *          return new Promise(resolve => {
 *              setTimeout(() => {
 *                  resolve();
 *                  var script_tag = document.createElement('script');
 *                  script_tag.src = "../lib/graphicslib.js";
 *                  document.head.appendChild('script_tag');
 *              }, 2000);
 *          });
 *      }
 *      function scriptLoadCheck(script) {
 *          var isLoaded = True;
 *          if (scriptLoaded) {
 *              console.log("Script successfully loaded.");
 *              isLoaded=True;
 *          } else {
 *              console.log("Error: Script did not load!");
 *              isLoaded=False;
 *          }
 *          return new Promise(resolve => {
 *              resolve(isLoaded);
 *          });
 *      }
 *      loadAllScripts(callback) { 
 *          Return: Load gfxEngine then display_interface then UserInput then main script
 *      }
 *      
 *      loadAllScripts().then(status_msg => {
 *          console.log(status_msg);
 *      })
 * 
 */