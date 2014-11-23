/**
* This file contains game's mob manager
* Author:              Konstantin Koton
* Filename:            Mobs.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:    Too numerous to mention
*/
var Managers;
(function (Managers) {
    // The Mob manager class
    var Mobs = (function () {
        /*
        * This constructor takes in a list of Mob objects, and creates appropriate Monster
        * objects out of them. For now only Zombie objects are created.
        */
        function Mobs(mobList, foreground, sound, player) {
            this.rawMobData = mobList;
            this.foreground = foreground;
            this.sound = sound;
            this.player = player;

            this.mobs = [];

            for (var index = 0; index < mobList.length; index++) {
                if (mobList[index]["name"] === "Zombie") {
                    this.mobs.push(new GameObjects.Mobs.Zombie(mobList[index], foreground, sound, player));
                    this.mobs[index].name = "Zombie " + index;
                }
            }
        }
        /*
        * This function tests whether or not any of the mobs got his by the player's attack.
        * If Monster.hitTest() returns false, then the monster died from the attack.
        * Remove it from the game.
        */
        Mobs.prototype.hitTest = function (damage) {
            var distance;
            var deadMobIdx = -1;
            for (var index = 0; index < this.mobs.length; index++) {
                if (!this.mobs[index].hitTest(damage)) {
                    deadMobIdx = index;
                    this.mobs[index].die();
                    break;
                }
            }

            if (deadMobIdx != -1) {
                this.mobs.splice(deadMobIdx, 1);
            }
        };

        // Move all the mobs to the right
        Mobs.prototype.moveRight = function () {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].moveRight();
            }
        };

        // Move all the mobs to the left
        Mobs.prototype.moveLeft = function () {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].moveLeft();
            }
        };

        // Move all the Mobs to the right
        Mobs.prototype.shiftRight = function () {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].shiftRight();
            }
        };

        // Move all the Mobs to the left
        Mobs.prototype.shiftLeft = function () {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].shiftLeft();
            }
        };

        // Run each mob's update function, runs each tick
        Mobs.prototype.update = function () {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].update();
            }
        };

        // Display all mobs by adding each one to the stage
        Mobs.prototype.show = function () {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].show();
            }
        };

        // Hide all mobs by removing each one from the stage
        Mobs.prototype.hide = function () {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].hide();
            }
        };

        // Reset all the mobs back to default position (for use in restarting game)
        Mobs.prototype.reset = function () {
            this.hide();
            this.mobs = [];

            for (var index = 0; index < this.rawMobData.length; index++) {
                if (this.rawMobData[index]["name"] === "Zombie") {
                    this.mobs.push(new GameObjects.Mobs.Zombie(this.rawMobData[index], this.foreground, this.sound, this.player));
                    this.mobs[index].name = "Zombie " + index;
                }
            }
        };
        return Mobs;
    })();
    Managers.Mobs = Mobs;
})(Managers || (Managers = {}));
//# sourceMappingURL=Mobs.js.map
