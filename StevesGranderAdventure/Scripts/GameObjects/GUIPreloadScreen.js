﻿var __extends = this.__extends || function (d, b) {
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
        function GUIPreloadScreen(stage) {
            _super.call(this, stage);
            this.progressBarWidth = 400;
            this.progressBarheight = 50;
            this.init();
        }
        GUIPreloadScreen.prototype.init = function () {
            this.progressBar = new createjs.Shape();
            this.text = new createjs.Text();
            this.text.font = "bold 36px Arial";
            this.text.color = "#C33";
            this.text.textAlign = "center";
            this.text.textBaseline = "middle";
            this.text.x = Constants.HALF_SCREEN_WIDTH;
            this.text.y = Constants.HALF_SCREEN_HEIGHT;
            this.screenObjects.push(this.progressBar);
            this.screenObjects.push(this.text);

            Managers.Assets.init();
            Managers.Assets.loader.addEventListener("progress", { handleEvent: this.handleProgress, instance: this });
            Managers.Assets.loader.addEventListener("complete", { handleEvent: this.handleComplete, instance: this });
        };

        // Display a loading progress bar
        GUIPreloadScreen.prototype.handleProgress = function (event) {
            var instance = this.instance;
            var x = Constants.HALF_SCREEN_WIDTH - instance.progressBarWidth / 2;
            var y = Constants.HALF_SCREEN_HEIGHT - instance.progressBarheight / 2;
            var progress = event.loaded / event.total;

            // Draw the progress bar shape to reflect progress
            instance.progressBar.graphics.clear();
            instance.progressBar.graphics.beginStroke("#000").drawRect(x, y, instance.progressBarWidth, instance.progressBarheight);
            instance.progressBar.graphics.beginFill("#CCC").drawRect(x, y, instance.progressBarWidth * progress, instance.progressBarheight);

            // Change the text to reflect progress
            instance.text.text = (progress * 100).toFixed(0) + "% complete";
        };

        // Once loading is done, initialize the game and load main screen
        GUIPreloadScreen.prototype.handleComplete = function (event) {
            var instance = this.instance;
            var complete = new createjs.Event("preloadComplete", true, false);
            instance.stage.dispatchEvent(complete);
        };
        return GUIPreloadScreen;
    })(GameObjects.Screen);
    GameObjects.GUIPreloadScreen = GUIPreloadScreen;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=GUIPreloadScreen.js.map
