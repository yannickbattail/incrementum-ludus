/// <reference path="../interfaces/IResource.ts" />
/// <reference path="../interfaces/IQuantity.ts" />
/// <reference path="../interfaces/IProducer.ts" />
/// <reference path="../interfaces/ITrigger.ts" />
/// <reference path="../interfaces/ICrafter.ts" />
/// <reference path="../interfaces/IPlayer.ts" />

class Producer implements IProducer {
    $type : string = 'Producer';
    protected startTime: Date | null = new Date(1970, 0, 1);
    constructor(protected name: string,
                protected resourcesQuantity: Array<IQuantity> = [],
                protected interval: number | null = null) {
                    
    }
    getName() : string {
        return this.name;
    }
    getResourcesQuantity() : Array<IQuantity> {
        return this.resourcesQuantity;
    }
    getInterval() : number | null {
        return this.interval;
    }
    isAuto() : boolean {
        return this.interval != null;
    }
    getStartTime(): Date | null {
        return this.startTime;
    }
    resetStartTime(): void{
        this.startTime = null;
    }
    initStartTime(): void{
        this.startTime = new Date();
    }
    public static load(data : any) : Producer {
        let curContext : any = window;
        let newObj : Producer = new Producer(data.name);
        newObj.interval = data.interval;
        newObj.startTime = data.startTime!=null?new Date(data.startTime):null;
        newObj.resourcesQuantity = (data.resourcesQuantity as Array<any>).map(p => curContext[p.$type].load(p));
        return newObj;
    }

    public thatProduce(quantity : IQuantity) : IProducer {
        this.resourcesQuantity.push(quantity);
        return this;
    }

    public andProduce(quantity : IQuantity) : IProducer {
        return this.thatProduce(quantity);
    }

    public manualy() : IProducer {
        this.interval = null;
        return this;
    }

    public every(interval: number) : IProducer {
        this.interval = interval;
        return this;
    }

    public seconds() : IProducer {
        if (this.interval != null) {
            this.interval *= 1000;
        }
        return this;
    }

    public minutes() : IProducer {
        if (this.interval != null) {
            this.interval *= 60 * 1000;
        }
        return this;
    }
}