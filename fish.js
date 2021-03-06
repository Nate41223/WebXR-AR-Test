var fishName = 'Fish Name';
var fishAge = 'Age:';
var fishWeight = 'Weight:';
var fishLength = 'Length:';
// holds the reference of the currently selected fish
var selectedFish;
var selectedFishData;

// called when player clicks on a fish
var showFishData = function () {
    document.getElementById("fname").innerHTML = fishName;
    document.getElementById("fage").innerHTML = fishAge;
    document.getElementById("fweight").innerHTML = fishWeight;
    document.getElementById("flength").innerHTML = fishLength;
    document.getElementById("fishinfo").style.display = 'inline-flex';
};
// called when player releases fish
var hideFishData = function () {
    document.getElementById("fname").innerHTML = '';
    document.getElementById("fage").innerHTML = '';
    document.getElementById("fweight").innerHTML = '';
    document.getElementById("flength").innerHTML = '';
    document.getElementById("fishinfo").style.display = 'none';
};

// if Key is number use fish[number], if it is a string use fish.string
var fish = {
    '1':{'name':'Sue', 'age':42, 'weight':319.54, 'length':67},
    '2':{'name':'Robert', 'age':37, 'weight':215.95, 'length':48},
    '3':{'name':'Bill', 'age':25, 'weight':118.48, 'length':27},
    '4':{'name':'John', 'age':56, 'weight':340.27, 'length':70},
    '5':{'name':'Steve', 'age':5, 'weight':56.65, 'length':18},
};

var registeredFish = {};

AFRAME.registerComponent('fish2', {
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
        this.fishholder = document.querySelector("#fishhold");
        
        this.fishData = self.decideFish();
        console.log(self.fishData);
    },
    decideFish: function() {

        var chosenFish = fish[Math.floor(Math.random() * Object.keys(fish).length) + 1];
        registeredFish[1] = {Object:self, name:chosenFish.name, age:chosenFish.age, weight:chosenFish.weight, length:chosenFish.length};
        console.log(registeredFish);

        return chosenFish;
    },
});

// attach to any object you want to be a fish
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
        this.fishholder = document.querySelector("#fishhold");
        
        this.fishData = self.decideFish();
        console.log(self.fishData);

        this.cFN = function() {
            if (selectedFish == null) {
                self.updateFishData();
            } else if (selectedFish != null && selectedFish == el) {
                self.clearFishData();
            }
        };
        this.setupValues(self.fishData);
        this.setupEvents();
    },
    decideFish: function() {
        console.log(selectedFish);
        if(selectedFish != null) {
            return selectedFishData;
        }
        return fish[Math.floor(Math.random() * Object.keys(fish).length) + 1];
    },
    updateFishData: function() {
        var data = this.data;
        var el = this.el;

        fishName = data.name;
        fishAge = 'Age: ' + data.age;
        fishWeight = 'Weight: ' + data.weight + "kg";
        fishLength = 'Length: '+ data.length + "m";
        showFishData();
        selectedFish = el;
        selectedFishData = this.fishData;

        el.emit('slidetosetup',{},true);
    },
    clearFishData: function() {
        var el = this.el;

        hideFishData();

        selectedFish = null;
        selectedFishData = null;

        el.emit('slidefromsetup',{},true);
    },
    setupValues: function(chosenFish) {
        var data = this.data;
        
        data.name = chosenFish.name;
        data.age = chosenFish.age;
        data.weight = chosenFish.weight;
        data.length = chosenFish.length;
    },
    setupEvents: function() {
        var el = this.el;
        this.el.addEventListener('mousedown', this.cFN);
        el.parentNode = this.fishholder;
    },
    remove: function() {
        this.el.removeEventListener('mousedown', this.cFN);
        console.log("ouch");
    },
});