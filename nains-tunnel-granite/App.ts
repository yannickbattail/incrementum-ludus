/// <reference path="../IncrementumLudus/interfaces/IResource.ts" />
/// <reference path="../IncrementumLudus/interfaces/IQuantity.ts" />
/// <reference path="../IncrementumLudus/interfaces/IProducer.ts" />
/// <reference path="../IncrementumLudus/interfaces/ITrigger.ts" />
/// <reference path="../IncrementumLudus/interfaces/ICrafter.ts" />
/// <reference path="../IncrementumLudus/interfaces/IPlayer.ts" />
/// <reference path="../IncrementumLudus/IncrementumLudus.ts" />

/// <reference path="./Material.ts" />
/// <reference path="./Item.ts" />
/// <reference path="./Level.ts" />
/// <reference path="./Scenario.ts" />

const VERSION = "1.2";

function loadEngine() : IncrementumLudus | null {

    let json = window.localStorage.getItem('NainTunnelGranite');
    if (json != null) {
        if ((window.localStorage.getItem('NainTunnelGraniteVersion') != null)
            || (window.localStorage.getItem('NainTunnelGraniteVersion') == VERSION)) {
            let obj : IncrementumLudus = JSON.parse(json);
            console.log('load engine');
            let curContext : any = window;
            return curContext[obj.$type].load(obj);
        }
        console.log('wrong version');
    }
    console.log('no engine');
    return null;
}
function saveEngine(engine : IncrementumLudus) {
    window.localStorage.setItem('NainTunnelGranite', JSON.stringify(engine));
    window.localStorage.setItem('NainTunnelGraniteVersion', VERSION);
}

var engine : IncrementumLudus;
let e = loadEngine();
if (!e) {
    engine = Scenario.initEngine();
} else {
    engine = e;
}
