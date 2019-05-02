var VERSION = "1.0";
function loadEngine() {
    var json = window.localStorage.getItem('Fal');
    if (json != null) {
        if ((window.localStorage.getItem('FalVersion') != null)
            || (window.localStorage.getItem('FalVersion') == VERSION)) {
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
    window.localStorage.setItem('Fal', JSON.stringify(engine));
    window.localStorage.setItem('FalVersion', VERSION);
}
var engine;
var e = loadEngine();
if (!e) {
    engine = Scenario.initEngine();
}
else {
    engine = e;
}
//# sourceMappingURL=App.js.map