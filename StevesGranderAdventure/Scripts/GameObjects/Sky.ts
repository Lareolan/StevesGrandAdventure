﻿/**
 * This file contains game's sky bitmap image.
 * Author:              Konstantin Koton
 * Filename:            Sky.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 23, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 */
module GameObjects {
    // Sky Class
    export class Sky extends GameObjects.BitmapObject {
        // Initializes the name of the bitmap object
        name: string = "Sky";

        // The constructor adds the sky to the stage at position 0 (the very back)
        constructor() {
            super("sky", null, 0);
        }
    }
} 