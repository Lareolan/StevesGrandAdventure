var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This file contains the game's Zombie mob object
* Author:              Konstantin Koton
* Filename:            Zombie.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Dec. 9, 2014
* Revision History:
*      v1 - Migrated file to Project 1
*      v2 - Modified class to remove sprite property and make it the sprite (after modifications to the Entity base class)
*/
var GameObjects;
(function (GameObjects) {
    (function (Mobs) {
        // Zombie Class
        var Zombie = (function (_super) {
            __extends(Zombie, _super);
            /**
            * The constructor takes in an Object describing the Zombie's attributes, the information
            * about the map's foreground, the sound manager instance and the player instance
            * to be kept in internal variables. Then initializes the Zombie object instance
            * and all its variables.
            */
            function Zombie() {
                _super.call(this, Managers.Assets.characters, "zombieStandRight");
                // Instance variables
                this.spriteNames = [
                    "zombieStandRight",
                    "zombieStepRight",
                    "zombieStandLeft",
                    "zombieStepLeft"
                ];
                this.AIActions = [0.4, 0.7, 1.0, 0.5];
                this.damage = 2;

                this.name = "Zombie";

                this.facing = Constants.FACING_RIGHT;
                this.falling = true;
                this.jumping = false;

                this.health = 20;
                this.attackTimer = 0;
                this.runDistanceIncrements = 16;
                this.baseMovementSpeed = 1;
                this.useXOffsetHack = false;
                this.currentAIAction = Constants.AI_ACTION_IDLE;
                this.currentAITimer = new Date().getTime() + 1000;
            }
            // Carries out an attack against the player and ensures the Zombie can't attack
            // again for at least 1 second while it contemplates its sad existence.
            Zombie.prototype.attack = function () {
                this.player.takeDamage(this.damage);
                this.attackTimer = new Date().getTime() + 1000;
                this.sound.playerHit();
            };

            /**
            * This function makes zombies "speak" at random with a rough median of
            * approximately every 4 seconds
            */
            Zombie.prototype.speak = function () {
                if (Math.floor(Math.random() * 240) == 0) {
                    this.sound.zombieSpeak(this, this.player);
                }
            };

            /**
            * This function handles all the updates for the zombie. Animating its movements,
            * determining AI actions and executing those actions as well as falling down
            * if the zombie walks off a ledge. This function also executes the zombie's "speech".
            * Lastly, this function also executes attacks against the player.
            */
            Zombie.prototype.update = function () {
                _super.prototype.update.call(this);

                this.speak();

                // Animate zombie facing/walking sprites
                if (this.spriteUpdate) {
                    if (this.facing === Constants.FACING_LEFT) {
                        if (Math.floor((this.runDistance % (this.runDistanceIncrements * 4)) / this.runDistanceIncrements * 2)) {
                            this.gotoAndStop("zombieStepLeft");
                        } else {
                            this.gotoAndStop("zombieStandLeft");
                        }
                    } else if (this.facing === Constants.FACING_RIGHT) {
                        if (Math.floor((this.runDistance % (this.runDistanceIncrements * 4)) / (this.runDistanceIncrements * 2))) {
                            this.gotoAndStop("zombieStepRight");
                        } else {
                            this.gotoAndStop("zombieStandRight");
                        }
                    }
                    this.x = this.canvasX;
                    this.y = this.canvasY;

                    this.spriteUpdate = false;
                }

                // Determine if it's time to switch actions, if it is then switch actions to
                // a random action or idle action if the zombie was doing a non-idle action.
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

                // If zombie is in the air, make it fall to the ground (such as walking off ledges)
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

                // Execute an attack against the player if the player is close enough to be hit, and
                // zombie is facing the right direction, and hasn't hit the player for long enough
                // and hits a random number equal to chance to hit (50%).
                if (time >= this.attackTimer) {
                    var distanceH = Math.floor(this.mapX - this.player.mapX);
                    if (Math.abs(distanceH) <= 40) {
                        if (((this.facing == Constants.FACING_RIGHT) && (distanceH < 0)) || ((this.facing == Constants.FACING_LEFT) && (distanceH >= 0))) {
                            var distanceV = Math.abs(Math.floor(this.mapY - this.player.mapY));
                            if (distanceV <= this.height / 2) {
                                if (Math.random() <= this.AIActions[Constants.AI_ACTION_ATTACK]) {
                                    this.attack();
                                }
                            }
                        }
                    }
                }

                return true;
            };
            return Zombie;
        })(GameObjects.Monster);
        Mobs.Zombie = Zombie;
    })(GameObjects.Mobs || (GameObjects.Mobs = {}));
    var Mobs = GameObjects.Mobs;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Zombie.js.map
