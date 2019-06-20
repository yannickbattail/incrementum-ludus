/// <reference path="../interfaces/IResource.ts" />
/// <reference path="../interfaces/IQuantity.ts" />
/// <reference path="../interfaces/IProducer.ts" />
/// <reference path="../interfaces/ITrigger.ts" />
/// <reference path="../interfaces/ICrafter.ts" />
/// <reference path="../interfaces/IPlayer.ts" />

class RandomRangeQuantity implements IQuantity {
    $type : string = 'RandomRangeQuantity';
    constructor(protected minQuantity: number,
                protected maxQuantity: number,
                protected resource: IResource,) {
    }
    public static load(data : any) : RandomRangeQuantity {
        let curContext : any = window;
        let res = curContext[data.resource.$type].load(data.resource);
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
        return this.resource.show(this.minQuantity) + ' à ' + this.resource.show(this.maxQuantity);
    }

    getDetails() : string {
        return '<div class="chanceOf">random [' +  this.resource.show(this.minQuantity) + '-' + this.resource.show(this.maxQuantity)+']</div>';
    }
}