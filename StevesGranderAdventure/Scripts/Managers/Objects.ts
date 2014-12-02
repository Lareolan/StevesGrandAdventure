﻿/**
 * This file contains game's static objects manager
 * Author:              Konstantin Koton
 * Filename:            Objects.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 *      v2 - Modified class to extend createjs.Container
 */
module Managers {
    // Static Objects manager class
    export class Objects extends createjs.Container {
        // internal variables
        originalList: Array<Object>;
        objectList: Array<GameObjects.BitmapObject>;
        doors: Array<GameObjects.BitmapObject>;
        torches: Array<GameObjects.BitmapObject>;
        ladders: Array<GameObjects.BitmapObject>;
        miscObjects: Array<GameObjects.BitmapObject>;

        /*
         * Constructor. Takes in an array of objects and the game's loaded tileset from the map,
         * and creates game objects out of them, then adds them to the appropriate array
         * depending on their type. Ignores objects with type "Steve" and "Mob" since those
         * are handled by other classes.
         */
        constructor(objects: Array<Object>, tileset: GameObjects.Tileset) {
            super();
            this.originalList = objects;
            this.doors = [];
            this.torches = [];
            this.miscObjects = [];
            this.objectList = [];

            var bitmap: createjs.Bitmap;
            var gid: number;
            var index: number;
            var obj: GameObjects.BitmapObject;
            for (index = 0; index < objects.length; index++) {
                gid = parseInt(objects[index]["gid"]);

                if (objects[index]["type"] === "Door") {
                    bitmap = tileset.getTile(gid);
                    obj = new GameObjects.BitmapObject(null, bitmap);
                    this.doors.push(obj);
                } else if (objects[index]["type"] === "Torch") {
                    bitmap = tileset.getTile(gid);
                    obj = new GameObjects.BitmapObject(null, bitmap);
                    this.torches.push(obj);
                } else if ((objects[index]["type"] !== "Mob") && (objects[index]["type"] !== "Steve")) {
                    bitmap = tileset.getTile(gid);
                    obj = new GameObjects.BitmapObject(null, bitmap);
                    this.miscObjects.push(obj);
                } else {
                    continue;
                }
                obj.x = parseInt(objects[index]["x"]);
                obj.y = parseInt(objects[index]["y"]) - 32;
                obj.posX = obj.x;
                obj.posY = obj.y;
                obj.regX = 0;
                obj.regY = 0;
                obj.name = objects[index]["name"];
            }

            for (index = 0; index < this.doors.length; index++) {
                this.addChild(this.doors[index]);
//                stage.addChild(this.doors[index]);
//                this.objectList.push(this.doors[index]);
            }
            for (index = 0; index < this.torches.length; index++) {
                this.addChild(this.torches[index]);
//                stage.addChild(this.torches[index]);
//                this.objectList.push(this.torches[index]);
            }
            for (index = 0; index < this.miscObjects.length; index++) {
                this.addChild(this.miscObjects[index]);
//                stage.addChild(this.miscObjects[index]);
//                this.objectList.push(this.miscObjects[index]);
            }
        }

        // Move all the static objects to the right to reflect player moving left
        shiftRight(): void {
//            for (var index = 0; index < this.objectList.length; index++) {
//                this.objectList[index].x += constants.MOVE_SPEED;
//            }
            this.x += Constants.MOVE_SPEED;
        }

        // Move all the static objects to the left to reflect player moving right
        shiftLeft(): void {
//            for (var index = 0; index < this.objectList.length; index++) {
//                this.objectList[index].x -= constants.MOVE_SPEED;
//            }
            this.x -= Constants.MOVE_SPEED;
        }

        // Show all the static objects by adding each one to the stage
        show(): void {
//            for (var index = 0; index < this.objectList.length; index++) {
//                this.objectList[index].show();
//            }
        }

        // Hide all the static objects by removing each one from the stage
        hide(): void {
//            for (var index = 0; index < this.objectList.length; index++) {
//                this.objectList[index].hide();
//            }
        }

        // This function checks whether or not the player has reached the exit doorway.
        checkExit(x: number, y: number): boolean {
            for (var index = 0; index < this.doors.length; index++) {
                if (this.doors[index].name === "Exit") {
                    var distanceH = Math.abs(Math.floor(this.doors[index].posX / 32) - x);
                    var distanceV = Math.abs(Math.floor(this.doors[index].posY / 32) - y);
                    if ((distanceH === 0) && (distanceV === 0)) {
                        return true;
                    }
                }
            }
            return false;
        }

        // Resets all the static objects back to their initial positions
        // (Used for restarting the level)
        reset(): void {
            this.x = 0;
            this.y = 0;
        }
    }
} 