import { AvailableRoom } from './room';

export const levels = [
    {
        init: function(scene) {
            scene.add.existing(new AvailableRoom(scene, 1000, 200, 'hallway', null));
            scene.add.existing(new AvailableRoom(scene, 1000, 400, 'bedroom1', 'granny', 1));
            scene.add.existing(new AvailableRoom(scene, 1000, 600, 'kitchen', null));
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
            scene.add.existing(new AvailableRoom(scene, 1000, 200, 'hallway', null));
            scene.add.existing(new AvailableRoom(scene, 1000, 400, 'bedroom1', 'gamer', 1));
            scene.add.existing(new AvailableRoom(scene, 1200, 200, 'kitchen', null));
            scene.add.existing(new AvailableRoom(scene, 1200, 400, 'fortnite', null));
            scene.add.existing(new AvailableRoom(scene, 1000, 600, 'garden', null, 1));
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
        intro: [],
        failure: [],
        success: []
    },
    {
        init: function(scene) {
            scene.add.existing(new AvailableRoom(scene, 1000, 200, 'hallway', null));
            scene.add.existing(new AvailableRoom(scene, 1000, 400, 'bedroom1', 'husband1', 1));
            scene.add.existing(new AvailableRoom(scene, 1200, 600, 'bedroom2', 'husband2', 1));
            scene.add.existing(new AvailableRoom(scene, 1200, 200, 'kitchen', null));
            scene.add.existing(new AvailableRoom(scene, 1200, 400, 'fortnite', null));
            scene.add.existing(new AvailableRoom(scene, 1000, 600, 'garden', null));
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
        intro: [],
        failure: [],
        success: []
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