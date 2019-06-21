/// <reference path="IQuantity.ts" />
/// <reference path="IResource.ts" />
/// <reference path="IProducer.ts" />

interface ICrafter {
    //getters
    getStartTime(): Date | null;
    resetStartTime(): void;
    initStartTime(): void;
    getName(): string;
    getDuration(): number;
    getCost(): Array<IQuantity>;
    getCraftedResources(): Array<IQuantity>;
    isAuto(): boolean;
    setAuto(auto : boolean) : void;
    isAutomatable() : boolean;
    setAutomatable(automatable : boolean) : void;
    // builder inferface
    thatCraft(quantity : IQuantity) : ICrafter
    andCraft(quantity : IQuantity) : ICrafter
    in(interval: number) : ICrafter;
    seconds() : ICrafter;
    minutes() : ICrafter;
    automaticaly() : ICrafter;
    canBeSwitchedToAuto() : ICrafter;
    atCostOf(quantity : IQuantity) : ICrafter;
    and(quantity : IQuantity) : ICrafter;
    isCrafting() : boolean;
}
