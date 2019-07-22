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
const ENABLED=true;
const DISABLED=false;
const displayArr=["desktop", "tablet", "mobile"];
const playerArr=["TWO_PLAYER", "FOUR_PLAYER"];
const difficultyArr=["EASY", "HARD", "PRO"];

/*  default    */
export var SETTINGS = {
    SOUND       :   ENABLED,
    DEBUG_MODE  :   DISABLED,
    MOUSE_OVER  :   ENABLED,                //  card-higlight/mouse-over
    MASTER_VOLUME :   10,                    //  MASTER VOLUME: Range between 0 .. 10
    SOUNDmixer  :   {
                        SndFX:  [8, 8, 8],         //  n channels
                        Bkgnd:  [5, 5],         //  2 or 3 channels
                    },
    DISPLAY_MODE:   displayArr[0],
    MODE        :   playerArr[0],
    DIFFICULTY  :   difficultyArr[0],
    setSound    :   function (onOrOff) {
                        if (onOrOff === true || onOrOff === false) {
                            this.SOUND = onOrOff;
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
                            this.MASTER_VOLUME = volume;
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
    init:           function (sound, debug, mouse, volume, display, players, difficulty, sndLevel, musLevel) {
                        this.setSound(sound);    // this.SOUND    =   sound;
                        this.setDebugging(debug);    //  this.DEBUG_MODE  =   debug;
                        this.setMouseHighlight(mouse);    //  this.MOUSE_OVER  =   mouse;         //  card-higlight/mouse-over
                        this.setVolume(volume);        //  MASTER VOLUME: Range between 0 .. 10
                        this.setDisplayMode(display);   //   displayArr[display];
                        this.setPlayerMode(players);       //   =   playerArr[players];
                        this.setDifficultyMode(difficulty); //  =   difficultyArr[difficulty];
                        this.SOUNDmixer.Bkgnd.forEach(channel => {
                            channel = musLevel;
                        });
                        this.SOUNDmixer.SndFX.forEach(channel => {
                            channel = sndLevel;
                        });
                    },
};

/*  load saved settings from json   */
function loadSettingJson(url) {
    settingsOBJ = getFile(url);
    // settingsOBJ  = JSON.parse(settingsJSON);
    SETTINGS.init(settingsOBJ.SOUND, settingsOBJ.DEBUG, settingsOBJ.MOUSE_OVER, settingsOBJ.MASTER_VOLUME, settingsOBJ.DISPLAY, settingsOBJ.MODE, settingsOBJ.DIFFICULTY, 7, 3);
}

function getFile(filenameJSON) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            // document.getElementById("demo").innerHTML = myObj.name;
        }
    };
    xmlhttp.open("GET", filenameJSON, true); 
    xmlhttp.send();
    return myObj;
}
function saveFile(settingsObject) {
    var jsonhttp = new XMLHttpRequest();
    var sendFile = JSON.stringify(settingsObject);
/*     jsonhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var sendFile = JSON.stringify(settingsObject);
        }
    }; */
    jsonhttp.open("POST", "settings.json", true);
    jsonhttp.send("settings.json");
}

/* {
    "SOUND":    "true",
    "DEBUG":    "false",
    "MOUSE_OVER": "true",
    "MASTER_VOLUME": 7,
    "SOUND_MIXER": {
        "SndFx": [7, 7, 7],
        "Bkgnd": [5, 5],
    },
    "DISPLAY":    "desktop",
    "MODE":       "TWO_PLAYER",
    "DIFFICULTY": "EASY"

} */