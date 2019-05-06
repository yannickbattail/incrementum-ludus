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
/// <reference path="./Material.ts" />
/// <reference path="./Item.ts" />
/// <reference path="./Level.ts" />

const LEVEL = new NamedStepResource("level", "level.svg", [
    "NOTHING",
    "Moldus",
    "Sympatisant",
    "Impétrent",
    "Néo",
    "Parrainé",
    "Baptisable",
    "Faluchard"
]);
const TEMPS = new Item("temps", "time.png");
const PARRAIN = new Item("parrain", "food.svg");
const CODE_VILLE = new Item("code de ville", "etoile_or.png");

const FALUCHE = new Item("adoption", "faluche.png");

const ADOPTION_INGE = new Item("adoption ingé", "faluche.png");
const ADOPTION_SCIENCES = new Item("adoption sciences", "faluche.png");
const ADOPTION_DROIT = new Item("adoption droit", "faluche.png");
const ADOPTION_JAUNE = new Item("adoption jaune", "faluche.png");
const ADOPTION_ROSE = new Item("adoption rose", "faluche.png");
const ADOPTION_SAGE_POUF = new Item("adoption sage-pouf", "faluche.png");
const ADOPTION_PHARMA = new Item("adoption Pharma", "faluche.png");
const ADOPTION_MEDECINE = new Item("adoption Médecine", "faluche.png");

const PINS_INGE = new Item("pin's ingé", "pins_gris.png");
const PINS_SCIENCES = new Item("pin's sciences", "pins_gris.png");
const PINS_DROIT = new Item("pin's droit", "pins_gris.png");
const PINS_JAUNE = new Item("pin's jaune", "pins_gris.png");
const PINS_ROSE = new Item("pin's rose", "pins_gris.png");
const PINS_SAGE_POUF = new Item("pin's sage-pouf", "pins_gris.png");
const PINS_PHARMA = new Item("pin's Pharma", "pins_gris.png");
const PINS_MEDECINE = new Item("pin's Médecine", "pins_gris.png");

const PINS_GRENOBLE = new Item("pin's Grenoble", "pins.png");
const PINS_STASBOURG = new Item("pin's Strasbourg", "pins.png");
const PINS_MONPEUL = new Item("pin's Monpeul", "pins.png");
const PINS_VALENCE = new Item("pin's Valence", "pins.png");
const PINS_MARSEILLE = new Item("pin's Marseille", "pins.png");
const PINS_DIJON = new Item("pin's Dijon", "pins.png");
const PINS_CLERMONT = new Item("pin's Clermont", "pins.png");
const PINS_NANCY = new Item("pin's Nancy", "pins.png");


let Q = (quantity : number, res : IResource) => new Quantity(quantity, res);

class Scenario {
    public static initEngine() : Engine {

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
                .thatCraft(new RandomRangeQuantity(0, 2, PINS_INGE))
                .in(2).seconds()
                .atCostOf(Q(1, TEMPS))
        ];

        engine.triggers = [
            new Trigger("Sympatisant")
                .whenReached(Q(5, PINS_INGE))
                .spawnCrafter(
                    new Crafter("Apéro ingé")
                        .thatCraft(new RandomRangeQuantity(2, 5, PINS_INGE))
                        .andCraft(new RandomResource(1, PINS_SCIENCES, 0.02))
                        .in(2).seconds()
                        .atCostOf(Q(1, TEMPS))
                )
                .spawnResource(Q(1, LEVEL)) // level 2
                .appendTrigger(
                    new Trigger("Impétrent")
                        .whenReached(Q(50, PINS_INGE))
                        .spawnProducer(
                            new Producer("Temps / jours")
                                .thatProduce(Q(10, TEMPS))
                                .every(30).seconds()
                        )
                        .spawnCrafter(
                            new Crafter("Apéro fal lyonnais")
                                .thatCraft(new RandomResource(1, PINS_INGE, 0.3))
                                .thatCraft(new RandomResource(1, PINS_SCIENCES, 0.3))
                                .thatCraft(new RandomResource(1, PINS_DROIT, 0.3))
                                .thatCraft(new RandomResource(1, PINS_JAUNE, 0.3))
                                .thatCraft(new RandomResource(1, PINS_ROSE, 0.3))
                                .thatCraft(new RandomResource(1, PINS_SAGE_POUF, 0.3))
                                .thatCraft(new RandomResource(1, PINS_PHARMA, 0.3))
                                .thatCraft(new RandomResource(1, PINS_MEDECINE, 0.3))
                                .in(3).seconds()
                                .atCostOf(Q(2, TEMPS))
                        )
                        .spawnResource(Q(1, LEVEL)) // level 3
                        .appendTrigger(
                            new Trigger("Néo")
                                .whenReached(Q(1, PINS_INGE))
                                .whenReached(Q(1, PINS_SCIENCES))
                                .whenReached(Q(1, PINS_DROIT))
                                .whenReached(Q(1, PINS_JAUNE))
                                .whenReached(Q(1, PINS_ROSE))
                                .whenReached(Q(1, PINS_SAGE_POUF))
                                .whenReached(Q(1, PINS_PHARMA))
                                .whenReached(Q(1, PINS_MEDECINE))
                                .spawnCrafter(
                                    new Crafter("Apéro fal hebdomadaire")
                                        .thatCraft(new RandomResource(1, PINS_INGE, 0.4))
                                        .thatCraft(new RandomResource(1, PINS_SCIENCES, 0.4))
                                        .thatCraft(new RandomResource(1, PINS_DROIT, 0.4))
                                        .thatCraft(new RandomResource(1, PINS_JAUNE, 0.4))
                                        .thatCraft(new RandomResource(1, PINS_ROSE, 0.3))
                                        .thatCraft(new RandomResource(1, PINS_SAGE_POUF, 0.3))
                                        .thatCraft(new RandomResource(1, PINS_PHARMA, 0.3))
                                        .thatCraft(new RandomResource(1, PINS_MEDECINE, 0.3))
                                        .in(3).seconds()
                                        .atCostOf(Q(2, TEMPS))
                                        .canBeSwitchedToAuto()
                                )
                                .spawnCrafter(
                                    new Crafter("Trouver des parrains marraines")
                                        .thatCraft(Q(1, PARRAIN))
                                        .in(20).seconds()
                                        .atCostOf(Q(8, PINS_INGE))
                                        .atCostOf(Q(6, PINS_SCIENCES))
                                        .atCostOf(Q(6, PINS_DROIT))
                                        .atCostOf(Q(6, PINS_JAUNE))
                                        .atCostOf(Q(6, PINS_ROSE))
                                        .atCostOf(Q(6, PINS_SAGE_POUF))
                                        .atCostOf(Q(6, PINS_PHARMA))
                                        .atCostOf(Q(6, PINS_MEDECINE))
                                )
                                .spawnResource(Q(1, LEVEL)) // level 4
                                .appendTrigger(
                                    new Trigger("Parrainé")
                                        .whenReached(Q(2, PARRAIN))
                                        .spawnCrafter(
                                            new Crafter("Apprentissage du code")
                                                .thatCraft(Q(1, CODE_VILLE))
                                                .in(30).seconds()
                                                .atCostOf(Q(4, PINS_INGE))
                                                .atCostOf(Q(4, PINS_SCIENCES))
                                                .atCostOf(Q(4, PINS_DROIT))
                                                .atCostOf(Q(4, PINS_JAUNE))
                                                .atCostOf(Q(4, PINS_ROSE))
                                                .atCostOf(Q(4, PINS_SAGE_POUF))
                                                .atCostOf(Q(4, PINS_PHARMA))
                                                .atCostOf(Q(4, PINS_MEDECINE))
                                        )
                                        .spawnResource(Q(1, LEVEL)) // level 5
                                        .appendTrigger(
                                            new Trigger("Baptisable")
                                                .whenReached(Q(1, CODE_VILLE))
                                                .spawnCrafter(
                                                    new Crafter("Baptême")
                                                        .thatCraft(Q(1, FALUCHE)).andCraft(Q(1, PINS_GRENOBLE))
                                                        .in(30).seconds()
                                                        .atCostOf(Q(1, CODE_VILLE)).and(Q(2, PARRAIN))
                                                )
                                                .spawnResource(Q(1, LEVEL)) // level 6
                                                .appendTrigger(Scenario.triggerFal()) // level 7
                                        )
                                )
                        )
                )
        ];
        return engine;
    }

    private static triggerFal() : ITrigger {
        return new Trigger("Faluchard")
            .whenReached(Q(1, FALUCHE))
            .spawnResource(Q(1, LEVEL)) // level 7
            .spawnProducer(
                new Producer("Temps / jours")
                    .thatProduce(Q(10, TEMPS))
                    .every(30).seconds()
            )
            .spawnCrafter(
                new Crafter("Adoption sciences")
                    .thatCraft(Q(1, ADOPTION_SCIENCES))
                    .in(30).seconds()
                    .atCostOf(Q(1, CODE_VILLE)).and(Q(1, PARRAIN)).and(Q(40, PINS_SCIENCES))
            )
            .spawnCrafter(
                new Crafter("Adoption droit")
                    .thatCraft(Q(1, ADOPTION_DROIT))
                    .in(30).seconds()
                    .atCostOf(Q(1, CODE_VILLE)).and(Q(1, PARRAIN)).and(Q(40, PINS_DROIT))
            )
            .spawnCrafter(
                new Crafter("Adoption jaune")
                    .thatCraft(Q(1, ADOPTION_JAUNE))
                    .in(30).seconds()
                    .atCostOf(Q(1, CODE_VILLE)).and(Q(1, PARRAIN)).and(Q(40, PINS_JAUNE))
            )
            .spawnCrafter(
                new Crafter("Adoption rose")
                    .thatCraft(Q(1, ADOPTION_ROSE))
                    .in(30).seconds()
                    .atCostOf(Q(1, CODE_VILLE)).and(Q(1, PARRAIN)).and(Q(40, PINS_ROSE))
            )
            .spawnCrafter(
                new Crafter("Adoption sage-pouf")
                    .thatCraft(Q(1, ADOPTION_SAGE_POUF))
                    .in(30).seconds()
                    .atCostOf(Q(1, CODE_VILLE)).and(Q(1, PARRAIN)).and(Q(40, PINS_SAGE_POUF))
            )
            .spawnCrafter(
                new Crafter("Adoption pharma")
                    .thatCraft(Q(1, ADOPTION_PHARMA))
                    .in(30).seconds()
                    .atCostOf(Q(1, CODE_VILLE)).and(Q(1, PARRAIN)).and(Q(40, PINS_PHARMA))
            )
            .spawnCrafter(
                new Crafter("Adoption médecine")
                    .thatCraft(Q(1, ADOPTION_MEDECINE))
                    .in(30).seconds()
                    .atCostOf(Q(1, CODE_VILLE)).and(Q(1, PARRAIN)).and(Q(40, PINS_MEDECINE))
            )
            .appendTrigger(
                new Trigger("pu** à adoption")
                    .whenReached(Q(1, ADOPTION_SCIENCES))
                    .and(Q(1, ADOPTION_DROIT))
                    .and(Q(1, ADOPTION_JAUNE))
                    .and(Q(1, ADOPTION_ROSE))
                    .and(Q(1, ADOPTION_SAGE_POUF))
                    .and(Q(1, ADOPTION_PHARMA))
                    .and(Q(1, ADOPTION_MEDECINE))
                    .spawnResource(Q(1, LEVEL)) // level 6

            );
    }
}
