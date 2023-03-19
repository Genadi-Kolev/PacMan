import { Tile } from './tiles/tile.js'
import { Pacman } from './characters/pacman.js';

export class Game {

    constructor(id, level) {
        this.el = document.getElementById(id);

        this.tileTypes = ['floor', 'wall'];
        this.map = [];

        // inherit the level's properties: map, player start, goal start.
        this.matrix = level.map;
        this.theme = level.theme;
        this.player = { ...level.player };
    }

    populateMap() {
        this.el.className = 'game-container ' + this.theme;
        const tiles = document.getElementById('tiles');

        for (let x = 0; x < this.matrix.length; x++) {
            const tempArr = [];
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

    spawnCharacters() {
        const charactersArr = [];

        const pacman = this.#addPacman();
        charactersArr.push(pacman);

        return charactersArr;
    }

    #addPacman() { return new Pacman(); }
}


