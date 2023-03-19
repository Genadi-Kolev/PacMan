import { Character } from "./character.js";
import { context, canvas } from "../engine.js";

export class Pacman extends Character {

    constructor(input) {
        super(input);

        this.setPosition(13, 23);
        this.moveRate = 2.2;
        this.animCycleLoop = [0, 1];
    }

    updateAnimation() {
        this._frameCount++;
        if (this._frameCount < 15)
            return;

        this._frameCount = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);
        this._drawFrame(this.animCycleLoop[this._currentLoopIndex], 0);
        
        this._currentLoopIndex++;
        if (this._currentLoopIndex >= this.animCycleLoop.length) {
          this._currentLoopIndex = 0;
        }
    }
};