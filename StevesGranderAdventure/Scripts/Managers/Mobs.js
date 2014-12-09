var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This file contains game's mob manager
* Author:              Konstantin Koton
* Filename:            Mobs.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Dec. 9, 2014
* Revision History:
*      v1 - Migrated file to Project 1
*      v2 - Modified class to extend createjs.Container
*      v3 - Moved mob loading code from constructor to separate loadMobs() function
*/
var Managers;
(function (Managers) {
    // The Mob manager class
    var Mobs = (function (_super) {
        __extends(Mobs, _super);
        /*
        * This constructor takes initializes the Mob object and sets internal references to sound and player objects
        * @param sound The object reference to the Sound Manager instance
        * @param player The object reference to the Player instance
        */
        function Mobs(sound, player) {
            _super.call(this);
            this.sound = sound;
            this.player = player;
        }
        /**
        * This function loads all the mobs from an array of Objects loaded from the raw map data
        * @param mobList The raw list of mob objects to process and use to create mobs
        */
        Mobs.prototype.loadMobs = function (mobList) {
            this.rawMobData = mobList;
            this.init();
        };

        /**
        * Sets the collision map for the Mobs container object
        * @param foreground The Layer object that contains the collision map
        */
        Mobs.prototype.setMapData = function (foreground) {
            this.foreground = foreground;
        };

        /**
        * Initialize all mobs based on data provided
        */
        Mobs.prototype.init = function () {
            var zombie;
            var creeper;

            for (var index = 0; index < this.rawMobData.length; index++) {
                if (this.rawMobData[index]["name"] === "Zombie") {
                    zombie = new GameObjects.Mobs.Zombie();
                    zombie.name = "Zombie " + index;
                    zombie.setEntity(this.rawMobData[index]);
                    zombie.setMapData(this.foreground);
                    zombie.setSound(this.sound);
                    zombie.setPlayer(this.player);

                    this.addChild(zombie);
                } else if (this.rawMobData[index]["name"] === "Creeper") {
                    creeper = new GameObjects.Mobs.Creeper();
                    creeper.name = "Creeper " + index;
                    creeper.setEntity(this.rawMobData[index]);
                    creeper.setMapData(this.foreground);
                    creeper.setSound(this.sound);
                    creeper.setPlayer(this.player);

                    this.addChild(creeper);
                }
            }
        };

        /*
        * This function tests whether or not any of the mobs got his by the player's attack.
        * If Monster.hitTest() returns false, then the monster died from the attack.
        * Remove it from the game.
        */
        Mobs.prototype.testMobHit = function (damage) {
            var distance;
            var deadMobIdx = -1;
            for (var index = 0; index < this.children.length; index++) {
                if (!this.children[index].hitTest(damage)) {
                    this.children[index].die();
                    break;
                }
            }
        };

        // Move all the mobs to the right
        Mobs.prototype.moveRight = function () {
            for (var index = 0; index < this.children.length; index++) {
                this.children[index].moveRight();
            }
        };

        // Move all the mobs to the left
        Mobs.prototype.moveLeft = function () {
            for (var index = 0; index < this.children.length; index++) {
                this.children[index].moveLeft();
            }
        };

        // Shift all the Mobs to the right
        Mobs.prototype.shiftRight = function () {
            this.x += Constants.MOVE_SPEED;
        };

        // Shift all the Mobs to the left
        Mobs.prototype.shiftLeft = function () {
            this.x -= Constants.MOVE_SPEED;
        };

        // Run each mob's update function, runs each tick
        Mobs.prototype.update = function () {
            for (var index = 0; index < this.children.length; index++) {
                this.children[index].update();
            }
        };

        // Reset all the mobs back to default position (for use in restarting game)
        Mobs.prototype.reset = function () {
            this.removeAllChildren();
            this.x = 0;
            this.y = 0;
            this.init();
        };
        return Mobs;
    })(createjs.Container);
    Managers.Mobs = Mobs;
})(Managers || (Managers = {}));
//# sourceMappingURL=Mobs.js.map
