import { c } from "./engine.js"
import { image } from "./game.js"

export class Boundry {

    static size = 8

    constructor({ position }) {
        this.position = position
    }

    draw() {
        const scale = 1
        const size = Boundry.size

        const frameX = this.position.x * size
        const frameY = this.position.y * size

        const scaled_x = scale * this.position.x
        const scaled_y = scale * this.position.y
        const scaled_size = scale * size

        c.drawImage(image,
            frameX, frameY, size, size,
            scaled_x * size , scaled_y * size, scaled_size, scaled_size);
    }

    update() {
        this.draw()
    }
}