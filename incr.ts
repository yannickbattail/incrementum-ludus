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
const COPPER = new Resource("copper");
const LEAD = new Resource("lead");
const TIN = new Resource("tin");
const WATER = new Resource("water");
const AXE = new Resource("axe");
const KNIFE = new Resource("knife");
const BEER = new Resource("beer");

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
        // and then spwan Producer
        [new TimedProducer("lead mine", new ResourceQuantity(LEAD, 1), 5000)]),
    new Trigger("water source",
        //trigger when resources
        [new ResourceQuantity(TIN, 10)],
        //spwan Producer
        [new ManualProducer("water source", new ResourceQuantity(WATER, 1))],
        //spwan resources
        [new ResourceQuantity(WATER, 10)],
        //spwan Crafter
        [],
        //spwan Trigger
        [new Trigger("beer brewering",
            //trigger when resources
            [new ResourceQuantity(WATER, 20)], // trigger when resources
            //spwan Producer
            [],
            //spwan resources
            [],
            //spwan Crafter
            [new Crafter("brewery", 20000,//duration
                //cost
                [new ResourceQuantity(WATER, 20), new ResourceQuantity(TIN, 1)],
                //spawn
                new ResourceQuantity(BEER, 1), false)],
            //spwan Trigger 
            []
        )]
        )
];
engine.Crafters = [
    new Crafter("forge axe", 20000,//duration
        //cost
        [new ResourceQuantity(IRON, 30), new ResourceQuantity(COPPER, 10)],
        //spawn
        new ResourceQuantity(AXE, 1), true/*auto*/),
    new Crafter("forge knife", 20000,//duration
        //cost
        [new ResourceQuantity(IRON, 10), new ResourceQuantity(COPPER, 6)],
        //spawn
        new ResourceQuantity(KNIFE, 1), false/*auto*/),
];
