/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IResourceAmount.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
/// <reference path="../Engine/Engine.ts" />

class RandomQuantity implements IResourceAmount{
    $type : string = 'RandomQuantity';
    constructor(protected Resource: IResource, protected Quantity: number, protected Probability: number = 1) {
    }
    public static load(data : any) : RandomQuantity {
        let curContext : any = window;
        let res = curContext[data.Resource.$type].load(data.Resource);
        let rq : RandomQuantity = new RandomQuantity(res, data.Quantity);
        return rq;
    }
    getQuantity() : number {
        return this.Quantity;
    }
    getResource() : IResource{
        return this.Resource;
    }
    show() : string{
        let prob = "1/" + (1 / this.Probability);
        return prob + this.Resource.show(this.Quantity);
    }
}