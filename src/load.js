import { levels } from './levels';
import game from './index';

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'LoadState'
        });
    }

    preload() {
        this.load.audio('level1', 'Grandma_Build.ogg');
        this.load.audio('level2', 'Garden_Build.ogg');
        this.load.audio('level3', 'Roommates_Build.ogg');
        this.load.audio('level4', 'Spicy_Granny.ogg');
        this.load.audio('pick-up', 'assets/SoundEffects/Pick_Up_Block.ogg');
        this.load.audio('place', 'assets/SoundEffects/Place_Block.ogg');
        this.load.audio('click', 'assets/SoundEffects/menu_click_wave.ogg');
        this.load.audio('trash', 'assets/SoundEffects/Trash_Block.ogg');

        this.load.image('gg-intro', 'assets/portriats/gg-intro.png');
        this.load.image('gg-fail', 'assets/portriats/gg-fail.png');
        this.load.image('granny-intro', 'assets/portriats/granny-intro.png');
        this.load.image('granny-fail', 'assets/portriats/granny-fail.png');
        this.load.image('roommates-intro', 'assets/portriats/roommates-intro.png');
        this.load.image('roommates-fail', 'assets/portriats/roommates-fail.png');
        this.load.image('granny2-intro', 'assets/portriats/granny2-intro.png');
        this.load.image('granny2-fail', 'assets/portriats/granny2-fail.png');

        this.load.image('title-screen', 'assets/title-screen.png');
        this.load.image('how-to', 'assets/how-to.jpg');
        this.load.image('black', 'assets/black.png');
        this.load.image('highlight', 'assets/highlight.png');
        this.load.spritesheet('button', 'assets/PlayPause.png', {
            frameWidth: 305,
            frameHeight: 71
        });

        this.load.image('background', 'assets/background.png');
        this.load.image('supply', 'assets/supply.png');
        this.load.image('crane', 'assets/Crane.png');
        this.load.image('hook', 'assets/hook.png');

        this.load.image('hallway-bg', 'assets/hallway-bg.png');
        this.load.image('hallway-fg', 'assets/hallway-fg.png');

        this.load.image('kitchen', 'assets/kitchen.png');

        this.load.image('fortnite-bg', 'assets/gameroom-bg.png');
        this.load.image('fortnite-fg', 'assets/gameroom-fg.png');

        this.load.image('garden-fg', 'assets/garden-fg.png');
        this.load.image('garden-bg', 'assets/garden-bg.png');

        this.load.image('blank-room', 'assets/blank-room.png');

        this.load.spritesheet('bedroom-fg', 'assets/bedroom-fg.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('bedroom-bg', 'assets/bedroom-bg.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        // dear god so many spritesheets
        this.load.spritesheet('gamer-eat', 'assets/gamergirl/eat.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('gamer-confused', 'assets/gamergirl/confused.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('gamer-sit', 'assets/gamergirl/fortnite.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('gamer-stand', 'assets/gamergirl/stand.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('gamer-wake', 'assets/gamergirl/wake.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('gamer-water', 'assets/gamergirl/garden.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('gamer-sleep', 'assets/gamergirl/sleep.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('gamer-walk', 'assets/gamergirl/walk.png', {
            frameWidth: 128,
            frameHeight: 128
        });


        this.load.spritesheet('granny-eat', 'assets/granny/eat.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('granny-confused', 'assets/granny/confusion.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('granny-water', 'assets/granny/garden.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('granny-sleep', 'assets/granny/sleep.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('granny-wake', 'assets/granny/wake.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('granny-walk', 'assets/granny/walk.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        
        
        this.load.spritesheet('husband1-eat', 'assets/H1/eat.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('husband1-confused', 'assets/H1/confusion.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('husband1-sit', 'assets/H1/fortnite.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('husband1-stand', 'assets/H1/stand.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('husband1-sleep', 'assets/H1/sleep.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('husband1-wake', 'assets/H1/wake.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('husband1-walk', 'assets/H1/walk.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet('husband2-eat', 'assets/H2/eat.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('husband2-confused', 'assets/H2/confusion.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('husband2-water', 'assets/H2/garden.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('husband2-sleep', 'assets/H2/sleep.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('husband2-wake', 'assets/H2/wake.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('husband2-walk', 'assets/H2/walk.png', {
            frameWidth: 128,
            frameHeight: 128
        });
    }

    create() {
        this.anims.create({
            key: 'granny-walk',
            frames: this.anims.generateFrameNumbers('granny-walk', {start: 0, end: 3}),
            frameRate: 14,
            repeat: -1
        });
        this.anims.create({
            key: 'granny-wake',
            frames: this.anims.generateFrameNumbers('granny-wake', {start: 0, end: 18}),
            frameRate: 14
        });
        this.anims.create({
            key: 'granny-sleep',
            frames: this.anims.generateFrameNumbers('granny-sleep', {end: 13}),
            frameRate: 14
        });
        this.anims.create({
            key: 'granny-water',
            frames: this.anims.generateFrameNumbers('granny-water', {end: 12}),
            frameRate: 14
        });
        this.anims.create({
            key: 'granny-eat',
            frames: this.anims.generateFrameNumbers('granny-eat'),
            frameRate: 14
        });
        this.anims.create({
            key: 'granny-confused',
            frames: this.anims.generateFrameNumbers('granny-confused'),
            frameRate: 14
        });


        this.anims.create({
            key: 'gamer-walk',
            frames: this.anims.generateFrameNumbers('gamer-walk', {start: 0, end: 3}),
            frameRate: 14,
            repeat: -1
        });
        this.anims.create({
            key: 'gamer-wake',
            frames: this.anims.generateFrameNumbers('gamer-wake', {start: 0, end: 18}),
            frameRate: 14
        });
        this.anims.create({
            key: 'gamer-sleep',
            frames: this.anims.generateFrameNumbers('gamer-sleep', {end: 13}),
            frameRate: 14
        });
        this.anims.create({
            key: 'gamer-water',
            frames: this.anims.generateFrameNumbers('gamer-water', {end: 12}),
            frameRate: 14
        });
        this.anims.create({
            key: 'gamer-eat',
            frames: this.anims.generateFrameNumbers('gamer-eat'),
            frameRate: 14
        });
        this.anims.create({
            key: 'gamer-sit',
            frames: this.anims.generateFrameNumbers('gamer-sit', {end: 10}),
            frameRate: 14
        });
        this.anims.create({
            key: 'gamer-stand',
            frames: this.anims.generateFrameNumbers('gamer-stand', {end: 14}),
            frameRate: 14
        });
        this.anims.create({
            key: 'gamer-confused',
            frames: this.anims.generateFrameNumbers('gamer-confused'),
            frameRate: 14
        });


        this.anims.create({
            key: 'husband1-walk',
            frames: this.anims.generateFrameNumbers('husband1-walk', {start: 0, end: 3}),
            frameRate: 14,
            repeat: -1
        });
        this.anims.create({
            key: 'husband1-wake',
            frames: this.anims.generateFrameNumbers('husband1-wake', {start: 0, end: 18}),
            frameRate: 14
        });
        this.anims.create({
            key: 'husband1-sleep',
            frames: this.anims.generateFrameNumbers('husband1-sleep', {end: 13}),
            frameRate: 14
        });
        this.anims.create({
            key: 'husband1-eat',
            frames: this.anims.generateFrameNumbers('husband1-eat'),
            frameRate: 14
        });
        this.anims.create({
            key: 'husband1-sit',
            frames: this.anims.generateFrameNumbers('husband1-sit', {end: 10}),
            frameRate: 14
        });
        this.anims.create({
            key: 'husband1-stand',
            frames: this.anims.generateFrameNumbers('husband1-stand', {end: 14}),
            frameRate: 14
        });
        this.anims.create({
            key: 'husband1-confused',
            frames: this.anims.generateFrameNumbers('husband1-confused'),
            frameRate: 14
        });



        this.anims.create({
            key: 'husband2-walk',
            frames: this.anims.generateFrameNumbers('husband2-walk', {start: 0, end: 3}),
            frameRate: 14,
            repeat: -1
        });
        this.anims.create({
            key: 'husband2-wake',
            frames: this.anims.generateFrameNumbers('husband2-wake', {start: 0, end: 18}),
            frameRate: 14
        });
        this.anims.create({
            key: 'husband2-sleep',
            frames: this.anims.generateFrameNumbers('husband2-sleep', {end: 13}),
            frameRate: 14
        });
        this.anims.create({
            key: 'husband2-water',
            frames: this.anims.generateFrameNumbers('husband2-water', {end: 12}),
            frameRate: 14
        });
        this.anims.create({
            key: 'husband2-eat',
            frames: this.anims.generateFrameNumbers('husband2-eat'),
            frameRate: 14
        });
        this.anims.create({
            key: 'husband2-confused',
            frames: this.anims.generateFrameNumbers('husband2-confused'),
            frameRate: 14
        });

        game.sfx = {
            music: [
                this.sound.add('level1', { volume: 0.3, loop: true }),
                this.sound.add('level2', { volume: 0.2, loop: true }),
                this.sound.add('level3', { volume: 0.3, loop: true }),
                this.sound.add('level4', { volume: 0.3, loop: true }),
            ],
            pickUp: this.sound.add('pick-up'),
            place: this.sound.add('place'),
            click: this.sound.add('click'),
            trash: this.sound.add('trash')
        }

        game.level = 0;
        this.scene.start('TitleScene');
    }
}