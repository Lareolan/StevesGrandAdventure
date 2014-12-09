/**
* This file contains game's cloud manager
* Author:              Konstantin Koton
* Filename:            Assets.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Dec. 9, 2014
* Revision History:
*      v1 - Migrated file to Project 1
*      v2 - Added assets for levels 2 and 3, added new mob assets for creepers
*/
var Managers;
(function (Managers) {
    // The Assets class
    var Assets = (function () {
        function Assets() {
        }
        // Loads all the game assets
        Assets.init = function () {
            this.loader = new createjs.LoadQueue();
            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(this.assetList);
            this.characters = new createjs.SpriteSheet(this.characterSpriteSheet);
            this.guiComponents = new createjs.SpriteSheet(this.guiSpriteSheet);
            this.explosion = new createjs.SpriteSheet(this.explosionSpriteSheet);
        };
        Assets.assetList = [
            { id: "sky", src: "Assets/images/Sky.png" },
            { id: "cloud1", src: "Assets/images/Cloud_1.png" },
            { id: "cloud2", src: "Assets/images/Cloud_2.png" },
            { id: "MasterTileSet", src: "Assets/images/MasterTileSet.png", type: createjs.LoadQueue.IMAGE, data: 102955 },
            { id: "Character-Tileset", src: "Assets/images/MasterTileSet.png" },
            { id: "Level1", src: "Assets/data/Level1.tmx", type: createjs.LoadQueue.XML },
            { id: "Level2", src: "Assets/data/Level2.tmx", type: createjs.LoadQueue.XML },
            { id: "Level3", src: "Assets/data/Level3.tmx", type: createjs.LoadQueue.XML },
            { id: "stone1", src: "Assets/sounds/stone1.ogg" },
            { id: "stone2", src: "Assets/sounds/stone2.ogg" },
            { id: "piano3", src: "Assets/sounds/piano3.ogg" },
            { id: "lava", src: "Assets/sounds/lava.ogg" },
            { id: "lavapop", src: "Assets/sounds/lavapop.ogg" },
            { id: "water", src: "Assets/sounds/water.ogg" },
            { id: "hit", src: "Assets/sounds/hit1.ogg" },
            { id: "eat", src: "Assets/sounds/eat.ogg" },
            { id: "zombie_step1", src: "Assets/sounds/zombie/step1.ogg" },
            { id: "zombie_step2", src: "Assets/sounds/zombie/step2.ogg" },
            { id: "zombie_say1", src: "Assets/sounds/zombie/say1.ogg" },
            { id: "zombie_say2", src: "Assets/sounds/zombie/say2.ogg" },
            { id: "zombie_say3", src: "Assets/sounds/zombie/say3.ogg" },
            { id: "zombie_hurt1", src: "Assets/sounds/zombie/hurt1.ogg" },
            { id: "zombie_hurt2", src: "Assets/sounds/zombie/hurt2.ogg" },
            { id: "zombie_death", src: "Assets/sounds/zombie/death.ogg" },
            { id: "creeper_fuse", src: "Assets/sounds/creeper/fuse.ogg" },
            { id: "creeper_explode1", src: "Assets/sounds/creeper/explode1.ogg" },
            { id: "creeper_explode2", src: "Assets/sounds/creeper/explode2.ogg" },
            { id: "creeper_explode3", src: "Assets/sounds/creeper/explode3.ogg" },
            { id: "creeper_explode4", src: "Assets/sounds/creeper/explode4.ogg" },
            { id: "creeper_hurt1", src: "Assets/sounds/creeper/hurt1.ogg" },
            { id: "creeper_hurt2", src: "Assets/sounds/creeper/hurt2.ogg" },
            { id: "creeper_hurt3", src: "Assets/sounds/creeper/hurt3.ogg" },
            { id: "creeper_hurt4", src: "Assets/sounds/creeper/hurt4.ogg" },
            { id: "creeper_death", src: "Assets/sounds/creeper/death.ogg" }
        ];

        Assets.characterSpriteSheet = {
            images: ["Assets/images/Character-Tileset.png"],
            frames: { width: 64, height: 64 },
            animations: {
                steveStandRight: [0],
                steveStepRight: [1],
                steveStandRightAttack: [2],
                steveStepRightAttack: [3],
                steveStandLeft: [4],
                steveStepLeft: [5],
                steveStandLeftAttack: [6],
                steveStepLeftAttack: [7],
                zombieStandRight: [8],
                zombieStepRight: [9],
                zombieStandLeft: [10],
                zombieStepLeft: [11],
                creeper: [12]
            }
        };

        Assets.guiSpriteSheet = {
            images: ["Assets/images/GuiComponents.png"],
            frames: [
                [0, 78, 32, 32],
                [33, 78, 32, 32],
                [165, 78, 27, 27],
                [193, 78, 18, 18],
                [66, 78, 32, 32],
                [0, 0, 364, 44],
                [99, 78, 32, 32],
                [0, 45, 192, 32],
                [132, 78, 32, 32],
                [193, 45, 32, 32]
            ],
            animations: {
                AKey: [0],
                DKey: [1],
                FullFood: [2],
                FullHeart: [3],
                LeftArrowKey: [4],
                QuickBar: [5],
                RightArrowKey: [6],
                SpaceBar: [7],
                UpArrowKey: [8],
                WKey: [9]
            }
        };

        Assets.explosionSpriteSheet = {
            images: ["Assets/images/ExplosionSpriteSheet.png"],
            frames: { width: 160, height: 160, count: 25, regX: 80, regY: 80 },
            animations: {
                explode: [0, 24, false, 1]
            }
        };
        return Assets;
    })();
    Managers.Assets = Assets;
})(Managers || (Managers = {}));
//# sourceMappingURL=Assets.js.map
