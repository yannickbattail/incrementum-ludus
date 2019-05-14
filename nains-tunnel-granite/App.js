var VERSION = "1.1";
function loadEngine() {
    var json = window.localStorage.getItem('NainTunnelGranite');
    if (json != null) {
        if ((window.localStorage.getItem('NainTunnelGraniteVersion') != null)
            || (window.localStorage.getItem('NainTunnelGraniteVersion') == VERSION)) {
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
    window.localStorage.setItem('NainTunnelGranite', JSON.stringify(engine));
    window.localStorage.setItem('NainTunnelGraniteVersion', VERSION);
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