import { Game } from "./game.js"

export const canvas = document.querySelector('canvas')
export const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

let game_objects = []

class Engine {
    init() {
        const game = new Game()
        game.createMap()

        const objects = game.fetchObjects()
        game_objects = game_objects.concat(objects);

        this.#gameLoop()
    }

    #gameLoop() {
        function tick() {
            c.clearRect(0, 0, canvas.width, canvas.height)
    
            game_objects.forEach((object) => {
                object.update()
            })

            requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
    }
}

const engine = new Engine()
window.onload = function() { engine.init() }