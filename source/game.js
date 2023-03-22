import { game_map } from "./level.js";
import { Boundry } from "./boundry.js";

export const image = new Image();
image.src = '../Nursery/spritesheet.png'

const objects = []

export class Game {
    createMap() {
        game_map.forEach((row, i) => {
            row.forEach((_, j) => {
                objects.push(
                    new Boundry({
                        position: {
                            x: j,
                            y: i
                        }
                    })
                )
            })
        })
    }

    fetchObjects() {
        return objects
    }
}
