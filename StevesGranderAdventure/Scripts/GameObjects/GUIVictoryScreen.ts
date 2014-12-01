/**
 * This file contains the game's victory screen object
 * Author:              Konstantin Koton
 * Filename:            GUIVictoryScreen.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:    Too numerous to mention
 */
module GameObjects {
    // GUIVictoryScreen Class 
    export class GUIVictoryScreen extends GameObjects.Screen {
        // An object containing data descriptions and text
        epilogue: Object = {
            line1: { text: "Due to your heroic efforts, Steve made it through...", textSize: 32, color: "#000000", x: 128, y: 64 },
            line2: { text: "...alive!", textSize: 32, color: "#000000", x: 128, y: 128 },
            line3: { text: "Great job Steve!", textSize: 32, color: "#ff0000", x: 128, y: 192 },
            line4: { text: "FIN?", textSize: 128, color: "#ff0000", x: Constants.HALF_SCREEN_WIDTH, y: 256 }
        };
        epilogueList: Array<string> = [
            "line1",
            "line2",
            "line3",
            "line4"
        ];

        constructor(stage: createjs.Stage) {
            super(stage);
        }

        /*
         * Initializes all the screen data. Accepts Steve's kill count and timestamp of the 
         * start of the game.
         * @param killCount The number of monsters Steve killed
         * @param time The timestamp at the start of the game
         */
        init(killCount: number, time: number): void {
            var textLine,
                lineData,
                index,
                textSize = 32;

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


            var time = Math.floor((new Date().getTime() - worldTimer) / 1000);
            var timeString = Math.floor(time / 60) + " min " + (time % 60) + " sec";
            textLine = new createjs.Text("Oh! By the way, you killed " + killCount + " zombies in " + timeString + "!", "32px Minecrafter", "#000000");
            textLine.x = 128;
            textLine.y = 512;
            this.screenObjects.push(textLine);

            var btn = new GameObjects.Button("Play Again?", 256, 64, (Constants.HALF_SCREEN_WIDTH - 128), 576, GameObjects.Button.ROUNDED, "black", "#5533DD", "rgba(100, 60, 200, 0.8)");
            btn.setFadeEffect();
            btn.setClickHandler(function () {
                gameState = constants.GAME_STATE_PLAY;
                gui.show(constants.GAME_STATE_PLAY);
                cloudManager.reset();
                player.reset();
                map.reset();
                gameObjects.reset();
                mobs.reset();
                gui.gameScreen.reset();
            });
            this.screenObjects.push(btn);
        }

        // Shows the victory screen
        show(): void {
            super.show();
        }
    }
}