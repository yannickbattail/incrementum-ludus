var LEVEL = new Level("level", "level.svg");
var HEURE = new Material("heure", "h", "heure");
var NAIN = new Item("nain", "nain");
var TUNNEL = new Material("tunnel", "m", "tunnel");
var PIOCHE = new Item("pioche", "pioche");
var ORGANISATION = new Item("organisation", "organisation");
var BIERE = new Material("biere", "cl", "biere");
var CHOPPE = new Item("choppe", "choppe");
var LUMIERE = new Item("lumière", "lumière");
var SOIN = new Item("soin", "soin");
var Q = function (quantity, res) { return new Quantity(quantity, res); };
var Scenario = (function () {
    function Scenario() {
    }
    Scenario.initEngine = function () {
        var engine = new Engine();
        engine.player = new Player("gurdil");
        engine.player.increaseStorage(Q(1, NAIN));
        engine.producers = [
            new Producer("Temps / jours")
                .thatProduce(Q(10, NAIN))
                .every(30).seconds()
        ];
        engine.crafters = [
            new Crafter("Apéro potes")
                .thatCraft(Q(1, TUNNEL))["in"](2).seconds()
                .atCostOf(Q(1, NAIN))
        ];
        engine.triggers = [
            new Trigger("Sympatisant")
                .whenReached(Q(5, NAIN))
                .spawnCrafter(new Crafter("Apéro ingé")
                .thatCraft(Q(5, BIERE))["in"](2).seconds()
                .atCostOf(Q(1, NAIN)))
        ];
        return engine;
    };
    return Scenario;
}());
//# sourceMappingURL=Scenario.js.map