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
const BRICK = new Item("brick", "brick");

var engine = new Engine();
engine.Player = new Player("Chuck Noland");
// inital storage
engine.Player.Storage = [new ResourceQuantity(LEVEL, 1)];
engine.Producers = [
    // inital producers
    new ManualProducer("take water").thatProduce(10, WATER),
    new ManualProducer("bare hands dig clay").thatProduce(10, CLAY)
];
engine.Crafters = [
    // inital Crafters
    new Crafter("craft clay pot")
        .thatCraft(1, CLAY_POT)
        .in(20).seconds()
        .atCostOf(100, CLAY).and(10, WATER)
];
engine.Triggers = [
    new Trigger("carry water in clay pot")
        .whenReached(1, CLAY_POT)
        .spawnProducer(new ManualProducer("carry water").thatProduce(100, WATER))
        .spawnResource(1, LEVEL) // level 2
        .spawnResource(-1, CLAY_POT)
    ,
    new Trigger("carry clay in clay pot")
        .whenReached(1, CLAY_POT).and(2, LEVEL)
        .spawnProducer(new ManualProducer("carry clay").thatProduce(100, CLAY))
        .spawnProducer(new ManualProducer("collect branches").thatProduce(100, WOOD))
        .spawnResource(1, LEVEL) // level 3
        .appendTrigger(
            new Trigger("charcoal crafting")
                .whenReached(200, WOOD)
                .spawnCrafter(
                    new Crafter("craft charcoal")
                    .thatCraft(1000, CHARCOAL)
                    .in(20).seconds()
                    .atCostOf(3000, WOOD).and(1000, CLAY)
                ).appendTrigger(
                    new Trigger("charcoal craf")
                        .whenReached(1000, CHARCOAL)
                        .spawnResource(1, LEVEL) // level 4
                ).appendTrigger(
                    new Trigger("charcoal craf")
                        .whenReached(3000, CHARCOAL).and(5000, WOOD).and(3000, CLAY).and(500, WATER)
                        .spawnCrafter(
                            new Crafter("Brik oven")
                            .thatCraft(10, BRICK)
                            .in(20).seconds()
                            .atCostOf(5000, WOOD).and(3000, CLAY)
                        )
                ).appendTrigger(
                    new Trigger("charcoal craf")
                        .whenReached(20, BRICK)
                        .spawnResource(1, LEVEL) // level 5
                ),
        ),
];

