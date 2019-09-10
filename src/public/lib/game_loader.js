/*  globals */
const scriptArray = [
    "./lib/settings.js",
    "./lib/display-interface.js",    
    "./lib/debugging.js",
    "./lib/engine.js",    
    "./lib/ai.js",
    "./lib/card.js",
    "./lib/player.js",
    "./lib/soundlib.js",
    "./lib/controller.js",
    "./lib/tickertape.js",
    // "/src/public/lib/touch.js",
];
var cardCount=0;

/*  functions   */
// async
 function loadScript(scriptSource) {
    // console.log(`Loading script: ${scriptSource} to DOM.`);
    let script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", scriptSource);
    let gameContainer = document.getElementById("game_container");
    // await 
    gameContainer.appendChild(script);
}

function loadVideos(id, counter) {
/*  video files  */
}

function loadSounds(id, counter) {
/*  audio files  */
}

/* 
function getIds() {
    let ids = [];
    let index = 0;
    let suitArray = ["s", "c", "h", "d"];
    let faceArray = ["2", "3", "4", "5", "6", "7", "8", "9", "t", "j", "q", "k", "a"];

    return ids;     //  returns an array of (52) unique card ids
} */

function loadImageCache() {
    let cardCounter=0;
    SUITS.forEach(suit => {     //  SUITS
        FACES.forEach(face => {     //  FACES
            let image = new Image();
            image.id =  `${face}${suit}`;
            image.src = `img/${face}${suit}.png`;    //  `img/${this.getCardName()}.png`;
            image.onload =  () => {
                gCardImageCacheObj[image.id] = image;
                cardCounter++;
                console.log(`${face}${suit} loaded. ${cardCounter} cards loaded.`);
            };
        });
    });
}

function loadAllGameComponents() {
    /*  load CARD image files  */
    loadImageCache();
    /*  load source code files  */
    scriptArray.forEach(element => {
        loadScript(element);
    });
    /*  load all media  */
    /*  load images */

    /*  load videos */
    /*  load sounds */
}

/* 
var imageObj = {
    id: "",
    src: "",
};
 */