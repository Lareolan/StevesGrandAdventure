var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
var Managers;
(function (Managers) {
    // The cloud manager class
    var CloudManager = (function (_super) {
        __extends(CloudManager, _super);
        // the constructor take in a count bias to provide some randomness to the number
        // of clouds on screen.
        function CloudManager(cloudCountBias) {
            _super.call(this);
            this.cloudCountBias = cloudCountBias;

            //            this.clouds = [];
            this.initClouds();
        }
        // Initialize the clouds
        CloudManager.prototype.initClouds = function () {
            var cloudCount = this.getCloudCount();

            for (var index = this.children.length; index < cloudCount; index++) {
                var newCloud = this.getNewCloud();

                //                this.clouds.push(newCloud);
                this.addChild(newCloud);
            }
        };

        // Create a new cloud instance and bind the cloud off screen event
        CloudManager.prototype.getNewCloud = function () {
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
        };

        // Get a randomized number of clouds
        CloudManager.prototype.getCloudCount = function () {
            return this.cloudCountBias + Math.floor(Math.random() * 4) - 2;
        };

        // Handle the cloud off screen event sent by cloud instances
        CloudManager.prototype.handleOffScreen = function (event) {
            var instance = this.instance;

            //            var index = instance.clouds.indexOf(event.target);
            var index = instance.children.indexOf(event.target);
            if (index !== undefined) {
                var res = instance.removeChild(event.target);

                //                instance.clouds.splice(index, 1);
                instance.initClouds();
            }
        };

        // Update each cloud's position
        CloudManager.prototype.update = function () {
            for (var index = 0; index < this.children.length; index++) {
                this.children[index].update();
            }
            //            super.update();
            //            for (var index = 0; index < this.clouds.length; index++) {
            //                this.clouds[index].update();
            //            }
        };

        // Move all the static objects to the right to reflect player moving left
        CloudManager.prototype.shiftRight = function () {
            //            for (var index = 0; index < this.clouds.length; index++) {
            //                this.clouds[index].moveLeft();
            //            }
            this.x += Constants.MOVE_SPEED;
        };

        // Move all the static objects to the left to reflect player moving right
        CloudManager.prototype.shiftLeft = function () {
            //            for (var index = 0; index < this.clouds.length; index++) {
            //                this.clouds[index].moveRight();
            //            }
            this.x -= Constants.MOVE_SPEED;
        };

        // Show all the clouds by adding each one to the stage
        CloudManager.prototype.show = function () {
            //            for (var index = 0; index < this.clouds.length; index++) {
            //                this.clouds[index].show();
            //            }
        };

        // Hide all the clouds by removing each one from the stage
        CloudManager.prototype.hide = function () {
            //            for (var index = 0; index < this.clouds.length; index++) {
            //                this.clouds[index].hide();
            //            }
        };

        // Get an array of cloud bitmap images
        CloudManager.prototype.getImages = function () {
            var cloudImages = [];

            //            for (var index = 0; index < this.clouds.length; index++) {
            //                cloudImages.push(this.clouds[index].getImage());
            //            }
            return cloudImages;
        };

        // Reset the clouds
        CloudManager.prototype.reset = function () {
            //            this.clouds = [];
            this.initClouds();
        };
        return CloudManager;
    })(createjs.Container);
    Managers.CloudManager = CloudManager;
})(Managers || (Managers = {}));
//# sourceMappingURL=CloudManager.js.map
