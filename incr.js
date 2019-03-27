var IRON = new Resource("iron");
var COPPER = new Resource("coper");
var LEAD = new Resource("lead");
var TIN = new Resource("tin");
var engine = new Engine();
engine.Player = new Player("platypus");
engine.Producers = [
    new TimedProducer("iron mine", new ResourceQuantity(IRON, 2), 500),
    new TimedProducer("copper mine", new ResourceQuantity(COPPER, 1), 3000),
    new ManualProducer("tin", new ResourceQuantity(TIN, 1))
];
engine.Triggers = [
    new Trigger("lead mine exploitation", [new ResourceQuantity(IRON, 20), new ResourceQuantity(COPPER, 2)], new TimedProducer("lead mine", new ResourceQuantity(LEAD, 1), 5000))
];
//# sourceMappingURL=incr.js.map