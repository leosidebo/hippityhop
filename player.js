class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.hitBottom = false;
        this.jumpForceUp = 3;
        this.jumpForceLeft = 0;
        this.jumpForceRight = 0;
        this.gravitySpeed = 0;
        this.movement_speed = 1.25;
        this.currentDirection = facing_right;
    }

    /**
     * The main gameloop for the player. Called every frame. 
     * Applies gravity, checks for bottom bounds and moves the player.
     */
    update() {
        // Accelerates the speed of gravity, up to a point.
        if (this.gravitySpeed < 0.2 && !this.hitBottom) {
            this.gravitySpeed += gravity;
        }

        if (!this.hitBottom) {
            for (let i = 0; i < collidableObjects.length; i++) { // Collidableobjects < också
                console.log(this.y + scaledSize + this.gravitySpeed);
                console.log(collidableObjects[i].y);
                console.log(collidableObjects[i].y - collidableObjects[i].height);
                if (
                    (this.y + scaledSize + this.gravitySpeed >
                        collidableObjects[i].y &&
                        this.x + this.velocityX < collidableObjects[i].x &&
                        this.y + this.gravitySpeed <
                        collidableObjects[i].y - collidableObjects[i].height)
                ) {
                    this.nullifyGravity();
                }
                
            }
        }

        // If the player hits the ground, gravity loses its effect
        if (this.y + scaledSize + this.gravitySpeed > canvas.height) {
            this.nullifyGravity();
        }
        else  {
            this.velocityY += this.gravitySpeed;
        }

        // Halts ground movement towards walls and bounces the player off walls when jumping
        if (
            this.x + this.velocityX <  wallW ||
            this.x + scaledSize + this.velocityX > canvas.width - wallW
        ) {
            this.velocityX = -this.velocityX / 2;
            this.velocityY = this.gravitySpeed;
        }

        // Does not work at the moment
        /* if (
            this.y - this.velocityY == 0 &&
            this.y + scaledSize + this.velocityY == canvas.height
        ) {
            this.velocityX = 0;
            this.velocityY = this.gravitySpeed;
        } */

        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    /**
     * Draws the player and simplifies the input.
     * @param {*} frameX 
     * @param {*} frameY 
     */
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

    /**
     * Moves the player horizontally.
     * @param {*} deltaX 
     * @param {*} direction 
     */
    moveX(deltaX, direction) {
        /*if (
            this.x + deltaX > 0 &&
            this.x + scaledSize + deltaX < canvas.width
        ) { */
        this.velocityX = deltaX;
        //}

        this.currentDirection = direction;
    }

    stopMoveX() {
        this.velocityX = 0;
    }

    /**
     * Allows the player to jump either straight up or up with a direction.
     * @param {*} forceUp 
     * @param {*} forceRight 
     * @param {*} forceLeft 
     */
    jump(forceUp, forceRight, forceLeft) {
        this.velocityY -= forceUp;
        this.velocityX = this.velocityX + forceLeft - forceRight;
        this.y += this.velocityY;
        this.hitBottom = false;
        this.jumpForceUp = 3;
        this.jumpForceLeft = 0;
        this.jumpForceRight = 0;
        jumpInProgress = false;
        currentLoopJump = 0;
    }

    nullifyGravity() {
        this.hitBottom = true;
        this.gravitySpeed = 0;
        this.velocityY = this.gravitySpeed;
    }
}
