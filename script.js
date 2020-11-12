class AudioController {
    constructor() {
        this.bgMusic = new Audio('assets/sounds/bgMusic.wav');
        this.flipSound = new Audio('assets/sounds/card-flip.wav');
        this.matchSound = new Audio('assets/sounds/matching-hand-bells.wav');
        this.victorySound = new Audio('assets/sounds/victory-fanfare.wav');
        this.gameOverSound = new Audio('assets/sounds/game-over.wav');
        this.bgMusic.loop = true;  
        this.bgMusic.volume = 0.5;  
    }

    startMusic() {
        this.bgMusic.play();

    }    
    
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
       
    }
}


class MixOrMatch{
    constructor(totalTime, cards){
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById('time-remaining');
    this.ticker = document.getElementById('flips');
    this.audioController = new AudioController();
    }


    //is called whenever Game starts and hence I need to set here all properties that I need for when game starts
startGame() {
    this.cardToCheck = 0;
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime; //time back to 0//
    this.matchedCards = []; //empty array for all matched cards to go in//
    
    
    //wait 500ms before doing what is in this function
    setTimeout(() =>{
        this.audioController.startMusic();
        this.shuffleCards(this.cardsArray);
        this.countDown = this.startCountDown();
        this.busy = false;

    }, 500)
    //reset timer and flip counter by innerText once new game is started
    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;    

}
hideCards() {

    this.cardsArray.forEach(card =>{
        card.classList.remove('visible');
        card.classList.remove('matched'); //unclear whether I need this as I do not have a matched class in HTML
    });
}
   
    flipCard(card){
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;//updates flips in ticker to current value//
            card.classList.add('visible');
            
            //are we flipping a card for the first time or trying and match a card?

            if(this.cardToCheck)
                this.checkForCardMatch(card);//if card to check is not no then whichever card I just flipped = card to check
           else 
               this.cardToCheck = card; 

            }
        }

    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))  //if the card that I just clicked = to card to check, i.e. the src attributes, 
            this.cardMatch(card, this.cardToCheck);                                                            //then I know we have a match
      else 
            this.cardMisMatch(card, this.cardToCheck);

        this.cardToCheck = null; //whether match or mismatch, at that point there is no card to check
    
    }


    cardMatch(card1, card2) {
        this.matchedCards.push(card1);//push card into empty array
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');//this should add the animation in CSS I got from codepen.com
        this.audioController.match();
        if(this.matchedCards.length === this.cardsArray.length) //if these two have the same length I know it is victory
            this.victory(); 
    }

//in case of mismatch visible attribute is removed, i.e. cards turn back on their face, but with 1s delay. THis busy=true means that for this second no clicks anywhere else are possible
//then after 1 s: this.busy=false
    cardMisMatch(card1, card2) {
        this.busy=true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy=false;
        }, 1000);
    }

    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src; //gets the card in HTML by the class indicated, as it is only one, it is 0 (=zero-index), 
                                                                //and then the source attribute
        
    }  
//interval calls the function every 1000ms, which is 1s, so here we have got countdown by taking timeremaining "--" every second, and at the same time
//time remaining value is updated on the html page via innertext. and if timeremaining =0 then gameover function called.

startCountDown() {
    return setInterval(() => {
        this.timeRemaining --;
        this.timer.innerText = this.timeRemaining;
        if(this.timeRemaining === 0)
            this.gameOver();
    }, 1000);
}

//and in gameover function, interval is cleared and countdown stopped, and timer in startgame function is reset everytime we start a new game, game over 
//audio starts, and the gameover overlay pops up as 'visible' property is added.
gameOver(){
    clearInterval(this.countDown);
    this.audioController.gameOver();
    document.getElementById('game-over-text').classList.add('visible');
}


victory() {

    clearInterval(this.countDown);
    this.audioController.victory();
    document.getElementById('victory-text').classList.add('visible');


}



    //Fisher-Yates algorithm taken from https://www.youtube.com/watch?v=3uuQ3g92oPQ&t=2049s (from 27.20 min). This loops backwards through array with n cases from the 
    // last element (n-1) down to the first (1), and for each  iteration a random integer is created which is greater than/equal to 0 and less than or equal to i which is what 
    //I am using to iterate through the array. And then the random item in the array is exchanged with the one I am currently on - they are switched.
    //Due to looping backwards through the array, it is not i++ but i-- 
    
    shuffleCards(){

        for(let i = this.cardsArray.length -1; i > 0; i--)  {
            let randIndex = Math.floor(Math.random() * (i + 1));  //random integer = randIndex. Math.random creates a random number between 0 and 1 but exclusive 1, and then we are
                                                                //e.g. 0.67 and then we take i as 4 and make this 5 and then we say: 0.67 *5 and then we round it down. 
            this.cardsArray[randIndex].style.order = i;        //I use CSS grid and the order property, so not the array is shuffled but the order of the cards as they are display. 
            this.cardsArray[i].style.order = randIndex;       //.style refers to CSS and .order to that property mentioned above


        } 
    }


    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;

    }
}


function pageRedirect() {
      window.location.href = "prize.html";

}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(100, cards);


    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
             overlay.classList.remove('visible');   
            game.startGame();

        });

    });


    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

