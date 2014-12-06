/**
* This file contains game initialization code, input code and primary game loop.
* Author:              Konstantin Koton
* Filename:            MainGame.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:
*      v1 - Created initial framework for the new class.
*/
var MainGame = (function () {
    function MainGame(canvas) {
        this.stage = new createjs.Stage(canvas);
        this.currentLevel = 1;
        this.init();
    }
    MainGame.prototype.init = function () {
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

        // Bind document-wide keydown event, and update key states accordingly for keyboard input
        $(document).keydown(function (e) {
            switch (e.keyCode) {
                case 27:
                    break;
                case 37:
                case 65:
                    Controls.keyboard.KEY_LEFT = true;
                    break;
                case 39:
                case 68:
                    Controls.keyboard.KEY_RIGHT = true;
                    break;
                case 38:
                case 87:
                    Controls.keyboard.KEY_UP = true;
                    break;
                case 32:
                    if (!Controls.keyboard.KEY_SPACE) {
                        Controls.keyboard.KEY_SPACE = true;
                        var event = new createjs.Event("playerAttack", true, false);
                        stage.dispatchEvent(event);
                    }
                    break;
            }
        });

        // Bind document-wide keyup event, and update key states accordingly for keyboard input
        $(document).keyup(function (e) {
            switch (e.keyCode) {
                case 27:
                    break;
                case 37:
                case 65:
                    Controls.keyboard.KEY_LEFT = false;
                    break;
                case 39:
                case 68:
                    Controls.keyboard.KEY_RIGHT = false;
                    break;
                case 38:
                case 87:
                    Controls.keyboard.KEY_UP = false;
                    break;
                case 32:
                    Controls.keyboard.KEY_SPACE = false;
                    break;
            }
        });

        this.stage.addEventListener("startGameClicked", { handleEvent: this.startGame, instance: this });
        this.stage.addEventListener("instructionsClicked", { handleEvent: this.showInstructions, instance: this });
        this.stage.addEventListener("backButtonClicked", { handleEvent: this.showStartScreen, instance: this });
        this.stage.addEventListener("playAgainButtonClicked", { handleEvent: this.restartGame, instance: this });
    };

    MainGame.prototype.preloadComplete = function (event) {
        var instance = this.instance;
        instance.changeGameState = Constants.GAME_STATE_START;

        instance.initGameStart();
    };

    MainGame.prototype.initGameStart = function () {
        // Initialize sound manager
        this.sound = new Managers.Sound();

        // Initialize sky
        this.sky = new GameObjects.Sky();
        this.gui.setSky(this.sky);

        // Initialize cloud manager
        this.clouds = new Managers.CloudManager(5);
        this.gui.setCloudManager(this.clouds);

        // Initialize map manager
        this.map = new GameObjects.GameMap(Constants.LEVELS[this.currentLevel]);
        this.gui.setMap(this.map);

        // Initializes player object
        this.player = new GameObjects.Player();
        this.player.setMapData(this.map.getLayer(Constants.LAYER_NAME_FOREGROUND));
        this.player.setEntity(this.map.entities.getEntityByName("Steve"));
        this.player.setSound(this.sound);
        this.player.setStage(this.stage);
        this.gui.setPlayer(this.player);

        // Initializes mob manager object
        this.mobs = new Managers.Mobs(this.map.entities.getEntitiesByType("Mob"), this.map.getLayer(Constants.LAYER_NAME_FOREGROUND), this.sound, this.player);
        this.gui.setMobManager(this.mobs);

        // Initializes the static game object manager
        this.gameObjects = new Managers.Objects(this.map.entities.getAllEntities(), this.map.tileset);
        this.player.setObjectManager(this.gameObjects);
        this.gui.setGameObjects(this.gameObjects);

        // Initializes event listeners listening for player attack, player being hit and player being killed
        this.stage.addEventListener("playerAttack", { handleEvent: this.player.attack, player: this.player, mobs: this.mobs });
        this.stage.addEventListener("playerHit", { handleEvent: this.gui.playerHit, player: this.player, gui: this.gui });

        //        this.stage.addEventListener("playerDeath", { handleEvent: this.gui.playerDeath, player: this.player, gui: this.gui });
        this.stage.addEventListener("playerDeath", { handleEvent: this.playerDeath, instance: this });
        this.stage.addEventListener("exitReached", { handleEvent: this.playerWins, instance: this });

        this.gui.init();

        this.gameState = this.changeGameState;
        this.gui.display(this.gameState);
    };

    MainGame.prototype.gameLoop = function (event) {
        var instance = this.instance;

        // If player moves left, shift all drawn assets to the right
        if (Controls.keyboard.KEY_LEFT) {
            if (instance.player.moveLeft()) {
                instance.map.shiftRight();
                instance.gameObjects.shiftRight();
                instance.clouds.shiftRight();
                instance.mobs.shiftRight();
            }
        }

        // If player moves right, shift all drawn assets to the left
        if (Controls.keyboard.KEY_RIGHT) {
            if (instance.player.moveRight()) {
                instance.map.shiftLeft();
                instance.gameObjects.shiftLeft();
                instance.clouds.shiftLeft();
                instance.mobs.shiftLeft();
            }
        }

        // If player is jumping, handle the jump
        if (Controls.keyboard.KEY_UP) {
            instance.player.jump();
        }

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
                instance.player.update();
                instance.mobs.update();
                instance.sound.update(instance.player, instance.map);
                instance.gui.update();
                break;
            case Constants.GAME_STATE_DEATH:
                instance.clouds.update();
                break;
        }
        instance.stage.update();
    };

    MainGame.prototype.showInstructions = function (event) {
        var instance = this.instance;

        // TODO: Change this
        instance.gameState = Constants.GAME_STATE_INSTRUCTIONS;
        instance.gui.display(instance.gameState);
    };

    MainGame.prototype.startGame = function (event) {
        var instance = this.instance;

        // TODO: Change this
        instance.gameState = Constants.GAME_STATE_PLAY;
        instance.worldTimer = new Date().getTime();
        instance.gui.display(instance.gameState);
    };

    MainGame.prototype.showStartScreen = function (event) {
        var instance = this.instance;

        // TODO: Change this
        instance.gameState = Constants.GAME_STATE_START;
        instance.gui.display(instance.gameState);
    };

    // Handle player being killed, switch game state to dead state
    MainGame.prototype.playerDeath = function (e) {
        var instance = this.instance;

        // TODO: Change this
        instance.gameState = Constants.GAME_STATE_DEATH;
        instance.player.die();
        instance.gui.deathScreen.setKillCount(instance.player.getKillCount());
        instance.gui.display(instance.gameState);
    };

    MainGame.prototype.playerWins = function (e) {
        var instance = this.instance;

        // TODO: Change this
        instance.gameState = Constants.GAME_STATE_VICTORY;
        instance.gui.victoryScreen.setKillCount(instance.player.getKillCount(), instance.worldTimer);
        instance.gui.display(instance.gameState);
    };

    MainGame.prototype.restartGame = function (event) {
        var instance = this.instance;

        // TODO: Change this
        instance.gameState = Constants.GAME_STATE_PLAY;
        Controls.resetControls();
        instance.worldTimer = new Date().getTime();
        instance.clouds.reset();
        instance.map.reset();
        instance.player.reset();
        instance.gameObjects.reset();
        instance.mobs.reset();
        instance.gui.gameScreen.reset();
        instance.gui.display(instance.gameState);
        //                cloudManager.reset();
        //                player.reset();
        //                map.reset();
        //                gameObjects.reset();
        //                mobs.reset();
        //                gui.gameScreen.reset();
    };
    return MainGame;
})();
//# sourceMappingURL=MainGame.js.map
