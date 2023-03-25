import { Bot } from "../controllers/bot.js"
import { Tile } from "../tile.js"
import { Character, circleCollidesWithRectangle } from "./character.js"

export class Ghost extends Character {
    #moveRate = 1
    #collisionsCache = []

    #animCycleLoop = [0, 1]
    #frameRow = 0

    constructor({ position, velocity }, type = 'red') {
        super({
            position: position,
            velocity: velocity,
            controller: new Bot()
        })

        this.type = type
        this.radius = 3
    }

    draw() {
        const column = this.#animCycleLoop[this._currentLoopIndex];
        this._drawFrame(column, 4);

        this._frameCount++;
        if (this._frameCount < 9)
            return;
        this._frameCount = 0;

        this._currentLoopIndex++;
        if (this._currentLoopIndex >= this.#animCycleLoop.length) {
            this._currentLoopIndex = 0;
        }
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.x < 0)
            this.position.x = 28 * Tile.size
        else if (this.position.x > 28 * Tile.size)
            this.position.x = 0
    }

    collisionCheck(boundries) {
        const collisions = []
        boundries.forEach((boundry) => {
            if (
                circleCollidesWithRectangle({
                    rectangle: boundry,
                    circle: {
                        ...this, velocity: {
                            x: this.#moveRate,
                            y: 0
                        }
                    }
                }) && !collisions.includes('right')
            ) {
                collisions.push('right')
            }

            if (
                circleCollidesWithRectangle({
                    rectangle: boundry,
                    circle: {
                        ...this, velocity: {
                            x: -this.#moveRate,
                            y: 0
                        }
                    }
                }) && !collisions.includes('left')
            ) {
                collisions.push('left')
            }

            if (
                circleCollidesWithRectangle({
                    rectangle: boundry,
                    circle: {
                        ...this, velocity: {
                            x: 0,
                            y: this.#moveRate
                        }
                    }
                }) && !collisions.includes('down')
            ) {
                collisions.push('down')
            }

            if (
                circleCollidesWithRectangle({
                    rectangle: boundry,
                    circle: {
                        ...this, velocity: {
                            x: 0,
                            y: -this.#moveRate
                        }
                    }
                }) && !collisions.includes('up')
            ) {
                collisions.push('up')
            }
        })

        if (collisions.length > this.#collisionsCache.length)
            this.#collisionsCache = collisions

        if (JSON.stringify(collisions) !== JSON.stringify(this.#collisionsCache)) {
            if (this.velocity.x > 0)
                this.#collisionsCache.push('right')
            else if (this.velocity.x < 0)
                this.#collisionsCache.push('left')
            else if (this.velocity.y > 0)
                this.#collisionsCache.push('down')
            else if (this.velocity.y < 0)
                this.#collisionsCache.push('up')

            const pathways = this.#collisionsCache.filter(obstacle => {
                return !collisions.includes(obstacle)
            })

            this.controller.direction = pathways[getRandomIntIn(0, pathways.length - 1)]

            switch (this.controller.direction) {
                case 'right':
                    this.velocity.x = this.#moveRate
                    this.velocity.y = 0
                    break;
                case 'left':
                    this.velocity.x = -this.#moveRate
                    this.velocity.y = 0
                    break;
                case 'down':
                    this.velocity.x = 0
                    this.velocity.y = this.#moveRate
                    break;
                case 'up':
                    this.velocity.x = 0
                    this.velocity.y = -this.#moveRate
                    break;
            }

            this.#collisionsCache = []
        }

    }
}

function getRandomIntIn(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    const result = Math.floor(Math.random() * (max - min + 1) + min)
    return result
}
