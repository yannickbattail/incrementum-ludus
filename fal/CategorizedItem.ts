/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IQuantity.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
/// <reference path="../Engine/Engine.ts" />
/// <reference path="./ICategorized.ts" />

class CategorizedItem extends Resource implements ICategorized {
    public $type : string = 'CategorizedItem';
    constructor(public name : string, public image : string, public category : string){
        super(name);
    }
    public static load(data : any) : CategorizedItem {
        let r : CategorizedItem = new CategorizedItem(data.name, data.image, data.category);
        return r;
    }
    public show(quantity : number) : string {
        return "" + quantity;
    }
}
