    //      Temporary code repository for changed blocks of code.

    var playedCard; // add playedBy attribute
    var calledCard; // add playedBy attribute
    //Round Play Loop:      --> Loop until player.hand.length == 0
    for (var i = human.hand.length; i > 1; i--) {
        if (winner == computer || playFirst == computer) { // if winner = computer, then computer plays first and vice-versa
            calledCard = computerPlay(computer, null);
            msgboard.text = human.name + "'s turn. Please play a card.";
            msgboard.visible = true;
            //setTimeout(() => {
            humanPlay()
            .then((card) => {
                playedCard = card;
                // document.getElementById('card_layer').removeEventListener('click', mouseEventHandler(event));
                let higherCard = determineWinner(calledCard, playedCard);
                if (higherCard == calledCard) {
                    winner = computer;
                } else {
                    winner = human;
                }
                let winnerName = winner.name;
                console.log(winnerName, +' Wins!'); // add msg box
                msgboard.text = winnerName + " Won!!! " + winnerName + " plays first.";
                msgboard.visible = true;
                winner.lift.push(calledCard, playedCard);
                let delayTwoSec = setTimeout(function () {
                    Game.Background.init();
                }, 4000);
                console.log('END OF ROUND!!!');
                //clearTimeout(delayTwoSec);
            })
            .catch(err => console.log(err))
        //}, 4000);
    } else { // if winner = human, then human plays first
        msgboard.text = human.name + " play first. Please select a card.";
        msgboard.visible = true;
        //setTimeout(() => {
        humanPlay()
        .then((resolvedCard) => {
                calledCard = resolvedCard;
                // document.getElementById('card_layer').removeEventListener('click', mouseEventHandler(event));
                playedCard = computerPlay(computer, calledCard);
                let winningCard = determineWinner(calledCard, playedCard);
                if (winningCard == playedCard) {
      
                    winner = computer;
                } else {
                    winner = human;
                }
                let winnerName = winner.name;
                console.log(winnerName, +' Wins!');
                msgboard.text = winnerName + " Won!!!";
                msgboard.visible = true;
                winner.lift.push(calledCard, playedCard);
                setTimeout(function () {
                    Game.Background.init();
                }, 2000);
                console.log('END OF ROUND!!!');
            })
            .catch(err => console.log(err));
            //}, 4000);                 
        }
    }

//-------------------------------------------------------------------

// initializeInputControllers();

    // show menu screen
    // load all image and sound files to cache
    // load all graphics elements
    // _initializeScreens();
    // load .JSON files: - objects & settings
    // loadScripts & modules
    // manipulate settings - save to .JSON files, cookies

      mainGameLoop:        
         Deal subroutine: shuffle, cut, distribute
         gameLoop:
            Deal
            playedRoundLoop: 
                players play cards: 
                determineWinner()
            countForGame()
            assessPoints(): high, low, jack, game, hangJack
    

    // read game settings from .JSON FILE
    // In-game globals
    //do until human.points || computer.points >= 14

    /*  Dealing subroutines    */
    /*
        Game.Components.deck.shuffle();
        Game.Components.deck.deal(human, computer);
        dealer.points += kickPoints(Game.Components.deck.trump);
        console.log("Dealer Points: ", + dealer.points);

        
            // who plays first
        var winner;
        if (dealer == computer) {
            playFirst = human;
        } else {
            playFirst = computer;
        }

     */
    /*  Actual Game Engine  */




    // }


    /*
                //  Count for game
                var hGamePoints = countForGame(human);
                var cGamePoints = countForGame(computer);
                // logic to determine assignment of game points
                if (hGamePoints == cGamePoints) {
                    dealer.points += GAME;
                } else if (hGamePoints > cGamePoints) {
                    human.points += GAME;
                } else {
                    computer.points += GAME;
                }
//------------------------------------------------------------------------------------------------------