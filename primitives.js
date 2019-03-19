AFRAME.registerPrimitive('a-boxtest', {
    defaultComponents: {
        geometry: {primitive: 'box'},
        material: {color: 'red'},
        position: {},
        scale: {x:.25, y:.25, z:.25},
    },

    mappings: {
        position: 'position',
    },
});