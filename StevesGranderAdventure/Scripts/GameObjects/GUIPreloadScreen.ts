/**
 * This file contains the game's preload screen object
 * Author:              Konstantin Koton
 * Filename:            GUIPreloadScreen.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:    Too numerous to mention
 */
module GameObjects {
    // GUIPreloadScreen Class
    export class GUIPreloadScreen extends GameObjects.Screen {
        // Instance variables
        progressBar: createjs.Shape;
        text: createjs.Text;
        progressBarWidth: number = 400;
        progressBarheight: number = 50;

        // Fix squiggly lines, not actually used
        instance: any;


        // Constructor simply calls the super class constructor
        constructor(stage: createjs.Stage) {
            super(stage);
            this.init();
        }

        init() {
            this.progressBar = new createjs.Shape();
            this.text = new createjs.Text();
            this.text.font = "bold 36px Arial";
            this.text.color = "#C33";
            this.text.textAlign = "center";
            this.text.textBaseline = "middle";
            this.text.x = Constants.HALF_SCREEN_WIDTH;
            this.text.y = Constants.HALF_SCREEN_HEIGHT;
            this.screenObjects.push(this.progressBar);
            this.screenObjects.push(this.text);

            Managers.Assets.init();
            Managers.Assets.loader.addEventListener("progress", { handleEvent: this.handleProgress, instance: this });
            Managers.Assets.loader.addEventListener("complete", { handleEvent: this.handleComplete, instance: this });
        }

        // Display a loading progress bar
        handleProgress(event: ProgressEvent): void {
            var instance = this.instance;
            var x = Constants.HALF_SCREEN_WIDTH - instance.progressBarWidth / 2;
            var y = Constants.HALF_SCREEN_HEIGHT - instance.progressBarheight / 2;
            var progress = event.loaded / event.total;

            // Draw the progress bar shape to reflect progress
            instance.progressBar.graphics.clear();
            instance.progressBar.graphics.beginStroke("#000").drawRect(x, y, instance.progressBarWidth, instance.progressBarheight);
            instance.progressBar.graphics.beginFill("#CCC").drawRect(x, y, instance.progressBarWidth * progress, instance.progressBarheight);

            // Change the text to reflect progress
            instance.text.text = (progress * 100).toFixed(0) + "% complete";
        }

        // Once loading is done, initialize the game and load main screen
        handleComplete(event: Event): void {
            var instance = this.instance;
            var complete = new createjs.Event("preloadComplete", true, false);
            instance.stage.dispatchEvent(complete);
        }
    }
}  