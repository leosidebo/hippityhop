class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.hitBottom = false;
        this.jumpForceUp = 0;
        this.gravitySpeed = 0;
        this.movement_speed = 1.25;
        this.currentDirection = facing_right;
    }

    update() {
        if (this.gravitySpeed < 0.2 && !this.hitBottom) {
            this.gravitySpeed += gravity;
        }

        if (this.y + scaledSize + this.gravitySpeed > canvas.height) {
            this.hitBottom = true;
            this.gravitySpeed = 0;
            this.velocityY = this.gravitySpeed;
        }

        else  {
            this.velocityY += this.gravitySpeed;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    draw(frameX, frameY) {
        ctx.drawImage(
            playerImg,
            frameX * size,
            frameY * size,
            size,
            size,
            this.x,
            this.y,
            scaledSize,
            scaledSize
        );
    }

    moveX(deltaX, direction) {
        if (
            this.x + deltaX > 0 &&
            this.x + scaledSize + deltaX < canvas.width
        ) {
            this.x += deltaX;
        }

        this.currentDirection = direction;
    }

    jump(forceUp) {
        console.log(forceUp);
        this.velocityY -= forceUp;
        this.y += this.velocityY;
        this.hitBottom = false;
        this.jumpForceUp = 0;
        jumpInProgress = false;
    }
}
