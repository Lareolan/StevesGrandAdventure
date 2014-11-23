var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This file contains the game's game death/losing screen object
* Author:              Konstantin Koton
* Filename:            GUIDeathScreen.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:    Too numerous to mention
*/
var GameObjects;
(function (GameObjects) {
    // GUIDeathScreen Class
    var GUIDeathScreen = (function (_super) {
        __extends(GUIDeathScreen, _super);
        // Constructor simply calls the super class constructor
        function GUIDeathScreen() {
            _super.call(this);
            this.epilogue = {
                line1: { text: "Despite your best efforts, Steve is dead.", textSize: 32, color: "#000000", x: 128, y: 64 },
                line2: { text: "You have Failed Steve after all...", textSize: 32, color: "#000000", x: 128, y: 128 },
                line3: { text: "R.I.P Steve", textSize: 32, color: "#ff0000", x: 128, y: 192 },
                line4: { text: "Game Over", textSize: 128, color: "#ff0000", x: stage.canvas.width / 2, y: 256 }
            };
            this.epilogueList = [
                "line1",
                "line2",
                "line3",
                "line4"
            ];
        }
        /*
        * Initializes all the screen data. Accepts Steve's kill count.
        * @param killCount The number of monsters Steve killed
        */
        GUIDeathScreen.prototype.init = function (killCount) {
            var textLine, lineData, index, textSize = 32;

            this.redOverlay = new createjs.Shape();
            this.redOverlay.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
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

            textLine = new createjs.Text("On the bright side, at least you killed " + killCount + " zombies!", "32px Minecrafter", "#000000");
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
        GUIDeathScreen.prototype.show = function () {
            _super.prototype.show.call(this);
        };
        return GUIDeathScreen;
    })(GameObjects.Screen);
    GameObjects.GUIDeathScreen = GUIDeathScreen;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=GUIDeathScreen.js.map
