/// <reference path="../interfaces/IResource.ts" />
/// <reference path="../interfaces/IQuantity.ts" />
/// <reference path="../interfaces/IProducer.ts" />
/// <reference path="../interfaces/ITrigger.ts" />
/// <reference path="../interfaces/ICrafter.ts" />
/// <reference path="../interfaces/IPlayer.ts" />

class Crafter implements ICrafter {
    $type : string = 'Crafter';
    public startTime: Date | null = null;
    constructor(protected name: string,
                protected duration: number = 0,
                protected cost: Array<IQuantity> = [],
                protected craftedResources: Array<IQuantity> = [],
                protected autoCrafting: boolean = false,
                protected automatable: boolean = false) {

    }
    public static load(data : any) : Crafter {
        let curContext : any = window;
        let newObj : Crafter = new Crafter(data.name);
        newObj.duration = data.duration;
        newObj.startTime = data.startTime!=null?new Date(data.startTime):null;
        newObj.cost = (data.cost as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.craftedResources = (data.craftedResources as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.autoCrafting = data.autoCrafting;
        newObj.automatable = data.automatable;
        return newObj;
    }

    getStartTime(): Date | null{
        return this.startTime;
    }
    resetStartTime(): void{
        this.startTime = null;
    }
    initStartTime(): void{
        this.startTime = new Date();
    }
    getName(): string {
        return this.name;
    }
    getDuration(): number {
        return this.duration;
    }
    getCost(): Array<IQuantity> {
        return this.cost;
    }
    getCraftedResources(): Array<IQuantity> {
        return this.craftedResources;
    }
    isAuto(): boolean {
        return this.autoCrafting;
    }
    setAuto(auto : boolean) : void {
        this.autoCrafting = auto;
    }
    isAutomatable(): boolean {
        return this.automatable;
    }
    setAutomatable(automatable : boolean) : void {
        this.automatable = automatable;
    }

    public thatCraft(quantity : IQuantity) : ICrafter {
        this.craftedResources.push(quantity);
        return this;
    }
    public andCraft(quantity : IQuantity) : ICrafter {
        return this.thatCraft(quantity);
    }
    public in(interval: number) : ICrafter {
        this.duration = interval;
        return this;
    }
    public seconds() : ICrafter {
        this.duration *= 1000;
        return this;
    }
    public minutes() : ICrafter {
        this.duration *= 60 * 1000;
        return this;
    }
    public automaticaly() : ICrafter {
        this.autoCrafting = true;
        return this;
    }
    canBeSwitchedToAuto() : ICrafter {
        this.automatable = true;
        return this;
    }

    public atCostOf(quantity : IQuantity) : ICrafter {
        this.cost.push(quantity);
        return this;
    }
    public and(quantity : IQuantity) : ICrafter {
        return this.atCostOf(quantity);
    }

    public isCrafting() : boolean {
        return this.startTime != null;
    }
}
