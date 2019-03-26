
const IRON = new Resource("iron");
const COPER = new Resource("coper");
const LEAD = new Resource("lead");

var engine = new Engine();
engine.Player = new Player("platypus");
engine.Sources = [
    new TimedSource("iron mine", new ResourceQuantity(IRON, 2), 500),
    new TimedSource("coper mine", new ResourceQuantity(COPER, 1), 3000)
];
engine.Triggers = [
    new Trigger("lead mine exploitation", [new ResourceQuantity(IRON, 20), new ResourceQuantity(COPER, 2)],
        new TimedSource("lead mine", new ResourceQuantity(LEAD, 1), 5000)/*, [], []*/)
];

