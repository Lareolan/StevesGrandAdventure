/**
 * This file contains game initialization code, input code, primary game loop and pretty much runs the game.
 * Author:              Konstantin Koton
 * Filename:            MainGame.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Dec. 9, 2014
 * Revision History:    
 *      v1 - Created initial framework for the new class.
 *      v2 - Moved all game functionality code into this class and made the game work fully again.
 *      v3 - Implemented the ability to go to the next level.
 */

class MainGame {
    // The primary stage
    stage: createjs.Stage;

    // Game object instances
    gui: Managers.GUI;
    sound: Managers.Sound;
    sky: GameObjects.Sky;
    clouds: Managers.CloudManager;
    map: GameObjects.GameMap;
    player: GameObjects.Player;
    mobs: Managers.Mobs;
    gameObjects: Managers.Objects;

    // Game variables
    gameState: number;
    changeGameState: number;
    worldTimer: number;
    currentLevel: number;

    // Fix squiggly lines, not actually used
    instance: MainGame;

    /**
     * Constructor simply initializes level, creates the primary stage object from the canvas passed as parameter
     * and calls primary game init() function.
     * @param canvas The canvas HTML element to render all our graphics onto.
     */
    constructor(canvas: Element) {
        this.stage = new createjs.Stage(canvas);
        this.currentLevel = 0;
        this.init();
    }

    /**
     * This function initializes the primary game objects, sets up the pre-loader, ticker, bind keyboard event handlers
     * and other primary event handlers for button presses.
     */
    init() {
        // Initialize the GUI object
        this.gui = new Managers.GUI(this.stage);
        this.stage.addEventListener("preloadComplete", { handleEvent: this.preloadComplete, instance: this });
        this.stage.enableMouseOver(20);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", { handleEvent: this.gameLoop, instance: this });
        this.gameState = Constants.GAME_STATE_PRELOAD;
        this.gui.display(this.gameState);


        // Workaround for callback function scope issue
        var stage = this.stage;

        // Bind document-wide "keydown" event, and update key states accordingly for keyboard input
        $(document).keydown(function (e: Event) {
            switch (e.keyCode) {
                case 27:        // ESC
                    break;
                case 37:        // Left Arrow
                case 65:        // "a" Key
                    Controls.keyboard.KEY_LEFT = true;
                    break;
                case 39:        // Right Arrow
                case 68:        // "d" Key
                    Controls.keyboard.KEY_RIGHT = true;
                    break;
                case 38:        // Up Arrow
                case 87:        // "w" Key
                    Controls.keyboard.KEY_UP = true;
                    break;
                case 32:        // Space Key
                    if (!Controls.keyboard.KEY_SPACE) {
                        Controls.keyboard.KEY_SPACE = true;
                        var event = new createjs.Event("playerAttack", true, false);
                        stage.dispatchEvent(event);
                    }
                    break;
                case 49:        // "1" Key
                    if (!Controls.keyboard.KEY_1) {
                        Controls.keyboard.KEY_1 = true;
                        var event = new createjs.Event("usePlayerInventory", true, false);
                        event["slot"] = 0;
                        stage.dispatchEvent(event);
                    }
                    break;
                case 50:        // "2" Key
                    if (!Controls.keyboard.KEY_2) {
                        Controls.keyboard.KEY_2 = true;
                        var event = new createjs.Event("usePlayerInventory", true, false);
                        event["slot"] = 1;
                        stage.dispatchEvent(event);
                    }
                    break;
                case 51:        // "3" Key
                    if (!Controls.keyboard.KEY_3) {
                        Controls.keyboard.KEY_3 = true;
                        var event = new createjs.Event("usePlayerInventory", true, false);
                        event["slot"] = 2;
                        stage.dispatchEvent(event);
                    }
                    break;
                case 52:        // "4" Key
                    if (!Controls.keyboard.KEY_4) {
                        Controls.keyboard.KEY_4 = true;
                        var event = new createjs.Event("usePlayerInventory", true, false);
                        event["slot"] = 3;
                        stage.dispatchEvent(event);
                    }
                    break;
                case 53:        // "5" Key
                    if (!Controls.keyboard.KEY_5) {
                        Controls.keyboard.KEY_5 = true;
                        var event = new createjs.Event("usePlayerInventory", true, false);
                        event["slot"] = 4;
                        stage.dispatchEvent(event);
                    }
                    break;
                case 54:        // "6" Key
                    if (!Controls.keyboard.KEY_6) {
                        Controls.keyboard.KEY_6 = true;
                        var event = new createjs.Event("usePlayerInventory", true, false);
                        event["slot"] = 5;
                        stage.dispatchEvent(event);
                    }
                    break;
                case 55:        // "7" Key
                    if (!Controls.keyboard.KEY_7) {
                        Controls.keyboard.KEY_7 = true;
                        var event = new createjs.Event("usePlayerInventory", true, false);
                        event["slot"] = 6;
                        stage.dispatchEvent(event);
                    }
                    break;
                case 56:        // "8" Key
                    if (!Controls.keyboard.KEY_8) {
                        Controls.keyboard.KEY_8 = true;
                        var event = new createjs.Event("usePlayerInventory", true, false);
                        event["slot"] = 7;
                        stage.dispatchEvent(event);
                    }
                    break;
                case 57:        // "9" Key
                    if (!Controls.keyboard.KEY_9) {
                        Controls.keyboard.KEY_9 = true;
                        var event = new createjs.Event("usePlayerInventory", true, false);
                        event["slot"] = 8;
                        stage.dispatchEvent(event);
                    }
                    break;
            }
        });

        // Bind document-wide "keyup" event, and update key states accordingly for keyboard input
        $(document).keyup(function (e: Event) {
            switch (e.keyCode) {
                case 27:        // ESC
                    break;
                case 37:        // Left Arrow
                case 65:        // "a" Key
                    Controls.keyboard.KEY_LEFT = false;
                    break;
                case 39:        // Right Arrow
                case 68:        // "d" Key
                    Controls.keyboard.KEY_RIGHT = false;
                    break;
                case 38:        // Up Arrow
                case 87:        // "w" Key
                    Controls.keyboard.KEY_UP = false;
                    break;
                case 32:        // Space Key
                    Controls.keyboard.KEY_SPACE = false;
                    break;
                case 49:        // "1" Key
                    Controls.keyboard.KEY_1 = false;
                    break;
                case 50:        // "2" Key
                    Controls.keyboard.KEY_2 = false;
                    break;
                case 51:        // "3" Key
                    Controls.keyboard.KEY_3 = false;
                    break;
                case 52:        // "4" Key
                    Controls.keyboard.KEY_4 = false;
                    break;
                case 53:        // "5" Key
                    Controls.keyboard.KEY_5 = false;
                    break;
                case 54:        // "6" Key
                    Controls.keyboard.KEY_6 = false;
                    break;
                case 55:        // "7" Key
                    Controls.keyboard.KEY_7 = false;
                    break;
                case 56:        // "8" Key
                    Controls.keyboard.KEY_8 = false;
                    break;
                case 57:        // "9" Key
                    Controls.keyboard.KEY_9 = false;
                    break;
            }
        });

        this.stage.addEventListener("startGameClicked", { handleEvent: this.startGame, instance: this });
        this.stage.addEventListener("instructionsClicked", { handleEvent: this.showInstructions, instance: this });
        this.stage.addEventListener("backButtonClicked", { handleEvent: this.showStartScreen, instance: this });
        this.stage.addEventListener("playAgainButtonClicked", { handleEvent: this.restartGame, instance: this });
        this.stage.addEventListener("continueButtonClicked", { handleEvent: this.startNextLevel, instance: this });
    }

    /**
     * This function is an event handler fired by the pre-loader when all game assets finished loading.
     * Calls the primary game initialization function.
     */
    preloadComplete(event: Event): void {
        var instance = this.instance;
        instance.changeGameState = Constants.GAME_STATE_START;

        instance.initGameStart();
    }

    /**
     * This function is called after the pre-loader finished loading all game assets. It initializes all the
     * game's objects and switches state to the start menu screen.
     */
    initGameStart(): void {
        // Initialize sound manager
        this.sound = new Managers.Sound();

        // Initialize sky
        this.sky = new GameObjects.Sky();
        this.gui.setSky(this.sky);

        // Initialize cloud manager
        this.clouds = new Managers.CloudManager(5);
        this.gui.setCloudManager(this.clouds);

        // Initialize map manager
        this.map = new GameObjects.GameMap();
        this.map.loadMap(Constants.LEVELS[this.currentLevel]);
        this.gui.setMap(this.map);

        // Initializes player object
        this.player = new GameObjects.Player();
        this.player.setMapData(this.map.getLayer(Constants.LAYER_NAME_FOREGROUND));
        this.player.setEntity(this.map.entities.getEntityByName("Steve"));
        this.player.setSound(this.sound);
        this.player.setStage(this.stage);
        this.gui.setPlayer(this.player);

        // Initializes mob manager object
        this.mobs = new Managers.Mobs(this.sound, this.player);
        this.mobs.setMapData(this.map.getLayer(Constants.LAYER_NAME_FOREGROUND));
        this.mobs.loadMobs(this.map.entities.getEntitiesByType("Mob"));
        this.gui.setMobManager(this.mobs);

        // Initializes the static game object manager
        this.gameObjects = new Managers.Objects();
        this.gameObjects.loadObjects(this.map.entities.getAllEntities(), this.map.tileset);
        this.player.setObjectManager(this.gameObjects);
        this.gui.setGameObjects(this.gameObjects);

        // Initializes event listeners listening for player attack, player uses inventory, player being hit,
        // player being killed or player reaching the exit door
        this.stage.addEventListener("playerAttack", { handleEvent: this.player.attack, player: this.player, mobs: this.mobs });
        this.stage.addEventListener("usePlayerInventory", { handleEvent: this.player.useInventory, player: this.player, gui: this.gui });
        this.stage.addEventListener("playerHit", { handleEvent: this.gui.playerHit, player: this.player, gui: this.gui });
        this.stage.addEventListener("playerDeath", { handleEvent: this.playerDeath, instance: this });
        this.stage.addEventListener("exitReached", { handleEvent: this.loadNextLevel, instance: this });

        // Initialize the GUI components/screens
        this.gui.init();

        this.gameState = this.changeGameState;
        this.gui.display(this.gameState);
    }

    /**
     * This function is an event handler fired every tick of the Stage's clock. Updates the appropriate object
     * instances depending on game's current state machine value.
     * @param e The "tick" event object
     */
    gameLoop(event: Event): void {
        var instance = this.instance;

        switch (instance.gameState) {
            case Constants.GAME_STATE_PRELOAD:
                break;
            case Constants.GAME_STATE_START:
                instance.clouds.update();
                break;
            case Constants.GAME_STATE_INSTRUCTIONS:
                instance.clouds.update();
                break;
            case Constants.GAME_STATE_PLAY:
                instance.clouds.update();
                instance.inputUpdate();
                instance.player.update();
                instance.mobs.update();
                instance.sound.update(instance.player, instance.map);
                instance.gui.update();
                break;
            case Constants.GAME_STATE_DEATH:
                instance.clouds.update();
                break;
            case Constants.GAME_STATE_TRANSITION:
                instance.clouds.update();
                break;
            case Constants.GAME_STATE_VICTORY:
                instance.clouds.update();
                break;
        }
        instance.stage.update();
    }

    /**
     * This function is an event handler fired when player clicks the "Instructions" button on the main menu screen.
     * Switches game state.
     * @param e The "instructionsClicked" event object
     */
    showInstructions(event: Event): void {
        var instance = this.instance;

        // TODO: Change this
        instance.gameState = Constants.GAME_STATE_INSTRUCTIONS;
        instance.gui.display(instance.gameState);
    }

    /**
     * This function is an event handler fired when player clicks the "Start Game" button on the main menu screen.
     * Switches game state.
     * @param e The "startGameClicked" event object
     */
    startGame(event: Event): void {
        var instance = this.instance;

        // TODO: Change this
        instance.gameState = Constants.GAME_STATE_PLAY;

        instance.worldTimer = new Date().getTime();
        instance.gui.display(instance.gameState);
    }

    /**
     * This function is an event handler fired when player clicks the "Back" button on the instructions screen.
     * Switches game state.
     * @param e The "backButtonClicked" event object
     */
    showStartScreen(event: Event): void {
        var instance = this.instance;

        // TODO: Change this
        instance.gameState = Constants.GAME_STATE_START;
        instance.gui.display(instance.gameState);
    }

    /**
     * This function is an event handler fired when player dies. It displays the FINAL score and switches game state.
     * @param e The "playerDeath" event object
     */
    playerDeath(e: Event): void {
        var instance = this.instance;

        // TODO: Change this
        instance.gameState = Constants.GAME_STATE_DEATH;
        instance.player.die();
        instance.gui.deathScreen.setKillCount(instance.player.getKillCount());
        instance.gui.display(instance.gameState);
    }

    /**
     * This function is called when player reaches the final exit door on the last level. It displays the FINAL score
     * breakdown and allows the player to play again if they wish.
     */
    playerWins(): void {
//        var instance = this.instance;

        // TODO: Change this
        this.gameState = Constants.GAME_STATE_VICTORY;

        // Collect all the score data
        var scoreData = {};
        scoreData["baseScore"] = this.player.getScore();
        scoreData["health"] = this.player.getHealth();
        scoreData["healthScore"] = scoreData["health"] * Constants.SCORE_HEALTH_LEFT;
        scoreData["inventory"] = this.player.getFoodCount();
        scoreData["inventoryScore"] = scoreData["inventory"] * Constants.SCORE_INVENTORY.FOOD;
        var levelTime = Math.floor((new Date().getTime() - this.worldTimer) / 1000);
        var time = Constants.LEVEL_OPTIMUM_TIME[this.currentLevel - 1] - levelTime;
        scoreData["optimumTime"] = Constants.LEVEL_OPTIMUM_TIME[this.currentLevel - 1];
        scoreData["playerTime"] = levelTime;
        scoreData["time"] = (time > 0) ? time : 0;
        scoreData["timeScore"] = (time > 0) ? time * Constants.SCORE_TIMER : 0;
        scoreData["finalScore"] = scoreData["baseScore"] + scoreData["healthScore"] + scoreData["inventoryScore"] + scoreData["timeScore"];
        this.gui.victoryScreen.setScoreData(scoreData);
        this.player.setScore(scoreData["finalScore"]);

        this.gui.display(this.gameState);
    }

    /**
     * This function is an event handler fired when player reaches the exit door. It displays the current score
     * breakdown and allows the player to proceed. It also checks whether this was the last level, if it was, then it
     * calls the playerWins() function instead.
     * @param e The "exitReached" event object
     */
    loadNextLevel(e: Event): void {
        var instance = this.instance;

        instance.gameState = Constants.GAME_STATE_TRANSITION;

        if (++instance.currentLevel < Constants.LEVELS.length) {
            // Collect all the score data
            var scoreData = {};
            scoreData["baseScore"] = instance.player.getScore();
            scoreData["health"] = instance.player.getHealth();
            scoreData["healthScore"] = scoreData["health"] * Constants.SCORE_HEALTH_LEFT;
            scoreData["inventory"] = instance.player.getFoodCount();
            scoreData["inventoryScore"] = scoreData["inventory"] * Constants.SCORE_INVENTORY.FOOD;
            var levelTime = Math.floor((new Date().getTime() - instance.worldTimer) / 1000);
            var time = Constants.LEVEL_OPTIMUM_TIME[instance.currentLevel - 1] - levelTime;
            scoreData["optimumTime"] = Constants.LEVEL_OPTIMUM_TIME[instance.currentLevel - 1];
            scoreData["playerTime"] = levelTime;
            scoreData["time"] = (time > 0) ? time : 0;
            scoreData["timeScore"] = (time > 0) ? time * Constants.SCORE_TIMER : 0;
            scoreData["finalScore"] = scoreData["baseScore"] + scoreData["healthScore"] + scoreData["inventoryScore"] + scoreData["timeScore"];
            instance.gui.transitionScreen.setScoreData(scoreData);
            instance.player.setScore(scoreData["finalScore"]);

            var map = instance.map;
            var player = instance.player;
            var mobs = instance.mobs;
            var gameObjects = instance.gameObjects;

            // Re-initialize map manager with new map
            map.loadMap(Constants.LEVELS[instance.currentLevel]);

            // Change the player's collision map and starting position based on that map
            player.setMapData(map.getLayer(Constants.LAYER_NAME_FOREGROUND));
            player.setEntity(map.entities.getEntityByName("Steve"));

            // Clear all mob data from previous map, switch out the collision map, and re-initialize
            // mob manager object with new mobs from the new map
            mobs.removeAllChildren();
            mobs.setMapData(map.getLayer(Constants.LAYER_NAME_FOREGROUND));
            mobs.loadMobs(map.entities.getEntitiesByType("Mob"));

            // Clear all object data from previous map, and re-initialize the static game
            // object manager with all the objects from the new map
            gameObjects.removeAllChildren();
            gameObjects.loadObjects(map.entities.getAllEntities(), map.tileset);

            // Reset all game container managers back to initial positions
            map.reset();
            mobs.reset();
            gameObjects.reset();
        } else {
            instance.playerWins();
        }

        // TODO: Change this
//        instance.changeGameState = Constants.GAME_STATE_PLAY;
        instance.gui.display(instance.gameState);
    }

    /**
     * This function is an event handler fired when player clicks the "continue" button on the level
     * transition menu screen. The map has already been pre-loaded so all that's needed is state change.
     * @param e The "continueButtonClicked" event object
     */
    startNextLevel(e: Event): void {
        var instance = this.instance;

        // TODO: Change this
        instance.gameState = Constants.GAME_STATE_PLAY;

        // Start up the level timer
        instance.worldTimer = new Date().getTime();

        instance.gui.display(instance.gameState);
    }

    /**
     * This function is an event handler fired when player clicks the "Play Again?" button after dieing in the game.
     * It resets the game back to initial state at level 1 and starts over giving the player another shot at victory.
     * @param e The "playAgainButtonClicked" event object
     */
    restartGame(event: Event): void {
        var instance = this.instance;

        // TODO: Change this
        instance.gameState = Constants.GAME_STATE_PLAY;
        Controls.resetControls();

        var map = instance.map;
        var player = instance.player;
        var mobs = instance.mobs;
        var gameObjects = instance.gameObjects;

        // Reset to first level
        instance.currentLevel = 0;

        // Re-initialize map manager with new map
        map.loadMap(Constants.LEVELS[instance.currentLevel]);

        // Change the player's collision map and starting position based on that map
        player.setMapData(map.getLayer(Constants.LAYER_NAME_FOREGROUND));
        player.setEntity(map.entities.getEntityByName("Steve"));

        // Clear all mob data from previous map, switch out the collision map, and re-initialize
        // mob manager object with new mobs from the new map
        mobs.removeAllChildren();
        mobs.setMapData(map.getLayer(Constants.LAYER_NAME_FOREGROUND));
        mobs.loadMobs(map.entities.getEntitiesByType("Mob"));

        // Clear all object data from previous map, and re-initialize the static game
        // object manager with all the objects from the new map
        gameObjects.removeAllChildren();
        gameObjects.loadObjects(map.entities.getAllEntities(), map.tileset);

        // Reset all game container managers back to initial positions
        instance.clouds.reset();
        map.reset();
        mobs.reset();
        gameObjects.reset();
        instance.player.reset();

        // Start up the level timer
        instance.worldTimer = new Date().getTime();


/*
        instance.worldTimer = new Date().getTime();
        instance.clouds.reset();
        instance.map.reset();
        instance.gameObjects.reset();
        instance.mobs.reset();
*/
        // Reset the GUI display
        instance.gui.gameScreen.reset();

        instance.gui.display(instance.gameState);
    }

    /**
     * This function checks if user is providing input this cycle, and if they are it reacts to the input.
     * (Used in game play).
     */
    inputUpdate(): void {
        // If player moves left, shift all drawn assets to the right
        if (Controls.keyboard.KEY_LEFT) {
            if (this.player.moveLeft()) {
                this.map.shiftRight();
                this.gameObjects.shiftRight();
                this.clouds.shiftRight();
                this.mobs.shiftRight();
            }
        }

        // If player moves right, shift all drawn assets to the left
        if (Controls.keyboard.KEY_RIGHT) {
            if (this.player.moveRight()) {
                this.map.shiftLeft();
                this.gameObjects.shiftLeft();
                this.clouds.shiftLeft();
                this.mobs.shiftLeft();
            }
        }

        // If player is jumping, handle the jump
        if (Controls.keyboard.KEY_UP) {
            this.player.jump();
        }
    }
}

