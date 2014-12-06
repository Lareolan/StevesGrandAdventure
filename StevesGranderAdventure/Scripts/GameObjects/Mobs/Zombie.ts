/**
 * This file contains the game's Zombie mob object
 * Author:              Konstantin Koton
 * Filename:            Zombie.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 *      v2 - Modified class to remove sprite property and make it the sprite (after modifications to the Entity base class)
 */
module GameObjects {
    export module Mobs {
        // Zombie Class
        export class Zombie extends GameObjects.Monster {
            // Instance variables
            spriteNames: Array<string> = [
                "zombieStandRight",
                "zombieStepRight",
                "zombieStandLeft",
                "zombieStepLeft"
            ];
            attackTimer: number;
            sound: Managers.Sound;
            currentAIAction: number;
            currentAITimer: number;
            AIActions: Array<number> = [0.4, 0.7, 1.0, 0.5];
            damage: number = 2;

            /**
             * The constructor takes in an Object describing the Zombie's attributes, the information
             * about the map's foreground, the sound manager instance and the player instance 
             * to be kept in internal variables. Then initializes the Zombie object instance
             * and all its variables.
             */
//            constructor(zombie: Object, foreground: GameObjects.Layer, sound: Managers.Sound, player: GameObjects.Player) {
            constructor() {
                super(Managers.Assets.characters, "zombieStandRight");

                this.name = "Zombie";
//                this.sound = sound;
//                this.setEntity(zombie);
//                this.setMapData(foreground);
//                this.setPlayer(player);


                /*
                var spriteName: string;
                for (var frameID = 0; frameID < this.spriteNames.length; frameID++) {
                    spriteName = this.spriteNames[frameID];
                    this.sprites[spriteName] = new createjs.Sprite(Managers.Assets.characters, spriteName);
                }
                this.sprites.length = this.spriteNames.length;
*/

                this.facing = Constants.FACING_RIGHT;
                this.falling = true;
                this.jumping = false;

                //                this.sprite = this.sprites[this.spriteNames[0]].clone();
                //                this.sprite.x = this.canvasX;
                //                this.sprite.y = this.canvasY;
                //                this.sprite.regX = 0;
                //                this.sprite.regY = 0;

//                this.x = this.canvasX;
//                this.y = this.canvasY;
//                this.regX = 0;
//                this.regY = 0;

                //                stage.addChild(this.sprite);
//                stage.addChild(this);

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
            attack(): void {
                this.player.takeDamage(this.damage);
                this.attackTimer = new Date().getTime() + 1000;
                this.sound.playerHit();
            }

            /**
             * This function makes zombies "speak" at random with a rough median of
             * approximately every 4 seconds
             */
            speak(): void {
                if (Math.floor(Math.random() * 240) == 0) {
                    this.sound.zombieSpeak(this, this.player);
                }
            }

            /**
             * This function handles all the updates for the zombie. Animating its movements,
             * determining AI actions and executing those actions as well as falling down
             * if the zombie walks off a ledge. This function also executes the zombie's "speech".
             * Lastly, this function also executes attacks against the player.
             */
            update(): boolean {
                super.update();

                this.speak();

                // Animate zombie facing/walking sprites
                if (this.spriteUpdate) {
                    //                    stage.removeChild(this.sprite);
//                    stage.removeChild(this);

                    if (this.facing === Constants.FACING_LEFT) {
                        if (Math.floor((this.runDistance % (this.runDistanceIncrements * 4)) / this.runDistanceIncrements * 2)) {
                            //                            this.sprite = this.sprites["zombieStepLeft"].clone();
                            this.gotoAndStop("zombieStepLeft");
                        } else {
                            //                            this.sprite = this.sprites["zombieStandLeft"].clone();
                            this.gotoAndStop("zombieStandLeft");
                        }
                    } else if (this.facing === Constants.FACING_RIGHT) {
                        if (Math.floor((this.runDistance % (this.runDistanceIncrements * 4)) / (this.runDistanceIncrements * 2))) {
                            //                            this.sprite = this.sprites["zombieStepRight"].clone();
                            this.gotoAndStop("zombieStepRight");
                        } else {
                            //                            this.sprite = this.sprites["zombieStandRight"].clone();
                            this.gotoAndStop("zombieStandRight");
                        }
                    }

//                    this.sprite.x = this.canvasX;
//                    this.sprite.y = this.canvasY;
//                    stage.addChild(this.sprite);
                    this.x = this.canvasX;
                    this.y = this.canvasY;
//                    stage.addChild(this);

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

                // Execute currently chosen action
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
                    //                    this.sprite.y = this.canvasY;
                    //                    this.sprite.x = this.canvasX;
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
            }
        }
    }
}