/**
 * This file contains game's base Screen objects used as the base by the various
 * GUI screen objects.
 * Author:              Konstantin Koton
 * Filename:            Screen.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 *      v2 - Moved class into GUIScreen module
 */
module GUIScreen {
    // The Screen class
    export class Screen {
        // Instance variables
        stage: createjs.Stage;
        screenObjects: Array <createjs.DisplayObject>;

        // Constructor simply initializes the screen objects array
        constructor(stage: createjs.Stage) {
            this.stage = stage;
            this.screenObjects = [];
        }

        // Hides all screen objects by taking them out of the stage and into an internal
        // storage array, then clearing the stage.
        hide() {
//            for (var index = 0; index < this.stage.getNumChildren(); index++) {
//                this.screenObjects.push(this.stage.getChildAt(index));
//            }
            this.stage.removeAllChildren();
        }

        // Shows all the objects in this screen by adding them one by one to the stage after
        // clearing the stage's current objects first.
        show() {
            this.stage.removeAllChildren();
            for (var index = 0; index < this.screenObjects.length; index++) {
                this.stage.addChild(this.screenObjects[index]);
            }
        }

        // Placeholder for init code for the inheriting screens
        init() { }

        // Add an object to the screen
        addChild(image: createjs.DisplayObject): void {
            this.screenObjects.push(image);
        }

        // Add an array of objects to the screen
        addChildArray(images: Array<createjs.DisplayObject>): void {
            this.screenObjects.concat(images);
        }
    }
}