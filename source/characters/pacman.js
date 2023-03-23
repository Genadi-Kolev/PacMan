import { c } from "../engine.js"
import { Game, image } from "../game.js"
import { Tile } from "../tile.js"

export class Player {
    static moveRate = 1

    animCycleLoop = [0, 1]
    frameRow = 0

    constructor({ position, velocity, controller }) {
        Player.moveRate *= Game.scale
        this.position = {
            x: (position.x * Tile.size + Tile.size / 2) * Game.scale,
            y: (position.y * Tile.size + Tile.size / 2) * Game.scale
        }
        this.velocity = velocity
        this.controller = controller
        this.radius = 3 * Game.scale

        this.controller.init()
        this._frameCount = 10
        this._currentLoopIndex = 0
    }

    draw() {
        const column = this.animCycleLoop[this._currentLoopIndex];
        this.#drawFrame(column, this.frameRow);
        
        this._frameCount++;
        if (this._frameCount < 6)
            return;
        this._frameCount = 0;

        this._currentLoopIndex++;
        if (this._currentLoopIndex >= this.animCycleLoop.length) {
            this._currentLoopIndex = 0;
        }
    }

    collisionCheck(boundries) {
        const rowCache = this.frameRow
        if (this.controller.direction === 'up') {
            for (let i = 0; i < boundries.length; i++) {
                const boundry = boundries[i];
                if (
                    circleCollidesWithRectangle({
                        rectangle: boundry,
                        circle: {
                            ...this, velocity: {
                                x: 0,
                                y: -Player.moveRate
                            }
                        }
                    })
                ) {
                    this.velocity.y = 0
                    this.frameRow = rowCache
                    break
                } else {
                    this.velocity.y = -Player.moveRate
                    this.frameRow = 2
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
                                x: -Player.moveRate,
                                y: 0
                            }
                        }
                    })
                ) {
                    this.velocity.x = 0
                    this.frameRow = rowCache
                    break
                } else {
                    this.velocity.x = -Player.moveRate
                    this.frameRow = 1
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
                                y: Player.moveRate
                            }
                        }
                    })
                ) {
                    this.velocity.y = 0
                    this.frameRow = rowCache
                    break
                } else {
                    this.velocity.y = Player.moveRate
                    this.frameRow = 3
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
                                x: Player.moveRate,
                                y: 0
                            }
                        }
                    })
                ) {
                    this.velocity.x = 0
                    this.frameRow = rowCache
                    break
                } else {
                    this.velocity.x = Player.moveRate
                    this.frameRow = 0
                }
            }
        }
        boundries.forEach((boundry) => {
            boundry.draw()
            if (circleCollidesWithRectangle({ rectangle: boundry, circle: this })) {
                this.velocity.x = 0
                this.velocity.y = 0
            }
        })
    }

    #drawFrame(frameX, frameY) {
        c.drawImage(image,
            456 + frameX * 16, 0 + frameY * 16, 16, 16,
            (this.position.x - Tile.size), (this.position.y - Tile.size), 16, 16);
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


function circleCollidesWithRectangle({ circle, rectangle }) {
    return (
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
    )
}