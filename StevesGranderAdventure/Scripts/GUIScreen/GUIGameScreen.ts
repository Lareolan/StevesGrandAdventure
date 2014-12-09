/**
 * This file contains the game's game play screen object
 * Author:              Konstantin Koton
 * Filename:            GUIGameScreen.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 *      v2 - Moved class into GUIScreen module
 *      v3 - Changed healthBar and hitShape to use visible property rather than add/remove from Stage
 *      v4 - Added inventory for food pickups
 *      v5 - Added code to change inventory images based on player's actual inventory
 *      v6 - Added score display
 */
module GUIScreen {
    // GUIGameScreen Class
    export class GUIGameScreen extends GUIScreen.Screen {
        // Instance variables
        healthSprites: Array<createjs.Sprite>;
        hitShape: createjs.Shape;
        player: GameObjects.Player;
        killDisplay: createjs.Text;
        scoreDisplay: createjs.Text;
        lastKillCount: number;
        lastScore: number;
        playerHealth: number;
        quickBar: createjs.Sprite;
        inventorySprites: Array<createjs.Sprite>;

        // Initializes the game play screen's GUI components such as player's health
        // and kill count display objects.
        constructor(stage: createjs.Stage) {
            super(stage);
            this.healthSprites = [];
            this.inventorySprites = [];
            this.playerHealth = Constants.PLAYER_MAX_HEALTH;
        }

        init(): void {
//            this.healthBar = new createjs.Sprite(Managers.Assets.guiComponents, "MeterBackground");
            this.quickBar = new createjs.Sprite(Managers.Assets.guiComponents, "QuickBar");
            this.quickBar.x = Constants.HALF_SCREEN_WIDTH - this.quickBar.getBounds().width / 2;
//            this.healthBar.y = 640;
            this.quickBar.y = Constants.SCREEN_HEIGHT - this.quickBar.getBounds().height;
            this.quickBar.name = "Health Bar";
            this.screenObjects.push(this.quickBar);

            for (var i = 0; i < 10; i++) {
                this.healthSprites[i] = new createjs.Sprite(Managers.Assets.guiComponents, "FullHeart");
//                this.healthSprites[i].x = Constants.HALF_SCREEN_WIDTH - 160 + (32 * i);
//                this.healthSprites[i].y = 640;
                this.healthSprites[i].x = this.quickBar.x + (this.healthSprites[i].getBounds().width * i);
                this.healthSprites[i].y = this.quickBar.y - this.healthSprites[i].getBounds().height - 1;
                this.healthSprites[i].name = "Full Heart";
                this.screenObjects.push(this.healthSprites[i]);
            }

            this.hitShape = new createjs.Shape();
            this.hitShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(0, 0, Constants.SCREEN_WIDTH, Constants.SCREEN_HEIGHT - 32);
            this.hitShape.visible = false;
            this.screenObjects.push(this.hitShape);

            this.killDisplay = new createjs.Text();
            this.killDisplay.font = "32px Minecrafter";
            this.killDisplay.text = "Kill Count: 0";
            this.killDisplay.y = 640 + 16 + 64 + 16;
            this.killDisplay.textBaseline = "middle";
            this.killDisplay.name = "Kill Display";
            this.screenObjects.push(this.killDisplay);

            var inventoryItemWidth = Math.floor(this.quickBar.getBounds().width / 9);
            for (var i = 0; i < 9; i++) {
                this.inventorySprites[i] = new createjs.Sprite(Managers.Assets.guiComponents, "FullFood");
                this.inventorySprites[i].x = this.quickBar.x + 9 + (inventoryItemWidth * i);
                this.inventorySprites[i].y = this.quickBar.y + 9;
                this.inventorySprites[i].name = "QuickBar Slot " + i;
                this.inventorySprites[i].visible = false;
                this.screenObjects.push(this.inventorySprites[i]);
            }

            this.scoreDisplay = new createjs.Text();
            this.scoreDisplay.font = "32px Minecrafter";
            this.scoreDisplay.text = "Score: 0";
            this.scoreDisplay.x = Constants.SCREEN_WIDTH;
            this.scoreDisplay.y = 640 + 16 + 64 + 16;
            this.scoreDisplay.textBaseline = "middle";
            this.scoreDisplay.textAlign = "right";
            this.scoreDisplay.name = "Score Display";
            this.screenObjects.push(this.scoreDisplay);
        }

        // Sets internal reference to player object
        setPlayer(player: GameObjects.Player): void {
            this.player = player;
        }

        // Resets the game play screen back to initial state
        reset(): void {
            this.killDisplay.text = "Kill Count: 0";
            this.scoreDisplay.text = "Score: 0";
            this.playerHealth = this.player.getHealth();

            var i;
            for (i = 0; i < this.healthSprites.length; i++) {
                this.healthSprites[i].visible = true;
            }
            for (i = 0; i < this.inventorySprites.length; i++) {
                this.inventorySprites[i].visible = false;
            }
        }

        // Updates the player's health display and kill count
        update() {
            var health = this.player.getHealth();

            if ((health < this.playerHealth) && (health >= 0)) {
                for (var i = (this.playerHealth - 1); i >= health; i--) {
                    this.healthSprites[i].visible = false;
                }
                this.playerHealth = health;
            } else if ((health > this.playerHealth) && (this.playerHealth > 0)) {
                for (var i = (this.playerHealth - 1); i < health; i++) {
                    this.healthSprites[i].visible = true;
                }
                this.playerHealth = health;
            }

            if (this.lastKillCount != this.player.getKillCount()) {
                this.lastKillCount = this.player.getKillCount();
                this.killDisplay.text = "Kill Count: " + this.lastKillCount;
            }

            if (this.lastScore != this.player.getScore()) {
                this.lastScore = this.player.getScore();
                this.scoreDisplay.text = "Score: " + this.lastScore;
            }

            for (var i = 0; i < this.inventorySprites.length; i++) {
                if ((!this.inventorySprites[i].visible) && (this.player.inventory[i] !== Constants.ITEM.EMPTY)) {
                    this.changeInventory(i, this.player.inventory[i]);
                }
            }
        }

        // When the player is hit, flash the screen with a red overlay for 100ms
        playerHit(/*stage: createjs.Stage, instance: GUIScreen.GUIGameScreen*/): void {
            var hitShape = this.hitShape;
            hitShape.visible = true;
//            stage.addChild(instance.hitShape);
            setTimeout(function () {
                hitShape.visible = false;
//                stage.removeChild(instance.hitShape);
            }, 100);
        }

        /**
         * 
         */
        changeInventory(slot: number, item: number): void {
            if (slot > this.inventorySprites.length) {
                return;
            }

            if (item === Constants.ITEM.EMPTY) {
                this.inventorySprites[slot].visible = false;
            } else {
                switch (item) {
                    case Constants.ITEM.FOOD:
                        this.inventorySprites[slot].gotoAndStop("FullFood");
                        break;
                }
                this.inventorySprites[slot].visible = true;
            }
        }
    }
} 