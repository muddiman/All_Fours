//      /lib/player.js

/*
                Title:  ALL FOURS GAME
                Language: Javascript
                Programmer: .muddicode 
                Code: Player Module  (allfours.js)   
    
    DESCRIPTION:    Player module for All Fours Game
    PURPOSE:    Players class, generates new players for all fours game
*/

/*  globals  */
const MAX_CARDS_IN_HAND=12;
const MAX_POINTS=14;
const MAX_CARDS_IN_LIFT=48;
const MAX_CHARACTERS=10;


/* Player Class/Object Constructor */
export function Player(playerName, teamName) {         // Add a "Team" constructor when coding the 4-player version: function Team(playerA, playerB)
    /*  Properties  */
    this.hand       = [];
    this.lift       = [];
    this.score      = 0;
    this.name       = playerName;
    this.team       = teamName;
    //  Methods
    this.addCardToHand  = (card) => {
                        this.hand.push(card); 
                     };
    this.addPoints  = (points) => {
                        this.score += points;
                    };
    this.getPoints  = () => {
                        return this.score;
                    };
                    
}
/*  Prototypes  */
Player.prototype.init           = function () {
                                    this.hand   = [];       // MAX_CARDS_IN_HAND=12;
                                    this.score  =  0;       // MAX_POINTS=14;
                                    this.lift   = [];       // MAX_CARDS_IN_LIFT=48;
                                    // this.name   = "";       // MAX_CHARACTERS=12;
                                };

Player.prototype.getHand        = function () {
                                    return this.hand;
                                };
Player.prototype.getName        = function () {
                                    return this.name;
                                };
Player.prototype.changeName        = function (name) {
                                    /*  Triggered by function setPlayerName   */
                                    this.name = name;    //  
                                    // return this.name;
                                };                                
Player.prototype.getLift        = function () {
                                    return this.lift;
                                };
Player.prototype.pointsInit     = function () {
                                    this.points = 0;            
                                };
Player.prototype.liftInit       = function () {
                                    this.lift = [];            
                                };
Player.prototype.handInit       = function () {
                                    this.hand = [];            
                                };
Player.prototype.removeCardFromHand = function (card) {
                                    for (let index = 0; index < this.hand.length; index++) {
                                        if (this.hand[index] === card) {
                                            this.hand = this.hand.splice(index, 1);
                                            // callback();
                                        }                                        
                                    }
                                }; 
Player.prototype.addCardsToLift = function (cardArr) {
                                    this.lift = this.lift.concat(cardArr);
                                };                               
Player.prototype.setTeamName    =   function (name) {
                                      try {
                                        if (name.length >= MAX_CHARACTERS) throw (`Invalid input: name has too many characters.`);
                                        this.team = name;                                
                                      } 
                                      catch(err) {
                                            console.log(err);
                                      }
                                    };
Player.prototype.setPlayerName  =   function (name) {
                                        try {
                                            if (name.length >= MAX_CHARACTERS) throw (`Invalid input: name has too many characters.`);
                                            this.name = name;                                
                                        } 
                                        catch(err) {
                                                console.log(err);
                                        } 
                                        // callback();       // callback may not be necessary                            
                                    };

//-----------------------------------------------------------------------------------------------------------------------------------
/*          FUTURE CODE         */
/*
function checkName(player) {
    if (player.name.length >= MAX_CHARACTERS) {
        console.log("Error: Too many characters in name.");
    }
}

function checkHand(player) {
    if (player.hand.length >= MAX_CARDS_IN_HAND) {
        console.log("Error: Illegal amount of cards in hand.");
    }
}

function checkLift(player) {
    if (player.lift.length >= MAX_CARDS_IN_LIFT) {
        console.log("Error: Too many cards in lift.");
    }
}

function checkPoints(player) {
    if (player.points > MAX_POINTS) {
        console.log("Error: Illegal number of allowable points.");
    }
}


function Team() {
    this.init = function () {
        this.name    = "";
        this.lift    = [];
        this.points  =  0;
        this.members = [];                          // Array of Two players
    };
    this.setMembers = function () {
        for (let i=0;i<2;i++) {
            this.members[i] = new Player();
        }
    }
}
function checkTeamMembers(team) {
    if (team.members.length === 2) {
        console.log("Error: Illegal number of members in team.");
    }
}
function checkTeamName(team) {
    if (team.name.length > MAX_CHARACTERS) {
        console.log("Error: Team name has too many characters.");
    }
}
*/

//================================================================================================================================

/**
 *  @copyright (c) 2018 Roger Clarke. All rights reserved.
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

