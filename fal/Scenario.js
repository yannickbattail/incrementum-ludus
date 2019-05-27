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
    "faluchard natio",
    "ancien faluchard"
]);
var FALUCHE = new CategorizedItem("Faluche", "faluche.png", "global");
var TEMPS = new CategorizedItem("temps", "time.png", "global");
var DISTANCE = new CategorizedMaterial("distance", "Km", "volant.png", "insigne");
var TELLIGENCE = new CategorizedMaterial("telligence", "T", "brain.png", "global");
var PARRAIN = new CategorizedItem("parrain", "parrain.png", "global");
var CODE_VILLE = new CategorizedItem("code de ville", "etoile_or.png", "global");
var SINGE = new CategorizedItem("singe", "singe.png", "insigne");
var BACCHUS = new CategorizedItem("bacchus", "bacchus.png", "insigne");
var POULE = new CategorizedItem("poule", "poule.png", "insigne");
var POINT_COUTURE = new CategorizedItem("point de couture", "de-a-coudre.png", "insigne");
var CONGRES = new CategorizedItem("congrès", "valise.png", "insigne");
var CHANT = new CategorizedItem("chant", "cle de fa argent.png", "insigne");
var CLE_DE_SOL = new CategorizedItem("clé de sol", "cle de sol.png", "insigne");
var CH3CH2OH = new CategorizedMaterial("CH3CH2OH", "", "CH3CH2OH.png", "global");
var BIÈRE = new CategorizedMaterial("bière", "cl", "chope or.png", "global");
var VOMIT = new CategorizedMaterial("vomit", "cl", "vomit.png", "global");
var POIREAU = new CategorizedItem("poireau/betterave", "x/poireau-betterave.png", "insigne");
var CAROTTE = new CategorizedItem("carotte", "x/carotte.png", "insigne");
var NAVET = new CategorizedItem("navet", "x/navet.png", "insigne");
var MISSIONNAIRE = new CategorizedItem("missionnaire", "x/missionnaire.png", "insigne");
var POSITION69 = new CategorizedItem("69", "x/69.png", "insigne");
var LEVRETTE = new CategorizedItem("levrette", "x/levrette.png", "insigne");
var CAPOTTE = new CategorizedItem("capotte", "x/condom.png", "insigne");
var VIRGINITE = new CategorizedItem("feuille de vigne/rose", "x/vigne-rose.png", "insigne");
var FIN_BAISEUR = new CategorizedItem("pensée/epée", "x/fin-baiseur.png", "insigne");
var LIME = new CategorizedItem("lime", "x/lime.png", "insigne");
var ADOPTION_INGE = new CategorizedItem("adoption ingé", "filieres/adopt_inge.png", "emblème");
var ADOPTION_SCIENCES = new CategorizedItem("adoption sciences", "filieres/adopt_sciences.png", "emblème");
var ADOPTION_DROIT = new CategorizedItem("adoption droit", "filieres/adopt_droit.png", "emblème");
var ADOPTION_JAUNE = new CategorizedItem("adoption jaune", "filieres/adopt_jaune.png", "emblème");
var ADOPTION_ROSE = new CategorizedItem("adoption rose", "filieres/adopt_paramed.png", "emblème");
var ADOPTION_SAGE_POUF = new CategorizedItem("adoption sage-pouf", "filieres/adopt_sage-pouf.png", "emblème");
var ADOPTION_PHARMA = new CategorizedItem("adoption Pharma", "filieres/adopt_pharma.png", "emblème");
var ADOPTION_MEDECINE = new CategorizedItem("adoption Médecine", "filieres/adopt_medecine.png", "emblème");
var PINS_INGE = new CategorizedItem("pin's ingé", "filieres/etoile et foudre.png", "emblème");
var PINS_SCIENCES = new CategorizedItem("pin's sciences", "filieres/palmes croisees.png", "emblème");
var PINS_DROIT = new CategorizedItem("pin's droit", "filieres/balance romaine.png", "emblème");
var PINS_JAUNE = new CategorizedItem("pin's jaune", "filieres/livre ouvert et plume.png", "emblème");
var PINS_ROSE = new CategorizedItem("pin's rose", "filieres/ciseaux.png", "emblème");
var PINS_SAGE_POUF = new CategorizedItem("pin's sage-pouf", "filieres/croix ankh.png", "emblème");
var PINS_PHARMA = new CategorizedItem("pin's Pharma", "filieres/caducee pharmacie.png", "emblème");
var PINS_MEDECINE = new CategorizedItem("pin's Médecine", "filieres/caducee medecine.png", "emblème");
var PINS_LYON = new CategorizedItem("pin's Lyon", "villes/Lyon.png", "ville");
var PINS_GRENOBLE = new CategorizedItem("pin's Grenoble", "villes/Grenoble.svg", "ville");
var PINS_VALENCE = new CategorizedItem("pin's Valence", "villes/Valence.svg", "ville");
var PINS_CLERMONT = new CategorizedItem("pin's Clermont", "villes/ClermontFerrand.svg", "ville");
var PINS_DIJON = new CategorizedItem("pin's Dijon", "villes/Dijon.svg", "ville");
var PINS_MONPEUL = new CategorizedItem("pin's Monpeul", "villes/Montpellier.svg", "ville");
var PINS_MARSEILLE = new CategorizedItem("pin's Marseille", "villes/Marseille.svg", "ville");
var PINS_NANCY = new CategorizedItem("pin's Nancy", "villes/Nancy.svg", "ville");
var PINS_STASBOURG = new CategorizedItem("pin's Strasbourg", "villes/Strasbourg.svg", "ville");
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
            new Producer("Telligence storming")
                .thatProduce(Q(1, TELLIGENCE))
                .every(0.5).seconds(),
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
                .whenReached(Q(30, PINS_INGE))
                .spawnProducer(new Producer("Plus de temps")
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
                .thatCraft(Q(50, BIÈRE))["in"](3).seconds()
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
                .every(10).seconds())
                .spawnCrafter(new Crafter("Sec")
                .thatCraft(Q(1, CH3CH2OH))["in"](1).seconds()
                .atCostOf(Q(50, BIÈRE)))
                .spawnCrafter(new Crafter("VT")
                .thatCraft(Q(10, VOMIT))["in"](3).seconds()
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
                .execFunction("Gui.youDie('Trop de vomit. Coma!');"))
                .appendTrigger(new Trigger("Dignité dans l'ivresse")
                .whenReached(Q(10, VOMIT))
                .spawnResource(Q(-1, BACCHUS)))
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
                .spawnResource(Q(1, BACCHUS))
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
            .spawnProducer(new Producer("Encore plus de temps")
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
            .thatCraft(new RandomResource(1, PINS_STASBOURG, coefDistance / villeKm["Lyon"]["Strasbourg"]))
            .thatCraft(Q(50, BIÈRE))["in"](3).seconds()
            .atCostOf(Q(5, TEMPS)))
            .spawnCrafter(new Crafter("Chanter")
            .thatCraft(new AdaptativeQuantity().ifHas(Q(4, CH3CH2OH)).give(Q(-3, CHANT)).elseGive(Q(1, CHANT)).showTheQuantityIfNot())["in"](5).seconds())
            .appendTrigger(Scenario.triggerCouture())
            .appendTrigger(new Trigger("[secondaire] Adoption sciences")
            .whenReached(Q(1, CODE_VILLE))
            .and(Q(1, PARRAIN))
            .and(Q(40, PINS_SCIENCES))
            .and(Q(20, POINT_COUTURE))
            .and(Q(9, CH3CH2OH))
            .spawnResource(Q(1, ADOPTION_SCIENCES))
            .spawnResource(Q(-20, POINT_COUTURE))
            .spawnResource(Q(-1, CODE_VILLE))
            .spawnResource(Q(-1, PARRAIN))
            .spawnResource(Q(-2, CH3CH2OH)))
            .appendTrigger(new Trigger("[secondaire] Adoption droit")
            .whenReached(Q(1, CODE_VILLE))
            .and(Q(1, PARRAIN))
            .and(Q(40, PINS_DROIT))
            .and(Q(20, POINT_COUTURE))
            .and(Q(9, CH3CH2OH))
            .spawnResource(Q(1, ADOPTION_DROIT))
            .spawnResource(Q(-20, POINT_COUTURE))
            .spawnResource(Q(-1, CODE_VILLE))
            .spawnResource(Q(-1, PARRAIN))
            .spawnResource(Q(-2, CH3CH2OH)))
            .appendTrigger(new Trigger("[secondaire] Adoption jaune")
            .whenReached(Q(1, CODE_VILLE))
            .and(Q(1, PARRAIN))
            .and(Q(40, PINS_JAUNE))
            .and(Q(20, POINT_COUTURE))
            .and(Q(9, CH3CH2OH))
            .spawnResource(Q(1, ADOPTION_JAUNE))
            .spawnResource(Q(-20, POINT_COUTURE))
            .spawnResource(Q(-1, CODE_VILLE))
            .spawnResource(Q(-1, PARRAIN))
            .spawnResource(Q(-2, CH3CH2OH)))
            .appendTrigger(new Trigger("[secondaire] Adoption rose")
            .whenReached(Q(1, CODE_VILLE))
            .and(Q(1, PARRAIN))
            .and(Q(40, PINS_ROSE))
            .and(Q(20, POINT_COUTURE))
            .and(Q(9, CH3CH2OH))
            .spawnResource(Q(1, ADOPTION_ROSE))
            .spawnResource(Q(-20, POINT_COUTURE))
            .spawnResource(Q(-1, CODE_VILLE))
            .spawnResource(Q(-1, PARRAIN))
            .spawnResource(Q(-2, CH3CH2OH)))
            .appendTrigger(new Trigger("[secondaire] Adoption sage-pouf")
            .whenReached(Q(1, CODE_VILLE))
            .and(Q(1, PARRAIN))
            .and(Q(40, PINS_SAGE_POUF))
            .and(Q(20, POINT_COUTURE))
            .and(Q(9, CH3CH2OH))
            .spawnResource(Q(1, ADOPTION_SAGE_POUF))
            .spawnResource(Q(-20, POINT_COUTURE))
            .spawnResource(Q(-1, CODE_VILLE))
            .spawnResource(Q(-1, PARRAIN))
            .spawnResource(Q(-2, CH3CH2OH)))
            .appendTrigger(new Trigger("[secondaire] Adoption pharma")
            .whenReached(Q(1, CODE_VILLE))
            .and(Q(1, PARRAIN))
            .and(Q(40, PINS_PHARMA))
            .and(Q(20, POINT_COUTURE))
            .and(Q(9, CH3CH2OH))
            .spawnResource(Q(1, ADOPTION_PHARMA))
            .spawnResource(Q(-20, POINT_COUTURE))
            .spawnResource(Q(-1, CODE_VILLE))
            .spawnResource(Q(-1, PARRAIN))
            .spawnResource(Q(-2, CH3CH2OH)))
            .appendTrigger(new Trigger("[secondaire] Adoption médecine")
            .whenReached(Q(1, CODE_VILLE))
            .and(Q(1, PARRAIN))
            .and(Q(40, PINS_MEDECINE))
            .and(Q(20, POINT_COUTURE))
            .and(Q(9, CH3CH2OH))
            .spawnResource(Q(1, ADOPTION_MEDECINE))
            .spawnResource(Q(-20, POINT_COUTURE))
            .spawnResource(Q(-1, CODE_VILLE))
            .spawnResource(Q(-1, PARRAIN))
            .spawnResource(Q(-2, CH3CH2OH)))
            .appendTrigger(new Trigger("[secondaire] quémendeur d'insignes")
            .whenReached(Q(1, ADOPTION_SCIENCES))
            .and(Q(1, ADOPTION_DROIT))
            .and(Q(1, ADOPTION_JAUNE))
            .and(Q(1, ADOPTION_ROSE))
            .and(Q(1, ADOPTION_SAGE_POUF))
            .and(Q(1, ADOPTION_PHARMA))
            .and(Q(1, ADOPTION_MEDECINE))
            .spawnResource(Q(1, SINGE))
            .spawnResource(Q(-2, CH3CH2OH)));
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
            .thatCraft(Q(2, CAPOTTE))["in"](1).minutes()
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
            .thatCraft(Q(2, CAPOTTE))["in"](1).minutes()
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
            .thatCraft(Q(2, CAPOTTE))["in"](1).minutes()
            .atCostOf(Q(10, TEMPS))
            .atCostOf(Q(villeKm["Lyon"]["Clermont"], DISTANCE)))).appendTrigger(this.triggerAfterCongres()).appendTrigger(new Trigger("fal natio")
            .whenReached(Q(3, CONGRES))
            .spawnResource(Q(1, LEVEL)));
    };
    Scenario.triggerAfterCongres = function () {
        return new Trigger("Km / semaine")
            .whenReached(Q(1, CONGRES))
            .spawnProducer(new Producer("Km / semaine")
            .thatProduce(Q(10, DISTANCE))
            .every(5).seconds()).spawnCrafter(new Crafter("Chopper en missionaire")
            .thatCraft(Q(1, FIN_BAISEUR))
            .andCraft(Q(1, MISSIONNAIRE))
            .andCraft(new AdaptativeQuantity().ifHas(Q(5, CH3CH2OH)).give(Q(1, LIME)).elseGive(Q(1, FIN_BAISEUR)).showTheQuantityIfNot())
            .andCraft(new RandomResource(1, CAROTTE, 0.1))["in"](42).seconds()
            .atCostOf(Q(1, CAPOTTE))).appendTrigger(new Trigger("Dépucelage")
            .whenReached(Q(1, FIN_BAISEUR))
            .spawnResource(Q(1, VIRGINITE))
            .spawnCrafter(new Crafter("Chopper en 69")
            .thatCraft(Q(1, FIN_BAISEUR))
            .andCraft(Q(1, POSITION69))
            .andCraft(new AdaptativeQuantity().ifHas(Q(5, CH3CH2OH)).give(Q(1, LIME)).elseGive(Q(1, FIN_BAISEUR)).showTheQuantityIfNot())
            .andCraft(new RandomResource(1, POIREAU, 0.1))["in"](42).seconds()
            .atCostOf(Q(1, CAPOTTE)))
            .appendTrigger(new Trigger("Potager")
            .whenReached(Q(4, FIN_BAISEUR))
            .and(Q(2, POSITION69))
            .spawnCrafter(new Crafter("Chopper en levrette")
            .thatCraft(Q(1, FIN_BAISEUR))
            .andCraft(Q(1, LEVRETTE))
            .andCraft(new AdaptativeQuantity().ifHas(Q(5, CH3CH2OH)).give(Q(1, LIME)).elseGive(Q(1, FIN_BAISEUR)).showTheQuantityIfNot())
            .andCraft(new RandomResource(1, NAVET, 0.1))["in"](42).seconds()
            .atCostOf(Q(1, CAPOTTE))))).appendTrigger(new Trigger("Potager")
            .whenReached(Q(2, CAROTTE))
            .and(Q(2, POIREAU))
            .and(Q(2, NAVET))
            .spawnResource(Q(1, POULE))).appendTrigger(new Trigger("Ancien")
            .whenReached(Q(1, POULE))
            .whenReached(Q(2, CLE_DE_SOL))
            .and(Q(1, SINGE))
            .spawnResource(Q(1, LEVEL)));
    };
    return Scenario;
}());
//# sourceMappingURL=Scenario.js.map