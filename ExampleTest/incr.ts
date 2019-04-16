/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IQuantity.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
/// <reference path="../Engine/implementations/Resource.ts" />
/// <reference path="../Engine/implementations/Quantity.ts" />
/// <reference path="../Engine/implementations/Crafter.ts" />
/// <reference path="../Engine/implementations/Producer.ts" />
/// <reference path="../Engine/implementations/Trigger.ts" />
/// <reference path="../Engine/implementations/Player.ts" />
/// <reference path="../Engine/Engine.ts" />

const IRON = new Resource("iron");
const COPPER = new Resource("copper");
const LEAD = new Resource("lead");
const TIN = new Resource("tin");
const WATER = new Resource("water");
const AXE = new Resource("axe");
const KNIFE = new Resource("knife");
const BEER = new Resource("beer");
const WASTE = new Resource("waste");

var engine = new Engine();
engine.Player = new Player("platypus");
engine.Producers = [
    // initals producers
    new Producer("iron mine", [new Quantity(2, IRON)], 500/*mili sec*/),
    new Producer("copper mine", [new Quantity(1, COPPER)], 3000),
    new Producer("tin", [new Quantity(1, TIN)])
];
engine.Triggers = [
    new Trigger("lead mine exploitation")
        .whenReached(20, IRON).and(2, COPPER)
        .spawnProducer(
            new Producer("lead mine")
                .thatProduce(1, LEAD).every(5).seconds()
        ),
    new Trigger("water source")
        .whenReached(10, TIN)
        .spawnProducer(
            new Producer("water source")
                .thatProduce(1, WATER)
        )
        .spawnResource(10, WATER)
        .appendTrigger(
            new Trigger("beer brewering")
                .whenReached(20, WATER)
                .spawnCrafter(
                    new Crafter("brewery")
                        .thatCraft(1, BEER)
                        .in(20).seconds()
                        .atCostOf(20, WATER).and(1, TIN)
            )
        )
];
engine.Crafters = [
    new Crafter("forge axe", 20000,//duration
        //cost
        [new Quantity(30, IRON), new Quantity(10, COPPER)],
        //spawn
        [new Quantity(1, AXE)], true/*auto*/),
    new Crafter("forge knife", 20000,//duration
        //cost
        [new Quantity(10, IRON), new Quantity(6, COPPER)],
        //spawn
        [new Quantity(1, KNIFE), new Quantity(2, WASTE)], false/*auto*/),
];

const VERSION = "1.1";
function loadEngine() : Engine | null {

    let json = window.localStorage.getItem('incr');
    if (json != null) {
        if ((window.localStorage.getItem('incrVersion') != null)
            || (window.localStorage.getItem('incrVersion') == VERSION)) {
            let obj : Engine = JSON.parse(json);
            console.log('load engine');
            let curContext : any = window;
            return curContext[obj.$type].load(obj);
        }
        console.log('wrong version');
    }
    console.log('no engine');
    return null;
}
function saveEngine(engine : Engine) {
    window.localStorage.setItem('incr', JSON.stringify(engine));
    window.localStorage.setItem('incrVersion', VERSION);
}

var engine2 = loadEngine();
if (engine2) {
    engine = engine2;
}