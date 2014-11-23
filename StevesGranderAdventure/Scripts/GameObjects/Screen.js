/**
* This file contains game's base Screen objects used as the base by the various
* GUI screen objects.
* Author:              Konstantin Koton
* Filename:            Screen.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:    Too numerous to mention
*/
var GameObjects;
(function (GameObjects) {
    // The Screen class
    var Screen = (function () {
        // Constructor simply initializes the screen objects array
        function Screen() {
            this.screenObjects = [];
        }
        // Hides all screen objects by taking them out of the stage and into an internal
        // storage array, then clearing the stage.
        Screen.prototype.hide = function () {
            for (var index = 0; index < stage.getNumChildren(); index++) {
                this.screenObjects.push(stage.getChildAt(index));
            }
            stage.removeAllChildren();
        };

        // Shows all the objects in this screen by adding them one by one to the stage after
        // clearing the stage's current objects first.
        Screen.prototype.show = function () {
            stage.removeAllChildren();
            for (var index = 0; index < this.screenObjects.length; index++) {
                stage.addChild(this.screenObjects[index]);
            }
        };

        // Add an object to the screen
        Screen.prototype.addChild = function (image) {
            this.screenObjects.push(image);
        };

        // Add an array of objects to the screen
        Screen.prototype.addChildArray = function (images) {
            this.screenObjects.concat(images);
        };
        return Screen;
    })();
    GameObjects.Screen = Screen;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Screen.js.map
