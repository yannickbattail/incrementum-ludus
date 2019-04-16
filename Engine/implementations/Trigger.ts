/// <reference path="../interfaces/IResource.ts" />
/// <reference path="../interfaces/IQuantity.ts" />
/// <reference path="../interfaces/IProducer.ts" />
/// <reference path="../interfaces/ITrigger.ts" />
/// <reference path="../interfaces/ICrafter.ts" />
/// <reference path="../interfaces/IPlayer.ts" />


class Trigger implements ITrigger {
    $type : string = 'Trigger';
    constructor(protected Name: string,
        protected ResourcesTrigger: Array<IQuantity> = [],
        protected SpawnProducers:  Array<IProducer> = [],
        protected SpawnResources: Array<IQuantity> = [],
        protected SpawnCrafters: Array<ICrafter> = [],
        protected SpawnNewTriggers: Array<ITrigger> = []) {

    }
    getName() : string {
        return this.Name;
    }
    getResourcesTrigger() : Array<IQuantity> {
        return this.ResourcesTrigger;
    }
    getSpawnProducers() :  Array<IProducer> {
        return this.SpawnProducers;
    }
    getSpawnResources(): Array<IQuantity> {
        return this.SpawnResources;
    }
    getSpawnCrafters(): Array<ICrafter> {
        return this.SpawnCrafters;
    }
    getSpawnNewTriggers(): Array<ITrigger> {
        return this.SpawnNewTriggers;
    }
    public static load(data : any) : Trigger {
        let curContext : any = window;
        let newObj : Trigger = new Trigger(data.Name);
        newObj.ResourcesTrigger = (data.ResourcesTrigger as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.SpawnProducers = (data.SpawnProducers as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.SpawnResources = (data.SpawnResources as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.SpawnCrafters = (data.SpawnCrafters as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.SpawnNewTriggers = (data.SpawnNewTriggers as Array<any>).map(p => curContext[p.$type].load(p));
        return newObj;
    }

    public whenReached(quantity : number, resource : IResource) : ITrigger {
        this.ResourcesTrigger.push(new Quantity(quantity, resource));
        return this;
    }
    public and(quantity : number, resource : IResource) : ITrigger {
        return this.whenReached(quantity, resource);
    }
    public spawnProducer(producer : IProducer) : ITrigger {
        this.SpawnProducers.push(producer);
        return this;
    }
    public spawnResource(quantity : number, resource : IResource) : ITrigger {
        this.SpawnResources.push(new Quantity(quantity, resource));
        return this;
    }
    public spawnCrafter(crafter : ICrafter) : ITrigger {
        this.SpawnCrafters.push(crafter);
        return this;
    }
    public appendTrigger(trigger : ITrigger) : ITrigger {
        this.SpawnNewTriggers.push(trigger);
        return this;
    }

}