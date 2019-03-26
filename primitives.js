// basic box creation
AFRAME.registerPrimitive('a-boxtest', {
    defaultComponents: {
        geometry: {primitive: 'box', width:.1, depth:.1, height:.1,},
        material: {color: 'red'},
        position: {x:0, y:.5, z:-1},
    },

    mappings: {
        x: 'position.x',
        y: 'position.y',
        z: 'position.z',
        color: 'material.color',
    },
});
// basic plane creation
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
// basic centered text creation
AFRAME.registerPrimitive('a-texttest', {
    defaultComponents: {
        text: { 
            value: 'Hello World 2.0',
            side: 'double',
            anchor: 'center',
            baseline: 'bottom',
            align: 'center',
        },
        position: {x:0, y:0, z:0},
    },

    mappings: {
        t: 'text.value',
        x: 'position.x',
        y: 'position.y',
        z: 'position.z',
    },
});

AFRAME.registerPrimitive('a-fish', {
    defaultComponents: {
        geometry: {primitive: 'sphere', radius: .1},
        material: {color: 'white'},
        position: {x:0, y:0, z:0},
    },
    mappings: {
        x: 'position.x',
        y: 'position.y',
        z: 'position.z',
        color: 'material.color',
        radius: 'geometry.radius',
    },
});