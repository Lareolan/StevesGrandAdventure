/**
 * This file contains game's Monster class that serves as the base for all game monsters.
 * GUI screen objects.
 * Author:              Konstantin Koton
 * Filename:            Monster.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 *      v2 - Modified class to remove sprite property and make it the sprite (after modifications to the Entity base class)
 */
module GameObjects {
    // The Monster class
    export class Monster extends GameObjects.Entity {
        // Instance variable holding local references to the Player object and Sound Manager object.
        player: GameObjects.Player;
        sound: Managers.Sound;

        // The constructor sets the local reference to the player object, and lets the superclass
        // constructor do the rest.
        constructor(spriteSheet: createjs.SpriteSheet, frameNameOrNumber?: string);
        constructor(spriteSheet: createjs.SpriteSheet, frameNameOrNumber?: number);
        constructor(spriteSheet: createjs.SpriteSheet, frameNameOrNumber: any) {
            super(spriteSheet, frameNameOrNumber);
        }

        /*
         * Sets an internal reference to the Player object (for combat purposes).
         * @param player The Player object to store the reference to.
         */
        setPlayer(player: GameObjects.Player): void {
            this.player = player;
        }

        /*
         * Causes damage to the monster according to the passed parameter and returns whether the
         * monster died from the attack or not. If it didn't die, make it groan in pain.
         * @param hearts the amount of damage inflicted on the monster
         * @returns true if the monster is still alive, false if it died
         */
        takeDamage(hearts: number): boolean {
            this.health -= hearts;
            if (this.health <= 0) {
                return false;
            } else {
                if (this instanceof GameObjects.Mobs.Zombie) {
                    this.sound.zombieHurt(<GameObjects.Mobs.Zombie>this, this.player);
                } else if (this instanceof GameObjects.Mobs.Creeper) {
                    this.sound.creeperHurt(<GameObjects.Mobs.Creeper>this, this.player);
                }
            }
            return true;
        }

        // Make the monster die, play the appropriate death sound. Increase Steve's kill count.
        die(): void {
            this.dead = true;
            if (this instanceof GameObjects.Mobs.Zombie) {
                this.dropLoot();
                this.sound.zombieDeath(<GameObjects.Mobs.Zombie>this, this.player);
                this.parent.removeChild(this);
            } else if (this instanceof GameObjects.Mobs.Creeper) {
                this.dropLoot();
                this.parent.removeChild(this);
            }
            this.player.addKill();
        }

        /**
         * Monster has a random chance to drop some health when it dies. This function makes it drop.
         */
        dropLoot(): void {
            if (Math.floor(Math.random() * 4) === 0) {
                this.player.objects.spawnLoot(this.x, this.y + 32);
            }
        }

        /*
         * Test whether or not Steve hit his mark with this monster.
         * @param damage The amount of damage the player could inflict on the monster
         * @returns true if the monster is still alive, false if it died
         */
        hitTest(damage: number): boolean {
            var range;
            if (this.player.facing == Constants.FACING_RIGHT) {
                range = 64;
            } else {
                range = 32;
            }

            // Execute an attack against the monster if the monster is close enough to be hit, and
            // player is facing the right direction, and player is eligible to make attack.
            var distanceH = Math.floor(this.player.mapX - this.mapX);
            if (Math.abs(distanceH) <= range) {
                if (((this.player.facing == Constants.FACING_RIGHT) && (distanceH < 0)) || ((this.player.facing == Constants.FACING_LEFT) && (distanceH >= 0))) {
                    var distanceV = Math.abs(Math.floor(this.mapY - this.player.mapY));
                    if (distanceV <= this.height / 2) {
                        return this.takeDamage(damage);
                    }
                }
            }
            return true;
        }
    }
}