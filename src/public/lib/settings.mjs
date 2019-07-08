//      /src/public/lib/settings.mjs

/*
                Title:      ALL FOURS GAME
                Language:   Javascript
                Programmer: .muddicode 
                Code:       Settings Class Module  (allfours.js)   
    
    DESCRIPTION:    screen module for All Fours Game
    PURPOSE:        screen class, generates new screens for all fours game
*/

const ON=true;
const OFF=false;

export var SETTINGS = {
    SOUND_ON    :   OFF,
    DEBUG_MODE  :   OFF,
    MOUSE_OVER  :   OFF,    //  card-higlight/mouse-over
    MAIN_VOLUME :   0,      //  Range between 0 .. 10
    SCREEN_SIZE :   ["desktop", "tablet", "mobile"],
    MODE        :   ["TWO_PLAYER", "FOUR_PLAYER"],
    DIFFICULTY  :   ["EASY", "HARD", "PRO"],
};
/* 
SETTINGS.prototype.mixer = {
    SndFX:  [],     //  n channels
    Bkgnd:  [],     //  2 or 3 channels
};

// var sound_tracks = {};       //  music: 2, Sound Effects: 5;

SETTINGS.mixer.prototype.init =function () {
    mixer.Bkgnd.forEach(channel => {
        channel = 3;
    });
    mixer.SndFX.forEach(channel => {
        channel = 7;
    });
}; */