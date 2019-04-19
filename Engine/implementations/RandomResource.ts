/// <reference path="../interfaces/IResource.ts" />
/// <reference path="../interfaces/IQuantity.ts" />
/// <reference path="../interfaces/IProducer.ts" />
/// <reference path="../interfaces/ITrigger.ts" />
/// <reference path="../interfaces/ICrafter.ts" />
/// <reference path="../interfaces/IPlayer.ts" />

class RandomResource implements IQuantity {
    $type : string = 'RandomResource';
    constructor(protected quantity: number, protected resource: IResource, protected probability: number) {
    }
    public static load(data : any) : RandomResource {
        let curContext : any = window;
        let res = curContext[data.resource.$type].load(data.resource);
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
        return  this.displayPercent(this.probability) +' chance of ' + this.resource.show(this.quantity);
    }
    private displayPercent(percent : number) : string {
        return '' + Math.round(percent * 10000) / 100 + '%';
    }
}