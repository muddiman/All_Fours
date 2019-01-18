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


