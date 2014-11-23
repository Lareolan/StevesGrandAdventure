/**
 * This file contains game's sky bitmap image.
 * Author:              Konstantin Koton
 * Filename:            Sky.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:    Too numerous to mention
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

        // Show the sky by adding it to the stage
        show(): void {
            stage.addChildAt(this.image, 0);
        }

        // Hit the sky by removing it from the stage
        hide(): void {
            stage.removeChild(this.image);
        }
    }
} 