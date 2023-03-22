import { Game } from "./game.js"

export const canvas = document.querySelector('canvas')
export const c = canvas.getContext('2d')

const text_score = document.getElementById('score')
const text = document.getElementById('score_text')

canvas.width = innerWidth
canvas.height = innerHeight

const boundries = []
const characters = []
const pellets = []

let score = 0

class Engine {
    constructor() {
        this.game = new Game()
    }

    init() {
        this.game.createPacman(characters)
        this.game.createMap(boundries, pellets)

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

            for (let i = pellets.length - 1; i > 0; i--) {
                const pellet = pellets[i];
                pellet.draw()

                if (pellet.shouldConsume()) {
                    pellets.splice(i, 1)
                    text_score.innerHTML = score++ * 10
                }
            }
            if (pellets.length-1 == 0)
                text.innerHTML = 'You have Won!!'

            requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
    }
}

const engine = new Engine()
engine.init()

