var LEVEL = new Level("level", "level");
var CLAY = new Material("clay", "g", "clay");
var WATER = new Material("water", "cl", "water");
var WOOD = new Material("wood", "g", "wood");
var CHARCOAL = new Material("charcoal", "g", "charcoal");
var IRON_ORE = new Material("iron ore", "g", "iron_ore");
var CLAY_POT = new Item("clay pot", "clay_pot");
var BRICK = new Item("brick", "brick");
var TERRACOTTA_POT = new Item("terracotta pot", "terracotta_pot");
var engine = new Engine();
engine.Player = new Player("Chuck Noland");
engine.Player.Storage = [new ResourceQuantity(LEVEL, 1)];
engine.Producers = [
    new ManualProducer("take water").thatProduce(10, WATER),
    new ManualProducer("bare hands dig clay").thatProduce(10, CLAY)
];
engine.Crafters = [
    new Crafter("craft clay pot")
        .thatCraft(1, CLAY_POT)["in"](10).seconds()
        .atCostOf(100, CLAY).and(10, WATER)
];
var triggerLevel5 = new Trigger("pottery")
    .whenReached(20, BRICK)
    .spawnResource(1, LEVEL)
    .spawnCrafter(new Crafter("pottery oven")
    .thatCraft(1, TERRACOTTA_POT)["in"](20).seconds()
    .atCostOf(800, WOOD).and(1, CLAY_POT))
    .appendTrigger(new Trigger("clay digging")
    .whenReached(2, TERRACOTTA_POT)
    .spawnResource(-2, TERRACOTTA_POT)
    .spawnResource(1, LEVEL)
    .spawnProducer(new TimedProducer("dig clay").thatProduce(500, CLAY).every(5).seconds())
    .appendTrigger(new Trigger("water canal digging")
    .whenReached(30, BRICK).and(6, LEVEL)
    .spawnProducer(new TimedProducer("water canal").thatProduce(100, WATER).every(1).seconds())
    .spawnCrafter(new Crafter("plant tree")
    .thatCraft(10000, WOOD)["in"](1).minutes()
    .atCostOf(4000, WATER))
    .appendTrigger(new Trigger("wood choping")
    .whenReached(4000, WATER)
    .spawnProducer(new TimedProducer("mine iron-ore").thatProduce(5, IRON_ORE).every(10).seconds()))
    .appendTrigger(new Trigger("iron-ore mining")
    .whenReached(10, IRON_ORE)
    .spawnResource(1, LEVEL))));
engine.Triggers = [
    new Trigger("carry water in clay pot")
        .whenReached(1, CLAY_POT)
        .spawnProducer(new ManualProducer("carry water").thatProduce(100, WATER))
        .spawnResource(1, LEVEL)
        .spawnResource(-1, CLAY_POT),
    new Trigger("carry clay in clay pot")
        .whenReached(1, CLAY_POT).and(2, LEVEL)
        .spawnProducer(new ManualProducer("carry clay").thatProduce(100, CLAY))
        .spawnProducer(new ManualProducer("collect branches").thatProduce(100, WOOD))
        .spawnResource(1, LEVEL)
        .appendTrigger(new Trigger("charcoal crafting")
        .whenReached(200, WOOD)
        .spawnCrafter(new Crafter("craft charcoal")
        .thatCraft(200, CHARCOAL)["in"](20).seconds()
        .atCostOf(600, WOOD).and(200, CLAY)).appendTrigger(new Trigger("charcoal level")
        .whenReached(200, CHARCOAL)
        .spawnResource(1, LEVEL)).appendTrigger(new Trigger("brick crafting")
        .whenReached(400, CHARCOAL).and(500, WOOD).and(300, CLAY).and(200, WATER)
        .spawnCrafter(new Crafter("Brik oven")
        .thatCraft(10, BRICK)["in"](20).seconds()
        .atCostOf(500, WOOD).and(200, CLAY))
        .appendTrigger(triggerLevel5))),
];
//# sourceMappingURL=DesertIsland.js.map