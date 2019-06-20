/// <reference path="../IncrementumLudus/interfaces/IResource.ts" />
/// <reference path="../IncrementumLudus/interfaces/IQuantity.ts" />
/// <reference path="../IncrementumLudus/interfaces/IProducer.ts" />
/// <reference path="../IncrementumLudus/interfaces/ITrigger.ts" />
/// <reference path="../IncrementumLudus/interfaces/ICrafter.ts" />
/// <reference path="../IncrementumLudus/interfaces/IPlayer.ts" />
/// <reference path="../IncrementumLudus/implementations/Resource.ts" />
/// <reference path="../IncrementumLudus/implementations/Quantity.ts" />
/// <reference path="../IncrementumLudus/implementations/Crafter.ts" />
/// <reference path="../IncrementumLudus/implementations/Producer.ts" />
/// <reference path="../IncrementumLudus/implementations/Trigger.ts" />
/// <reference path="../IncrementumLudus/implementations/Player.ts" />
/// <reference path="../IncrementumLudus/IncrementumLudus.ts" />

const IRON = new Resource("iron");
const COPPER = new Resource("copper");
const LEAD = new Resource("lead");
const TIN = new Resource("tin");
const WATER = new Resource("water");
const AXE = new Resource("axe");
const KNIFE = new Resource("knife");
const BEER = new Resource("beer");
const WASTE = new Resource("waste");

function testCallback() : void {
    window.alert("testCallback when water source triggered.");
}

function initEngine() : IncrementumLudus {
    let engine = new IncrementumLudus();
    engine.player = new Player("platypus");
    engine.producers = [
        // initals producers
        new Producer("iron mine", [new Quantity(2, IRON)], 500/*mili sec*/),
        new Producer("copper mine", [new Quantity(1, COPPER)], 3000),
        new Producer("tin", [new Quantity(1, TIN)])
    ];
    engine.crafters = [
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
    engine.triggers = [
        new Trigger("lead mine exploitation")
            .whenReached(new Quantity(20, IRON)).and(new Quantity(2, COPPER))
            .spawnProducer(
                new Producer("lead mine")
                    .thatProduce(new Quantity(1, LEAD)).every(5).seconds()
            ),
        new Trigger("water source")
            .whenReached(new Quantity(10, TIN))
            .spawnProducer(
                new Producer("water source")
                    .thatProduce(new Quantity(1, WATER))
            )
            .spawnResource(new Quantity(10, WATER))
            .appendTrigger(
                new Trigger("win")
                    .whenReached(new Quantity(30, WATER))
                    .thenWin()
            )
            .appendTrigger(
                new Trigger("beer brewering")
                    .whenReached(new Quantity(20, WATER))
                    .spawnCrafter(
                        new Crafter("brewery")
                            .thatCraft(new Quantity(1, BEER))
                            .in(20).seconds()
                            .atCostOf(new Quantity(20, WATER)).and(new Quantity(1, TIN))
                            .canBeSwitchedToAuto()
                )
            )
            .execFunction(testCallback)
    ];
    return engine;
}

const VERSION = "1.4";
function loadIncrementumLudus() : IncrementumLudus | null {

    let json = window.localStorage.getItem('ExampleTest');
    if (json != null) {
        if ((window.localStorage.getItem('ExampleTestVersion') != null)
            || (window.localStorage.getItem('ExampleTestVersion') == VERSION)) {
            let obj : IncrementumLudus = JSON.parse(json);
            console.log('load IncrementumLudus');
            let curContext : any = window;
            return curContext[obj.$type].load(obj);
        }
        console.log('wrong version');
    }
    console.log('no IncrementumLudus');
    return null;
}
function saveIncrementumLudus(IncrementumLudus : IncrementumLudus) {
    window.localStorage.setItem('ExampleTest', JSON.stringify(IncrementumLudus));
    window.localStorage.setItem('ExampleTestVersion', VERSION);
}

var engine = initEngine();
var engine2 = loadIncrementumLudus();
if (engine2 != null) {
    engine = engine2;
}
var engine : IncrementumLudus;
let e = loadIncrementumLudus();
if (!e) {
    engine = initEngine();
} else {
    engine = e;
}
