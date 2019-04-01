// this is a test component for using registered components to make animations
// this allows us to effect/change animation variables based on conditions
AFRAME.registerComponent('slideanim', {
    schema: {
        property: {type:'string', default:'position'},
        // I tried from: {type:'vec3', default:{x:1, y:.7, z:-1}} but would only play the animation once, clicking the box again did nothing.
        // the default value type seems to be string (is not specified in API), the vec3 is converted to an {Object object} at runtime
        from: {type:'string', default:'1 .7 -1'},
        to: {type:'string', default:'-1 .7 -1'},
        dur: {type:'number', default:1000},
        dir: {type:'string', default:'normal'},
        startEvents: {type:'string', default:'click'},
    },
    init: function() {
        var data = this.data;
        var el = this.el;
        el.setAttribute('animation', {
            property: data.property,
            from: data.from,
            to: data.to,
            dur: data.dur,
            dir: data.dir,
            startEvents: data.startEvents,
        });
    },
});

var worldPos = function(el) {
    var worldPos = new THREE.Vector3();
    worldPos.setFromMatrixPosition(el.object3D.matrixWorld);
    return worldPos;
}
// series of events:
// 1. add object as a child of holding point
// 2. set 'from' to world pos of fish
// 3. start animation
AFRAME.registerComponent('fishslideto', {
    schema: {
        property: {type:'string', default:'position'},
        from: {type:'string', default:'1 .7 -1'},
        to: {type:'string', default:'0 0 0'},
        dur: {type:'number', default:1000},
        dir: {type:'string', default:'normal'},
        startEvents: {type:'string', default:'slideto'},
    },
    init: function() {
        var data = this.data;
        var el = this.el;
        this.fishholder = document.querySelector("#fishhold");

        el.setAttribute('animation', {
            property: data.property,
            from: data.from,
            to: data.to,
            dur: data.dur,
            dir: data.dir,
            startEvents: data.startEvents,
        });
        
        el.addEventListener('slidetosetup', this.stsFN());
    },
    stsFN: function() {
        //var vec3pos = worldPos(el);
        //selectedFish.setAttribute('position', vec3pos);
        //data.from = vec3pos.x + " " + vec3pos.y + " " + vec3pos.z;
        var fishpos = el.getAttribute('position');
        data.from = fishpos;
        console.log(fishpos);

        var holdpos = worldPos(this.fishholder);
        data.to = holdpos.x + " " + holdpos.y + " " + holdpos.z;

        el.emit('slideto');
    },
    remove: function() {
        this.el.removeEventListener('slidetosetup', this.stsFN());
        console.log("ouch");
    },
});