/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IQuantity.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
/// <reference path="../Engine/Engine.ts" />

class RandomResource implements IQuantity {
    $type : string = 'RandomResource';
    constructor(protected quantity: number, protected resource: IResource, protected probability: number, ) {
    }
    public static load(data : any) : RandomResource {
        let curContext : any = window;
        let res = curContext[data.Resource.$type].load(data.Resource);
        let rq : RandomResource = new RandomResource(data.quantity, res, data.probability);
        return rq;
    }
    getQuantity() : number {
        if (Math.random() < this.probability) {
            return this.quantity;
        }
        return 0;
    }
    setQuantity(quantity : number) : void {
        this.quantity = quantity;
    }
    getResource() : IResource{
        return this.resource;
    }
    show() : string{
        return this.resource.show(this.quantity);
    }
}