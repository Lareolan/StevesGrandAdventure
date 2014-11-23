/**
 * This file contains game's cloud manager
 * Author:              Konstantin Koton
 * Filename:            CloudManager.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:    Too numerous to mention
 */
module Managers {
    // The cloud manager class
    export class CloudManager {
        clouds: Array<GameObjects.Cloud>;
        cloudCountBias: number;

        // the constructor take in a count bias to provide some randomness to the number
        // of clouds on screen.
        constructor(cloudCountBias: number) {
            this.cloudCountBias = cloudCountBias;
            this.clouds = [];
            this.initClouds();
        }

        // Initialize the clouds
        initClouds(): void {
            var cloudCount = this.getCloudCount();
            for (var index = this.clouds.length; index < cloudCount; index++) {
                this.clouds.push(this.getNewCloud());
            }
        }

        // Create a new cloud instance and bind the cloud off screen event
        getNewCloud(): GameObjects.Cloud {
            var cloudName = constants.CLOUDS[Math.floor(Math.random() * constants.CLOUDS.length)];
            var sky = stage.getChildByName("Sky");
            var index = stage.getChildIndex(sky) + 1;

            var newCloud = new GameObjects.Cloud(cloudName, index);
            var x = -newCloud.width;
            var y = Math.floor(Math.random() * (stage.canvas.height * 0.5));
            var speed = Math.floor(Math.random() * 4 + 2);

            newCloud.setPosition(x, y);
            newCloud.setSpeed(speed);

            newCloud.addEventListener("cloudOffScreen", { handleEvent: this.handleOffScreen, instance: this });
            return newCloud;
        }

        // Get a randomized number of clouds
        getCloudCount(): number {
            return this.cloudCountBias + Math.floor(Math.random() * 4) - 2;
        }

        // Handle the cloud off screen sevent sent by cloud instances
        handleOffScreen(event): void {
            var instance = this.instance;
            var index = instance.clouds.indexOf(event.target);
            if (index !== undefined) {
                var res = stage.removeChild(event.target);
                instance.clouds.splice(index, 1);
                instance.initClouds();
            }
        }

        // Update each cloud's position
        update(): void {
            for (var index = 0; index < this.clouds.length; index++) {
                this.clouds[index].update();
            }
        }

        // Move all the static objects to the right to reflect player moving left
        moveLeft(): void {
            for (var index = 0; index < this.clouds.length; index++) {
                this.clouds[index].moveLeft();
            }
        }

        // Move all the static objects to the left to reflect player moving right
        moveRight(): void {
            for (var index = 0; index < this.clouds.length; index++) {
                this.clouds[index].moveRight();
            }
        }

        // Show all the clouds by adding each one to the stage
        show(): void {
            for (var index = 0; index < this.clouds.length; index++) {
                this.clouds[index].show();
            }
        }

        // Hide all the clouds by removing each one from the stage
        hide(): void {
            for (var index = 0; index < this.clouds.length; index++) {
                this.clouds[index].hide();
            }
        }

        // Get an array of cloud bitmap images
        getImages(): Array<createjs.Bitmap> {
            var cloudImages = [];
            for (var index = 0; index < this.clouds.length; index++) {
                cloudImages.push(this.clouds[index].getImage());
            }
            return cloudImages;
        }

        // Reset the clouds
        reset(): void {
            this.clouds = [];
            this.initClouds();
        }
    }
} 