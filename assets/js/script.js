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



//set object references
var playbtn = document.getElementById('playpausebtn');
var mutebtn = document.getElementById('soundbtn');
var bgMusic = this.bgMusic


//add event handling
playbtn.addEventListener('click', playPause);
mutebtn.addEventListener('click', mute);

//set intial button background
mutebtn.style.background = "url(assets/images/unmute_icon.png)";
mutebtn.style.backgroundSize = "cover";

//functions
function playPause() { 
    if (this.bgMusic.paused) {
        this.bgMusic.play();
        playbtn.style.background = "url(assets/images/pause_icon.png)";
        playbtn.style.backgroundSize = "cover";

    }
    else {
       this.bgMusic.pause();
        playbtn.style.background = "url(assets/images/play_icon.png) no-repeat"; 
       playbtn.style.backgroundSize = "cover";
    }
}

function mute() {
    if (this.bgMusic.muted) {
        this.bgMusic.muted = false;
        mutebtn.style.backgroundImage === 'url("assets/images/unmute_icon.png")' 
        //Mute Music
    } else { // unmute Music
        this.bgMusic.muted = true;
        mutebtn.style.background = "url(assets/images/mute_icon.png) no-repeat"
        mutebtn.style.backgroundSize = "cover"
        mutebtn.classList.add("btn", "soundOn");
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



    
startGame() {
    this.cardToCheck = 0;
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime; 
    this.matchedCards = []; 
    
    

    setTimeout(() =>{
        this.audioController.startMusic();
        this.shuffleCards(this.cardsArray);
        this.countDown = this.startCountDown();
        this.busy = false;

    }, 500)
    
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
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');
            

            if(this.cardToCheck) {
                this.checkForCardMatch(card);
         } else {
               this.cardToCheck = card; 

            }
         }

        }    

    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);                                                       
        else 
            this.cardMisMatch(card, this.cardToCheck);

        this.cardToCheck = null;
        
    }


    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        this.audioController.match();
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory(); 

    }




    cardMisMatch(card1, card2) {
        this.busy=true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy=false;
        }, 1000);
    }

    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src; 
        
    }  


startCountDown() {
    return setInterval(() => {
        this.timeRemaining --;
        this.timer.innerText = this.timeRemaining;
        if(this.timeRemaining === 0)
            this.gameOver();
    }, 1000);
}


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

    
    shuffleCards(){

        for(let i = this.cardsArray.length -1; i > 0; i--)  {
            let randIndex = Math.floor(Math.random() * (i + 1));  
                                                                
            this.cardsArray[randIndex].style.order = i;         
            this.cardsArray[i].style.order = randIndex;      


        } 
    }


    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;

    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
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

function pageRedirect() {
      window.location.href = "prize.html";

    }

function clickedButton(){
        window.location.href="index.html";

    }
