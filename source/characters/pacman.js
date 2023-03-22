import { c } from "../engine.js"
import { Game } from "../game.js"
import { Tile } from "../tile.js"

export class Player {
    static moveRate = 1

    constructor({ position, velocity, controller }) {
        Player.moveRate *= Game.scale
        this.position = {
            x: (position.x * Tile.size + Tile.size / 2) * Game.scale,
            y: (position.y * Tile.size + Tile.size / 2) * Game.scale
        }
        this.velocity = velocity
        this.controller = controller
        this.radius = 3.5 * Game.scale

        this.controller.init()
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath
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
                                y: -Player.moveRate
                            }
                        }
                    })
                ) {
                    this.velocity.y = 0
                    break
                } else
                    this.velocity.y = -Player.moveRate
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
                    break
                } else
                    this.velocity.x = -Player.moveRate
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
                    break
                } else
                    this.velocity.y = Player.moveRate
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
                    break
                } else
                    this.velocity.x = Player.moveRate
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

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
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