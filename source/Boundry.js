import { c } from "./engine.js"

export class Boundry {

    static width = 20
    static height = 20

    constructor({ position }) {
        this.position = position
        this.width = Boundry.width
        this.height = Boundry.height
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
    }
}