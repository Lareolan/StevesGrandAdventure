/**
 * This file contains the game's cloud object
 * Author:              Konstantin Koton
 * Filename:            Cloud.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 */
module GameObjects {
    // Cloud Class
    export class Cloud extends GameObjects.BitmapObject {
        width: number;
        height: number;
        dx: number;
        name: string = "Cloud";

        // Create a cloud object
        constructor(cloudName: string, index: number = null) {
            super(cloudName, null, index);
            createjs.EventDispatcher.initialize(this);
        }

        // Updates the cloud's current position, if cloud moves off screen then create and dispatch an
        // appropriate event.
        update(): void {
            this.x += this.dx;
            if ((this.x + this.parent.x) > (this.width + Constants.SCREEN_WIDTH)) {
                var event = new createjs.Event("cloudOffScreen", true, false);
                this.dispatchEvent(event);
            }
        }

        /*
         * Set the cloud's position to the coordinates passed by parameters. 
         * @param x The new x coordinate for the cloud
         * @param y The new y coordinate for the cloud
         */
        setPosition(x: number, y: number): void {
            this.x = x;
            this.y = y;
        }

        // Sets the cloud's movement speed
        setSpeed(speed: number): void {
            this.dx = speed;
        }

        // Move the cloud image to the right to reflect player moving left
        moveLeft(): void {
            this.x += constants.MOVE_SPEED;
        }

        // Move the cloud image to the left to reflect player moving right
        moveRight(): void {
            this.x -= constants.MOVE_SPEED;
        }
    }
}