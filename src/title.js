export class TitleScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'TitleScene'
        });
    }

    create() {
        this.add.image(1280/2, 720/2, 'title-screen');
        this.input.once('pointerdown', function() {
            this.scene.start('MainScene');
        }, this);
    }
}