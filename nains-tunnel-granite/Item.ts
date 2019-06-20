/// <reference path="../IncrementumLudus/interfaces/IResource.ts" />
/// <reference path="../IncrementumLudus/interfaces/IQuantity.ts" />
/// <reference path="../IncrementumLudus/interfaces/IProducer.ts" />
/// <reference path="../IncrementumLudus/interfaces/ITrigger.ts" />
/// <reference path="../IncrementumLudus/interfaces/ICrafter.ts" />
/// <reference path="../IncrementumLudus/interfaces/IPlayer.ts" />
/// <reference path="../IncrementumLudus/IncrementumLudus.ts" />

class Item extends Resource {
    public $type : string = 'Item';
    constructor(public name : string, public image : string){
        super(name);
    }
    public static load(data : any) : Item {
        let r : Item = new Item(data.name, data.image);
        return r;
    }
    public show(quantity : number) : string {
        return "" + quantity;
    }
}
