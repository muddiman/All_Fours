//  filename:   soundlib.js
//  path:       /lib/soundlib.js

/*
                                                Title: THE ALL FOURS GAME
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Sound Engine    (Sound Effects & Music)                        
*/


/**********************************************************************************************************************
*  
*                                HTML5 Sound Library 
*
************************************************************************************************************************ 
*
*/

// import { SETTINGS } from "./settings.mjs";

/*  Sound Effects   */
//  load SOUND effectS list
var sndFx = [];

/*  Background Music    */
//  load background music streams
var bkgndMusic = [];

/*  sound constructor/class */
function Sound(src) {
    this.sound          = document.createElement("audio");
    this.sound.src      = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.audible = true;
    this.sound.trackVolume = 1.0;
    document.getElementById("game_container").appendChild(this.sound);
    // document.body.appendChild(this.sound);      //   Attach sound to 'canvas' instead of 'body' 
}
Sound.prototype.mainVolume      = SETTINGS.MASTER_VOLUME / 10;
Sound.prototype.mute        = false;
Sound.prototype.muteAll     = function () {
                                if (this.mute === false) {
                                    this.mute = true;
                                } else {
                                    this.mute = false;
                                }
                            };
Sound.prototype.setFxTrackVolume = function (n) {
                                this.sound.trackVolume = n / 10; // Math.floor((SETTINGS.MASTER_VOLUME / 10) * SETTINGS.SOUNDmixer.sndFx[n]) / 10;
                            }; 
Sound.prototype.setMusicTrackVolume = function (n) {
                                this.sound.trackVolume = n / 10; //  Math.floor((SETTINGS.MASTER_VOLUME / 10) * SETTINGS.SOUNDmixer.Bkgnd[n]) / 10;
                            };                                                     
Sound.prototype.play        = function() {
                                if (this.mute === false && SETTINGS.SOUND === true) {
                                    if (audible === true) {
                                        this.sound.play();  
                                    }
                                }
                            };
Sound.prototype.stop        = function() {
                                this.sound.pause();
                            };
Sound.prototype.loopAudio   = function () {
                            if (!this.sound.loop) {
                                this.sound.setAttribute("loop", "loop");
                            } else {
                                this.sound.removeAttribute("loop", "loop");
                            }
                        };
Sound.prototype.muteTrack   = function () {                 //  toggle the mute function
                            if (this.audible === false) {
                                // this.sound.setAttribute("muted", "muted");
                                this.audible = true;
                            } else {
                                // this.sound.removeAttribute("muted", "muted");
                                this.audible = false;
                            }
};
// Sound.prototype.loop    = false;

function playSoundInstance(src) {
    let soundObj = new Sound(src);
    soundObj.play();
}

/************************************************************************************************ */
/*  manually    */
const tracks = {
    soundEffects: [
        "./lib/snd/ui-sound-19.oga",
        "./lib/snd/ui-sound-20.oga",
        "./lib/snd/ui-sound-03.oga"
    ],
    backgroundMusic: [
        "./lib/snd/ui-sound-19.oga",
        "./lib/snd/ui-sound-20.oga"
    ],
};

/*  load audio tracks  apply settings to each track */
 function loadTracks(urlOBJ) {
    for (let index = 0; index < urlOBJ.soundEffects.length; index++) {
        sndFx[index] =  new Sound(urlOBJ.soundEffects[index]);
        console.log(urlOBJ.soundEffects[index]);
        sndFx[index].setFxTrackVolume(SETTINGS.SOUNDmixer.sndFx[index]);        
    }    
    for (let index = 0; index < urlOBJ.backgroundMusic.length; index++) {
        bkgndMusic[index] =  new Sound(urlOBJ.backgroundMusic[index]);
        bkgndMusic[index].setMusicTrackVolume(SETTINGS.SOUNDmixer.Bkgnd[index]);                
    }
}


function getFile(filenameJSON) {
    let myObj={};
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            // return myObj;
        }
    };
    xmlhttp.open("GET", filenameJSON, false);
    try {
        xmlhttp.send();
    } catch (error) {
      console.log(error);
      myObj = tracks;  
    } 
    return myObj;
}

/*  retrieve from json  */
function getTrackListing(url) {
    // let listingOBJ = getFile(url);
    // loadTracks(tracks);
}

// getTrackListing("./soundtracks.json");
 
/** **************************************************************************************************************************************************************
 * 
 *  @copyright (c) 2019 Roger A. Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com             (muddi@muddicode.com | rclarke@roger-clarke.com) 
 *  @version   0.9.1
 *  @since     2019-02-7
 *  @download  https://www.github.com/muddiman/AllFours
 *  @license   NOT for 'commercial use', otherwise free to use, free to distribute
 *  @See:      http://www.roger-clarke.com/Matrix/license.html
 *             Free to use and/or distribute for personal or academic purposes.
 *             Must site the source code using the following format at beginning or end of source code file where it was used (in whole or part):
 *             "Clarke, Roger A. (2019) All Fours Game (ver. 1.0.0) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman". 
 * 
***************************************************************************************************************************************************************************************** */
