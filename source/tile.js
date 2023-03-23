import { c } from "./engine.js"
import { image } from "./game.js"

export class Tile {
    static size = 8

    constructor({ position }) {
        this.position = position
        this.width = Tile.size
        this.height = Tile.size
    }

    draw() {
        const scale = 1
        const size = Tile.size * scale

        const frameX = this.position.x
        const frameY = this.position.y

        const scaled_x = scale * this.position.x
        const scaled_y = scale * this.position.y
        const scaled_size = scale * size

        c.drawImage(image,
            frameX, frameY, size, size,
            scaled_x, scaled_y, scaled_size, scaled_size);
    }
}