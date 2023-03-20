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
        const game = new Game('game-container-id', game_map);
        game.populateMap();
        const objects = game.spawnCharacters();
        gameObjects = gameObjects.concat(objects);

        setInterval(this.#gameLoop, 16);
    };

    #gameLoop() {
        gameObjects.forEach(object => {
            object.consumeInput();
            object.updateAnimation();
        });
    }
};

const engine = new GameEngine();

function init() { engine.init(); }


/** Temp function to toggle tiles: Debugging purposes */
function switchTiles() {
    for (let y = 0; y < game.map.length; y++) {
        for (let x = 0; x < game.map[y].length; x++) {
            game.map[y][x].toggleTile();
        }
    }
}
document.getElementById('switchButton').onclick = switchTiles;
