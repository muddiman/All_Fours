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


import { gCanvasLayer } from "./screen.mjs";

export const debug = {
    isUpdated:  false, 
    screen:     new gCanvasLayer("debug_screen", 400, 450, 300, 150, 0.2, 4, 0, 0, 0),
    msg:        (text) => {
                    let x = this.screen.ctx;
                    x.fillStyle = "#ffffff";
                    x.font = `30px Consolas`;                // white
                    // this.screen.setFont("30px Consolas");
                    x.fillText(text, 430, 480);            //  test
                },    
    console:    (msg) => {
                    console.log(msg);
                },

};