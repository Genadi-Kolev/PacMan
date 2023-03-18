import { Input } from './input.js';
import { Game } from './gamemap.js';
import { game_map } from './game_maps/levels.js'

window.onload = init;

const game = new Game('game-container-id', game_map);
const input = new Input();

class GameEngine {

    init() {
        input.init();

        game.populateMap();
        game.addCharacters();

        setInterval(this.#gameLoop, 16);
    };

    #gameLoop(_timeStamp) {
        input.consumeInput();

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
