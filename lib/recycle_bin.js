/*
                     Title:  ALL FOURS GAME
                     Language: Javascript
                     Programmer: .muddicode 
                     Code: Main Program                            
*/

function scale(deviceWidth, deviceHeight) {
    let scale = 1;
    if (deviceWidth <= WIDTH + 50 || deviceHeight <= HEIGHT + 50) {
        if (deviceWidth <= deviceHeight) {
            scale = deviceWidth / (WIDTH + 50);
        } else { 
            scale = deviceHeight / (HEIGHT + 50);
        }        
    }
    return scale;
}


function displayCardCache() {
    for (card in gCardImageCacheObj) {
        console.log(`${card} : ${gCardImageCacheObj[card].id}`);
    }
}

function emphasizeTrump() {
    /* displays an oversize trumpcard for two secs  */
    let bigCard = Game.Components.deck.trump;
    let gsx = Game.Screens.gameScreen.ctx;
    let posX = 5;
    let posY = 5;
    gsx.drawImage(bigCard.image, posX, posY, 1.5 * CARD_W, 1.5 * CARD_H);
}

function rotateImage(img, x, y, angle) {
    Game.Screens.gameScreen.ctx.save();
    Game.Screens.gameScreen.ctx.translate(x, y);
    Game.Screens.gameScreen.ctx.rotate(angle * this.CONVERT_TO_RADIANS);
    Game.Screens.gameScreen.ctx.drawImage(img,
        -(img.width / 2),
        -(img.height / 2));
    Game.Screens.gameScreen.ctx.restore();
}

function selectCard(player) {
    let hand = player.hand;
    let card = hand[0];
    let image = card.image;
    let c = Game.Screens.gameScreen.canvas;
    let gsx = Game.Screens.gameScreen.ctx;
    gsx.drawImage(image, 350, 300, 1.5 * CARD_W, 1.5 * CARD_H);        
}

function enlargeCard(cardNo) {
    let hand = player.hand;
    let card = hand[cardNo];
    let image = card.image;
    let c = Game.Screens.gameScreen.canvas;
    let gsx = Game.Screens.gameScreen.ctx;
    gsx.drawImage(image, 350, 300, 1.5 * CARD_W, 1.5 * CARD_H); 
}

function acquireImage() {
    let x = Game.Screens.gameScreen.ctx;
    let imgData = x.getImageData(5, 5, CARD_W, CARD_H);     // capture image from gameboard
    x.putImageData(imgData, 200, 200);                      // place captured image info elsewhere
    if (x.getImageData(200, 200, CARD_W, CARD_H)) {
        return console.log('Pass: image object exists.');
    } else {
        return console.log('Fail: image object does NOT exist!');
    }
}

function clearMsgBoard() { // garbage collection
    Game.Components.msgboard.init();
    document.getElementById("msg_layer").removeEventListener("click", clearMsgBoard);
    document.getElementById("msg_layer").style.visibility = "hidden";
}

function gameMenu() {
    // pass;
    // menuLayer.init();
}

function removeGameMenu() {
    document.getElementById('menu_layer').style.visibility = "hidden";
}

function cleanBoard() {
    var c = Game.Background.ctx;
    Game.Background.clear();
}

//                    Code NOT USED:
//----------------------------------------------------------------------------------------------

/*     onMouseDown:            function (event, canvasLayer, Controller, hand) {
                                this.clickX = event.clientX - LEFTOFFSET;  //  Game.Screens.gameScreen.canvas.offsetLeft;   // 
                                this.clickY = event.clientY - TOPOFFSET;    *///  Game.Screens.gameScreen.canvas.offsetTop; //  
                             /*    canvasLayer.removeEventListener("mousedown", (e) => {
                                                                                    this.onMouseDown(e, Controller, hand); 
                                                                                }, true);   */
   /*                              canvasLayer.addEventListener("mouseup", () => {
                                                                            this.onMouseUp(Controller, hand); 
                                                                        }, true);    
                                debug.console("Click location: (", this.clickX, ", ", this.clickY, ")");
                                return clickEvents(hand);
                            },
    onMouseUp:              function (Controller, hand) {
                                canvasLayer.removeEventListener("mouseup", () => {
                                                                                                        this.onMouseUp(Controller, hand); 
                                                                                                    }, true);  
                                canvasLayer.addEventListener("mousedown", (e) => {
                                                                                                        this.onMouseDown(e, Controller, hand); 
                                                                                                    }, true);   
                                for (let action in Controller.actions) {
                                    if (Controller.actions[action] == true) {
                                        Controller.actions[action] = false;
                                    }
                                }
                            }, 
    onMouseMove:            function (event, hand, gameboard) {
                                this.currentX = event.clientX - LEFTOFFSET; //  Game.Screens.gameScreen.canvas.offsetLeft; // x,y position of the mouse pointer on canvas when event occurs
                                this.currentY = event.clientY - TOPOFFSET; //  Game.Screens.gameScreen.canvas.offsetTop;
                                debug.console("(", this.currentX, ", ", this.currentY, ")");
                                debug.display(`(${this.currentX}, ${this.currentY})`);
                                for (let index = 0; index < hand.length; index++) {
                                    const card = hand[index];
                                    if (isMouseOverCard(index, card, hand.length, this.currentX, this.currentY) === true) {
                                        gameboard.select = card;
                                    }
                                }
                            }     */

/*****************************************************************************************************************************************
 * 
 *          AUDIO SECTION
 * 
 *****************************************************************************************************************************************/
/*
*
*       WEBKIT AUDIO
*
*/
/* 
function SoundManager() {
    this.clips           = {};
    this.enabled         = true;
    this._context        = null;
    this._mainNode       = null;
}

//--------------------------------------------------------
   SoundManager.prototype.init              = function()
                                            {
                                                try {
                                                    this._context = new webkitAudioContext();
                                                }
                                                catch(e) {
                                                    alert(e + ": Browser does not support Web Audio API!");
                                                }

                                                this._mainNode = this._context.createGainNode(0);
                                                this._mainNode.connect(this._context.destination);
                                            };

   SoundManager.prototype.loadAsync         = function(path, callbackFcn) {
                                                if (this.clips[path])
                                                {
                                                    callbackFcn(this.clips[path].s);
                                                    return this.clips[path].s;
                                                }
                                                var clip = {s:new Sound(), b:null, l:false};
                                                this.clips[path] = clip;
                                                clip.s.path = path;

                                                var request = new XMLHttpRequest();
                                                request.open('GET', path, true);
                                                request.responseType = "arraybuffer";
                                                request.onload = function() {
                                                    gSM._context.decodeAudioData(request.response,
                                                        function(buffer)
                                                        {
                                                            clip.b = buffer;
                                                            clip.l = true;
                                                            callbackFcn(clip.s);
                                                        },
                                                        function(data)
                                                        {
                                                            console.log("failed");
                                                            Logger.log("failed");
                                                        });
                                                };
                                                request.send();
                                                return clip.s;

                                            };
   //----------------------------------------------
   SoundManager.prototype.playSound         = function(path, settings)  {
                                                if (!gSM.enabled)
                                                    return false;

                                                var looping=false;
                                                var volume=0.8;
                                                if (settings)
                                                {
                                                    if (settings.looping)
                                                        looping=settings.looping;
                                                    if (settings.volume)
                                                        volume = settings.volume;
                                                }

                                                var sd = this.clips[path];
                                                if (sd == null)
                                                    return false;
                                                if (sd.l == false) return false;
                                                // creates a sound source
                                                var currentClip = gSM._context.createBufferSource();

                                                // tell the source which sound to play
                                                currentClip.buffer=sd.b;
                                                currentClip.gain.value= volume;
                                                currentClip.connect(gSM._mainNode);
                                                currentClip.loop=looping;

                                                // play the source now
                                                currentClip.note.On(0);
                                                return true;
                                            };
//-------------------------------------------------------------
   SoundManager.prototype.togglemute        = function() {
                                                if (this._mainNode.gain.value>0)
                                                    this._mainNode.gain.value=0;
                                                else
                                                    this._mainNode.gain.value=1;
                                            };
//-------------------------------------------------------------
   SoundManager.prototype.stopAll           = function () {
                                                this._mainNode.disconnect();
                                                this._mainNode = this._context.createGainNode(0);
                                                this._mainNode.connect(this._context.destination);
                                            };    
//--------------------------------------------------------------------------------------------------------------------

export var gSM = new SoundManager();

//--------------------------------------------------------------------------------------------------------------------

function Sound() {
    this.init   = function() {

                };
//------------------------------------------------------
    this.play   = function(loop) {                   //  loop: boolean
                    gSM.playSound(this.path, {looping:loop, volume:1});
                };
} */

/* export function playSoundInstance(soundpath) {
       var sound = gSM.loadAsync(soundpath, function(sObj) {sObj.play(false);}); 
}   */
   
//--------------------------------------------------------------------------------------------------------------------


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

/* Frame Rate */
// const LOW_REFRESH_RATE = 2; // IN FPS (frames per second)
// const FIVE_REFRESH_RATE = 5;
// const TEN_REFRESH_RATE = 10;
// const HIGH_REFRESH_RATE = 30; // in FPS (frames per second)
// const FPS_2 = (1 / LOW_REFRESH_RATE) * 1000; // in milliseconds
// const FPS_5 = (1 / FIVE_REFRESH_RATE) * 1000;
// const FPS_30 = (1 / HIGH_REFRESH_RATE) * 1000;
// const FPS_10 = (1 / TEN_REFRESH_RATE) * 1000;




/* function gCanvasLayer(ID, _WIDTH, _HEIGHT, OPACITY, Z, red, green, blue) {          //drawScreenFcn, period
    this.canvas = document.createElement("canvas");
    this.init = function () {
        this.canvas.width = _WIDTH;
        this.canvas.height = _HEIGHT;
        this.canvas.id = ID;
        this.ctx = this.canvas.getContext('2d');
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById(ID).style = "position: absolute; left: " + LEFTOFFSET + "px; top: " + TOPOFFSET + "px; z-index: " + Z + "; background-color: rgba(" + red + ", " + green + ", " + blue + ", " + OPACITY + ");";
        console.log("New " + this.canvas.id + " canvas initialized.");
        // this.canvas.style="background-color: rgba(255, 255, 255," + OPAQUE + ");";     // in rgba format
        // this.refresh = setInterval(drawScreenFcn(), period);
    };
    this.clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
     this.stop = function () {
        clearInterval(this.refresh);
    }; 
}
 */

 

/**
 *     Player object constructor (or class)
 *     
 */
/* Player Class/Object Constructor 
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
*/

/* Game.Background = {
    //  Object: gameBoard --> TODO: turn into a "class"
    canvas: document.createElement("canvas"),
    init: function () {
        // initialize gameBoard by applying context & inserting the canvas in the "game_container" <div> 
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.canvas.id = "game_board";
        this.ctx = this.canvas.getContext("2d");
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById("game_board").style = "position: absolute; left: " + LEFTOFFSET + "px; top: " + TOPOFFSET + "px; z-index:0; background-color: darkolivegreen; border: 5px solid black;";
        this.refresh = setInterval(_drawGameBoard, FPS_2);
    },
    clear: function () {
        // wipes the entire gameBoard clean
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    // this.frameNo =0;
    // if 'setInterval is used, there should be stop function
    stop: function () {
        clearInterval(this.refresh);
    }
};
 */

     // this.frameNo =0;
    // if 'setInterval is used, there should be stop function
/*     stop: function () {
        clearInterval(this.refresh);
    }   */

    /* Card Class/Object Constructor */
/* function Card(rank, face, suit) {               // Card object constructor (TODO: Change to a Class)
    this.suit = suit; // ['c', 'd', 'h', 's'],  MAX_SUITS=4
    this.face = face; // ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'],     MAX_FACES=13
    this.rank = rank; // [0, 1,.. 12], to assist in determining who played the higher card
    this.getCardName = function () {
        return this.face + this.suit; // string of two letters uniquely identifying the card (like a 'key')    MAX_CHARACTERS=2
    };
    this.init = function () {
        if (gCardImageCacheObj[this.getCardName()]) {
            this.image = gCardImageCacheObj[this.getCardName()];
            console.log(`${gCardImageCacheObj[this.getCardName()].id} image retrieved from cache.`);
        } else {
            this.image = new Image();
            this.image.id = this.getCardName();
//            this.image.src = "img/" + this.getCardName() + ".png";
            this.image.src = `img/${this.getCardName()}.png`;
            gCardImageCacheObj[this.getCardName()] = this.image;
            this.image.onload = () => {
               // let card = this.getCardName();
               if (gCardImageCacheObj[this.getCardName()] === this.image) {
                //console.log(`${this.getCardName()} image loaded into cache object.`);
               }
            };
        }
    };
} */

    /*
    if (Game.Controller.actions['playCard_1']) {      // queries the key's state, and calls the corresponding function
        if (Game.Components.gameboard.user === null) {
            Game.Components.gameboard.user = Game.Player.human.hand[0];
            Game.Player.human.hand.splice(0, 1);
            Game.Controller.init();
        }
    }
    if (Game.Controller.actions['playCard_2']) {
        if (Game.Components.gameboard.user === null) {
            Game.Components.gameboard.user = Game.Player.human.hand[1];
            Game.Player.human.hand.splice(1, 1);
        }
    }
    if (Game.Controller.actions['playCard_3']) {
        if (Game.Components.gameboard.user === null) {
            Game.Components.gameboard.user = Game.Player.human.hand[2];       // 
            Game.Player.human.hand.splice(2, 1);
        }
    }
    if (Game.Controller.actions['playCard_4']) {
        if (Game.Components.gameboard.user === null) {
            Game.Components.gameboard.user = Game.Player.human.hand[3];       // 
            Game.Player.human.hand.splice(3, 1);
        }
    }
    if (Game.Controller.actions['playCard_5']) {
        if (Game.Components.gameboard.user === null) {
            Game.Components.gameboard.user = Game.Player.human.hand[4];       //
            Game.Player.human.hand.splice(4, 1);

        }
    }
    if (Game.Controller.actions['playCard_6']) {
        if (Game.Components.gameboard.user === null) {
            Game.Components.gameboard.user = Game.Player.human.hand[5];       // 
            Game.Player.human.hand.splice(5, 1);
        }
    }   */


        //  let time=4;
    // let whoPlaysFirst = null;
    /*  deal, play rounds, distribute points --> repeat    */
   // while (computer.hand.length > 0 && human.hand.length > 0) {


   /*             await Game.Components.gameboard.listenForUserCard(async () => {
                if (Game.Components.gameboard.user) {
                    Game.Components.gameboard.stopListening();
                    Game.Controller.isMyTurn = false;
                }
            }); */

                //  from classes & constructor functions       
    // let gObjectsArr = _initializePlayers();
    //  load objects
/*     .then(() => {
        console.log(`0.4`);
        Game.Screens.menuScreen.init();
    })  */           // print welcome message

    //  Game.Background.display = new gCanvasLayer("game_board", LEFTOFFSET, TOPOFFSET, WIDTH, HEIGHT, _OPACITY, 0, 68, 102, 0);
    //  Object: gameBoard --> TODO: turn into a "class"
  /*   canvas: document.createElement("canvas"),
    init: function () {
        // initialize gameBoard by applying context & inserting the canvas in the "game_container" <div> 
        this.canvas.width  = WIDTH;
        this.canvas.height = HEIGHT;
        this.canvas.id = "game_board";
        this.ctx = this.canvas.getContext("2d");
        document.getElementById("game_container").appendChild(this.canvas);
        document.getElementById("game_board").style = "position: absolute; left: " + LEFTOFFSET + "px; top: " + TOPOFFSET + "px; z-index:0; background-color: rgba(68, 102, 0, 1.0); ";
        //  this.refresh = setInterval(_drawGameBoard, FPS_2);
    },
    clear: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);        // wipes the entire gameBoard clean
    },
    setFont: function (fontString) {
        this.ctx.font = fontString;
    }
  }; 
  */


  //  var deck = {
    // deck object: Game.Components.deck.init(), Game.Components.deck.shuffle(), Game.Components.deck.cut(), Game.Components.deck.deal()  

    /* 
        } else {  
            whoPlaysFirst = Game.Player.human;                                      //  else human plays first
            console.log(`${whoPlaysFirst.name} plays first!`);
            Game.Controller.isMyTurn = true;
            console.log(`YOUR TURN!`);                                            // if human deal, computer plays first 
            await Game.Components.gameboard.listenForUserCard(async() => {
                if (Game.Components.gameboard.user) {
                    Game.Components.gameboard.stopListening();
                    Game.Controller.isMyTurn = false;
                }
            });
            console.log(`COMPUTER TURN!`);                                            // if human deal, computer plays first 
            computerPlay(computerAI());
            winner = determineWinner(Game.Components.gameboard.user, Game.Components.gameboard.computer);
            whoPlaysFirst = winner;
            postPlay(winner); */
        

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