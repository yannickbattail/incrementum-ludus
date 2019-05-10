/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IQuantity.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
/// <reference path="../Engine/implementations/Resource.ts" />
/// <reference path="../Engine/Engine.ts" />

class Level extends Resource {
    public $type : string = 'Level';
    constructor(public name : string, public image : string){
        super(name);
    }
    public static load(data : any) : Level {
        let r : Level = new Level(data.name, data.image);
        return r;
    }
    public show(quantity : number) : string {
        return "" + quantity;
    }
}
