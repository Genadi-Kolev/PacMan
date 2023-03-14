import Input from './input.js';
import createGame from './level.js';


window.onload = init;

const input = new Input();

class GameEngine {

    init() {
        input.init();
        createGame();

        setInterval(this.gameLoop, 16);
    };

    gameLoop(_timeStamp) {
        input.consumeInput();

    }
};

const engine = new GameEngine();

function init() {
    engine.init();
};

