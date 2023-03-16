import { game_map } from './game_maps/levels.js'
import { Tile } from './tiles/tile.js'

class Game {

    constructor(id, level) {
        this.el = document.getElementById(id);
        this.spritesheet = document.getElementById('spritesheet');

        this.tileTypes = ['floor', 'wall'];
        this.map = [];

        // inherit the level's properties: map, player start, goal start.
        this.matrix = level.map;
        this.theme = level.theme;
        this.player = { ...level.player };
    }

    populateMap() {
        this.el.className = 'game-container ' + this.theme;
        let tiles = document.getElementById('tiles');

        for (let x = 0; x < this.matrix.length; x++) {
            let tempArr = [];
            for (let y = 0; y < this.matrix[x].length; y++) {
                let tileCode = this.matrix[x][y];
                let tileType = this.tileTypes[tileCode];
                
                let tile = new Tile(y, x, tileType);
                
                tiles.appendChild(tile.object);
                tempArr.push(tile);
            }
            this.map.push(tempArr);
        }
    }
}

const game = new Game('game-container-id', game_map);

export function createMap() { game.populateMap(); }

/** Temp function to toggle tiles: Debugging purposes */
export function switchTiles() {
    for (let y = 0; y < game.map.length; y++) {
        for (let x = 0; x < game.map[y].length; x++) {
            game.map[y][x].toggleTile();
        }
    }
}
