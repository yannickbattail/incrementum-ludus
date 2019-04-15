/// <reference path="IResourceAmount.ts" />
/// <reference path="IResource.ts" />

interface IProducer {
    //getters
    getName() : string;
    getResourceAmount() : IResourceAmount;
    getInterval() : number | null;
    isAuto() : boolean;
    // builder inferface
    thatProduce(quantity : number, resource : IResource) : IProducer;
    every(interval: number) : IProducer ;
    seconds() : IProducer ;
    minutes() : IProducer ;
}
