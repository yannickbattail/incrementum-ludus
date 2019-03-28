class Crafter {
    public StartTime: Date | null;
    constructor(public Name: string, public Duration: number, public Cost: Array<ResourceQuantity> = [],
                public CraftedResource: ResourceQuantity, public AutoCrafting: boolean = false) {

    }
    public isCrafting() : boolean {
        return this.StartTime != null;
    }
}
