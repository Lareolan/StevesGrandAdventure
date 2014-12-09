/**
* This file contains game's Tileset object that holds the map's tileset
* Author:              Konstantin Koton
* Filename:            Tileset.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 23, 2014
* Revision History:
*      v1 - Migrated file to Project 1
*/
var GameObjects;
(function (GameObjects) {
    // Tileset Class
    var Tileset = (function () {
        /*
        * The constructor takes in a jQuery object containing tile information, and extracts
        * each tile into its own Bitmap instance. Also inserts information about each tile
        * into a separate Object array.
        */
        function Tileset($tilesets) {
            this.tileInfo = [];
            this.tileIndex = [];

            var tileset = this;

            $tilesets.each(function () {
                var $tileset = $(this);
                var info = {};

                info["name"] = $tileset.attr("name");
                info["firstgid"] = parseInt($tileset.attr("firstgid"));
                info["width"] = parseInt($tileset.attr("tilewidth"));
                info["height"] = parseInt($tileset.attr("tileheight"));

                var spriteSheet = new createjs.SpriteSheet({
                    images: [Managers.Assets.loader.getResult(info["name"])],
                    frames: { width: info["width"], height: info["height"] }
                });

                var frame;
                for (var frameIdx = info["firstgid"]; frameIdx < info["firstgid"] + spriteSheet.getNumFrames(null); frameIdx++) {
                    frame = createjs.SpriteSheetUtils.extractFrame(spriteSheet, frameIdx - 1);
                    tileset.tileIndex[frameIdx] = new createjs.Bitmap(frame);
                    tileset.tileInfo[frameIdx] = { width: info["width"], height: info["height"] };
                }
            });
        }
        /*
        * This function takes in a tile index ID and returns a copy of the Bitmap instance
        * associated with that index.
        */
        Tileset.prototype.getTile = function (index) {
            var tile = this.tileIndex[index];
            if (tile) {
                return tile.clone();
            }
            return null;
        };

        /*
        * This function takes in a tile index ID and returns an Object describing the tile.
        */
        Tileset.prototype.getTileInfo = function (index) {
            var info = this.tileInfo[index];
            if (info) {
                return info;
            }
            return null;
        };
        return Tileset;
    })();
    GameObjects.Tileset = Tileset;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Tileset.js.map
