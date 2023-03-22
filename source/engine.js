import { Game } from "./game.js"

export const canvas = document.querySelector('canvas')
export const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const boundries = []
const characters = []

class Engine {
    constructor() {
        this.game = new Game()
    }
    
    init() {
        this.game.createMap(boundries)
        this.game.createPacman(characters)

        this.startGameLoop()
    }

    startGameLoop() {
        function tick() {
            c.clearRect(0, 0, canvas.width, canvas.height)

            boundries.forEach((boundry) => {
                boundry.draw()
            })

            characters.forEach(character => {
                character.collisionCheck(boundries)
                character.update()
            })
            requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
    }
}

const engine = new Engine()
engine.init()

