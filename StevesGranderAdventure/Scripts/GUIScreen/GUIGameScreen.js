﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This file contains the game's game play screen object
* Author:              Konstantin Koton
* Filename:            GUIGameScreen.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:
*      v1 - Migrated file to Project 1
*      v2 - Moved class into GUIScreen module
*/
var GUIScreen;
(function (GUIScreen) {
    // GUIGameScreen Class
    var GUIGameScreen = (function (_super) {
        __extends(GUIGameScreen, _super);
        // Initializes the game play screen's GUI components such as player's health
        // and kill count display objects.
        function GUIGameScreen(stage /*, player: GameObjects.Player*/ ) {
            _super.call(this, stage);
            this.healthSprites = [];
            //            this.player = player;
        }
        GUIGameScreen.prototype.init = function () {
            this.healthBar = new createjs.Sprite(Managers.Assets.guiComponents, "MeterBackground");
            this.healthBar.x = Constants.HALF_SCREEN_WIDTH - 160;
            this.healthBar.y = 640;
            this.healthBar.name = "Health Bar";

            //            stage.addChild(this.healthBar);
            this.screenObjects.push(this.healthBar);

            for (var i = 0; i < 10; i++) {
                this.healthSprites[i] = new createjs.Sprite(Managers.Assets.guiComponents, "FullHeart");
                this.healthSprites[i].x = Constants.HALF_SCREEN_WIDTH - 160 + (32 * i);
                this.healthSprites[i].y = 640;
                this.healthSprites[i].name = "Full Heart";

                //                stage.addChild(this.healthSprites[i]);
                this.screenObjects.push(this.healthSprites[i]);
            }

            this.hitShape = new createjs.Shape();
            this.hitShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(0, 0, Constants.SCREEN_WIDTH, Constants.SCREEN_HEIGHT - 32);

            this.killDisplay = new createjs.Text();
            this.killDisplay.font = "32px Minecrafter";
            this.killDisplay.text = "Kill Count: 0";
            this.killDisplay.y = 640 + 16;
            this.killDisplay.textBaseline = "middle";
            this.killDisplay.name = "Kill Display";

            //            stage.addChild(this.killDisplay);
            this.screenObjects.push(this.killDisplay);
        };

        // Sets internal reference to player object
        GUIGameScreen.prototype.setPlayer = function (player) {
            this.player = player;
        };

        // Shows the victory screen
        //        show() {
        //            super.show();
        //        }
        // Resets the game play screen back to initial state
        GUIGameScreen.prototype.reset = function () {
            this.killDisplay.text = "Kill Count: 0";

            for (var i = 0; i < 10; i++) {
                this.stage.addChild(this.healthSprites[i]);
            }
            //            this.init();
            /*
            this.healthBar.x = Constants.HALF_SCREEN_WIDTH - 160;
            this.healthBar.y = 640;
            this.healthBar.name = "Health Bar";
            stage.addChild(this.healthBar);
            
            for (var i = 0; i < 10; i++) {
            this.healthSprites[i] = new createjs.Sprite(Managers.Assets.guiComponents, "FullHeart");
            this.healthSprites[i].x = (stage.canvas.width / 2) - 160 + (32 * i);
            this.healthSprites[i].y = 640;
            this.healthSprites[i].name = "Full Heart";
            stage.addChild(this.healthSprites[i]);
            }
            
            this.hitShape = new createjs.Shape();
            this.hitShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(0, 0, stage.canvas.width, stage.canvas.height - 32);
            
            this.killDisplay.font = "32px Minecrafter";
            this.killDisplay.text = "Kill Count: 0";
            this.killDisplay.y = 640 + 16;
            this.killDisplay.textBaseline = "middle";
            this.killDisplay.name = "Kill Display";
            stage.addChild(this.killDisplay);
            //*/
        };

        // Updates the player's health display and kill count
        GUIGameScreen.prototype.update = function () {
            var health = this.player.getHealth();

            if ((health < this.healthSprites.length) && (health >= 0)) {
                for (var i = this.healthSprites.length - 1; i >= health; i--) {
                    //                    stage.removeChild(this.healthSprites[i]);
                    this.stage.removeChild(this.healthSprites[i]);
                    //                    this.healthSprites.length = i;
                }
            }

            if (this.lastKillCount != this.player.getKillCount()) {
                this.lastKillCount = this.player.getKillCount();
                this.killDisplay.text = "Kill Count: " + this.lastKillCount;
                //                stage.update();
            }
        };

        // When the player is hit, flash the screen with a red overlay for 100ms
        GUIGameScreen.prototype.playerHit = function (stage, instance) {
            stage.addChild(instance.hitShape);
            setTimeout(function () {
                stage.removeChild(instance.hitShape);
                //                stage.update();
            }, 100);
        };
        return GUIGameScreen;
    })(GUIScreen.Screen);
    GUIScreen.GUIGameScreen = GUIGameScreen;
})(GUIScreen || (GUIScreen = {}));
//# sourceMappingURL=GUIGameScreen.js.map