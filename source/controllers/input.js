export class Input {

    constructor() {
        this.direction = ''
    }

    _init() {
        addEventListener('keypress', ({ code }) => {
            switch (code) {
                case 'KeyW':
                    this.direction = 'up'
                    break
                case 'KeyA':
                    this.direction = 'left'
                    break
                case 'KeyS':
                    this.direction = 'down'
                    break
                case 'KeyD':
                    this.direction = 'right'
                    break
            }
        })
    }
}