
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