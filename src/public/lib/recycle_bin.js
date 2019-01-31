/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode 
                     Code: Main Program                            
*/


//                    Code NOT USED:
//----------------------------------------------------------------------------------------------


var scoreboard = {          //  object
    visible     :   true,
    text        :   null,
    init        :   function () {
                        this.visible = true;
                        this.text = null;
    }
};

// listens for mouse clicks, captures and returns its location as a position array --> [x.y]
function onClick() {
    document.getElementById('game_board').addEventListener('click', function (e) {
        var x = e.clientX;      // click location
        var y = e.clientY;
    });
    var posArr = [x,y];
    document.getElementById('game_board').removeEventListener('click', function (e) {
        var x = e.clientX;      // click location
        var y = e.clientY;
    });       
    return posArr;
}

function mouseExperiment(cardNumber) {
    return new Promise(function (resolve, reject) {
        let chosenCard = human.hand[cardNumber];
        human.hand[0].image.addEventListener('click', () => {
            console.log('1st card clicked');
        });
    });
}

/**
 * 
 * @param {*} positionArray 
 */
function mouseEventHandler(e) {   
    return new Promise(function (resolve, reject) {
    let n=null;
    let x=e.clientX - LEFTOFFSET;
    console.log(x);
    var y=e.clientY - TOPOFFSET;                                                                    
    console.log(y);
    var p=x-150;                                                                        
    if (y > 340 && y < (340+CARD_H)) {
        switch (true) {
            case (p < CARD_W/2):
                n=0;
                break;
            case (p < CARD_W):
                n=1;
                break;
            case (p < 3*CARD_W/2):
                n=2;
                break;
            case p < 2*CARD_W:
                n=3;
                break;
            case p < 5*CARD_W/2:
                n=4;
                break;
            case (p < 3*CARD_W):
                n=5;
                break;
            default:
                n='Out of Range';    // change to zero from  null; 
                msgboard.text = n;
                msgboard.visible = true;
        }
    } else {
        n='Please click on a card!';
        msgboard.text = n;
        msgboard.visible = true;
    }
    //resolve(n);
    if (n != null  && n < 6) {
        console.log(n);
        resolve(inputMgr.setCardSelection(n, removeInputListener));
        // resolve(n);
    } else {
        reject(console.log(n) + "No card selection registered.");
    }
});
}

msgboard.text = `${whoPlaysFirst} shall play now, please.`;
msgboard.visible = true;

function onClick(e) {
    return new Promise(function(resolve, reject) {
            let canvasX = e.clientX - LEFTOFFSET;
            let canvasY = e.clientY - TOPOFFSET;
            let posArr = [canvasX, canvasY];
            //document.getElementById('card_layer').removeEventListener('click', console('Event listener removed from Game Board'));
            if (posArr) {
                inputMgr.clickPosition = posArr;
               // mouseEventHandler(posArr);
                resolve(posArr);
            } else {
                reject(console.log(err));
            }
        });  
    }

    msgboard.text = `${whoPlaysFirst} shall play now, please.`;
    msgboard.visible = true;

//  Team Object Constructor
    function Team() {
        this.name = "";                         // MAX_CHARACTERS=8;
        this.members = [Player, Player];        // array of Player; MAX_TEAM_MEMBERS=2;
        this.points = 0;                
        this.lift = [Cards, Cards, Cards];
        this.setTeamName = name => this.name = name;
        this.getTeamName = () => name = this.name;
    }

//----------------------------------------------------------------------------------------------------


    setClickPosition: (positionalArr) => {
        this.clickPosition = positionalArr;
    },
    setCardSelection: (i, callbackFcn) => {
        this.cardSelection = i;
        callbackFcn();
    },
    getCardSelection: () => {
        return this.cardSelection;
    },

    convertPosToChoice: function () {
        // parses the coords saved onClick into a card choice [0 .. 11] ie max of 12 possible choices
        var n = null;
        var x = this.clickPosition[0];
        console.log(x);
        var y = this.clickPosition[1];
        console.log(y);
        var p = x - 160;
        if (y > 450) {
            switch (true) {
                case (p < 36):
                    n = 0;
                    break;
                case (p < 72):
                    n = 1;
                    break;
                case (p < 108):
                    n = 2;
                    break;
                case p < 144:
                    n = 3;
                    break;
                case p < 180:
                    n = 4;
                    break;
                case (p < 252):
                    n = 5;
                    break;
                default:
                    n = 'Out of Range'; // change to zero from  null; 
            }
        } else {
            n = 'Please click on a card!';
        }
        this.cardSelection = n;
        if (n != null && n < 6) {
            console.log(n);
            this.stopSelectionUpdate();
        }
    },
    //      confirm card function needed

//--------------------------------------------------------------------------------------------------------
//              menuLayer gCanvasLayer

var menuLayer = { //  Object: menuLayer --> TODO: turn into a "class"
    canvas: document.createElement("canvas"),
    init: function () {
        // initialize menu layer by applying context & inserting the canvas in the "game_container" <div> 
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.canvas.id = "menu_layer";
        this.ctx = this.canvas.getContext("2d");
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById("menu_layer").style = "position: absolute; left: " + LEFTOFFSET + "px; top: " + TOPOFFSET + "px; z-index: 3; background-color: rgba(0, 0, 0," + OPAQUE + "); border: 5px solid black;";
        this.refresh = setInterval(_drawMenuScreen, FPS_2);
    },
    clear: function () { // wipes the entire menu screen clean
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () { // if 'setInterval is used, there should be stop function
        clearInterval(this.refresh);
    },
    // this.frameNo =0;
};

/* Image Layer Objects */
// var gameBoard    = new CANVAS_LAYER(WIDTH, HEIGHT, OPAQUE,       "game_board",   0, drawScreenFcn);
// var cardsLayer   = new CANVAS_LAYER(WIDTH, HEIGHT, TRANSPARENT,  "cards_layer",  1, drawScreenFcn);
// var msgLayer     = new CANVAS_LAYER(WIDTH, HEIGHT, TRANSPARENT,  "msgs_layer",   2, drawScreenFcn);
// var menuLayer    = new CANVAS_LAYER(WIDTH, HEIGHT, OPAQUE,       "menu_layer",   3, drawScreenFcn);

//-------------------------------------------------------------------------------------------------------

//      Inputs

    let hand = human.hand;
    for (let i=1; i<hand.length; i++) {
        let integer = i;
        let choiceString = toString(integer);
        if ( inputMgr.keyState[choiceString] === true) {
            play(integer--);
        }
    }
    
if (inputMgr.action[SELECT_LEFT]) {
 selectCard(minusLeft);
}    
if (inputMgr.action[SELECT_RIGHT]) {
 selectCard(plusRight);
}


/*  Input Manager keyboard extension   */

inputmanager = Class.extend(
    {
        keys    :   {},                     // keys = {'KEY_LA' : false}                    keyCode --> state
        bindings:   {},                     // eg. bindings = {'KEY_LA' : 'SELECT_LEFT'}    keyCode --> action
        actions :   {},                     // eg. actions = {'SELECT_LEFT: false}          action --> state
    
    bind: function (key, action)            // Eg. key = KEY_LA; action = 'SELECT_LEFT';
    {
        this.bindings[key] = action[SELECT_LEFT];
    }

    onKeyDownEvent: function (keyCode, event)
    {
        var code = keyCode;
        var action = this.bindings[code];

        if (action) {                                // if 'true' means the action is 'occurring'
            this.actions[action] = true;
        }
    },
    });


keys:{},
bind: function (key, action)


function onClick() {
    let locX = event.clientX - LEFTOFFSET;
    let locY = event.clientY - TOPOFFSET;
    console.log("Click location: (", locX, ", ", locY, ")");
    if (locX && locY) {
        // document.getElementById("card_layer").removeEventListener('click', onclick);
    }
    inputMgr.clickPosition[1] = locX;
    inputMgr.clickPosition[2] = locY;
}

function pauseEventListener(event, callbackFcn) {
    if (event === "click") {
        document.getElementById("card_layer").removeEventListener(event, callbackFcn);
        setTimeout((event, callbackFcn) => {
            document.getElementById("card_layer").addEventListener(event, callbackFcn);
        }, 1500);
    } else if (event == "keydown") {
        window.removeEventListener(event, callbackFcn); // keyboard
        setTimeout((event, callbackFcn) => {
            window.addEventListener(event, callbackFcn); // keyboard
        }, 1500);
    }
    if (event == "keyup") {
        window.removeEventListener(event, callbackFcn); // keyboard
        setTimeout((event, callbackFcn) => {
            window.addEventListener(event, callbackFcn); // keyboard
        }, 1500);
    }
}


function keyboardEventHandler() { //  gets latest keystate & carry out its corresponding action
    //  Game Keys   
    const KEY_Q = 'q';
    const KEY_ESC = 'Escape';
    const KEY_1 = '1';
    const KEY_2 = '2';
    const KEY_3 = '3';
    const KEY_4 = '4';
    const KEY_5 = '5';
    const KEY_6 = '6';
    const KEY_LA = 'ArrowLeft';     // make next card to the left 'active'
    const KEY_RA = 'ArrowRight';    //  make next card to the right 'active'
    const KEY_ENT = 'Enter';        // select 'active' card
    const KEY_SPB = ' ';            // select 'active card
}

function confirmCardSelection(card) {
    // Enlarges Card and place front & center of the Hand
    var z = cardLayer.ctx;
    z.drawImage(card.image, gameBoard.width / 2 - 71, gameBoard.height - 2 * 96, 2 * 71, 2 * 96);
    z.scale(2, 2);
    cardLayer.canvas.addEventListener("click", function (event) {
        var x = event.clientX;
        var y = event.clientY;
        if (y > 250 && y < 496) {
            if (x > 280 && x < 420) {
                playCard('bot', card);
                return card;
            } else {
                // remove enlarged image;
            }
        } else {
            // remove enlarged image;
        }
    });
}

//-------------------------------------------------------------------------------------------------------

//                          GAME PLAY FUNCTIONS

async function userPlayFirst() {
    // clearInterval(awaitUser);
    await gWaitState(2);
    computerPlay(computerAI());
    let winningCard = determineWinner(cardToBoard.user, cardToBoard.computer);
    if (winningCard === cardToBoard.user) {
        console.log(`${human.name} wins!!!`)
        return human;
    } else {
        console.log(`${computer.name} wins!!!`)
        return computer;
    }
}
async function userPlayLast() {       // scenario: user plays second
    // clearInterval(awaitUser);
    await gWaitState(2);
    let winningCard = determineWinner(cardToBoard.user, cardToBoard.computer);
    if (winningCard === cardToBoard.user) {
        console.log(`${human.name} wins!!!`)
        return human;
    } else {
        console.log(`${computer.name} wins!!!`)
        return computer;
    }
}


async function gRound() {
    if (!cardToBoard.human && !cardToBoard.computer) {
        msgboard.text = `Please play a card, ${human.name}.`;
        msgboard.visible = true;
       await gWaitState(5);
    }
    // check if i play.. callback function

    if (cardToBoard.human && (!cardToBoard.computer)) {
        cardToBoard.computer = await computerPlay(computerAI());
        calledCard = cardToBoard.human;
        playedCard = cardToBoard.computer;
        await gWaitState(5);
    }
    if (!cardToBoard.human && cardToBoard.computer) {
        calledCard = cardToBoard.computer;
        msgboard.text = `Please play a card, ${human.name}.`;
        msgboard.visible = true;
        await gWaitState(5);
    }
    if (cardToBoard.human && cardToBoard.computer) {
        // determine who Won
        if (determineWinner(calledCard, playedCard) == cardToBoard.computer) {
            msgboard.text = " " + computer.name + "won.";
            msgboard.visible = true;
            await gWaitState(3);
            computer.lift += cardToBoard.computer;
            computer.lift += cardToBoard.human;
            cardToBoard.init();
            await gWaitState(1)
            msgboard.text = " " + computer.name + " plays first.";
            msgboard.visible = true;
            cardToBoard.computer = await computerPlay(computerAI());
            await gWaitState(3);
        } else {
            msgboard.text = " " + human.name + "won.";
            msgboard.visible = true;
            await gWaitState(3);
            human.lift += cardToBoard.computer;
            human.lift += cardToBoard.human;
            cardToBoard.init();
            await gWaitState(1)
            msgboard.text = " " + human.name + " plays first, please play a card now.";
            msgboard.visible = true;
            await gWaitState(3);
        }
        if (human.hand.length == 0 && computer.hand.length === 0) {
            clearInterval(gPlay);
        }
        // announce winner
        // check cards left in hand --> if zero stop listeners
        // assign 'play first' status to winner
        // cardToBoard.init();
        // tell winner to play first
        console.log("End of gRound");
    }
}


async function playRound(playFirst) {
    let winner = null;
    if (playFirst == computer) {
        Promise.resolve(() => {
                cardToBoard.init();
                msgboard.text = "Computer plays first."
                msgboard.visible = true;
            })
            .then(gWaitState(4))
            .then(async () => {
                msgboard.init();
                cardToBoard.computer = computer.hand[computerAI];
                computer.hand.splice(computerAI, 1);
                cardToBoard.user = await userPlay();
            })
            .then(gWaitState(2))
            .then(() => {
                if (determineWinner(cardToBoard.computer, cardToBoard.human) == cardToBoard.computer) {
                    winner = computer;
                } else {
                    winner = human;
                };
                msgboard.text = winner.name + " won that round."
                msgboard.visible = true;
            })
            .then(gWaitState(2))
            .then(() => {
                cardToBoard.init();
            })
    } else {
        Promise.resolve(() => {
                cardToBoard.init();
                msgboard.text = "You play first."
                msgboard.visible = true;
            })
            .then(gWaitState(4))
            .then(async () => {
                cardToBoard.user = await userPlay();
            })
            .then(() => {
                cardToBoard.computer = computer.hand[computerAI];
                computer.hand.splice(computerAI, 1);
                if (determineWinner(cardToBoard.computer, cardToBoard.human) == cardToBoard.computer) {
                    winner = computer;
                } else {
                    winner = human;
                };
            })
            .then(gWaitState(1))
            .then(() => {
                msgboard.text = winner.name + " won that round."
                msgboard.visible = true
            })
            .then(gWaitState(2))
            .then(() => {
                cardToBoard.init();
            })
    }
    return winner;
}

    /*
        return new Promise(function (resolve, reject) {
            var position = "top";
            var i = Math.floor(Math.random() * computer.hand.length);
            if (cardToBoard.user == null) {                 //  then computer plays first, choose a random card.
                //  play highest random card (thats not trump or ten)
                // playCard(position, computer.hand[i]);
                cardToBoard.computer = computer.hand[i];
                computer.hand.splice(computer.hand[i], 1);
                resolve(computer.hand[i]);
            } else { //  else choose a random card... more on computer AI later.
                cardToBoard.computer = computer.hand[i];
                computer.hand.splice(computer.hand[i], 1);
                resolve(computer.hand[i]);
                
            // Play higher card in same suit, (if 10, q, k, or a play trump if yu have to)
            for (var card in computer.hand) {
                if (card.suit === oppponentCard.suit) {
                    if (card.rank > opponentCard.rank) {
                        computer.hand.splice(computer.hand.indexOf(card), 1);
                        // playCard('top', card);
                        cardToBoard.computer = card;
                        resolve(card);
                    }
                }
            }
            // play any low card including trump
            for (var individualCard in computer.hand) {
                if (individualCard.rank < 10 && individualCard.suit != deck.trump.suit) {
                    // playCard('top', individualCard);
                    cardToBoard.computer = card;
                    computer.hand.splice(computer.hand.indexOf(individualCard), 1);
                    resolve(individualCard);
                } else {
                    // play low trump
                }
            }
            // play any card
            //playCard('top', computer.hand[i]);
            //computer.hand.splice(i,1);
            //resolve(computer.hand[i]);
        }   */
    // reject("Error: Computer could not select a card");
    // }
    //});


    


function userPlay() {
    let playedCard = null;
    let i = 0;
    let probe = setInterval(() => {
        for (action in inputMgr.actions) {
            console.log(i);
            console.log(action);
            console.log(inputMgr.actions[action]);
            if (inputMgr.actions[action]) {
                playedCard = human.hand[i];
                human.hand.splice(i, 1);
                clearInterval(probe);
                return playedCard;
            };
            i++;
        }
    }, 100);
}

function playSingleCard(player, i) {
    cardToBoard.player = player.hand[i];
    player.hand.splice(i, 1);
}

function waitOnUserPlayFirst()  {
    console.log("1.");
    if (cardToBoard.user) {
        userPlayFirst();
    }
}
function waitOnUserPlayLast()  {
    console.log("2.");
    if (cardToBoard.user) {
        userPlayLast();
    }
}


function endRoundPlay(handIndex) {
    //human.hand.splice(handIndex, 1);
    let whoWon = winner.name;
    console.log(whoWon, +" Wins!");
    msgboard.text = whoWon + " Won!!!";
    msgboard.visible = true;
    winner.lift.push(cardToBoard.computer, cardToBoard.human);
    cardToBoard.init();
}


function play(handIndex) {
    if (cardToBoard.computer) { // computer played first
        playSingleCard(human, handIndex);
        // cardToBoard.user = human.hand[handIndex];       // show my played card
        // computerPlay();
        if (determineWinner(cardToBoard.computer, human.hand[handIndex]) == cardToBoard.computer) {
            winner = computer;
        } else {
            winner = human;
        }
        setTimeout(() => {
            endRoundPlay(handIndex);
            if (winner == computer) {
                cardToBoard.computer = computerPlay();
            }
        }, 2000);
    } else { // human played first
        playSingleCard(human, handIndex);
        // cardToBoard.human = human.hand[handIndex];      //  firstCard = userHand[handIndex];
        cardToBoard.computer = computerPlay(); // secondCard;
        if (determineWinner(cardToBoard.human, cardToBoard.computer) === cardToBoard.human) {
            winner = human;
        } else {
            winner = computer;
        }
        setTimeout(() => {
            endRoundPlay(handIndex);
            if (winner == computer) {
                cardToBoard.computer = computerPlay();
            }
        }, 2000);
    };
    console.log('END OF ROUND!!!');
}

//------------------------------------------------------------------------------------------------------
//                  Display Functions


function displayMsgFor(time) {
        return new Promise(function(resolve) {
        let ml=document.getElementById("msg_layer");
        msgboard.visible = true;
        time = time * 1000;
        setTimeout(() => {
            ml.style.visibility="hidden";
        }, time);
    });
} 

var fs = require('fs');

