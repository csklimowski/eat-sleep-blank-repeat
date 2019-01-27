

const directions = {
    n: {
        dx: 0,
        dy: -1
    },
    e: {
        dx: 1,
        dy: 0
    },
    s: {
        dx: 0,
        dy: 1
    },
    w: {
        dx: -1,
        dy: 0
    }
}

export class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, room, x, y, entity) {
        if (entity === 'granny') {
            super(scene, x, y, 'granny-wake');
            this.behavior = [
                'kitchen',
                'bedroom1'
            ];
        } else if (entity === 'buffgranny') {
            entity = 'granny';
            super(scene, x, y, 'granny-wake');
            this.behavior = [
                'garden',
                'kitchen',
                'garden',
                'bedroom1'
            ];
        } else if (entity === 'gamer') {
            super(scene, x, y, 'gamer-wake');
            this.behavior = [
                'kitchen',
                'fortnite',
                'bedroom1'
            ];
        } else if (entity === 'husband1') {
            super(scene, x, y, 'husband1-wake');
            this.behavior = [
                'kitchen',
                'fortnite',
                'bedroom1'
            ];
        } else if (entity === 'husband2') {
            super(scene, x, y, 'husband2-wake');
            this.behavior = [
                'kitchen',
                'garden',
                'bedroom2'
            ];
        }
        this.room = room;
        this.gx = null;
        this.gy = null;
        this.steps = [];
        this.step = 0;
        this.type = entity;
        this.x0 = 0;
        this.y0 = 0;
        this.xf = 0;
        this.yf = 0;
        this.t = 1000;
    }

    init() {
        this.cycles = 0;
        this.step = 0;
        this.wateredToday = true;
        this.waterings = 0;
        this.t = 1000;
        this.steps = [];
    }

    makeCycle(ba, priorities) {
        let gx = this.gx, gy = this.gy;
        this.steps.push({
            x: gx,
            y: gy,
            action: 'wake'
        }, {
            x: gx,
            y: gy,
            action: 'nothing'
        });
        for (let destination of this.behavior) {
            let notes = [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false]
            ];
            notes[gx][gy] = true;
            let tree = {
                x: gx,
                y: gy,
                room: ba.get(gx, gy),
                parent: null
            };
            let queue = [tree];
            let destNode = null;
            while (queue.length) {
                let node = queue.shift();
                if (node.room.type === destination && node.parent) {
                    destNode = node;
                    break;
                }
                for (let d of priorities) {
                    let x = node.x + directions[d].dx;
                    let y = node.y + directions[d].dy;
                    let room = ba.get(x, y);
                    if (room && !notes[x][y]) {
                        notes[x][y] = true;
                        node[d] = {
                            parent: node,
                            x: x,
                            y: y,
                            room: room
                        };
                        queue.push(node[d]);
                    }
                }
            }
            if (destNode) {
                let actions = [];
                if (destNode.room.type === 'bedroom1' || destNode.room.type === 'bedroom2') {
                    actions = ['sleep', 'nothing'];
                } else if (destNode.room.type === 'kitchen') {
                    actions = ['eat'];
                } else if (destNode.room.type === 'fortnite') {
                    actions = ['sit', 'nothing', 'stand'];
                } else if (destNode.room.type === 'garden') {
                    actions = ['water'];
                }
                gx = destNode.x;
                gy = destNode.y;
                let path = [];
                while (destNode.parent) {
                    if (destNode.room.type === 'garden' && actions[0] !== 'water' && (this.type === 'granny' || this.type === 'gamer')) {
                        path.unshift({
                            x: destNode.x,
                            y: destNode.y,
                            action: 'water'
                        }); 
                    }
                    path.unshift({
                        x: destNode.x,
                        y: destNode.y,
                        action: 'move'
                    });
                    destNode = destNode.parent;
                }
                for (let action of actions) {
                    path.push({
                        x: gx, y: gy,
                        action: action
                    });
                }
                this.steps = this.steps.concat(path);
            } else {
                this.steps.push({
                    x: gx,
                    y: gy,
                    action: 'confusion'
                });
                break;
            }
        }
    }

    padTo(len) {
        while (this.steps.length < len) {
            this.steps.push({
                x: this.steps[this.steps.length-1].x,
                y: this.steps[this.steps.length-1].y,
                action: 'nothing'
            });
        }
    }

    nextStep(ba) {
        if (this.steps.length) {
            let step = this.steps[this.step % this.steps.length];
            this.gx = step.x;
            this.gy = step.y;

            this.x0 = this.x;
            this.y0 = this.y;
            this.xf = ba.worldX(step.x);
            this.yf = ba.worldY(step.y);
            this.t = 0;

            if (step.action === 'sleep') {
                this.cycles++;
                this.room.background.setFrame(0);
                this.room.foreground.setFrame(0);
                this.anims.play(this.type + '-sleep');
            } else if (step.action === 'wake') {
                this.wateredToday = false;
                this.room.background.setFrame(1);
                this.room.foreground.setFrame(1);
                this.anims.play(this.type + '-wake');
            } else if (step.action === 'water') {
                this.anims.play(this.type + '-water');
                this.wateredToday = true;
                let garden = ba.get(this.gx, this.gy);
                garden.waterings++;
                if (garden.waterings > this.cycles + 1) {
                    this.waterings += 2;
                    console.log('overwatered!');
                }
            } else if (step.action === 'sit') {
                this.anims.play(this.type + '-sit');
            } else if (step.action === 'stand') {
                this.anims.play(this.type + '-stand');
            } else if (step.action === 'eat') {
                this.anims.play(this.type + '-eat');
            } else if (step.action === 'move') {
                this.anims.play(this.type + '-walk');
            } else if (step.action === 'confusion') {
                this.anims.play(this.type + '-confused');
            }

            if (step.action === 'confusion') {

            } else {
                this.step = (this.step + 1);
            }
        }
    }

    update(time, delta) {
        this.t += delta;
        if (this.t <= 500) {
            this.x = this.x0 + (this.t / 500) * (this.xf - this.x0);
            this.y = this.y0 + (this.t / 500) * (this.yf - this.y0);
        }
    }
}