/// <reference path="interfaces/IResource.ts" />
/// <reference path="interfaces/IResourceAmount.ts" />
/// <reference path="interfaces/IProducer.ts" />
/// <reference path="interfaces/ITrigger.ts" />
/// <reference path="interfaces/ICrafter.ts" />
/// <reference path="interfaces/IPlayer.ts" />

class ResourceQuantity implements IResourceAmount{
    $type : string = 'ResourceQuantity';
    constructor(protected Resource: IResource, protected Quantity: number) {
    }
    public static load(data : any) : ResourceQuantity {
        let curContext : any = window;
        let res = curContext[data.Resource.$type].load(data.Resource);
        let rq : ResourceQuantity = new ResourceQuantity(res, data.Quantity);
        return rq;
    }
    getQuantity() : number {
        return this.Quantity;
    }
    setQuantity(quantity : number) : void {
        this.Quantity = quantity;
    }
    getResource() : IResource{
        return this.Resource;
    }
    show() : string{
        return this.Resource.show(this.Quantity);
    }
}
const EMPTY_RQ : IResourceAmount = new ResourceQuantity(new Resource("nothing"), 0);
