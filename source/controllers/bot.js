export class Bot {

    constructor() {
        this.direction = ''
    }

    pickDirection() {
    }

}

function getRandomIntIn(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    const result = Math.floor(Math.random() * (max - min + 1) + min)
    return result
}