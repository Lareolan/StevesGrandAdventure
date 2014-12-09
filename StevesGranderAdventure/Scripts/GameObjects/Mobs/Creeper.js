var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This file contains the game's Creeper mob object
* Author:              Konstantin Koton
* Filename:            Zombie.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Dec. 9, 2014
* Revision History:
*      v1 - Created initial class framework
*/
var GameObjects;
(function (GameObjects) {
    (function (Mobs) {
        // Creeper Class
        var Creeper = (function (_super) {
            __extends(Creeper, _super);
            /**
            * The constructor takes in an Object describing the Creeper's attributes, the information
            * about the map's foreground, the sound manager instance and the player instance
            * to be kept in internal variables. Then initializes the Creeper object instance
            * and all its variables.
            */
            function Creeper() {
                _super.call(this, Managers.Assets.characters, "creeper");
                // Instance variables
                this.spriteNames = [
                    "creeper"
                ];
                this.AIActions = [0.4, 0.7, 1.0, 0.5];
                this.damage = 10;
                this.attacking = false;

                this.name = "Creeper";

                this.facing = Constants.FACING_RIGHT;
                this.falling = true;
                this.jumping = false;

                this.health = 15;
                this.attackTimer = 0;
                this.runDistanceIncrements = 16;
                this.baseMovementSpeed = 1;
                this.useXOffsetHack = false;
                this.currentAIAction = Constants.AI_ACTION_IDLE;
                this.currentAITimer = new Date().getTime() + 1000;
            }
            // Carries out the Creeper's attack against the player by initiating explosion and
            // then exploding 3 seconds later.
            Creeper.prototype.attack = function () {
                var instance = this;

                this.attacking = true;
                this.sound.creeperFuse(this, this.player);
                setTimeout(function () {
                    if (instance.isDead()) {
                        return;
                    }

                    // Determine how far the player is and linearly reduce damage based on distance
                    var distanceH = Math.floor(instance.mapX - instance.player.mapX);
                    var distanceV = Math.abs(Math.floor(instance.mapY - instance.player.mapY));
                    var distance = Math.sqrt(distanceH * distanceH + distanceV * distanceV);
                    var damage = Math.ceil(instance.damage - (distance / 32));

                    // If damage is greater than 0, then the player still got hit so hurt the player
                    if (damage > 0) {
                        instance.player.takeDamage(damage);
                    }

                    // Show explosion animation
                    var explosion = new createjs.Sprite(Managers.Assets.explosion, "explode");
                    explosion.x = instance.x + instance.parent.x;
                    explosion.y = instance.y;

                    var container = instance.getStage();
                    if (container) {
                        container.addChild(explosion);

                        // Clean up the explosion after a 1 second delay
                        setTimeout(function () {
                            container.removeChild(explosion);
                        }, 1000);
                    }

                    // Play explosion sound and make the creeper die in the explosion
                    instance.sound.creeperExplode(instance, instance.player);
                    instance.die();
                }, 3000);
            };

            /**
            * A simple function returning the state of this creeper, if he's already primed and
            * exploding or not.
            * @returns True if the creeper is primed and ready to explode, otherwise false.
            */
            Creeper.prototype.isAttacking = function () {
                return this.attacking;
            };

            /**
            * This function handles all the updates for the creeper. Determining AI actions and
            * executing those actions as well as falling down if the creeper walks off a ledge.
            * Lastly, this function also executes the creeper's explosive attack against the player.
            */
            Creeper.prototype.update = function () {
                _super.prototype.update.call(this);

                // Determine if it's time to switch actions, if it is then switch actions to
                // a random action or idle action if the creeper was doing a non-idle action.
                var time = new Date().getTime();
                if (time >= this.currentAITimer) {
                    if (this.currentAIAction == Constants.AI_ACTION_IDLE) {
                        var action = Math.random();

                        if (action <= this.AIActions[Constants.AI_ACTION_MOVE_LEFT]) {
                            this.currentAIAction = Constants.AI_ACTION_MOVE_LEFT;
                        }
                        if (action <= this.AIActions[Constants.AI_ACTION_MOVE_RIGHT]) {
                            this.currentAIAction = Constants.AI_ACTION_MOVE_RIGHT;
                        }
                        if (action <= this.AIActions[Constants.AI_ACTION_IDLE]) {
                            this.currentAIAction = Constants.AI_ACTION_IDLE;
                            this.runDistance = 0;
                            this.spriteUpdate = true;
                        }
                    } else {
                        this.currentAIAction = Constants.AI_ACTION_IDLE;
                        this.runDistance = 0;
                        this.spriteUpdate = true;
                    }
                    this.currentAITimer = time + Math.floor(Math.random() * 3000) + 1000;
                }

                switch (this.currentAIAction) {
                    case Constants.AI_ACTION_MOVE_RIGHT:
                        if (!this.moveRight()) {
                            this.currentAIAction = Constants.AI_ACTION_IDLE;
                            this.currentAITimer = time + 1000;
                        }
                        break;
                    case Constants.AI_ACTION_MOVE_LEFT:
                        if (!this.moveLeft()) {
                            this.currentAIAction = Constants.AI_ACTION_IDLE;
                            this.currentAITimer = time + 1000;
                        }
                        break;
                    default:
                        break;
                }

                // If creeper is in the air, make it fall to the ground (such as walking off ledges)
                var passable;
                passable = this.testVerticalCollision("bottom");
                var newY = this.mapY + Constants.MOVE_SPEED;

                if (passable) {
                    this.falling = true;
                    this.mapY = newY;
                    this.canvasY = newY;
                    this.y = this.canvasY;
                    this.x = this.canvasX;
                } else {
                    this.falling = false;
                }

                // Execute the attack against the player if the player is close enough to be hit.
                var distanceH = Math.floor(this.mapX - this.player.mapX);
                if (Math.abs(distanceH) <= 40) {
                    var distanceV = Math.abs(Math.floor(this.mapY - this.player.mapY));
                    if (distanceV <= this.height / 2) {
                        if (Math.random() <= this.AIActions[Constants.AI_ACTION_ATTACK]) {
                            if (!this.isAttacking()) {
                                this.attack();
                            }
                        }
                    }
                }

                return true;
            };
            return Creeper;
        })(GameObjects.Monster);
        Mobs.Creeper = Creeper;
    })(GameObjects.Mobs || (GameObjects.Mobs = {}));
    var Mobs = GameObjects.Mobs;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Creeper.js.map
