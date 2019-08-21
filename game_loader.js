/*  globals */
const scriptArray = [
    "/src/public/lib/ai.js",
    "/src/public/lib/card.js",
    "/src/public/lib/controller.js",
    "/src/public/lib/debugging.js",
    "/src/public/lib/engine.js",
    "/src/public/lib/player.js",
    "/src/public/lib/screen.js",
    "/src/public/lib/soundlib.js",
    "/src/public/lib/tickertape.js",
    "/src/public/lib/controller.js",
];
var gCardImageCacheObj = {};
var cardCount=0;

/*  functions   */
function loadScript(scriptSource) {
    let script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", scriptSource);
    let gameContainer = document.getElementById("game_container");
    gameContainer.appendChild(script);
}
function loadVideos(id, counter) {
    let image = new Image();
    image.id = id;
    image.src = `img/${id}.png`;    //  `img/${this.getCardName()}.png`;
    image.onload =  () => {
        //    this.imageLoaded = true;
        gCardImageCacheObj[id] = image;
        counter++;
        console.log(`${id} loaded. ${counter} cards loaded.`);
    };
}
function loadSounds(id, counter) {
    let image = new Image();
    image.id = id;
    image.src = `img/${id}.png`;    //  `img/${this.getCardName()}.png`;
    image.onload =  () => {
        //    this.imageLoaded = true;
        gCardImageCacheObj[id] = image;
        counter++;
        console.log(`${id} loaded. ${counter} cards loaded.`);
    };
}

function loadCardImage(id, counter) {
    let image = new Image();
    image.id = id;
    image.src = `img/${id}.png`;    //  `img/${this.getCardName()}.png`;
    image.onload =  () => {
        //    this.imageLoaded = true;
        gCardImageCacheObj[id] = image;
        counter++;
        console.log(`${id} loaded. ${counter} cards loaded.`);
    };
}


function getIds() {
    let ids = [];
    let index = 0;
    let suitArray = ["s", "c", "h", "d"];
    let faceArray = ["2", "3", "4", "5", "6", "7", "8", "9", "t", "j", "q", "k", "a"];
    suitArray.forEach(suit => {
        faceArray.forEach(face => {
            ids[index] = `${face}${suit}`;
            index++;
        });
    });
    return ids;     //  returns an array of (52) unique card ids
}

function loadImageCache() {
    let arrayOfIds = getIds();
    arrayOfIds.forEach(id => {
        loadCardImage(id, cardCount);
    });
}

function loadAllGameComponents() {
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