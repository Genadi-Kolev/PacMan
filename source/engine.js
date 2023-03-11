let canvas;
let context;

window.onload = init;

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    document.addEventListener('keypress', (event) => {
        let name = event.key;
        let code = event.code;

        handleInput(code, name)

    }, false);

    requestAnimationFrame(gameLoop);
}

function gameLoop(_timeStamp) {
    // draw()

    requestAnimationFrame(gameLoop);
}

function draw() {
    let randomColour = Math.random() > 0.5? '#ff8080': '#0099b0';
    context.fillStyle = randomColour
    context.fillRect(100, 50, 200, 175);
}

function handleInput(code, name) {
        document.getElementById('key_code').innerHTML = code
        document.getElementById('key_name').innerText = name
}
