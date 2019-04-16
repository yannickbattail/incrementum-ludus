/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IQuantity.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
/// <reference path="../Engine/Engine.ts" />

/// <reference path="./Material.ts" />
/// <reference path="./Item.ts" />
/// <reference path="./Level.ts" />


class Scenario {
    public static initEngine() : Engine {
        let Q = (quantity : number, res : IResource) => new Quantity(quantity, res);

        var engine = new Engine();
        engine.Player = new Player("Chuck Noland");
        // inital storage
        engine.Player.increaseStorage(Q(1, LEVEL));
        engine.Producers = [
            // inital producers
            new Producer("take water").thatProduce(Q(10, WATER)).manualy(),
            new Producer("bare hands dig clay").thatProduce(Q(10, CLAY)).manualy()
        ];
        engine.Crafters = [
            // inital Crafters
            new Crafter("craft clay pot")
                .thatCraft(Q(1, CLAY_POT))
                .in(10).seconds()
                .atCostOf(Q(100, CLAY)).and(Q(10, WATER))
        ];


        let triggerLevel7 = new Trigger("iron age")
            .whenReached(Q(100, IRON_ORE)).and(Q(40, BRICK)).and(Q(400, CHARCOAL))
            .spawnResource(Q(-40, BRICK))
            .spawnResource(Q(1, EMPTY_TRASH))
            .spawnResource(Q(0, FULL_TRASH))
            .spawnCrafter(
                new Crafter("iron smelter")
                    .thatCraft(Q(10, IRON)).thatCraft(Q(1, FULL_TRASH))
                    .in(1).minutes()
                    .atCostOf(Q(50, IRON_ORE)).and(Q(400, CHARCOAL)).and(Q(1, EMPTY_TRASH))
            )
            .appendTrigger(
                new Trigger("waste managment")
                    .whenReached(Q(10, IRON)).and(Q(7, LEVEL))
                    .spawnResource(Q(1, LEVEL)) // level 8
                    .spawnResource(Q(1, EMPTY_TRASH))
                    .spawnCrafter(
                        new Crafter("waste recycling")
                            .thatCraft(Q(1, EMPTY_TRASH))
                            .in(40).seconds()
                            .atCostOf(Q(1, TERRACOTTA_POT)).and(Q(100, WATER)).and(Q(1, FULL_TRASH))
                    )
                    .appendTrigger(
                        new Trigger("tools forging")
                            .whenReached(Q(40, IRON)).and(Q(100, BRICK)).and(Q(8, LEVEL))
                            .spawnResource(Q(-100, BRICK))
                            .spawnCrafter(
                                new Crafter("forge knife")
                                    .thatCraft(Q(1, KNIFE)).thatCraft(Q(2, FULL_TRASH))
                                    .in(4).minutes()
                                    .atCostOf(Q(50, IRON))
                                    .and(Q(1000, WATER))
                                    .and(Q(1000, WOOD))
                                    .and(Q(500, CLAY))
                                    .and(Q(1000, CHARCOAL))
                                    .and(Q(2, EMPTY_TRASH))
                            )
                            .spawnCrafter(
                                new Crafter("forge axe")
                                    .thatCraft(Q(1, AXE)).thatCraft(Q(3, FULL_TRASH))
                                    .in(4).minutes()
                                    .atCostOf(Q(100, IRON))
                                    .and(Q(1000, WATER))
                                    .and(Q(2000, WOOD))
                                    .and(Q(1000, CLAY))
                                    .and(Q(2000, CHARCOAL))
                                    .and(Q(3, EMPTY_TRASH))
                            )
                            .appendTrigger(
                                new Trigger("craft with knife")
                                    .whenReached(Q(1, KNIFE))
                                    .spawnResource(Q(1, EMPTY_TRASH))
                            )
                            .appendTrigger(
                                new Trigger("viking age")
                                    .whenReached(Q(1, AXE))
                                    .spawnResource(Q(1, LEVEL)) // level 9
                            )
                    )
            );

        let triggerLevel5 = new Trigger("pottery")
            .whenReached(Q(20, BRICK))
            .spawnResource(Q(1, LEVEL)) // level 5
            .spawnCrafter(
                new Crafter("pottery oven")
                    .thatCraft(Q(1, TERRACOTTA_POT))
                    .in(20).seconds()
                    .atCostOf(Q(800, WOOD)).and(Q(1, CLAY_POT))
            )
            .appendTrigger(
                new Trigger("clay digging")
                    .whenReached(Q(2, TERRACOTTA_POT))
                    .spawnResource(Q(-2, TERRACOTTA_POT))
                    .spawnResource(Q(1, LEVEL)) // level 6
                    .spawnProducer(new Producer("dig clay").thatProduce(Q(500, CLAY)).every(5).seconds())
                    .appendTrigger(
                        new Trigger("water canal digging")
                            .whenReached(Q(30, BRICK)).and(Q(6, LEVEL))
                            .spawnProducer(new Producer("water canal").thatProduce(Q(100, WATER)).every(1).seconds())
                            .spawnCrafter(
                                new Crafter("plant tree")
                                    .thatCraft(Q(10000, WOOD))
                                    .in(1).minutes()
                                    .atCostOf(Q(4000, WATER))
                            )
                            .appendTrigger(
                                new Trigger("wood choping")
                                    .whenReached(Q(4000, WATER))
                                    .spawnProducer(new Producer("mine iron-ore").thatProduce(Q(10, IRON_ORE)).every(10).seconds())
                            )
                            .appendTrigger(
                                new Trigger("iron-ore mining")
                                    .whenReached(Q(10, IRON_ORE))
                                    .spawnResource(Q(1, LEVEL)) // level 7
                                    .appendTrigger(triggerLevel7)
                            )
                    )
            );


        engine.Triggers = [
            new Trigger("carry water in clay pot")
                .whenReached(Q(1, CLAY_POT))
                .spawnProducer(new Producer("carry water").thatProduce(Q(100, WATER)).manualy())
                .spawnResource(Q(1, LEVEL)) // level 2
                .spawnResource(Q(-1, CLAY_POT))
            ,
            new Trigger("carry clay in clay pot")
                .whenReached(Q(1, CLAY_POT)).and(Q(2, LEVEL))
                .spawnProducer(new Producer("carry clay").thatProduce(Q(100, CLAY)).manualy())
                .spawnProducer(new Producer("collect branches").thatProduce(Q(100, WOOD)).manualy())
                .spawnResource(Q(-1, CLAY_POT))
                .spawnResource(Q(1, LEVEL)) // level 3
                .appendTrigger(
                    new Trigger("charcoal crafting")
                        .whenReached(Q(200, WOOD))
                        .spawnCrafter(
                            new Crafter("craft charcoal")
                            .thatCraft(Q(200, CHARCOAL))
                            .in(20).seconds()
                            .atCostOf(Q(600, WOOD)).and(Q(200, CLAY))
                        ).appendTrigger(
                            new Trigger("charcoal level")
                                .whenReached(Q(200, CHARCOAL))
                                .spawnResource(Q(1, LEVEL)) // level 4
                        ).appendTrigger(
                            new Trigger("brick crafting")
                                .whenReached(Q(400, CHARCOAL)).and(Q(500, WOOD)).and(Q(300, CLAY)).and(Q(200, WATER))
                                .spawnCrafter(
                                    new Crafter("Brik oven")
                                    .thatCraft(Q(10, BRICK))
                                    .in(20).seconds()
                                    .atCostOf(Q(500, WOOD)).and(Q(200, CLAY))
                                )
                                .appendTrigger(triggerLevel5),
                        ),
                ),
        ];
        return engine;
    }
}
