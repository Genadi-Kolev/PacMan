export class Input {

    constructor() {
        this.direction = ''
    }

    init() {
        addEventListener('keypress', ({ key }) => {
            switch (key) {
                case 'w':
                    this.direction = 'up'
                    break
                case 'a':
                    this.direction = 'left'
                    break
                case 's':
                    this.direction = 'down'
                    break
                case 'd':
                    this.direction = 'right'
                    break
            }
        })
    }
}