var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This file contains the game's preload screen object
* Author:              Konstantin Koton
* Filename:            GUIPreloadScreen.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:    Too numerous to mention
*/
var GameObjects;
(function (GameObjects) {
    // GUIPreloadScreen Class
    var GUIPreloadScreen = (function (_super) {
        __extends(GUIPreloadScreen, _super);
        // Constructor simply calls the super class constructor
        function GUIPreloadScreen() {
            _super.call(this);
        }
        return GUIPreloadScreen;
    })(GameObjects.Screen);
    GameObjects.GUIPreloadScreen = GUIPreloadScreen;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=GUIPreloadScreen.js.map
