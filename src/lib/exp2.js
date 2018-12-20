
// import deck from '../allfours.js';
// import * as gfx from 'graphicslib.js';




/*  Script Objects  */
const mainScript = {
    filepath: "../allfours.js",
    id: "all_fours_game", 
    errorMsg: "Something happened. Main Game Script did not load!",
    successMsg: "Main program loaded sucessfully",
};
const inputScript = {
    filepath: "UserInput.js",
    id: "user_input",
    errorMsg: "Something happened. User input Script did not load!",
    successMsg: "User input script loaded sucessfully",
};
const gfxEngine = {
    filepath: "graphicslib.js",
    id: "graphics_library",
    errorMsg: "Something happened. Graphics Engine did not load!",
    successMsg: "Graphics Engine loaded sucessfully",
};
const DisplayInterface = {
    filepath: "display-int.js",
    id: "display_interface",
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
    function message(msg) {
        console.log(msg);
    }
 /*  
     let msg = function (msg) {
        return new Promise(function (resolve) {
           resolve(console.log(msg));
        });
    };
 */


    /*  for each script  */
    let loadScript = function (s) {
        return new Promise(function (resolve) {
            if (gCachedAssets[s.id] == null) {
            var script_tag = document.createElement('script');
            var head_tag = document.head;
            script_tag.src=s.filepath;
            script_tag.id = s.id;
            script_tag.setAttribute("type", "text/javascript");
            script_tag.addEventListener('load', function (e){
                onLoadedCallback(s);
            }, false);
            head_tag.appendChild(script_tag);
            gCachedAssets[s.id] = script_tag;              
            resolve(s); 
        } else {
            onLoadedCallback(gCachedAssets[s.id]); //
        }                     
        });   // 
    };
    
    /* script check */
    let checkScript = function (script) {
        return new Promise(function (resolve, reject) {
            //var scriptArr = document.scripts;
            //scriptArr.forEach(element => {
                if (document.getElementById(script.id)) {
                //if (element.src == script.src) {
                    console.log('Success: ' + script.id + ' was loaded.');
                    resolve(script.successMsg);
                } else {
                    console.log('Failure: ' + script.id + ' did not load.');
                    reject(script.errorMsg);
                }
            //});
             
        });
    };
    

/*  load all scripts sequentially    */
let loadAllScripts = function (scriptObjectsArr) {
    return new Promise(function (resolve, reject) {
        var successCounter=0;
        var errorCounter=0;

        scriptObjectsArr.forEach(element => {
            loadScript(element).then(function (passedObj)  { //function(passedObj) {
                return checkScript(passedObj);    //return
            }).then(function (fromResolve) {
                successCounter++;
                message(fromResolve);
            }).catch(function (fromReject) {
                errorCounter++;
                message(fromReject);
            });
        });

        var msg = "All "+ successCounter +" scripts loaded.";
        var error = "Could not load all scripts. " + errorCounter + " scripts did not load.";
        if (errorCounter > 0) {
            reject(error);
        } else {
            resolve(msg);
        }
    });
};

var gCachedAssets = {};

/*  function calls to load everything   */
function loadGame() {
    console.time("loadTime");
    loadAllScripts(scripts).then(function (resolved) {
        console.log(resolved);
        setTimeout(function () {alert('GAME LOADED!');}, 2000);
    }).catch(function (rejected) {
        console.log(rejected);
        alert('Game did not load!');
    });
    console.timeEnd("loadTime");
}