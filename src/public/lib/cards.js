// class DECK {
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

//}

module.exports = DECK


function CARD(rank, face, suit) {
    // Card object constructor (game components are usually created writing a constructor for each type of component)
        this.suit = suit; // ['c', 'd', 'h', 's'],  MAX_SUITS=4
        this.face = face; // ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'],     MAX_FACES=13
        this.rank = rank; // [0, 1,.. 12], to assist in determining who played the higher card
        this.getCardName = function () {
                                return this.face + this.suit; // used as cardId, image filename, etc    MAX_CHARACTERS=2
                            };
        this.image = new Image();
        // this.image.listen = this.image.addEventListener('click', this.onMouseClick);
        // this.image.stopListen = this.image.removeEventListener('click', this.onMouseClick);
    
        this.image.onload = console.log(this.getCardName() +' loaded');      // image creation callback function (to be changed into a useful function)
    
                                // this.image.addEventListener('click', this.onMouseClick);
                                // this.image.addEventListener('load', () => {console.log(this.getCardName +' loaded');});
                            
        this.image.id = this.getCardName();
        this.image.src = "img/" + this.getCardName() + ".png";
        // write new card.functions as needed, ie update function & location function
}

// module.exports = new CARD
