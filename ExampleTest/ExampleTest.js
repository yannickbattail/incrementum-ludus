"use strict";
var IRON = new Resource("iron");
var COPPER = new Resource("copper");
var LEAD = new Resource("lead");
var TIN = new Resource("tin");
var WATER = new Resource("water");
var AXE = new Resource("axe");
var KNIFE = new Resource("knife");
var BEER = new Resource("beer");
var WASTE = new Resource("waste");
function testCallback() {
    window.alert("testCallback when water source triggered.");
}
function initEngine() {
    var engine = new IncrementumLudus();
    engine.player = new Player("platypus");
    engine.producers = [
        new Producer("iron mine", [new Quantity(2, IRON)], 500),
        new Producer("copper mine", [new Quantity(1, COPPER)], 3000),
        new Producer("tin", [new Quantity(1, TIN)])
    ];
    engine.crafters = [
        new Crafter("forge axe", 20000, [new Quantity(30, IRON), new Quantity(10, COPPER)], [new Quantity(1, AXE)], true),
        new Crafter("forge knife", 20000, [new Quantity(10, IRON), new Quantity(6, COPPER)], [new Quantity(1, KNIFE), new Quantity(2, WASTE)], false),
    ];
    engine.triggers = [
        new Trigger("lead mine exploitation")
            .whenReached(new Quantity(20, IRON)).and(new Quantity(2, COPPER))
            .spawnProducer(new Producer("lead mine")
            .thatProduce(new Quantity(1, LEAD)).every(5).seconds()),
        new Trigger("water source")
            .whenReached(new Quantity(10, TIN))
            .spawnProducer(new Producer("water source")
            .thatProduce(new Quantity(1, WATER)))
            .spawnResource(new Quantity(10, WATER))
            .appendTrigger(new Trigger("win")
            .whenReached(new Quantity(30, WATER))
            .thenWin())
            .appendTrigger(new Trigger("beer brewering")
            .whenReached(new Quantity(20, WATER))
            .spawnCrafter(new Crafter("brewery")
            .thatCraft(new Quantity(1, BEER))["in"](20).seconds()
            .atCostOf(new Quantity(20, WATER)).and(new Quantity(1, TIN))
            .canBeSwitchedToAuto()))
            .execFunction(testCallback)
    ];
    return engine;
}
var VERSION = "1.4";
function loadIncrementumLudus() {
    var json = window.localStorage.getItem('ExampleTest');
    if (json != null) {
        if ((window.localStorage.getItem('ExampleTestVersion') != null)
            || (window.localStorage.getItem('ExampleTestVersion') == VERSION)) {
            var obj = JSON.parse(json);
            console.log('load IncrementumLudus');
            var curContext = window;
            return curContext[obj.$type].load(obj);
        }
        console.log('wrong version');
    }
    console.log('no IncrementumLudus');
    return null;
}
function saveIncrementumLudus(IncrementumLudus) {
    window.localStorage.setItem('ExampleTest', JSON.stringify(IncrementumLudus));
    window.localStorage.setItem('ExampleTestVersion', VERSION);
}
var engine = initEngine();
var engine2 = loadIncrementumLudus();
if (engine2 != null) {
    engine = engine2;
}
var engine;
var e = loadIncrementumLudus();
if (!e) {
    engine = initEngine();
}
else {
    engine = e;
}
//# sourceMappingURL=ExampleTest.js.map