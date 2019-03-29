/// <reference path="../Engine/Resource.ts" />
/// <reference path="../Engine/ResourceQuantity.ts" />
/// <reference path="../Engine/Producer.ts" />
/// <reference path="../Engine/TimedProducer.ts" />
/// <reference path="../Engine/ManualProducer.ts" />
/// <reference path="../Engine/Trigger.ts" />
/// <reference path="../Engine/Crafter.ts" />
/// <reference path="../Engine/Player.ts" />
/// <reference path="../Engine/Engine.ts" />

/// <reference path="./Material.ts" />
/// <reference path="./Level.ts" />

const LEVEL = new Level("Level", "level");
const CLAY = new Material("clay", "g", "clay");
const WATER = new Material("water", "cl", "water");

var engine = new Engine();
engine.Player = new Player("Chuck Noland");
engine.Producers = [
    // inital producers
    new ManualProducer("take water", new ResourceQuantity(WATER, 10)),
    new ManualProducer("bare hands dig clay", new ResourceQuantity(CLAY, 10))
];
engine.Triggers = [
    new Trigger("lead mine exploitation",
        // trigger when reach these resources quantity
        [new ResourceQuantity(WATER, 20)],
        // and then spwan Producer
        [new ManualProducer("carry water", new ResourceQuantity(WATER, 100))],
        //spwan resources
        [new ResourceQuantity(LEVEL, 1)]
        ),
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
