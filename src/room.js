import { Entity } from './entity';

export class AvailableRoom {
    constructor(scene, x, y, type, entity, count) {
        if (type === 'hallway') {
            this.background = scene.add.sprite(x, y, 'hallway');
        } else if (type === 'bedroom1' || type === 'bedroom2') {
            this.background = scene.add.sprite(x, y, 'bedroom');
        } else if (type === 'bathroom') {
            this.background = scene.add.sprite(x, y, 'bathroom');
        }
        if (entity) {
            this.entity = scene.add.existing(new Entity(scene, this, x, y, entity));
        } else {
            this.entity = null;
        }
        this.scene = scene;
        this.background.setInteractive();
        this.type = type;
        this.count = count;
        this.background.on('pointerdown', function(pointer) {
            if (this.scene.mode === 'buildMode') {
                this.scene.holding = new Room(this.scene, pointer.worldX, pointer.worldY, this.type, this.entity);
            }
        }, this);
    }
}

class Room {
    constructor(scene, x, y, type, entity) {
        this.type = type;
        if (type === 'hallway') {
            this.background = scene.add.sprite(x, y, 'hallway');
        } else if (type === 'bedroom1' || type === 'bedroom2') {
            this.background = scene.add.sprite(x, y, 'bedroom');
        } else if (type === 'bathroom') {
            this.background = scene.add.sprite(x, y, 'bathroom');
        }
        scene.rooms.add(this.background);
        if (entity) {
            this.entity = scene.add.existing(new Entity(scene, this, x, y, 'person'));
            scene.entities.add(this.entity);
        } else {
            this.entity = null;
        }
        this.x = x;
        this.y = y;
        this.gx = null;
        this.gy = null;
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
        this.background.x = x;
        this.background.y = y;
        if (this.entity) {
            this.entity.x = x;
            this.entity.y = y;
        }
    }

    destroy() {
        this.background.destroy();
        if (this.entity) {
            this.entity.destroy();
        }
    }
}