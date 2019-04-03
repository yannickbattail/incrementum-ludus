var VERSION = "1.7";
var LEVEL = new Level("level", "level");
var CLAY = new Material("clay", "g", "clay");
var WATER = new Material("water", "cl", "water");
var WOOD = new Material("wood", "g", "wood");
var CHARCOAL = new Material("charcoal", "g", "charcoal");
var IRON_ORE = new Material("iron ore", "g", "iron_ore");
var CLAY_POT = new Item("clay pot", "clay_pot");
var BRICK = new Item("brick", "brick");
var TERRACOTTA_POT = new Item("terracotta pot", "terracotta_pot");
function loadEngine() {
    var json = window.localStorage.getItem('DesertIsland');
    if (json != null) {
        if ((window.localStorage.getItem('DesertIslandVersion') != null)
            || (window.localStorage.getItem('DesertIslandVersion') == VERSION)) {
            console.log('load engine');
            var obj = JSON.parse(json);
            return obj;
        }
        console.log('wong version');
    }
    console.log('no engine');
    return null;
}
function saveEngine(engine) {
    window.localStorage.SetItem('DesertIsland', JSON.stringify(engine));
    window.localStorage.SetItem('DesertIslandVersion', VERSION);
}
var engine;
engine = Scenario.initEngine();
//# sourceMappingURL=DesertIsland.js.map