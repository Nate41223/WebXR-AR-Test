var fishFoodCount = 2;

AFRAME.registerComponent('box', {
    schema: {
        color: {type: 'color', default: 'red'},
        colorChange: {type: 'color', default: 'green'},
    },

    init: function() {
        var data = this.data;
        var el = this.el;

        this.cE = function() {
            el.setAttribute('material', {color: data.colorChange});
            fishFoodCount++;
            document.getElementById("fish").innerHTML = "FF: " + fishFoodCount;
        };
        this.setupEvents();
    },

    setupEvents: function() {
        var el = this.el;

        el.addEventListener('mousedown', this.cE);
    },

    remove: function() {
        var el = this.el;

        el.removeEventListener('mousedown', this.cE);
    },
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
        el.removeEventListener('click', this.cFN);
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