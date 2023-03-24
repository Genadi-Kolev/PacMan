import { Tile } from "../tile.js"
import { image } from "../game.js"
import { c } from "../engine.js"


export class Character {
    constructor({ position, velocity, controller }) {
        this.position = {
            x: position.x * Tile.size + Tile.size / 2,
            y: position.y * Tile.size + Tile.size / 2
        }
        this.velocity = velocity
        this.controller = controller

        this._frameCount = 10
        this._currentLoopIndex = 0
    }

    _drawFrame(frameX, frameY) {
        c.drawImage(image,
            456 + frameX * 16, 0 + frameY * 16, 16, 16,
            (this.position.x - Tile.size), (this.position.y - Tile.size), 16, 16);
    }
}

export function circleCollidesWithRectangle({ circle, rectangle }) {
    return (
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
    )
}
