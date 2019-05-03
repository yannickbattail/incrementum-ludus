var VERSION = "2.3";
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