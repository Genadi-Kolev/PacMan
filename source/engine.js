import { Game } from "./game.js"
import { Tile } from "./tile.js"

export const canvas = document.querySelector('canvas')
export const c = canvas.getContext('2d')

const text_score = document.getElementById('score')
const text = document.getElementById('score_text')

canvas.width = 28 * Tile.size
canvas.height = 31 * Tile.size

const walls = []
const characters = []
const pellets = []

let score = 0
let requestId = undefined

export function stopLoop() {
    requestId = undefined
    text.innerHTML = 'You have lost :('
}

class Engine {
    constructor() {
        this.game = new Game({
            walls: walls,
            characters: characters,
            pellets: pellets,
        })
    }

    init() {
        this.game.createPacman()
        this.game.createGhosts()
        this.game.createMap()

        this.startGameLoop()
    }

    startGameLoop() {
        function tick() {
            c.clearRect(0, 0, canvas.width, canvas.height)

            //  Update walls
            walls.forEach((wall) => {
                wall.draw()
            })

            //  Update pellets
            for (let i = pellets.length - 1; i >= 0; i--) {
                const pellet = pellets[i];
                pellet.draw()

                if (pellet.shouldConsume(characters)) {
                    pellets.splice(i, 1)
                    text_score.innerHTML = score++ * 10
                }
            }
            if (pellets.length - 1 == 0) {
                text.innerHTML = 'You have Won!!'
                requestId = undefined
            }

            //  Update characters
            for (let i = characters.length - 1; i >= 0; i--) {
                const character = characters[i]
                character.collisionCheck(walls)
                character.update()

                if (character.hasOwnProperty('dead') && character.dead) {
                    characters.splice(i, 1)
                }
            }

            if (requestId)
                requestId = requestAnimationFrame(tick)
        }
        requestId = requestAnimationFrame(tick)
    }
}

const engine = new Engine()
engine.init()

addEventListener('keypress', ({ key }) => {
    if (key != '`')
        return

    if (!requestId) {
        engine.startGameLoop()
    } else {
        cancelAnimationFrame(requestId)
        requestId = undefined
    }
})

