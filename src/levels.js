import { AvailableRoom } from './room';

export const levels = [
    {
        init: function(scene) {
            scene.add.existing(new AvailableRoom(scene, 1000, 200, 'hallway', null));
            scene.add.existing(new AvailableRoom(scene, 1000, 400, 'bedroom1', 'granny', 1));
            scene.add.existing(new AvailableRoom(scene, 1000, 600, 'kitchen', null, 1));
        },
        checkFailState: function(ba, entities) {
            let granny = entities.getAt(0);
            return (granny.steps[granny.step % granny.steps.length].action === 'wake' && 
                granny.step > 0 && granny.step < 13);
        },
        checkSuccessState: function(ba, entities) {
            let granny = entities.getAt(0);
            return (granny.steps[granny.step % granny.steps.length].action === 'wake' && 
                granny.step >= 19);
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
            scene.add.existing(new AvailableRoom(scene, 1200, 200, 'kitchen', null, 1));
            scene.add.existing(new AvailableRoom(scene, 1200, 400, 'fortnite', null, 1));
            scene.add.existing(new AvailableRoom(scene, 1000, 600, 'garden', null, 1));
        },
        checkFailState: function(ba, entities) {
            
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
        introImages: [

        ],
        failureImages: [
            
        ]
    },
    {
        init: function(scene) {

        },
        checkFailState: function(ba, entities) {

        },
        introImages: [

        ],
        failureImages: [

        ]
    }
]