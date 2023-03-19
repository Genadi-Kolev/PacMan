import { context, image } from "../engine.js";

export class Character {

    animCycleLoop = undefined;

    constructor(controller) {
        this._controller = controller;
        this._currentLoopIndex = 0;
        this._frameCount = 20;
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
            this.position.x * 8, (this.position.y - 0.5) * 8, 16, 16);
    }

    consumeInput() {
        const input = {
            x: this._controller.input.x,
            y: this._controller.input.y
        };

        this.#refreshPosition(input.x, -input.y);
    };

    #refreshPosition(x, y) {
        this.setPosition(
            this.position.x + this.moveRate * x,
            this.position.y + this.moveRate * y
        );
    }
};