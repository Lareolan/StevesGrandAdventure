/**
 * This file contains game's static objects manager
 * Author:              Konstantin Koton
 * Filename:            Objects.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Dec. 9, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 *      v2 - Modified class to extend createjs.Container
 *      v3 - Moved object loading code from constructor to separate loadObjects() function
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
        spawnedObjects: Array<GameObjects.BitmapObject>;

        /**
         * The constructor simply initializes the Object manager/container instance
         */
        constructor() {
            super();
        }

        /*
         * This function takes in an array of objects and the game's loaded tileset from the map,
         * and creates game objects out of them, then adds them to the appropriate array
         * depending on their type. Ignores objects with type "Steve" and "Mob" since those
         * are handled by other classes (Player and Mobs respectively).
         * @param objects A raw array of objects loaded from the map data
         * @param tileset A reference to the game map's tileset to use to load bitmaps for the various objects
         */
        loadObjects(objects: Array<Object>, tileset: GameObjects.Tileset): void {
            this.originalList = objects;
            this.doors = [];
            this.torches = [];
            this.miscObjects = [];
            this.objectList = [];
            this.spawnedObjects = [];

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
            }
            for (index = 0; index < this.torches.length; index++) {
                this.addChild(this.torches[index]);
            }
            for (index = 0; index < this.miscObjects.length; index++) {
                this.addChild(this.miscObjects[index]);
            }
        }

        /**
         * Spawns loot items in the world (At the moment only spawns food drops);
         * @param x The x coordinate of where to place the loot object.
         * @param y The y coordinate of where to place the loot object.
         */
        spawnLoot(x: number, y: number): void {
            var image = createjs.SpriteSheetUtils.extractFrame(Managers.Assets.guiComponents, "FullFood");
            var bitmap = new createjs.Bitmap(image);
            var obj = new GameObjects.BitmapObject(null, bitmap);
            this.spawnedObjects.push(obj);

            obj.x = x;
            obj.y = y;
            obj.posX = obj.x;
            obj.posY = obj.y;
            obj.regX = 0;
            obj.regY = 0;
            obj.name = "Loot";
            obj["item"] = Constants.ITEM.FOOD;
            this.addChild(obj);
        }

        // Move all the static objects to the right to reflect player moving left
        shiftRight(): void {
            this.x += Constants.MOVE_SPEED;
        }

        // Move all the static objects to the left to reflect player moving right
        shiftLeft(): void {
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

        // This function checks whether or not the player has run across some loot.
        checkLoot(x: number, y: number): GameObjects.BitmapObject {
            for (var index = 0; index < this.spawnedObjects.length; index++) {
                if (this.spawnedObjects[index].name === "Loot") {
                    var distanceH = Math.abs(Math.floor(this.spawnedObjects[index].posX / 32) - x);
                    var distanceV = Math.abs(Math.floor(this.spawnedObjects[index].posY / 32) - y);
                    if ((distanceH === 0) && (distanceV <= 1)) {
                        return this.spawnedObjects[index];
                    }
                }
            }
            return null;
        }

        /**
         * Remove a specific child from the objects collection
         * @param obj The BitmapObject to be removed
         */
        removeChild(obj: GameObjects.BitmapObject): void {
            for (var index = 0; index < this.spawnedObjects.length; index++) {
                if (obj === this.spawnedObjects[index]) {
                    this.spawnedObjects.splice(index, 1);
                    super.removeChild(obj);
                    return;
                }
            }
        }

        // Resets all the static objects back to their initial positions
        // (Used for restarting the level)
        reset(): void {
            this.x = 0;
            this.y = 0;

            for (var index = 0; index < this.spawnedObjects.length; index++) {
                super.removeChild(this.spawnedObjects[index]);
            }

            this.spawnedObjects = [];
        }
    }
} 