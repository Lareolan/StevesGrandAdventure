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
* Revision History:
*      v1 - Migrated file to Project 1
*      v2 - Added code for button initialization
*      v3 - Moved class into GUIScreen module
*/
var GUIScreen;
(function (GUIScreen) {
    // GUIStartScreen class
    var GUIStartScreen = (function (_super) {
        __extends(GUIStartScreen, _super);
        // Constructor simply calls the super class constructor
        function GUIStartScreen(stage) {
            _super.call(this, stage);
        }
        GUIStartScreen.prototype.init = function () {
            var theStage = this.stage;

            // Create "Start Game" button, and bind a click handler function to change state when clicked
            var buttonWidth = 400;
            var buttonHeight = 80;
            var btnX = Constants.HALF_SCREEN_WIDTH - (buttonWidth / 2), btnY = Constants.HALF_SCREEN_HEIGHT - (buttonHeight * 2);

            var startBtn = new GameObjects.Button("Start Game", buttonWidth, buttonHeight, btnX, btnY, GameObjects.Button.ROUNDED, "black", "#5533DD", "rgba(100, 60, 200, 0.8)");
            startBtn.setFadeEffect();
            startBtn.setClickHandler(function () {
                var event = new createjs.Event("startGameClicked", true, false);
                theStage.dispatchEvent(event);
                // TODO: Fix this later
                /*
                stage.removeChild(startBtn);
                stage.removeChild(instructBtn);
                
                gameState = constants.GAME_STATE_PLAY;
                gui.show(constants.GAME_STATE_PLAY);
                initGamePlay();
                */
            });

            //            stage.addChild(startBtn);
            this.screenObjects.push(startBtn);

            // Create "Instructions" button, and bind a click handler function to change state when clicked
            btnY += buttonHeight * 2;
            var instructBtn = new GameObjects.Button("Instructions", buttonWidth, buttonHeight, btnX, btnY, GameObjects.Button.ROUNDED, "black", "#5533DD", "rgba(100, 60, 200, 0.8)");
            instructBtn.setFadeEffect();
            instructBtn.setClickHandler(function () {
                var event = new createjs.Event("instructionsClicked", true, false);
                theStage.dispatchEvent(event);
                /*
                stage.removeChild(startBtn);
                stage.removeChild(instructBtn);
                
                gameState = constants.GAME_STATE_INSTRUCTIONS;
                initInstructionScreen();
                */
            });

            //            stage.addChild(instructBtn);
            this.screenObjects.push(instructBtn);
        };
        return GUIStartScreen;
    })(GUIScreen.Screen);
    GUIScreen.GUIStartScreen = GUIStartScreen;
})(GUIScreen || (GUIScreen = {}));
//# sourceMappingURL=GUIStartScreen.js.map
