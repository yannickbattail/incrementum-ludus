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

const LEVEL = new Level("level", "level");
const CLAY = new Material("clay", "g", "clay");
const WATER = new Material("water", "cl", "water");
const WOOD = new Material("wood", "g", "wood");
const CHARCOAL = new Material("charcoal", "g", "charcoal");
const IRON_ORE = new Material("iron ore", "g", "iron_ore");
const CLAY_POT = new Item("clay pot", "clay_pot");
const BRICK = new Item("brick", "brick");
const TERRACOTTA_POT = new Item("terracotta pot", "terracotta_pot");


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

var triggerLevel5 = new Trigger("pottery")
    .whenReached(20, BRICK)
    .spawnResource(1, LEVEL) // level 5
    .spawnCrafter(
        new Crafter("pottery oven")
            .thatCraft(1, TERRACOTTA_POT)
            .in(20).seconds()
            .atCostOf(800, WOOD).and(500, CLAY)
    )
    .appendTrigger(
        new Trigger("clay digging")
            .whenReached(2, TERRACOTTA_POT)
            .spawnResource(-2, TERRACOTTA_POT)
            .spawnResource(1, LEVEL) // level 6
            .spawnProducer(new TimedProducer("dig clay").thatProduce(500, CLAY).every(5).seconds())
            .appendTrigger(
                new Trigger("water canal digging")
                    .whenReached(30, BRICK).and(6, LEVEL)
                    .spawnProducer(new TimedProducer("water canal").thatProduce(500, WATER).every(5).seconds())
                    .spawnCrafter(
                        new Crafter("plant tree")
                            .thatCraft(10000, WOOD)
                            .in(1).minutes()
                            .atCostOf(4000, WATER)
                    )
                    .appendTrigger(
                        new Trigger("mining iron-ore choping")
                            .whenReached(4000, WATER)
                            .spawnProducer(new TimedProducer("mine iron-ore").thatProduce(5, IRON_ORE).every(10).seconds())
                    )
                    .appendTrigger(
                        new Trigger("mining iron-ore choping")
                            .whenReached(10, IRON_ORE)
                            .spawnResource(1, LEVEL) // level 7
                    )
            )
    );


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
                    new Trigger("charcoal level")
                        .whenReached(1000, CHARCOAL)
                        .spawnResource(1, LEVEL) // level 4
                ).appendTrigger(
                    new Trigger("brick crafting")
                        .whenReached(3000, CHARCOAL).and(5000, WOOD).and(3000, CLAY).and(500, WATER)
                        .spawnCrafter(
                            new Crafter("Brik oven")
                            .thatCraft(10, BRICK)
                            .in(20).seconds()
                            .atCostOf(3000, WOOD).and(1000, CLAY)
                        )
                        .appendTrigger(triggerLevel5),
                ),
        ),
];
