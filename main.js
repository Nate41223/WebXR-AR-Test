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

// used to test the effects of pausing an entity
// pausing an entity ends up pausing the tick function as well as seen through this example.
AFRAME.registerComponent('pausetest', {
    init: function() {
        this.time = 200;
        this.isMoving = true;
    },
    tick: function() {
        var el = this.el;
        this.time--;
        if (this.time <= 0) {
            if (this.isMoving) {
                el.pause();
                this.isMoving = false;
            } else {
                el.play();
                this.isMoving = true;
            }
            this.time = 200;
        };
        //console.log(this.time);
    },
})

AFRAME.registerComponent('spawntest', {
    init: function() {
        this.time = 200;
        this.isMoving = true;
        this.child;
    },
    tick: function() {
        var el = this.el;
        this.time--;
        if (this.time <= 0) {
            if (this.isMoving) {
                this.child = document.createElement('a-boxtest');
                el.appendChild(this.child);
                console.log("added child");
                this.isMoving = false;
            } else {
                el.removeChild(this.child);
                console.log("removed child");
                this.isMoving = true;
            }
            this.time = 200;
        };
        //console.log(this.time);
    },
})

AFRAME.registerComponent('spawntest2', {
    init: function() {
        this.time = 200;
        this.isMoving = true;
        this.child;
        this.scene = this.sceneEl;
    },
    tick: function() {
        var el = this.el;
        this.time--;
        if (this.time <= 0) {
            if (this.isMoving) {
                this.child = document.createElement('a-boxtest');
                console.log(this.child);
                el.appendChild(this.child);
                console.log("added child");
                this.isMoving = false;
            } else {
                console.log(this.child);
                this.scene.appendChild(this.child);
                //el.removeChild(this.child);
                console.log("removed child");
                this.isMoving = true;
            }
            this.time = 200;
        };
        //console.log(this.time);
    },
})