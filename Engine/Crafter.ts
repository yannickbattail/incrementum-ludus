/// <reference path="Resource.ts" />
/// <reference path="ResourceQuantity.ts" />

class Crafter {
    $type : string = 'Crafter';
    public StartTime: Date | null;
    constructor(public Name: string,
                public Duration: number = 0,
                public Cost: Array<ResourceQuantity> = [],
                public CraftedResource: Array<ResourceQuantity> = [],
                public AutoCrafting: boolean = false) {

    }
    public static load(data : any) : Crafter {
        let curContext : any = window;
        let newObj : Crafter = new Crafter(data.Name);
        newObj.Duration = data.Duration;
        newObj.Cost = (data.Cost as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.CraftedResource = curContext[data.CraftedResource.$type].load(data.CraftedResource);
        newObj.AutoCrafting = data.AutoCrafting;
        return newObj;
    }

    public thatCraft(quantity : number, resource : Resource) : Crafter {
        this.CraftedResource.push(new ResourceQuantity(resource, quantity));
        return this;
    }
    public in(interval: number) : Crafter {
        this.Duration = interval;
        return this;
    }
    public seconds() : Crafter {
        this.Duration *= 1000;
        return this;
    }
    public minutes() : Crafter {
        this.Duration *= 60 * 1000;
        return this;
    }
    public automaticaly() : Crafter {
        this.AutoCrafting = true;
        return this;
    }
    public atCostOf(quantity : number, resource : Resource) : Crafter {
        this.Cost.push(new ResourceQuantity(resource, quantity));
        return this;
    }
    public and(quantity : number, resource : Resource) : Crafter {
        return this.atCostOf(quantity, resource);
    }

    public isCrafting() : boolean {
        return this.StartTime != null;
    }
}
