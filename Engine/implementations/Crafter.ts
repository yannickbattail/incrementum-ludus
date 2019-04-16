/// <reference path="../interfaces/IResource.ts" />
/// <reference path="../interfaces/IQuantity.ts" />
/// <reference path="../interfaces/IProducer.ts" />
/// <reference path="../interfaces/ITrigger.ts" />
/// <reference path="../interfaces/ICrafter.ts" />
/// <reference path="../interfaces/IPlayer.ts" />

class Crafter implements ICrafter {
    $type : string = 'Crafter';
    public StartTime: Date | null;
    constructor(protected Name: string,
                protected Duration: number = 0,
                protected Cost: Array<ResourceQuantity> = [],
                protected CraftedResources: Array<ResourceQuantity> = [],
                protected AutoCrafting: boolean = false) {

    }
    public static load(data : any) : Crafter {
        let curContext : any = window;
        let newObj : Crafter = new Crafter(data.Name);
        newObj.Duration = data.Duration;
        newObj.Cost = (data.Cost as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.CraftedResources = (data.CraftedResources as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.AutoCrafting = data.AutoCrafting;
        return newObj;
    }

    getStartTime(): Date | null{
        return this.StartTime;
    }
    resetStartTime(): void{
        this.StartTime = null;
    }
    initStartTime(): void{
        this.StartTime = new Date();
    }
    getName(): string {
        return this.Name;
    }
    getDuration(): number {
        return this.Duration;
    }
    getCost(): Array<IQuantity> {
        return this.Cost;
    }
    getCraftedResources(): Array<IQuantity> {
        return this.CraftedResources;
    }
    isAuto(): boolean {
        return this.AutoCrafting;
    }

    public thatCraft(quantity : number, resource : IResource) : ICrafter {
        this.CraftedResources.push(new ResourceQuantity(resource, quantity));
        return this;
    }
    public andCraft(quantity : number, resource : IResource) : ICrafter {
        return this.thatCraft(quantity, resource);
    }
    public in(interval: number) : ICrafter {
        this.Duration = interval;
        return this;
    }
    public seconds() : ICrafter {
        this.Duration *= 1000;
        return this;
    }
    public minutes() : ICrafter {
        this.Duration *= 60 * 1000;
        return this;
    }
    public automaticaly() : ICrafter {
        this.AutoCrafting = true;
        return this;
    }
    public atCostOf(quantity : number, resource : IResource) : ICrafter {
        this.Cost.push(new ResourceQuantity(resource, quantity));
        return this;
    }
    public and(quantity : number, resource : IResource) : ICrafter {
        return this.atCostOf(quantity, resource);
    }

    public isCrafting() : boolean {
        return this.StartTime != null;
    }
}
