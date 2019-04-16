/// <reference path="IQuantity.ts" />
/// <reference path="IResource.ts" />
/// <reference path="IProducer.ts" />
/// <reference path="ICrafter.ts" />

interface ITrigger {
    $type : string;
    //getters
    getName() : string;
    getResourcesTrigger() : Array<IQuantity>;
    getSpawnProducers() :  Array<IProducer>;
    getSpawnResources(): Array<IQuantity>;
    getSpawnCrafters(): Array<ICrafter>;
    getSpawnNewTriggers(): Array<ITrigger>;

    // builder inferface
    whenReached(quantity : number, resource : IResource) : ITrigger;
    and(quantity : number, resource : IResource) : ITrigger;
    spawnProducer(producer : IProducer) : ITrigger;
    spawnResource(quantity : number, resource : IResource) : ITrigger;
    spawnCrafter(crafter : ICrafter) : ITrigger;
    appendTrigger(trigger : ITrigger) : ITrigger;
}