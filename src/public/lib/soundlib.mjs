//  filename:   soundlib.mjs
//  path:       /lib/sooundlib.mjs

/*
                                                Title: THE ALL FOURS GAME
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Sound Engine    (Sound Effects & Music)                        
*/



/*****************************************************************************************************************************************
 * 
 *          AUDIO SECTION
 * 
 *****************************************************************************************************************************************/
/*
*
*       WEBKIT AUDIO
*
*/
/* 
function SoundManager() {
    this.clips           = {};
    this.enabled         = true;
    this._context        = null;
    this._mainNode       = null;
}

//--------------------------------------------------------
   SoundManager.prototype.init              = function()
                                            {
                                                try {
                                                    this._context = new webkitAudioContext();
                                                }
                                                catch(e) {
                                                    alert(e + ": Browser does not support Web Audio API!");
                                                }

                                                this._mainNode = this._context.createGainNode(0);
                                                this._mainNode.connect(this._context.destination);
                                            };

   SoundManager.prototype.loadAsync         = function(path, callbackFcn) {
                                                if (this.clips[path])
                                                {
                                                    callbackFcn(this.clips[path].s);
                                                    return this.clips[path].s;
                                                }
                                                var clip = {s:new Sound(), b:null, l:false};
                                                this.clips[path] = clip;
                                                clip.s.path = path;

                                                var request = new XMLHttpRequest();
                                                request.open('GET', path, true);
                                                request.responseType = "arraybuffer";
                                                request.onload = function() {
                                                    gSM._context.decodeAudioData(request.response,
                                                        function(buffer)
                                                        {
                                                            clip.b = buffer;
                                                            clip.l = true;
                                                            callbackFcn(clip.s);
                                                        },
                                                        function(data)
                                                        {
                                                            console.log("failed");
                                                            Logger.log("failed");
                                                        });
                                                };
                                                request.send();
                                                return clip.s;

                                            };
   //----------------------------------------------
   SoundManager.prototype.playSound         = function(path, settings)  {
                                                if (!gSM.enabled)
                                                    return false;

                                                var looping=false;
                                                var volume=0.8;
                                                if (settings)
                                                {
                                                    if (settings.looping)
                                                        looping=settings.looping;
                                                    if (settings.volume)
                                                        volume = settings.volume;
                                                }

                                                var sd = this.clips[path];
                                                if (sd == null)
                                                    return false;
                                                if (sd.l == false) return false;
                                                // creates a sound source
                                                var currentClip = gSM._context.createBufferSource();

                                                // tell the source which sound to play
                                                currentClip.buffer=sd.b;
                                                currentClip.gain.value= volume;
                                                currentClip.connect(gSM._mainNode);
                                                currentClip.loop=looping;

                                                // play the source now
                                                currentClip.note.On(0);
                                                return true;
                                            };
//-------------------------------------------------------------
   SoundManager.prototype.togglemute        = function() {
                                                if (this._mainNode.gain.value>0)
                                                    this._mainNode.gain.value=0;
                                                else
                                                    this._mainNode.gain.value=1;
                                            };
//-------------------------------------------------------------
   SoundManager.prototype.stopAll           = function () {
                                                this._mainNode.disconnect();
                                                this._mainNode = this._context.createGainNode(0);
                                                this._mainNode.connect(this._context.destination);
                                            };    
//--------------------------------------------------------------------------------------------------------------------

export var gSM = new SoundManager();

//--------------------------------------------------------------------------------------------------------------------

function Sound() {
    this.init   = function() {

                };
//------------------------------------------------------
    this.play   = function(loop) {                   //  loop: boolean
                    gSM.playSound(this.path, {looping:loop, volume:1});
                };
} */

/* export function playSoundInstance(soundpath) {
       var sound = gSM.loadAsync(soundpath, function(sObj) {sObj.play(false);}); 
}   */
   
//--------------------------------------------------------------------------------------------------------------------

/**********************************************************************************************************************
*  
*                                HTML5 Sound Library 
*
************************************************************************************************************************ 
*
*/

// import { SOUND_ON } from "../allfours";
const SOUND_ON=true;

/*  sound constructor/class */
export function Sound(src) {
    this.sound          = document.createElement("audio");
    this.sound.src      = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.getElementById("game_container").appendChild(this.sound);
    // document.body.appendChild(this.sound);      //   Attach sound to 'canvas' instead of 'body' 
}
Sound.prototype.mute        = false;
Sound.prototype.play        = function() {
                                if (SOUND_ON === true) {
                                    this.sound.play();  
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
Sound.prototype.muteAudio   = function () {                 //  toggle the mute function
                            if (this.mute === false) {
                                // this.sound.setAttribute("muted", "muted");
                                this.mute = true;
                            } else {
                                // this.sound.removeAttribute("muted", "muted");
                                this.mute = false;
                            }
                        };
// Sound.prototype.loop    = false;

export function playSoundInstance(src) {
    let soundObj = new Sound(src);
    soundObj.play();
}

/************************************************************************************************ */

/*  Sound Effects   */
//  load effect list
export var sndEffect = [];
sndEffect[0] = new Sound(`./lib/snd/ui-sound3.oga`);
sndEffect[1] = new Sound(`./lib/snd/ui-sound-20.oga`);



/*  Background Music    */
//  load background music streams
export var bkgndMusic = [];
bkgndMusic[0] = new Sound(`./lib/snd/ui-sound-19.oga`);

/** **************************************************************************************************************************************************************
 * 
 *  @copyright (c) 2019 Roger A. Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com             (muddi@muddicode.com | rclarke@roger-clarke.com) 
 *  @version   0.7.1
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
