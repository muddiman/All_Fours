//  filename:   ai.mjs
//  path:       /lib/ai.mjs


/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode 
                     Code: Computer AI Subroutines                             
*/


export function computerAI(hand, trump, calledCard) {
   /* save jack   */
   if (!calledCard) {
      return selectRandomCard(hand);
   }
   if (calledCard.suit != trump.suit) {
      for (let eachCard in hand) {           // play jack
        if (hand[eachCard].face === 'j' && hand[eachCard].suit === trump.suit) {
          return eachCard;
        }
        /*  if no jack play ten of trump  */
        if (hand[eachCard].face === 't' && hand[eachCard].suit === trump.suit) {
         return eachCard;
       }
       /*   play 10 if  10 is higher in called suit   */
      }
      /* if non of the preceding conditions are met, play random card   */
      return selectRandomCard(hand); 
   } else {
      if (calledCard.rank < 11) {
         for (let eachCard in hand) {
            if (hand[eachCard].rank === 'j' && hand[eachCard].suit === trump.suit) {
               return eachCard;
            }
            if (hand[eachCard].rank === 't' && hand[eachCard].suit === trump.suit) {
               return eachCard;
            }
            if (hand[eachCard].rank > calledCard.rank && hand[eachCard].suit === trump.suit) {
               return eachCard;
            }
         }
         for (let eachCard in hand) {
            if (hand[eachCard].rank < calledCard.rank && hand[eachCard].suit === trump.suit) {
               return eachCard;
            }
         }
         /* no trump: play any bush card  */
         for (let eachCard in hand) {
            if (hand[eachCard].rank < 9) {
               return eachCard;
            }
         }
         /* no trump: play any high card except 10 */
         for (let eachCard in hand) {
            if (hand[eachCard].face != 't') {
               return eachCard;
            }
         }
         /* else: play any random card  */
         for (let eachCard in hand) {
            return selectRandomCard();
         }
      }
   }

   
   function selectRandomCard(remainingHand) {                            // select a random card
   // let compHand = Game.Player.computer.hand;
   let i = Math.floor(Math.random() * remainingHand.length);
   console.log("Computer chooses " + i + "th card.");
   return i;
   }
   /* play high card */
   for (let eachCard in hand) {
      if (hand[eachCard].rank > 8 && hand[eachCard].suit != trump.suit) {
         return eachCard;
      }
   }
}
function decideStrategy(hand, trump) {
   strategy.playForGame = true;
   strategy.playForHangJack = false;
   strategy.defendJack = false;
}
var strategy = {
   playForGame:         true,
   playForHangJack:     false,
   defendJack:          false,
};

/**
 *  @copyright (c) 2018-2019 Roger Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com (OR: https://www.muddicode.com)
 *  @version   0.6.5
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
   //  }