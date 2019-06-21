/// <reference path="../interfaces/IResource.ts" />
/// <reference path="../interfaces/IQuantity.ts" />
/// <reference path="../interfaces/IProducer.ts" />
/// <reference path="../interfaces/ITrigger.ts" />
/// <reference path="../interfaces/ICrafter.ts" />
/// <reference path="../interfaces/IPlayer.ts" />
/// <reference path="../IncrementumLudus.ts" />
/// <reference path="./Resource.ts" />

class NamedStepResource extends Resource {
    public $type : string = 'Item';
    constructor(public name : string, public image : string, public stepNames : string[]){
        super(name);
    }
    public static load(data : any) : NamedStepResource {
        let r : NamedStepResource = new NamedStepResource(data.name, data.image, data.stepNames);
        return r;
    }
    public show(quantity : number) : string {
        if (quantity < 0 || quantity >= this.stepNames.length) {
            return "" + quantity + ": UNKOWN";
        }
        return "" + quantity + ": " + this.stepNames[quantity];
    }
}
