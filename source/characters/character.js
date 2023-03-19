import { context, image } from "../engine.js";

export class Character {
    
    animCycleLoop = undefined;

    constructor(controller) {
        this._controller = controller;
        this._currentLoopIndex = 0;
        this._frameCount = 20;
    }

    _moveRate = 0;
    set moveRate(value) {
        if (value < 0) {
            value = 0;
        }
        this._moveRate = value;
    }
    get moveRate() {
        return this._moveRate;
    }


    /** Starting coordinates; will change during runtime */
    _position = {
        x: 0,
        y: 0
    };
    setPosition(x, y) {
        this._position.x = x < 0 ? 28 : x;
        this._position.x = x > 28 ? 0 : x;

        this._position.y = y < 0 ? 31 : y;
        this._position.y = y > 31 ? 0 : y;
    }
    get position() { return this._position; }

    _drawFrame(frameX, frameY) {
        context.drawImage(image,
            456 + frameX * 16, 0 + frameY * 16, 16, 16,
            this.position.x * 8, (this.position.y - 0.5) * 8, 16, 16);
    }

    consumeInput() {
        // this.updateXPosition(this.moveRate * this.input.x)
        // this.updateYPosition(this.moveRate * this.input.y)

        // this.refreshPosition()
    };

    updateYPosition(distance) {
        this.position.y -= distance;
        // Update y-axis position at the edge.
        if (this.position.y < 0) {
            this.position.y = 499;
        }
        else if (this.position.y > 499) {
            this.position.y = 0;
        }
    };

    // Update x-axis position.
    updateXPosition(distance) {
        this.position.x += distance;
        // Update x-axis position at the edge.
        if (this.position.x < 0) {
            this.position.x = 499;
        }
        else if (this.position.x > 499) {
            this.position.x = 0;
        }
    };

    refreshPosition() {
        let x = this.position.x - (this.object1Size.width / 2);
        let y = this.position.y - (this.object1Size.height / 2);
        let transform = "translate(" + x + " " + y + ")";

        // object1.setAttribute("transform", transform);
    };
};