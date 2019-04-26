/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IQuantity.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
/// <reference path="../Engine/Engine.ts" />

/// <reference path="../Engine/implementations/RandomResource.ts" />
/// <reference path="../Engine/implementations/RandomRangeQuantity.ts" />
/// <reference path="./Material.ts" />
/// <reference path="./Item.ts" />
/// <reference path="./Level.ts" />

const LEVEL = new Level("level", "level");
const CLAY = new Material("clay", "g", "clay");
const WATER = new Material("salt water", "cl", "water");
const POTABLE_WATER = new Material("potable water", "cl", "water_potable");
const WOOD = new Material("wood", "g", "wood");
const VEGETABLE = new Material("vegetable", "g", "vegetable");
const FOOD = new Material("food", "g", "food");
const CHARCOAL = new Material("charcoal", "g", "charcoal");
const IRON_ORE = new Material("iron ore", "g", "iron_ore");
const IRON = new Material("iron", "g", "iron");
const COPPER_ORE = new Material("copper ore", "g", "copper_ore");
const CLAY_POT = new Item("clay pot", "clay_pot");
const BRICK = new Item("brick", "brick");
const TERRACOTTA_POT = new Item("terracotta pot", "terracotta_pot");
const KNIFE = new Item("knife", "knife");
const AXE = new Item("axe", "axe");
const EMPTY_TRASH = new Item("empty trash", "empty_trash");
const FULL_TRASH = new Item("full trash", "full_trash");
const STARVATION_FOOD = new Item("full trash", "skull_grey");
const STARVATION = new Item("full trash", "skull_white");

class Scenario {
    public static initEngine() : Engine {
        let Q = (quantity : number, res : IResource) => new Quantity(quantity, res);

        var engine = new Engine();
        engine.Player = new Player("Chuck Noland");
        // inital storage
        engine.Player.increaseStorage(Q(-1, STARVATION));
        engine.Player.increaseStorage(Q(1, LEVEL));
        engine.Player.increaseStorage(Q(0, WATER));
        engine.Player.increaseStorage(Q(0, POTABLE_WATER));
        engine.Player.increaseStorage(Q(0, CLAY));
        engine.Player.increaseStorage(Q(0, COPPER_ORE));
        engine.Producers = [
            // inital producers
            new Producer("Take water")
                .thatProduce(Q(10, WATER))
                .manualy(),
            new Producer("Bare hands dig clay")
                .thatProduce(Q(10, CLAY))
                .andProduce(new RandomResource(1, COPPER_ORE, 0.02))
                .manualy(),
            new Producer("Starvation")
                .thatProduce(Q(1, STARVATION))
                .every(40).seconds()
        ];
        engine.Crafters = [
            // inital Crafters
            new Crafter("Craft clay pot")
                .thatCraft(Q(1, CLAY_POT))
                .in(10).seconds()
                .atCostOf(Q(100, CLAY)).and(Q(10, WATER))
                .canBeSwitchedToAuto()
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
                            .canBeSwitchedToAuto()
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
                                    .atCostOf(Q(3, COPPER_ORE))
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
                    .canBeSwitchedToAuto()
            )
            .spawnCrafter(
                new Crafter("Purify water")
                    .thatCraft(Q(1, POTABLE_WATER)).andCraft(Q(1, TERRACOTTA_POT)).andCraft(new RandomResource(-1, TERRACOTTA_POT, 0.05))
                    .in(20).seconds()
                    .atCostOf(Q(100, WATER)).and(Q(100, WOOD)).and(Q(1, TERRACOTTA_POT))
                    .canBeSwitchedToAuto()
            )
            .appendTrigger(
                new Trigger("clay digging")
                    .whenReached(Q(2, TERRACOTTA_POT))
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
                                    .canBeSwitchedToAuto()
                            )
                            .spawnCrafter(
                                new Crafter("plant vegetables")
                                    .thatCraft(Q(100, VEGETABLE))
                                    .in(1).minutes()
                                    .atCostOf(Q(1000, WATER))
                            )
                            .appendTrigger(
                                new Trigger("wood choping")
                                    .whenReached(Q(4000, WATER))
                                    .spawnProducer(new Producer("mine iron-ore").thatProduce(Q(10, IRON_ORE)).every(10).seconds())
                            )
                            .appendTrigger(
                                new Trigger("Evaporate water with the sun")
                                    .whenReached(Q(5, TERRACOTTA_POT))
                                    .spawnResource(Q(-5, TERRACOTTA_POT))
                                    .spawnCrafter(
                                        new Crafter("Water evaporator")
                                            .thatCraft(Q(1, POTABLE_WATER))
                                            .in(30).seconds()
                                            .atCostOf(Q(100, WATER))
                                            .automaticaly()
                                    )
                            )
                            .appendTrigger(
                                new Trigger("Cooking vegetables")
                                    .whenReached(Q(100, VEGETABLE))
                                    .spawnResource(Q(-5, TERRACOTTA_POT))
                                    .spawnCrafter(
                                        new Crafter("Cook vegetables")
                                            .thatCraft(Q(100, FOOD))
                                            .in(10).seconds()
                                            .atCostOf(Q(200, VEGETABLE)).and(Q(1, POTABLE_WATER))
                                    )
                            )
                            .appendTrigger(
                                new Trigger("iron-ore mining")
                                    .whenReached(Q(10, IRON_ORE))
                                    .spawnResource(Q(1, LEVEL)) // level 7
                                    .appendTrigger(triggerLevel7)
                            )
                    )
            );

        let triggerStarvation = new Trigger("Don't starve or DIE!")
            .whenReached(Q(10, STARVATION))
            .spawnResource(Q(-100, LEVEL))
            .spawnResource(Q(-100000, WATER))
            .spawnResource(Q(-100000, WOOD))
            .spawnResource(Q(-100000, CLAY));

        engine.Triggers = [
            triggerStarvation,
            new Trigger("carry water in clay pot")
                .whenReached(Q(1, CLAY_POT))
                .spawnProducer(new Producer("carry water").thatProduce(new RandomRangeQuantity(60, 110, WATER)).manualy())
                .spawnResource(Q(-1, CLAY_POT))
                .spawnResource(Q(1, LEVEL)) // level 2
            ,
            new Trigger("carry clay in clay pot")
                .whenReached(Q(1, CLAY_POT)).and(Q(2, LEVEL))
                .spawnProducer(new Producer("carry clay").thatProduce(Q(100, CLAY)).manualy())
                .spawnProducer(new Producer("collect branches").thatProduce(Q(100, WOOD)).manualy())
                .spawnCrafter(
                    new Crafter("Boil water")
                        .thatCraft(Q(1, POTABLE_WATER))
                        .in(20).seconds()
                        .atCostOf(Q(100, WATER)).and(Q(100, WOOD)).and(Q(1, CLAY_POT))
                )
                .spawnCrafter(
                    new Crafter("Dring water")
                        .thatCraft(Q(-1, STARVATION))
                        .in(3).seconds()
                        .atCostOf(Q(10, POTABLE_WATER))
                )
                .spawnCrafter(
                    new Crafter("Eat food")
                        .thatCraft(Q(-2, STARVATION))
                        .in(5).seconds()
                        .atCostOf(Q(100, FOOD))
                )
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
                                .canBeSwitchedToAuto()
                        ).appendTrigger(
                            new Trigger("charcoal level")
                                .whenReached(Q(200, CHARCOAL))
                                .spawnResource(Q(1, LEVEL)) // level 4
                        ).appendTrigger(
                            new Trigger("brick crafting")
                                .whenReached(Q(400, CHARCOAL)).and(Q(500, WOOD)).and(Q(300, CLAY)).and(Q(200, WATER))
                                .spawnCrafter(
                                    new Crafter("Brick oven")
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
