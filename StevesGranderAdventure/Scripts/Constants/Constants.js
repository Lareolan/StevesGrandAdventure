/**
* This file contains game initialization code, input code and primary game loop.
* Author:              Konstantin Koton
* Filename:            MainGame.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:
*      v1 - Created module and added all game constants to it.
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

    // Block type constants
    Constants.AIR_BLOCK = 0;
    Constants.WATER_BLOCK = 206;
    Constants.LAVA_BLOCK = 238;

    // Layer names
    Constants.LAYER_NAME_FOREGROUND = "Foreground";
    Constants.LAYER_NAME_BACKGROUND = "Background";

    // Cloud constants
    Constants.MAX_CLOUDS = 5;
    Constants.CLOUD_TYPES = ["cloud1", "cloud2"];

    // Player constants
    Constants.MOVE_SPEED = 8;

    // Entity constants
    Constants.FACING_LEFT = 0;
    Constants.FACING_RIGHT = 1;

    // AI constants
    Constants.AI_ACTION_IDLE = 0;
    Constants.AI_ACTION_MOVE_RIGHT = 1;
    Constants.AI_ACTION_MOVE_LEFT = 2;
    Constants.AI_ACTION_ATTACK = 3;
})(Constants || (Constants = {}));
//# sourceMappingURL=Constants.js.map
