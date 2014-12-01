/**
 * This file contains game's cloud manager
 * Author:              Konstantin Koton
 * Filename:            CloudManager.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 *      v2 - Modified class to extend createjs.Container
 */
module Managers {
    // The cloud manager class
    export class CloudManager extends createjs.Container {
        // Game variables
//        clouds: Array<GameObjects.Cloud>;
        cloudCountBias: number;

        // Fix squiggly lines, not actually used
        instance: any;

        // the constructor take in a count bias to provide some randomness to the number
        // of clouds on screen.
        constructor(cloudCountBias: number) {
            super();
            this.cloudCountBias = cloudCountBias;
//            this.clouds = [];
            this.initClouds();
        }

        // Initialize the clouds
        initClouds(): void {
            var cloudCount = this.getCloudCount();
//            for (var index = this.clouds.length; index < cloudCount; index++) {
            for (var index = this.children.length; index < cloudCount; index++) {
                var newCloud = this.getNewCloud();
//                this.clouds.push(newCloud);
                this.addChild(newCloud);
            }
        }

        // Create a new cloud instance and bind the cloud off screen event
        getNewCloud(): GameObjects.Cloud {
            var cloudName = constants.CLOUDS[Math.floor(Math.random() * constants.CLOUDS.length)];
//            var sky = stage.getChildByName("Sky");
//            var index = stage.getChildIndex(sky) + 1;

            var newCloud = new GameObjects.Cloud(cloudName);
            var x = -this.x - newCloud.width;
            var y = Math.floor(Math.random() * Constants.HALF_SCREEN_HEIGHT);
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

        // Handle the cloud off screen event sent by cloud instances
        handleOffScreen(event): void {
            var instance = this.instance;
//            var index = instance.clouds.indexOf(event.target);
            var index = instance.children.indexOf(event.target);
            if (index !== undefined) {
                var res = instance.removeChild(event.target);
//                instance.clouds.splice(index, 1);
                instance.initClouds();
            }
        }

        // Update each cloud's position
        update(): void {
            for (var index = 0; index < this.children.length; index++) {
                (<GameObjects.Cloud>this.children[index]).update();
            }
//            super.update();
//            for (var index = 0; index < this.clouds.length; index++) {
//                this.clouds[index].update();
//            }
        }

        // Move all the static objects to the right to reflect player moving left
        moveLeft(): void {
//            for (var index = 0; index < this.clouds.length; index++) {
//                this.clouds[index].moveLeft();
//            }
            this.x += Constants.MOVE_SPEED;
        }

        // Move all the static objects to the left to reflect player moving right
        moveRight(): void {
//            for (var index = 0; index < this.clouds.length; index++) {
//                this.clouds[index].moveRight();
//            }
            this.x -= Constants.MOVE_SPEED;
        }

        // Show all the clouds by adding each one to the stage
        show(): void {
//            for (var index = 0; index < this.clouds.length; index++) {
//                this.clouds[index].show();
//            }
        }

        // Hide all the clouds by removing each one from the stage
        hide(): void {
//            for (var index = 0; index < this.clouds.length; index++) {
//                this.clouds[index].hide();
//            }
        }

        // Get an array of cloud bitmap images
        getImages(): Array<createjs.Bitmap> {
            var cloudImages = [];
//            for (var index = 0; index < this.clouds.length; index++) {
//                cloudImages.push(this.clouds[index].getImage());
//            }
            return cloudImages;
        }

        // Reset the clouds
        reset(): void {
//            this.clouds = [];
            this.initClouds();
        }
    }
} 