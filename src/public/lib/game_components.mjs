//  game_components.mjs


//  DECK Object
   var deck = {
        // deck object: deck.init(), deck.shuffle(), deck.cut(), deck.deal()    
           cards : [],
           trump : null,
           init : function() {
           /** creates deck (array of all 52 cards)
            *  @param: null
            *  @returns: deck
            */
           var suits = ['c', 'd', 'h', 's'];
           var faces = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'];
           var n = 0;
           for (y = 0; y < suits.length; y++)  {
               var rank = 1;
               for (x = 0; x < faces.length; x++) {
                   this.cards[n] = new CARD(rank, faces[x], suits[y]);
                   n++;
                   rank++;
               }
           }
           // return this.cards;
           },
           shuffle : function() {
           /** randomly mixes up the cards in the deck
            *  @param:
            *  @returns: randomized deck
            */
               var i, j;
               for (i = 0; i < this.cards.length; i++) {
                   j = Math.floor(Math.random() * 52);
                   var temp = this.cards[i];
                   this.cards[i] = this.cards[j];
                   this.cards[j] = temp;
               }
               //return this.cards;
           },
           cut : function(n) {
           /** randomly mixes up the cards in the deck
            *  @param: null
            *  @returns: cuts deck
            */
             /*  var temp = this.cards.slice(0, n);
               this.cards = this.cards + temp;
               return this.cards; */
           },
           deal : function(human, computer) {
           /** randomly mixes up the cards in the deck
            *  @param: human, computer (players' hand --array-of-cards )
            *  @returns: randomized deck
            */
               var n = 0;
               while (human.hand.length < 6) {
                   human.hand[n] = this.cards.shift();
                   computer.hand[n] = this.cards.shift();
                   n++;
               }
               this.trump = this.cards.shift();
               //return human, computer;
           },
           beg : function(human, computer) {
           /** randomly mixes up the cards in the deck
            *  @param: null
            *  @returns: void
            */
               while (human.length <= 9) {
                   human.hand = this.cards.shift();
                   computer.hand = this.cards.shift();
               }
               if (this.trump.suit != this.cards[0].suit) {
                   this.trump = this.cards.shift();
               } else {
                   this.trump = this.cards.shift();
                   while (human.length <= 12) {
                       human = this.cards.shift();
                       computer = this.cards.shift();
                   }
                   if (this.trump.suit === this.cards[0].suit) {
                       this.trump = this.cards.shift();
                       this.trump = this.cards.shift();
                   } else {
                       this.trump = this.cards.shift();
                   }
               }
               // return this.cards;
           }
        };



module.exports = DECK

// class Card
function Card(rank, face, suit) {       // rank is an extension of normal card object property, specific for All Fours
    // Card object constructor (game components are usually created writing a constructor for each type of component)
    this.suit = suit; // ['c', 'd', 'h', 's'],  MAX_SUITS=4
    this.face = face; // ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'],     MAX_FACES=13
    this.rank = rank; // [0, 1,.. 12], to assist in determining who played the higher card
    this.getCardName = function () {
        return this.face + this.suit;   // string of two letters uniquely identifying the card (like a 'key')    MAX_CHARACTERS=2
    };
    //this.image =            new Image();
    this.init = () => {
        if (gCardImageCache[this.getCardName]) {                // if its already loaded in image cache, use cached version instead
            this.image = gCardImageCache[this.getCardName];
            console.log('Using cached version of image.');
        } else {
            this.image = new Image();
            this.image.id = this.getCardName();
            this.image.src = "img/" + this.getCardName() + ".png";
            this.image.onload = () => {
                let card = this.getCardName();
                gCardImageCache[card] = this.image;
                console.log(this.getCardName() + ' image loaded into cache object.');
            };
        }
    };
}
    

// module.exports = new CARD

//----------------------------------------------------------------------------------------------
//  Player Class

/**
 *     Player object constructor (or class)
 *     
 */
/* Player Class/Object Constructor */
function Player() { // Add a "Team" constructor when coding the 4-player version: function Team(playerA, playerB)
    this.init = function () {
        this.hand = [];     // MAX_CARDS_IN_HAND=12;
        this.points = 0;    // MAX_POINTS=14;
        this.lift = [];     // MAX_CARDS_IN_LIFT=48;
        this.name = "";     // MAX_CHARACTERS=12;
    };
    //this.player1 = playerA;
    //this.player2 = playerB;
    //this.team = "";
    //this.setPlayerName = function (name) {this.name = name;}
    //this.setPlayerTeam = function (team) {this.team = team;}
    //this.setTeamName   = function (name) {this.teamName = name;}
    //this.setTeamPlayers = function (player1, player2) {this.teamPlayers = [player1, player2];}
}
