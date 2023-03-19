export class Character {

    _controller = undefined;

    constructor(controller) {
        this._controller = controller;
    }

    _moveRate = 0;
    /** @param {Number} value */
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
        x: 12.5,
        y: 22
    };
    /** @param {Number} value */
    setPosition(x, y) {
        if (x < 0) {
            x = 0;
        }
        this._position.x = value;
    }
    getPosition() {
        return this._position;
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