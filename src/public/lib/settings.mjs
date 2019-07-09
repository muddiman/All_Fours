//      /src/public/lib/settings.mjs

/*
                Title:      ALL FOURS GAME
                Language:   Javascript
                Programmer: .muddicode 
                Code:       Settings Class Module  (allfours.js)   
    
    DESCRIPTION:    screen module for All Fours Game
    PURPOSE:        screen class, generates new screens for all fours game
*/
import { debug } from "./debugging.mjs";

const ON=true;
const OFF=false;
const displayArr=["desktop", "tablet", "mobile"];
const playerArr=["TWO_PLAYER", "FOUR_PLAYER"];
const difficultyArr=["EASY", "HARD", "PRO"];

/*  default    */
export var SETTINGS = {
    SOUND_ON    :   OFF,
    DEBUG_MODE  :   OFF,
    MOUSE_OVER  :   OFF,    //  card-higlight/mouse-over
    MAIN_VOLUME :   0,      //  MASTER VOLUME: Range between 0 .. 10
    DISPLAY_MODE:   displayArr[0],
    MODE        :   playerArr[0],
    DIFFICULTY  :   difficultyArr[0],
    setSound    :   function (onOrOff) {
                        if (onOrOff === true || onOrOff === false) {
                            this.SOUND_ON = onOrOff;
                        } else {
                            debug.console(`Invalid Type: Parameter ${onOrOff} must be of type boolean.`);
                        }
                    },
    setDebugging:   function (onOrOff) {
                        if (onOrOff === true || onOrOff === false) {
                            this.DEBUG_MODE = onOrOff;
                        } else {
                            debug.console(`Invalid Type: Parameter ${onOrOff} must be of type boolean.`);
                        }
                    },
    setMouseHighlight:  function (onOrOff) {
                            if (onOrOff === true || onOrOff === false) {
                                this.MOUSE_OVER = onOrOff;
                            } else {
                                debug.console(`Invalid Type: Parameter ${onOrOff} must be of type boolean.`);
                            }
                        },
    setVolume   :   function (volume) {
                        if (volume >= 0 && volume <= 10) {
                            this.MAIN_VOLUME = volume;
                        } else {
                            debug.console(`Invalid Type: Parameter ${volume} must be of type integer, between 0 and 10.`);
                        }
                    },
    setDisplayMode   :   function (mode) {
                        if (mode === displayArr[0] || mode === displayArr[1] || mode === displayArr[2]) {
                            this.DISPLAY_MODE = mode;
                        } else {
                            debug.console(`Invalid Input: Parameter ${mode} must be of ${displayArr}.`);
                        }
                    },
    setPlayerMode   :   function (mode) {
                        if (mode === playerArr[0] || mode === playerArr[1]) {
                            this.MODE = mode;
                        } else {
                            debug.console(`Invalid Input: Parameter ${mode} must be of ${playerArr}.`);
                        }
                    },
    setDifficultyMode:  function (mode) {
                        if (mode === difficultyArr[0] || mode === difficultyArr[1] || mode === difficultyArr[2]) {
                            this.DIFFICULTY = mode;
                        } else {
                            debug.console(`Invalid Input: Parameter ${mode} must be of ${difficultyArr}.`);
                        }
                    },
    init:               function (sound, debug, mouse, volume, display, players, difficulty) {
                        this.setSound(sound);    // this.SOUND_ON    =   sound;
                        this.setDebugging(debug);    //  this.DEBUG_MODE  =   debug;
                        this.setMouseHighlight(mouse);    //  this.MOUSE_OVER  =   mouse;         //  card-higlight/mouse-over
                        this.setVolume(volume);        //  MASTER VOLUME: Range between 0 .. 10
                        this.setDisplayMode(display);   //   displayArr[display];
                        this.setPlayerMode(players);       //   =   playerArr[players];
                        this.setDifficultyMode(difficulty); //  =   difficultyArr[difficulty];
                    },
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