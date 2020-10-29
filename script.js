
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}
function ready() {
    Let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    Let cards = Array.from(document.getElementsByClassName('card'));


    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {

             overlay.classList.remove('visible');   
            //game.start.Game();
        });

    });


    cards.forEach(card => {
        card.addEventListener('click', () => {


        });
    });
}




class AudioController {
    constructor() {
        this.bgMusic = new Audio('assets/sounds/bgMusic.wav');
        this.flipSound = new Audio('assets/sounds/card-flip.wav');
        this.matchSound = new Audio('assets/sounds/.wav');
        this.victorySound = new Audio('assets/sounds/victory-fanfare.wav');
        this.gameOverSound = new Audio('assets/sounds/');
        this.bgMusic.loop = true;   
    }

    startMusic() {
        this.bgMusic.play();
        
    }
}