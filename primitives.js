AFRAME.registerPrimitive('a-boxtest', {
    defaultComponents: {
        geometry: {primitive: 'box'},
        material: {color: 'red'},
        scale: {x:.25, y:.25, z:.25},
        position: {x:0, y:.5, z:-1},
    },

    mappings: {
        x: 'position.x',
        y: 'position.y',
        z: 'position.z',
    },
});

AFRAME.registerPrimitive('a-planetest', {
    defaultComponents: {
        geometry: {primitive: 'plane', width:1, height:.5},
        material: {opacity:.4, side:'double'},
        rotation: {x:0, y:90, z:0},
        position: {x:-1, y:0, z:0},
    },

    mappings: {
        x: 'position.x',
        y: 'position.y',
        z: 'position.z',
    },
});

AFRAME.registerPrimitive('a-texttest', {
    defaultComponents: {
        text: { 
            value: 'Hello World Register',
            side: 'double',
            anchor: 'center',
            baseline: 'bottom',
            align: 'center',
        },
        position: {x:0, y:0, z:0},
    },

    mappings: {
        wordValue: 'text.value',
        x: 'position.x',
        y: 'position.y',
        z: 'position.z',
    },
});