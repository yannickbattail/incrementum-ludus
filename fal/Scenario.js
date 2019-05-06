var LEVEL = new NamedStepResource("level", "level.svg", [
    "NOTHING",
    "Moldus",
    "Sympatisant",
    "Impétrant",
    "Néo",
    "Parrainé",
    "Baptisable",
    "Bébé fal",
    "Faluchard"
]);
var TEMPS = new Item("temps", "time.png");
var PARRAIN = new Item("parrain", "food.svg");
var CODE_VILLE = new Item("code de ville", "etoile_or.png");
var POULE = new Item("poule", "poule.png");
var FALUCHE = new Item("Faluche", "faluche.png");
var ADOPTION_INGE = new Item("adoption ingé", "faluche.png");
var ADOPTION_SCIENCES = new Item("adoption sciences", "faluche.png");
var ADOPTION_DROIT = new Item("adoption droit", "faluche.png");
var ADOPTION_JAUNE = new Item("adoption jaune", "faluche.png");
var ADOPTION_ROSE = new Item("adoption rose", "faluche.png");
var ADOPTION_SAGE_POUF = new Item("adoption sage-pouf", "faluche.png");
var ADOPTION_PHARMA = new Item("adoption Pharma", "faluche.png");
var ADOPTION_MEDECINE = new Item("adoption Médecine", "faluche.png");
var PINS_INGE = new Item("pin's ingé", "pins_gris.png");
var PINS_SCIENCES = new Item("pin's sciences", "pins_gris.png");
var PINS_DROIT = new Item("pin's droit", "pins_gris.png");
var PINS_JAUNE = new Item("pin's jaune", "pins_gris.png");
var PINS_ROSE = new Item("pin's rose", "pins_gris.png");
var PINS_SAGE_POUF = new Item("pin's sage-pouf", "pins_gris.png");
var PINS_PHARMA = new Item("pin's Pharma", "pins_gris.png");
var PINS_MEDECINE = new Item("pin's Médecine", "pins_gris.png");
var PINS_GRENOBLE = new Item("pin's Grenoble", "pins.png");
var PINS_VALENCE = new Item("pin's Valence", "pins.png");
var PINS_CLERMONT = new Item("pin's Clermont", "pins.png");
var PINS_DIJON = new Item("pin's Dijon", "pins.png");
var PINS_MONPEUL = new Item("pin's Monpeul", "pins.png");
var PINS_MARSEILLE = new Item("pin's Marseille", "pins.png");
var PINS_NANCY = new Item("pin's Nancy", "pins.png");
var PINS_STASBOURG = new Item("pin's Strasbourg", "pins.png");
var Q = function (quantity, res) { return new Quantity(quantity, res); };
var Scenario = (function () {
    function Scenario() {
    }
    Scenario.initEngine = function () {
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
                .thatCraft(new RandomRangeQuantity(0, 2, PINS_INGE))["in"](2).seconds()
                .atCostOf(Q(1, TEMPS))
        ];
        engine.triggers = [
            new Trigger("Sympatisant")
                .whenReached(Q(5, PINS_INGE))
                .spawnCrafter(new Crafter("Apéro ingé")
                .thatCraft(new RandomRangeQuantity(2, 5, PINS_INGE))
                .andCraft(new RandomResource(1, PINS_SCIENCES, 0.02))["in"](2).seconds()
                .atCostOf(Q(1, TEMPS)))
                .spawnResource(Q(1, LEVEL))
                .appendTrigger(new Trigger("Impétrent")
                .whenReached(Q(50, PINS_INGE))
                .spawnProducer(new Producer("Temps / jours")
                .thatProduce(Q(10, TEMPS))
                .every(30).seconds())
                .spawnCrafter(new Crafter("Apéro fal lyonnais")
                .thatCraft(new RandomResource(1, PINS_INGE, 0.3))
                .thatCraft(new RandomResource(1, PINS_SCIENCES, 0.3))
                .thatCraft(new RandomResource(1, PINS_DROIT, 0.3))
                .thatCraft(new RandomResource(1, PINS_JAUNE, 0.3))
                .thatCraft(new RandomResource(1, PINS_ROSE, 0.3))
                .thatCraft(new RandomResource(1, PINS_SAGE_POUF, 0.3))
                .thatCraft(new RandomResource(1, PINS_PHARMA, 0.3))
                .thatCraft(new RandomResource(1, PINS_MEDECINE, 0.3))["in"](3).seconds()
                .atCostOf(Q(2, TEMPS)))
                .spawnResource(Q(1, LEVEL))
                .appendTrigger(new Trigger("Néo")
                .whenReached(Q(1, PINS_INGE))
                .whenReached(Q(1, PINS_SCIENCES))
                .whenReached(Q(1, PINS_DROIT))
                .whenReached(Q(1, PINS_JAUNE))
                .whenReached(Q(1, PINS_ROSE))
                .whenReached(Q(1, PINS_SAGE_POUF))
                .whenReached(Q(1, PINS_PHARMA))
                .whenReached(Q(1, PINS_MEDECINE))
                .spawnCrafter(new Crafter("Apéro fal hebdomadaire")
                .thatCraft(new RandomResource(1, PINS_INGE, 0.4))
                .thatCraft(new RandomResource(1, PINS_SCIENCES, 0.4))
                .thatCraft(new RandomResource(1, PINS_DROIT, 0.4))
                .thatCraft(new RandomResource(1, PINS_JAUNE, 0.4))
                .thatCraft(new RandomResource(1, PINS_ROSE, 0.3))
                .thatCraft(new RandomResource(1, PINS_SAGE_POUF, 0.3))
                .thatCraft(new RandomResource(1, PINS_PHARMA, 0.3))
                .thatCraft(new RandomResource(1, PINS_MEDECINE, 0.3))["in"](3).seconds()
                .atCostOf(Q(2, TEMPS))
                .canBeSwitchedToAuto())
                .spawnCrafter(new Crafter("Trouver des parrains marraines")
                .thatCraft(Q(1, PARRAIN))["in"](20).seconds()
                .atCostOf(Q(8, PINS_INGE))
                .atCostOf(Q(6, PINS_SCIENCES))
                .atCostOf(Q(6, PINS_DROIT))
                .atCostOf(Q(6, PINS_JAUNE))
                .atCostOf(Q(6, PINS_ROSE))
                .atCostOf(Q(6, PINS_SAGE_POUF))
                .atCostOf(Q(6, PINS_PHARMA))
                .atCostOf(Q(6, PINS_MEDECINE)))
                .spawnResource(Q(1, LEVEL))
                .appendTrigger(new Trigger("Parrainé")
                .whenReached(Q(2, PARRAIN))
                .spawnCrafter(new Crafter("Apprentissage du code")
                .thatCraft(Q(1, CODE_VILLE))["in"](30).seconds()
                .atCostOf(Q(4, PINS_INGE))
                .atCostOf(Q(4, PINS_SCIENCES))
                .atCostOf(Q(4, PINS_DROIT))
                .atCostOf(Q(4, PINS_JAUNE))
                .atCostOf(Q(4, PINS_ROSE))
                .atCostOf(Q(4, PINS_SAGE_POUF))
                .atCostOf(Q(4, PINS_PHARMA))
                .atCostOf(Q(4, PINS_MEDECINE)))
                .spawnResource(Q(1, LEVEL))
                .appendTrigger(new Trigger("Baptême")
                .whenReached(Q(1, CODE_VILLE)).and(Q(2, PARRAIN))
                .spawnResource(Q(1, FALUCHE))
                .spawnResource(Q(1, LEVEL))
                .appendTrigger(Scenario.triggerFal())))))
        ];
        return engine;
    };
    Scenario.triggerFal = function () {
        return new Trigger("Faluchard")
            .whenReached(Q(1, FALUCHE))
            .spawnResource(Q(1, LEVEL))
            .spawnResource(Q(0, PINS_GRENOBLE))
            .spawnResource(Q(0, PINS_VALENCE))
            .spawnResource(Q(0, PINS_CLERMONT))
            .spawnResource(Q(0, PINS_DIJON))
            .spawnResource(Q(0, PINS_MONPEUL))
            .spawnResource(Q(0, PINS_MARSEILLE))
            .spawnResource(Q(0, PINS_NANCY))
            .spawnResource(Q(0, PINS_STASBOURG))
            .spawnProducer(new Producer("Temps / jours")
            .thatProduce(Q(10, TEMPS))
            .every(30).seconds())
            .spawnCrafter(new Crafter("Soirée fal")
            .thatCraft(new RandomResource(1, PINS_GRENOBLE, 100 / 113))
            .thatCraft(new RandomResource(1, PINS_VALENCE, 100 / 104))
            .thatCraft(new RandomResource(1, PINS_CLERMONT, 100 / 165))
            .thatCraft(new RandomResource(1, PINS_DIJON, 100 / 197))
            .thatCraft(new RandomResource(1, PINS_MONPEUL, 100 / 306))
            .thatCraft(new RandomResource(1, PINS_MARSEILLE, 100 / 315))
            .thatCraft(new RandomResource(1, PINS_NANCY, 100 / 407))
            .thatCraft(new RandomResource(1, PINS_STASBOURG, 100 / 492))["in"](3).seconds()
            .atCostOf(Q(5, TEMPS)))
            .appendTrigger(new Trigger("Natio")
            .whenReached(Q(1, PINS_GRENOBLE))
            .whenReached(Q(1, PINS_VALENCE))
            .whenReached(Q(1, PINS_CLERMONT))
            .whenReached(Q(1, PINS_DIJON))
            .whenReached(Q(1, PINS_MONPEUL))
            .whenReached(Q(1, PINS_MARSEILLE))
            .whenReached(Q(1, PINS_NANCY))
            .whenReached(Q(1, PINS_STASBOURG))
            .spawnResource(Q(1, LEVEL)))
            .appendTrigger(new Trigger("[secondaire] Adoption sciences")
            .whenReached(Q(1, CODE_VILLE))
            .whenReached(Q(1, CODE_VILLE))
            .spawnResource(Q(1, ADOPTION_SCIENCES)))
            .appendTrigger(new Trigger("[secondaire] Adoption droit")
            .whenReached(Q(1, CODE_VILLE)).and(Q(1, PARRAIN)).and(Q(40, PINS_DROIT))
            .spawnResource(Q(1, ADOPTION_DROIT)))
            .appendTrigger(new Trigger("[secondaire] Adoption jaune")
            .whenReached(Q(1, CODE_VILLE)).and(Q(1, PARRAIN)).and(Q(40, PINS_JAUNE))
            .spawnResource(Q(1, ADOPTION_JAUNE)))
            .appendTrigger(new Trigger("[secondaire] Adoption rose")
            .whenReached(Q(1, CODE_VILLE)).and(Q(1, PARRAIN)).and(Q(40, PINS_ROSE))
            .spawnResource(Q(1, ADOPTION_ROSE)))
            .appendTrigger(new Trigger("[secondaire] Adoption sage-pouf")
            .whenReached(Q(1, CODE_VILLE)).and(Q(1, PARRAIN)).and(Q(40, PINS_SAGE_POUF))
            .spawnResource(Q(1, ADOPTION_SAGE_POUF)))
            .appendTrigger(new Trigger("[secondaire] Adoption pharma")
            .whenReached(Q(1, CODE_VILLE)).and(Q(1, PARRAIN)).and(Q(40, PINS_PHARMA))
            .spawnResource(Q(1, ADOPTION_PHARMA)))
            .appendTrigger(new Trigger("[secondaire] Adoption médecine")
            .whenReached(Q(1, CODE_VILLE)).and(Q(1, PARRAIN)).and(Q(40, PINS_MEDECINE))
            .spawnResource(Q(1, ADOPTION_MEDECINE)))
            .appendTrigger(new Trigger("[secondaire] p*te à adoption")
            .whenReached(Q(1, ADOPTION_SCIENCES))
            .and(Q(1, ADOPTION_DROIT))
            .and(Q(1, ADOPTION_JAUNE))
            .and(Q(1, ADOPTION_ROSE))
            .and(Q(1, ADOPTION_SAGE_POUF))
            .and(Q(1, ADOPTION_PHARMA))
            .and(Q(1, ADOPTION_MEDECINE))
            .spawnResource(Q(1, POULE)));
    };
    return Scenario;
}());
//# sourceMappingURL=Scenario.js.map