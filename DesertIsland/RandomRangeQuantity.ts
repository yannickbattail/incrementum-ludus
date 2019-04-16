/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IQuantity.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
/// <reference path="../Engine/Engine.ts" />

class RandomRangeQuantity implements IQuantity {
    $type : string = 'RandomRangeQuantity';
    constructor(protected minQuantity: number, protected maxQuantity: number, protected resource: IResource,) {
    }
    public static load(data : any) : RandomRangeQuantity {
        let curContext : any = window;
        let res = curContext[data.Resource.$type].load(data.Resource);
        let rq : RandomRangeQuantity = new RandomRangeQuantity(data.minQuantity, data.maxQuantity, res);
        return rq;
    }
    getQuantity() : number {
        return Math.floor(Math.random()*(this.maxQuantity-this.minQuantity+1)+this.minQuantity);
    }
    setQuantity(minQuantity: number, maxQuantity: number) : void {
        this.minQuantity = minQuantity;
        this.maxQuantity = maxQuantity;
    }
    getResource() : IResource{
        return this.resource;
    }
    show() : string{
        return '' +  this.minQuantity + ' ' + this.resource.show(this.maxQuantity);
    }
}