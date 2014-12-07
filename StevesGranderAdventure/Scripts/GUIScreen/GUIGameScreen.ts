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
module GUIScreen {
    // GUIGameScreen Class
    export class GUIGameScreen extends GUIScreen.Screen {
        // Instance variables
        healthBar: createjs.Sprite;
        healthSprites: Array<createjs.Sprite>;
        hitShape: createjs.Shape;
        player: GameObjects.Player;
        killDisplay: createjs.Text;
        lastKillCount: number;
        playerHealth: number;

        // Initializes the game play screen's GUI components such as player's health
        // and kill count display objects.
        constructor(stage: createjs.Stage) {
            super(stage);
            this.healthSprites = [];
            this.playerHealth = Constants.PLAYER_MAX_HEALTH;
        }

        init(): void {
            this.healthBar = new createjs.Sprite(Managers.Assets.guiComponents, "MeterBackground");
            this.healthBar.x = Constants.HALF_SCREEN_WIDTH - 160;
            this.healthBar.y = 640;
            this.healthBar.name = "Health Bar";
            this.screenObjects.push(this.healthBar);

            for (var i = 0; i < 10; i++) {
                this.healthSprites[i] = new createjs.Sprite(Managers.Assets.guiComponents, "FullHeart");
                this.healthSprites[i].x = Constants.HALF_SCREEN_WIDTH - 160 + (32 * i);
                this.healthSprites[i].y = 640;
                this.healthSprites[i].name = "Full Heart";
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
            this.screenObjects.push(this.killDisplay);
        }

        // Sets internal reference to player object
        setPlayer(player: GameObjects.Player): void {
            this.player = player;
        }

        // Resets the game play screen back to initial state
        reset(): void {
            this.killDisplay.text = "Kill Count: 0";

            for (var i = 0; i < 10; i++) {
                this.stage.addChild(this.healthSprites[i]);
            }
        }

        // Updates the player's health display and kill count
        update() {
            var health = this.player.getHealth();

            if ((health < this.playerHealth) && (health >= 0)) {
                for (var i = (this.playerHealth - 1); i >= health; i--) {
                    this.stage.removeChild(this.healthSprites[i]);
                }
                this.playerHealth = health;
            } else if (health > this.playerHealth) {
                for (var i = (this.playerHealth - 1); i < health; i++) {
                    this.stage.addChild(this.healthSprites[i]);
                }
                this.playerHealth = health;
            }

            if (this.lastKillCount != this.player.getKillCount()) {
                this.lastKillCount = this.player.getKillCount();
                this.killDisplay.text = "Kill Count: " + this.lastKillCount;
            }
        }

        // When the player is hit, flash the screen with a red overlay for 100ms
        playerHit(stage: createjs.Stage, instance: GUIScreen.GUIGameScreen): void {
            stage.addChild(instance.hitShape);
            setTimeout(function () {
                stage.removeChild(instance.hitShape);
            }, 100);
        }
    }
} 