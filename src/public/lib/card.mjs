/*
                Title:  ALL FOURS GAME
                Language: Javascript
                Programmer: .muddicode 
                Code: Card Module                            
*/

/* globals */
/*  objects */
export var gCardImageCacheObj = {};

/*  classes */
export function Card(rank, face, suit) {               // Card object constructor (TODO: Change to a Class)
    this.suit = suit; // ['c', 'd', 'h', 's'],  MAX_SUITS=4
    this.face = face; // ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'],     MAX_FACES=13
    this.rank = rank; // [0, 1,.. 12], to assist in determining who played the higher card
    this.isLoaded = false;
    this.getCardName = function () {
        return this.face + this.suit; // string of two letters uniquely identifying the card (like a 'key')    MAX_CHARACTERS=2
    };
    this.init =  function (counter) {
        if (gCardImageCacheObj[this.getCardName()]) {
            this.image = gCardImageCacheObj[this.getCardName()];
            this.isLoaded = true;
            counter++;
        } else {
            this.image = new Image();
            this.image.id = this.getCardName();
            this.image.src = `img/${this.getCardName()}.png`;
            this.image.onload =  () => {
                   this.isLoaded = true;
                   counter++;
                   console.log(`${this.getCardName()} loaded`);
            };
            gCardImageCacheObj[this.getCardName()] = this.image;
        }
    };
} 
Card.prototype.CARD_W=72;
Card.prototype.CARD_H=96;
Card.prototype.getFace = function () {
                            return this.face;
                        };
Card.prototype.getSuit = function () {
                            return this.suit;
                        };


//================================================================================================================================

/**
 *  @copyright (c) 2018-2019 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com  
 *  @version   0.6.5
 *  @since     2018-10-1
 *  @download  https://www.github.com/muddiman/All_Fours
 *  @license   NOT for 'commercial use'.
 *  @See:      http://www.roger-clarke.com/allfours/license.html
 *             Free to use and/or distribute for personal or academic purposes.
 *             Must site the source code using the following format at beginning or end of source code file where it was used:
 *             "Clarke, Roger A. (2018) All Fours Game (ver. 0.6.3) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman". 
 */

