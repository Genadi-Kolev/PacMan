import { Bot } from "../controllers/bot.js"
import { Tile } from "../tile.js"
import { Character, circleCollidesWithRectangle } from "./character.js"

export class Ghost extends Character {
    moveRate = 1

    animCycleLoop = [0,1]
    frameRow = 0

    constructor({ position, velocity }, type = 'red') {
        super({
            position: position,
            velocity: velocity,
            controller: new Bot()
        })
        
        this.type = type
        this.radius = 3

        this.controller.init()
    }

    draw() {
        const column = this.animCycleLoop[this._currentLoopIndex];
        this._drawFrame(column, 4);

        this._frameCount++;
        if (this._frameCount < 9)
            return;
        this._frameCount = 0;

        this._currentLoopIndex++;
        if (this._currentLoopIndex >= this.animCycleLoop.length) {
            this._currentLoopIndex = 0;
        }
    }

    collisionCheck(boundries) {
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
                    break
                } else {
                    this.velocity.y = -this.moveRate
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
                    break
                } else {
                    this.velocity.x = -this.moveRate
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
                    break
                } else {
                    this.velocity.y = this.moveRate
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
                    break
                } else {
                    this.velocity.x = this.moveRate
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

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.x < 0)
            this.position.x = 28 * Tile.size
        else if (this.position.x > 28 * Tile.size)
            this.position.x = 0
    }
}
