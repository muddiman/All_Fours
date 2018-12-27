/*  
    temporary code to add to main program
*/

//  card class

/*
    Card objects
    Rank [0 .. 13] = 2, 4, ... , 9, 10, j, q, k, a
    Suit [0 .. 3] = c, d, h, s, 

*/

// Card prototype

function Card(rank, face, suit) {
    this.cardSuit = suit; // ['c', 'd', 'h', 's'],
    this.cardFace = face; // ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'],
    this.rank = rank;     // [0, 1,.. 12], to assist in determining who played the higher card
    this.getCardName = function() {
        return this.face + this.suit; // used as cardId, image filename, etc
    };
};

// var c = new Card(face, suit);

function createDeck() {
    var suits = ['c', 'd', 'h', 's'];
    var faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a']
    var n = 0;
    var deck = [];
    for (y = 0; y < suits.length; y++)  {
        var rank = 1;
        for (x = 0; x < faces.length; x++) {
            deck[n] = new Card(rank, faces[x], suits[y]);
            n++;
            rank++;
            // debugging: output to console
            console.log(n);
        }
    }
    return deck;
}


/*
                TODO:
        1. function shuffleDeck(deck);
        2. function deal(deck);

*/
