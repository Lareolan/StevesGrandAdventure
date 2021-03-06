﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This file contains the game's Bitmap object
* Author:              Konstantin Koton
* Filename:            BitmapObject.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:
*      v1 - Migrated file to Project 1
*/
var GameObjects;
(function (GameObjects) {
    // BitmapObject Class
    var BitmapObject = (function (_super) {
        __extends(BitmapObject, _super);
        /*
        * The constructor optionally takes an image asset name string or a Bitmap image,
        * as well as an optional index and creates a Bitmap.
        */
        function BitmapObject(imageAsset, bitmapAsset, positionIndex) {
            if (typeof positionIndex === "undefined") { positionIndex = null; }
            if (imageAsset) {
                _super.call(this, Managers.Assets.loader.getResult(imageAsset));
            } else if (bitmapAsset) {
                _super.call(this, bitmapAsset.image);
            } else {
                return;
            }
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.x = this.regX;
            this.y = this.regY;
        }
        // Retrieve the Bitmap object
        BitmapObject.prototype.getImage = function () {
            return this;
        };
        return BitmapObject;
    })(createjs.Bitmap);
    GameObjects.BitmapObject = BitmapObject;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=BitmapObject.js.map
