import { Tile } from './tiles/tile.js.js.js.js.js.js'
import { Pacman } from './characters/pacmanO.js';

export class Game {

    constructor(level) {
        this.tileTypes = ['floor', 'wall'];
        this.map = [];
        this.dataMatrix = level;
    }

    populateMap() {
        const tiles = document.getElementById('tiles');

        for (let x = 0; x < this.dataMatrix.length; x++) {
            const tempArr = [];
            for (let y = 0; y < this.dataMatrix[x].length; y++) {
                const tileCode = this.dataMatrix[x][y];
                const tileType = this.tileTypes[tileCode];

                const tile = new Tile(y, x, tileType);

                tiles.appendChild(tile.object);
                tempArr.push(tile);
            }
            this.map.push(tempArr);
        }
    }

    spawnCharacters() {
        const charactersArr = [];

        const pacman = this.#addPacman(this.map);
        charactersArr.push(pacman);

        return charactersArr;
    }

    #addPacman(map) { return new Pacman(map); }
}


