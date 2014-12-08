/**
 * This file contains game's GUI manager
 * Author:              Konstantin Koton
 * Filename:            GUI.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 */
module Managers {
    // The GUI manager class
    export class GUI {
        // Instance variables
        stage: createjs.Stage;
         
        sky: GameObjects.Sky;
        clouds: Managers.CloudManager;
        map: GameObjects.GameMap;
        player: GameObjects.Player;
        mobs: Managers.Mobs;
        gameObjects: Managers.Objects;

        preloadScreen: GUIScreen.GUIPreloadScreen;
        startScreen: GUIScreen.GUIStartScreen;
        instructionScreen: GUIScreen.GUIInstructionScreen;
        gameScreen: GUIScreen.GUIGameScreen;
        deathScreen: GUIScreen.GUIDeathScreen;
        victoryScreen: GUIScreen.GUIVictoryScreen;
        activeScreen: GUIScreen.Screen;

        // Fix squiggly lines, not actually used
        instance: any;
        gui: any;


        // Initializes preload screen
        constructor(stage: createjs.Stage) {
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
        init() {
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
        }

        // Sets internal reference to the stage object
        setStage(stage: createjs.Stage): void {
            this.stage = stage;
        }

        // Sets internal reference to sky object
        setSky(sky: GameObjects.Sky): void {
            this.sky = sky;
        }

        // Sets internal reference to clouds object
        setCloudManager(clouds: Managers.CloudManager): void {
            this.clouds = clouds;
        }

        // Sets internal reference to map object
        setMap(map: GameObjects.GameMap): void {
            this.map = map;
        }

        // Sets internal reference to player object
        setPlayer(player: GameObjects.Player): void {
            this.player = player;
        }

        // Sets internal reference to Mob Manager object
        setMobManager(mobs: Managers.Mobs): void {
            this.mobs = mobs;
        }

        // Sets internal reference to Objects Manager object
        setGameObjects(gameObjects: Managers.Objects): void {
            this.gameObjects = gameObjects;
        }

        // Update GUI elements (At the moment only updates health and kill count)
        update(): void {
            this.gameScreen.update();
        }

        /**
         * Handle player being hit by a mob (Flashes the screen red briefly to indicate damage,
         * the rest of the event was already handled elsewhere).
         * @param e The event that fired
         */
        playerHit(e: Event) {
            this.gui.gameScreen.playerHit(/*this.gui.stage, this.gui.gameScreen*/);
        }

        //
        display(gameState: number): void {
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
        }
    }
} 