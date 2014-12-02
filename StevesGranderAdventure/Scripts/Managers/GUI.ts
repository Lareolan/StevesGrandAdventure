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

        preloadScreen: GameObjects.GUIPreloadScreen;
        startScreen: GameObjects.GUIStartScreen;
        instructionScreen: GameObjects.GUIInstructionScreen;
        gameScreen: GameObjects.GUIGameScreen;
        deathScreen: GameObjects.GUIDeathScreen;
        victoryScreen: GameObjects.GUIVictoryScreen;
        activeScreen: GameObjects.Screen;

        // Fix squiggly lines, not actually used
        instance: any;
        gui: any;


        // Initializes preload screen
        constructor(stage: createjs.Stage) {
            this.stage = stage;

            this.preloadScreen = new GameObjects.GUIPreloadScreen(this.stage);
            this.activeScreen = this.preloadScreen;

            this.startScreen = new GameObjects.GUIStartScreen(this.stage);
            this.instructionScreen = new GameObjects.GUIInstructionScreen(this.stage);
            this.gameScreen = new GameObjects.GUIGameScreen(this.stage/*, this.player*/);
            this.deathScreen = new GameObjects.GUIDeathScreen(this.stage);
            this.victoryScreen = new GameObjects.GUIVictoryScreen(this.stage);
//            this.init();
        }

        // Initializes all other game screens
        init() {
/*
            this.preloadScreen = new GameObjects.GUIPreloadScreen(this.stage);
            this.activeScreen = this.preloadScreen;

            this.startScreen = new GameObjects.GUIStartScreen(this.stage);
            this.instructionScreen = new GameObjects.GUIInstructionScreen(this.stage);
            this.gameScreen = new GameObjects.GUIGameScreen(this.stage, this.player);
            this.deathScreen = new GameObjects.GUIDeathScreen(this.stage);
            this.victoryScreen = new GameObjects.GUIVictoryScreen(this.stage);
*/

            // Initialize Start Screen
            this.startScreen.addChild(this.sky);
            this.startScreen.addChild(this.clouds);
            this.startScreen.addChild(this.map);
            this.startScreen.init();
//            this.startScreen.show();

            // Initialize Instructions Screen
            this.instructionScreen.addChild(this.sky);
            this.instructionScreen.addChild(this.clouds);
 //           this.instructionScreen.addChild(this.map);
            this.instructionScreen.init();
            //            this.instructionScreen.show();

            // Initialize Game Screen
            this.gameScreen.setPlayer(this.player);
            this.gameScreen.addChild(this.sky);
            this.gameScreen.addChild(this.clouds);
            this.gameScreen.addChild(this.map);
            this.gameScreen.addChild(this.gameObjects);
            this.gameScreen.addChild(this.mobs);
            this.gameScreen.addChild(this.player);
            this.gameScreen.init();
//            this.gameScreen.show();

            // Initialize Death Screen
            this.deathScreen.addChild(this.sky);
            this.deathScreen.addChild(this.clouds);
            this.deathScreen.init();
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

        // Handle player being hit by a mob
        playerHit(e: Event) {
            this.gui.gameScreen.playerHit(this.gui.stage, this.gui.gameScreen);
        }

/*
        // Handle player being killed, switch game state to dead state
        playerDeath(e: Event): void {
            gameState = constants.GAME_STATE_DEATH;
            this.player.die();
            this.gui.display(Constants.GAME_STATE_DEATH);
        }
*/

        // Show appropriate screen depending on game state
        // used when switching states, takes a game state as a parameter
        show(gameState: number): void {
            switch (gameState) {
                // Hide current screen, and display game instructions screen
                case constants.GAME_STATE_INSTRUCTIONS:
                    this.activeScreen.hide();

//                    this.instructionScreen.addChild(sky.getImage());
//                    this.instructionScreen.addChildArray(cloudManager.getImages());

                    this.instructionScreen.init();
                    this.activeScreen = this.instructionScreen;
                    this.activeScreen.show();
                    break;

                // Hide current screen, and display game start screen
                case constants.GAME_STATE_START:
                    this.activeScreen.hide();
                    this.activeScreen = this.startScreen;
                    this.activeScreen.show();
                    break;

                // Hide current screen, and display game over screen
                case constants.GAME_STATE_DEATH:
                    this.activeScreen.hide();

//                    this.deathScreen.addChild(sky.getImage());
//                    this.deathScreen.addChildArray(cloudManager.getImages());

//                    this.deathScreen.init(this.player.getKillcount());
//                    this.activeScreen = this.deathScreen;
                    this.activeScreen.show();
                    break;

                // Hide current screen, and display game victory screen
                case constants.GAME_STATE_VICTORY:
                    this.activeScreen.hide();

//                    this.victoryScreen.addChild(sky.getImage());
//                    this.victoryScreen.addChildArray(cloudManager.getImages());

                    this.victoryScreen.init(this.player.getKillcount(), worldTimer);
//                    this.activeScreen = this.victoryScreen;
                    this.activeScreen.show();
                    break;

                // Hide current screen, and display game play screen
                case constants.GAME_STATE_PLAY:
                    worldTimer = new Date().getTime();
                    this.activeScreen.hide();

//                    this.gameScreen.addChild(sky.getImage());
//                    this.gameScreen.addChildArray(cloudManager.getImages());
//                    this.gameScreen.addChild(map.getImage());

                    this.activeScreen = this.gameScreen;
                    this.activeScreen.show();
                    break;

            }
        }

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
            }
        }
    }
} 