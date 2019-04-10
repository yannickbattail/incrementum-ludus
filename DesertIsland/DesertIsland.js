var VERSION = "1.9";
var LEVEL = new Level("level", "level");
var CLAY = new Material("clay", "g", "clay");
var WATER = new Material("water", "cl", "water");
var WOOD = new Material("wood", "g", "wood");
var CHARCOAL = new Material("charcoal", "g", "charcoal");
var IRON_ORE = new Material("iron ore", "g", "iron_ore");
var IRON = new Material("iron", "g", "iron");
var CLAY_POT = new Item("clay pot", "clay_pot");
var BRICK = new Item("brick", "brick");
var TERRACOTTA_POT = new Item("terracotta pot", "terracotta_pot");
var EMPTY_TRASH = new Item("empty trash", "empty_trash");
var FULL_TRASH = new Item("full trash", "full_trash");
var KNIFE = new Item("knife", "knife");
var AXE = new Item("axe", "axe");
function loadEngine() {
    var json = window.localStorage.getItem('DesertIsland');
    if (json != null) {
        if ((window.localStorage.getItem('DesertIslandVersion') != null)
            || (window.localStorage.getItem('DesertIslandVersion') == VERSION)) {
            var obj = JSON.parse(json);
            console.log('load engine');
            var curContext = window;
            return curContext[obj.$type].load(obj);
        }
        console.log('wrong version');
    }
    console.log('no engine');
    return null;
}
function saveEngine(engine) {
    window.localStorage.setItem('DesertIsland', JSON.stringify(engine));
    window.localStorage.setItem('DesertIslandVersion', VERSION);
}
var engine;
var e = loadEngine();
if (!e) {
    engine = Scenario.initEngine();
}
else {
    engine = e;
}
//# sourceMappingURL=DesertIsland.js.map