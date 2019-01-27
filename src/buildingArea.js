import game from './index';

export class BuildingArea {
    constructor(x, y) {
        this.array = [
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null]
        ];
        this.x = x;
        this.y = y;
    }

    inBounds(x, y) {
        return (
            (x > this.x) &&
            (x < this.x + 640) &&
            (y > this.y) &&
            (y < this.y + 640)
        );
    }

    drop(room) {
        if (this.inBounds(room.x, room.y)) {
            room.moveTo(this.midX(room.x), this.midY(room.y));
            let gx = this.gridX(room.x);
            let gy = this.gridY(room.y);
            if (this.array[gx][gy]) this.array[gx][gy].destroy();
            this.array[gx][gy] = room;
            room.gx = gx;
            room.gy = gy;
            game.sfx.place.play();
        } else {
            game.sfx.trash.play();
            room.destroy();
        }
    }
    grab(x, y) {
        if (this.inBounds(x, y)) {
            let gx = this.gridX(x);
            let gy = this.gridY(y);
            let room = this.array[gx][gy];
            this.array[gx][gy] = null;
            game.sfx.pickUp.play();
            return room;
        }
    }
    get(x, y) {
        if (x >= 0 && x <= 4 && y >= 0 && y <= 4) return this.array[x][y];
        else return null;
    }

    floorX(x) { return Math.floor((x - this.x) / 128)*128 + this.x; }
    floorY(y) { return Math.floor((y - this.y) / 128)*128 + this.y; }
    midX(x) { return this.floorX(x) + 64; }
    midY(y) { return this.floorY(y) + 64; }
    worldX(x) { return x*128 + 64 + this.x; }
    worldY(y) { return y*128 + 64 + this.y; }
    gridX(x) { return Math.floor((x - this.x)/128); }
    gridY(y) { return Math.floor((y - this.y)/128); }
}