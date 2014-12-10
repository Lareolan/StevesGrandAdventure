/**
 * This file contains the game's start screen object
 * Author:              Konstantin Koton
 * Filename:            GUIStartScreen.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Dec. 9, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 *      v2 - Added code for button initialization
 *      v3 - Moved class into GUIScreen module
 *      v4 - Added the game's TITLE to the screen display (erm... yeah)
 */
module GUIScreen {
    // GUIStartScreen class
    export class GUIStartScreen extends GUIScreen.Screen {
        // Constructor simply calls the super class constructor
        constructor(stage: createjs.Stage) {
            super(stage);
        }

        /*
         * Initializes all the screen data.
         */
        init(): void {
            var theStage = this.stage;

            // Add game's title to the screen
            var title = new createjs.Text("Steve's Grand Adventure", "80px Minecrafter", "#000000");
            title.textAlign = "center";
            title.x = Constants.HALF_SCREEN_WIDTH;
            title.y = 64;
            title.color = "#3333DD";
            this.screenObjects.push(title);

            // Create "Start Game" button, and bind a click handler function to change state when clicked
            var buttonWidth = 400;
            var buttonHeight = 80;
            var btnX = Constants.HALF_SCREEN_WIDTH - (buttonWidth / 2),
                btnY = Constants.HALF_SCREEN_HEIGHT - (buttonHeight * 2);

            var startBtn = new GameObjects.Button("Start Game", buttonWidth, buttonHeight, btnX, btnY, GameObjects.Button.ROUNDED,
                "black", "#5533DD", "rgba(100, 60, 200, 0.8)");
            startBtn.setFadeEffect();
            startBtn.setClickHandler(function () {
                var event = new createjs.Event("startGameClicked", true, false);
                theStage.dispatchEvent(event);
            });
            this.screenObjects.push(startBtn);

            // Create "Instructions" button, and bind a click handler function to change state when clicked
            btnY += buttonHeight * 2;
            var instructBtn = new GameObjects.Button("Instructions", buttonWidth, buttonHeight, btnX, btnY, GameObjects.Button.ROUNDED,
                "black", "#5533DD", "rgba(100, 60, 200, 0.8)");
            instructBtn.setFadeEffect();
            instructBtn.setClickHandler(function () {
                var event = new createjs.Event("instructionsClicked", true, false);
                theStage.dispatchEvent(event);
            });
            this.screenObjects.push(instructBtn);
        }
    }
} 