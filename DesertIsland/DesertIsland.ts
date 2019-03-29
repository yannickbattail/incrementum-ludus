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
/// <reference path="./Item.ts" />
/// <reference path="./Level.ts" />

const LEVEL = new Level("Level", "level");
const CLAY = new Material("clay", "g", "clay");
const WATER = new Material("water", "cl", "water");
const WOOD = new Material("wood", "g", "wood");
const CHARCOAL = new Material("charcoal", "g", "CHARCOAL");
const CLAY_POT = new Item("clay pot", "clay_pot");

var engine = new Engine();
engine.Player = new Player("Chuck Noland");
engine.Player.Storage = [new ResourceQuantity(LEVEL, 1)];
engine.Producers = [
    // inital producers
    new ManualProducer("take water", new ResourceQuantity(WATER, 10)),
    new ManualProducer("bare hands dig clay", new ResourceQuantity(CLAY, 10))
];
engine.Triggers = [
    new Trigger("carry water in clay pot",
        // trigger when reach these resources quantity
        [new ResourceQuantity(CLAY_POT, 1)],
        // and then spwan Producer
        [new ManualProducer("carry water", new ResourceQuantity(WATER, 100))],
        //spwan resources
        [new ResourceQuantity(LEVEL, 1),new ResourceQuantity(CLAY_POT, -1)]
    ),
    new Trigger("carry clay in clay pot",
        // trigger when reach these resources quantity
        [new ResourceQuantity(CLAY_POT, 1), new ResourceQuantity(LEVEL, 2)],
        // and then spwan Producer
        [new ManualProducer("carry clay", new ResourceQuantity(CLAY, 100)),
         new ManualProducer("collect branches", new ResourceQuantity(WOOD, 100))],
        //spwan resources
        [new ResourceQuantity(LEVEL, 1)],
        //spwan Crafter
        [],
        //spwan Trigger 
        [new Trigger("charcoal crafting",
            // trigger when reach these resources quantity
            [new ResourceQuantity(WOOD, 200)],
            //spwan Producer
            [],
            //spwan resources
            [],
            //spwan Crafter
            [new Crafter("craft charcoal", 20000,//duration
                //cost
                [new ResourceQuantity(WOOD, 3000), new ResourceQuantity(CLAY, 1000)],
                //spawn
                new ResourceQuantity(CHARCOAL, 1000), false/*auto*/)],
            ),
        ]
        ),

];
engine.Crafters = [
    new Crafter("craft clay pot", 20000,//duration
    //cost
    [new ResourceQuantity(CLAY, 100), new ResourceQuantity(WATER, 10)],
    //spawn
    new ResourceQuantity(CLAY_POT, 1), false/*auto*/)
];
