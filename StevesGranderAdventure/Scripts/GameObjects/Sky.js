var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This file contains game's sky bitmap image.
* Author:              Konstantin Koton
* Filename:            Sky.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:    Too numerous to mention
*/
var GameObjects;
(function (GameObjects) {
    // Sky Class
    var Sky = (function (_super) {
        __extends(Sky, _super);
        // The constructor adds the sky to the stage at position 0 (the very back)
        function Sky() {
            _super.call(this, "sky", null, 0);
            // Initializes the name of the bitmap object
            this.name = "Sky";
        }
        // Show the sky by adding it to the stage
        Sky.prototype.show = function () {
            //            stage.addChildAt(this.image, 0);
        };

        // Hit the sky by removing it from the stage
        Sky.prototype.hide = function () {
            //            stage.removeChild(this.image);
        };
        return Sky;
    })(GameObjects.BitmapObject);
    GameObjects.Sky = Sky;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Sky.js.map
