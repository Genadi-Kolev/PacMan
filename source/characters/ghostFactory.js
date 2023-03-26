import { Ghost } from "./ghost.js";

export function ghostFactory({type, player}) {
    const velocity = createVelocity()

    switch (type) {
        case 'blue':
            return new Ghost({
                position: {
                    x: 22,
                    y: 26
                },
                velocity: {
                    x: 1,
                    y: 0
                },
                type: 'blue',
                player: player
            })
        case 'red':
            return new Ghost({
                position: {
                    x: 23,
                    y: 5
                },
                velocity: {
                    x: -1,
                    y: 0
                },
                type: 'red',
                player: player
            })
        case 'pink':
            return new Ghost({
                position: {
                    x: 6,
                    y: 5
                },
                velocity: {
                    x: 0,
                    y: 1
                },
                type: 'pink',
                player: player
            })
        case 'orange':
            return new Ghost({
                position: {
                    x: 5,
                    y: 26
                },
                velocity: {
                    x: -1,
                    y: 0
                },
                type: 'orange',
                player: player
            })
        default:
            return null
    }
}

function createVelocity() {
    const velocity = {
        x: 0,
        y: 0
    }

    const num = getRandomIntIn(1, 4)
    switch (num) {
        case 1:
            velocity.x = 1
            break;
        case 2:
            velocity.x = -1
            break;
        case 3:
            velocity.y = 1
            break;
        case 4:
            velocity.y = -1
            break;
    }

    return velocity
}

function getRandomIntIn(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    const result = Math.floor(Math.random() * (max - min + 1) + min)
    return result
}