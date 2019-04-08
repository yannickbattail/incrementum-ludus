/// <reference path="Resource.ts" />
/// <reference path="ResourceQuantity.ts" />
/// <reference path="Producer.ts" />
/// <reference path="TimedProducer.ts" />
/// <reference path="ManualProducer.ts" />
/// <reference path="Crafter.ts" />

class Trigger {
    $type : string = 'Trigger';
    constructor(public Name: string,
        public ResourcesTrigger: Array<ResourceQuantity> = [],
        public SpawnProducers:  Array<Producer> = [],
        public SpawnResources: Array<ResourceQuantity> = [],
        public SpawnCrafters: Array<Crafter> = [],
        public SpawnNewTriggers: Array<Trigger> = []) {

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

    public whenReached(quantity : number, resource : Resource) : Trigger {
        this.ResourcesTrigger.push(new ResourceQuantity(resource, quantity));
        return this;
    }
    public and(quantity : number, resource : Resource) : Trigger {
        return this.whenReached(quantity, resource);
    }
    public spawnProducer(producer : Producer) {
        this.SpawnProducers.push(producer);
        return this;
    }
    public spawnResource(quantity : number, resource : Resource) {
        this.SpawnResources.push(new ResourceQuantity(resource, quantity));
        return this;
    }
    public spawnCrafter(crafter : Crafter) {
        this.SpawnCrafters.push(crafter);
        return this;
    }
    public appendTrigger(trigger : Trigger) {
        this.SpawnNewTriggers.push(trigger);
        return this;
    }

}