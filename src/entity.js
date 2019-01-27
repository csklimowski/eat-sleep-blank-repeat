

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
        super(scene, x, y, 'person');
        if (entity === 'granny') {
            this.behavior = [
                'kitchen',
                'bedroom1'
            ];
        } else if (entity === 'buffgranny') {
            this.behavior = [
                'kitchen',
                'bedroom1'
            ];
        } else if (entity === 'gamer') {
            this.behavior = [
                'kitchen',
                'fortnite',
                'bedroom1'
            ];
        } else if (entity === 'husband1') {
            this.behavior = [
                'kitchen',
                'fortnite',
                'bedroom1'
            ];
        } else if (entity === 'husband2') {
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
        this.t = 1000;
        this.steps = [];
    }

    makeCycle(ba, priorities) {
        let gx = this.gx, gy = this.gy;
        this.steps.push({
            x: gx,
            y: gy,
            action: 'wake'
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
                if (node.room.type === destination) {
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
                    actions = ['sleep'];
                } else if (destNode.room.type === 'kitchen') {
                    actions = ['eat'];
                } else if (destNode.room.type === 'fortnite') {
                    actions = ['sit', 'stand'];
                } else if (destNode.room.type === 'garden') {
                    actions = ['water'];
                }
                gx = destNode.x;
                gy = destNode.y;
                let path = [];
                while (destNode.parent) {
                    if (destNode.room.type === 'garden' && this.type === 'gamer') {
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
                this.setFrame(1);
                this.room.background.setFrame(0);
                this.room.foreground.setFrame(0);
            } else if (step.action === 'wake') {
                this.wateredToday = false;
                this.setFrame(0);
                this.room.background.setFrame(1);
                this.room.foreground.setFrame(1);
            } else if (step.action === 'water') {
                this.wateredToday = true;
            } else if (step.action === 'sit') {
                
            } else if (step.action === 'stand') {

            } else if (step.action === 'eat') {

            }

            if (step.action === 'confusion') {

            } else {
                this.step = (this.step + 1);
            }
        }
    }

    update(time, delta) {
        this.t += delta;
        if (this.t <= 250) {
            this.x = this.x0 + (this.t / 250) * (this.xf - this.x0);
            this.y = this.y0 + (this.t / 250) * (this.yf - this.y0);
        }
    }
}