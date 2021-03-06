﻿/**
 * This file contains game's Player class that handles all of the player's actions
 * GUI screen objects.
 * Author:              Konstantin Koton
 * Filename:            Screen.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Dec. 9, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 *      v2 - Modified class to remove sprite property and make it the sprite (after modifications to the Entity base class)
 *      v3 - Added inventory management
 *      v4 - Added Score code
 */
module GameObjects {
    // Player Class
    export class Player extends GameObjects.Entity {
        // Instance variables
        spriteNames: Array<string> = [
            "steveStandRight",
            "steveStepRight",
            "steveStandRightAttack",
            "steveStepRightAttack",
            "steveStandLeft",
            "steveStepLeft",
            "steveStandLeftAttack",
            "steveStepLeftAttack"
        ];
        attackFlag: boolean;
        attackCounter: number;
        baseDamage: number = 5;
        killCount: number = 0;
        objects: Managers.Objects;
        inventory: Array<number>;
        score: number;

        // Added to remove red squiggles
        player: GameObjects.Player;
        mobs: Managers.Mobs;
        gui: Managers.GUI;

        /**
         * The constructor takes in an Object describing Steve's attributes, the information
         * about the map's foreground and the sound manager instance to be kept in internal
         * variables. Then initializes the player's object instance and all its variables.
         */
        constructor() {
            super(Managers.Assets.characters, "steveStandRight");
            this.name = "Steve";

            // Initialize essential variables
            this.facing = Constants.FACING_RIGHT;
            this.falling = true;
            this.jumping = false;

            this.health = Constants.PLAYER_MAX_HEALTH;
            this.attackCounter = 0;
            this.runDistanceIncrements = 4;
            this.useXOffsetHack = true;
            this.baseMovementSpeed = Constants.MOVE_SPEED;
            this.score = 0;

            this.inventory = [];
            for (var i = 0; i < Constants.INVENTORY_SLOTS; i++) {
                this.inventory.push(Constants.ITEM.EMPTY);
            }
        }

        /**
         * Set an internal reference to the Object Manager object (for collision with objects, such as doors)
         * @param objects The Object Manager reference to set
         */
        setObjectManager(objects: Managers.Objects): void {
            this.objects = objects;
        }

        /**
         * Move Steve right and play step sound.
         * @returns true if player can move right, false if there's an obstacle on the right.
         */
        moveRight(): boolean {
            this.sound.playerWalk();
            return super.moveRight();
        }

        /**
         * Move Steve left and play step sound.
         * @returns true if player can move left, false if there's an obstacle on the left.
         */
        moveLeft(): boolean {
            this.sound.playerWalk();
            return super.moveLeft();
        }

        /**
         * If Steve is neither jumping, nor falling (i.e. is standing on the ground),
         * then let Steve jump and store what height Steve jumped from.
         */
        jump(): void {
            if ((!this.jumping) && (!this.falling)) {
                this.jumping = true;
                this.jumpedFrom = Math.ceil((this.mapY + this.height) / 32) - 1;
            }
        }

        /**
         * Handle the player's attack event. Set the attack flag, and tell the game that
         * player sprite will need to be updated next update tick. Then check if the player
         * hit anything worth hitting.
         * @param event The event that was triggered
         */
        attack(event: Event): void {
            this.player.attackFlag = true;
            this.player.spriteUpdate = true;
            this.mobs.testMobHit(this.player.baseDamage);
        }

        /**
         * This is an event handler for the player hitting 1 - 9 on their keyboard to use an item in the inventory.
         * If the item is food (The only item in game so far), then check if the player's health is not full. If
         * the player is not at full health, then consume the food item and increase the player's health.
         * @param event The "usePlayerInventory" event that was triggered
         */
        useInventory(event: Event): void {
            var player = this.player;
            var gui = this.gui;
            var slot = event["slot"];

            if (slot <= player.inventory.length) {
                switch (player.inventory[slot]) {
                    case Constants.ITEM.FOOD:
                        if (player.getHealth() < Constants.PLAYER_MAX_HEALTH) {
                            gui.changeInventory(slot, Constants.ITEM.EMPTY);
                            player.inventory[slot] = Constants.ITEM.EMPTY;
                            player.sound.playerEat();
                            player.health++;
                        }
                        break;
                }
            }
        }

        /**
         * This function handles the player taking damage and dispatching the appropriate
         * event if player is hit, or if the player dies.
         * @returns Nothing in particular right now. Placeholder for future use.
         */
        takeDamage(hearts: number): boolean {
            this.health -= hearts;
            if (this.health <= 0) {
                var event = new createjs.Event("playerDeath", true, false);
                this.stage.dispatchEvent(event);
            } else {
                var event = new createjs.Event("playerHit", true, false);
                this.stage.dispatchEvent(event);
            }
            return true;
        }

        // Set the player's dead flag to true
        die(): void {
            this.dead = true;
        }

        // Increase kill counter
        addKill(): void {
            this.killCount++;
            this.score += Constants.SCORE_MONSTER_KILL;
        }

        /**
         * Retrieve the player's current kill count.
         * @returns The current kill count.
         */
        getKillCount(): number {
            return this.killCount;
        }

        /**
         * Retrieve the player's current score.
         * @returns The current score.
         */
        getScore(): number {
            return this.score;
        }

        /**
         * Set the player's score.
         * @param score The score to set.
         */
        setScore(score: number): void {
            this.score = score;
        }

        /**
         * Retrieve the player's inventory food count.
         * @returns The current inventory food count.
         */
        getFoodCount(): number {
            var count = 0;
            for (var i = 0; i < this.inventory.length; i++) {
                if (this.inventory[i] === Constants.ITEM.FOOD) {
                    count++;
                }
            }
            return count;
        }

        /**
         * Calculate the difference between the player's current height and where he jumped from
         * to determine whether player reached maximum jump height.
         * @returns The difference between current height and the height from which the player jumped.
         */
        findAltitude(): number {
            var mapY = Math.ceil((this.mapY + this.height) / 32) - 1;
            return (this.jumpedFrom - mapY);
        }

        /**
         * This function runs every tick to update all the player's information, such as
         * animating the player's sprite, running vertical collision detection (So player
         * doesn't fall through the floor), drops the player down if he's falling, moves the
         * player up if he's jumping, testing whether the player has fallen into lava and
         * died and lastly checking if the player reached the exit doorway.
         * @returns Currently irrelevant, but may be used in next version.
         */
        update(): boolean {
            var passable,
                result = false;

            // If Steve is currently dead, don't bother doing any updates on him
            if (this.dead) {
                return false;
            }

            // If the player is not moving left or right, reset the run distance counter,
            // and trigger sprite update (to a standing sprite)
            if (!Controls.keyboard.KEY_LEFT && !Controls.keyboard.KEY_RIGHT) {
                this.runDistance = 0;
                this.spriteUpdate = true;
            }

            // If the player is attacking, increment the attack counter. If it hits 8 (an
            // arbitrary number - 8 updates ~= 0.14 seconds), then end the attack ends and
            // The player is free to attack again. Triggers sprite update if needed.
            if (this.attackFlag) {
                if (this.attackCounter >= 8) {
                    this.spriteUpdate = true;
                    this.attackCounter = 0;
                    this.attackFlag = false;
                } else {
                    this.attackCounter++;
                }
            }

            // If the sprite update flag is set, then it's time to change the current sprite
            if (this.spriteUpdate) {
                if (this.facing === Constants.FACING_LEFT) {
                    if (Math.floor((this.runDistance % (this.runDistanceIncrements * 4)) / this.runDistanceIncrements * 2)) {
                        // If Steve is facing left and has been running long enough, then
                        // change sprite from standing version to walking version to
                        // simulate Steve taking a step.
                        // If the player is also attacking, then choose the attacking step sprite.
                        if (this.attackFlag) {
                            this.gotoAndStop("steveStepLeftAttack");
                        } else {
                            this.gotoAndStop("steveStepLeft");
                        }
                    } else {
                        // If Steve is facing left and but has not been running long enough,
                        // then change sprite from walking version to standing version to
                        // simulate Steve taking another step.
                        // If the player is also attacking, then choose the attacking sprite.
                        if (this.attackFlag) {
                            this.gotoAndStop("steveStandLeftAttack");
                        } else {
                            this.gotoAndStop("steveStandLeft");
                        }
                    }

                    // This is a hack due to my sprites not being perfect. If facing was changed
                    // as part of this update, then shift the player by his width to make it look
                    // like Steve just turned and not jumped and keep him from ending up inside
                    // of map tiles that are not supposed to be passable.
                    if (this.facingChanged) {
                        this.canvasX -= this.width;
                        this.facingChanged = false;
                    }
                } else if (this.facing === Constants.FACING_RIGHT) {
                    if (Math.floor((this.runDistance % (this.runDistanceIncrements * 4)) / (this.runDistanceIncrements * 2))) {
                        // If Steve is facing right and has been running long enough, then
                        // change sprite from standing version to walking version to
                        // simulate Steve taking a step.
                        // If the player is also attacking, then choose the attacking step sprite.
                        if (this.attackFlag) {
                            this.gotoAndStop("steveStepRightAttack");
                        } else {
                            this.gotoAndStop("steveStepRight");
                        }
                    } else {
                        // If Steve is facing right and but has not been running long enough,
                        // then change sprite from walking version to standing version to
                        // simulate Steve taking another step.
                        // If the player is also attacking, then choose the attacking sprite.
                        if (this.attackFlag) {
                            this.gotoAndStop("steveStandRightAttack");
                        } else {
                            this.gotoAndStop("steveStandRight");
                        }
                    }

                    // This is a hack due to my sprites not being perfect. If facing was changed
                    // as part of this update, then shift the player by his width to make it look
                    // like Steve just turned and not jumped and keep him from ending up inside
                    // of map tiles that are not supposed to be passable.
                    if (this.facingChanged) {
                        this.canvasX += this.width;
                        this.facingChanged = false;
                    }
                }

                // Update Steve's current position and add the new sprite to the stage
                this.x = this.canvasX;
                this.y = this.canvasY;

                // Reset the sprite update flag
                this.spriteUpdate = false;
            }

            // If Steve is jumping, test if he hits his head on something, otherwise test
            // if he can fall or if his feet are on the ground.
            if (this.jumping) {
                passable = this.testVerticalCollision("top");
                var newY = this.mapY - this.baseMovementSpeed;
            } else {
                passable = this.testVerticalCollision("bottom");
                var newY = this.mapY + this.baseMovementSpeed;
            }

            // If Steve didn't hit anything above or below him, then update Steve's position
            if (passable) {
                // If the player is jumping and reaches his maximum jump height, then flip the
                // jumping flag. Otherwise Steve must be falling, so set the falling flag.
                if (this.jumping && (this.findAltitude() >= 4)) {
                    this.jumping = false;
                } else {
                    this.falling = true;
                }

                // Change the player's position
                this.mapY = newY;
                this.canvasY = newY;
                this.y = this.canvasY;
                this.x = this.canvasX;
                result = true;
            } else {
                if (this.jumping) {
                    this.jumping = false;
                } else {
                    this.falling = false;
                }
            }

            this.x = this.canvasX;

            // Test if player falls into lava
            // xOffset is a hack due to imperfect Steve sprite.
            var xOffset = (this.facing === Constants.FACING_LEFT) ? 1 : 0;
            if (this.useXOffsetHack) {
                xOffset = 0;
            }

            // Calculate player's current position and see if Steve's feet hit lava
            var mapX;
            if (this.facing == Constants.FACING_RIGHT) {
                mapX = Math.floor((this.mapX) / 32) + xOffset;
            } else {
                mapX = Math.ceil((this.mapX) / 32) + xOffset;
            }

            var mapY = Math.floor((this.canvasY) / 32);
            var charBottomIndex = this.mapData.width * (mapY + 1) + mapX;
            var charBottomTile = this.mapData.data[charBottomIndex];

            // If Steve's feet hit lava, then hit Steve for 10 hearts (instant kill)
            if (charBottomTile === Constants.LAVA_BLOCK) {
                this.takeDamage(10);
                result = false;
            }

            // Test if Steve reached the exit door, if he did change the game's state to victory.
            if (this.objects.checkExit(mapX, mapY)) {
                var event = new createjs.Event("exitReached", true, false);
                this.stage.dispatchEvent(event);
            }

            // Test if Steve can pick something up
            var loot = this.objects.checkLoot(mapX, mapY);
            if (loot) {
                var item = loot["item"];
                for (var i = 0; i < this.inventory.length; i++) {
                    if (this.inventory[i] === Constants.ITEM.EMPTY) {
                        this.inventory[i] = item;
                        this.objects.removeChild(loot);
                        break;
                    }
                }
            }

            return result;
        }

        // Reset all of the player's essential states to initial values.
        reset(): void {
            this.facing = Constants.FACING_RIGHT;
            this.gotoAndStop("steveStandRight");
            this.health = Constants.PLAYER_MAX_HEALTH;
            this.killCount = 0;
            this.score = 0;
            this.dead = false;
            this.canvasX = parseInt(this.entityObject["x"]);
            this.canvasY = parseInt(this.entityObject["y"]) - this.height;
            this.mapX = this.canvasX;
            this.mapY = this.canvasY;
            this.x = this.canvasX;
            this.y = this.canvasY;

            // empty the inventory
            for (var i = 0; i < this.inventory.length; i++) {
                this.inventory[i] = Constants.ITEM.EMPTY;
            }
        }
    }
}