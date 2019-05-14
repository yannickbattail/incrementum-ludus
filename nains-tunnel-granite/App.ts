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

const VERSION = "1.1";

function loadEngine() : Engine | null {

    let json = window.localStorage.getItem('NainTunnelGranite');
    if (json != null) {
        if ((window.localStorage.getItem('NainTunnelGraniteVersion') != null)
            || (window.localStorage.getItem('NainTunnelGraniteVersion') == VERSION)) {
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
    window.localStorage.setItem('NainTunnelGranite', JSON.stringify(engine));
    window.localStorage.setItem('NainTunnelGraniteVersion', VERSION);
}

var engine : Engine;
let e = loadEngine();
if (!e) {
    engine = Scenario.initEngine();
} else {
    engine = e;
}
