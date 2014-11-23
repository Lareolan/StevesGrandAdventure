/**
* This file contains game's GUI manager
* Author:              Konstantin Koton
* Filename:            GUI.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:    Too numerous to mention
*/
var Managers;
(function (Managers) {
    // The GUI manager class
    var GUI = (function () {
        // Initializes preload screen (not yet used, will be in v2)
        function GUI(canvas) {
            this.preloadScreen = new GameObjects.GUIPreloadScreen();
            this.activeScreen = this.preloadScreen;
        }
        // Initializes all other game screens
        GUI.prototype.preloadComplete = function () {
            this.startScreen = new GameObjects.GUIStartScreen();
            this.instructionScreen = new GameObjects.GUIInstructionScreen();
            this.gameScreen = new GameObjects.GUIGameScreen(player);
            this.deathScreen = new GameObjects.GUIDeathScreen();
            this.victoryScreen = new GameObjects.GUIVictoryScreen();
        };

        // Sets internal reference to player object
        GUI.prototype.setPlayer = function (player) {
            this.player = player;
        };

        // Sets internal reference to the stage object
        GUI.prototype.setStage = function (stage) {
            this.stage = stage;
        };

        // Update GUI elements (At the moment only updates health and kill count)
        GUI.prototype.update = function () {
            this.gameScreen.update();
        };

        // Handle player being hit by a mob
        GUI.prototype.playerHit = function (e) {
            this.gui.gameScreen.playerHit(this.gui.stage, this.gui.gameScreen);
        };

        // Handle player being killed, switch game state to dead state
        GUI.prototype.playerDeath = function (e) {
            gameState = constants.GAME_STATE_DEATH;
            this.player.die();
            this.gui.show(constants.GAME_STATE_DEATH);
        };

        // Show appropriate screen depending on game state
        // used when switching states, takes a game state as a parameter
        GUI.prototype.show = function (gameState) {
            switch (gameState) {
                case constants.GAME_STATE_INSTRUCTIONS:
                    this.activeScreen.hide();

                    this.instructionScreen.addChild(sky.getImage());
                    this.instructionScreen.addChildArray(cloudManager.getImages());

                    this.instructionScreen.init();
                    this.activeScreen = this.instructionScreen;
                    this.activeScreen.show();
                    break;

                case constants.GAME_STATE_START:
                    this.activeScreen.hide();
                    this.activeScreen = this.startScreen;
                    this.activeScreen.show();
                    break;

                case constants.GAME_STATE_DEATH:
                    this.activeScreen.hide();

                    this.deathScreen.addChild(sky.getImage());
                    this.deathScreen.addChildArray(cloudManager.getImages());

                    this.deathScreen.init(this.player.getKillcount());
                    this.activeScreen = this.deathScreen;
                    this.activeScreen.show();
                    break;

                case constants.GAME_STATE_VICTORY:
                    this.activeScreen.hide();

                    this.victoryScreen.addChild(sky.getImage());
                    this.victoryScreen.addChildArray(cloudManager.getImages());

                    this.victoryScreen.init(this.player.getKillcount(), worldTimer);
                    this.activeScreen = this.victoryScreen;
                    this.activeScreen.show();
                    break;

                case constants.GAME_STATE_PLAY:
                    worldTimer = new Date().getTime();
                    this.activeScreen.hide();

                    this.gameScreen.addChild(sky.getImage());
                    this.gameScreen.addChildArray(cloudManager.getImages());
                    this.gameScreen.addChild(map.getImage());

                    this.activeScreen = this.gameScreen;
                    this.activeScreen.show();
                    break;
            }
        };
        return GUI;
    })();
    Managers.GUI = GUI;
})(Managers || (Managers = {}));
//# sourceMappingURL=GUI.js.map
