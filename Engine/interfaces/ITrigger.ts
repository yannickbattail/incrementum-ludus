/// <reference path="IResourceAmount.ts" />
/// <reference path="IResource.ts" />
/// <reference path="IProducer.ts" />
/// <reference path="ICrafter.ts" />

interface ITrigger {
    //getters
    getResourcesTrigger() : Array<IResourceAmount>;
    getSpawnProducers() :  Array<IProducer>;
    getSpawnResources(): Array<IResourceAmount>;
    getSpawnCrafters(): Array<ICrafter>;
    getSpawnNewTriggers(): Array<ITrigger>;

    // builder inferface
    whenReached(quantity : number, resource : IResource) : ITrigger;
    and(quantity : number, resource : IResource) : ITrigger;
    spawnProducer(producer : IProducer) : void;
    spawnResource(quantity : number, resource : IResource) : void;
    spawnCrafter(crafter : ICrafter) : void;
    appendTrigger(trigger : ITrigger) : void;
}