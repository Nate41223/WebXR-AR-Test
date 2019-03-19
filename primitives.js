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