import { MainScene } from './main';
import { LoadScene } from './load';
import { TitleScene } from './title';

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1280,
    height: 720,
    scene: [LoadScene, TitleScene, MainScene],
    callbacks: {
        postBoot: function (game) {
            game.canvas.style.width = '100%';
            game.canvas.style.height = '100%';
        }
    }
};

const game = new Phaser.Game(config);

export default game;