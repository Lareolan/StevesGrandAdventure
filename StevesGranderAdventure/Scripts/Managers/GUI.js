/**
* This file contains game's GUI manager
* Author:              Konstantin Koton
* Filename:            GUI.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Dec. 9, 2014
* Revision History:
*      v1 - Migrated file to Project 1
*      v2 - Completely reworked how screens are displayed
*      v3 - Added Transition screen for level transitions
*/
var Managers;
(function (Managers) {
    // The GUI manager class
    var GUI = (function () {
        // Initializes preload screen
        function GUI(stage) {
            this.stage = stage;

            this.preloadScreen = new GUIScreen.GUIPreloadScreen(this.stage);
            this.activeScreen = this.preloadScreen;

            this.startScreen = new GUIScreen.GUIStartScreen(this.stage);
            this.instructionScreen = new GUIScreen.GUIInstructionScreen(this.stage);
            this.gameScreen = new GUIScreen.GUIGameScreen(this.stage);
            this.deathScreen = new GUIScreen.GUIDeathScreen(this.stage);
            this.victoryScreen = new GUIScreen.GUIVictoryScreen(this.stage);
            this.transitionScreen = new GUIScreen.GUITransitionScreen(this.stage);
        }
        // Initializes all other game screens
        GUI.prototype.init = function () {
            // Initialize Start Screen
            this.startScreen.addChild(this.sky);
            this.startScreen.addChild(this.clouds);
            this.startScreen.addChild(this.map);
            this.startScreen.init();

            // Initialize Instructions Screen
            this.instructionScreen.addChild(this.sky);
            this.instructionScreen.addChild(this.clouds);
            this.instructionScreen.init();

            // Initialize Game Screen
            this.gameScreen.setPlayer(this.player);
            this.gameScreen.addChild(this.sky);
            this.gameScreen.addChild(this.clouds);
            this.gameScreen.addChild(this.map);
            this.gameScreen.addChild(this.gameObjects);
            this.gameScreen.addChild(this.mobs);
            this.gameScreen.addChild(this.player);
            this.gameScreen.init();

            // Initialize Death Screen
            this.deathScreen.addChild(this.sky);
            this.deathScreen.addChild(this.clouds);
            this.deathScreen.init();

            // Initialize Victory Screen
            this.victoryScreen.addChild(this.sky);
            this.victoryScreen.addChild(this.clouds);
            this.victoryScreen.init();

            // Initialize transition screen
            this.transitionScreen.addChild(this.sky);
            this.transitionScreen.addChild(this.clouds);
            this.transitionScreen.init();
        };

        /**
        * Sets internal reference to the stage object
        * @param stage The stage object reference to set
        */
        GUI.prototype.setStage = function (stage) {
            this.stage = stage;
        };

        /**
        * Sets internal reference to the sky object
        * @param sky The sky object reference to set
        */
        GUI.prototype.setSky = function (sky) {
            this.sky = sky;
        };

        /**
        * Sets internal reference to the Cloud Manager object
        * @param clouds The Cloud Manager object reference to set
        */
        GUI.prototype.setCloudManager = function (clouds) {
            this.clouds = clouds;
        };

        /**
        * Sets internal reference to the map object
        * @param map The map object reference to set
        */
        GUI.prototype.setMap = function (map) {
            this.map = map;
        };

        /**
        * Sets internal reference to the player object
        * @param player The player object reference to set
        */
        GUI.prototype.setPlayer = function (player) {
            this.player = player;
        };

        /**
        * Sets internal reference to the Mobs Manager object
        * @param mobs The Mobs Manager object reference to set
        */
        GUI.prototype.setMobManager = function (mobs) {
            this.mobs = mobs;
        };

        /**
        * Sets internal reference to the Object Manager object
        * @param gameObjects The Objects Manager object reference to set
        */
        GUI.prototype.setGameObjects = function (gameObjects) {
            this.gameObjects = gameObjects;
        };

        // Update GUI elements (At the moment only updates health and kill count)
        GUI.prototype.update = function () {
            this.gameScreen.update();
        };

        /**
        * Handle player being hit by a mob (Flashes the screen red briefly to indicate damage,
        * the rest of the event was already handled elsewhere).
        * @param e The event that fired
        */
        GUI.prototype.playerHit = function (e) {
            this.gui.gameScreen.playerHit();
        };

        /**
        * Calls the game screen's changeInventory function to change inventory display
        * @param slot Which slot to set
        * @param item The item to set that slot to
        */
        GUI.prototype.changeInventory = function (slot, item) {
            this.gameScreen.changeInventory(slot, item);
        };

        /**
        * This function loads and displays the specific screen based on the state machine.
        * @param gameState The current state of the game's state machine
        */
        GUI.prototype.display = function (gameState) {
            switch (gameState) {
                case Constants.GAME_STATE_PRELOAD:
                    this.activeScreen.hide();
                    this.activeScreen = this.preloadScreen;
                    this.activeScreen.show();
                    break;
                case Constants.GAME_STATE_START:
                    this.activeScreen.hide();
                    this.activeScreen = this.startScreen;
                    this.activeScreen.show();
                    break;
                case Constants.GAME_STATE_INSTRUCTIONS:
                    this.activeScreen.hide();
                    this.activeScreen = this.instructionScreen;
                    this.activeScreen.show();
                    break;
                case Constants.GAME_STATE_PLAY:
                    this.activeScreen.hide();
                    this.activeScreen = this.gameScreen;
                    this.activeScreen.show();
                    break;
                case Constants.GAME_STATE_DEATH:
                    this.activeScreen.hide();
                    this.activeScreen = this.deathScreen;
                    this.activeScreen.show();
                    break;
                case Constants.GAME_STATE_VICTORY:
                    this.activeScreen.hide();
                    this.activeScreen = this.victoryScreen;
                    this.activeScreen.show();
                    break;
                case Constants.GAME_STATE_TRANSITION:
                    this.activeScreen.hide();
                    this.activeScreen = this.transitionScreen;
                    this.activeScreen.show();
                    break;
            }
        };
        return GUI;
    })();
    Managers.GUI = GUI;
})(Managers || (Managers = {}));
//# sourceMappingURL=GUI.js.map
