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
    }
}


function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));


    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {

             overlay.classList.remove('visible');   
            //game.start.Game();
//let audioController = new AudioController();
//audioController.startMusic();
        });

    });


    cards.forEach(card => {
        card.addEventListener('click', () => {


        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}

