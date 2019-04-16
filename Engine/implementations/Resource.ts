/// <reference path="../interfaces/IResource.ts" />
/// <reference path="../interfaces/IQuantity.ts" />
/// <reference path="../interfaces/IProducer.ts" />
/// <reference path="../interfaces/ITrigger.ts" />
/// <reference path="../interfaces/ICrafter.ts" />
/// <reference path="../interfaces/IPlayer.ts" />


class Resource implements IResource {
    public $type : string = 'Resource';
    getName() : string{
        return this.Name;
    }
    constructor(protected Name: string) {
    }
    public static load(data : any) : Resource {
        let r : Resource = new Resource(data.Name);
        return r;
    }
    public equals(obj: IResource) : boolean {
        return this.getName() == obj.getName();
    }
    public show(quantity : number) : string {
        return quantity + ' ' + this.Name;
    }
}
