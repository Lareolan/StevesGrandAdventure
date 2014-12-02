/**
 * This file contains game control states.
 * Author:              Konstantin Koton
 * Filename:            Controls.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:    
 *      v1 - Created module and added all game controls to it.
 */
module Controls {
    export var keyboard = {
        KEY_LEFT: false,
        KEY_RIGHT: false,
        KEY_UP: false,
        KEY_DOWN: false,
        KEY_SPACE: false
    };
    export var mouse = {
        LEFT_BUTTON: false,
        RIGHT_BUTTON: false,
        MIDDLE_BUTTON: false
    };
    export var touch = {
        TOUCH1: false,
        TOUCH2: false,
        TOUCH3: false
    };

    export function resetControls(): void {
        Controls.keyboard.KEY_LEFT = false;
        Controls.keyboard.KEY_RIGHT = false;
        Controls.keyboard.KEY_UP = false;
        Controls.keyboard.KEY_DOWN = false;
        Controls.keyboard.KEY_SPACE = false;

        Controls.mouse.LEFT_BUTTON = false;
        Controls.mouse.RIGHT_BUTTON = false;
        Controls.mouse.MIDDLE_BUTTON = false;

        Controls.touch.TOUCH1 = false;
        Controls.touch.TOUCH2 = false;
        Controls.touch.TOUCH3 = false;
    }
} 