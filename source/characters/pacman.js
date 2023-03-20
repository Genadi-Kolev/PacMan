import { Character } from "./character.js";
import { context, canvas } from "../engine.js";
import { Input } from "../input.js";

export class Pacman extends Character {

    constructor(map) {
        const input = new Input();
        input.init();
        super(input, map);

        this.controller = input;
        this.setPosition(13.5,23);
        this.moveRate = 0.05;
        this.animCycleLoop = [0, 1];
        this.row = 0;
    }

    updateAnimation() {
        this._frameCount++;
        if (this._frameCount < 13)
            return;

        this._frameCount = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);

        const column = this.animCycleLoop[this._currentLoopIndex];
        this.row = this.#handleInput();
        this._drawFrame(column, this.row);

        this._currentLoopIndex++;
        if (this._currentLoopIndex >= this.animCycleLoop.length) {
            this._currentLoopIndex = 0;
        }
    }

    #handleInput() {
        if (this.collisionCheck())
            return this.row;

        if (this._controller.input.x > 0)
            return 0;
        if (this._controller.input.y < 0 )
            return 3;
        if (this._controller.input.y > 0)
            return 2;
        if (this._controller.input.x < 0)
            return 1;

        return 0;
    }
};