var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This file contains the game's cloud object
* Author:              Konstantin Koton
* Filename:            Cloud.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:    Too numerous to mention
*/
var GameObjects;
(function (GameObjects) {
    // Cloud Class
    var Cloud = (function (_super) {
        __extends(Cloud, _super);
        // Create a cloud object
        function Cloud(cloudName, index) {
            _super.call(this, cloudName, null, index);
            this.name = "Cloud";
            createjs.EventDispatcher.initialize(this);
        }
        // Updates the cloud's current position, if cloud moves off screen then create and dispatch an
        // appropriate event.
        Cloud.prototype.update = function () {
            this.x += this.dx;
            if (this.x > (this.width + stage.canvas.width)) {
                var event = new createjs.Event("cloudOffScreen", true, false);
                this.dispatchEvent(event);
            }
        };

        /*
        * Set the cloud's position to the coordinates passed by parameters.
        * @param x The new x coordinate for the cloud
        * @param y The new y coordinate for the cloud
        */
        Cloud.prototype.setPosition = function (x, y) {
            this.x = x;
            this.y = y;
        };

        // Sets the cloud's movement speed
        Cloud.prototype.setSpeed = function (speed) {
            this.dx = speed;
        };

        // Move the cloud image to the right to reflect player moving left
        Cloud.prototype.moveLeft = function () {
            this.x += constants.MOVE_SPEED;
        };

        // Move the cloud image to the left to reflect player moving right
        Cloud.prototype.moveRight = function () {
            this.x -= constants.MOVE_SPEED;
        };
        return Cloud;
    })(GameObjects.BitmapObject);
    GameObjects.Cloud = Cloud;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Cloud.js.map
