/// <reference path="Resource.ts" />
/// <reference path="ResourceQuantity.ts" />

class Crafter {
    public StartTime: Date | null;
    constructor(public Name: string, public Duration: number = 0, public Cost: Array<ResourceQuantity> = [],
                public CraftedResource: ResourceQuantity = EMPTY_RQ, public AutoCrafting: boolean = false) {

    }

    public thatCraft(quantity : number, resource : Resource) : Crafter {
        this.CraftedResource = new ResourceQuantity(resource, quantity);
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
