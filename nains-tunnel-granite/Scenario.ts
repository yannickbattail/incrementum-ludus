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
/// <reference path="./Item.ts" />
/// <reference path="./Material.ts" />
/// <reference path="./Level.ts" />

const LEVEL = new Level("level", "level.svg");
const HEURE = new Material("heure", "h", "heure");
const NAIN = new Item("nain", "nain");
const TUNNEL = new Material("tunnel", "m", "tunnel");
const PIOCHE = new Item("pioche", "pioche");
const ORGANISATION = new Item("organisation", "organisation");
const BIERE = new Material("biere", "cl", "biere");
const CHOPPE = new Item("choppe", "choppe");
const LUMIERE = new Item("lumière", "lumière");
const SOIN = new Item("soin", "soin");

let Q = (quantity : number, res : IResource) => new Quantity(quantity, res);

class Scenario {
    public static initEngine() : Engine {

        var engine = new Engine();
        engine.player = new Player("gurdil");
        // inital storage
        engine.player.increaseStorage(Q(1, NAIN));
        engine.producers = [
            // inital producers
            new Producer("Temps / jours")
                .thatProduce(Q(10, NAIN))
                .every(30).seconds()
        ];
        engine.crafters = [
            // inital Crafters
            new Crafter("Apéro potes")
                .thatCraft(Q(1, TUNNEL))
                .in(2).seconds()
                .atCostOf(Q(1, NAIN))
        ];

        engine.triggers = [
            new Trigger("Sympatisant")
                .whenReached(Q(5, NAIN))
                .spawnCrafter(
                    new Crafter("Apéro ingé")
                        .thatCraft(Q(5, BIERE))
                        .in(2).seconds()
                        .atCostOf(Q(1, NAIN))
                )
        ];
        return engine;
    }
}
