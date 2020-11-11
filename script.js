class AudioController {
    constructor() {
        this.bgMusic = new Audio('assets/sounds/bgMusic.wav');
        this.flipSound = new Audio('assets/sounds/card-flip.wav');
        this.matchSound = new Audio('assets/sounds/matching-hand-bells.wav');
        this.victorySound = new Audio('assets/sounds/victory-fanfare.wav');
        this.gameOverSound = new Audio('assets/sounds/game-over.wav');
        this.bgMusic.loop = true;  
        this.bgMusic.volume = 0.6;  
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
        this.TimeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }
}


class MixOrMatch{
    constructor(totalTime, cards){
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timer = document.getElementById('time-remaining');
    this.ticker = document.getElementById('flips');
    this.audioController = new AudioController();
    }


    //is called whenever Game starts and hence I need to set here all properties that I need for when game starts
startGame() {
    this.cardToCheck = null;
    this.totalClicks =0;
    this.timeRemaining = this.totalTime; //time back to 0//
    this.matchedCards = []; //empty array for all matched cards to go in//
    
    
    //wait 500ms before doing what it in this function
    setTimeout(() =>{
        this.audioController.startMusic();
        this.shuffleCards();
        this.countDown = this.StartCountDown();
        this.busy = false;

    }, 500);
    //reset timer and flip counter by innerText once new game is started
    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;    

}
hideCards() {


    this.cardsArray.forEach(card =>{
        card.classList.remove('visible');
    });
}
   
    flipCard(card){
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;//updates flips in ticker to current value//
            card.classList.add('visible'); 
        }


    }


StartCountDown() {

//interval calls the function every 1000ms, which is 1s, so here we have got countdown by taking timeremaining in "--" every second, and at the same time
//time remaining value is updated on the html page via innertext. and if timeremaining =0 then gameover function called.

    return setInterval(() => {
        this.TimeRemaining --;
        this.timer.innerText = this.timeRemaining;
if(this.timeRemaining===0)
    this.gameOver();
    }, 1000);
}

//and in gameover function, interval is cleared and countdown stopped, and timer in startgame function is reset everytime we start a new game, game over 
//audio starts, and the gameover overlay pops up as 'visible' property is added.
gameOver(){

    clearInterval(this.countDown);
    this.audioController.gameover();
    document.getElementById('game-over-text'),classList.add('visible');
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


    canFlipCard(_card) {
        return true;
        //return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;

    }
}




function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(5, cards);


    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {

             overlay.classList.remove('visible');   
            //game.startGame();
//uncomment that for demonstration of music at start:
//let audioController = new AudioController();
//audioController.startMusic();
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

