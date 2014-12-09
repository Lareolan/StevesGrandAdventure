/**
* This file contains all the game constants.
* Author:              Konstantin Koton
* Filename:            Constants.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Dec. 9, 2014
* Revision History:
*      v1 - Created module and added all game constants to it.
*      v2 - Added item constants.
*      v3 - Added inventory constants, changed item to enum.
*      v4 - Added score constants.
*      v5 - Added transition screen to screen constants
*/
var Constants;
(function (Constants) {
    // Canvas constants
    Constants.CANVAS_ELEMENT = document.getElementById("canvas");
    Constants.SCREEN_WIDTH = Constants.CANVAS_ELEMENT.width;
    Constants.SCREEN_HEIGHT = Constants.CANVAS_ELEMENT.height;
    Constants.HALF_SCREEN_WIDTH = Constants.CANVAS_ELEMENT.width / 2;
    Constants.HALF_SCREEN_HEIGHT = Constants.CANVAS_ELEMENT.height / 2;

    // Game state constants
    Constants.GAME_STATE_PRELOAD = 1;
    Constants.GAME_STATE_START = 2;
    Constants.GAME_STATE_INSTRUCTIONS = 3;
    Constants.GAME_STATE_PLAY = 4;
    Constants.GAME_STATE_DEATH = 5;
    Constants.GAME_STATE_VICTORY = 6;
    Constants.GAME_STATE_TRANSITION = 7;

    // Block type constants
    Constants.AIR_BLOCK = 0;
    Constants.WATER_BLOCK = 206;
    Constants.LAVA_BLOCK = 238;

    // Game level constants
    Constants.LEVELS = ["Level1", "Level2", "Level3"];
    Constants.LEVEL_OPTIMUM_TIME = [60, 90, 90];

    // Layer names
    Constants.LAYER_NAME_FOREGROUND = "Foreground";
    Constants.LAYER_NAME_BACKGROUND = "Background";

    // Cloud constants
    Constants.MAX_CLOUDS = 5;
    Constants.CLOUD_TYPES = ["cloud1", "cloud2"];

    // Player constants
    Constants.MOVE_SPEED = 8;
    Constants.PLAYER_MAX_HEALTH = 10;

    // Entity constants
    Constants.FACING_LEFT = 0;
    Constants.FACING_RIGHT = 1;

    // AI constants
    Constants.AI_ACTION_IDLE = 0;
    Constants.AI_ACTION_MOVE_RIGHT = 1;
    Constants.AI_ACTION_MOVE_LEFT = 2;
    Constants.AI_ACTION_ATTACK = 3;

    // Item constants
    (function (ITEM) {
        ITEM[ITEM["EMPTY"] = 0] = "EMPTY";
        ITEM[ITEM["FOOD"] = 1] = "FOOD";
    })(Constants.ITEM || (Constants.ITEM = {}));
    var ITEM = Constants.ITEM;

    // Inventory constants
    Constants.INVENTORY_SLOTS = 9;

    // Score constants
    Constants.SCORE_MONSTER_KILL = 100;
    Constants.SCORE_HEALTH_LEFT = 25;
    Constants.SCORE_TIMER = 100;
    (function (SCORE_INVENTORY) {
        SCORE_INVENTORY[SCORE_INVENTORY["EMPTY"] = 0] = "EMPTY";
        SCORE_INVENTORY[SCORE_INVENTORY["FOOD"] = 10] = "FOOD";
    })(Constants.SCORE_INVENTORY || (Constants.SCORE_INVENTORY = {}));
    var SCORE_INVENTORY = Constants.SCORE_INVENTORY;
    ;
})(Constants || (Constants = {}));
//# sourceMappingURL=Constants.js.map
