const scale = 0.5;
const size = 128;
const scaledSize = scale * size;
const cycleLoopMove = [0, 1, 2, 3, 2, 1, 0];
const cycleLoopIdle = [0, 1, 2, 3];
const movement_speed = 1;
const facing_right = 0;
const facing_left = 2;
const frame_limit_move = 5;

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let currentLoopIndex = 0;
let frameCount = 0;
let keyPresses = {};
let positionX = 0;
let positionY = 0;
let currentDirection = facing_right;
let img = new Image();
let gravity = 0.1;
let gravitySpeed = 0;
let hitBottom = false;

canvas.width = 850;
canvas.height = 550;



window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
    keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
    keyPresses[event.key] = false;
}

function loadImage() {
    img.src =
        'images/PlayerSprite2.png';
    img.onload = function() {
        drawFrame(
            cycleLoopMove[currentLoopIndex],
            currentDirection,
            positionX,
            positionY
        );
        window.requestAnimationFrame(gameLoop);  
    };
}

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(
        img,
        frameX * size,
        frameY * size,
        size,
        size,
        canvasX,
        canvasY,
        scaledSize,
        scaledSize
    );
}

loadImage();

/**
 * The main gameloop that executes every frame. 
 * Animates vertical movement upon valid keypresses.
 */
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let hasMoved = false;
    gravitySpeed += gravity;

    if (!hitBottom) {
        gravityMove(gravitySpeed)
    }

    else {
        if (keyPresses.a) {
            moveCharacter(-movement_speed, facing_right);
            hasMoved = true;
        } else if (keyPresses.d) {
            moveCharacter(movement_speed, facing_left);
            hasMoved = true;
        } else if(keyPresses.w) {

        }

        if(keyPresses.Spacebar){console.log("hey");}
    }

        if (hasMoved || currentLoopIndex != 0) {
            frameCount++;
            if (frameCount >= frame_limit_move) {
                frameCount = 0;
                currentLoopIndex++;
                if (currentLoopIndex >= cycleLoopMove.length) {
                    currentLoopIndex = 0;
                }
            }
        }

        drawFrame(cycleLoopMove[currentLoopIndex], currentDirection, positionX, positionY);
        window.requestAnimationFrame(gameLoop);
}

function gravityMove(deltaY) {
    if (positionY + scaledSize + deltaY < canvas.height) {
        positionY += deltaY;
    } else {
        hitBottom = true;
    }
}

function moveCharacter(deltaX, direction) {
    if (
        positionX + deltaX > 0 &&
        positionX + scaledSize + deltaX < canvas.width
    ) {
        positionX += deltaX;
    }

    currentDirection = direction;
}

function idle() {
    frameCount++;

    if (frameCount < 5) {
        window.requestAnimationFrame(idle);
        return;
    }
    frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFrame(cycleLoopIdle[currentLoopIndex], 1, 0, 0);
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoopIdle.length) {
        currentLoopIndex = 0;
    }

    window.requestAnimationFrame(idle);
}