/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IQuantity.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
/// <reference path="../Engine/Engine.ts" />

/// <reference path="./Material.ts" />
/// <reference path="./Item.ts" />
/// <reference path="./Level.ts" />
/// <reference path="./Scenario.ts" />

const VERSION = "1.22";

const LEVEL = new Level("level", "level");
const CLAY = new Material("clay", "g", "clay");
const WATER = new Material("water", "cl", "water");
const WOOD = new Material("wood", "g", "wood");
const CHARCOAL = new Material("charcoal", "g", "charcoal");
const IRON_ORE = new Material("iron ore", "g", "iron_ore");
const IRON = new Material("iron", "g", "iron");
const CLAY_POT = new Item("clay pot", "clay_pot");
const BRICK = new Item("brick", "brick");
const TERRACOTTA_POT = new Item("terracotta pot", "terracotta_pot");
const EMPTY_TRASH = new Item("empty trash", "empty_trash");
const FULL_TRASH = new Item("full trash", "full_trash");
const KNIFE = new Item("knife", "knife");
const AXE = new Item("axe", "axe");

function loadEngine() : Engine | null {

    let json = window.localStorage.getItem('DesertIsland');
    if (json != null) {
        if ((window.localStorage.getItem('DesertIslandVersion') != null)
            || (window.localStorage.getItem('DesertIslandVersion') == VERSION)) {
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
    window.localStorage.setItem('DesertIsland', JSON.stringify(engine));
    window.localStorage.setItem('DesertIslandVersion', VERSION);
}

var engine : Engine;
let e = loadEngine();
if (!e) {
    engine = Scenario.initEngine();
} else {
    engine = e;
}
