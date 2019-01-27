import 'phaser';
import game from './index';
import { Entity } from './entity';
import { AvailableRoom } from './room';
import { BuildingArea } from './buildingArea';

export class MainScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'MainScene'
        });
    }

    create() {
        this.ba = new BuildingArea(100, 0);
        this.holding = null;
        this.input.on('pointerup', this.pointerUp, this);
        this.input.on('pointerdown', this.pointerDown, this);

        this.supply = this.add.container(0, 0);
        this.supply.targetX = 400;
        this.backgrounds = this.add.container(0, 0);
        this.entities = this.add.container(0, 0);
        this.foregrounds = this.add.container(0, 0);
        this.highlight = this.add.sprite(0, 0, 'highlight');
        this.highlight.alpha = 0;
        this.button = this.add.sprite(1100, 50, 'button');
        this.button.setInteractive();
        this.button.on('pointerdown', function() {
            if (this.mode === 'buildMode') {
                this.button.setFrame(1);
                this.startMode('playbackMode');
            } else if (this.mode === 'playbackMode') {
                this.button.setFrame(0);
                this.startMode('buildMode');
            }
        }, this);
        this.supply.add(this.button);

        this.add.existing(new AvailableRoom(this, 1000, 200, 'hallway', null));
        this.add.existing(new AvailableRoom(this, 1000, 400, 'bedroom1', 'person', 1));
        this.add.existing(new AvailableRoom(this, 1000, 600, 'kitchen', null, 1));

        this.textBox = this.add.image(1280/2, 800, 'blank-room');
        this.textBox.targetY = 800;
        
        this.cameras.main.setBackgroundColor(0x444444);

        this.fade = this.add.image(1280/2, 720/2, 'black');

        this.textSet = 'introText';
        this.textIndex = -1;
        this.startMode('textMode');
    }

    startMode(mode) {
        this.entities.each(function(entity) {
            entity.gx = entity.room.gx;
            entity.gy = entity.room.gy;
            entity.x = entity.room.x;
            entity.y = entity.room.y;
            entity.room.foreground.setFrame(0);
            entity.room.background.setFrame(0);
        }, this);
        if (mode === 'playbackMode') {
            this.entities.each(function(entity) {
                entity.makeSteps(this.ba);
            }, this);
            this.stepLoop = this.time.addEvent({
                callback: this.step,
                delay: 500,
                callbackScope: this,
                loop: true
            });
        } else if (mode === 'buildMode') {
            this.supply.targetX = 0;
            if (this.stepLoop) {
                this.stepLoop.destroy();
            }
        } else if (mode === 'textMode') {
            this.textIndex = -1;
            this.supply.targetX = 400;
        }
        this.mode = mode;
    }

    step() {
        this.entities.each(function(entity) {
            entity.nextStep(this.ba);
        }, this);
    }

    update(time, delta) {
        if (this.mode === 'buildMode') {
            let mouseX = this.input.activePointer.worldX;
            let mouseY = this.input.activePointer.worldY;
            let ba = this.ba;
    
            if (this.holding) {
                this.holding.moveTo(mouseX, mouseY);
            }
    
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
        }
        this.textBox.y += 0.01*(this.textBox.targetY - this.textBox.y)*delta;
        this.supply.x += 0.01*(this.supply.targetX - this.supply.x)*delta;
    }

    pointerDown(pointer) {
        if (this.mode === 'buildMode' && !this.holding && this.ba.inBounds(pointer.worldX, pointer.worldY)) {
            this.holding = this.ba.grab(pointer.worldX, pointer.worldY);
        } else if (this.mode === 'textMode') {
            this.textIndex++;
            if (this.textIndex >= game.level[this.textSet].length) {
                this.textBox.targetY = 1000;
                this.startMode('buildMode');
                this.textIndex = -1;
            } else {
                this.textBox.targetY = 500;
                this.textBox.setTexture(game.level[this.textSet][this.textIndex]);
            }
        }
    }

    pointerUp(pointer) {
        if (this.mode === 'buildMode' && this.holding) {
            this.ba.drop(this.holding);
            this.holding = null;
        }
    }
}