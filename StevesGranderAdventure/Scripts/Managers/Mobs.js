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
* Date Last Modified:  Nov. 22, 2014
* Revision History:
*      v1 - Migrated file to Project 1
*      v2 - Modified class to extend createjs.Container
*/
var Managers;
(function (Managers) {
    // The Mob manager class
    var Mobs = (function (_super) {
        __extends(Mobs, _super);
        //        children: GameObjects.Monster;
        /*
        * This constructor takes in a list of Mob objects, and creates appropriate Monster
        * objects out of them. For now only Zombie objects are created.
        */
        function Mobs(mobList, foreground, sound, player) {
            _super.call(this);
            this.rawMobData = mobList;
            this.foreground = foreground;
            this.sound = sound;
            this.player = player;

            //            this.mobs = [];
            this.init();
        }
        // Initialize all mobs
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
                    //                    deadMobIdx = index;
                    this.children[index].die();
                    break;
                }
            }
            //            if (deadMobIdx != -1) {
            //                this.children.splice(deadMobIdx, 1);
            //            }
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

        // Move all the Mobs to the right
        Mobs.prototype.shiftRight = function () {
            //            for (var index = 0; index < this.mobs.length; index++) {
            //                this.mobs[index].shiftRight();
            //            }
            this.x += Constants.MOVE_SPEED;
        };

        // Move all the Mobs to the left
        Mobs.prototype.shiftLeft = function () {
            //            for (var index = 0; index < this.mobs.length; index++) {
            //                this.mobs[index].shiftLeft();
            //            }
            this.x -= Constants.MOVE_SPEED;
        };

        // Run each mob's update function, runs each tick
        Mobs.prototype.update = function () {
            for (var index = 0; index < this.children.length; index++) {
                this.children[index].update();
            }
            //            for (var index = 0; index < this.mobs.length; index++) {
            //                this.mobs[index].update();
            //            }
        };

        // Display all mobs by adding each one to the stage
        Mobs.prototype.show = function () {
            //            for (var index = 0; index < this.mobs.length; index++) {
            //                this.mobs[index].show();
            //            }
        };

        // Hide all mobs by removing each one from the stage
        Mobs.prototype.hide = function () {
            //            for (var index = 0; index < this.mobs.length; index++) {
            //                this.mobs[index].hide();
            //            }
        };

        // Reset all the mobs back to default position (for use in restarting game)
        Mobs.prototype.reset = function () {
            this.removeAllChildren();
            this.x = 0;
            this.y = 0;
            this.init();
            //            this.hide();
            //            this.mobs = [];
            /*
            for (var index = 0; index < this.rawMobData.length; index++) {
            if (this.rawMobData[index]["name"] === "Zombie") {
            this.mobs.push(new GameObjects.Mobs.Zombie(this.rawMobData[index], this.foreground, this.sound, this.player));
            this.mobs[index].name = "Zombie " + index;
            }
            }
            */
        };
        return Mobs;
    })(createjs.Container);
    Managers.Mobs = Mobs;
})(Managers || (Managers = {}));
//# sourceMappingURL=Mobs.js.map
