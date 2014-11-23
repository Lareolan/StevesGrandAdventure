/**
 * This file contains game's raw sprite object (Currently not used for anything).
 * Author:              Konstantin Koton
 * Filename:            SpriteObject.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:    Too numerous to mention
 */
module GameObjects {
    // The SpriteObject class
    export class SpriteObject extends createjs.Sprite {
        // Instance variables
        width: number;
        height: number;

        /*
         * The constructor takes in the name of an asset, and an optional index, and
         * initializes the sprite object. If index is specified, then adds the sprite
         * to the stage at that index, otherwise adds it to the top of the stage.
         */
        constructor(imageAsset: string, positionIndex: number = null) {
            super(Managers.Assets.characters, imageAsset);
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            if (positionIndex !== null) {
                stage.addChildAt(this, positionIndex);
            } else {
                stage.addChild(this);
            }
        }
    }
} 