import 'phaser';
import game from './index';
import { Entity } from './entity';
import { AvailableRoom } from './room';
import { BuildingArea } from './buildingArea';

export class MainScene extends Phaser.Scene {
    preload() {
        this.load.image('hallway', 'assets/hallway.png');
        this.load.image('bedroom', 'assets/bedroom.png');
        this.load.image('bathroom', 'assets/bathroom.png');
        this.load.image('room', 'assets/room.png');
        this.load.image('highlight', 'assets/highlight.png');
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
        this.ba = new BuildingArea(100, 0);
        this.holding = null;
        this.input.on('pointerup', this.pointerUp, this);
        this.input.on('pointerdown', this.pointerDown, this);

        this.mode = 'buildMode';

        this.rooms = this.add.container(0, 0);
        this.entities = this.add.container(0, 0);
        this.highlight = this.add.sprite(0, 0, 'highlight');
        this.button = this.add.sprite(1100, 50, 'button');
        this.button.setInteractive();
        this.button.on('pointerdown', this.switchModes, this);

        this.add.existing(new AvailableRoom(this, 1000, 200, 'hallway', null, 2));
        this.add.existing(new AvailableRoom(this, 1000, 400, 'bedroom1', 'person', 2));
        this.add.existing(new AvailableRoom(this, 1000, 600, 'bathroom', null, 2));

        this.cameras.main.setBackgroundColor(0x444444);
    }

    switchModes() {
        this.entities.each(function(entity) {
            entity.gx = entity.room.gx;
            entity.gy = entity.room.gy;
            entity.x = entity.room.x;
            entity.y = entity.room.y;
        }, this);
        if (this.mode === 'buildMode') {
            this.button.setFrame(1);
            this.mode = 'playbackMode';
            this.entities.each(function(entity) {
                entity.makeSteps(this.ba);
            }, this);
            this.stepLoop = this.time.addEvent({
                callback: this.step,
                delay: 500,
                callbackScope: this,
                loop: true
            });
        } else {
            this.button.setFrame(0);
            this.stepLoop.destroy();
            this.mode = 'buildMode';
        }
    }

    step() {
        this.entities.each(function(entity) {
            entity.nextStep(this.ba);
        }, this);
    }

    update(time, delta) {
        this[this.mode](time, delta);
    }

    pointerDown(pointer) {
        if (this.mode === 'buildMode' && !this.holding && this.ba.inBounds(pointer.worldX, pointer.worldY)) {
            this.holding = this.ba.grab(pointer.worldX, pointer.worldY);
        }
    }

    pointerUp(pointer) {
        if (this.mode === 'buildMode' && this.holding) {
            this.ba.drop(this.holding);
            this.holding = null;
        }
    }

    buildMode(time, delta) {
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
    }

    playbackMode(time, delta) {
        this.entities.each(function(entity) {
            entity.update(time, delta);
        }, this);
    }
}