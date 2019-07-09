//  filename:   ai.mjs
//  path:       /lib/ai.mjs


/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode 
                     Code: Computer AI Subroutines                             
*/
/*    FLAGS    */
const DEBUG_MODE=true;
//    Go for Jack
//    Go for Game 
//    State Machines
//    behaviour tree

/*
         GoForHangJack --> GoForGame
         two cards rank > j, call Trump, 
         one card rank > j, play low, allowing the opponent to play first each time until jack passes

         goForGame
         defendJack
         passJack
         Computer follows rules... cannot re-nead or under-trump (there is no under trump in two-man all fours)
*/
import { debug } from "./debugging.mjs";

/*    STRATEGY    */
var strategy = {
   goForGame:         true,        // must always be the Default strategy
   goForHangJack:     false,
   defendJack:        false,
   init:              function () {
                        debug.console("Strategy initialized.");
                        this.goForGame = true;
                        this.defendJack = false;
                        this.goForHangJack = true;
                     },
   decideStrategy:    function (hand, trump) {
                        // this.goForGame = true;
                        // console.log("Default Strategy: Go For Game");
                        debug.console("Default Strategy: Go For Game");
                       /*  this.goForHangJack = false;
                        this.defendJack = false; */
                           let jackInHand = isJackInUserHand(hand, trump);
                           if (jackInHand === true) {
                              this.defendJack = true;
                              debug.console("Strategy: Defend Jack");
                              this.goForGame = false;
                           } 
                           let jackInPlay = isHangJackInPlay(hand, trump);
                           if (jackInPlay === true) { 
                              if (numberOfFaceTrump(hand, trump) > 0) {
                                 this.goForHangJack = true;
                                 // console.log("Strategy: Go For Hang Jack");
                                 debug.console("Strategy: Going For Hang Jack");
                                 this.goForGame = false;
                              }
                           }
                        }, 
   changeStrategyToGame:   function () {
                        if (this.goForHangJack === true) {
                           this.goForHangJack = false;
                           this.goForGame = true;
                        }
                        if (this.defendJack === true) {
                           this.defendJack = false;
                           this.goForGame = true;
                        }
                     }                     
};

/* Search for specific card   */
function searchHandForCard(cardName, hand) {
   for (let index = 0; index < hand.length; index++) {
      if (hand[index].getCardName() === cardName) {
         return index;
      }
   }
}

/*    Playing Face Trump to hang jack or get ten trump  */
function highTrump(hand, trump) {
   debug.console("Playing face trump cards!");   /* play highest face card in trump  */
   let highestFaceCard = null;
   for (let index = 0; index < hand.length; index++) {
      const card = hand[index];                                            
      if (card.suit === trump.suit) {                                //   if card is trump
         if (highestFaceCard === null && card.rank > 9) {                    //  if card is higher than jack and highest face card does NOT exist
            highestFaceCard = index;
         } else if (highestFaceCard != null && card.rank > hand[highestFaceCard].rank) {  // if highest face card exist and is higher than the current highest face card
            highestFaceCard = index;
         } 
      }
   }
   if (highestFaceCard === null) {
         strategy.changeStrategyToGame();
   }
   return highestFaceCard;
}

/*    Playing Face Trump to hang jack or get ten trump  */
function callJackOut(hand, trump) {
   debug.console("Calling Jack Out!");   /* play highest face card in trump  */
   let highestFaceCard = null;
   for (let index = 0; index < hand.length; index++) {
      const card = hand[index];                                            
      if (card.suit === trump.suit) {                                //   if card is trump
         if (highestFaceCard === null && card.rank > 9) {                    //  if card is higher than jack and highest face card does NOT exist
            highestFaceCard = index;
         } else if (highestFaceCard != null && card.rank > hand[highestFaceCard].rank) {  // if highest face card exist and is higher than the current highest face card
            highestFaceCard = index;
         } 
      }
   }
   if (highestFaceCard === null) {
         strategy.changeStrategyToGame();
   }
   return highestFaceCard;
}



/*    Play Last   */


export function computerAI(hand, trump, calledCard=null) {
   /* Set Strategy before first play  */
   if (hand.length === 6) {
      strategy.init();
      strategy.decideStrategy(hand, trump);
   }
   /* if playing second */
   if (calledCard) { 
      // strategy.defendJack:                         
      if (strategy.defendJack === true) {
         if (calledCard.suit != trump.suit || calledCard.rank < 9) {              // pass jack
            return searchHandForCard(`j${trump.suit}`, hand);                                                   
         } else {
            for (let eachCard in hand) {           // play jack
               if (hand[eachCard].face != 'j' && hand[eachCard].suit === trump.suit) {
                  return eachCard;
               }
            }
            if (searchHandForCard(`j${trump.suit}`, hand)) {
               return searchHandForCard(`j${trump.suit}`, hand);
            }
         }
      }
        /*  if (selectLowerCard(hand, trump, calledCard) != null) {      //   keep off strike 
            return selectLowerCard(hand, trump, calledCard);
         }
         if (searchHandForCard(`t${trump.suit}`, hand) != null) {     //   if not, pass a ten o' trump
            return searchHandForCard(`t${trump.suit}`, hand);
         }         
         if (searchHandForCard(`t${calledCard.suit}`, hand) != null) {  // or a ten                                                                         
            return searchHandForCard(`t${calledCard.suit}`, hand);
         }                                       //  change to above                                 
      } */
      // strategy.goForHangJack: 
      if (strategy.goForHangJack === true) {
         if (calledCard.getCardName() === `j${trump.suit}`) {            //   if jack is thrown in face
            strategy.changeStrategyToGame(); 
            if (highTrump(hand, trump)) {
               return highTrump(hand, trump);                                         // play face trump & hang it
            }
         }
         if (selectLowerCard(hand, trump, calledCard) != null) {              // lower card in suit
            return selectLowerCard(hand, trump, calledCard);
         }
         if (calledCard.rank < 8 || calledCard.suit != trump.suit) {          // ten of suit (if present)
            if (searchHandForCard(`t${calledCard.suit}`, hand)) {
               return searchHandForCard(`t${calledCard.suit}`, hand);
            }
         }
         if (calledCard.rank < 8 || calledCard.suit != trump.suit) {          // ten of trump (if present)
            if (searchHandForCard(`t${trump.suit}`, hand)) {
               return searchHandForCard(`t${trump.suit}`, hand);
            }  
         } 
         /*  play highest face card in suit  */
         return selectLowestCard(hand, trump);         //  change to above      //   keep off strike   //   ie play lower bush card
      }
      // strategy.goForGame:  play ten, take ten, take face cards
      if (strategy.goForGame === true) {
         if (calledCard.face === "t") {                                         // play higher card 
            for (let index = 0; index < hand.length; index++) {
               if (hand[index].suit === calledCard.suit && hand[index].rank > 8 ) {
                  return index;
               }               
            }
            if (calledCard.suit != trump.suit) {
               for (let index = 0; index < hand.length; index++) {
                  if (hand[index].suit === trump.suit) {
                     return index;
                  }               
               }
            }
         }
         if (calledCard.rank > 8) {
            // play higher card or trump 
            for (let index = 0; index < hand.length; index++) {
               if (hand[index].suit === calledCard.suit && hand[index].rank > calledCard.rank ) {
                  return index;
               }               
            }
            if (calledCard.suit != trump.suit) {
               for (let index = 0; index < hand.length; index++) {
                  if (hand[index].suit === trump.suit) {
                     return index;
                  }               
               }
            }
         }
         if (calledCard.rank < 8) {                                          // play ten if you have it
            let tenOfSuit = searchHandForCard(`t${calledCard.suit}`, hand);
            if (tenOfSuit) {
               return tenOfSuit;
            }
            let tenOfTrump = searchHandForCard(`t${trump.suit}`, hand);
            if (tenOfTrump) {
               return tenOfTrump;
            }
            if (selectLowerCard(hand, trump, calledCard)) {
               return selectLowerCard(hand, trump, calledCard);
            }
         }
         return selectLowestCard(hand, trump);                     // else play lowest bush card
      }
   }

   
   /* if playing First  */
   if (!calledCard) { 
      // strategy.defendJack:                                 
      if (strategy.defendJack === true) {
         return selectLowestCard(hand, trump);                   //  play low to get off strike
      } 
      // strategy.goForHangJack:  
      if (strategy.goForHangJack === true) {          
         if (callJackOut(hand, trump) != null) {
            return callJackOut(hand, trump);                      // call high trump to hang jack
         } else {
            strategy.changeStrategyToGame();
         }
      }
      // strategy.goForGame:
      if (strategy.goForGame === true) {
         for (let i = 0; i < hand.length; i++) {
            if (hand[i].rank > 8 && hand[i].suit != trump.suit) {
               return i;
            }
         }
         for (let i = 0; i < hand.length; i++) {
            if (hand[i].rank > 8 && hand[i].suit === trump.suit) {
               return i;
            }
         }
         for (let i = 0; i < hand.length; i++) {
            if (hand[i].rank != 8 && hand[i].suit === trump.suit) {
               return i;
            }
         }
         return selectLowestCard(hand, trump);                                   
      }
      // return selectRandomCard(hand);                        // play high and save tens etc (jacks and queens)    
      // strategy.goForGame:  play face cards
/*       let lowestFaceCard = null;
      for (let i = 0; i < hand.length; i++) {
         if (hand[i].rank > 8 && hand[i].rank < lowestFaceCard.rank) {
            lowestFaceCard = i;                                                                                   // TODO: this section
         }         
      }
      if (lowestFaceCard) {
         return lowestFaceCard;
      } */
      return selectLowestCard(hand, trump);
   }

}

   
function selectRandomCard(remainingHand) {                            // select a random card
   // let compHand = Game.Player.computer.hand;
   let i = Math.floor(Math.random() * remainingHand.length);
   console.log("Computer chooses " + i + "th card.");
   return i;
}




         
function isJackInUserHand(hand, trump) {
   let jackInHand = false;
   for (let n=0; n < hand.length; n++) {
      if (hand[n].suit === trump.suit) {
         if (hand[n].face === 'j') {
            jackInHand = true;
         }
      }
   }
   return jackInHand;               // boolean
}

function selectLowestCard(hand, trump) {
   let lowestCardIndex = 0;
   for (let n=0; n < hand.length; n++) {
      if (hand[n].rank < hand[lowestCardIndex].rank && hand[n].suit != trump.suit) {
         lowestCardIndex = n;
      }
   }
   return lowestCardIndex;          // integer
}

function selectLowerCard(hand, trump, calledCard) {
   let lowerCardIndex = null;
   for (let n=0; n < hand.length; n++) {
      if (hand[n].suit === calledCard.suit) {
         if (hand[n].rank < calledCard.rank && hand[n].rank < 8) {         // play bush in same suit
            return n;
         }
      }
   }
   for (let n=0; n < hand.length; n++) {
      if (hand[n].suit === calledCard.suit) {
         if (hand[n].rank < calledCard.rank && hand[n].rank > 8) {         // play lower face card in same suit but not 10
            return n;
         }
      }
   }
      // search for ten
   let tenInPlay = false;
   for (let n=0; n < hand.length; n++) {
      if (hand[n].suit === calledCard.suit) {
         if (hand[n].face === 't' && hand[n].rank > calledCard.rank) {    
            return n;                     // play ten
         }
         if (hand[n].face === 't') {
            tenInPlay = true;
         }
      }
   }
   if (!tenInPlay) {                         // play higher card in suit, have no choice should be play HIGHEST card, adjust later
      for (let i = 0; i < hand.length; i++) {
         const card = hand[i];
         if (card.rank > calledCard.rank && card.suit === calledCard.suit) {
            return i;
         }
      }
   }

   // bare ten
   // higher cards

   return lowerCardIndex;          // integer
}

function isJackInLifts(userLift, computerLift, trump) {
   userLift.forEach(card => {
      if (card.face === 'j' && card.suit === trump.suit) {
         return true;
      }
   });
   computerLift.forEach(card => {
      if (card.face === 'j' && card.suit === trump.suit) {
         return true;
      }
   });
   return false;
}

function numberOfFaceTrump(hand, trump) {
   let faceTrump = 0;
   hand.forEach(card => {
      if (card.suit === trump.suit && card.rank > 9) {
         faceTrump++; 
      }
   });
   return faceTrump;
}

function isHangJackInPlay(hand, kickCard) {
   // let userLift = ;
   // let computerLift = ;
   /* check to see if jack kick  */
   if (kickCard.face === 'j') {        // jack was kicked
      return false;                    // jack not in play
   }
   /*  check if jack in user hand */
   if (isJackInUserHand(hand, kickCard)) { 
      return false;
   }
   /* check if jack played already  */
   // if (isJackInLifts(userLift, computerLift, kickCard)) {          // jack in lift, was played earlier
   //    return false;                    // jack not in play
   // }
   return true;                        // jack is in play
}




/**
 *  @copyright (c) 2018-2019 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com (OR: https://www.muddicode.com)
 *  @version   0.8.4
 *  @since     2018-10-1
 *  @license   Dual license - MIT & GPL
 *  @See:      http://www.gnu.org/licenses/gpl.html
 *             http://www.mit.edu/license
 */

 // decision analysis: use probability and deterministic decisioning processes

 // general strategy: go for jack or go for game

//  function computerPlayTurn(called, computerHand) {
    //consults computer AI and selects a card to play
    // play jack of trump if you have less than 3 pieces of trump
    
    // play ten of called suit or trump
    // play low called suit if calledCard is bush
    // play higher called suit if called card is face card
    // play trump if called face in king or ace
   //  return card;
   //  
