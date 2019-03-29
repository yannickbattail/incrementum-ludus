var LEVEL = new Level("Level", "level");
var CLAY = new Material("clay", "g", "clay");
var WATER = new Material("water", "cl", "water");
var WOOD = new Material("wood", "g", "wood");
var CHARCOAL = new Material("charcoal", "g", "CHARCOAL");
var CLAY_POT = new Item("clay pot", "clay_pot");
var engine = new Engine();
engine.Player = new Player("Chuck Noland");
engine.Player.Storage = [new ResourceQuantity(LEVEL, 1)];
engine.Producers = [
    new ManualProducer("take water", new ResourceQuantity(WATER, 10)),
    new ManualProducer("bare hands dig clay", new ResourceQuantity(CLAY, 10))
];
engine.Triggers = [
    new Trigger("carry water in clay pot", [new ResourceQuantity(CLAY_POT, 1)], [new ManualProducer("carry water", new ResourceQuantity(WATER, 100))], [new ResourceQuantity(LEVEL, 1), new ResourceQuantity(CLAY_POT, -1)]),
    new Trigger("carry clay in clay pot", [new ResourceQuantity(CLAY_POT, 1), new ResourceQuantity(LEVEL, 2)], [new ManualProducer("carry clay", new ResourceQuantity(CLAY, 100)),
        new ManualProducer("collect branches", new ResourceQuantity(WOOD, 100))], [new ResourceQuantity(LEVEL, 1)], [], [new Trigger("charcoal crafting", [new ResourceQuantity(WOOD, 200)], [], [], [new Crafter("craft charcoal", 20000, [new ResourceQuantity(WOOD, 3000), new ResourceQuantity(CLAY, 1000)], new ResourceQuantity(CHARCOAL, 1000), false)]),
    ]),
];
engine.Crafters = [
    new Crafter("craft clay pot", 20000, [new ResourceQuantity(CLAY, 100), new ResourceQuantity(WATER, 10)], new ResourceQuantity(CLAY_POT, 1), false)
];
//# sourceMappingURL=DesertIsland.js.map