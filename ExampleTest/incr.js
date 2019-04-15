var IRON = new Resource("iron");
var COPPER = new Resource("copper");
var LEAD = new Resource("lead");
var TIN = new Resource("tin");
var WATER = new Resource("water");
var AXE = new Resource("axe");
var KNIFE = new Resource("knife");
var BEER = new Resource("beer");
var WASTE = new Resource("waste");
var engine = new Engine();
engine.Player = new Player("platypus");
engine.Producers = [
    new Producer("iron mine", new ResourceQuantity(IRON, 2), 500),
    new Producer("copper mine", new ResourceQuantity(COPPER, 1), 3000),
    new Producer("tin", new ResourceQuantity(TIN, 1))
];
engine.Triggers = [
    new Trigger("lead mine exploitation")
        .whenReached(20, IRON).and(2, COPPER)
        .spawnProducer(new Producer("lead mine")
        .thatProduce(1, LEAD).every(5).seconds()),
    new Trigger("water source")
        .whenReached(10, TIN)
        .spawnProducer(new Producer("water source")
        .thatProduce(1, WATER))
        .spawnResource(10, WATER)
        .appendTrigger(new Trigger("beer brewering")
        .whenReached(20, WATER)
        .spawnCrafter(new Crafter("brewery")
        .thatCraft(1, BEER)["in"](20).seconds()
        .atCostOf(20, WATER).and(1, TIN)))
];
engine.Crafters = [
    new Crafter("forge axe", 20000, [new ResourceQuantity(IRON, 30), new ResourceQuantity(COPPER, 10)], [new ResourceQuantity(AXE, 1)], true),
    new Crafter("forge knife", 20000, [new ResourceQuantity(IRON, 10), new ResourceQuantity(COPPER, 6)], [new ResourceQuantity(KNIFE, 1), new ResourceQuantity(WASTE, 2)], false),
];
var VERSION = "1.1";
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
//# sourceMappingURL=incr.js.map