import game from './index';
import { Entity } from './entity';
import { AvailableRoom } from './room';
import { BuildingArea } from './buildingArea';
import { levels } from './levels';

export class MainScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'MainScene'
        });
    }

    create() {
        this.input.keyboard.on('keydown_R', function() {
            this.scene.restart();
        }, this);
        this.ba = new BuildingArea(85, 70);
        
        this.input.on('pointerup', this.pointerUp, this);
        this.input.on('pointerdown', this.pointerDown, this);

        this.background = this.add.image(1280/2, 720/2, 'background');
        
        this.supply = this.add.container(0, 0);
        this.supply.targetX = 400;
        this.supply.add(this.add.image(1000, 720/2, 'supply'));
        
        this.backgrounds = this.add.container(0, 0);
        this.entities = this.add.container(0, 0);
        this.foregrounds = this.add.container(0, 0);
        
        this.highlight = this.add.sprite(0, 0, 'highlight');
        this.highlight.alpha = 0;
        
        this.button = this.add.sprite(1000, 100, 'button');
        this.button.setFrame(1);
        this.button.setInteractive();
        this.button.on('pointerdown', function() {
            game.sfx.click.play();
            if (this.mode === 'buildMode') {
                this.startMode('playbackMode');
            } else if (this.mode === 'playbackMode') {
                this.startMode('buildMode');
            }
        }, this);
        this.supply.add(this.button);

        this.graphics = this.add.graphics({
            lineStyle: {
                width: 2,
                color: 0x000000
            }
        })

        this.crane = this.add.image(0, 0, 'crane');
        this.crane.alpha = 0;

        this.hook = this.add.image(0, 0, 'hook');
        this.hook.alpha = 0;

        this.textBox = this.add.image(1280/2, 800, 'blank-room');
        this.textBox.targetY = 800;
        
        this.cameras.main.setBackgroundColor(0x444444);
        
        levels[game.level].init(this);
        
        this.fade = this.add.image(1280/2, 720/2, 'black');
        
        this.holding = null;
        this.textIndex = -1;
        this.textSet = 'intro';
        this.startMode('textMode');

        game.sfx.music[game.level].play();
    }

    padEntities() {
        if (this.entities.length > 1) {
            let e1 = this.entities.getAt(0);
            let e2 = this.entities.getAt(1);
            if (e1.steps.length > e2.steps.length) {
                e2.padTo(e1.steps.length);
            }
            if (e2.steps.length > e1.steps.length) {
                e1.padTo(e2.steps.length);
            }
        }
    }

    startMode(mode) {
        this.entities.each(function(entity) {
            entity.gx = entity.room.gx;
            entity.gy = entity.room.gy;
            entity.x = entity.room.x;
            entity.y = entity.room.y;
            entity.room.foreground.setFrame(0);
            entity.room.background.setFrame(0);
            entity.anims.stop();
            entity.setTexture(entity.type + '-wake');
        }, this);
        if (mode === 'playbackMode') {
            this.crane.alpha = 0;
            this.hook.alpha = 0;
            this.button.setFrame(2);
            this.backgrounds.each(function(background) {
                background.room.waterings = 0;
            }, this);
            this.entities.each(function(entity) {
                entity.init();
            }, this);
            this.entities.each(function(entity) {
                entity.makeCycle(this.ba, ['n', 'e', 's', 'w']);
            }, this);
            this.padEntities();
            this.entities.each(function(entity) {
                entity.makeCycle(this.ba, ['w', 's', 'e', 'n']);
            }, this);
            this.padEntities();

            this.stepLoop = this.time.addEvent({
                callback: this.step,
                delay: 1000,
                callbackScope: this,
                loop: true
            });
        } else if (mode === 'buildMode') {
            this.crane.alpha = 1;
            this.hook.alpha = 1;
            this.button.setFrame(1);
            this.supply.targetX = 0;
            if (this.stepLoop) {
                this.stepLoop.destroy();
            }
        } else if (mode === 'textMode') {
            this.crane.alpha = 0;
            this.hook.alpha = 0;
            this.button.setFrame(1);
            this.textIndex = -1;
            this.supply.targetX = 600;
            if (this.stepLoop) {
                this.stepLoop.destroy();
            }
        } else if (mode === 'outroMode') {
            game.sfx.music[game.level].stop();
        }
        this.mode = mode;
    }

    step() {
        if (levels[game.level].checkFailState(this.ba, this.entities)) {
            this.startMode('textMode');
            this.textSet = 'failure';
            this.nextText();
        } else if (levels[game.level].checkSuccessState(this.ba, this.entities)) {
            this.startMode('textMode');
            this.textSet = 'success';
            this.nextText();
        }
        this.entities.each(function(entity) {
            entity.nextStep(this.ba);
        }, this);
    }

    update(time, delta) {
        this.graphics.clear();
        if (this.mode === 'buildMode') {
            let mouseX = this.input.activePointer.worldX;
            let mouseY = this.input.activePointer.worldY;
            let ba = this.ba;
    
            if (this.holding) {
                this.holding.moveTo(mouseX, mouseY);
            }

            this.hook.x = mouseX;
            this.hook.y = mouseY;
            this.crane.x = mouseX;
            this.graphics.lineBetween(this.hook.x, this.hook.y, this.crane.x, this.crane.y);
    
            if (ba.inBounds(mouseX, mouseY)) {
                this.highlight.alpha = 1;
                this.highlight.x = ba.midX(mouseX);
                this.highlight.y = ba.midY(mouseY);
            } else {
                this.highlight.alpha = 0;
            }
        } else if (this.mode === 'playbackMode') {
            this.entities.each(function(entity) {
                entity.update(time, delta);
            }, this);
        } else if (this.mode === 'textMode') {
            this.fade.alpha -= 0.001*delta;
        } else if (this.mode === 'outroMode') {
            this.fade.alpha += 0.001*delta;
            if (this.fade.alpha >= 1) {
                game.level++;
                this.scene.restart();
            }
        }
        this.textBox.y += 0.01*(this.textBox.targetY - this.textBox.y)*delta;
        this.supply.x += 0.01*(this.supply.targetX - this.supply.x)*delta;
    }

    pointerDown(pointer) {
        if (this.mode === 'buildMode' && !this.holding && this.ba.inBounds(pointer.worldX, pointer.worldY)) {
            this.holding = this.ba.grab(pointer.worldX, pointer.worldY);
        } else if (this.mode === 'textMode') {
            this.nextText();
        }
    }

    nextText() {
        this.textIndex++;
        if (this.textIndex >= levels[game.level][this.textSet].length) {
            this.textBox.targetY = 1000;
            if (this.textSet === 'success') {
                this.startMode('outroMode');
            } else {
                this.startMode('buildMode');
            }
        } else {
            this.textBox.targetY = 360;
            this.textBox.setTexture(levels[game.level][this.textSet][this.textIndex]);
        }
    }

    pointerUp(pointer) {
        if (this.mode === 'buildMode' && this.holding) {
            this.ba.drop(this.holding);
            this.holding = null;
        }
    }
}