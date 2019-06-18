"use strict";
var LEVEL = new Level("level", "level.svg", [
    "NOTHING",
    "Moldu(e)",
    "Sympatisant(e)",
    "Impétrant(e)",
    "Néo",
    "Parrainé(e)",
    "Baptisable",
    "Bébé faluchard(e)",
    "Faluchard(e)",
    "Faluchard(e) natio",
    "Ancien(ne) faluchard(e)",
    "Hypothétique",
    "Grand(e) Maistre(sse)",
]);
var FALUCHE = new CategorizedItem("Faluche", "faluche.png", "global", "chat peau");
var TEMPS = new CategorizedItem("temps", "clockwork.svg", "global", "TIC TAC, TIC TAC");
var DISTANCE = new CategorizedMaterial("distance", "Km", "volant.png", "insigne", "Cul-mule de km, pour les cons en grès.");
var TELLIGENCE = new CategorizedMaterial("telligence", "T", "brain.png", "global", "Facile, l'intelligence c'est l'inverse de la telligence");
var PARRAIN = new CategorizedItem("parrain", "parrain.png", "global", "Parrain, pas renne, marin, marraine ou encore témoin de jéhov... de mariage");
var CODE_VILLE = new CategorizedItem("code de ville", "code.svg", "global", "Le code faluchard de la ville.");
var SINGE = new CategorizedItem("singe", "singe.png", "insigne", "Monkey, quémandeur d'insignes. Ou p*te à pin's ça marche aussi.");
var BACCHUS = new CategorizedItem("bacchus", "bacchus.png", "insigne", "Devant Bacchus dieu du vin, gambrinus héroa du... hein quoi? sa signification? ben dignité dans hips l'ivresse");
var POULE = new CategorizedItem("poule", "poule.png", "insigne", "Poule: personne chaude. Poulet poulet piou piou piou!");
var POINT_COUTURE = new CategorizedItem("point de couture", "de-a-coudre.png", "insigne", "Oui ça existe pas dans le code gnagnagna, c'est juste pour representer des points de couture.");
var CONGRES = new CategorizedItem("congrès", "valise.png", "insigne", "haa la valise de congrès, sa tente, ses souvenirs et ses paillette Ha non pas les paillettes! Y en a une qui pop à chaque fois qu'on débloque un congrès.");
var CHANT = new CategorizedItem("chant", "cle de fa argent.png", "insigne", "un chant, dont les thèmes récurrents sont : la consomation d'éthanol et la pratique du coït.");
var CLE_DE_SOL = new CategorizedItem("clé de sol", "cle de sol.png", "insigne", "Digne chanteur de paille hard. (faut 30 put*in de chants pour avoir ce truc)");
var CASSEROLE = new CategorizedItem("casserole", "casserole.png", "insigne", "[malus] Ivre, virgule, il chante comme une ");
var CH3CH2OH = new CategorizedMaterial("CH3CH2OH", "", "CH3CH2OH.png", "global", "C'est un liquide incolore, volatil, inflammable et miscible à l'eau en toutes proportions. C'est un psychotrope, et l'une des plus anciennes drogues récréatives, sous la forme de boisson alcoolisée. L'éthanol est utilisé par l'industrie agroalimentaire gnagna etc mes couilles sur ton front ça fai...<br />Bon ce qui compte c'est de ne pas dépasser les 10, sinon ton appareil digestif (gestif!) va fonctionner en sens inverse et ça ... c'est pas bien <img src=\"images/vomiting.svg\" class=\"resource_img\" />");
var BIÈRE = new CategorizedMaterial("bière", "cl", "beer.svg", "global", "La bière est une boisson alcoolisée obtenue par fermentation alcoolique d'un moût de produits végétaux amylacés ... ho shit! amy quoi? bon gogole ==&gt; amylacé. ha mais ouiii!.<br />+1g de CH3CH2OH et +1secs");
var VIN = new CategorizedMaterial("Vin", "cl", "verre_de_vin.svg", "global", "Vin: boisson alcoolisée ... qui fait gagner +3g de CH3CH2OH et +5secs (hey ça a un meilleur rapport qualité cuite que la bière ce truc)");
var SEC = new CategorizedItem("sec", "chope or.png", "global", "Le Sec, devise monétaire en cours pour les rachats d'insigne divers. VERRE!");
var VOMI = new CategorizedMaterial("vomi", "cl", "vomiting.svg", "global", "[malus] Le vomi (en centilitres). Bon je vais pas te faire un dessin... ha mais si je vais t'en faire un. <a href=\"https://tiny.cc/d4ze8y\">Voilà</a>... pardon aux familles toussa toussa.<br>Et surtout il ne faut pas dépacer 1litron de vomi (à un rythme de 100cl de vomi par VT c'est vite arrivé) sinon c'est le Mort.");
var TRAQUENARD = new CategorizedItem("traquenard", "panda.png", "insigne", "Panda: Personne se faisant traquenader un peu trop facilement. (+1 par congrès participé)");
var PACHY = new CategorizedMaterial("subtilitruc", "g", "pachy.png", "insigne", "le pachy, pour les gens qui n'ont pas la ... , oui ce machin là, la subtilitruc");
var CAPOTE = new CategorizedItem("capote", "x/condom.png", "global", "Le sesque c'est bien, avec une capote c'est mieux, avec 2 capotes ... non vous êtes pas prêts. Capotte: permet de sexer une fois.");
var ANNEAU = new CategorizedItem("anneau", "anneau.png", "insigne", "la bague ou l'anneau, représentant les liens sacrés du mariage faluchard, où 2 personnes (ou +) se jurent infidélité jusqu'à ce que la mo.. le PLS les sépare.");
var PENDU = new CategorizedItem("pendu", "pendu.png", "insigne", "Le(a) pendu(e): Marié(e)");
var CROIX_GM = new CategorizedItem("Croix de GM", "croix_GM.png", "insigne", "la croix de grand maistre");
var POIREAU = new CategorizedItem("poireau/betterave", "x/poireau-betterave.png", "insigne", "Se faire prendre en train de faire des bisous là où on fait pipi.");
var CAROTTE = new CategorizedItem("carotte", "x/carotte.png", "insigne", "Se faire prendre en train de copuler");
var NAVET = new CategorizedItem("navet", "x/navet.png", "insigne", "Se faire prendre en train de titiller le sphincter anal d'autrui.");
var SESQUE = new CategorizedItem("sesque", "x/flying.png", "insigne", "Le sesque (flying foufoune et flying pénis), ben à chaque fois que tu choppes tu gagnes cet insigne. Pourquoi? Ben fallait bien un moyen pour compter combien de fois tu as choppé.");
var MISSIONNAIRE = new CategorizedItem("missionnaire", "x/missionnaire.png", "insigne", "Position sescuelle (non pas SQL) la seule tolérée pas l'Église.");
var POSITION69 = new CategorizedItem("69", "x/69.png", "insigne", "la position 69: poils aux dents!");
var LEVRETTE = new CategorizedItem("levrette", "x/levrette.png", "insigne", "La levrette: femelle du levrier");
var VIRGINITE = new CategorizedItem("feuille de vigne/rose", "x/vigne-rose.png", "insigne", "Perte de la viriginité");
var FIN_BAISEUR = new CategorizedItem("pensée/epée", "x/fin-baiseur.png", "insigne", "Fin(e) baiseur(se) ou expert(e)");
var LIME = new CategorizedItem("lime", "x/lime.png", "insigne", "[malus] Ivre, virgule, il/elle essaye de baiser. Bon on connait tous le résultat, ça bande mou, ça fait l'étoile de mer un veritable Acte laborieux");
var ADOPTION_INGE = new CategorizedItem("adoption ingé", "filieres/adopt_inge.png", "emblème", "Adopfion ingé");
var ADOPTION_SCIENCES = new CategorizedItem("adoption sciences", "filieres/adopt_sciences.png", "emblème", "Adopfion sciences");
var ADOPTION_DROIT = new CategorizedItem("adoption droit", "filieres/adopt_droit.png", "emblème", "Adopfion droit");
var ADOPTION_JAUNE = new CategorizedItem("adoption jaune", "filieres/adopt_jaune.png", "emblème", "Adopfion jaune");
var ADOPTION_ROSE = new CategorizedItem("adoption rose", "filieres/adopt_paramed.png", "emblème", "Adopfion rose");
var ADOPTION_SAGE_POUF = new CategorizedItem("adoption sage-pouf", "filieres/adopt_sage-pouf.png", "emblème", "Adopfion sage-pouf");
var ADOPTION_PHARMA = new CategorizedItem("adoption pharma", "filieres/adopt_pharma.png", "emblème", "Adopfion pharma");
var ADOPTION_MEDECINE = new CategorizedItem("adoption médecine", "filieres/adopt_medecine.png", "emblème", "Adopfion médecine");
var PINS_INGE = new CategorizedItem("pin's ingé", "filieres/etoile et foudre.png", "emblème", "pin's ingé");
var PINS_SCIENCES = new CategorizedItem("pin's sciences", "filieres/palmes croisees.png", "emblème", "pin's sciences");
var PINS_DROIT = new CategorizedItem("pin's droit", "filieres/balance romaine.png", "emblème", "pin's droit");
var PINS_JAUNE = new CategorizedItem("pin's jaune", "filieres/livre ouvert et plume.png", "emblème", "pin's jaune");
var PINS_ROSE = new CategorizedItem("pin's rose", "filieres/ciseaux.png", "emblème", "pin's rose");
var PINS_SAGE_POUF = new CategorizedItem("pin's sage-pouf", "filieres/croix ankh.png", "emblème", "pin's sage-pouf");
var PINS_PHARMA = new CategorizedItem("pin's Pharma", "filieres/caducee pharmacie.png", "emblème", "pin's Pharma");
var PINS_MEDECINE = new CategorizedItem("pin's Médecine", "filieres/caducee medecine.png", "emblème", "pin's Médecine");
var PINS_LYON = new CategorizedItem("pin's Lyon", "villes/Lyon.png", "ville", "pin's Lyon");
var PINS_GRENOBLE = new CategorizedItem("pin's Grenoble", "villes/Grenoble.svg", "ville", "pin's Grenoble");
var PINS_VALENCE = new CategorizedItem("pin's Valence", "villes/Valence.svg", "ville", "pin's Valence");
var PINS_CLERMONT = new CategorizedItem("pin's Clermont", "villes/ClermontFerrand.svg", "ville", "pin's Clermont");
var PINS_DIJON = new CategorizedItem("pin's Dijon", "villes/Dijon.svg", "ville", "pin's Dijon");
var PINS_MONPEUL = new CategorizedItem("pin's Monpeul", "villes/Montpellier.svg", "ville", "pin's Monpeul");
var PINS_MARSEILLE = new CategorizedItem("pin's Marseille", "villes/Marseille.svg", "ville", "pin's Marseille");
var PINS_NANCY = new CategorizedItem("pin's Nancy", "villes/Nancy.svg", "ville", "pin's Nancy");
var PINS_STASBOURG = new CategorizedItem("pin's Strasbourg", "villes/Strasbourg.svg", "ville", "pin's Strasbourg");
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
var resourceList = [
    FALUCHE, TEMPS, DISTANCE, TELLIGENCE, PARRAIN, CODE_VILLE, SINGE, BACCHUS, POULE,
    POINT_COUTURE, CONGRES, CHANT, CLE_DE_SOL, CASSEROLE, CH3CH2OH, BIÈRE, VIN, SEC, VOMI, TRAQUENARD, PACHY, CAPOTE, ANNEAU, PENDU, CROIX_GM,
    POIREAU, CAROTTE, NAVET, SESQUE, MISSIONNAIRE, POSITION69, LEVRETTE, VIRGINITE, FIN_BAISEUR, LIME,
    ADOPTION_INGE, ADOPTION_SCIENCES, ADOPTION_DROIT, ADOPTION_JAUNE, ADOPTION_ROSE, ADOPTION_SAGE_POUF, ADOPTION_PHARMA, ADOPTION_MEDECINE,
    PINS_INGE, PINS_SCIENCES, PINS_DROIT, PINS_JAUNE, PINS_ROSE, PINS_SAGE_POUF, PINS_PHARMA, PINS_MEDECINE,
    PINS_LYON, PINS_GRENOBLE, PINS_VALENCE, PINS_CLERMONT, PINS_DIJON, PINS_MONPEUL, PINS_MARSEILLE, PINS_NANCY, PINS_STASBOURG
];
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
            new Trigger("Sympatisant(e)")
                .whenReached(Q(5, PINS_INGE))
                .spawnCrafter(new Crafter("Apéro ingé")
                .thatCraft(new RandomRangeQuantity(2, 5, PINS_INGE))
                .andCraft(new RandomResource(1, PINS_SCIENCES, 0.02))["in"](2).seconds()
                .atCostOf(Q(1, TEMPS)))
                .spawnResource(Q(1, LEVEL))
                .appendTrigger(new Trigger("Impétrant(e)")
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
                .spawnCrafter(new Crafter("Prendre un sec")
                .thatCraft(Q(1, CH3CH2OH))
                .andCraft(Q(1, SEC))["in"](1).seconds()
                .atCostOf(Q(50, BIÈRE)))
                .spawnCrafter(new Crafter("VT")
                .thatCraft(Q(10, VOMI))["in"](3).seconds()
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
                .appendTrigger(new Trigger("Coma")
                .whenReached(Q(100, VOMI))
                .thenLoose())
                .appendTrigger(new Trigger("Indignité dans l'ivresse")
                .whenReached(Q(10, VOMI))
                .spawnResource(Q(-1, BACCHUS)))
                .appendTrigger(new Trigger("Parrainé(e)")
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
                .spawnResource(Q(-2, CH3CH2OH))
                .spawnResource(Q(-15, SEC))
                .spawnResource(Q(1, BACCHUS))
                .spawnResource(Q(1, FALUCHE))
                .spawnResource(Q(1, LEVEL))
                .appendTrigger(Scenario.triggerFal())))))
        ];
        return engine;
    };
    Scenario.triggerFal = function () {
        var coefDistance = 50;
        return new Trigger("Bébé Faluchard(e)")
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
            .thatCraft(new AdaptativeQuantity().ifHas(Q(4, CH3CH2OH)).give(Q(1, CASSEROLE)).elseGive(Q(1, CHANT)).showTheQuantityIfNot())["in"](5).seconds())
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
            .spawnResource(Q(-2, CH3CH2OH))
            .spawnResource(Q(-15, SEC)))
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
            .spawnResource(Q(-2, CH3CH2OH))
            .spawnResource(Q(-15, SEC)))
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
            .spawnResource(Q(-2, CH3CH2OH))
            .spawnResource(Q(-15, SEC)))
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
            .spawnResource(Q(-2, CH3CH2OH))
            .spawnResource(Q(-15, SEC)))
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
            .spawnResource(Q(-2, CH3CH2OH))
            .spawnResource(Q(-15, SEC)))
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
            .spawnResource(Q(-2, CH3CH2OH))
            .spawnResource(Q(-15, SEC)))
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
            .spawnResource(Q(-2, CH3CH2OH))
            .spawnResource(Q(-15, SEC)))
            .appendTrigger(new Trigger("[secondaire] quémendeur d'insignes")
            .whenReached(Q(1, ADOPTION_SCIENCES))
            .and(Q(1, ADOPTION_DROIT))
            .and(Q(1, ADOPTION_JAUNE))
            .and(Q(1, ADOPTION_ROSE))
            .and(Q(1, ADOPTION_SAGE_POUF))
            .and(Q(1, ADOPTION_PHARMA))
            .and(Q(1, ADOPTION_MEDECINE))
            .spawnResource(Q(1, SINGE)));
    };
    Scenario.triggerCouture = function () {
        var coefDistance = 100;
        return new Trigger("Couture")
            .whenReached(Q(30, PINS_INGE))
            .and(Q(50, POINT_COUTURE))
            .and(Q(100, DISTANCE))
            .spawnResource(Q(1, LEVEL))
            .spawnResource(Q(-50, POINT_COUTURE))
            .spawnCrafter(new Crafter("Clé de sol")
            .thatCraft(Q(1, CLE_DE_SOL))
            .atCostOf(Q(30, CHANT))["in"](20).seconds()
            .automaticaly())
            .spawnCrafter(new Crafter("Rachat de Bacchus")
            .thatCraft(Q(1, BACCHUS))
            .andCraft(Q(20, VOMI))
            .atCostOf(Q(40, SEC))
            .atCostOf(Q(8, CH3CH2OH))
            .atCostOf(Q(1, PARRAIN))
            .atCostOf(Q(1, CLE_DE_SOL))["in"](1).minutes())
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
            .thatCraft(Q(2, CAPOTE))
            .thatCraft(Q(1, TRAQUENARD))["in"](1).minutes()
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
            .thatCraft(Q(2, CAPOTE))
            .thatCraft(Q(1, TRAQUENARD))["in"](1).minutes()
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
            .thatCraft(Q(2, CAPOTE))
            .thatCraft(Q(1, TRAQUENARD))["in"](1).minutes()
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
            .thatCraft(Q(1, MISSIONNAIRE))
            .andCraft(new AdaptativeQuantity().ifHas(Q(5, CH3CH2OH)).give(Q(1, LIME)).elseGive(Q(1, SESQUE)).showTheQuantityIfNot())
            .andCraft(new RandomResource(1, CAROTTE, 0.1))["in"](42).seconds()
            .atCostOf(Q(1, CAPOTE))).appendTrigger(new Trigger("Perte de virginité")
            .whenReached(Q(1, SESQUE))
            .spawnResource(Q(1, VIRGINITE))
            .spawnCrafter(new Crafter("Chopper en 69")
            .thatCraft(Q(1, POSITION69))
            .andCraft(new AdaptativeQuantity().ifHas(Q(5, CH3CH2OH)).give(Q(1, LIME)).elseGive(Q(1, SESQUE)).showTheQuantityIfNot())
            .andCraft(new RandomResource(1, POIREAU, 0.1))["in"](42).seconds()
            .atCostOf(Q(1, CAPOTE)))
            .appendTrigger(new Trigger("Potager")
            .whenReached(Q(4, SESQUE))
            .and(Q(2, POSITION69))
            .spawnCrafter(new Crafter("Chopper en levrette")
            .thatCraft(Q(1, LEVRETTE))
            .andCraft(new AdaptativeQuantity().ifHas(Q(5, CH3CH2OH)).give(Q(1, LIME)).elseGive(Q(1, SESQUE)).showTheQuantityIfNot())
            .andCraft(new RandomResource(1, NAVET, 0.1))["in"](42).seconds()
            .atCostOf(Q(1, CAPOTE))).spawnCrafter(new Crafter("Expert(e)")
            .thatCraft(new RandomRangeQuantity(0, 1, FIN_BAISEUR))["in"](30).seconds()
            .atCostOf(Q(5, MISSIONNAIRE))
            .and(Q(5, POSITION69))
            .and(Q(5, LEVRETTE))
            .and(Q(1, PINS_INGE))).spawnCrafter(new Crafter("Rachat de lime")
            .thatCraft(Q(-1, LIME))["in"](42).seconds()
            .atCostOf(Q(3, FIN_BAISEUR))
            .atCostOf(Q(1, CAPOTE))
            .atCostOf(Q(5, CHANT))
            .atCostOf(Q(10, BIÈRE))
            .atCostOf(Q(17, SEC))))).appendTrigger(new Trigger("[secondaire] Potager")
            .whenReached(Q(2, CAROTTE))
            .and(Q(2, POIREAU))
            .and(Q(2, NAVET))
            .spawnResource(Q(1, POULE))).appendTrigger(this.triggerAncien());
    };
    Scenario.triggerAncien = function () {
        return new Trigger("Ancien(e)")
            .whenReached(Q(2, CLE_DE_SOL))
            .and(Q(40, TRAQUENARD))
            .and(Q(1, VIRGINITE))
            .and(Q(1, FIN_BAISEUR))
            .spawnResource(Q(1, LEVEL))
            .spawnProducer(new Producer("Cubi de rouge")
            .thatProduce(Q(1, VIN))
            .every(1).seconds())
            .spawnCrafter(new Crafter("Sec de vin")
            .thatCraft(Q(3, CH3CH2OH))
            .andCraft(Q(5, SEC))["in"](1).seconds()
            .atCostOf(Q(20, VIN)))
            .spawnCrafter(new Crafter("Rachat de casserole")
            .thatCraft(Q(-1, CASSEROLE))["in"](42).seconds()
            .atCostOf(Q(5, CHANT))
            .atCostOf(Q(10, BIÈRE))
            .atCostOf(Q(30, SEC))
            .and(Q(10, POINT_COUTURE)))
            .spawnCrafter(new Crafter("Mariage fal, se jurer infidélité")
            .thatCraft(Q(1, ANNEAU))["in"](1).minutes()
            .atCostOf(Q(1, PARRAIN))
            .atCostOf(Q(1, CAPOTE))
            .atCostOf(Q(3, MISSIONNAIRE))
            .atCostOf(Q(5, SEC))
            .atCostOf(Q(1, PINS_INGE)))
            .appendTrigger(new Trigger('Sonic le hérisson')
            .whenReached(Q(10, ANNEAU))
            .and(Q(10, LEVRETTE))
            .and(Q(10, POSITION69))
            .spawnResource(Q(-10, LEVRETTE))
            .spawnResource(Q(-10, POSITION69))
            .spawnResource(Q(1, PENDU)))
            .appendTrigger(new Trigger('Hypothétique')
            .whenReached(Q(1, BACCHUS))
            .and(Q(50, TRAQUENARD))
            .and(Q(1, PENDU))
            .and(Q(200, POINT_COUTURE))
            .and(Q(200, VIN))
            .spawnResource(Q(1, LEVEL))
            .appendTrigger(new Trigger('Intronisation')
            .whenReached(Q(8, CODE_VILLE))
            .and(Q(3, PARRAIN))
            .and(Q(30, SEC))
            .and(Q(9, CH3CH2OH))
            .and(Q(100, PINS_INGE))
            .and(Q(61, PINS_SCIENCES))
            .and(Q(60, PINS_DROIT))
            .and(Q(60, PINS_JAUNE))
            .and(Q(40, PINS_ROSE))
            .and(Q(40, PINS_SAGE_POUF))
            .and(Q(40, PINS_PHARMA))
            .and(Q(40, PINS_MEDECINE))
            .and(Q(90, PINS_GRENOBLE))
            .and(Q(80, PINS_VALENCE))
            .and(Q(70, PINS_CLERMONT))
            .and(Q(60, PINS_DIJON))
            .and(Q(50, PINS_MONPEUL))
            .and(Q(40, PINS_MARSEILLE))
            .and(Q(30, PINS_NANCY))
            .and(Q(20, PINS_STASBOURG))
            .and(Q(1, CAPOTE))
            .spawnResource(Q(1, CROIX_GM))
            .spawnResource(Q(1, LEVEL))
            .thenWin()));
    };
    return Scenario;
}());
//# sourceMappingURL=Scenario.js.map