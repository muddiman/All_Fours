/*

            LOAD SEQUENCE

            1. Title Screen
            2. Script
            3. Assets - graphics & sound
            4. 



*/



        //  Title Screen
        //  Name, Team, Options/Settings, Start Game
        //  Define system and asset needs: resolution, game board size and orientation, sound on/off,  

        //  Load scripts, sequencially, callback functions when loaded successfully or throw errors when occur


        //  Load needed Assets from options selected on Title Screen, and the 
function foo() {
    //  card images, asset atlas, sprite sheet (for animation)
    loadCardImages();
    console.log("Cards Images loaded successfully!");
    loadImageObjects();
    console.log("Image objects loaded successfully!");
    loadSprites();
    console.log("Animation sprites loaded successfully!");
    loadSoundModule();
    console.log("Sound Module loaded successfully!");
}
/*  Load counter object    */
var counter = {
    scriptsLoaded: 0,
    scriptsNotLoaded: 0,
    assetsLoaded:  0,
    assetsNotLoaded: 0,
};

/*  Asset Objects   */
/*  Array of assets  */
// var assets = [cardImages, imgAssets, sprites, audioAssets,];

/*  Script Objects  */
var mainScript = {
    filepath: "../allfours.js",
    errorMsg: "Something happened. Game Script did not load!",
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
var scripts = [mainScript, inputScript, gfxEngine, DisplayInterface,];

/*  customizable confirmation message    */
function callback(message) {
    console.log(message);
}

/*  for each script */
function loadScript(s) {
    var script_tag = document.createElement('script');
    script_tag.src=s.filepath;
    document.head.appendChild(script_tag);
    if (document.getElementsByTagName('script').length != counter.scriptsLoaded + 1) {           //  check: if scripts exists on the DOM
        counter.scriptsNotLoaded++;
        callback(s.errorMsg);
    } else {
        callback(s.successMsg);
        counter.scriptsLoaded++;            
    } 
}

/*  for each asset  */
function loadAsset(a) {
    var img_tag = document.createElement('img');
    img_tag.src=a.filepath;
    if (document.getElementsByTagName('img') != counter.assetsLoaded + 1)   {        //  check
        counter.assetsNotLoaded++;
        callback(a.errorMsg);
    } else {            
        callback(a.successMsg);
        counter.assetsLoaded++;
    }
} 

/*  load all sequentially   */
function loadAllScripts(scriptObjects) {
    for (var scriptObject in scriptObjects ) {
        loadScript(scriptObject);
    }
    var msg = "All scripts loaded.";
    var error = "Could not load all scripts. " + counter.scriptsNotLoaded + " did not load.";
    if (counter.scriptsNotLoaded > 0) {
        callback(error);
    } else {
        callback(msg);
    }
}
function loadAllAssets(assetObjects) {
    for (var assetObject in assetObjects ) {
        loadAsset(assettObject);
    }
    var msg = "All assets loaded.";
    var error = "Could not load all assets. " + counter.assetsNotLoaded + " did not load.";
    if (counter.assetsNotLoaded > 0) {
        callback(error);
    } else {
        callback(msg);
    }
}

/*  function calls to load everything   */
function loadMain() {
    loadAllScripts(scripts);
    loadAllAssets(assets);
    window.alert('Game Loaded Succesfully!');
}