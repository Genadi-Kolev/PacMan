import * as levels from './game_maps/levels.js'

export default function createMap() {
    let game = new Game('game-container-id', levels.game_map);
    game.populateMap();
}

class Game {
    constructor(id, level) {
        this.el = document.getElementById(id);
        this.spritesheet = document.getElementById('spritesheet');

        this.tileTypes = ['floor', 'wall'];

        this.tileDim = 8;

        // inherit the level's properties: map, player start, goal start.
        this.map = level.map;
        this.theme = level.theme;
        this.player = { ...level.player };
        this.goal = { ...level.goal };
    }

    populateMap() {
        this.el.className = 'game-container ' + this.theme;
        let tiles = document.getElementById('tiles');

        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {

                let tileCode = this.map[y][x];
                let tileType = this.tileTypes[tileCode];

                let tile = this.createObject(x, y, tileType);

                tiles.appendChild(tile);
            }
        }
    }

    createObject(x, y, type) {
        let object = document.createElement('div');
        let sprite = this.createTileSprite(x, y);

        object.appendChild(sprite);
        object.className = type;
        object.style.width = object.style.height = this.tileDim + 'px';
        object.style.left = x * this.tileDim + 'px';
        object.style.top = y * this.tileDim + 'px';

        return object;
    }

    createTileSprite(x, y) {
        let sprite = document.createElement('img');
        
        sprite.src = '../Nursery/spritesheet.png';
        let up = 0 + 8 * y;
        let left = 672 - 8 * x;
        let down = 240 - 8 * y;
        let right = 0 + 8 * x;

        sprite.style.position = 'relative';
        sprite.style.clipPath = 'inset(' + up + 'px ' + left + 'px ' + down + 'px ' + right + 'px)';
        sprite.style.left = -x * this.tileDim + 'px';
        sprite.style.top = -y * this.tileDim + 'px';

        return sprite;
    }
}
