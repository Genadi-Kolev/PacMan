import { Input } from './input.js';
import { Game } from './gamemap.js';
import { game_map } from './game_maps/levels.js'

window.onload = init;

const game = new Game('game-container-id', game_map);
const input = new Input();
const gameObjects = [];

const image = new Image();
image.src = '../Nursery/spritesheet.png'
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

export { canvas, context, image };

class GameEngine {


    init() {
        input.init();

        game.populateMap();
        const player = game.addPacman(input);
        gameObjects.push(player);
      
        setInterval(this.#gameLoop, 16);
    };

    #gameLoop() {
        gameObjects.forEach( object => {
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
