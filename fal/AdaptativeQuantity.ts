/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IQuantity.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
/// <reference path="../Engine/Engine.ts" />

class AdaptativeQuantity implements IQuantity {
    $type : string = 'AdaptativeQuantity';
    constructor(protected quantity: number,
                protected resource: IResource,
                protected resourceDependencyName: string,
                protected quanityStep: number) {
    }
    public static load(data : any) : AdaptativeQuantity {
        let curContext : any = window;
        let res = curContext[data.resource.$type].load(data.resource);
        let rq : AdaptativeQuantity = new AdaptativeQuantity(data.quantity, res, data.resourceDependencyName, data.quanityStep);
        return rq;
    }
    getQuantity() : number {
        let e : Engine = engine;
        let res = e.player.getResourceInStorage(this.resourceDependencyName);
        if (res == null) {
            return 0;
        }
        if (res.getQuantity() < this.quanityStep) {
            return 0;
        }
        return this.quantity;
    }
    setQuantity(quantity : number) : void {
        this.quantity = quantity;
    }
    getResource() : IResource{
        return this.resource;
    }
    show() : string{
        return '?' + this.resource.show(this.quantity);
    }
}