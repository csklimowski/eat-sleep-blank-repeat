import { AvailableRoom } from './room';

export const levels = [
    {
        init: function(scene) {
            scene.add.existing(new AvailableRoom(scene, 1075, 250, 'hallway', null));
            scene.add.existing(new AvailableRoom(scene, 925, 250, 'bedroom1', 'granny', 1));
            scene.add.existing(new AvailableRoom(scene, 925, 400, 'kitchen', null));
        },
        checkFailState: function(ba, entities) {
            let granny = entities.getAt(0);
            if (granny) {
                return (granny.steps[granny.step % granny.steps.length].action === 'wake' && 
                    granny.step > 0 && granny.step < 13);
            } else return false;
        },
        checkSuccessState: function(ba, entities) {
            let granny = entities.getAt(0);
            if (granny) {
                return (granny.steps[granny.step % granny.steps.length].action === 'wake' && 
                    granny.step >= 19);
            }
        },
        intro: [
            'level1-intro1'
        ],
        failure: [
            'level1-failure1'
        ],
        success: [
            'level1-success1'
        ]
    },
    {
        init: function(scene) {
            scene.add.existing(new AvailableRoom(scene, 925, 250, 'bedroom1', 'gamer', 1));
            scene.add.existing(new AvailableRoom(scene, 1075, 250, 'garden', null, 1));
            scene.add.existing(new AvailableRoom(scene, 925, 400, 'kitchen', null));
            scene.add.existing(new AvailableRoom(scene, 1075, 400, 'fortnite', null));
            scene.add.existing(new AvailableRoom(scene, 925, 550, 'hallway', null));
        },
        checkFailState: function(ba, entities) {
            let gamer = entities.getAt(0);
            if (gamer) {
                return (gamer.steps[gamer.step % gamer.steps.length].action === 'wake' && !gamer.wateredToday);
            } else return false;
        },
        checkSuccessState: function(ba, entities) {
            let gamer = entities.getAt(0);
            if (gamer) {
                return gamer.cycles >= 2;
            }
        },
        intro: [
            'level1-intro1'
        ],
        failure: [
            'level1-failure1'
        ],
        success: [
            'level1-success1'
        ]
    },
    {
        init: function(scene) {
            scene.add.existing(new AvailableRoom(scene, 925, 250, 'bedroom1', 'husband1', 1));
            scene.add.existing(new AvailableRoom(scene, 1075, 250, 'bedroom2', 'husband2', 1));
            scene.add.existing(new AvailableRoom(scene, 925, 400, 'kitchen', null, 1));
            scene.add.existing(new AvailableRoom(scene, 1075, 400, 'fortnite', null));
            scene.add.existing(new AvailableRoom(scene, 925, 550, 'garden', null));
            scene.add.existing(new AvailableRoom(scene, 1075, 550, 'hallway', null));
        },
        checkFailState: function(ba, entities) {
            let h1 = entities.getAt(0);
            let h2 = entities.getAt(1);
            if (h1 && h2) {
                return h1.gx === h2.gx && h1.gy === h2.gy;
            } else return false;
        },
        checkSuccessState: function(ba, entities) {
            let h1 = entities.getAt(0);
            let h2 = entities.getAt(1);
            if (h1 && h2) {
                return h1.cycles >= 2 && h2.cycles >= 2;
            } else return false;
        },
        intro: [
            'level1-intro1'
        ],
        failure: [
            'level1-failure1'
        ],
        success: [
            'level1-success1'
        ]
    },
    {
        init: function(scene) {

        },
        checkFailState: function(ba, entities) {

        },
        checkSuccessState: function(ba, entities) {

        },
        intro: [],
        failure: [],
        success: []
    }
]