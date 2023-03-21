import { Game } from './gamemap.js';
import { game_map } from './game_maps/levels.js'

window.onload = init;

const image = new Image();
image.src = '../Nursery/spritesheet.png'
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

export { canvas, context, image };

let gameObjects = [];

class GameEngine {

    loopFunc = 0;

    init() {
        const game = new Game(game_map);
        game.populateMap();
        const objects = game.spawnCharacters();
        gameObjects = gameObjects.concat(objects);

        this.loopFunc = setInterval(this.#gameLoop, 16);
    };

    #gameLoop() {
        gameObjects.forEach(object => {
            object.update();
        });
    }

    stopGameLoop() {
        clearInterval(this.loopFunc);
    }
    startGameLoop() {
        this.loopFunc = setInterval(this.#gameLoop, 16);
    }
};

const engine = new GameEngine();

// For debugging purposses
addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'Escape':
            engine.stopGameLoop();            
            break;
    
        case 'Backquote':
            engine.startGameLoop();
            break;
    }
},false);

function init() { engine.init(); }