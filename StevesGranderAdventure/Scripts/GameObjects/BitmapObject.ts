﻿/**
 * This file contains the game's Bitmap object
 * Author:              Konstantin Koton
 * Filename:            BitmapObject.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 */
module GameObjects {
    // BitmapObject Class
    export class BitmapObject extends createjs.Bitmap {
        width: number;
        height: number;
        posX: number;
        posY: number;

        /*
         * The constructor optionally takes an image asset name string or a Bitmap image,
         * as well as an optional index and creates a Bitmap.
         */
        constructor(imageAsset?: string, bitmapAsset?: createjs.Bitmap, positionIndex: number = null) {
            if (imageAsset) {
                super(<string>Managers.Assets.loader.getResult(imageAsset));
            } else if (bitmapAsset) {
                super(bitmapAsset.image);
            } else {
                return;
            }
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.x = this.regX;
            this.y = this.regY;
        }

        // Retrieve the Bitmap object
        getImage(): createjs.Bitmap {
            return this;
        }
    }
}  