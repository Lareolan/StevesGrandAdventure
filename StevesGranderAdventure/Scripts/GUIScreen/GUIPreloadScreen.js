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
* Date Last Modified:  Dec. 9, 2014
* Revision History:
*      v1 - Migrated file to Project 1
*      v2 - Moved class into GUIScreen module
*      v3 - Added company logo and copyright text
*/
var GUIScreen;
(function (GUIScreen) {
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
        /*
        * Initializes all the screen data.
        */
        GUIPreloadScreen.prototype.init = function () {
            this.logoBitmap = new createjs.Bitmap("Assets/images/2K-LOGO.jpg");
            this.logoBitmap.x = Constants.HALF_SCREEN_WIDTH;
            this.logoBitmap.y = Constants.HALF_SCREEN_HEIGHT / 2;
            this.logoBitmap.regX = 128;
            this.logoBitmap.regY = 128;
            this.screenObjects.push(this.logoBitmap);

            this.progressBar = new createjs.Shape();
            this.screenObjects.push(this.progressBar);

            this.text = new createjs.Text();
            this.text.font = "bold 36px Arial";
            this.text.color = "#C33";
            this.text.textAlign = "center";
            this.text.textBaseline = "middle";
            this.text.x = Constants.HALF_SCREEN_WIDTH;
            this.text.y = Constants.HALF_SCREEN_HEIGHT;
            this.screenObjects.push(this.text);

            this.copyrightText = new createjs.Text();
            this.copyrightText.text = "This game is a product of Y2K Software. All rights reserved.";
            this.copyrightText.font = "bold 36px Arial";
            this.copyrightText.color = "#000";
            this.copyrightText.textAlign = "center";
            this.copyrightText.textBaseline = "middle";
            this.copyrightText.x = Constants.HALF_SCREEN_WIDTH;
            this.copyrightText.y = Constants.SCREEN_HEIGHT - 90;
            this.screenObjects.push(this.copyrightText);

            this.copyrightText = new createjs.Text();
            this.copyrightText.text = "Minecraft is a registered trademark of Mojang inc.";
            this.copyrightText.font = "bold 36px Arial";
            this.copyrightText.color = "#000";
            this.copyrightText.textAlign = "center";
            this.copyrightText.textBaseline = "middle";
            this.copyrightText.x = Constants.HALF_SCREEN_WIDTH;
            this.copyrightText.y = Constants.SCREEN_HEIGHT - 36;
            this.screenObjects.push(this.copyrightText);

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
    })(GUIScreen.Screen);
    GUIScreen.GUIPreloadScreen = GUIPreloadScreen;
})(GUIScreen || (GUIScreen = {}));
//# sourceMappingURL=GUIPreloadScreen.js.map
