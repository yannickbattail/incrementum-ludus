var LEVEL = new Level("level", "level.svg");
var HEURE = new Material("heure", "h", "time.png");
var NAIN = new Item("nain", "dwarf-face.svg");
var TUNNEL = new Material("tunnel", "m", "gold-mine.svg");
var PIOCHE_CASSÉE = new Item("pioche cassée", "war-pick.svg");
var DÉSORGANISATION = new Item("désorganisation", "uprising.svg");
var BIÈRE_BUE = new Material("bière bue", "cl", "empty-beer.svg");
var CHOPPE_SALE = new Item("choppe sale", "dirty-beer.svg");
var OBSCURITÉ = new Item("Obscurité", "night-sky.svg");
var BLESSURE = new Item("blessure", "cut-palm.svg");
var Q = function (quantity, res) { return new Quantity(quantity, res); };
var Scenario = (function () {
    function Scenario() {
    }
    Scenario.initEngine = function () {
        var engine = new Engine();
        engine.player = new Player("gurdil");
        engine.player.setPreventNegativeStorage(true);
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
            new Producer("1 heure se passe")
                .thatProduce(Q(1, HEURE))
                .every(20).seconds(),
            new Producer("nains")
                .thatProduce(Q(1, NAIN))
                .every(10).seconds()
        ];
        var baseTime = 3;
        engine.crafters = [
            new Crafter("Creuse")
                .thatCraft(Q(1, TUNNEL)).andCraft(Q(1, NAIN))
                .andCraft(Q(1, PIOCHE_CASSÉE))
                .andCraft(Q(1, DÉSORGANISATION))
                .andCraft(Q(1, BIÈRE_BUE))
                .andCraft(Q(1, CHOPPE_SALE))
                .andCraft(Q(1, OBSCURITÉ))
                .andCraft(Q(1, BLESSURE))["in"](baseTime).seconds()
                .atCostOf(Q(1, NAIN)),
            new Crafter("Ravitaillement")
                .thatCraft(Q(-6, BIÈRE_BUE)).andCraft(Q(1, NAIN))
                .andCraft(Q(1, DÉSORGANISATION))
                .andCraft(Q(2, CHOPPE_SALE))
                .andCraft(Q(1, OBSCURITÉ))["in"](baseTime).seconds()
                .atCostOf(Q(1, NAIN)),
            new Crafter("Surveillance")
                .thatCraft(Q(-8, DÉSORGANISATION)).andCraft(Q(1, NAIN))
                .andCraft(Q(1, BIÈRE_BUE))
                .andCraft(Q(1, CHOPPE_SALE))
                .andCraft(Q(1, OBSCURITÉ))["in"](baseTime).seconds()
                .atCostOf(Q(1, NAIN)),
            new Crafter("Réparation")
                .thatCraft(Q(-2, PIOCHE_CASSÉE)).andCraft(Q(1, NAIN))
                .andCraft(Q(1, DÉSORGANISATION))
                .andCraft(Q(1, BIÈRE_BUE))
                .andCraft(Q(1, CHOPPE_SALE))
                .andCraft(Q(1, OBSCURITÉ))["in"](baseTime).seconds()
                .atCostOf(Q(1, NAIN)),
            new Crafter("Entretien")
                .thatCraft(Q(-2, PIOCHE_CASSÉE)).andCraft(Q(1, NAIN))
                .andCraft(Q(1, DÉSORGANISATION))
                .andCraft(Q(1, BIÈRE_BUE))
                .andCraft(Q(1, CHOPPE_SALE))
                .andCraft(Q(1, OBSCURITÉ))["in"](baseTime).seconds()
                .atCostOf(Q(1, NAIN)),
            new Crafter("Vaisselle")
                .thatCraft(Q(-8, CHOPPE_SALE)).andCraft(Q(1, NAIN))
                .andCraft(Q(1, DÉSORGANISATION))
                .andCraft(Q(1, BIÈRE_BUE))
                .andCraft(Q(1, OBSCURITÉ))["in"](baseTime).seconds()
                .atCostOf(Q(1, NAIN)),
            new Crafter("Éclairage")
                .thatCraft(Q(-8, OBSCURITÉ)).andCraft(Q(1, NAIN))
                .andCraft(Q(1, DÉSORGANISATION))
                .andCraft(Q(1, BIÈRE_BUE))
                .andCraft(Q(1, CHOPPE_SALE))["in"](baseTime).seconds()
                .atCostOf(Q(1, NAIN)),
            new Crafter("Soigner")
                .thatCraft(Q(-8, BLESSURE)).andCraft(Q(1, NAIN))
                .andCraft(Q(1, DÉSORGANISATION))
                .andCraft(Q(1, BIÈRE_BUE))
                .andCraft(Q(1, CHOPPE_SALE))["in"](baseTime).seconds()
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
    };
    return Scenario;
}());
//# sourceMappingURL=Scenario.js.map