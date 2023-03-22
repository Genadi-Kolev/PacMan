import { game_map } from "./level.js";
import { Tile } from "./tile.js";
import { Player } from "./characters/pacman.js"
import { Input } from "./input.js"
import { Pellet } from "./pellet.js";


export const image = new Image();
image.src = '../Nursery/spritesheet.png'

export class Game {
    static scale = 1
    player = undefined

    createMap(boundries, pellets) {
        game_map.forEach((row, i) => {
            row.forEach((num, j) => {
                switch (num) {
                    case 1:
                        boundries.push(
                            new Tile({
                                position: {
                                    x: Tile.size * j * Game.scale,
                                    y: Tile.size * i * Game.scale
                                }
                            }))
                        break;
                    case 2:
                        pellets.push(
                            new Pellet({
                                position: {
                                    x: (Tile.size * j) * Game.scale,
                                    y: (Tile.size * i) * Game.scale
                                },
                                player: this.player
                            }))
                        break;
                }
            })
        })
    }

    createPacman(charactersArr) {
        const player = new Player({
            position: {
                x: 13.5,
                y: 23
            },
            velocity: {
                x: 0,
                y: 0
            },
            controller: new Input()
        })
        this.player = player
        charactersArr.push(player)
    }
}
