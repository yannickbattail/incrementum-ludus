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

const VERSION = "1.3";

function loadEngine() : Engine | null {

    let json = window.localStorage.getItem('Fal');
    if (json != null) {
        if ((window.localStorage.getItem('FalVersion') != null)
            || (window.localStorage.getItem('FalVersion') == VERSION)) {
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
    window.localStorage.setItem('Fal', JSON.stringify(engine));
    window.localStorage.setItem('FalVersion', VERSION);
}

var engine : Engine;
let e = loadEngine();
if (!e) {
    engine = Scenario.initEngine();
} else {
    engine = e;
}
