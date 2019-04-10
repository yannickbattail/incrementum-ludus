var Scenario = (function () {
    function Scenario() {
    }
    Scenario.initEngine = function () {
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
        var triggerLevel7 = new Trigger("iron age")
            .whenReached(100, IRON_ORE).and(40, BRICK).and(400, CHARCOAL)
            .spawnResource(-40, BRICK)
            .spawnResource(1, EMPTY_TRASH)
            .spawnCrafter(new Crafter("iron smelter")
            .thatCraft(10, IRON)["in"](1).minutes()
            .atCostOf(50, IRON_ORE).and(400, CHARCOAL).and(1, EMPTY_TRASH))
            .appendTrigger(new Trigger("waste managment")
            .whenReached(10, IRON).and(7, LEVEL)
            .spawnResource(1, LEVEL)
            .spawnResource(3, EMPTY_TRASH)
            .spawnCrafter(new Crafter("waste recycling")
            .thatCraft(1, EMPTY_TRASH)["in"](1).minutes()
            .atCostOf(1, TERRACOTTA_POT).and(100, WATER))
            .appendTrigger(new Trigger("tools forging")
            .whenReached(40, IRON).and(100, BRICK).and(8, LEVEL)
            .spawnResource(-100, BRICK)
            .spawnCrafter(new Crafter("forge knife")
            .thatCraft(1, KNIFE)["in"](4).minutes()
            .atCostOf(50, IRON).and(1000, WATER).and(1000, WOOD).and(500, CLAY).and(1000, CHARCOAL).and(2, EMPTY_TRASH))
            .spawnCrafter(new Crafter("forge axe")
            .thatCraft(1, AXE)["in"](4).minutes()
            .atCostOf(100, IRON).and(1000, WATER).and(2000, WOOD).and(1000, CLAY).and(2000, CHARCOAL).and(3, EMPTY_TRASH))
            .appendTrigger(new Trigger("viking age")
            .whenReached(1, AXE)
            .spawnResource(1, LEVEL))));
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
            .spawnProducer(new TimedProducer("mine iron-ore").thatProduce(10, IRON_ORE).every(10).seconds()))
            .appendTrigger(new Trigger("iron-ore mining")
            .whenReached(10, IRON_ORE)
            .spawnResource(1, LEVEL)
            .appendTrigger(triggerLevel7))));
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
                .spawnResource(-1, CLAY_POT)
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
        return engine;
    };
    return Scenario;
}());
//# sourceMappingURL=Scenario.js.map