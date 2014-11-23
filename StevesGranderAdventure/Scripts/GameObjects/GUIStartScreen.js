var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This file contains the game's start screen object
* Author:              Konstantin Koton
* Filename:            GUIStartScreen.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:    Too numerous to mention
*/
var GameObjects;
(function (GameObjects) {
    // GUIStartScreen class
    var GUIStartScreen = (function (_super) {
        __extends(GUIStartScreen, _super);
        // Constructor simply calls the super class constructor
        function GUIStartScreen() {
            _super.call(this);
        }
        return GUIStartScreen;
    })(GameObjects.Screen);
    GameObjects.GUIStartScreen = GUIStartScreen;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=GUIStartScreen.js.map
