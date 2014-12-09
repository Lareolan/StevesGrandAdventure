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
module Constants {
    // Canvas constants
    export var CANVAS_ELEMENT: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    export var SCREEN_WIDTH: number = Constants.CANVAS_ELEMENT.width;
    export var SCREEN_HEIGHT: number = Constants.CANVAS_ELEMENT.height;
    export var HALF_SCREEN_WIDTH: number = Constants.CANVAS_ELEMENT.width / 2;
    export var HALF_SCREEN_HEIGHT: number = Constants.CANVAS_ELEMENT.height / 2;

    // Game state constants
    export var GAME_STATE_PRELOAD: number = 1;
    export var GAME_STATE_START: number = 2;
    export var GAME_STATE_INSTRUCTIONS: number = 3;
    export var GAME_STATE_PLAY: number = 4;
    export var GAME_STATE_DEATH: number = 5;
    export var GAME_STATE_VICTORY: number = 6;
    export var GAME_STATE_TRANSITION: number = 7;

    // Block type constants
    export var AIR_BLOCK: number = 0;
    export var WATER_BLOCK: number = 206;
    export var LAVA_BLOCK: number = 238;

    // Game level constants
    export var LEVELS: Array<string> = ["Level1", "Level2", "Level3"];
    export var LEVEL_OPTIMUM_TIME: Array<number> = [60, 90, 90];

    // Layer names
    export var LAYER_NAME_FOREGROUND: string = "Foreground";
    export var LAYER_NAME_BACKGROUND: string = "Background";

    // Cloud constants
    export var MAX_CLOUDS: number = 5;
    export var CLOUD_TYPES: Array<string> = ["cloud1", "cloud2"];

    // Player constants
    export var MOVE_SPEED: number = 8;
    export var PLAYER_MAX_HEALTH: number = 10;

    // Entity constants
    export var FACING_LEFT: number = 0;
    export var FACING_RIGHT: number = 1;

    // AI constants
    export var AI_ACTION_IDLE: number = 0;
    export var AI_ACTION_MOVE_RIGHT: number = 1;
    export var AI_ACTION_MOVE_LEFT: number = 2;
    export var AI_ACTION_ATTACK: number = 3;

    // Item constants
    export enum ITEM {
        EMPTY = 0,
        FOOD = 1
    }

    // Inventory constants
    export var INVENTORY_SLOTS: number = 9;

    // Score constants
    export var SCORE_MONSTER_KILL: number = 100;
    export var SCORE_HEALTH_LEFT: number = 25;
    export var SCORE_TIMER: number = 100;
    export enum SCORE_INVENTORY {
        EMPTY = 0,
        FOOD = 10
    };
}