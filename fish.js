var fishName = 'Fish Name';
var fishAge = 'Age:';
var fishWeight = 'Weight:';
var fishLength = 'Length:';
// holds the reference of the currently selected fish
var selectedFish;

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
}
// reference to the holding spot of the fish
var holdingSpot = document.querySelector('#fishhold');

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
        
        var fishNum = fish[Math.floor(Math.random() * Object.keys(fish).length) + 1];
        this.cFN = function() {
            self.updateFishData();
        };
        this.setupValues(fishNum);
        this.setupEvents();
        console.log(holdingSpot);
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