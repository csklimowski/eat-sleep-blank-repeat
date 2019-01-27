import 'phaser';
import { levels } from './levels';
import game from './index';

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'LoadState'
        });
    }

    preload() {
        this.load.image('level1-intro1', 'assets/level1-intro1.png');
        this.load.image('level1-failure1', 'assets/level1-failure1.png');
        this.load.image('level1-success1', 'assets/level1-success1.png');

        this.load.image('title-screen', 'assets/title-screen.png');
        this.load.image('black', 'assets/black.png');
        this.load.image('highlight', 'assets/highlight.png');
        this.load.spritesheet('button', 'assets/button.png', {
            frameWidth: 128,
            frameHeight: 64
        });

        this.load.image('background', 'assets/background.png');
        this.load.image('supply', 'assets/supply.png');

        
        this.load.image('hallway-bg', 'assets/hallway-bg.png');
        this.load.image('hallway-fg', 'assets/hallway-fg.png');

        this.load.image('kitchen', 'assets/bathroom.png');
        this.load.image('garden', 'assets/hallway.png');
        this.load.image('fortnite', 'assets/fortnite.png');

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

        game.level = 0;
        this.scene.start('TitleScene');
    }
}