AFRAME.registerComponent('log', {
    schema: {
        type: {type: 'string', default: 'plane'},
        width: {type: 'number', default: 1},
        height: {type: 'number', default: .5},
        position:{type: 'vec3', default: {x:-1, y:0, z:0}},
        rotation: {type: 'vec3', default: {x:0, y:90, z:0}},
        side: {type: 'string', default: 'double'},
        opacity: {type: 'number', default: .4},

    },
    init: function() {
        var el = this.el;
        el.setAttribute('geometry', {
            primitive: this.data.type,
            width: this.data.width,
            height: this.data.height,
        });
        el.setAttribute('material', {
            side: this.data.side,
            opacity: this.data.opacity,
        });
        el.setAttribute('position', this.data.position);
        el.setAttribute('rotation', this.data.rotation);
    }
});

AFRAME.registerComponent('words', {
    schema: {
        value: {type: 'string', default: 'Hello World Register'},
        side: {type: 'string', default: 'double'},
        anchor: {type: 'string', default: 'left'},
        baseline: {type: 'string', default: 'bottom'},
        position: {type: 'vec3', default: {x:0, y:0, z:0}},
    },
    init: function() {
        var el = this.el;
        el.setAttribute('text', {
            value: this.data.value,
            side: this.data.side,
            anchor: this.data.anchor,
            baseline: this.data.baseline,
        });
        el.setAttribute('position', this.data.position);
    }
});

AFRAME.registerComponent('box', {
    schema: {
        width: {type: 'number', default: .05},
        height: {type: 'number', default: .05},
        depth: {type: 'number', default: .05},
        position: {type: 'vec3', default: {x:0, y:0, z:0}},
        color: {type: 'color', default: 'red'}
    },

    init: function() {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);

        this.material = new THREE.MeshStandardMaterial({color: data.color});

        this.mesh = new THREE.Mesh(this.geometry, this.material);

        el.setObject3D('mesh', this.mesh);

        el.setAttribute('position', data.position);
    }
});

AFRAME.registerComponent('hover', {
    schema: {
        color: {default: 'red'},
        defaultColor: {default: 'blue'},
        clickColor: {default: 'yellow'},
        
    },

    init: function() {
        var data = this.data;
        var el = this.el;
        this.meFN = function() {el.setAttribute('color', data.color)};
        this.mlFN = function() {el.setAttribute('color', data.defaultColor)};
        this.cFN = function() {el.setAttribute('color', data.clickColor)};

        this.setupEvents();
    },

    setupEvents: function() {
        var el = this.el;
        
        el.addEventListener('mouseenter', this.meFN);
        el.addEventListener('mouseleave', this.mlFN);
        el.addEventListener('click', this.cFN);
    },

    remove: function () {
        var el = this.el;

        el.removeEventListener('mouseenter', this.meFN);
        el.removeEventListener('mouseleave', this.mlFN);
        el.addEventListener('click', this.cFN);
    }
});

var imageAnchorToPlaneQuat = new THREE.Quaternion();          
imageAnchorToPlaneQuat.setFromAxisAngle(new THREE.Vector3(1,0,0), THREE.Math.DEG2RAD * -90);

AFRAME.registerComponent('imagetracking', {
    schema: {
        name: { type: 'string'},
        src: { type: 'string'},
        physicalWidth: {type: 'number'},
        vertical: { default: false },
    },

    init: function() {
        this.el.setAttribute('visible', false);
        this.added = false;
    },

    tick: function () {

        if (!this.source) {
          this.source = document.querySelector('[ar]').components.ar.getSource();
        }
        
        if (!this.source) { return; }
        
        if (!this.added) {
          this.source.addImage(this.data.name, 
                             this.data.src,
                             this.data.physicalWidth);
          this.added = true;
          return;
        }
        var anchors = this.source.getAnchors();
        if (anchors && anchors.length) {
            for (var i = 0; i < anchors.length; i++) {
                if (anchors[i].name === this.data.name) {
                    var mat = new THREE.Matrix4().fromArray(anchors[i].modelMatrix);
                    mat.decompose(this.el.object3D.position, this.el.object3D.quaternion, this.el.object3D.scale);
                    if (this.data.vertical) { 
                        this.el.object3D.quaternion.multiply(imageAnchorToPlaneQuat);
                    }
                    
                    if (!this.el.getAttribute('visible')) {
                        this.el.setAttribute('visible', true);
                        this.el.emit('imageanchor', {anchor: anchors[i]});
                    } else {
                        this.el.emit('imageanchorupdate', {anchor: anchors[i]});
                    } 
                    /*
                    if(!this.removed) {
                        this.removed = true;
                        this.source.removeImage(this.data.name);
                    } */
                }
            }
        }
    }
});