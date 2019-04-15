/// <reference path="IResourceAmount.ts" />
/// <reference path="IResource.ts" />
/// <reference path="IProducer.ts" />

interface ICrafter {
    //getters
    getStartTime(): Date | null;
    resetStartTime(): void;
    initStartTime(): void;
    getName(): string;
    getDuration(): number;
    getCost(): Array<IResourceAmount>;
    getCraftedResources(): Array<IResourceAmount>;
    isAuto(): boolean;

    // builder inferface
    thatCraft(quantity : number, resource : IResource) : ICrafter
    andCraft(quantity : number, resource : IResource) : ICrafter
    in(interval: number) : ICrafter;
    seconds() : ICrafter;
    minutes() : ICrafter;
    automaticaly() : ICrafter;
    atCostOf(quantity : number, resource : IResource) : ICrafter;
    and(quantity : number, resource : IResource) : ICrafter;
    isCrafting() : boolean;
}
