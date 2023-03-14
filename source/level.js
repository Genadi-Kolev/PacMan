const level = {
    map:[
        [1,1,0,0,1],
        [1,0,0,0,0],
        [0,0,1,1,0],
        [0,0,0,1,0],
        [0,1,0,1,0]
     ],
     player: {
        x: 0,
        y: 4
     },
     theme: 'default'
};

export default function createGame() {
    let game = new Game('game-container-id', level);
    game.populateMap();
}

class Game {
    constructor(id, level) {
        this.el = document.getElementById(id);

        this.tileTypes = ['floor', 'wall'];

        this.tileDim = 32;

        // inherit the level's properties: map, player start, goal start.
        this.map = level.map;
        this.theme = level.theme;
        this.player = { ...level.player };
        this.goal = { ...level.goal };
    }

    populateMap() {
        this.el.className = 'game-container ' + this.theme;
        let ties = document.getElementById('tiles');

        for (var y = 0; y < this.map.length; y++) {
            for (var x = 0; x < this.map[y].length; x++) {

                let tileCode = this.map[y][x];
                let tileType = this.tileTypes[tileCode];

                let tile = this.createObject(x, y, tileType);

                tiles.appendChild(tile);
            }
        }
    }

    createObject(x, y, type) {
        let object = document.createElement('div');

        object.className = type;

        object.style.width = object.style.height = this.tileDim + 'px';
        object.style.left = x * this.tileDim + 'px';
        object.style.top = y * this.tileDim + 'px';

        return object;
    }

    sizeUp() {
        let map = this.el.querySelector('.game-map')

        // map.style.height = map.length *  
    }
}




function init() {
    let myGame = new Game('game-container-1',level);

    myGame.populateMap();
}
init();
