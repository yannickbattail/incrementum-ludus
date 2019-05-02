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
const TEMPS = new Item("temps", "temps");
const PINS_FILIERE = new Item("pin's filière", "pins");
const PINS_VILLE = new Item("pin's ville", "pins");

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
                )
        ];
        return engine;
    }
}
