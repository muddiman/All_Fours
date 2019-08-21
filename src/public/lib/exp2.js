
// import deck from '../allfours.js';
// import * as gfx from 'graphicslib.js';



/*

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var scripts = JSON.parse(this.responseText);
    //document.getElementById("demo").innerHTML = myObj.name;
  }
};
xmlhttp.open("GET", "scripts.JSON", true);
xmlhttp.send();

*/



// var scripts = JSON.parse();
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
const scripts = [
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
    let loadScript =  (s) => {
        return new Promise(function (resolve) {
            if (gCachedAssets[s.id] == null) {
                let script_tag = document.createElement('script');
                let head_tag = document.head;
                script_tag.src=s.filepath;
                script_tag.id = s.id;
                script_tag.setAttribute("type", "text/javascript");
                head_tag.addEventListener('load', function (){
                    console.log(script_tag);
                    gCachedAssets[s.id] = script_tag;              
                }, false);
                head_tag.appendChild(script_tag);
                resolve(s); 
            } else {
                console.log(s.id + " already loaded."); // use cached assets
                // gCachedAssets[s.id];
            }                     
        });    
    };
    
    /* script check */
    let checkScript = function (script) {
        return new Promise(function (resolve, reject) {
                if (document.getElementById(script.id)) {
                    console.log(script.id + ' loaded.');
                    successCounter++;
                    resolve(true);
                } else {
                    console.log('Failure: ' + script.id + ' did not load.');
                    errorCounter++;
                    reject(script.errorMsg);
                }
            //});
             
        });
    }
    
    

/*  load all scripts sequentially    */
let loadAllScripts = function (scriptObjectsArr) {
    return new Promise(function (resolve, reject) {
        var successCounter=0;
        var errorCounter=0;

        scriptObjectsArr.forEach(element => {
            loadScript(element)
            .then(checkScript())  
            .then(function (fromResolve) {
                successCounter++;
                message(fromResolve);
            })
            .catch(function (fromReject) {
                errorCounter++;
                message(fromReject);
            });
        });

        //var msg = "All "+ successCounter +" scripts loaded.";
        //var error = "Could not load all scripts. " + errorCounter + " scripts did not load.";
        if (errorCounter > 0) {
            reject(errorCounter);
        } else {
            resolve(successCounter);
        }
    });
};
    

var gCachedAssets = [];

/*  function calls to load everything   */
function loadGame() {
    console.time("loadTime");
    loadAllScripts(scripts).then(function (scriptsLoaded) {
        console.log("All " + scriptsLoaded + " scripts loaded.");
        setTimeout(function () {alert('GAME LOADED!');}, 2000);
        console.timeEnd("loadTime");
    }).catch(function (rejected) {
        console.log(rejected);
        alert('Game did not load!');
    });
    //var ticker = require('./graphicslib').tickertape();
    //tickertape('me');
}
