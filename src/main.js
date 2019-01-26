import 'phaser';
import game from './index';

export class MainScene extends Phaser.Scene {
    preload() {
        this.load.image('room', 'assets/room.png');
    }
    create() {
        this.ba = new BuildingArea(0, 0);
        this.holding = null;
        this.input.on('pointerup', function() {
            if (this.holding) {
                this.ba.drop(this.holding);
                this.holding = null;
            }
        }, this);

        this.input.on('pointerdown', function(pointer) {
            if (this.ba.inBounds(pointer.worldX, pointer.worldY)) {
                this.holding = this.ba.grab(pointer.worldX, pointer.worldY);
            }
        }, this)
        

        this.room = this.add.existing(new AvailableRoom(this, 800, 500, 'room', 2));

        this.graphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: 0x00ff00
            }
        });
        this.cameras.main.setBackgroundColor(0x006698);
    }

    update(time, delta) {
        let mouseX = this.input.activePointer.worldX;
        let mouseY = this.input.activePointer.worldY;
        let ba = this.ba;

        if (this.holding) {
            this.holding.x = mouseX;
            this.holding.y = mouseY;
        }

        this.graphics.clear();
        if (ba.inBounds(mouseX, mouseY)) {
            this.graphics.strokeRect(ba.floorX(mouseX), ba.floorY(mouseY), 128, 128);
        }
    }
}

class AvailableRoom extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, count) {
        super(scene, x, y, type);
        this.setInteractive();
        this.type = type;
        this.on('pointerdown', function(pointer) {
            this.scene.holding = this.scene.add.existing(new BuildRoom(this.scene, pointer.worldX, pointer.worldY, this.type));
        }, this);
    }
}

class BuildRoom extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
    }
}

class BuildingArea {
    constructor(x, y) {
        this.array = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ];
        this.x = x;
        this.y = y;
    }

    inBounds(x, y) {
        return (
            (x > this.x) &&
            (x < this.x + 512) &&
            (y > this.y) &&
            (y < this.y + 512)
        );
    }

    floorX(x) { return Math.floor((x - this.x) / 128)*128; }
    floorY(y) { return Math.floor((y - this.y) / 128)*128; }
    midX(x) { return Math.floor((x - this.x) / 128)*128 + 64; }
    midY(y) { return Math.floor((y - this.y) / 128)*128 + 64; }
    gridX(x) { return Math.floor((x - this.x)/128); }
    gridY(y) { return Math.floor((y - this.y)/128); }
    under(x, y) { return this.get(this.gridX(x), this.gridY(y)); }
    drop(room) {
        if (this.inBounds(room.x, room.y)) {
            room.x = this.midX(room.x);
            room.y = this.midY(room.y);
            let gx = this.gridX(room.x);
            let gy = this.gridY(room.y);
            if (this.array[gx][gy]) this.array[gx][gy].destroy();
            this.array[gx][gy] = room;
        } else {
            room.destroy();
        }
    }
    grab(x, y) {
        if (this.inBounds(x, y)) {
            let gx = this.gridX(x);
            let gy = this.gridY(y);
            let room = this.array[gx][gy];
            this.array[gx][gy] = null;
            return room;
        }
    }
    get(x, y) {
        if (x >= 0 && x <= 4 && y >= 0 && y <= 4) return this.array[x][y];
        else return null;
    }
}