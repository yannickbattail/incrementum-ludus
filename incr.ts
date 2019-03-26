
const IRON = new Resource("iron");
const COPPER = new Resource("coper");
const LEAD = new Resource("lead");
const TIN = new Resource("tin");

var engine = new Engine();
engine.Player = new Player("platypus");
engine.Sources = [
    // initals sources
    new TimedSource("iron mine", new ResourceQuantity(IRON, 2), 500/*mili sec*/),
    new TimedSource("copper mine", new ResourceQuantity(COPPER, 1), 3000),
    new ManualSource("tin", new ResourceQuantity(TIN, 1))
];
engine.Triggers = [
    new Trigger("lead mine exploitation",
        // trigger when reach these resources quantity
        [new ResourceQuantity(IRON, 20), new ResourceQuantity(COPPER, 2)],
        // and then spwan source
        new TimedSource("lead mine", new ResourceQuantity(LEAD, 1), 5000))
];
