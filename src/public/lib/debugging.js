//  filename:   debugging.mjs
//  path:   /lib/debugging.mjs
/*
                Title:  ALL FOURS GAME
                Language: Javascript
                Programmer: .muddicode 
                Code: Screen Class Module  (allfours.js)   
    
    DESCRIPTION:    debug module for All Fours Game
    PURPOSE:    debug object, generates new screens to display any parameter needed to be tracked

*/
console.log(`Reading the debugging script`);

/* const ON=true;
const OFF=false; */
// export var DEBUG_MODE=OFF;
// document.getElementById("msg_layer").style.visibility = "hidden";

// import { DEBUG_MODE } from "../allfours";
// import { gCanvasLayer } from "./screenOLD.mjs";
// import { SETTINGS }     from "./settings.mjs";
// export const DEBUG_MODE = SETTINGS.DEBUG_MODE;
const DEBUG_MODE=false;
const debug = {
    isUpdated:  false, 
    // screen:     new gCanvasLayer("debug_screen", 400 + 72, 450, 300 - 72, 150, 0.2, 4, 0, 0, 0),
    init:       () => {
                    if (DEBUG_MODE === true) {
                        let debugDiv = document.getElementById("debug_section");
                        let dbgHeading = document.createElement("H2");
                        dbgHeading.innerHTML = "DEBUGGING";
                        debugDiv.appendChild(dbgHeading);
                        let dbg = document.createElement("p");
                        dbg.id = "debug_p";
                        dbg.style.height = "200px";
                        dbg.innerHTML = "Testing...";
                        debugDiv.appendChild(dbg);
                    }
                },
    msg:        (text) => { 
                    if (DEBUG_MODE === true) {
                        let x = this.screen.ctx;
                        x.fillStyle = "#ffffff";
                        x.font = `20px Consolas`;                // white
                        // this.screen.setFont("30px Consolas");
                        x.fillText(text, 430, 480);            //  test
                    }
                },    
    console:    (msg) => {
                    if (DEBUG_MODE === true) {
                        console.log(msg);
                    }
                },
    display:    (msg) => {
                    if (DEBUG_MODE === true) {
                        // let d = document.getElementById("debug_section");
                        // d.innerHTML = msg;
                        document.getElementById("debug_section").style.backgroundColor = "rgb(217, 217, 217)";
                        let p = document.getElementById("debug_p");
                        // let p = document.createElement("p");
                        p.innerHTML = msg;
                        // d.appendChild(p);
                    }
                },         
    showComputerHand:    (computerHand) => {
                            if (DEBUG_MODE === true) {
                                computerHand.forEach(card => {
                                    console.log(`${card.getCardName()}`);
                                });
                            }
                        },
};


/**
 *  @copyright (c) 2018-2019 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com (OR: https://www.muddicode.com)
 *  @version   0.9.1
 *  @since     2018-10-1
 *  @license   Non-commercial
 *  @See:      http://www.gnu.org/licenses/gpl.html
 *             http://www.mit.edu/license
 */