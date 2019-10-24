const scale = 0.5;
const size = 128;
const scaledSize = scale * size;
const cycleLoopMove = [0, 1, 2, 3, 2, 1, 0];
const cycleLoopJump = [0, 3, 2, 1];
const facing_right = 0;
const facing_left = 2;
const frame_limit_move = 5;
const frame_limit_jump = 7;

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 850;
canvas.height = 550;

let currentLoopMove = 0;
let currentLoopJump = 0;
let frameCount = 0;
let keyPresses = {};
let positionX = canvas.width / 2 - scaledSize;
let positionY = 0;
let playerImg = new Image();
let gravity = 0.02;
let jumpInProgress = false;

let player = new Player(positionX, positionY);

/**
 * Marks the key pressed as true in keyPresses.
 */
window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
    keyPresses[event.key] = true;
}

/**
 * Marks the key no longer pressed as false in keyPresses.
 */
window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
    keyPresses[event.key] = false;
}

/**
 * Loads the image for the player and animates it.
 */
function loadImage() {
    playerImg.src = 'images/PlayerSprite2.png';
    playerImg.onload = function() {
        player.draw(cycleLoopMove[currentLoopMove], player.currentDirection);
        window.requestAnimationFrame(gameLoop);
    };
}

loadImage();

/**
 * The main gameloop that executes every frame.
 * Animates vertical movement upon valid keypresses.
 */
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(cycleLoopMove[currentLoopMove], player.currentDirection);

    let hasMoved = false;
    player.update();

    if (player.hitBottom) {

        if (keyPresses.w) {
            jumpInProgress = true;
            if (keyPresses.a && player.jumpForceLeft == 0) {
                if (player.jumpForceRight < 75) {
                    player.jumpForceRight++;
                }
            } else if (keyPresses.d && player.jumpForceRight == 0) {
                if (player.jumpForceLeft < 75) {
                    player.jumpForceLeft++;
                }
            }

            if (player.jumpForceUp < 75) {
                player.jumpForceUp++;
            }
        } 
        else if (jumpInProgress) {
            player.jump(player.jumpForceUp, player.jumpForceRight, player.jumpForceLeft);
        }
        else {
            if (keyPresses.a) {
                player.moveX(-player.movement_speed, facing_right);
                hasMoved = true;
            } else if (keyPresses.d) {
                player.moveX(player.movement_speed, facing_left);
                hasMoved = true;
            }
        }
    }

    // FIXA DETTA
    if (jumpInProgress) {
        frameCount++;
        if (frameCount >= frame_limit_jump) {
            frameCount = 0;
            currentLoopJump++;
            currentLoopJump %= cycleLoopJump.length;
        }

        console.log(currentLoopJump);
        player.draw(cycleLoopJump[(currentLoopJump, (player.currentDirection + 1))]);
    }

    if (hasMoved || currentLoopMove != 0) {
        frameCount++;
        if (frameCount >= frame_limit_move) {
            frameCount = 0;
            currentLoopMove++;
            currentLoopMove %= cycleLoopMove.length;
        }

        player.draw(cycleLoopMove[(currentLoopMove, player.currentDirection)]);
    }

    window.requestAnimationFrame(gameLoop);
}
