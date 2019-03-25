
const IRON = new Resource("iron");
const COPER = new Resource("coper");
const LEAD = new Resource("lead");

var engine = new Engine();
engine.Player = new Player("platypus");
engine.Sources = [
    new Source("iron mine", new ResourceQuantity(IRON, 2), "timed", 500),
    new Source("coper mine", new ResourceQuantity(COPER, 1), "timed", 3000)
];
engine.Triggers = [
    new Trigger("lead mine exploitation", [new ResourceQuantity(IRON, 20), new ResourceQuantity(COPER, 2)],
        new Source("lead mine", new ResourceQuantity(LEAD, 1), "timed", 5000)/*, [], []*/)
];
