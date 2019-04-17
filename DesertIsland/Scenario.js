var Scenario = (function () {
    function Scenario() {
    }
    Scenario.initEngine = function () {
        var Q = function (quantity, res) { return new Quantity(quantity, res); };
        var engine = new Engine();
        engine.Player = new Player("Chuck Noland");
        engine.Player.increaseStorage(Q(1, LEVEL));
        engine.Player.increaseStorage(Q(0, WATER));
        engine.Player.increaseStorage(Q(0, CLAY));
        engine.Player.increaseStorage(Q(0, COPPER_ORE));
        engine.Producers = [
            new Producer("take water")
                .thatProduce(Q(10, WATER))
                .andProduce(new RandomResource(1, COPPER_ORE, 0.02)).manualy(),
            new Producer("bare hands dig clay").thatProduce(Q(10, CLAY)).manualy()
        ];
        engine.Crafters = [
            new Crafter("craft clay pot")
                .thatCraft(Q(1, CLAY_POT))["in"](10).seconds()
                .atCostOf(Q(100, CLAY)).and(Q(10, WATER))
        ];
        var triggerLevel7 = new Trigger("iron age")
            .whenReached(Q(100, IRON_ORE)).and(Q(40, BRICK)).and(Q(400, CHARCOAL))
            .spawnResource(Q(-40, BRICK))
            .spawnResource(Q(1, EMPTY_TRASH))
            .spawnResource(Q(0, FULL_TRASH))
            .spawnCrafter(new Crafter("iron smelter")
            .thatCraft(Q(10, IRON)).thatCraft(Q(1, FULL_TRASH))["in"](1).minutes()
            .atCostOf(Q(50, IRON_ORE)).and(Q(400, CHARCOAL)).and(Q(1, EMPTY_TRASH)))
            .appendTrigger(new Trigger("waste managment")
            .whenReached(Q(10, IRON)).and(Q(7, LEVEL))
            .spawnResource(Q(1, LEVEL))
            .spawnResource(Q(1, EMPTY_TRASH))
            .spawnCrafter(new Crafter("waste recycling")
            .thatCraft(Q(1, EMPTY_TRASH))["in"](40).seconds()
            .atCostOf(Q(1, TERRACOTTA_POT)).and(Q(100, WATER)).and(Q(1, FULL_TRASH)))
            .appendTrigger(new Trigger("tools forging")
            .whenReached(Q(40, IRON)).and(Q(100, BRICK)).and(Q(8, LEVEL))
            .spawnResource(Q(-100, BRICK))
            .spawnCrafter(new Crafter("forge knife")
            .thatCraft(Q(1, KNIFE)).thatCraft(Q(2, FULL_TRASH))["in"](4).minutes()
            .atCostOf(Q(50, IRON))
            .and(Q(1000, WATER))
            .and(Q(1000, WOOD))
            .and(Q(500, CLAY))
            .and(Q(1000, CHARCOAL))
            .and(Q(2, EMPTY_TRASH)))
            .spawnCrafter(new Crafter("forge axe")
            .thatCraft(Q(1, AXE)).thatCraft(Q(3, FULL_TRASH))["in"](4).minutes()
            .atCostOf(Q(100, IRON))
            .atCostOf(Q(3, COPPER_ORE))
            .and(Q(1000, WATER))
            .and(Q(2000, WOOD))
            .and(Q(1000, CLAY))
            .and(Q(2000, CHARCOAL))
            .and(Q(3, EMPTY_TRASH)))
            .appendTrigger(new Trigger("craft with knife")
            .whenReached(Q(1, KNIFE))
            .spawnResource(Q(1, EMPTY_TRASH)))
            .appendTrigger(new Trigger("viking age")
            .whenReached(Q(1, AXE))
            .spawnResource(Q(1, LEVEL)))));
        var triggerLevel5 = new Trigger("pottery")
            .whenReached(Q(20, BRICK))
            .spawnResource(Q(1, LEVEL))
            .spawnCrafter(new Crafter("pottery oven")
            .thatCraft(Q(1, TERRACOTTA_POT))["in"](20).seconds()
            .atCostOf(Q(800, WOOD)).and(Q(1, CLAY_POT)))
            .appendTrigger(new Trigger("clay digging")
            .whenReached(Q(2, TERRACOTTA_POT))
            .spawnResource(Q(-2, TERRACOTTA_POT))
            .spawnResource(Q(1, LEVEL))
            .spawnProducer(new Producer("dig clay").thatProduce(Q(500, CLAY)).every(5).seconds())
            .appendTrigger(new Trigger("water canal digging")
            .whenReached(Q(30, BRICK)).and(Q(6, LEVEL))
            .spawnProducer(new Producer("water canal").thatProduce(Q(100, WATER)).every(1).seconds())
            .spawnCrafter(new Crafter("plant tree")
            .thatCraft(Q(10000, WOOD))["in"](1).minutes()
            .atCostOf(Q(4000, WATER)))
            .appendTrigger(new Trigger("wood choping")
            .whenReached(Q(4000, WATER))
            .spawnProducer(new Producer("mine iron-ore").thatProduce(Q(10, IRON_ORE)).every(10).seconds()))
            .appendTrigger(new Trigger("iron-ore mining")
            .whenReached(Q(10, IRON_ORE))
            .spawnResource(Q(1, LEVEL))
            .appendTrigger(triggerLevel7))));
        engine.Triggers = [
            new Trigger("carry water in clay pot")
                .whenReached(Q(1, CLAY_POT))
                .spawnProducer(new Producer("carry water").thatProduce(new RandomRangeQuantity(60, 110, WATER)).manualy())
                .spawnResource(Q(1, LEVEL))
                .spawnResource(Q(-1, CLAY_POT)),
            new Trigger("carry clay in clay pot")
                .whenReached(Q(1, CLAY_POT)).and(Q(2, LEVEL))
                .spawnProducer(new Producer("carry clay").thatProduce(Q(100, CLAY)).manualy())
                .spawnProducer(new Producer("collect branches").thatProduce(Q(100, WOOD)).manualy())
                .spawnResource(Q(-1, CLAY_POT))
                .spawnResource(Q(1, LEVEL))
                .appendTrigger(new Trigger("charcoal crafting")
                .whenReached(Q(200, WOOD))
                .spawnCrafter(new Crafter("craft charcoal")
                .thatCraft(Q(200, CHARCOAL))["in"](20).seconds()
                .atCostOf(Q(600, WOOD)).and(Q(200, CLAY))).appendTrigger(new Trigger("charcoal level")
                .whenReached(Q(200, CHARCOAL))
                .spawnResource(Q(1, LEVEL))).appendTrigger(new Trigger("brick crafting")
                .whenReached(Q(400, CHARCOAL)).and(Q(500, WOOD)).and(Q(300, CLAY)).and(Q(200, WATER))
                .spawnCrafter(new Crafter("Brik oven")
                .thatCraft(Q(10, BRICK))["in"](20).seconds()
                .atCostOf(Q(500, WOOD)).and(Q(200, CLAY)))
                .appendTrigger(triggerLevel5))),
        ];
        return engine;
    };
    return Scenario;
}());
//# sourceMappingURL=Scenario.js.map