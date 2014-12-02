/**
 * This file contains the game's game death/losing screen object
 * Author:              Konstantin Koton
 * Filename:            GUIDeathScreen.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 */
module GameObjects {
    // GUIDeathScreen Class
    export class GUIDeathScreen extends GameObjects.Screen {
        // Instance variables holding information
        redOverlay: createjs.Shape;
        killLine: createjs.Text;

        epilogue: Object = {
            line1: { text: "Despite your best efforts, Steve is dead.", textSize: 32, color: "#000000", x: 128, y: 64 },
            line2: { text: "You have Failed Steve after all...", textSize: 32, color: "#000000", x: 128, y: 128 },
            line3: { text: "R.I.P Steve", textSize: 32, color: "#ff0000", x: 128, y: 192 },
            line4: { text: "Game Over", textSize: 128, color: "#ff0000", x: Constants.HALF_SCREEN_WIDTH, y: 256 }
        };
        epilogueList: Array<string> = [
            "line1",
            "line2",
            "line3",
            "line4"
        ];

        // Constructor simply calls the super class constructor
        constructor(stage: createjs.Stage) {
            super(stage);
        }

        /*
         * Initializes all the screen data.
         */
        init(): void {
            var theStage = this.stage;

            var textLine,
                lineData,
                index,
                textSize = 32;

            this.redOverlay = new createjs.Shape();
            this.redOverlay.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(0, 0, Constants.SCREEN_WIDTH, Constants.SCREEN_HEIGHT);
            this.screenObjects.push(this.redOverlay);

            for (index = 0; index < this.epilogueList.length; index++) {
                lineData = this.epilogue[this.epilogueList[index]];

                textLine = new createjs.Text();
                textLine.font = lineData.textSize + "px Minecrafter";
                textLine.text = lineData.text;
                textLine.color = lineData.color;
                textLine.x = lineData.x;
                textLine.y = lineData.y;
                this.screenObjects.push(textLine);
            }
            textLine.textAlign = "center";

            // Add on the zombie kill count line
            textLine = new createjs.Text("On the bright side, at least you killed " + 0 + " zombies!", "32px Minecrafter", "#000000");
            textLine.x = 128;
            textLine.y = 512;
            this.screenObjects.push(textLine);
            this.killLine = textLine;


            // Create the "Play Again?" button
            var btn = new GameObjects.Button("Play Again?", 256, 64, (Constants.HALF_SCREEN_WIDTH - 128), 576, GameObjects.Button.ROUNDED, "black", "#5533DD", "rgba(100, 60, 200, 0.8)");
            btn.setFadeEffect();
            btn.setClickHandler(function () {
                var event = new createjs.Event("playAgainButtonClicked", true, false);
                theStage.dispatchEvent(event);
            });
            this.screenObjects.push(btn);
        }

        /*
         * Accepts Steve's kill count and changes the text to show it.
         * @param killCount The number of monsters Steve killed
         */
        setKillCount(killCount: number): void {
            this.killLine.text = "On the bright side, at least you killed " + killCount + " zombies!";
        }

        // Shows the victory screen
        show(): void {
            super.show();
        }
   }
}  