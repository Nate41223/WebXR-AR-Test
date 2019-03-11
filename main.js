AFRAME.registerComponent('box', {
    schema: {
        width: {type: 'number', default: .2},
        height: {type: 'number', default: .2},
        depth: {type: 'number', default: .2},
        position: {type: 'vec3', default: {x:0, y:0, z:-2}},
        color: {type: 'color', default: '#f00'}
    },

    init: function() {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data,depth);

        this.material = new THREE.MeshStandardMaterial({color: data.color});

        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.position = data.position;

        el.setObject3D('mesh', this.mesh);
    }
});

AFRAME.registerComponent('hover', {
    schema: {
        color: {default: 'red'},
        defaultColor: {default: 'blue'}
    },

    init: function() {
        var data = this.data;
        var el = this.el;

        el.addEventListener('mouseenter', function() {
            el.setAttribute('color', data.color);
        });

        el.addEventListener('mouseleave', function() {
            el.setAttribute('color', data.defaultColor);
        });
    },

    remove: function () {
        var data = this.data;
        var el = this.el;

        el.removeEventListener('mouseenter', function() {
            el.setAttribute('color', data.color);
        });

        el.removeEventListener('mouseleave', function() {
            el.setAttribute('color', data.defaultColor);
        });
    }
});