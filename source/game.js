import { game_map } from "./level.js";
import { Tile } from "./tile.js";
import { Player } from "./characters/pacman.js"
import { Pellet } from "./pellet.js";
import { ghostFactory } from "./characters/ghostFactory.js";


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
        const ghost_pink = ghostFactory({
            type: 'pink', player: this.player
        })
        this.characters.push(ghost_pink)

        const ghost_blue = ghostFactory({
            type: 'blue', player: this.player
        })
        this.characters.push(ghost_blue)

        const ghost_orange = ghostFactory({
            type: 'orange', player: this.player
        })
        this.characters.push(ghost_orange)

        const ghost_Red = ghostFactory({
            type: 'red', player: this.player
        })
        this.characters.push(ghost_Red)
    }
}
