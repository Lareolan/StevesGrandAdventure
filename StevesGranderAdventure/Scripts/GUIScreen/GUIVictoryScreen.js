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
* Date Last Modified:  Dec. 9, 2014
* Revision History:
*      v1 - Migrated file to Project 1
*      v2 - Moved class into GUIScreen module
*      v3 - Changed class to add representation of final score
*/
var GUIScreen;
(function (GUIScreen) {
    // GUIVictoryScreen Class
    var GUIVictoryScreen = (function (_super) {
        __extends(GUIVictoryScreen, _super);
        function GUIVictoryScreen(stage) {
            _super.call(this, stage);
            // An object containing data descriptions and text
            this.scoreInfo = {
                complete: { text: "You Win!", textSize: 48, color: "#000000", x: Constants.HALF_SCREEN_WIDTH, y: 64, align: "center" },
                scoreText: { text: "Score:", textSize: 32, color: "#000000", x: Constants.HALF_SCREEN_WIDTH, y: 128, align: "center" },
                baseScore: { text: "", textSize: 32, color: "#000000", x: Constants.HALF_SCREEN_WIDTH, y: 192, align: "center" },
                optimumTime: { text: "", textSize: 32, color: "#000000", x: Constants.HALF_SCREEN_WIDTH, y: 256, align: "center" },
                playerTime: { text: "", textSize: 32, color: "#000000", x: Constants.HALF_SCREEN_WIDTH, y: 320, align: "center" },
                time: { text: "", textSize: 32, color: "#000000", x: Constants.HALF_SCREEN_WIDTH - 192, y: 384, align: "left" },
                health: { text: "", textSize: 32, color: "#000000", x: Constants.HALF_SCREEN_WIDTH - 144, y: 448, align: "left" },
                inventory: { text: "", textSize: 32, color: "#000000", x: Constants.HALF_SCREEN_WIDTH - 144, y: 512, align: "left" },
                finalScore: { text: "", textSize: 48, color: "#000000", x: Constants.HALF_SCREEN_WIDTH, y: 576, align: "center" }
            };
            this.scoreList = [
                "complete",
                "scoreText",
                "baseScore",
                "optimumTime",
                "playerTime",
                "time",
                "health",
                "inventory",
                "finalScore"
            ];
            this.textLines = {};
        }
        /*
        * Initializes all the screen data.
        */
        GUIVictoryScreen.prototype.init = function () {
            var theStage = this.stage;

            var textLine, lineData, index, textSize = 32;

            for (index = 0; index < this.scoreList.length; index++) {
                lineData = this.scoreInfo[this.scoreList[index]];

                textLine = new createjs.Text();
                textLine.font = lineData.textSize + "px Minecrafter";
                textLine.text = lineData.text;
                textLine.color = lineData.color;
                textLine.x = lineData.x;
                textLine.y = lineData.y;
                textLine.textAlign = lineData.align;
                this.screenObjects.push(textLine);
                this.textLines[this.scoreList[index]] = textLine;
            }
            textLine.textAlign = "center";

            this.healthSprite = new createjs.Sprite(Managers.Assets.guiComponents, "FullHeart");
            this.foodSprite = new createjs.Sprite(Managers.Assets.guiComponents, "FullFood");
            this.screenObjects.push(this.healthSprite);
            this.screenObjects.push(this.foodSprite);

            var btn = new GameObjects.Button("Play Again?", 256, 64, (Constants.HALF_SCREEN_WIDTH - 128), (Constants.SCREEN_HEIGHT - 96), GameObjects.Button.ROUNDED, "black", "#5533DD", "rgba(100, 60, 200, 0.8)");
            btn.setFadeEffect();
            btn.setClickHandler(function () {
                var event = new createjs.Event("playAgainButtonClicked", true, false);
                theStage.dispatchEvent(event);
            });
            this.screenObjects.push(btn);
        };

        /*
        * Accepts Steve's score data and changes the text to show it.
        * @param scoreData And Object containing all the score information
        */
        GUIVictoryScreen.prototype.setScoreData = function (scoreData) {
            this.textLines["baseScore"].text = "Base Score: " + scoreData["baseScore"];
            this.textLines["optimumTime"].text = "Optimum Time for Level: " + scoreData["optimumTime"] + " seconds";
            this.textLines["playerTime"].text = "Your Time for Level: " + scoreData["playerTime"] + " seconds";
            if (scoreData["timeScore"] > 0) {
                this.textLines["playerTime"].color = "#33cc33";
            } else {
                this.textLines["playerTime"].color = "#cc3333";
            }
            this.textLines["time"].text = "x " + scoreData["time"] + " seconds = " + scoreData["timeScore"];
            this.textLines["health"].text = "x " + scoreData["health"] + " = " + scoreData["healthScore"];
            this.textLines["inventory"].text = "x " + scoreData["inventory"] + " = " + scoreData["inventoryScore"];
            this.textLines["finalScore"].text = "Game Final Score: " + scoreData["finalScore"];
            this.healthSprite.x = this.textLines["health"].x - 43;
            this.healthSprite.y = this.textLines["health"].y + 5;
            this.foodSprite.x = this.textLines["inventory"].x - 48;
            this.foodSprite.y = this.textLines["inventory"].y;
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
