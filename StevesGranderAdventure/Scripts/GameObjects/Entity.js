﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This file contains the game's Entity object from which the game's mobs and Player objects subclass.
* Author:              Konstantin Koton
* Filename:            Entity.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:    Too numerous to mention
*/
var GameObjects;
(function (GameObjects) {
    // Entity class
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity(spriteSheet, entity, foreground, frameNameOrNumber) {
            if (frameNameOrNumber) {
                _super.call(this, spriteSheet, frameNameOrNumber);
            } else {
                _super.call(this, spriteSheet, 0);
            }

            this.mapData = foreground;

            var spriteName;
            this.sprites = [];

            this.height = parseInt(entity["height"]);
            this.width = parseInt(entity["width"]);
            this.canvasX = parseInt(entity["x"]);
            this.canvasY = parseInt(entity["y"]) - this.height;
            this.mapX = this.canvasX;
            this.mapY = this.canvasY;

            this.spriteUpdate = false;
            this.runDistance = 0;
            this.baseMovementSpeed = 0;
        }
        /*
        * Move the entity to the right, check for collisions. Return a boolean value
        * indicating whether the movement was successful.
        * @returns true if movement was successful, false if entity hit an obstacle.
        */
        Entity.prototype.moveRight = function () {
            var result = false;
            if (this.facing !== constants.FACING_RIGHT) {
                this.facing = constants.FACING_RIGHT;
                this.spriteUpdate = true;
                this.runDistance = 0;
                this.facingChanged = true;
            }

            var newX = this.mapX + this.baseMovementSpeed;
            if (this.testHorizontal(this.baseMovementSpeed)) {
                if (this instanceof GameObjects.Player) {
                    if (this.mapX <= (stage.canvas.width / 2)) {
                        this.canvasX = this.mapX;
                        result = false;
                    } else if (this.mapX >= (this.mapData.width * 32) - (stage.canvas.width / 2)) {
                        this.canvasX = (stage.canvas.width) - ((this.mapData.width * 32) - this.mapX);
                        result = false;
                    } else {
                        this.canvasX = Math.floor((stage.canvas.width / 2) / 32) * 32;
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
        };

        /*
        * Move the entity to the left, check for collisions. Return a boolean value
        * indicating whether the movement was successful.
        * @returns true if movement was successful, false if entity hit an obstacle.
        */
        Entity.prototype.moveLeft = function () {
            var result = false;
            if (this.facing !== constants.FACING_LEFT) {
                this.facing = constants.FACING_LEFT;
                this.spriteUpdate = true;
                this.runDistance = 0;
                this.facingChanged = true;
            }

            var newX = this.mapX - this.baseMovementSpeed;
            if (this.testHorizontal(-this.baseMovementSpeed)) {
                if (this instanceof GameObjects.Player) {
                    if (this.mapX <= (stage.canvas.width / 2)) {
                        this.canvasX = this.mapX;
                        result = false;
                    } else if (this.mapX >= (this.mapData.width * 32) - (stage.canvas.width / 2)) {
                        this.canvasX = (stage.canvas.width) - ((this.mapData.width * 32) - this.mapX);
                        result = false;
                    } else {
                        this.canvasX = Math.floor((stage.canvas.width / 2) / 32) * 32;
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
        };

        /*
        * Determines if a particular tile is passable (that is non-solid).
        * Currently checks for Air, Water and Lava blocks as non-solid blocks.
        * @param tileID The tilemap tile ID to test
        * @returns true if the tile is passable, false if it is solid
        */
        Entity.prototype.isPassable = function (tileID) {
            if ((tileID === constants.AIR_BLOCK) || (tileID === constants.WATER_BLOCK) || (tileID === constants.LAVA_BLOCK)) {
                return true;
            }
            return false;
        };

        /*
        * Tests whether or not the next movement is possible.
        * @param speed The number of pixels to move (the sign indicates direction of movement)
        * @returns true if the entity can move in the desired direction, false if
        * movement would result in collision.
        */
        Entity.prototype.testHorizontal = function (speed) {
            var xOffset = (this.facing === constants.FACING_LEFT) ? 1 : 0;
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
        };

        /*
        * Tests whether or not there a vertical movement would result in a collision.
        * @param direction A string denoting direction of test.
        * @returns true if the entity can move in the desired direction, false if
        * movement would result in collision.
        */
        Entity.prototype.testVerticalCollision = function (direction) {
            var xOffset = (this.facing === constants.FACING_LEFT) ? 1 : 0;
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
        };

        // Shift the entity to the right
        Entity.prototype.shiftRight = function () {
            this.canvasX += constants.MOVE_SPEED;
        };

        // Shift the entity to the left
        Entity.prototype.shiftLeft = function () {
            this.canvasX -= constants.MOVE_SPEED;
        };

        // Get the entity's current health
        Entity.prototype.getHealth = function () {
            return this.health;
        };

        // Update the entity's current position
        Entity.prototype.update = function () {
            //            this.sprite.x = this.canvasX;
            //            this.sprite.y = this.canvasY;
            this.x = this.canvasX;
            this.y = this.canvasY;
            return false;
        };

        // Show the entity by adding it to the stage
        Entity.prototype.show = function () {
            //            if (this.sprite) {
            //                stage.addChild(this.sprite);
            //            }
            stage.addChild(this);
        };

        // Hide the entity by removing it from the stage
        Entity.prototype.hide = function () {
            //            if (this.sprite) {
            //                stage.removeChild(this.sprite);
            //            }
            stage.removeChild(this);
        };
        return Entity;
    })(createjs.Sprite);
    GameObjects.Entity = Entity;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Entity.js.map
