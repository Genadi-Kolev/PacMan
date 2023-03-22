import { game_map } from "./level.js";
import { Boundry } from "./Boundry.js";

const objects = []

export class Game {
    createMap() {
        game_map.forEach((row, i) => {
            row.forEach((num, j) => {
                switch (num) {
                    case 1:
                        objects.push(
                            new Boundry({
                                position: {
                                    x: Boundry.width * j,
                                    y: Boundry.height * i
                                }
                            })
                        )
                        break;
                }
            })
        })
    }

    fetchObjects() {
        return objects
    }
}
