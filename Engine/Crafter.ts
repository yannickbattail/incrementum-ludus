class Crafter {
    Name: string;
    Duration: number;
    AutoCrafting: boolean = false;
    Cost: Array<ResourceQuantity> = [];
    CraftedResource: ResourceQuantity;
}