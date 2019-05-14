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
const HEURE = new Material("heure", "h", "clockwork.svg");
const NAIN = new Item("nain", "dwarf-face.svg");
const TUNNEL = new Material("tunnel", "m", "gold-mine.svg");
const PIOCHE_CASSÉE = new Item("pioche cassée", "war-pick.svg");
const DÉSORGANISATION = new Item("désorganisation", "uprising.svg");
const BIÈRE_BUE = new Material("bière bue", "cl", "empty-beer.svg");
const CHOPPE_SALE = new Item("choppe sale", "dirty-beer.svg");
const OBSCURITÉ = new Item("Obscurité", "night-sky.svg");
const BLESSURE = new Item("blessure", "cut-palm.svg");

let Q = (quantity : number, res : IResource) => new Quantity(quantity, res);

class Scenario {
    public static initEngine() : Engine {

        var engine = new Engine();
        engine.player = new Player("gurdil");
        engine.player.setPreventNegativeStorage(true);
        // inital storage
        engine.player.increaseStorage(Q(1, LEVEL));
        engine.player.increaseStorage(Q(1, HEURE));
        engine.player.increaseStorage(Q(1, TUNNEL));
        engine.player.increaseStorage(Q(1, PIOCHE_CASSÉE));
        engine.player.increaseStorage(Q(1, DÉSORGANISATION));
        engine.player.increaseStorage(Q(1, BIÈRE_BUE));
        engine.player.increaseStorage(Q(1, CHOPPE_SALE));
        engine.player.increaseStorage(Q(1, OBSCURITÉ));
        engine.player.increaseStorage(Q(1, BLESSURE));
        engine.producers = [
            // inital producers
            new Producer("1 heure se passe")
                .thatProduce(Q(1, HEURE))
                .every(20).seconds(),
            new Producer("nains")
                .thatProduce(Q(1, NAIN))
                .every(10).seconds()
        ];
        let baseTime = 3;
        engine.crafters = [
            // inital Crafters
            new Crafter("Creuse")
                .thatCraft(Q(1, TUNNEL)).andCraft(Q(1, NAIN))
                .andCraft(Q(1, PIOCHE_CASSÉE))
                .andCraft(Q(1, DÉSORGANISATION))
                .andCraft(Q(1, BIÈRE_BUE))
                .andCraft(Q(1, CHOPPE_SALE))
                .andCraft(Q(1, OBSCURITÉ))
                .andCraft(Q(1, BLESSURE))
                .in(baseTime).seconds()
                .atCostOf(Q(1, NAIN)),
            new Crafter("Ravitaillement")
                .thatCraft(Q(-6, BIÈRE_BUE)).andCraft(Q(1, NAIN))
                .andCraft(Q(1, DÉSORGANISATION))
                .andCraft(Q(2, CHOPPE_SALE))
                .andCraft(Q(1, OBSCURITÉ))
                .in(baseTime).seconds()
                .atCostOf(Q(1, NAIN)),
            new Crafter("Surveillance")
                .thatCraft(Q(-8, DÉSORGANISATION)).andCraft(Q(1, NAIN))
                .andCraft(Q(1, BIÈRE_BUE))
                .andCraft(Q(1, CHOPPE_SALE))
                .andCraft(Q(1, OBSCURITÉ))
                .in(baseTime).seconds()
                .atCostOf(Q(1, NAIN)),
            new Crafter("Réparation")
                .thatCraft(Q(-2, PIOCHE_CASSÉE)).andCraft(Q(1, NAIN))
                .andCraft(Q(1, DÉSORGANISATION))
                .andCraft(Q(1, BIÈRE_BUE))
                .andCraft(Q(1, CHOPPE_SALE))
                .andCraft(Q(1, OBSCURITÉ))
                .in(baseTime).seconds()
                .atCostOf(Q(1, NAIN)),
            new Crafter("Entretien")
                .thatCraft(Q(-2, PIOCHE_CASSÉE)).andCraft(Q(1, NAIN))
                .andCraft(Q(1, DÉSORGANISATION))
                .andCraft(Q(1, BIÈRE_BUE))
                .andCraft(Q(1, CHOPPE_SALE))
                .andCraft(Q(1, OBSCURITÉ))
                .in(baseTime).seconds()
                .atCostOf(Q(1, NAIN)),
            new Crafter("Vaisselle")
                .thatCraft(Q(-8, CHOPPE_SALE)).andCraft(Q(1, NAIN))
                .andCraft(Q(1, DÉSORGANISATION))
                .andCraft(Q(1, BIÈRE_BUE))
                .andCraft(Q(1, OBSCURITÉ))
                .in(baseTime).seconds()
                .atCostOf(Q(1, NAIN)),
            new Crafter("Éclairage")
                .thatCraft(Q(-8, OBSCURITÉ)).andCraft(Q(1, NAIN))
                .andCraft(Q(1, DÉSORGANISATION))
                .andCraft(Q(1, BIÈRE_BUE))
                .andCraft(Q(1, CHOPPE_SALE))
                .in(baseTime).seconds()
                .atCostOf(Q(1, NAIN)),
            new Crafter("Soigner")
                .thatCraft(Q(-8, BLESSURE)).andCraft(Q(1, NAIN))
                .andCraft(Q(1, DÉSORGANISATION))
                .andCraft(Q(1, BIÈRE_BUE))
                .andCraft(Q(1, CHOPPE_SALE))
                .in(baseTime).seconds()
                .atCostOf(Q(1, NAIN)),
        ];

        engine.triggers = [
            new Trigger("[GAGNÉ!] Tunnel fini")
                .whenReached(Q(28, TUNNEL)),
            new Trigger("[perdu] Tunnel fini")
                .whenReached(Q(48, HEURE))
                .spawnResource(Q(-100, NAIN))
                .execFunction("Gui.youDie();"),
            new Trigger("[perdu] Toutes les pioches sont cassées")
                .whenReached(Q(10, PIOCHE_CASSÉE))
                .spawnResource(Q(-100, NAIN))
                .execFunction("Gui.youDie();"),
            new Trigger("[perdu] Complétement désorganisé")
                .whenReached(Q(10, DÉSORGANISATION))
                .spawnResource(Q(-100, NAIN))
                .execFunction("Gui.youDie();"),
            new Trigger("[perdu] Plus de bières")
                .whenReached(Q(10, BIÈRE_BUE))
                .spawnResource(Q(-100, NAIN))
                .execFunction("Gui.youDie();"),
            new Trigger("[perdu] Plus de choppe propre")
                .whenReached(Q(10, CHOPPE_SALE))
                .spawnResource(Q(-100, NAIN))
                .execFunction("Gui.youDie();"),
            new Trigger("[perdu] Plus de lumière")
                .whenReached(Q(10, OBSCURITÉ))
                .spawnResource(Q(-100, NAIN))
                .execFunction("Gui.youDie();"),
            new Trigger("[perdu] Trop de blessés")
                .whenReached(Q(10, BLESSURE))
                .spawnResource(Q(-100, NAIN))
                .execFunction("Gui.youDie();")
        ];
        return engine;
    }
}
