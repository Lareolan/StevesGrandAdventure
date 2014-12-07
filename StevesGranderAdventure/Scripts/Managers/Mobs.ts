﻿/**
 * This file contains game's mob manager
 * Author:              Konstantin Koton
 * Filename:            Mobs.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 *      v2 - Modified class to extend createjs.Container
 */
module Managers {
    // The Mob manager class
    export class Mobs extends createjs.Container {
        // instance variables
//        mobs: Array<GameObjects.Monster>;
        rawMobData: Array<Object>;
        foreground: GameObjects.Layer;
        sound: Managers.Sound;
        player: GameObjects.Player;
//        children: GameObjects.Monster;

        /*
         * This constructor takes in a list of Mob objects, and creates appropriate Monster
         * objects out of them. For now only Zombie objects are created.
         */
        constructor(mobList: Array<Object>, foreground: GameObjects.Layer, sound: Managers.Sound, player: GameObjects.Player) {
            super();
            this.rawMobData = mobList;
            this.foreground = foreground;
            this.sound = sound;
            this.player = player;

//            this.mobs = [];
            this.init();
        }

        // Initialize all mobs
        init() {
            var zombie: GameObjects.Mobs.Zombie;
            var creeper: GameObjects.Mobs.Creeper;

            for (var index = 0; index < this.rawMobData.length; index++) {
                if (this.rawMobData[index]["name"] === "Zombie") {
                    zombie = new GameObjects.Mobs.Zombie();
                    zombie.name = "Zombie " + index;
                    zombie.setEntity(this.rawMobData[index]);
                    zombie.setMapData(this.foreground);
                    zombie.setSound(this.sound);
                    zombie.setPlayer(this.player);

                    this.addChild(zombie);
                } else if (this.rawMobData[index]["name"] === "Creeper") {
                    creeper = new GameObjects.Mobs.Creeper();
                    creeper.name = "Creeper " + index;
                    creeper.setEntity(this.rawMobData[index]);
                    creeper.setMapData(this.foreground);
                    creeper.setSound(this.sound);
                    creeper.setPlayer(this.player);

                    this.addChild(creeper);
                }
            }
        }

        /*
         * This function tests whether or not any of the mobs got his by the player's attack.
         * If Monster.hitTest() returns false, then the monster died from the attack.
         * Remove it from the game.
         */
        testMobHit(damage: number): void {
            var distance;
            var deadMobIdx = -1;
            for (var index = 0; index < this.children.length; index++) {
                if (!(<GameObjects.Monster>this.children[index]).hitTest(damage)) {
                    (<GameObjects.Monster>this.children[index]).die();
                    break;
                }
            }
        }


        // Move all the mobs to the right
        moveRight(): void {
            for (var index = 0; index < this.children.length; index++) {
                (<GameObjects.Monster>this.children[index]).moveRight();
            }
        }

        // Move all the mobs to the left
        moveLeft(): void {
            for (var index = 0; index < this.children.length; index++) {
                (<GameObjects.Monster>this.children[index]).moveLeft();
            }
        }

        // Move all the Mobs to the right
        shiftRight(): void {
//            for (var index = 0; index < this.mobs.length; index++) {
//                this.mobs[index].shiftRight();
//            }
            this.x += Constants.MOVE_SPEED;
        }

        // Move all the Mobs to the left
        shiftLeft(): void {
//            for (var index = 0; index < this.mobs.length; index++) {
//                this.mobs[index].shiftLeft();
//            }
            this.x -= Constants.MOVE_SPEED;
        }

        // Run each mob's update function, runs each tick
        update(): void {
            for (var index = 0; index < this.children.length; index++) {
                (<GameObjects.Monster>this.children[index]).update();
            }
//            for (var index = 0; index < this.mobs.length; index++) {
//                this.mobs[index].update();
//            }
        }

        // Display all mobs by adding each one to the stage
        show(): void {
//            for (var index = 0; index < this.mobs.length; index++) {
//                this.mobs[index].show();
//            }
        }

        // Hide all mobs by removing each one from the stage
        hide(): void {
//            for (var index = 0; index < this.mobs.length; index++) {
//                this.mobs[index].hide();
//            }
        }

        // Reset all the mobs back to default position (for use in restarting game)
        reset(): void {
            this.removeAllChildren();
            this.x = 0;
            this.y = 0;
            this.init();

//            this.hide();
//            this.mobs = [];
/*
            for (var index = 0; index < this.rawMobData.length; index++) {
                if (this.rawMobData[index]["name"] === "Zombie") {
                    this.mobs.push(new GameObjects.Mobs.Zombie(this.rawMobData[index], this.foreground, this.sound, this.player));
                    this.mobs[index].name = "Zombie " + index;
                }
            }
*/
        }
    }
} 