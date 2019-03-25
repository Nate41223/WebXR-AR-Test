// holds the amount of fish food the player has
var fishFoodCount = 2;

// attach this to an object you want the player to be able to click and add fish food to their inventory.
AFRAME.registerComponent('fishfoodcollection', {
    // holds variables to be called in this component
    schema: {
        colorChange: {type: 'color', default: 'green'},
        id: {type: 'string', default: null},
    },
    // sets up component for use
    init: function() {
        var data = this.data;
        var el = this.el;
        this.tracker = null;
        this.activeEvent = false;
        // this function is called when 'mousedown' event listener is fired.
        this.cE = function() {
            el.setAttribute('material', {color: data.colorChange});
            fishFoodCount++;
            document.getElementById("ff").innerHTML = "FF: " + fishFoodCount;
        };
        if(data.id != null) this.tracker = document.querySelector('#' + data.id);
        if(this.tracker == null) this.setupEvents();
    },

    tick: function() {
        if(this.tracker != null && this.tracker.getAttribute('visible') == true) {
            if(this.activeEvent == false) this.setupEvents();
        } else if (this.tracker != null && this.tracker.getAttribute('visible') == false) {
            if(this.activeEvent == true) this.removeEvents();
        }
        console.log(selectedFish);
    },
    // sets up the event listeners
    setupEvents: function() {
        this.el.addEventListener('mousedown', this.cE);
        this.activeEvent = true;
    },
    // removes the event listeners
    removeEvents: function() {
        this.el.removeEventListener('mousedown', this.cE);
        this.activeEvent = false;
    },
    // this is called when an object with this component is removed.
    remove: function() {
        removeEvents();
    },
});

var fishName = 'Fish Name';
var fishAge = 'Age:';
var fishWeight = 'Weight:';
var fishLength = 'Length:';
var selectedFish;

// if Key is number use fish[number], if it is a string use fish.string
var fish = {
    '1':{'name':'Sue', 'age':42, 'weight':319.54, 'length':67},
    '2':{'name':'Robert', 'age':37, 'weight':215.95, 'length':48},
    '3':{'name':'Bill', 'age':25, 'weight':118.48, 'length':27},
    '4':{'name':'John', 'age':56, 'weight':340.27, 'length':70},
    '5':{'name':'Steve', 'age':5, 'weight':56.65, 'length':18},
}

AFRAME.registerComponent('fish', {
    schema: {
        name: {type: 'string'},
        age: {type: 'int'},
        weight: {type: 'float'},
        length: {type: 'int'},
    },
    init: function() {
        var data = this.data;
        var el = this.el;
        var self = this;
        var fishNum = fish[Math.floor(Math.random() * Object.keys(fish).length) + 1];
        this.cFN = function() {
            self.updateFishData();
        };
        this.setupValues(fishNum);
        this.setupEvents();
    },
    updateFishData: function() {
        var data = this.data;
        var el = this.el;

        fishName = data.name;
        fishAge = 'Age: ' + data.age;
        fishWeight = 'Weight: ' + data.weight + "kg";
        fishLength = 'Length: '+ data.length + "m";
        document.getElementById("fname").innerHTML = fishName;
        document.getElementById("fage").innerHTML = fishAge;
        document.getElementById("fweight").innerHTML = fishWeight;
        document.getElementById("flength").innerHTML = fishLength;
        document.getElementById("fishinfo").style.display = 'inline-flex';
        selectedFish = el;
    },
    setupValues: function(chosenFish) {
        var data = this.data;
        
        data.name = chosenFish.name;
        data.age = chosenFish.age;
        data.weight = chosenFish.weight;
        data.length = chosenFish.length;
    },
    setupEvents: function() {
        this.el.addEventListener('mousedown', this.cFN);
    },
    remove: function() {
        this.el.removeEventListener('mousedown', this.cFN);
    },
});

// this is a test component to see a few of the different events that you can call and how to set them up.
AFRAME.registerComponent('hover', {
    schema: {
        color: {default: 'red'},
        defaultColor: {default: 'blue'},
        clickColor: {default: 'yellow'},
    },
    // sets up component for use
    init: function() {
        var data = this.data;
        var el = this.el;
        this.meFN = function() {el.setAttribute('color', data.color)};
        this.mlFN = function() {el.setAttribute('color', data.defaultColor)};
        this.cFN = function() {el.setAttribute('color', data.clickColor)};

        this.setupEvents();
    },
    // sets up event listeners
    setupEvents: function() {
        var el = this.el;
        
        el.addEventListener('mouseenter', this.meFN);
        el.addEventListener('mouseleave', this.mlFN);
        el.addEventListener('click', this.cFN);
    },
    // this is called when an object with this component is removed.
    remove: function() {
        var el = this.el;

        el.removeEventListener('mouseenter', this.meFN);
        el.removeEventListener('mouseleave', this.mlFN);
        el.removeEventListener('click', this.cFN);
    }
});

var imageAnchorToPlaneQuat = new THREE.Quaternion();          
imageAnchorToPlaneQuat.setFromAxisAngle(new THREE.Vector3(1,0,0), THREE.Math.DEG2RAD * -90);
// attach to an empty game object to serve as an anchor for any child object.
AFRAME.registerComponent('imagetracking', {
    schema: {
        name: { type: 'string'},
        src: { type: 'string'},
        physicalWidth: {type: 'number'},
        vertical: { default: false },
    },
    // sets up component for use
    init: function() {
        this.el.setAttribute('visible', false);
        this.added = false;
    },
    // runs every frame as an update loop
    tick: function () {
        // gets the ar component from the scene
        if (!this.source) {
          this.source = document.querySelector('[ar]').components.ar.getSource();
        }
        
        if (!this.source) { return; }
        // adds the image to the ar imagetracker
        if (!this.added) {
          this.source.addImage(this.data.name, 
                             this.data.src,
                             this.data.physicalWidth);
          this.added = true;
          return;
        }
        // retrieves the current anchors
        var anchors = this.source.getAnchors();
        // if anchors does not equal null and the length is more than 0
        if (anchors && anchors.length) {
            // loop through the anchors
            for (var i = 0; i < anchors.length; i++) {
                // if the anchors name equals this components name
                if (anchors[i].name === this.data.name) {
                    var mat = new THREE.Matrix4().fromArray(anchors[i].modelMatrix);
                    mat.decompose(this.el.object3D.position, this.el.object3D.quaternion, this.el.object3D.scale);
                    if (this.data.vertical) { 
                        this.el.object3D.quaternion.multiply(imageAnchorToPlaneQuat);
                    }
                    
                    if (!this.el.getAttribute('visible')) {
                        this.el.setAttribute('visible', true);
                        this.el.emit('imageanchor', {anchor: anchors[i]});
                        this.el.emit('imagetracking');
                        
                    } else {
                        this.el.emit('imageanchorupdate', {anchor: anchors[i]});
                    } 
                    /*
                    if(!this.removed) {
                        this.removed = true;
                        this.source.removeImage(this.data.name);
                    } 
                    */
                }
            }
        }
    }
});