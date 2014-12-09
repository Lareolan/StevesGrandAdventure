/**
 * This file contains simply creates and initiates the main game object and binds handler code for switching
 * game to full-screen mode.
 * Author:              Konstantin Koton
 * Filename:            game.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Dec. 9, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 *      v2 - Removed most code and moved it to MainGame class
 */

// TypeScript workarounds: Declare external functions, interfaces, etc...
declare function Base64Decode(string);

declare function Zlib(): Zlib;
declare module Zlib {
    function Inflate(data): void;
}
interface Zlib { };

interface Event {
    clientX: number;
    clientY: number;
    which: number;
    length: number;
    touches: Event;
    originalEvent: Event;
    keyCode: number;
}

interface Element {
    requestFullscreen(number);
    mozRequestFullScreen(number);
    webkitRequestFullscreen(number);
    msRequestFullscreen(number);
    ALLOW_KEYBOARD_INPUT: number;
}

interface window {
    orientation: number;
}

interface document {
    fullscreen: number;
    mozFullScreen: number;
    webkitIsFullScreen: number;
}

// Preload function used to load all the data and display progress report
function start(): void {
    var game = new MainGame(document.getElementById("canvas"));
}

// If fullscreen button is clicked, initialize fullscreen mode
$("#fullscreen").click(function () {
    if (!isFullscreen()) {
        var $canvas = $("canvas");
        launchIntoFullscreen($canvas[0]);
        var width = $(window).outerWidth();
        var scale = width / $canvas.innerWidth();
        $canvas.attr("style", "transform: scale(" + scale + ")");
        $canvas.addClass("fullscreen");
    }
});

/*
 * This function determines if the game is in fullscreen mode and returns a boolean indicator.
 * @returns true if game is fullscreen, otherwise false.
 */
function isFullscreen() {
    return document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement;
}

// Because fullscreen mode for browsers is still a new feature, the following 4 functions
// bind vendor-specific event listeners to find out if user exited fullscreen mode.

// Default version of the event that is getting standardized across newer browsers.
document.addEventListener("fullscreenchange", function () {
    if (!document.fullscreen) {
        exitFullscreen();
    }
}, false);

// Mozilla version of the event, for older Firefox browsers
document.addEventListener("mozfullscreenchange", function () {
    if (!document.mozFullScreen) {
        exitFullscreen();
    }
}, false);

// Webkit version of the event, for older webkit-based browsers
document.addEventListener("webkitfullscreenchange", function () {
    if (!document.webkitIsFullScreen) {
        exitFullscreen();
    }
}, false);

// Microsoft version of the event, for older IE browsers
document.addEventListener("msfullscreenchange", function () {
    if (!document.msFullscreenElement) {
        exitFullscreen();
    }
}, false);

// Find the right method, call on correct element
function launchIntoFullscreen(element: Element) {
    if (element.requestFullscreen) {
        element.requestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
}

/*
 * This function re-enables the mouse cursor when exiting fullscreen.
 */
function exitFullscreen() {
    $("canvas").removeAttr("style").removeClass("fullscreen");
};

/*
 * This code was disabled, planning to enable it when I add an exit fullscreen
 * button (hopefully in next version).
// Whack fullscreen
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
*/




























/*
// Display a loading progress bar
function handleProgress(event: ProgressEvent): void {
    var x = stage.canvas.width / 2 - 200;
    var y = stage.canvas.height / 2 - 25;
    var width = 400;
    var height = 50;
    var progress = event.loaded / event.total;

    progressBar.graphics.clear();
    progressBar.graphics.beginStroke("#000").drawRect(x, y, width, height);
    progressBar.graphics.beginFill("#CCC").drawRect(x, y, width * progress, height);

    text.text = (progress * 100).toFixed(0) + "% complete";
    text.x = x + width / 2;
    text.y = y + height / 2;
    text.textAlign = "center";
    text.textBaseline = "middle";

    stage.update();
}

// Once loading is done, initialize the game and load main screen
function handleComplete(event: Event): void {
    setTimeout(init, 500);
    gui.preloadComplete();
}

// Initialize the stage and start the game
function init(): void {
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);

    initGameStart();

    gameState = constants.GAME_STATE_START;
}

// Primary Game Loop, executes the correct function depending on game state
function gameLoop(event): void {
    switch (gameState) {
        case constants.GAME_STATE_PLAY:
            playGame();
            break;
        case constants.GAME_STATE_START:
            startMenu();
            break;
        case constants.GAME_STATE_INSTRUCTIONS:
            instructionsScreen();
            break;
        case constants.GAME_STATE_DEATH:
            deathScreen();
            break;
        case constants.GAME_STATE_VICTORY:
            victoryScreen();
            break;
    }
}
*/

/*
 * This function runs the primary game play sequences. Checking input states, and reacting accordingly as well
 * as update all game assets, such as move clouds, map, mobs, game objects and run their update() functions
 * to update their states.
 */
/*
function playGame(): void {
    // If player moves left, shift all drawn assets to the right
    if (input.keyboard.KEY_LEFT) {
        if (player.moveLeft()) {
            map.moveLeft();
            gameObjects.moveLeft()
            cloudManager.moveLeft();
            mobs.shiftRight();
        }
    }

    // If player moves right, shift all drawn assets to the left
    if (input.keyboard.KEY_RIGHT) {
        if (player.moveRight()) {
            map.moveRight();
            gameObjects.moveRight()
            cloudManager.moveRight();
            mobs.shiftLeft();
        }
    }

    // If player is jumping, handle the jump
    if (input.keyboard.KEY_UP) {
        player.jump();
    }

    // Update all assets each tick
    cloudManager.update();
    mobs.update();
    player.update();
    gui.update();
    stage.update();
    sound.update(player, map);
}
*/

/*
 * This function runs each tick while in the start menu state. Updates clouds and image assets.
 */
/*
function startMenu(): void {
    cloudManager.update();
    stage.update();
}

/*
 * This function runs each tick while in the instruction screen state. Updates clouds and image assets.
 */
/*
function instructionsScreen(): void {
    cloudManager.update();
    stage.update();
}

/*
 * This function runs each tick while in the death screen state. Updates clouds and image assets.
 */
/*
function deathScreen(): void {
    cloudManager.update();
    stage.update();
}

/*
 * This function runs each tick while in the victory screen state. Updates image assets.
 */
/*
function victoryScreen(): void {
    stage.update();
}

/*
 * This function initializes game start screen and all game assets.
 */
/*
function initGameStart(): void {
    gui.show(constants.GAME_STATE_START);

    // Initialize sound manager
    if (!sound) {
        sound = new Managers.Sound();
    }

    // Initialize sky
    if (!sky) {
        sky = new GameObjects.Sky();
    }

    // Initialize cloud manager
    if (!cloudManager) {
        cloudManager = new Managers.CloudManager(5);
    }

    // Initialize map manager
    if (!map) {
        map = new GameObjects.GameMap();
    }


    // Create "Start Game" button, and bind a click handler function to change state when clicked
    var buttonWidth = 400;
    var buttonHeight = 80;
    var btnX = (stage.canvas.width / 2) - (buttonWidth / 2),
        btnY = (stage.canvas.height / 2) - (buttonHeight * 2);

    var startBtn = new GameObjects.Button("Start Game", buttonWidth, buttonHeight, btnX, btnY, GameObjects.Button.ROUNDED,
        "black", "#5533DD", "rgba(100, 60, 200, 0.8)");
    startBtn.setFadeEffect();
    startBtn.setClickHandler(function () {
        // TODO: Fix this later
        stage.removeChild(startBtn);
        stage.removeChild(instructBtn);

        gameState = constants.GAME_STATE_PLAY;
        gui.show(constants.GAME_STATE_PLAY);
        initGamePlay();
    });
    stage.addChild(startBtn);

    // Create "Instructions" button, and bind a click handler function to change state when clicked
    btnY += buttonHeight * 2;
    var instructBtn = new GameObjects.Button("Instructions", buttonWidth, buttonHeight, btnX, btnY, GameObjects.Button.ROUNDED,
        "black", "#5533DD", "rgba(100, 60, 200, 0.8)");
    instructBtn.setFadeEffect();
    instructBtn.setClickHandler(function () {
        stage.removeChild(startBtn);
        stage.removeChild(instructBtn);

        gameState = constants.GAME_STATE_INSTRUCTIONS;
        initInstructionScreen();
    });
    stage.addChild(instructBtn);
}

/*
 * This function initializes the game's instruction screen
 */
/*
function initInstructionScreen() {
    gui.show(constants.GAME_STATE_INSTRUCTIONS);
}

// Initialize game play components
function initGamePlay(): void {
    // Initializes player object
    player = new GameObjects.Player(map.entities.getEntityByName("Steve"), map.getLayer(constants.FOREGROUND_LAYER_NAME), sound);

    // Initializes mob manager object
    mobs = new Managers.Mobs(map.entities.getEntitiesByType("Mob"), map.getLayer(constants.FOREGROUND_LAYER_NAME), sound, player);

    // Initializes the static game object manager
    gameObjects = new Managers.Objects(map.entities.getAllEntities(), map.tileset);

    // Initialize gui components and sets up internal references
    gui.preloadComplete();
    gui.setPlayer(player);
    gui.setStage(stage);

    // Initializes event listeners listening for player attack, player being hit and player being killed
    stage.addEventListener("playerAttack", { handleEvent: player.attack, player: player, mobs: mobs });
    stage.addEventListener("playerHit", { handleEvent: gui.playerHit, player: player, gui: gui });
    stage.addEventListener("playerDeath", { handleEvent: gui.playerDeath, player: player, gui: gui });
}

// If fullscreen button is clicked, initialize fullscreen mode
$("#fullscreen").click(function () {
    if (!isFullscreen()) {
        var $canvas = $("canvas");
        launchIntoFullscreen($canvas[0]);
        var width = $(window).outerWidth();
        var scale = width / $canvas.innerWidth();
        $canvas.attr("style", "transform: scale(" + scale + ")");
        $canvas.addClass("fullscreen");
    }
});


// TODO: Change this code to use stage.mouseX/stage.mouseY and other stage mouse hooks.
// TODO: Ensure mouse and touch operations are fully functional in next version of the game

// Bind mousedown event on canvas and update input states accordingly.
/*
$("canvas").mousedown(function (e: Event) {
    var middle = $(window).outerWidth() / 2;
    var rect = this.getBoundingClientRect();
    var mouse = {
        x: (e.clientX - rect.left) / (rect.right - rect.left) * this.width,
        y: (e.clientY - rect.top) / (rect.bottom - rect.top) * this.height
    };

    if (mouse.x >= middle) {
        input.keyboard.KEY_RIGHT = true;
        input.keyboard.KEY_LEFT = false;
    } else if (mouse.x < middle) {
        input.keyboard.KEY_RIGHT = false;
        input.keyboard.KEY_LEFT = true;
    }

    switch (e.which) {
        case 1:
            input.mouse.LEFT_BUTTON = true;
            break;
        case 2:
            input.mouse.MIDDLE_BUTTON = true;
            break;
        case 3:
            input.mouse.RIGHT_BUTTON = true;
            break;
    }
});
*/

// Bind mouseup event on canvas and update input states accordingly.
/*
$("canvas").mouseup(function (e: Event) {
    input.keyboard.KEY_RIGHT = false;
    input.keyboard.KEY_LEFT = false;

    switch (e.which) {
        case 1:
            input.mouse.LEFT_BUTTON = false;
            break;
        case 2:
            input.mouse.MIDDLE_BUTTON = false;
            break;
        case 3:
            input.mouse.RIGHT_BUTTON = false;
            break;
    }
});
*/

/*  Bind mousemove event on canvas and update input states accordingly.
 * (This ensures that if player moves from left to right, the character starts moving right
 * and not continues moving left)
 */
/*
$("canvas").mousemove(function (e: Event) {
    var middle = $(window).outerWidth() / 2;
    var rect = this.getBoundingClientRect();
    var mouse = {
        x: (e.clientX - rect.left) / (rect.right - rect.left) * this.width,
        y: (e.clientY - rect.top) / (rect.bottom - rect.top) * this.height
    };

    if (input.mouse.LEFT_BUTTON) {
        if ((input.keyboard.KEY_LEFT) && (mouse.x >= middle)) {
            input.keyboard.KEY_LEFT = false;
            input.keyboard.KEY_RIGHT = true;
        } else if ((input.keyboard.KEY_RIGHT) && (mouse.x < middle)) {
            input.keyboard.KEY_LEFT = true;
            input.keyboard.KEY_RIGHT = false;
        }
    }
});
*/


/* Bind touchstart event on canvas and update input states accordingly.
 * Essentially the same as the mousedown above but for touch enabled devices.
 */

/*
$("canvas").bind("touchstart", function (e: Event) {
    var middle = $(window).outerWidth() / 2;
    var touch = e.originalEvent.touches[0];

    var rect = this.getBoundingClientRect();
    var touchPoint = {
        x: (touch.clientX - rect.left) / (rect.right - rect.left) * this.width,
        y: (touch.clientY - rect.top) / (rect.bottom - rect.top) * this.height
    };

    if (touchPoint.x >= middle) {
        input.keyboard.KEY_RIGHT = true;
        input.keyboard.KEY_LEFT = false;
    } else if (touchPoint.x < middle) {
        input.keyboard.KEY_RIGHT = false;
        input.keyboard.KEY_LEFT = true;
    }

    /*
        if (input.touch.TOUCH) {
            var touch2 = e.originalEvent.touches[1];
            alert("Second touch event at (" + touch2.clientX + ", " + touch2.clientY + ")\n Touches: " + e.originalEvent.touches.length);
        }
    * /

    input.touch.TOUCH = true;
});
*/

/* Bind touchmove event on canvas and update input states accordingly.
 * Essentially the same as the mousemove above but for touch enabled devices.
 */
/*
$("canvas").bind("touchmove", function (e: Event) {
    var middle = $(window).outerWidth() / 2;
    var touch = e.originalEvent.touches[0];

    var rect = this.getBoundingClientRect();
    var touchPoint = {
        x: (touch.clientX - rect.left) / (rect.right - rect.left) * this.width,
        y: (touch.clientY - rect.top) / (rect.bottom - rect.top) * this.height
    };

    if (input.touch.TOUCH) {
        if ((input.keyboard.KEY_LEFT) && (touchPoint.x >= middle)) {
            input.keyboard.KEY_LEFT = false;
            input.keyboard.KEY_RIGHT = true;
        } else if ((input.keyboard.KEY_RIGHT) && (touchPoint.x < middle)) {
            input.keyboard.KEY_LEFT = true;
            input.keyboard.KEY_RIGHT = false;
        }
    }
});
*/

/* Bind touchend event on canvas and update input states accordingly.
 * Essentially the same as the mouseup above but for touch enabled devices.
 */
/*
$("canvas").bind("touchend", function (e: Event) {
    input.keyboard.KEY_RIGHT = false;
    input.keyboard.KEY_LEFT = false;
    input.touch.TOUCH = false;
});
*/















/*
// Bind document-wide keydown event, and update key states accordingly for keyboard input
$(document).keydown(function (e: Event) {
    switch (e.keyCode) {
        case 27:        // ESC
            break;
        case 37:        // Left Arrow
        case 65:        // "a" Key
            input.keyboard.KEY_LEFT = true;
            break;
        case 39:        // Right Arrow
        case 68:        // "d" Key
            input.keyboard.KEY_RIGHT = true;
            break;
        case 38:        // Up Arrow
        case 87:        // "w" Key
            input.keyboard.KEY_UP = true;
            break;
        case 32:        // Space Key
            if (!input.keyboard.KEY_SPACE) {
                input.keyboard.KEY_SPACE = true;
                var event = new createjs.Event("playerAttack", true, false);
                stage.dispatchEvent(event);
            }
            break;
    }
});

// Bind document-wide keyup event, and update key states accordingly for keyboard input
$(document).keyup(function (e: Event) {
    switch (e.keyCode) {
        case 27:        // ESC
            break;
        case 37:        // Left Arrow
        case 65:        // "a" Key
            input.keyboard.KEY_LEFT = false;
            break;
        case 39:        // Right Arrow
        case 68:        // "d" Key
            input.keyboard.KEY_RIGHT = false;
            break;
        case 38:        // Up Arrow
        case 87:        // "w" Key
            input.keyboard.KEY_UP = false;
            break;
        case 32:        // Space Key
            input.keyboard.KEY_SPACE = false;
            break;
    }
});
*/







/*
 * This function was supposed to rotate view on mobile devices to ensure that the game was always in
 * landscape mode even if user turns their device to portrait mode direction. However it doesn't seem to work.
 */
/*
$(window).bind("orientationchange", function (e: Event) {
    switch (window.orientation) {
        case -90:
            $(document.body).removeClass("turnCW");
            break;
        case 90:
            $(document.body).removeClass("turnCW");
            break;
        case 0:
            $(document.body).addClass("turnCW");
            break;
    }
});

*/