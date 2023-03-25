import { game_map } from "./level.js";
import { Tile } from "./tile.js";
import { Player } from "./characters/pacman.js"
import { Pellet } from "./pellet.js";
import { Ghost } from "./characters/ghost.js";


export const image = new Image();
image.src = '../Nursery/spritesheet_trans.png'

export class Game {
    player = undefined

    constructor({walls, pellets, characters}) {
        this.walls = walls
        this.pellets = pellets
        this.characters = characters
    }

    createMap() {
        game_map.forEach((row, i) => {
            row.forEach((num, j) => {
                switch (num) {
                    case 1:
                        this.walls.push(
                            new Tile({
                                position: {
                                    x: Tile.size * j,
                                    y: Tile.size * i
                                }
                            }))
                        break;
                    case 2:
                        this.pellets.push(
                            new Pellet({
                                position: {
                                    x: Tile.size * j,
                                    y: Tile.size * i
                                },
                                player: this.player
                            }))
                        break;
                }
            })
        })
    }

    createPacman() {
        const player = new Player({
            position: {
                x: 13.5,
                y: 23
            },
            velocity: {
                x: 0,
                y: 0
            }
        })
        this.player = player
        this.characters.push(player)
    }

    createGhosts() {
        const ghost_pink = new Ghost({
            position: {
                x: 5,
                y: 5
            },
            velocity: {
                x: 1,
                y: 0
            },
            type: 'pink'
        })
        this.characters.push(ghost_pink)


        const ghost_Blue = new Ghost({
            position: {
                x: 22,
                y: 26
            },
            velocity: {
                x: 1,
                y: 0
            },
            type: 'blue'
        })
        this.characters.push(ghost_Blue)

        const ghost_Orange = new Ghost({
            position: {
                x: 5,
                y: 26
            },
            velocity: {
                x: 1,
                y: 0
            },
            type: 'orange'
        })
        this.characters.push(ghost_Orange)

        const ghost_Red = new Ghost({
            position: {
                x: 23,
                y: 5
            },
            velocity: {
                x: 1,
                y: 0
            },
            type: 'red'
        })
        this.characters.push(ghost_Red)
    }
}
