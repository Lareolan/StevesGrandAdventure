﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This file contains game's Monster class that serves as the base for all game monsters.
* GUI screen objects.
* Author:              Konstantin Koton
* Filename:            Monster.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Dec. 9, 2014
* Revision History:
*      v1 - Migrated file to Project 1
*      v2 - Modified class to remove sprite property and make it the sprite (after modifications to the Entity base class)
*/
var GameObjects;
(function (GameObjects) {
    // The Monster class
    var Monster = (function (_super) {
        __extends(Monster, _super);
        function Monster(spriteSheet, frameNameOrNumber) {
            _super.call(this, spriteSheet, frameNameOrNumber);
        }
        /*
        * Sets an internal reference to the Player object (for combat purposes).
        * @param player The Player object to store the reference to.
        */
        Monster.prototype.setPlayer = function (player) {
            this.player = player;
        };

        /*
        * Causes damage to the monster according to the passed parameter and returns whether the
        * monster died from the attack or not. If it didn't die, make it groan in pain.
        * @param hearts the amount of damage inflicted on the monster
        * @returns true if the monster is still alive, false if it died
        */
        Monster.prototype.takeDamage = function (hearts) {
            this.health -= hearts;
            if (this.health <= 0) {
                return false;
            } else {
                if (this instanceof GameObjects.Mobs.Zombie) {
                    this.sound.zombieHurt(this, this.player);
                } else if (this instanceof GameObjects.Mobs.Creeper) {
                    this.sound.creeperHurt(this, this.player);
                }
            }
            return true;
        };

        // Make the monster die, play the appropriate death sound. Increase Steve's kill count.
        Monster.prototype.die = function () {
            this.dead = true;
            if (this instanceof GameObjects.Mobs.Zombie) {
                this.dropLoot();
                this.sound.zombieDeath(this, this.player);
                this.parent.removeChild(this);
            } else if (this instanceof GameObjects.Mobs.Creeper) {
                this.dropLoot();
                this.parent.removeChild(this);
            }
            this.player.addKill();
        };

        /**
        * Monster has a random chance to drop some health when it dies. This function makes it drop.
        */
        Monster.prototype.dropLoot = function () {
            if (Math.floor(Math.random() * 4) === 0) {
                this.player.objects.spawnLoot(this.x, this.y + 32);
            }
        };

        /*
        * Test whether or not Steve hit his mark with this monster.
        * @param damage The amount of damage the player could inflict on the monster
        * @returns true if the monster is still alive, false if it died
        */
        Monster.prototype.hitTest = function (damage) {
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
        };
        return Monster;
    })(GameObjects.Entity);
    GameObjects.Monster = Monster;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Monster.js.map
