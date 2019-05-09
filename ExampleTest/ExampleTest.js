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
var engine = new Engine();
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
        .appendTrigger(new Trigger("beer brewering")
        .whenReached(new Quantity(20, WATER))
        .spawnCrafter(new Crafter("brewery")
        .thatCraft(new Quantity(1, BEER))["in"](20).seconds()
        .atCostOf(new Quantity(20, WATER)).and(new Quantity(1, TIN))
        .canBeSwitchedToAuto()))
        .execFunction(testCallback)
];
var VERSION = "1.3";
function loadEngine() {
    var json = window.localStorage.getItem('incr');
    if (json != null) {
        if ((window.localStorage.getItem('incrVersion') != null)
            || (window.localStorage.getItem('incrVersion') == VERSION)) {
            var obj = JSON.parse(json);
            console.log('load engine');
            var curContext = window;
            return curContext[obj.$type].load(obj);
        }
        console.log('wrong version');
    }
    console.log('no engine');
    return null;
}
function saveEngine(engine) {
    window.localStorage.setItem('incr', JSON.stringify(engine));
    window.localStorage.setItem('incrVersion', VERSION);
}
var engine2 = loadEngine();
if (engine2) {
    engine = engine2;
}
//# sourceMappingURL=ExampleTest.js.map