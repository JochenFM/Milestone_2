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

    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
    }

    flipCard(card){
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');
        }


    }
    canFlipCard(card) {
        return true;
        //return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;

    }
}





class MixOrMatch{
    constructor(totalTime, cards){
    this.cardsArray = cards;
    this.totalTime = totalTime;
    }
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(100, cards);


    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {

             overlay.classList.remove('visible');   
            game.startGame();
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
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}

