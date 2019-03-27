/// <reference path="Engine/Resource.ts" />
/// <reference path="Engine/ResourceQuantity.ts" />
/// <reference path="Engine/Producer.ts" />
/// <reference path="Engine/TimedProducer.ts" />
/// <reference path="Engine/ManualProducer.ts" />
/// <reference path="Engine/Trigger.ts" />
/// <reference path="Engine/Crafter.ts" />
/// <reference path="Engine/Player.ts" />
/// <reference path="Engine/Engine.ts" />

const IRON = new Resource("iron");
const COPPER = new Resource("coper");
const LEAD = new Resource("lead");
const TIN = new Resource("tin");

var engine = new Engine();
engine.Player = new Player("platypus");
engine.Producers = [
    // initals producers
    new TimedProducer("iron mine", new ResourceQuantity(IRON, 2), 500/*mili sec*/),
    new TimedProducer("copper mine", new ResourceQuantity(COPPER, 1), 3000),
    new ManualProducer("tin", new ResourceQuantity(TIN, 1))
];
engine.Triggers = [
    new Trigger("lead mine exploitation",
        // trigger when reach these resources quantity
        [new ResourceQuantity(IRON, 20), new ResourceQuantity(COPPER, 2)],
        // and then spwan source
        new TimedProducer("lead mine", new ResourceQuantity(LEAD, 1), 5000))
];
