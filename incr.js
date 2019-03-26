var IRON = new Resource("iron");
var COPPER = new Resource("coper");
var LEAD = new Resource("lead");
var TIN = new Resource("tin");
var engine = new Engine();
engine.Player = new Player("platypus");
engine.Sources = [
    new TimedSource("iron mine", new ResourceQuantity(IRON, 2), 500),
    new TimedSource("copper mine", new ResourceQuantity(COPPER, 1), 3000),
    new ManualSource("tin", new ResourceQuantity(TIN, 1))
];
engine.Triggers = [
    new Trigger("lead mine exploitation", [new ResourceQuantity(IRON, 20), new ResourceQuantity(COPPER, 2)], new TimedSource("lead mine", new ResourceQuantity(LEAD, 1), 5000))
];
//# sourceMappingURL=incr.js.map