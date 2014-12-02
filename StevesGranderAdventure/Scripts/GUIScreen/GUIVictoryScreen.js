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
* Revision History:
*      v1 - Migrated file to Project 1
*      v2 - Moved class into GUIScreen module
*/
var GUIScreen;
(function (GUIScreen) {
    // GUIVictoryScreen Class
    var GUIVictoryScreen = (function (_super) {
        __extends(GUIVictoryScreen, _super);
        function GUIVictoryScreen(stage) {
            _super.call(this, stage);
            // An object containing data descriptions and text
            this.epilogue = {
                line1: { text: "Due to your heroic efforts, Steve made it through...", textSize: 32, color: "#000000", x: 128, y: 64 },
                line2: { text: "...alive!", textSize: 32, color: "#000000", x: 128, y: 128 },
                line3: { text: "Great job Steve!", textSize: 32, color: "#ff0000", x: 128, y: 192 },
                line4: { text: "FIN?", textSize: 128, color: "#ff0000", x: Constants.HALF_SCREEN_WIDTH, y: 256 }
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
        GUIVictoryScreen.prototype.init = function () {
            var theStage = this.stage;

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

            textLine = new createjs.Text("Oh! By the way, you killed 0 zombies in 0 min 0 sec!", "32px Minecrafter", "#000000");
            textLine.x = 128;
            textLine.y = 512;
            this.screenObjects.push(textLine);
            this.killLine = textLine;

            var btn = new GameObjects.Button("Play Again?", 256, 64, (Constants.HALF_SCREEN_WIDTH - 128), 576, GameObjects.Button.ROUNDED, "black", "#5533DD", "rgba(100, 60, 200, 0.8)");
            btn.setFadeEffect();
            btn.setClickHandler(function () {
                var event = new createjs.Event("playAgainButtonClicked", true, false);
                theStage.dispatchEvent(event);
            });
            this.screenObjects.push(btn);
        };

        /*
        * Accepts Steve's kill count and changes the text to show it.
        * @param killCount The number of monsters Steve killed
        */
        GUIVictoryScreen.prototype.setKillCount = function (killCount, worldTimer) {
            var time = Math.floor((new Date().getTime() - worldTimer) / 1000);
            var timeString = Math.floor(time / 60) + " min " + (time % 60) + " sec";
            this.killLine.text = "Oh! By the way, you killed " + killCount + " zombies in " + timeString + "!";
        };

        // Shows the victory screen
        GUIVictoryScreen.prototype.show = function () {
            _super.prototype.show.call(this);
        };
        return GUIVictoryScreen;
    })(GUIScreen.Screen);
    GUIScreen.GUIVictoryScreen = GUIVictoryScreen;
})(GUIScreen || (GUIScreen = {}));
//# sourceMappingURL=GUIVictoryScreen.js.map
