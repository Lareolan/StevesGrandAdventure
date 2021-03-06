﻿/**
 * This file contains the game's game map object
 * Author:              Konstantin Koton
 * Filename:            GameMap.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Dec. 9, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 *      v2 - Modified class to extend GameObjects.BitmapObject
 *      v3 - Moved map loading code from constructor to separate loadMap() function
 */
module GameObjects {
    // GameMap class
    export class GameMap extends GameObjects.BitmapObject {
        // Instance variables
        layers: Array<GameObjects.Layer>;
        tileset: GameObjects.Tileset;
        entities: GameObjects.MapEntities;
        width: number;
        height: number;
        mapWidth: number;
        mapHeight: number;

        // The constructor initializes the object, not much else
        constructor() {
            super();
        }

        /**
         * This function initializes all of the map data, loads it, and parses it
         */
        loadMap(mapName: string): void {
            var index, tileID;
            var tile: createjs.Bitmap;

            this.layers = [];

            // Parses XML sections of the game map file
            var $mapData = $(Managers.Assets.loader.getResult(mapName));
            var $tilesets = $mapData.find("tileset");
            var $layers = $mapData.find("layer");
            var $entityGroup = $mapData.find("objectgroup");
            var gameMap = this;

            // Parse tileset information and store the parsed data in instance variable
            this.tileset = new GameObjects.Tileset($tilesets);

            // Parse layer information and store the parsed data in instance array variable
            $layers.each(function () {
                var newLayer = new GameObjects.Layer();
                newLayer.fromXML($(this));
                gameMap.layers.push(newLayer);
            });

            // Parse map entities information and store the parsed data in instance variable
            this.entities = new GameObjects.MapEntities($entityGroup);

            // Separate background and foreground layers
            var background = this.getLayer(Constants.LAYER_NAME_BACKGROUND);
            var foreground = this.getLayer(Constants.LAYER_NAME_FOREGROUND);

            // Store height and width information
            this.width = foreground.width;
            this.height = foreground.height;

            // Create a new canvas object to render the map onto
            var canvas = document.createElement("canvas");
            var tilesetInfo = this.tileset.getTileInfo(1);
            this.mapWidth = canvas.width = this.width * tilesetInfo["width"];
            this.mapHeight = canvas.height = this.height * tilesetInfo["height"];

            // Create a new stage for the new canvas
            var bitmapStage = new createjs.Stage(canvas);

            var layerList = [background, foreground];

            // Render both map layers onto the new canvas
            for (var layer = 0; layer < this.layers.length; layer++) {
                for (var y = 0; y < this.height; y++) {
                    for (var x = 0; x < this.width; x++) {
                        index = this.width * y + x;
                        tileID = layerList[layer].data[index];
                        tile = this.tileset.getTile(tileID);
                        tilesetInfo = this.tileset.getTileInfo(tileID);

                        if (tile) {
                            // If processing a background layer, then darken it by 40% to
                            // differentiate it from the foreground.
                            if (layer !== this.layers.length - 1) {
                                var color = new createjs.ColorFilter(0.60, 0.60, 0.60, 1, 0, 0, 0, 0);
                                tile.filters = [color];
                                tile.cache(0, 0, tilesetInfo["width"], tilesetInfo["height"]);
                            }
                            tile.x = x * tilesetInfo["width"];
                            tile.y = y * tilesetInfo["height"];
                            bitmapStage.addChild(tile);
                        }
                    }
                }
            }

            // ensure the stage is updated
            bitmapStage.update();

            // Convert the data from the new canvas into a bitmap and use that bitmap as the
            // map from now on (Results in much faster and more efficient map operations).

            this.name = "Map of " + mapName;
            this.image = canvas;
        }

        /*
         * Returns layer information for a specific map layer
         * @param name A string name of the layer to retrieve
         * @returns The Layer object requested
         */
        getLayer(name: string): GameObjects.Layer {
            for (var index = 0; index < this.layers.length; index++) {
                if (this.layers[index].name == name) {
                    return this.layers[index];
                }
            }
            return null;
        }

        // Move all the map image to the right to reflect player moving left
        shiftRight(): void {
            if (this.x <= -Constants.MOVE_SPEED) {
                this.x += Constants.MOVE_SPEED;
            }
        }

        // Move all the map image to the left to reflect player moving right
        shiftLeft(): void {
            if (this.x >= -(this.mapWidth - Constants.SCREEN_WIDTH - Constants.MOVE_SPEED)) {
                this.x -= Constants.MOVE_SPEED;
            }
        }

        // resets the map back to start
        reset(): void {
            this.x = 0;
            this.y = 0;
        }
    }
} 