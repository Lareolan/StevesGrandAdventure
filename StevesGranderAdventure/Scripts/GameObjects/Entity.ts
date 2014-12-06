/**
 * This file contains the game's Entity object from which the game's mobs and Player objects subclass.
 * Author:              Konstantin Koton
 * Filename:            Entity.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 *      v2 - Modified the class to extend createjs.Sprite.
 */
module GameObjects {
    // Entity class
    export class Entity extends createjs.Sprite {
        // Instance variables
        name: string;
        entityObject: Object;
//        sprites: Array<createjs.Sprite>;
//        sprite: createjs.Sprite;
        spriteID: string;
        stage: createjs.Stage;

        canvasX: number;
        canvasY: number;
        mapX: number;
        mapY: number;
        height: number;
        width: number;
        facing: number;
        facingChanged: boolean;
        spriteUpdate: boolean;
        jumping: boolean;
        jumpedFrom: number;
        falling: boolean;
        mapData: GameObjects.Layer;
        sound: Managers.Sound;
        health: number;
        baseMovementSpeed: number;
        runDistance: number;
        runDistanceIncrements: number;
        attackFlag: boolean;
        attackCounter: number;
        useXOffsetHack: boolean;
        dead: boolean;

        // The constructor initializes all of the Entity's core data
        constructor(spriteSheet: createjs.SpriteSheet, frameNameOrNumber?: string);
        constructor(spriteSheet: createjs.SpriteSheet, frameNameOrNumber?: number);
        constructor(spriteSheet: createjs.SpriteSheet, frameNameOrNumber?: any) {
            if (frameNameOrNumber) {
                super(spriteSheet, frameNameOrNumber);
            } else {
                super(spriteSheet, 0);
            }
        }

        /**
         * Sets an internal values based on entity properties retrieved from the level data file.
         * @param entity The entity Object to get the information from.
         */
        setEntity(entity: Object): void {
            this.height = parseInt(entity["height"]);
            this.width = parseInt(entity["width"]);
            this.canvasX = parseInt(entity["x"]);
            this.canvasY = parseInt(entity["y"]) - this.height;
            this.mapX = this.canvasX;
            this.mapY = this.canvasY;
            this.x = this.canvasX;
            this.y = this.canvasY;
            this.regX = 0;
            this.regY = 0;

            this.spriteUpdate = false;
            this.runDistance = 0;
            this.entityObject = entity;
        }

        /**
         * Sets an internal reference to the map's foreground Layer object (for collision detection purposes).
         * @param foreground The foreground Layer object to store the reference to.
         */
        setMapData(foreground: GameObjects.Layer): void {
            this.mapData = foreground;
        }

        /**
         * Sets an internal reference to the Sound object (so the entity can vocalize/make noise).
         * @param sound The Sound object to store the reference to.
         */
        setSound(sound: Managers.Sound): void {
            this.sound = sound;
        }

        /**
         * Sets an internal reference to the Stage object (Primarily for dispatching events onto the stage).
         * @param stage The Stage object to store the reference to.
         */
        setStage(stage: createjs.Stage): void {
            this.stage = stage;
        }

        /**
         * This function simply returns the death status of this entity.
         * @returns true is the entity is dead, otherwise false
         */
        isDead(): boolean {
            return this.dead;
        }

        /**
         * Move the entity to the right, check for collisions. Return a boolean value
         * indicating whether the movement was successful.
         * @returns true if movement was successful, false if entity hit an obstacle.
         */
        moveRight(): boolean {
            var result = false;
            if (this.facing !== Constants.FACING_RIGHT) {
                this.facing = Constants.FACING_RIGHT;
                this.spriteUpdate = true;
                this.runDistance = 0;
                this.facingChanged = true;
            }

            var newX = this.mapX + this.baseMovementSpeed;
            if (this.testHorizontal(this.baseMovementSpeed)) {
                if (this instanceof GameObjects.Player) {
                    if (this.mapX <= Constants.HALF_SCREEN_WIDTH) {
                        this.canvasX = this.mapX;
                        result = false;
                    } else if (this.mapX >= (this.mapData.width * 32) - Constants.HALF_SCREEN_WIDTH) {
                        this.canvasX = Constants.SCREEN_WIDTH - ((this.mapData.width * 32) - this.mapX);
                        result = false;
                    } else {
                        this.canvasX = Math.floor(Constants.HALF_SCREEN_WIDTH / 32) * 32;
                        result = true;
                    }
                } else {
                    this.canvasX += this.baseMovementSpeed;
                    result = true;
                }
                this.mapX = newX;

                this.runDistance++;
                if ((this.runDistance % this.runDistanceIncrements) === 0) {
                    this.spriteUpdate = true;
                }
            }
            return result;
        }

        /**
         * Move the entity to the left, check for collisions. Return a boolean value
         * indicating whether the movement was successful.
         * @returns true if movement was successful, false if entity hit an obstacle.
         */
        moveLeft(): boolean {
            var result = false;
            if (this.facing !== Constants.FACING_LEFT) {
                this.facing = Constants.FACING_LEFT;
                this.spriteUpdate = true;
                this.runDistance = 0;
                this.facingChanged = true;
            }

            var newX = this.mapX - this.baseMovementSpeed;
            if (this.testHorizontal(-this.baseMovementSpeed)) {
                if (this instanceof GameObjects.Player) {
                    if (this.mapX <= Constants.HALF_SCREEN_WIDTH) {
                        this.canvasX = this.mapX;
                        result = false;
                    } else if (this.mapX >= (this.mapData.width * 32) - Constants.HALF_SCREEN_WIDTH) {
                        this.canvasX = Constants.SCREEN_WIDTH - ((this.mapData.width * 32) - this.mapX);
                        result = false;
                    } else {
                        this.canvasX = Math.floor(Constants.HALF_SCREEN_WIDTH / 32) * 32;
                        result = true;
                    }
                } else {
                    this.canvasX -= this.baseMovementSpeed;
                    result = true;
                }
                this.mapX = newX;

                this.runDistance++;
                if ((this.runDistance % this.runDistanceIncrements) === 0) {
                    this.spriteUpdate = true;
                }
            }
            return result;
        }

        /**
         * Determines if a particular tile is passable (that is non-solid).
         * Currently checks for Air, Water and Lava blocks as non-solid blocks.
         * @param tileID The tilemap tile ID to test
         * @returns true if the tile is passable, false if it is solid
         */
        isPassable(tileID: number): boolean {
            if (
                (tileID === Constants.AIR_BLOCK) ||
                (tileID === Constants.WATER_BLOCK) ||
                (tileID === Constants.LAVA_BLOCK)
                ) {
                return true;
            }
            return false;
        }

        /**
         * Tests whether or not the next movement is possible.
         * @param speed The number of pixels to move (the sign indicates direction of movement)
         * @returns true if the entity can move in the desired direction, false if
         * movement would result in collision.
         */
        testHorizontal(speed: number): boolean {
            var xOffset = (this.facing === Constants.FACING_LEFT) ? 1 : 0;
            if (!this.useXOffsetHack) {
                xOffset = 0;
            }

            var mapX;
            if (speed >= 0) {
                mapX = Math.ceil((this.mapX + speed) / 32) + xOffset;
            } else {
                mapX = Math.floor((this.mapX + speed) / 32) + xOffset;
            }

            var mapY = Math.floor((this.mapY) / 32);

            var topIndex = this.mapData.width * mapY + mapX;
            var bottomIndex = this.mapData.width * (mapY + 1) + mapX;

            var topTile = this.mapData.data[topIndex];
            var bottomTile = this.mapData.data[bottomIndex];

            if (this.isPassable(topTile) && this.isPassable(bottomTile)) {
                return true;
            }

            return false;
        }

        /**
         * Tests whether or not there a vertical movement would result in a collision.
         * @param direction A string denoting direction of test.
         * @returns true if the entity can move in the desired direction, false if
         * movement would result in collision.
         */
        testVerticalCollision(direction: string): boolean {
            var xOffset = (this.facing === Constants.FACING_LEFT) ? 1 : 0;
            if (!this.useXOffsetHack) {
                xOffset = 0;
            }

            var mapBackX = Math.floor((this.mapX) / 32) + xOffset;
            var mapFrontX = Math.ceil((this.mapX) / 32) + xOffset;
            var mapY = Math.floor((this.mapY) / 32);

            var topBackIndex = this.mapData.width * (mapY - 1) + mapBackX;
            var bottomBackIndex = this.mapData.width * (mapY + 2) + mapBackX;
            var topFrontIndex = this.mapData.width * (mapY - 1) + mapFrontX;
            var bottomFrontIndex = this.mapData.width * (mapY + 2) + mapFrontX;

            var topBackTile = this.mapData.data[topBackIndex];
            var bottomBackTile = this.mapData.data[bottomBackIndex];
            var topFrontTile = this.mapData.data[topFrontIndex];
            var bottomFrontTile = this.mapData.data[bottomFrontIndex];

            if (direction.toLowerCase() === "top") {
                if (this.isPassable(topBackTile) && this.isPassable(topFrontTile)) {
                    return true;
                }
            } else if (direction.toLowerCase() === "bottom") {
                if (this.isPassable(bottomBackTile) && this.isPassable(bottomFrontTile)) {
                    return true;
                }
            }

            return false;
        }

        // Shift the entity to the right
        shiftRight(): void {
            this.canvasX += Constants.MOVE_SPEED;
        }

        // Shift the entity to the left
        shiftLeft(): void {
            this.canvasX -= Constants.MOVE_SPEED;
        }

        // Get the entity's current health
        getHealth(): number {
            return this.health;
        }

        // Update the entity's current position
        update(): boolean {
//            this.sprite.x = this.canvasX;
//            this.sprite.y = this.canvasY;
            this.x = this.canvasX;
            this.y = this.canvasY;
            return false;
        }

        // Show the entity by adding it to the stage
        show(): void {
//            if (this.sprite) {
//                stage.addChild(this.sprite);
//            }
//            stage.addChild(this);
        }

        // Hide the entity by removing it from the stage
        hide(): void {
//            if (this.sprite) {
//                stage.removeChild(this.sprite);
//            }
//            stage.removeChild(this);
        }
    }
} 