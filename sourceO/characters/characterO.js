import { context, image } from "../engineO.js";

export class Character {

    animCycleLoop = undefined;
    #map = undefined;
    #inputCache = undefined;

    constructor(controller, map) {
        this._controller = controller;
        this.#inputCache = { x: 0, y: 0 };

        this._currentLoopIndex = 0;
        this._frameCount = 20;

        this.#map = map;
    }

    #moveRate = 0;
    set moveRate(value) {
        if (value < 0) {
            value = 0;
        }
        this.#moveRate = value;
    }
    get moveRate() {
        return this.#moveRate;
    }


    /** Starting coordinates; will change during runtime */
    #position = {
        x: 0,
        y: 0
    };
    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;

        if (this.position.x < 0)
            this.position.x = 28;
        else if (this.position.x > 28)
            this.position.x = 0;
    }
    get position() { return this.#position; }

    _drawFrame(frameX, frameY) {
        context.drawImage(image,
            456 + frameX * 16, 0 + frameY * 16, 16, 16,
            (this.position.x - 0.5) * 8, (this.position.y - 0.5) * 8, 16, 16);
    }

    _consumeInput() {
        const input = {
            x: this._controller.input.x,
            y: this._controller.input.y
        };

        this.#refreshPosition(input.x, input.y);
    };

    #refreshPosition(x, y) {
        let deltaX = 0;
        let deltaY = 0;

        if (this.collisionCheck()) {

            deltaX = (x != this.#inputCache.x) ? this.moveRate * this.#inputCache.x : 0;
            deltaY = (y != this.#inputCache.y) ? this.moveRate * this.#inputCache.y : 0;
        }
        else {
            this.#inputCache = { ...this._controller.input };

            deltaX = this.moveRate * x;
            deltaY = this.moveRate * y;
        }

        this.setPosition(
            this.position.x + deltaX,
            this.position.y + deltaY
        );
        // console.log(this.position.x + ' ' + this.position.y);
    }

    /**
     * Check for collision in Controller's direction
     */
    collisionCheck() {
        let x = 0;
        let y = 0;
        // console.group('Collision checks')
        // console.log('input -> x: ' + this._controller.input.x + ' | y: ' + this._controller.input.y)

        switch (this._controller.input.x) {
            case -1:
                x = Math.ceil(this.#position.x);
                break;
            case 1:
                x = Math.floor(this.#position.x);
                break;
            default:
                x = Math.round(this.#position.x);
                break;
        }

        switch (this._controller.input.y) {
            case -1:
                y = Math.floor(this.#position.y);
                break;
            case 1:
                y = Math.ceil(this.#position.y);
                break;
            default:
                y = Math.round(this.#position.y);;
                break;
        }
        // console.log(y + ' ' + x);
        // console.log((y + (1 * -this._controller.input.y)) + ' ' + (x + (1 * this._controller.input.x)))
        // console.groupEnd();

        const nextTile = this.#map[y + (1 * -this._controller.input.y)][x + (1 * this._controller.input.x)];

        return nextTile.type == 'wall' ? true : false;
    }
};