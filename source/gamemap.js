import { game_map } from './game_maps/levels.js'
import { Tile } from './tiles/tile.js'

export function createMap() {
    let game = new Game('game-container-id', game_map);
    game.populateMap();
}

class Game {
    constructor(id, level) {
        this.el = document.getElementById(id);
        this.spritesheet = document.getElementById('spritesheet');

        this.tileTypes = ['floor', 'wall'];

        // inherit the level's properties: map, player start, goal start.
        this.map = level.map;
        this.theme = level.theme;
        this.player = { ...level.player };
    }

    populateMap() {
        this.el.className = 'game-container ' + this.theme;
        let tiles = document.getElementById('tiles');

        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                let tileCode = this.map[y][x];
                let tileType = this.tileTypes[tileCode];

                let tile = new Tile(x, y, tileType).createObject();

                tiles.appendChild(tile);
            }
        }
    }

}
