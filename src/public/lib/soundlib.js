
/*****************************************************************************************************************************************
 * 
 *          AUDIO SECTION
 * 
 *****************************************************************************************************************************************/

SoundManager = Class.extend({
    clips: {},
    enabled: true,
    _context: null,
    _mainNode: null,
//--------------------------------------------------------
   init: function()
   {
       try {
           this._context = new webkitAudioContext();
       }
       catch(e) {
           alert(e + ": Browser does not support Web Audio API!");
       }

       this._mainNode =this._context.createGainNode(0);
       this._mainNode.connect(this._context.destination);
   },
   loadAsync: function(path, callbackFcn)
   {
       if (this.clips[path])
       {
           callbackFcn(this.clips[path].s);
           return this.clips[path].s;
       }
       var clip = {s:new Sound(), b:null, l:false};
       this.clips[path] = clip;
       clips.s.path = path;

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

   },
   //----------------------------------------------
   playSound: function(path, settings)
   {
       if (!gSM.enabled)
           return false;

       var looping=false;
       var volume=0.2;
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
   },
//-------------------------------------------------------------
   togglemute: function()
   {
       if (this._mainNode.gain.value>0)
           this._mainNode.gain.value=0;
       else
           this._mainNode.gain.value=1;
   },
//-------------------------------------------------------------
   stopAll: function ()
   {
       this._mainNode.disconnect();
       this._mainNode = this._context.createGainNode(0);
       this._mainNode.connect(this._context.destination);
   }    
});

var gSM = new SoundManager();

Sound = Class.extend({
    init: function() {

    },
//------------------------------------------------------
   play: function(loop) {
       gSM.playSound(this.path, {looping:loop, volume:1});
   },
});
   function playSoundInstance(soundpath) {
       var sound = gSM.loadAsync(soundpath, function(sObj) {sObj.play(false);});
       
   }  
   
//---------------------------------------------------------------------------------------------------

                                /* HTML5 Sound Library  */

/*  sound constructor/class */
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }


