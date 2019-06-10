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

export var DEBUG_MODE=false;
// document.getElementById("msg_layer").style.visibility = "hidden";

// import { DEBUG_MODE } from "../allfours";
import { gCanvasLayer } from "./screen.mjs";

export const debug = {
    isUpdated:  false, 
    screen:     new gCanvasLayer("debug_screen", 400, 450, 300, 150, 0.2, 4, 0, 0, 0),
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
                        let d = document.getElementById("debug_section");
                        // d.innerHTML = msg;
                        document.getElementById("debug_section").style.backgroundColor = "rgb(217, 217, 217)";
                        let p = document.createElement("p");
                        p.innerHTML = msg;
                        d.appendChild(p);
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