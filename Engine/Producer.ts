/// <reference path="interfaces/IResource.ts" />
/// <reference path="interfaces/IResourceAmount.ts" />
/// <reference path="interfaces/IProducer.ts" />
/// <reference path="interfaces/ITrigger.ts" />
/// <reference path="interfaces/ICrafter.ts" />
/// <reference path="interfaces/IPlayer.ts" />


class Producer implements IProducer {
    $type : string = 'Producer';
    protected StartTime: Date | null = new Date(1970, 0, 1);
    constructor(protected Name: string,
                protected resourceAmount: IResourceAmount = EMPTY_RQ,
                protected Interval: number | null = null) {
                    
    }
    getName() : string {
        return this.Name;
    }
    getResourceAmount() : IResourceAmount {
        return this.resourceAmount;
    }
    getInterval() : number | null {
        return this.Interval;
    }
    isAuto() : boolean {
        return this.Interval != null;
    }
    getStartTime(): Date | null {
        return this.StartTime;
    }
    resetStartTime(): void{
        this.StartTime = null;
    }
    initStartTime(): void{
        this.StartTime = new Date();
    }
    public static load(data : any) : Producer {
        let curContext : any = window;
        let newObj : Producer = new Producer(data.Name);
        newObj.Interval = data.Interval;
        newObj.resourceAmount = curContext[data.ResourceQuantity.$type].load(data.ResourceQuantity);
        return newObj;
    }
    public thatProduce(quantity : number, resource : IResource) : IProducer {
        this.resourceAmount = new ResourceQuantity(resource, quantity);
        return this;
    }

    public every(interval: number) : IProducer {
        this.Interval = interval;
        return this;
    }

    public seconds() : IProducer {
        if (this.Interval != null) {
            this.Interval *= 1000;
        }
        return this;
    }

    public minutes() : IProducer {
        if (this.Interval != null) {
            this.Interval *= 60 * 1000;
        }
        return this;
    }
}