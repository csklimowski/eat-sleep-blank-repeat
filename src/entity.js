
export class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, room, x, y, entity) {
        super(scene, x, y, entity);
        if (entity === 'person') {
            this.behavior = [
                'kitchen',
                'bedroom1'
            ];
        }
        this.room = room;
        this.gx = null;
        this.gy = null;
        this.steps = [];
        this.step = 0;
        
        this.x0 = 0;
        this.y0 = 0;
        this.xf = 0;
        this.yf = 0;
        this.t = 1000;
    }

    makeSteps(ba) {
        let directions = {
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
        this.t = 1000;
        let gx = this.gx, gy = this.gy;
        let good = true;
        this.steps = [{
            x: gx, y: gy,
            action: 'wake'
        }];
        this.step = 0;
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
                for (let d of ['n', 'e', 's', 'w']) {
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
                }
                gx = destNode.x;
                gy = destNode.y;
                let path = [];
                while (destNode.parent) {
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
                good = false;
                break;
            }
        }
    }

    nextStep(ba) {
        if (this.steps.length) {
            let step = this.steps[this.step];
            this.gx = step.x;
            this.gy = step.y;

            this.x0 = this.x;
            this.y0 = this.y;
            this.xf = ba.worldX(step.x);
            this.yf = ba.worldY(step.y);
            this.t = 0;

            if (step.action === 'sleep') {
                this.setFrame(1);
                this.room.background.setFrame(0);
                this.room.foreground.setFrame(0);
            } else if (step.action === 'wake') {
                this.setFrame(0);
                this.room.background.setFrame(1);
                this.room.foreground.setFrame(1);
            } else {
                this.setFrame(0);
            }

            this.step = (this.step + 1) % this.steps.length;
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