var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This file contains the game's victory screen object
* Author:              Konstantin Koton
* Filename:            GUIVictoryScreen.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:    Too numerous to mention
*/
var GameObjects;
(function (GameObjects) {
    // GUIVictoryScreen Class
    var GUIVictoryScreen = (function (_super) {
        __extends(GUIVictoryScreen, _super);
        function GUIVictoryScreen() {
            _super.call(this);
            // An object containing data descriptions and text
            this.epilogue = {
                line1: { text: "Due to your heroic efforts, Steve made it through...", textSize: 32, color: "#000000", x: 128, y: 64 },
                line2: { text: "...alive!", textSize: 32, color: "#000000", x: 128, y: 128 },
                line3: { text: "Great job Steve!", textSize: 32, color: "#ff0000", x: 128, y: 192 },
                line4: { text: "FIN?", textSize: 128, color: "#ff0000", x: stage.canvas.width / 2, y: 256 }
            };
            this.epilogueList = [
                "line1",
                "line2",
                "line3",
                "line4"
            ];
        }
        /*
        * Initializes all the screen data. Accepts Steve's kill count and timestamp of the
        * start of the game.
        * @param killCount The number of monsters Steve killed
        * @param time The timestamp at the start of the game
        */
        GUIVictoryScreen.prototype.init = function (killCount, time) {
            var textLine, lineData, index, textSize = 32;

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

            var btn = new GameObjects.Button("Play Again?", 256, 64, (stage.canvas.width / 2 - 128), 576, GameObjects.Button.ROUNDED, "black", "#5533DD", "rgba(100, 60, 200, 0.8)");
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
        };

        // Shows the victory screen
        GUIVictoryScreen.prototype.show = function () {
            _super.prototype.show.call(this);
        };
        return GUIVictoryScreen;
    })(GameObjects.Screen);
    GameObjects.GUIVictoryScreen = GUIVictoryScreen;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=GUIVictoryScreen.js.map
