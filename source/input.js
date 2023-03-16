export class Input {
    // Declare and assign variables.
    moveRate = 2.2;

    object1Size = {
        width: 20,
        height: 20
    };
    position = {
        x: 10,
        y: 10
    };
    input = {
        x: 0,
        y: 0
    };

    object1 = document.getElementById("object1");


    init() {
        document.addEventListener('keydown', (event) => {
            if (event.defaultPrevented) {
                return;
            }
            switch (event.code) {
                case 'KeyS':
                    this.input.x = 0;
                    this.input.y = -1;
                    break;
                case 'KeyW':
                    this.input.x = 0;
                    this.input.y = 1;
                    break;
                case 'KeyA':
                    this.input.x = -1;
                    this.input.y = 0;
                    break;
                case 'KeyD':
                    this.input.x = 1;
                    this.input.y = 0;
                    break;
                case 'Escape':
                    this.input.x = 0;
                    this.input.y = 0;
                    break;
            }
            event.preventDefault();
        }, false);
    };

    consumeInput() {
        this.updateXPosition(this.moveRate * this.input.x)
        this.updateYPosition(this.moveRate * this.input.y)

        this.refreshPosition()
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
        let x = this.position.x - (this.object1Size.width/2);
        let y = this.position.y - (this.object1Size.height/2);
        let transform = "translate(" + x + " " + y + ")";

        // object1.setAttribute("transform", transform);
    };
};
