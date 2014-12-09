﻿/**
* This file contains game's GUI manager
* Author:              Konstantin Koton
* Filename:            GUI.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:
*      v1 - Migrated file to Project 1
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

            //           this.instructionScreen.addChild(this.map);
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
        };

        // Sets internal reference to the stage object
        GUI.prototype.setStage = function (stage) {
            this.stage = stage;
        };

        // Sets internal reference to sky object
        GUI.prototype.setSky = function (sky) {
            this.sky = sky;
        };

        // Sets internal reference to clouds object
        GUI.prototype.setCloudManager = function (clouds) {
            this.clouds = clouds;
        };

        // Sets internal reference to map object
        GUI.prototype.setMap = function (map) {
            this.map = map;
        };

        // Sets internal reference to player object
        GUI.prototype.setPlayer = function (player) {
            this.player = player;
        };

        // Sets internal reference to Mob Manager object
        GUI.prototype.setMobManager = function (mobs) {
            this.mobs = mobs;
        };

        // Sets internal reference to Objects Manager object
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
        *
        */
        GUI.prototype.changeInventory = function (slot, item) {
            this.gameScreen.changeInventory(slot, item);
        };

        //
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
            }
        };
        return GUI;
    })();
    Managers.GUI = GUI;
})(Managers || (Managers = {}));
//# sourceMappingURL=GUI.js.map
