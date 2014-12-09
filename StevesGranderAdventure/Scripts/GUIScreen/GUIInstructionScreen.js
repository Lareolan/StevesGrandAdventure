var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This file contains the game's instructions screen object
* Author:              Konstantin Koton
* Filename:            GUIInstructionScreen.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Dec. 9, 2014
* Revision History:
*      v1 - Migrated file to Project 1
*      v2 - Moved class into GUIScreen module
*/
var GUIScreen;
(function (GUIScreen) {
    // GUIInstructionScreen Class
    var GUIInstructionScreen = (function (_super) {
        __extends(GUIInstructionScreen, _super);
        // Constructor simply calls the super class constructor
        function GUIInstructionScreen(stage) {
            _super.call(this, stage);
            this.intro = [
                "To play the game you must navigate your",
                "character - Steve, through a series of obstacles",
                "on the map and get him to the exit.",
                "Along the way, Steve will have to battle hordes",
                "of zombies.",
                "Steve's survival is in your hands!"
            ];
            this.instructions = {
                AKey: { x: 128, y: 352 },
                LeftArrowKey: { x: 160, y: 352 },
                LeftText: { x: 288, y: 352, text: "Move Steve Left" },
                DKey: { x: 128, y: 416 },
                RightArrowKey: { x: 160, y: 416 },
                RightText: { x: 288, y: 416, text: "Move Steve Right" },
                WKey: { x: 128, y: 480 },
                UpArrowKey: { x: 160, y: 480 },
                JumpText: { x: 288, y: 480, text: "Make Steve Jump" },
                SpaceBar: { x: 64, y: 544 },
                AttackText: { x: 288, y: 544, text: "Make Steve Slash With His Sword" }
            };
            this.instructionsList = [
                "AKey",
                "LeftArrowKey",
                "LeftText",
                "DKey",
                "RightArrowKey",
                "RightText",
                "WKey",
                "UpArrowKey",
                "JumpText",
                "SpaceBar",
                "AttackText"
            ];
        }
        /*
        * Initializes all the instruction screen data.
        */
        GUIInstructionScreen.prototype.init = function () {
            var theStage = this.stage;

            var textLine, index, textSize = 32;

            for (index = 0; index < this.intro.length; index++) {
                textLine = new createjs.Text();
                textLine.font = textSize + "px Minecrafter";
                textLine.text = this.intro[index];
                textLine.x = 128;
                textLine.y = 64 + (textSize * index);
                this.screenObjects.push(textLine);
            }
            textLine.color = "#ff0000";

            var resourceName, instructionData, resource;
            for (index = 0; index < this.instructionsList.length; index++) {
                resourceName = this.instructionsList[index];
                instructionData = this.instructions[resourceName];
                if (instructionData.text) {
                    resource = new createjs.Text();
                    resource.font = textSize + "px Minecrafter";
                    resource.text = instructionData.text;
                } else {
                    resource = new createjs.Sprite(Managers.Assets.guiComponents, resourceName);
                }
                resource.x = instructionData.x;
                resource.y = instructionData.y;
                this.screenObjects.push(resource);
            }
            var btnX = Constants.SCREEN_WIDTH - 240, btnY = Constants.SCREEN_HEIGHT - 128;
            var btn = new GameObjects.Button("Back", 160, 64, btnX, btnY, GameObjects.Button.ROUNDED, "black", "#5533DD", "rgba(100, 60, 200, 0.8)");
            btn.setFadeEffect();
            btn.setClickHandler(function () {
                var event = new createjs.Event("backButtonClicked", true, false);
                theStage.dispatchEvent(event);
            });
            this.screenObjects.push(btn);
        };

        // Shows the victory screen
        GUIInstructionScreen.prototype.show = function () {
            _super.prototype.show.call(this);
        };
        return GUIInstructionScreen;
    })(GUIScreen.Screen);
    GUIScreen.GUIInstructionScreen = GUIInstructionScreen;
})(GUIScreen || (GUIScreen = {}));
//# sourceMappingURL=GUIInstructionScreen.js.map
