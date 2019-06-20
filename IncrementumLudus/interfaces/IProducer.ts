/// <reference path="IQuantity.ts" />
/// <reference path="IResource.ts" />

interface IProducer {
    $type : string;
    //getters
    getName() : string;
    getResourcesQuantity() : Array<IQuantity>;
    getInterval() : number | null;
    isAuto() : boolean;
    getStartTime(): Date | null;
    resetStartTime(): void;
    initStartTime(): void;
    // builder inferface
    thatProduce(quantity : IQuantity) : IProducer;
    andProduce(quantity : IQuantity) : IProducer;
    manualy() : IProducer;
    every(interval: number) : IProducer ;
    seconds() : IProducer ;
    minutes() : IProducer ;
}
