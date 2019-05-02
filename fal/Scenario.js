var LEVEL = new Level("level", "level");
var TEMPS = new Item("temps", "temps");
var PINS_FILIERE = new Item("pin's filière", "pins");
var PINS_VILLE = new Item("pin's ville", "pins");
var Scenario = (function () {
    function Scenario() {
    }
    Scenario.initEngine = function () {
        var Q = function (quantity, res) { return new Quantity(quantity, res); };
        var engine = new Engine();
        engine.player = new Player("Chuck Noland");
        engine.player.increaseStorage(Q(1, LEVEL));
        engine.producers = [
            new Producer("Temps / jours")
                .thatProduce(Q(10, TEMPS))
                .every(30).seconds(),
        ];
        engine.crafters = [
            new Crafter("Apéro potes")
                .thatCraft(new RandomRangeQuantity(0, 2, PINS_FILIERE))["in"](2).seconds()
                .atCostOf(Q(1, TEMPS))
        ];
        engine.triggers = [
            new Trigger("Sympatisant")
                .whenReached(Q(5, PINS_FILIERE))
                .spawnCrafter(new Crafter("Apéro filière")
                .thatCraft(new RandomRangeQuantity(2, 5, PINS_FILIERE))["in"](2).seconds()
                .atCostOf(Q(1, TEMPS)))
                .spawnResource(Q(1, LEVEL))
                .appendTrigger(new Trigger("Impétrent")
                .whenReached(Q(50, PINS_FILIERE))
                .spawnCrafter(new Crafter("Apéro fal de ville")
                .thatCraft(new RandomRangeQuantity(1, 3, PINS_VILLE))["in"](3).seconds()
                .atCostOf(Q(2, TEMPS)))
                .spawnResource(Q(1, LEVEL)))
        ];
        return engine;
    };
    return Scenario;
}());
//# sourceMappingURL=Scenario.js.map