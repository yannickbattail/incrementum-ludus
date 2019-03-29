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
    new Trigger("lead mine exploitation")
        .whenReached(20, IRON).and(2, COPPER)
        .spawnProducer(
            new TimedProducer("lead mine")
                .thatProduce(1, LEAD).every(5).seconds()
        ),
    new Trigger("water source")
        .whenReached(10, TIN)
        .spawnProducer(
            new ManualProducer("lead mine")
                .thatProduce(1, WATER)
        )
        .spawnResource(10, WATER)
        .appendTrigger(
            new Trigger("beer brewering")
                .whenReached(20, WATER)
                .spawnCrafter(
                    new Crafter("brewery")
                        .thatCraft(1, BEER)
                        .in(20).seconds()
                        .atCostOf(20, WATER).and(1, TIN)
            )
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
