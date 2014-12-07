/**
 * This file contains game's sound manager
 * Author:              Konstantin Koton
 * Filename:            Sound.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 * TODO: v2 - Add panning support for moving sounds
 */
module Managers {
    // An internal class containing static names of the various sound assets.
    export class SoundsList {
        static WALK1: string = "stone1";
        static WALK2: string = "stone2";
        static BACKGROUND: string = "piano3";
        static LAVA: string = "lava";
        static LAVA_POP: string = "lavapop";
        static WATER: string = "water";
        static HIT: string = "hit";
        static EAT: string = "eat";
        static ZOMBIE_WALK1: string = "zombie_step1";
        static ZOMBIE_WALK2: string = "zombie_step2";
        static ZOMBIE_TALK1: string = "zombie_say1";
        static ZOMBIE_TALK2: string = "zombie_say2";
        static ZOMBIE_TALK3: string = "zombie_say3";
        static ZOMBIE_HURT1: string = "zombie_hurt1";
        static ZOMBIE_HURT2: string = "zombie_hurt2";
        static ZOMBIE_DEATH: string = "zombie_death";
        static CREEPER_FUSE: string = "creeper_fuse";
        static CREEPER_EXPLODE1: string = "creeper_explode1";
        static CREEPER_EXPLODE2: string = "creeper_explode2";
        static CREEPER_EXPLODE3: string = "creeper_explode3";
        static CREEPER_EXPLODE4: string = "creeper_explode4";
        static CREEPER_HURT1: string = "creeper_hurt1";
        static CREEPER_HURT2: string = "creeper_hurt2";
        static CREEPER_HURT3: string = "creeper_hurt3";
        static CREEPER_HURT4: string = "creeper_hurt4";
        static CREEPER_DEATH: string = "creeper_death";
    }

    // Sound manager class
    export class Sound {
        // Container
//        private children: Array<createjs.SoundInstance>;

        // Internal variables
        private background: createjs.SoundInstance;
        private playerWalkSound: string;
        private playerWalkInstance: createjs.SoundInstance;
        private playerHitInstance: createjs.SoundInstance;
        private zombieSpeakSound: string;
        private zombieSpeakInstance: createjs.SoundInstance;
        private creeperSpeakSound: string;
        private creeperSpeakInstance: createjs.SoundInstance;
        private lavaInstance: createjs.SoundInstance;
        private lavaPopInstance: createjs.SoundInstance;
        private waterInstance: createjs.SoundInstance;

        // The constructor
        constructor() {
//            this.children = [];

            this.background = createjs.Sound.play(SoundsList.BACKGROUND, createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
            this.lavaInstance = createjs.Sound.createInstance(SoundsList.LAVA);
            this.lavaPopInstance = createjs.Sound.createInstance(SoundsList.LAVA_POP);
            this.waterInstance = createjs.Sound.createInstance(SoundsList.WATER);
            this.playerHitInstance = createjs.Sound.createInstance(SoundsList.HIT);
        }

        // Play a random walk sound whenever player's avatar is moving
        playerWalk(): void {
            if (!this.playerWalkSound) {
                this.playerWalkSound = SoundsList.WALK1;
                this.playerWalkInstance = createjs.Sound.play(this.playerWalkSound, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
            }
            if (this.playerWalkInstance.playState === createjs.Sound.PLAY_FINISHED) {
                if (this.playerWalkSound === SoundsList.WALK1) {
                    this.playerWalkSound = SoundsList.WALK2;
                } else {
                    this.playerWalkSound = SoundsList.WALK1;
                }
                this.playerWalkInstance = createjs.Sound.play(this.playerWalkSound, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
            }
        }

        // Play sound when player is getting hit
        playerHit(): void {
            this.playerHitInstance.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
        }

        /**
         * The sound of a player eating to restore health
         */
        playerEat(): void {
            createjs.Sound.play(SoundsList.EAT, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
        }

        /**
         * Play a random "speak" sound for zombies at random intervals. This function also calculates
         * the relative distance from the player, and calculates volume and pan accordingly.
         */
        zombieSpeak(zombie: GameObjects.Mobs.Zombie, player: GameObjects.Player): void {
            var distance, volume, pan;


            distance = zombie.mapX - player.mapX;
            if (Math.abs(distance) > Constants.HALF_SCREEN_WIDTH) {
                return;
            }

            pan = distance / Constants.HALF_SCREEN_WIDTH;
            volume = (1 - Math.abs(pan)) * 0.8;

            var sound = Math.floor(Math.random() * 3);
            switch (sound) {
                case 0:
                    this.zombieSpeakSound = SoundsList.ZOMBIE_TALK1;
                    break;
                case 1:
                    this.zombieSpeakSound = SoundsList.ZOMBIE_TALK2;
                    break;
                case 2:
                    this.zombieSpeakSound = SoundsList.ZOMBIE_TALK3;
                    break;
            }
            this.zombieSpeakInstance = createjs.Sound.play(this.zombieSpeakSound, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
//            this.children.push(this.zombieSpeakInstance);
        }

        /*
         * Play a random "hurt" sound for zombies when they get hit by the player. This function also
         * calculates the relative distance from the player, and calculates volume and pan accordingly.
         */
        zombieHurt(zombie: GameObjects.Mobs.Zombie, player: GameObjects.Player): void {
            var distance, volume, pan;

            distance = zombie.mapX - player.mapX;
            pan = distance / Constants.HALF_SCREEN_WIDTH;
            volume = (1 - Math.abs(pan)) * 0.8;
            var soundID;
            if (Math.floor(Math.random() * 2) == 0) {
                soundID = SoundsList.ZOMBIE_HURT1;
            } else {
                soundID = SoundsList.ZOMBIE_HURT2;
            }

            this.zombieSpeakInstance = createjs.Sound.play(soundID, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
//            this.children.push(this.zombieSpeakInstance);
        }

        /*
         * Play the "death" sound for zombies when they get killed by the player. This function also
         * calculates the relative distance from the player, and calculates volume and pan accordingly.
         */
        zombieDeath(zombie: GameObjects.Mobs.Zombie, player: GameObjects.Player): void {
            var distance, volume, pan;
            var halfScreenWidth = Constants.HALF_SCREEN_WIDTH;


            distance = zombie.mapX - player.mapX;
            pan = distance / halfScreenWidth;
            volume = (1 - Math.abs(pan)) * 0.8;
            this.zombieSpeakInstance = createjs.Sound.play(SoundsList.ZOMBIE_DEATH, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
//            this.children.push(this.zombieSpeakInstance);
        }

        /*
         * Play a random "hurt" sound for creepers when they get hit by the player. This function also
         * calculates the relative distance from the player, and calculates volume and pan accordingly.
         */
        creeperHurt(creeper: GameObjects.Mobs.Creeper, player: GameObjects.Player): void {
            var distance, volume, pan;

            distance = creeper.mapX - player.mapX;
            pan = distance / Constants.HALF_SCREEN_WIDTH;
            volume = (1 - Math.abs(pan)) * 0.8;
            var soundID;
            switch (Math.floor(Math.random() * 4)) {
                case 0:
                    soundID = SoundsList.CREEPER_HURT1;
                    break;
                case 1:
                    soundID = SoundsList.CREEPER_HURT2;
                    break;
                case 2:
                    soundID = SoundsList.CREEPER_HURT3;
                    break;
                case 3:
                    soundID = SoundsList.CREEPER_HURT4;
                    break;
            }
            this.creeperSpeakInstance = createjs.Sound.play(soundID, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
//            this.children.push(this.creeperSpeakInstance);
        }

        /*
         * Play the "death" sound for creepers when they get killed by the player. This function also
         * calculates the relative distance from the player, and calculates volume and pan accordingly.
         */
        creeperDeath(creeper: GameObjects.Mobs.Creeper, player: GameObjects.Player): void {
            var distance, volume, pan;
            var halfScreenWidth = Constants.HALF_SCREEN_WIDTH;


            distance = creeper.mapX - player.mapX;
            pan = distance / halfScreenWidth;
            volume = (1 - Math.abs(pan)) * 0.8;
            this.creeperSpeakInstance = createjs.Sound.play(SoundsList.CREEPER_DEATH, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
//            this.children.push(this.creeperSpeakInstance);
        }

        /*
         * Play the "fuse" sound for creepers when they get ready to blow themselves up. This function also
         * calculates the relative distance from the player, and calculates volume and pan accordingly.
         */
        creeperFuse(creeper: GameObjects.Mobs.Creeper, player: GameObjects.Player): void {
            var distance, volume, pan;
            var halfScreenWidth = Constants.HALF_SCREEN_WIDTH;


            distance = creeper.mapX - player.mapX;
            pan = distance / halfScreenWidth;
            volume = (1 - Math.abs(pan)) * 1.2;
            this.creeperSpeakInstance = createjs.Sound.play(SoundsList.CREEPER_FUSE, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
//            this.children.push(this.creeperSpeakInstance);
        }

        /*
         * Play a random "explosion" sound for creepers when they blow themselves up. This function also
         * calculates the relative distance from the player, and calculates volume and pan accordingly.
         */
        creeperExplode(creeper: GameObjects.Mobs.Creeper, player: GameObjects.Player): void {
            var distance, volume, pan;

            distance = creeper.mapX - player.mapX;
            pan = distance / Constants.HALF_SCREEN_WIDTH;
            volume = (1 - Math.abs(pan)) * 0.8;
            var soundID;
            switch (Math.floor(Math.random() * 4)) {
                case 0:
                    soundID = SoundsList.CREEPER_EXPLODE1;
                    break;
                case 1:
                    soundID = SoundsList.CREEPER_EXPLODE2;
                    break;
                case 2:
                    soundID = SoundsList.CREEPER_EXPLODE3;
                    break;
                case 3:
                    soundID = SoundsList.CREEPER_EXPLODE4;
                    break;
            }
            this.creeperSpeakInstance = createjs.Sound.play(soundID, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
            //            this.children.push(this.creeperSpeakInstance);
        }

        /*
         * This function checks if there are any lava or water blocks near the player. If there are, then it plays
         * water and/or lava sounds. This function also calculates the relative distance to calculate panning
         * and volume of the sounds.
         */
        update(player: GameObjects.Player, map: GameObjects.GameMap): void {
            var lavaX, waterX, relativeDistance, volume, pan, index, lavaFound, waterFound;
            var mapData = map.getLayer(Constants.LAYER_NAME_FOREGROUND);

            var screenTileWidth = Math.floor(Constants.SCREEN_WIDTH / 32) * 2;
            var screenTileHeight = mapData.height;
            var totalScreenTiles = screenTileWidth * screenTileHeight;
            var xOffset = Math.floor(player.mapX / 32) - Math.floor(Constants.SCREEN_WIDTH / 32);
            if (xOffset < 0) {
                xOffset = 0;
            }

            // Check only the tiles that are near the player
            for (var tileCount = 0; tileCount < totalScreenTiles; tileCount++) {
                index = xOffset + (tileCount % screenTileWidth) + Math.floor(tileCount / screenTileWidth) * mapData.width;

                // If lava is nearby, set lava flag
                if (mapData.data[index] === Constants.LAVA_BLOCK) {
                    lavaX = (index % mapData.width) * 32;
                    relativeDistance = lavaX - player.mapX;

                    if (Math.abs(relativeDistance) <= Constants.SCREEN_WIDTH) {
                        pan = relativeDistance / Constants.SCREEN_WIDTH;
                        volume = (1 - Math.abs(pan)) * 0.8;

                        lavaFound = true;
                        break;
                    }
                // If water is nearby, set water flag
                } else if (mapData.data[index] === Constants.WATER_BLOCK) {
                    waterX = (index % mapData.width) * 32;
                    relativeDistance = waterX - player.mapX;

                    if (Math.abs(relativeDistance) <= Constants.SCREEN_WIDTH) {
                        pan = relativeDistance / Constants.SCREEN_WIDTH;
                        volume = (1 - Math.abs(pan)) * 0.8;

                        waterFound = true;
                        break;
                    }
                }
            }

            // If lava blocks were found, play lava sounds
            if (lavaFound) {
                if (this.lavaInstance.playState !== createjs.Sound.PLAY_SUCCEEDED) {
                    this.lavaInstance.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
                }
                if (Math.floor(Math.random() * 60) === 0) {
                    this.lavaPopInstance.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
//                    this.children.push(this.lavaPopInstance);
                }
            }

            // If water blocks were found, play water sounds
            if (waterFound) {
                if (this.waterInstance.playState !== createjs.Sound.PLAY_SUCCEEDED) {
                    this.waterInstance.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
                }
            }
        }
    }
}




















