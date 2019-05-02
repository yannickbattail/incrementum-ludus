/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IQuantity.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
/// <reference path="../Engine/Engine.ts" />

/// <reference path="../Engine/implementations/RandomResource.ts" />
/// <reference path="../Engine/implementations/RandomRangeQuantity.ts" />
/// <reference path="../Engine/implementations/NamedStepResource.ts" />
/// <reference path="./Material.ts" />
/// <reference path="./Item.ts" />
/// <reference path="./Level.ts" />

const LEVEL = new NamedStepResource("level", "level.svg", [
    "NOTHING",
    "Moldus",
    "Sympatisant",
    "Impétrent",
    "Néo",
    "Parrainé",
    "Baptisable",
    "Faluchard"
]);
const TEMPS = new Item("temps", "time.png");
const PINS_FILIERE = new Item("pin's filière", "pins_gris.png");
const PINS_VILLE = new Item("pin's ville", "pins.png");
const PARRAIN = new Item("parrain", "food.svg");
const CODE_VILLE = new Item("code de ville", "etoile_or.png");
const FALUCHE = new Item("faluche", "faluche.png");


class Scenario {
    public static initEngine() : Engine {
        let Q = (quantity : number, res : IResource) => new Quantity(quantity, res);

        var engine = new Engine();
        engine.player = new Player("Chuck Noland");
        // inital storage
        engine.player.increaseStorage(Q(1, LEVEL));
        engine.producers = [
            // inital producers
            new Producer("Temps / jours")
                .thatProduce(Q(10, TEMPS))
                .every(30).seconds(),
        ];
        engine.crafters = [
            // inital Crafters
            new Crafter("Apéro potes")
                .thatCraft(new RandomRangeQuantity(0, 2, PINS_FILIERE))
                .in(2).seconds()
                .atCostOf(Q(1, TEMPS))
        ];

        engine.triggers = [
            new Trigger("Sympatisant")
                .whenReached(Q(5, PINS_FILIERE))
                .spawnCrafter(
                    new Crafter("Apéro filière")
                        .thatCraft(new RandomRangeQuantity(2, 5, PINS_FILIERE))
                        .in(2).seconds()
                        .atCostOf(Q(1, TEMPS))
                )
                .spawnResource(Q(1, LEVEL)) // level 2
                .appendTrigger(
                    new Trigger("Impétrent")
                        .whenReached(Q(50, PINS_FILIERE))
                        .spawnCrafter(
                            new Crafter("Apéro fal de ville")
                                .thatCraft(new RandomRangeQuantity(1, 3, PINS_VILLE))
                                .in(3).seconds()
                                .atCostOf(Q(2, TEMPS))
                        )
                        .spawnResource(Q(1, LEVEL)) // level 3
                    .appendTrigger(
                        new Trigger("Néo")
                            .whenReached(Q(20, PINS_VILLE))
                            .spawnCrafter(
                                new Crafter("Apéro fal hebdomadaire")
                                    .thatCraft(Q(3, PINS_VILLE))
                                    .in(3).seconds()
                                    .atCostOf(Q(2, TEMPS))
                                    .canBeSwitchedToAuto()
                            )
                            .spawnCrafter(
                                new Crafter("Trouver des parrains marraines")
                                    .thatCraft(Q(1, PARRAIN))
                                    .in(20).seconds()
                                    .atCostOf(Q(30, PINS_VILLE)).and(Q(30, PINS_FILIERE))
                            )
                            .spawnResource(Q(1, LEVEL)) // level 4
                            .appendTrigger(
                                new Trigger("Parrainé")
                                    .whenReached(Q(2, PARRAIN))
                                    .spawnCrafter(
                                        new Crafter("Apprentissage du code")
                                            .thatCraft(Q(1, CODE_VILLE))
                                            .in(30).seconds()
                                            .atCostOf(Q(20, PINS_VILLE))
                                    )
                                    .spawnResource(Q(1, LEVEL)) // level 5
                                    .appendTrigger(
                                        new Trigger("Baptisable")
                                            .whenReached(Q(1, CODE_VILLE))
                                            .spawnCrafter(
                                                new Crafter("Baptême")
                                                    .thatCraft(Q(1, FALUCHE))
                                                    .in(30).seconds()
                                                    .atCostOf(Q(1, CODE_VILLE)).and(Q(2, PARRAIN))
                                            )
                                            .spawnResource(Q(1, LEVEL)) // level 6
                                            .appendTrigger(
                                                new Trigger("Faluche")
                                                    .whenReached(Q(1, FALUCHE))
                                                    .spawnResource(Q(1, LEVEL)) // level 7
                                            )
                                    )
                            )
                    )
                )
        ];
        return engine;
    }
}
