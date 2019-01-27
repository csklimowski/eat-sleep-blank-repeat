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


        this.load.image('title-screen', 'assets/title-screen.png');
        this.load.image('black', 'assets/black.png');
        this.load.image('hallway', 'assets/hallway.png');
        this.load.image('hallway-bg', 'assets/hallway-bg.png');
        this.load.image('hallway-fg', 'assets/hallway-fg.png');
        this.load.image('bedroom', 'assets/bedroom.png');
        this.load.image('kitchen', 'assets/bathroom.png');
        this.load.image('blank-room', 'assets/blank-room.png');
        this.load.image('room', 'assets/room.png');
        this.load.image('highlight', 'assets/highlight.png');
        this.load.spritesheet('bedroom-fg', 'assets/bedroom-fg.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('bedroom-bg', 'assets/bedroom-bg.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('person', 'assets/person.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('button', 'assets/button.png', {
            frameWidth: 128,
            frameHeight: 64
        });
    }

    create() {
        game.level = levels[0];
        this.scene.start('TitleScene');
    }
}