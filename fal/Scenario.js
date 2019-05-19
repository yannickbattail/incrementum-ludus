var LEVEL = new Level("level", "level.svg", [
    "NOTHING",
    "Moldus",
    "Sympatisant",
    "Impétrant",
    "Néo",
    "Parrainé",
    "Baptisable",
    "Bébé fal",
    "faluchard",
    "faluchard natio"
]);
var FALUCHE = new Item("Faluche", "faluche.png");
var TEMPS = new Item("temps", "time.png");
var DISTANCE = new Material("distance", "Km", "volant.png");
var TELLIGENCE = new Material("telligence", "T", "brain.png");
var TELLIGENCE_ARTIF = new Material("telligence artificielle", "TA", "artificial-intelligence.svg");
var PARRAIN = new Item("parrain", "parrain.png");
var CODE_VILLE = new Item("code de ville", "etoile_or.png");
var POULE = new Item("poule", "poule.png");
var POINT_COUTURE = new Item("point de couture", "de-a-coudre.png");
var CONGRES = new Item("congrès", "valise.png");
var CHANT = new Item("chant", "cle de fa argent.png");
var CLE_DE_SOL = new Item("clé de sol", "cle de sol.png");
var CH3CH2OH = new Item("CH3CH2OH", "CH3CH2OH.png");
var BIÈRE = new Material("bière", "cl", "chope or.png");
var VOMIT = new Material("vomit", "cl", "vomit.png");
var ADOPTION_INGE = new Item("adoption ingé", "filieres/adopt_inge.png");
var ADOPTION_SCIENCES = new Item("adoption sciences", "filieres/adopt_sciences.png");
var ADOPTION_DROIT = new Item("adoption droit", "filieres/adopt_droit.png");
var ADOPTION_JAUNE = new Item("adoption jaune", "filieres/adopt_jaune.png");
var ADOPTION_ROSE = new Item("adoption rose", "filieres/adopt_paramed.png");
var ADOPTION_SAGE_POUF = new Item("adoption sage-pouf", "filieres/adopt_sage-pouf.png");
var ADOPTION_PHARMA = new Item("adoption Pharma", "filieres/adopt_pharma.png");
var ADOPTION_MEDECINE = new Item("adoption Médecine", "filieres/adopt_medecine.png");
var PINS_INGE = new Item("pin's ingé", "filieres/etoile et foudre.png");
var PINS_SCIENCES = new Item("pin's sciences", "filieres/palmes croisees.png");
var PINS_DROIT = new Item("pin's droit", "filieres/balance romaine.png");
var PINS_JAUNE = new Item("pin's jaune", "filieres/livre ouvert et plume.png");
var PINS_ROSE = new Item("pin's rose", "filieres/ciseaux.png");
var PINS_SAGE_POUF = new Item("pin's sage-pouf", "filieres/croix ankh.png");
var PINS_PHARMA = new Item("pin's Pharma", "filieres/caducee pharmacie.png");
var PINS_MEDECINE = new Item("pin's Médecine", "filieres/caducee medecine.png");
var PINS_LYON = new Item("pin's Lyon", "villes/Lyon.png");
var PINS_GRENOBLE = new Item("pin's Grenoble", "villes/Grenoble.svg");
var PINS_VALENCE = new Item("pin's Valence", "villes/Valence.svg");
var PINS_CLERMONT = new Item("pin's Clermont", "villes/ClermontFerrand.svg");
var PINS_DIJON = new Item("pin's Dijon", "villes/Dijon.svg");
var PINS_MONPEUL = new Item("pin's Monpeul", "villes/Montpellier.svg");
var PINS_MARSEILLE = new Item("pin's Marseille", "villes/Marseille.svg");
var PINS_NANCY = new Item("pin's Nancy", "villes/Nancy.svg");
var PINS_STASBOURG = new Item("pin's Strasbourg", "villes/Strasbourg.svg");
var villeKm = {
    "Lyon": { "Lyon": 0, "Grenoble": 113, "Valence": 104, "Clermont": 165, "Dijon": 197, "Monpeul": 306, "Marseille": 315, "Nancy": 407, "Strasbourg": 492 },
    "Grenoble": { "Lyon": 113, "Grenoble": 0, "Valence": 91, "Clermont": 273, "Dijon": 305, "Monpeul": 293, "Marseille": 306, "Nancy": 516, "Strasbourg": 573 },
    "Valence": { "Lyon": 104, "Grenoble": 91, "Valence": 0, "Clermont": 263, "Dijon": 295, "Monpeul": 204, "Marseille": 214, "Nancy": 506, "Strasbourg": 592 },
    "Clermont": { "Lyon": 165, "Grenoble": 273, "Valence": 263, "Clermont": 0, "Dijon": 333, "Monpeul": 332, "Marseille": 475, "Nancy": 516, "Strasbourg": 544 },
    "Dijon": { "Lyon": 197, "Grenoble": 305, "Valence": 295, "Clermont": 333, "Dijon": 0, "Monpeul": 495, "Marseille": 504, "Nancy": 217, "Strasbourg": 331 },
    "Monpeul": { "Lyon": 306, "Grenoble": 293, "Valence": 204, "Clermont": 332, "Dijon": 495, "Monpeul": 0, "Marseille": 171, "Nancy": 719, "Strasbourg": 789 },
    "Marseille": { "Lyon": 315, "Grenoble": 306, "Valence": 214, "Clermont": 475, "Dijon": 504, "Monpeul": 171, "Marseille": 0, "Nancy": 728, "Strasbourg": 798 },
    "Nancy": { "Lyon": 407, "Grenoble": 516, "Valence": 506, "Clermont": 516, "Dijon": 217, "Monpeul": 719, "Marseille": 728, "Nancy": 0, "Strasbourg": 160 },
    "Strasbourg": { "Lyon": 492, "Grenoble": 573, "Valence": 592, "Clermont": 544, "Dijon": 331, "Monpeul": 789, "Marseille": 798, "Nancy": 160, "Strasbourg": 0 }
};
var Q = function (quantity, res) { return new Quantity(quantity, res); };
var Scenario = (function () {
    function Scenario() {
    }
    Scenario.initEngine = function () {
        var engine = new Engine();
        engine.player = new Player("dignichose");
        engine.player.setPreventNegativeStorage(true);
        engine.player.increaseStorage(Q(1, LEVEL));
        engine.producers = [
            new Producer("Temps / jours")
                .thatProduce(Q(10, TEMPS))
                .every(30).seconds(),
            new Producer("telligence")
                .thatProduce(Q(1, TELLIGENCE))
                .every(0.1).seconds(),
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
                .appendTrigger(new Trigger("Impétrant")
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
                .thatCraft(new RandomResource(1, PINS_MEDECINE, 0.3))
                .thatCraft(Q(100, BIÈRE))["in"](3).seconds()
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
                .spawnResource(Q(1, LEVEL))
                .spawnProducer(new Producer("Désaouler")
                .thatProduce(Q(-1, CH3CH2OH))
                .every(30).seconds())
                .spawnCrafter(new Crafter("Sec")
                .thatCraft(Q(1, CH3CH2OH))["in"](2).seconds()
                .atCostOf(Q(50, BIÈRE)))
                .spawnCrafter(new Crafter("VT")
                .thatCraft(Q(100, VOMIT))["in"](10).seconds()
                .atCostOf(Q(10, CH3CH2OH))
                .automaticaly())
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
                .appendTrigger(new Trigger("[perdu] Coma")
                .whenReached(Q(100, VOMIT))
                .execFunction("Gui.youDie('Trop de blessés');"))
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
                .whenReached(Q(1, CODE_VILLE))
                .and(Q(2, PARRAIN))
                .and(Q(9, CH3CH2OH))
                .spawnResource(Q(-2, PARRAIN))
                .spawnResource(Q(-1, CODE_VILLE))
                .spawnResource(Q(1, FALUCHE))
                .spawnResource(Q(1, LEVEL))
                .appendTrigger(Scenario.triggerFal())))))
        ];
        return engine;
    };
    Scenario.triggerFal = function () {
        var coefDistance = 50;
        return new Trigger("Bébé Faluchard")
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
            .spawnProducer(new Producer("Km")
            .thatProduce(Q(1, DISTANCE))
            .manualy())
            .spawnProducer(new Producer("Coudre")
            .thatProduce(Q(1, POINT_COUTURE))
            .manualy())
            .spawnCrafter(new Crafter("Soirée fal")
            .thatCraft(new RandomResource(1, PINS_GRENOBLE, coefDistance / villeKm["Lyon"]["Grenoble"]))
            .thatCraft(new RandomResource(1, PINS_VALENCE, coefDistance / villeKm["Lyon"]["Valence"]))
            .thatCraft(new RandomResource(1, PINS_CLERMONT, coefDistance / villeKm["Lyon"]["Clermont"]))
            .thatCraft(new RandomResource(1, PINS_DIJON, coefDistance / villeKm["Lyon"]["Dijon"]))
            .thatCraft(new RandomResource(1, PINS_MONPEUL, coefDistance / villeKm["Lyon"]["Monpeul"]))
            .thatCraft(new RandomResource(1, PINS_MARSEILLE, coefDistance / villeKm["Lyon"]["Marseille"]))
            .thatCraft(new RandomResource(1, PINS_NANCY, coefDistance / villeKm["Lyon"]["Nancy"]))
            .thatCraft(new RandomResource(1, PINS_STASBOURG, coefDistance / villeKm["Lyon"]["Strasbourg"]))["in"](3).seconds()
            .atCostOf(Q(5, TEMPS)))
            .appendTrigger(Scenario.triggerCouture())
            .appendTrigger(new Trigger("[secondaire] Adoption sciences")
            .whenReached(Q(1, CODE_VILLE))
            .and(Q(1, PARRAIN))
            .and(Q(40, PINS_SCIENCES))
            .and(Q(20, POINT_COUTURE))
            .spawnResource(Q(1, ADOPTION_SCIENCES))
            .spawnResource(Q(-20, POINT_COUTURE))
            .spawnResource(Q(-1, CODE_VILLE))
            .spawnResource(Q(-1, PARRAIN)))
            .appendTrigger(new Trigger("[secondaire] Adoption droit")
            .whenReached(Q(1, CODE_VILLE))
            .and(Q(1, PARRAIN))
            .and(Q(40, PINS_DROIT))
            .and(Q(20, POINT_COUTURE))
            .spawnResource(Q(1, ADOPTION_DROIT))
            .spawnResource(Q(-20, POINT_COUTURE))
            .spawnResource(Q(-1, CODE_VILLE))
            .spawnResource(Q(-1, PARRAIN)))
            .appendTrigger(new Trigger("[secondaire] Adoption jaune")
            .whenReached(Q(1, CODE_VILLE))
            .and(Q(1, PARRAIN))
            .and(Q(40, PINS_JAUNE))
            .and(Q(20, POINT_COUTURE))
            .spawnResource(Q(1, ADOPTION_JAUNE))
            .spawnResource(Q(-20, POINT_COUTURE))
            .spawnResource(Q(-1, CODE_VILLE))
            .spawnResource(Q(-1, PARRAIN)))
            .appendTrigger(new Trigger("[secondaire] Adoption rose")
            .whenReached(Q(1, CODE_VILLE))
            .and(Q(1, PARRAIN))
            .and(Q(40, PINS_ROSE))
            .and(Q(20, POINT_COUTURE))
            .spawnResource(Q(1, ADOPTION_ROSE))
            .spawnResource(Q(-20, POINT_COUTURE))
            .spawnResource(Q(-1, CODE_VILLE))
            .spawnResource(Q(-1, PARRAIN)))
            .appendTrigger(new Trigger("[secondaire] Adoption sage-pouf")
            .whenReached(Q(1, CODE_VILLE))
            .and(Q(1, PARRAIN))
            .and(Q(40, PINS_SAGE_POUF))
            .and(Q(20, POINT_COUTURE))
            .spawnResource(Q(1, ADOPTION_SAGE_POUF))
            .spawnResource(Q(-20, POINT_COUTURE))
            .spawnResource(Q(-1, CODE_VILLE))
            .spawnResource(Q(-1, PARRAIN)))
            .appendTrigger(new Trigger("[secondaire] Adoption pharma")
            .whenReached(Q(1, CODE_VILLE))
            .and(Q(1, PARRAIN))
            .and(Q(40, PINS_PHARMA))
            .and(Q(20, POINT_COUTURE))
            .spawnResource(Q(1, ADOPTION_PHARMA))
            .spawnResource(Q(-20, POINT_COUTURE))
            .spawnResource(Q(-1, CODE_VILLE))
            .spawnResource(Q(-1, PARRAIN)))
            .appendTrigger(new Trigger("[secondaire] Adoption médecine")
            .whenReached(Q(1, CODE_VILLE))
            .and(Q(1, PARRAIN))
            .and(Q(40, PINS_MEDECINE))
            .and(Q(20, POINT_COUTURE))
            .spawnResource(Q(1, ADOPTION_MEDECINE))
            .spawnResource(Q(-20, POINT_COUTURE))
            .spawnResource(Q(-1, CODE_VILLE))
            .spawnResource(Q(-1, PARRAIN)))
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
    Scenario.triggerCouture = function () {
        var coefDistance = 100;
        return new Trigger("Couture")
            .whenReached(Q(30, PINS_INGE))
            .and(Q(50, POINT_COUTURE))
            .and(Q(100, DISTANCE))
            .spawnResource(Q(1, LEVEL))
            .spawnResource(Q(-50, POINT_COUTURE))
            .spawnCrafter(new Crafter("clé de sol")
            .thatCraft(Q(1, CLE_DE_SOL))
            .atCostOf(Q(30, CHANT))["in"](20).seconds()
            .automaticaly())
            .appendTrigger(new Trigger("Congrès: WE AFG")
            .whenReached(Q(10, PINS_GRENOBLE))
            .spawnResource(Q(1, CONGRES))
            .spawnCrafter(new Crafter("Congrès: WE AFG")
            .thatCraft(Q(5, PINS_GRENOBLE))
            .thatCraft(new RandomResource(2, PINS_VALENCE, coefDistance / villeKm["Grenoble"]["Valence"]))
            .thatCraft(new RandomResource(2, PINS_CLERMONT, coefDistance / villeKm["Grenoble"]["Clermont"]))
            .thatCraft(new RandomResource(2, PINS_DIJON, coefDistance / villeKm["Grenoble"]["Dijon"]))
            .thatCraft(new RandomResource(2, PINS_MONPEUL, coefDistance / villeKm["Grenoble"]["Monpeul"]))
            .thatCraft(new RandomResource(2, PINS_MARSEILLE, coefDistance / villeKm["Grenoble"]["Marseille"]))
            .thatCraft(new RandomResource(2, PINS_NANCY, coefDistance / villeKm["Grenoble"]["Nancy"]))
            .thatCraft(new RandomResource(2, PINS_STASBOURG, coefDistance / villeKm["Grenoble"]["Strasbourg"]))
            .thatCraft(new RandomRangeQuantity(1, 10, CHANT))["in"](1).minutes()
            .atCostOf(Q(10, TEMPS))
            .atCostOf(Q(villeKm["Lyon"]["Grenoble"], DISTANCE)))).appendTrigger(new Trigger("Congrès: WE FADA")
            .whenReached(Q(10, PINS_VALENCE))
            .spawnResource(Q(1, CONGRES))
            .spawnCrafter(new Crafter("Congrès: WE FADA")
            .thatCraft(new RandomResource(2, PINS_GRENOBLE, coefDistance / villeKm["Valence"]["Grenoble"]))
            .thatCraft(Q(5, PINS_VALENCE))
            .thatCraft(new RandomResource(2, PINS_CLERMONT, coefDistance / villeKm["Valence"]["Clermont"]))
            .thatCraft(new RandomResource(2, PINS_DIJON, coefDistance / villeKm["Valence"]["Dijon"]))
            .thatCraft(new RandomResource(2, PINS_MONPEUL, coefDistance / villeKm["Valence"]["Monpeul"]))
            .thatCraft(new RandomResource(2, PINS_MARSEILLE, coefDistance / villeKm["Valence"]["Marseille"]))
            .thatCraft(new RandomResource(2, PINS_NANCY, coefDistance / villeKm["Valence"]["Nancy"]))
            .thatCraft(new RandomResource(2, PINS_STASBOURG, coefDistance / villeKm["Valence"]["Strasbourg"]))
            .thatCraft(new RandomRangeQuantity(1, 10, CHANT))["in"](1).minutes()
            .atCostOf(Q(10, TEMPS))
            .atCostOf(Q(villeKm["Lyon"]["Valence"], DISTANCE)))).appendTrigger(new Trigger("Congrès: Auverge")
            .whenReached(Q(10, PINS_CLERMONT))
            .spawnResource(Q(1, CONGRES))
            .spawnCrafter(new Crafter("Congrès: Auverge")
            .thatCraft(new RandomResource(2, PINS_GRENOBLE, coefDistance / villeKm["Clermont"]["Grenoble"]))
            .thatCraft(new RandomResource(2, PINS_VALENCE, coefDistance / villeKm["Clermont"]["Valence"]))
            .thatCraft(Q(5, PINS_CLERMONT))
            .thatCraft(new RandomResource(2, PINS_DIJON, coefDistance / villeKm["Clermont"]["Dijon"]))
            .thatCraft(new RandomResource(2, PINS_MONPEUL, coefDistance / villeKm["Clermont"]["Monpeul"]))
            .thatCraft(new RandomResource(2, PINS_MARSEILLE, coefDistance / villeKm["Clermont"]["Marseille"]))
            .thatCraft(new RandomResource(2, PINS_NANCY, coefDistance / villeKm["Clermont"]["Nancy"]))
            .thatCraft(new RandomResource(2, PINS_STASBOURG, coefDistance / villeKm["Clermont"]["Strasbourg"]))
            .thatCraft(new RandomRangeQuantity(1, 10, CHANT))["in"](1).minutes()
            .atCostOf(Q(10, TEMPS))
            .atCostOf(Q(villeKm["Lyon"]["Clermont"], DISTANCE)))).appendTrigger(new Trigger("fal natio")
            .whenReached(Q(3, CONGRES))
            .spawnResource(Q(1, LEVEL)));
    };
    return Scenario;
}());
//# sourceMappingURL=Scenario.js.map