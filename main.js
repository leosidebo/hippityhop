const scale = 0.5;
const size = 128;
const scaledSize = scale * size;
const cycleLoopMove = [0, 1, 2, 3, 2, 1, 0];
const cycleLoopJump = [0, 3, 2, 1];
const movement_speed = 1.25;
const facing_right = 0;
const facing_left = 2;
const frame_limit_move = 5;
const frame_limit_jump = 7;

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 850;
canvas.height = 550;

let currentLoopIndex = 0;
let frameCount = 0;
let keyPresses = {};
let positionX = (canvas.width / 2) - scaledSize;
let positionY = 0;
let currentDirection = facing_right;
let img = new Image();
let gravity = 0.1;
let gravitySpeed = 0;
let hitBottom = false;
let jumpForceUp = 0;
let jumpForceLeft = 0;
let jumpForceRight = 0;
let jumpInProgress = false;


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

/**
 * Function that uses drawImage but simplifies input.
 * @param {*} frameX 
 * @param {*} frameY 
 * @param {*} canvasX 
 * @param {*} canvasY 
 */
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

    // Applies gravity if the player has not hit the bottom of the canvas.
    if (!hitBottom) {
        gravityMove(gravitySpeed);
    }

    else {
        if (keyPresses.a) {
            moveCharacter(-movement_speed, facing_right);
            hasMoved = true;
        } 
        
        else if (keyPresses.d) {
            moveCharacter(movement_speed, facing_left);
            hasMoved = true;
        } 
        
        if(keyPresses.w) {

            jumpInProgress = true;
            if (keyPresses.a && jumpForceLeft == 0) {
                if (jumpForceRight < 50) {
                    jumpForceRight++;
                }
            } 

            else if (keyPresses.d && jumpForceRight == 0) {
                if (jumpForceLeft < 50) {
                    jumpForceLeft++;
                }
            }
            
            if (jumpForceUp < 50) {
                jumpForceUp++;
            }
        } 

        else if (jumpInProgress) {
            jump(jumpForceUp, jumpForceLeft, jumpForceRight);
        }
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
/**
 * Makes the player fall to the ground.
 * @param {gravitySpeed} deltaY 
 */
function gravityMove(deltaY) {
    if (positionY + scaledSize + deltaY < canvas.height) {
        positionY += deltaY;
    } else {
        hitBottom = true;
    }
}

/**
 * Moves the player horizontally. Cannot go past the borders of the canvas.
 * @param {movement_speed} deltaX 
 * @param {*} direction 
 */
function moveCharacter(deltaX, direction) {
    if (
        positionX + deltaX > 0 &&
        positionX + scaledSize + deltaX < canvas.width
    ) {
        positionX += deltaX;
    }

    currentDirection = direction;
}

/**
 * Allows the player to jump.
 * @param {*} deltaY 
 * @param {*} deltaL 
 * @param {*} deltaR 
 */
function jump(deltaY, deltaL, deltaR) {
    
    let jumpAnimation = setInterval(() => {
        positionY -= deltaY;
    }, 0.25);
    hitBottom = false;
    jumpForceUp = 0;
    jumpForceLeft = 0;
    jumpForceRight = 0;
    jumpInProgress = false;
}