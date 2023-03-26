import { Bot } from "../controllers/bot.js"
import { stopLoop } from "../engine.js"
import { Character, circleCollidesWithRectangle } from "./character.js"

export class Ghost extends Character {
    #moveRate = 1

    #animCycleLoop = [0, 1]
    #frameRow = 0

    #scared = false
    dead = false
    setScared() {
        this.#scared = true
        setTimeout(() => { this.#scared = false }, 6000)
    }

    constructor({ position, velocity, type, player }) {
        super({
            position: position,
            velocity: velocity,
            controller: new Bot()
        })

        this.player = player
        this.radius = 3

        switch (type) {
            case 'red':
                this.#frameRow = 4
                break
            case 'pink':
                this.#frameRow = 5
                break
            case 'blue':
                this.#frameRow = 6
                break
            case 'orange':
                this.#frameRow = 7
                break
            default:
                this.#frameRow = 4
                break;
        }
    }

    draw() {
        const column = this.#animCycleLoop[this._currentLoopIndex];
        const increment = this.controller._animFrameIncr()
        if (this.#scared)
            this._drawFrame(column + 8, 4)
        else
            this._drawFrame(column + increment, this.#frameRow);

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
        this._move()

        if (this.#isTouchingPlayer()) {
            if (!this.#scared)
                stopLoop()
            else {
                this.dead = true
            }
        }
    }

    #isTouchingPlayer() {
        const a = (this.position.x - this.player.position.x) ** 2
        const b = (this.position.y - this.player.position.y) ** 2

        return Math.sqrt(a + b) <= (this.radius + this.player.radius) * 1.4
    }


    collisionCheck(boundries) {
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
                })
            ) {
                this.controller._addCollision('right')
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
                })
            ) {
                this.controller._addCollision('left')
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
                })
            ) {
                this.controller._addCollision('down')
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
                })
            ) {
                this.controller._addCollision('up')
            }
        })

        this.controller._pickDirection(this.velocity, this.#moveRate)
    }
}
