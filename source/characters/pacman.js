class Pacman {

    position = {
        x: 0,
        y: 0
    };

    constructor() {

    };

    spawn() {
        const layer = document.getElementById('sprites');
        const player = this.#createSprite(451,4);

        layer.appendChild(player);
    };

    #createSprite(x,y) {
        const sprite = document.createElement('img');

        sprite.src = '../Nursery/spritesheet.png';
        sprite.className = 'pacman';
        sprite.style.clipPath = 'inset(0px 210px 233px 456px)';
        sprite.style.left = -x + 'px';
        sprite.style.top = y + 'px';

        return sprite;
    };

};

export { Pacman };