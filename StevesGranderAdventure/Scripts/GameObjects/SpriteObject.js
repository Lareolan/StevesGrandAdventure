﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This file contains game's raw sprite object (Currently not used for anything).
* Author:              Konstantin Koton
* Filename:            SpriteObject.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 23, 2014
* Revision History:
*      v1 - Migrated file to Project 1
*/
var GameObjects;
(function (GameObjects) {
    // The SpriteObject class
    var SpriteObject = (function (_super) {
        __extends(SpriteObject, _super);
        /*
        * The constructor takes in the name of an asset, and an optional index, and
        * initializes the sprite object. If index is specified, then adds the sprite
        * to the stage at that index, otherwise adds it to the top of the stage.
        */
        function SpriteObject(imageAsset, positionIndex) {
            if (typeof positionIndex === "undefined") { positionIndex = null; }
            _super.call(this, Managers.Assets.characters, imageAsset);
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.x = this.regX;
            this.y = this.regY;
        }
        return SpriteObject;
    })(createjs.Sprite);
    GameObjects.SpriteObject = SpriteObject;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=SpriteObject.js.map
