import { Entity } from './entity';

export class AvailableRoom {
    constructor(scene, x, y, type, entity, count) {
        if (type === 'hallway') {
            this.background = scene.add.image(x, y, 'hallway-bg');
            this.foreground = scene.add.image(x, y, 'hallway-fg');
        } else if (type === 'bedroom1' || type === 'bedroom2') {
            this.background = scene.add.image(x, y, 'bedroom-bg');
            this.foreground = scene.add.image(x, y, 'bedroom-fg');
            this.background.setFrame(1);
            this.foreground.setFrame(1);
        } else if (type === 'kitchen') {
            this.background = scene.add.image(x, y, 'kitchen');
            this.foreground = scene.add.image(x, y, 'kitchen');
        } else if (type === 'fortnite') {
            this.background = scene.add.image(x, y, 'fortnite');
            this.foreground = scene.add.image(x, y, 'fortnite');
        } else if (type === 'garden') {
            this.background = scene.add.image(x, y, 'garden');
            this.foreground = scene.add.image(x, y, 'garden');
        }
        scene.supply.add(this.background);
        scene.supply.add(this.foreground);
        if (entity) {
            this.entity = entity;
        }
        if (count) {
            this.counter = scene.add.text(x-55, y-60, String(count), {
                fontFamily: 'Arial', fontSize: 32, color: '#ffffff'
            });
            scene.supply.add(this.counter);
            this.count = count;
        } else {
            this.count = null;
        }
        this.scene = scene;
        this.background.setInteractive();
        this.type = type;
        this.background.on('pointerdown', function(pointer) {
            if (this.scene.mode === 'buildMode' && !this.scene.holding) {
                if (this.count !== 0) {
                    this.scene.holding = new Room(this.scene, pointer.worldX, pointer.worldY, this.type, this.entity, this);
                    this.decreaseCounter();
                }
            }
        }, this);
    }

    increaseCounter() {
        if (this.count !== null) {
            this.count++;
            this.counter.text = this.count;
        }
    }

    decreaseCounter() {
        if (this.count !== null) {
            this.count--;
            this.counter.text = this.count;
        }
    }
}

class Room {
    constructor(scene, x, y, type, entity, supply) {
        this.type = type;
        if (type === 'hallway') {
            this.background = scene.add.image(x, y, 'hallway-bg');
            this.foreground = scene.add.image(x, y, 'hallway-fg');
        } else if (type === 'bedroom1' || type === 'bedroom2') {
            this.background = scene.add.image(x, y, 'bedroom-bg');
            this.foreground = scene.add.image(x, y, 'bedroom-fg');
        } else if (type === 'kitchen') {
            this.background = scene.add.image(x, y, 'kitchen');
            this.foreground = scene.add.image(x, y, 'blank-room');
        } else if (type === 'fortnite') {
            this.background = scene.add.image(x, y, 'fortnite');
            this.foreground = scene.add.image(x, y, 'blank-room');
        } else if (type === 'garden') {
            this.background = scene.add.image(x, y, 'garden');
            this.foreground = scene.add.image(x, y, 'blank-room');
        }
        scene.backgrounds.add(this.background);
        scene.foregrounds.add(this.foreground);
        if (entity) {
            this.entity = scene.add.existing(new Entity(scene, this, x, y, entity));
            scene.entities.add(this.entity);
        } else {
            this.entity = null;
        }
        if (supply) {
            this.supply = supply;
        }
        this.x = x;
        this.y = y;
        this.gx = null;
        this.gy = null;
        this.waterings = 0;
        this.background.room = this;
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
        this.background.x = x;
        this.background.y = y;
        this.foreground.x = x;
        this.foreground.y = y;
        if (this.entity) {
            this.entity.x = x;
            this.entity.y = y;
        }
    }

    destroy() {
        this.background.destroy();
        this.foreground.destroy();
        if (this.entity) {
            this.entity.destroy();
        }
        if (this.supply) {
            this.supply.increaseCounter();
        }
    }
}