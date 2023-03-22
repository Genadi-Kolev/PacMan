export class Input {

    input = {
        x: 0,
        y: 0
    };

    init() {
        document.addEventListener('keydown', (event) => {
            if (event.defaultPrevented) {
                return;
            }
            switch (event.code) {
                case 'KeyS':
                    this.input.x = 0;
                    this.input.y = 1;
                    break;
                case 'KeyW':
                    this.input.x = 0;
                    this.input.y = -1;
                    break;
                case 'KeyA':
                    this.input.x = -1;
                    this.input.y = 0;
                    break;
                case 'KeyD':
                    this.input.x = 1;
                    this.input.y = 0;
                    break;        
            }
            event.preventDefault();
        }, false);
    };

};
