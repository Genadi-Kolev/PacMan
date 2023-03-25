export class Bot {
    #cache = []
    #collisions = []

    constructor() {
        this.direction = ''
    }

    _addCollision(collision) {
        if (!this.#collisions.includes(collision))
            this.#collisions.push(collision)
    }

    _pickDirection(velocity, moveRate) {
        if (this.#collisions.length > this.#cache.length) {
            this.#cache = this.#collisions
        }

        if (JSON.stringify(this.#collisions) !== JSON.stringify(this.#cache)) {
            if (velocity.x > 0)
                this.#cache.push('right')
            else if (velocity.x < 0)
                this.#cache.push('left')
            else if (velocity.y > 0)
                this.#cache.push('down')
            else if (velocity.y < 0)
                this.#cache.push('up')

            const pathways = this.#cache.filter(obstacle => {
                return !this.#collisions.includes(obstacle)
            })
            this.direction = pathways[getRandomIntIn(0, pathways.length - 1)]


            switch (this.direction) {
                case 'right':
                    velocity.x = moveRate
                    velocity.y = 0
                    break;
                case 'left':
                    velocity.x = -moveRate
                    velocity.y = 0
                    break;
                case 'down':
                    velocity.x = 0
                    velocity.y = moveRate
                    break;
                case 'up':
                    velocity.x = 0
                    velocity.y = -moveRate
                    break;
            }

            this.#cache = []
        }
        this.#collisions = []
    }

    _animFrameIncr() {
        switch (this.direction) {
            case 'up':
                return 4
            case 'down':
                return 6
            case 'left':
                return 2
            case 'right':
                return 0
            default:
                return 0
        }
    }
}

function getRandomIntIn(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    const result = Math.floor(Math.random() * (max - min + 1) + min)
    return result
}