import { Input } from "../controllers/input.js"
import { Character, circleCollidesWithRectangle } from "./character.js"

export class Player extends Character {
    #animCycleLoop = [0, 1]
    #frameRow = 0

    constructor({ position, velocity }) {
        super({
            position: position,
            velocity: velocity,
            controller: new Input()
        })
        
        this.moveRate = 1
        this.radius = 3

        this.controller._init()
    }

    draw() {
        const column = this.#animCycleLoop[this._currentLoopIndex];
        this._drawFrame(column, this.#frameRow);

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
    }

    collisionCheck(boundries) {
        const rowCache = this.#frameRow
        if (this.controller.direction === 'up') {
            for (let i = 0; i < boundries.length; i++) {
                const boundry = boundries[i];
                if (
                    circleCollidesWithRectangle({
                        rectangle: boundry,
                        circle: {
                            ...this, velocity: {
                                x: 0,
                                y: -this.moveRate
                            }
                        }
                    })
                ) {
                    this.velocity.y = 0
                    this.#frameRow = rowCache
                    break
                } else {
                    this.velocity.y = -this.moveRate
                    this.#frameRow = 2
                }
            }
        }
        else if (this.controller.direction === 'left') {
            for (let i = 0; i < boundries.length; i++) {
                const boundry = boundries[i];
                if (
                    circleCollidesWithRectangle({
                        rectangle: boundry,
                        circle: {
                            ...this, velocity: {
                                x: -this.moveRate,
                                y: 0
                            }
                        }
                    })
                ) {
                    this.velocity.x = 0
                    this.#frameRow = rowCache
                    break
                } else {
                    this.velocity.x = -this.moveRate
                    this.#frameRow = 1
                }
            }
        }
        else if (this.controller.direction === 'down') {
            for (let i = 0; i < boundries.length; i++) {
                const boundry = boundries[i];
                if (
                    circleCollidesWithRectangle({
                        rectangle: boundry,
                        circle: {
                            ...this, velocity: {
                                x: 0,
                                y: this.moveRate
                            }
                        }
                    })
                ) {
                    this.velocity.y = 0
                    this.#frameRow = rowCache
                    break
                } else {
                    this.velocity.y = this.moveRate
                    this.#frameRow = 3
                }
            }
        }
        else if (this.controller.direction === 'right') {
            for (let i = 0; i < boundries.length; i++) {
                const boundry = boundries[i];
                if (
                    circleCollidesWithRectangle({
                        rectangle: boundry,
                        circle: {
                            ...this, velocity: {
                                x: this.moveRate,
                                y: 0
                            }
                        }
                    })
                ) {
                    this.velocity.x = 0
                    this.#frameRow = rowCache
                    break
                } else {
                    this.velocity.x = this.moveRate
                    this.#frameRow = 0
                }
            }
        }
        boundries.forEach((boundry) => {
            if (circleCollidesWithRectangle({ rectangle: boundry, circle: this })) {
                this.velocity.x = 0
                this.velocity.y = 0
            }
        })
    }
}
