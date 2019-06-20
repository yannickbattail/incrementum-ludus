/// <reference path="../interfaces/IResource.ts" />
/// <reference path="../interfaces/IQuantity.ts" />
/// <reference path="../interfaces/IProducer.ts" />
/// <reference path="../interfaces/ITrigger.ts" />
/// <reference path="../interfaces/ICrafter.ts" />
/// <reference path="../interfaces/IPlayer.ts" />

class Trigger implements ITrigger {

    $type : string = 'Trigger';
    constructor(protected name: string,
        protected resourcesTrigger: Array<IQuantity> = [],
        protected spawnProducers:  Array<IProducer> = [],
        protected spawnResources: Array<IQuantity> = [],
        protected spawnCrafters: Array<ICrafter> = [],
        protected spawnNewTriggers: Array<ITrigger> = [],
        protected callback: TimerHandler = "",
        protected changeEngineStatus: IncrementumLudusStatus | null = null) {

    }
    getName() : string {
        return this.name;
    }
    getResourcesTrigger() : Array<IQuantity> {
        return this.resourcesTrigger;
    }
    getSpawnProducers() :  Array<IProducer> {
        return this.spawnProducers;
    }
    getSpawnResources(): Array<IQuantity> {
        return this.spawnResources;
    }
    getSpawnCrafters(): Array<ICrafter> {
        return this.spawnCrafters;
    }
    getSpawnNewTriggers(): Array<ITrigger> {
        return this.spawnNewTriggers;
    }
    getCallback(): TimerHandler {
        return this.callback;
    }
    getChangeEngineStatus(): IncrementumLudusStatus | null {
        return this.changeEngineStatus;
    }

    public static load(data : any) : Trigger {
        let curContext : any = window;
        let newObj : Trigger = new Trigger(data.name);
        newObj.resourcesTrigger = (data.resourcesTrigger as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.spawnProducers = (data.spawnProducers as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.spawnResources = (data.spawnResources as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.spawnCrafters = (data.spawnCrafters as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.spawnNewTriggers = (data.spawnNewTriggers as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.callback = data.callback;
        newObj.changeEngineStatus = data.changeEngineStatus;
        return newObj;
    }

    public whenReached(quantity : IQuantity) : ITrigger {
        this.resourcesTrigger.push(quantity);
        return this;
    }
    public and(quantity : IQuantity) : ITrigger {
        return this.whenReached(quantity);
    }
    public spawnProducer(producer : IProducer) : ITrigger {
        this.spawnProducers.push(producer);
        return this;
    }
    public spawnResource(quantity : IQuantity) : ITrigger {
        this.spawnResources.push(quantity);
        return this;
    }
    public spawnCrafter(crafter : ICrafter) : ITrigger {
        this.spawnCrafters.push(crafter);
        return this;
    }
    public appendTrigger(trigger : ITrigger) : ITrigger {
        this.spawnNewTriggers.push(trigger);
        return this;
    }
    public execFunction(fct: TimerHandler): ITrigger {
        this.callback = fct;
        return this;
    }
    public thenWin(): ITrigger {
        this.changeEngineStatus = IncrementumLudusStatus.WIN;
        return this;
    }
    public thenLoose(): ITrigger {
        this.changeEngineStatus = IncrementumLudusStatus.LOOSE;
        return this;
    }
}