/**
 * This file contains the game's game play screen object
 * Author:              Konstantin Koton
 * Filename:            GUIGameScreen.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 */
module GameObjects {
    // GUIGameScreen Class
    export class GUIGameScreen extends GameObjects.Screen {
        // Instance variables
        healthBar: createjs.Sprite;
        healthSprites: Array<createjs.Sprite>;
        hitShape: createjs.Shape;
        player: GameObjects.Player;
        killDisplay: createjs.Text;
        lastKillCount: number;

        // Initializes the game play screen's GUI components such as player's health
        // and kill count display objects.
        constructor(stage: createjs.Stage, player: GameObjects.Player) {
            super(stage);
            this.healthSprites = [];
            this.player = player;
        }

        init(): void {
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
        }

        // Shows the victory screen
        show() {
            super.show();
        }

        // Resets the game play screen back to initial state
        reset(): void {
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
*/
        }

        // Updates the player's health display and kill count
        update() {
            var health = this.player.getHealth();

            if ((health < this.healthSprites.length) && (health >= 0)) {
                for (var i = this.healthSprites.length - 1; i >= health; i--) {
//                    stage.removeChild(this.healthSprites[i]);
                    this.stage.removeChild(this.healthSprites[i]);
                    this.healthSprites.length = i;
                }
            }

            if (this.lastKillCount != this.player.getKillcount()) {
                this.lastKillCount = this.player.getKillcount();
                this.killDisplay.text = "Kill Count: " + this.lastKillCount;
//                stage.update();
            }
        }

        // When the player is hit, flash the screen with a red overlay for 100ms
        playerHit(stage: createjs.Stage, instance: GameObjects.GUIGameScreen) {
            stage.addChild(instance.hitShape);
            setTimeout(function () {
                this.stage.removeChild(instance.hitShape);
//                stage.update();
            }, 100);
            
        }
    }
} 