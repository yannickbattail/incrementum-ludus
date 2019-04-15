/// <reference path="IResourceAmount.ts" />
/// <reference path="IResource.ts" />

interface IProducer {
    $type : string;
    //getters
    getName() : string;
    getResourceAmount() : IResourceAmount;
    getInterval() : number | null;
    isAuto() : boolean;
    getStartTime(): Date | null;
    resetStartTime(): void;
    initStartTime(): void;
    // builder inferface
    thatProduce(quantity : number, resource : IResource) : IProducer;
    every(interval: number) : IProducer ;
    seconds() : IProducer ;
    minutes() : IProducer ;
}
