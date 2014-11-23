/**
* This file contains game's cloud manager
* Author:              Konstantin Koton
* Filename:            Assets.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:    Too numerous to mention
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
        };
        Assets.assetList = [
            { id: "sky", src: "Assets/images/Sky.png" },
            { id: "cloud1", src: "Assets/images/Cloud_1.png" },
            { id: "cloud2", src: "Assets/images/Cloud_2.png" },
            { id: "MasterTileSet", src: "Assets/images/MasterTileSet.png", type: createjs.LoadQueue.IMAGE, data: 102955 },
            { id: "Character-Tileset", src: "Assets/images/MasterTileSet.png" },
            { id: "Level1Map", src: "Assets/data/Level1.tmx", type: createjs.LoadQueue.XML },
            { id: "GuiComponents", src: "Assets/images/GuiComponents.png" },
            { id: "stone1", src: "Assets/sounds/stone1.ogg" },
            { id: "stone2", src: "Assets/sounds/stone2.ogg" },
            { id: "piano3", src: "Assets/sounds/piano3.ogg" },
            { id: "lava", src: "Assets/sounds/lava.ogg" },
            { id: "lavapop", src: "Assets/sounds/lavapop.ogg" },
            { id: "water", src: "Assets/sounds/water.ogg" },
            { id: "hit", src: "Assets/sounds/hit1.ogg" },
            { id: "zombie_step1", src: "Assets/sounds/zombie/step1.ogg" },
            { id: "zombie_step2", src: "Assets/sounds/zombie/step2.ogg" },
            { id: "zombie_say1", src: "Assets/sounds/zombie/say1.ogg" },
            { id: "zombie_say2", src: "Assets/sounds/zombie/say2.ogg" },
            { id: "zombie_say3", src: "Assets/sounds/zombie/say3.ogg" },
            { id: "zombie_hurt1", src: "Assets/sounds/zombie/hurt1.ogg" },
            { id: "zombie_hurt2", src: "Assets/sounds/zombie/hurt2.ogg" },
            { id: "zombie_death", src: "Assets/sounds/zombie/death.ogg" }
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
                [518, 2, 32, 32],
                [552, 2, 32, 32],
                [586, 2, 32, 32],
                [620, 2, 32, 32],
                [654, 2, 32, 32],
                [688, 2, 32, 32],
                [2, 2, 320, 32],
                [722, 2, 32, 32],
                [324, 2, 192, 32],
                [756, 2, 32, 32],
                [790, 2, 32, 32]
            ],
            animations: {
                "AKey": [0],
                "DKey": [1],
                "FullFood": [2],
                "FullHeart": [3],
                "HalfHeart": [4],
                "LeftArrowKey": [5],
                "MeterBackground": [6],
                "RightArrowKey": [7],
                "SpaceBar": [8],
                "UpArrowKey": [9],
                "WKey": [10]
            }
        };
        return Assets;
    })();
    Managers.Assets = Assets;
})(Managers || (Managers = {}));
//# sourceMappingURL=Assets.js.map
