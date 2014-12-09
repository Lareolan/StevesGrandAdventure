/**
* This file contains game control states.
* Author:              Konstantin Koton
* Filename:            Controls.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Dec. 9, 2014
* Revision History:
*      v1 - Created module and added all game controls to it.
*      v2 - Added resetControls() function.
*      v3 - Added keys 0 - 9 to the controls list.
*/
var Controls;
(function (Controls) {
    Controls.keyboard = {
        KEY_LEFT: false,
        KEY_RIGHT: false,
        KEY_UP: false,
        KEY_DOWN: false,
        KEY_SPACE: false,
        KEY_1: false,
        KEY_2: false,
        KEY_3: false,
        KEY_4: false,
        KEY_5: false,
        KEY_6: false,
        KEY_7: false,
        KEY_8: false,
        KEY_9: false,
        KEY_0: false
    };
    Controls.mouse = {
        LEFT_BUTTON: false,
        RIGHT_BUTTON: false,
        MIDDLE_BUTTON: false
    };
    Controls.touch = {
        TOUCH1: false,
        TOUCH2: false,
        TOUCH3: false
    };

    /**
    * A simple function to reset all control states to default so keys don't get "stuck" sometimes.
    */
    function resetControls() {
        Controls.keyboard.KEY_LEFT = false;
        Controls.keyboard.KEY_RIGHT = false;
        Controls.keyboard.KEY_UP = false;
        Controls.keyboard.KEY_DOWN = false;
        Controls.keyboard.KEY_SPACE = false;
        Controls.keyboard.KEY_1 = false;
        Controls.keyboard.KEY_2 = false;
        Controls.keyboard.KEY_3 = false;
        Controls.keyboard.KEY_4 = false;
        Controls.keyboard.KEY_5 = false;
        Controls.keyboard.KEY_6 = false;
        Controls.keyboard.KEY_7 = false;
        Controls.keyboard.KEY_8 = false;
        Controls.keyboard.KEY_9 = false;
        Controls.keyboard.KEY_0 = false;

        Controls.mouse.LEFT_BUTTON = false;
        Controls.mouse.RIGHT_BUTTON = false;
        Controls.mouse.MIDDLE_BUTTON = false;

        Controls.touch.TOUCH1 = false;
        Controls.touch.TOUCH2 = false;
        Controls.touch.TOUCH3 = false;
    }
    Controls.resetControls = resetControls;
})(Controls || (Controls = {}));
//# sourceMappingURL=Controls.js.map
