
// import deck from '../allfours.js';
// import * as gfx from 'graphicslib.js';




/*  Script Objects  */
const mainScript = {
    filepath: "../allfours.js", 
    errorMsg: "Something happened. Main Game Script did not load!",
    successMsg: "Main program loaded sucessfully",
};
const inputScript = {
    filepath: "UserInput.js",
    errorMsg: "Something happened. User input Script did not load!",
    successMsg: "User input script loaded sucessfully",
};
const gfxEngine = {
    filepath: "graphicslib.js",
    errorMsg: "Something happened. Graphics Engine did not load!",
    successMsg: "Graphics Engine loaded sucessfully",
};
const DisplayInterface = {
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
            var script_tag = document.createElement('script');
            var head_tag = document.head;
            script_tag.src=s.filepath;
            head_tag.appendChild(script_tag);              
            resolve(s);                      
        });   // 
    };
    
    /* script check */
    let checkScript = function (script) {
        return new Promise(function (resolve, reject) {
            var headArr = document.getElementsByTagName('head');
            headArr.forEach(element => {
                if (element.src == script.src) {
                    console.log('success');
                    resolve(script.successMsg);
                } 
            });
            console.log('failure');
            reject(script.errorMsg); 
        });
    };
    

/*  load all scripts sequentially    */
function loadAllScripts(scriptObjectsArr) {
    var successCounter=0;
    var errorCounter=0;
    
    scriptObjectsArr.forEach(element => {
        //loadScript(element).then(checkScript(fromResolve,fromReject)
        //debugger;
        loadScript(element).then(function(passedObj) {
            return checkScript(passedObj);
        }).then(function (fromResolve) {
            successCounter++;
            message(fromResolve);
        }).catch(function (fromReject) {
            errorCounter++;
            message(fromReject);
        });
    });

    var msg = "All "+ successCounter +" scripts loaded.";
    var error = "Could not load all scripts. " + errorCounter + " image sets did not load.";
    if (errorCounter > 0) {
        return error;
    } else {
        return msg;
    }
}

/*  function calls to load everything   */
function loadGame() {
    console.time("loadTime");
    console.log(loadAllScripts(scripts));
    console.log('GAME LOADED!');
    console.log('Game did not load!');
    console.timeEnd("loadTime");
}