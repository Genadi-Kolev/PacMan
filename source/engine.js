import { Input } from './input.js';
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

    init() {
        const game = new Game(game_map);
        game.populateMap();
        const objects = game.spawnCharacters();
        gameObjects = gameObjects.concat(objects);

        setInterval(this.#gameLoop, 16);
    };

    #gameLoop() {
        gameObjects.forEach(object => {
            object.update();
        });
    }
};

const engine = new GameEngine();

function init() { engine.init(); }