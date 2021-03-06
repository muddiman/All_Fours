//  filename:   engine.js
//  path:       /lib/engine.js

/*
                                                Title: THE ALL FOURS GAME
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Game Engine    (Main Graphics & Animation Loop Class)                        
*/

// import { gameLoop } from "../allfours.js";
// import { debug } from "./debugging.mjs";
/*  flags   */
var METHODOLOGY="setInterval";      // or "requestAnimationFrame"
console.log(`Reading Engine script.`);
/*   Game Engine    */
var Engine = function(time_step, render, gameLoop) {
//  this.update         = update;                   // update function
    this.time_interval  = time_step;                // related to the games frame rate
    this.render         = render;                   // render function (undefined)
    this.gameLoop       = gameLoop;                 // game logic loop
    this.time           = 0;                        // previous time_stamp
    this.accumulated_time = 0;                      // amt. of time that has accumulated since last update fcn call
    this.loopCounter    = 0;
    this.isBehind       = false;                     // if Engine is running behind and getting trouble keeping up with current frame rate
    this.animate        = function () {
                            // console.trace('Animate - Request Animation Frame loop:');
                            this.loopCounter = (this.loopCounter + 1) % 60;
                                if (this.loopCounter === 0) {
                                    gameLoop();
                                    render();
                                }
                            // render();
                            // this.gameLoop();
                            requestAnimationFrame(this.animate);
                            // requestAnimationFrame(this.start());
                        }; 
    this.start          = function () {
                            // console.trace('RunID - setInterval loop:');
                            //  debug.console(`using ${METHODOLOGY}.`);
                            // this.init();
                            // var n=0;                // for debugging
                            // var r=0;
                            this.runID = setInterval(() => {
                            // render();
                                let time_stamp = Date.now();
                                if (this.time === 0) {
                                    this.time = time_stamp;
                                } 
                                this.accumulated_time += time_stamp - this.time;
                                // debug.console(this.accumulated_time);                     // debugging
                                this.time = time_stamp;
                                this.render();
                                this.loopCounter = (this.loopCounter + 1) % 24;
                                if (this.loopCounter === 0) {
                                    this.gameLoop();
                                }
                                /*  this check ensures the system won't crash trying to keep up with timely cycles 
                                it ignores updates & renders if the accumulated time extends for more than 3 cycles   */
                                if (this.accumulated_time >= this.time_interval * 3) {
                                    debug.console(`A lot behind ${this.accumilated_time}`);
                                    this.accumulated_time = 0;
                                    //  debug
                                    // n++;
                                }
                                /*  keeps the engine updated if cycle time lapses for more than a cycle     */
                                while (this.accumulated_time >= this.time_interval) {
                                    this.accumulated_time -= this.time_interval;
                                    //  this.update();
                                    this.isBehind = true;
                                }
                                if (this.isBehind) {       //  screen is drawn only when when the matrix is updated
                                    this.render();
                                    // r++;                    //   debugging
    /*                                 debug.console(`one behind ${r}`);  */
                                    // debug.console(this.accumulated_time); 
                                    this.isBehind = false;
                                }
                            }, this.time_interval);

                        };
    this.stop           = () => {
                               clearInterval(this.runID);
                               cancelAnimationFrame(this.animate);
                        };
};
/* Prototypes   */
Engine.prototype.init = function () {
    //  this.time_interval    = time_step;                // related to the games frame rate
    //  this.update           = update;                   // update function
    //  this.render           = render;                   // render function (undefined)
    this.time             = 0;                        // previous time_stamp
    this.accumulated_time = 0;                      // amt. of time that has accumulated since last update fcn call
    this.isBehind        = false;
    //  this.animate          = requestAnimationFrame(callback);
};






/** **************************************************************************************************************************************************************
 * 
 *  @copyright (c) 2019-2020 Gallatin Engineering Ltd. All rights reserved.
 *  @developer RMC Labs Inc (NY)
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com             (muddi@muddicode.com | rclarke@roger-clarke.com) 
 *  @version   0.9.1
 *  @since     2019-02-7
 *  @download  https://www.github.com/muddiman/AllFours
 *  @license   Special commercial licesne with Gallatin Engineering Ltd, No one may use, copy to distribute without express written consent from RMC Labs, Inc
 *  @See:      http://www.twomanallfours.com/license.html
 *             Free to use and/or distribute for personal or academic purposes.
 *             To Site the source code use the following format at beginning or end of each source code file where it was used (in whole or part):
 *             "Clarke, Roger A. (2019) All Fours Game (ver. 1.0.0) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman" & http://www.gallatinengineering.com/pages/twomanallfours.html. 
 * 
***************************************************************************************************************************************************************************************** */
