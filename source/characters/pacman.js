import { Character } from "./character.js";

export class Pacman extends Character {

    constructor(input) {
        super(input);

        this.moveRate = 2.2;
    };

    spawn() {
        const layer = document.getElementById('sprites');
        const player = this.#createSprite(
            this.getPosition().x,
            this.getPosition().y
        );

        layer.appendChild(player);
    };

    #createSprite(x, y) {
        const sprite = document.createElement('img');

        sprite.src = '../Nursery/spritesheet.png';
        sprite.className = 'pacman';
        sprite.style.clipPath = 'inset(0px 210px 233px 456px)';
        sprite.style.left = -451 + x * 8 + 'px';    // (-451;4) place the sprite 
        sprite.style.top = 4 + y * 8 + 'px';        // at (1;1) in the matrix grid

        return sprite;
    };

};