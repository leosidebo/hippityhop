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

/* var gameMap = [
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
];
var tileW = 26, tileH = 26;
var mapW = 30, mapH = 20;
var currentSecond = 0;
var mapImg = new Image;
mapImg.src = 'images/map-textures.png'; */

canvas.width = 780;
canvas.height = 520;

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

window.onload = function() {
    this.requestAnimationFrame(drawGame);
}

/**
 * Loads the image for the player and animates it.
 */
function loadImage() {
    playerImg.src = '/images/PlayerSprite2.png';
    playerImg.onload = function() {
        player.draw(cycleLoopMove[currentLoopMove], player.currentDirection);
        window.requestAnimationFrame(gameLoop);
    };
}

loadImage();

/**
 * Commented out as this is not working at the moment.
 */
/* function drawGame() {
    for (var y = 0; y < mapH; ++y) {
        for (var x = 0; x < mapW; ++x) {
            switch (gameMap[y * mapW + x]) {
                case 0:
                    ctx.drawImage(mapImg, 0, 0, 25, 25, x * tileW, y * tileH, 25, 25);
                    break;
                default:
                    ctx.drawImage(mapImg, 52, 0, 26, 26, x * tileW, y * tileH, 26, 26);
            }
        }
    }

    requestAnimationFrame(drawGame);
} */

let jumpCharge = 0;

/**
 * The main gameloop that executes every frame.
 * Animates vertical movement upon valid keypresses.
 */
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    if (!jumpInProgress) {
        player.draw(cycleLoopMove[currentLoopMove], player.currentDirection);
    }

    let hasMoved = false;

    if (player.hitBottom) {

        if (keyPresses.w) {
            player.stopMoveX();
            jumpInProgress = true;
            if (keyPresses.a && player.jumpForceLeft == 0) {
                if (player.jumpForceRight < 8) {
                   jumpCharge++;
                   if (jumpCharge > 3 || player.jumpForceRight < 3) {
                       player.jumpForceRight++;
                       jumpCharge = 0;
                   }
                }
            } else if (keyPresses.d && player.jumpForceRight == 0) {
                if (player.jumpForceLeft < 8) {
                    jumpCharge++;
                    if (jumpCharge > 3 || player.jumpForceLeft < 3) {
                        player.jumpForceLeft++;
                        jumpCharge = 0;
                    }
                }
            }

            if (player.jumpForceUp < 10) {
                jumpCharge++;
                if (jumpCharge > 3) {
                    player.jumpForceUp++;
                    jumpCharge = 0;
                }
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

            if (!keyPresses.a && !keyPresses.d) {
                player.stopMoveX();
            }
        }
    }

    // Yet to be fixed
    if (jumpInProgress) {
        frameCount++;
        if (frameCount >= frame_limit_jump && cycleLoopJump[currentLoopJump] != 1) {
            frameCount = 0;
            currentLoopJump++;
        }

        console.log(currentLoopJump);
        player.draw(cycleLoopJump[currentLoopJump], (player.currentDirection + 1));
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
