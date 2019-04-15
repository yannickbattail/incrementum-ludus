/// <reference path="interfaces/IResource.ts" />
/// <reference path="interfaces/IResourceAmount.ts" />
/// <reference path="interfaces/IProducer.ts" />
/// <reference path="interfaces/ITrigger.ts" />
/// <reference path="interfaces/ICrafter.ts" />
/// <reference path="interfaces/IPlayer.ts" />

class Engine {
    $type : string = 'Engine';
    tickInterval: number = 500;
    Player: IPlayer;
    Producers: Array<IProducer> = [];
    Triggers: Array<ITrigger> = [];
    Crafters: Array<ICrafter> = [];
    FastMode : number = 0;
    public static load(data : any) : Engine {
        let curContext : any = window;
        let newObj : Engine = new Engine();
        newObj.tickInterval = data.tickInterval;
        newObj.Player = curContext[data.Player.$type].load(data.Player);
        newObj.Producers = (data.Producers as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.Triggers = (data.Triggers as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.Crafters = (data.Crafters as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.FastMode = data.FastMode;
        return newObj;
    }
    run() {
        window.setInterval(() => this.onTick(), this.tickInterval);
    }
    private onTick() {
        this.Producers.forEach(
            producer => {
                 if (producer.isAuto) {
                   this.collectTimedProducer(producer);
                 }
            }
        );
        this.Triggers.forEach(
            trigger => this.checkTrigger(trigger)
        );
        this.Crafters.forEach(
            crafter => this.checkCrafter(crafter)
        );
    }
    private collectTimedProducer(producer: IProducer) {
        if (producer.isAuto()) {
            let interval : number = 666000;
            if (producer.getInterval() != null) {
                producer.getInterval();
            }
            interval = this.FastMode ? this.FastMode : interval;
            let startTime = producer.getStartTime();
            if (startTime != null && startTime.getTime() + interval < new Date().getTime()) {
                producer.initStartTime();
                this.Player.changeStorage(producer.getResourceAmount());
            }
        }
    }
    public collectManualProducer(producer: IProducer) {
        this.Player.changeStorage(producer.getResourceAmount());
    }
    public collectProducer(producerName: string) {
        let producer = this.getProducerByName(producerName);
        if (producer != null) {
            if (!producer.isAuto()) {
                this.collectManualProducer(producer);
            }
        }
    }
    public getProducerByName(producerName : string) : IProducer | null {
        let producers : IProducer[] =  this.Producers.filter(
            src => src.getName() == producerName
        );
        if (producers.length == 0) {
            return null;
        }
        return producers[0];
    }

    private checkTrigger(trigger: ITrigger) {
        if (this.Player.hasResources(trigger.getResourcesTrigger())) {
            trigger.getSpawnProducers().forEach(
                pawnProducer => this.Producers.push(pawnProducer)
            );
            trigger.getSpawnResources().forEach(
                res => this.Player.changeStorage(res)
            );
            trigger.getSpawnCrafters().forEach(
                crafter => this.Crafters.push(crafter)
            );
            trigger.getSpawnNewTriggers().forEach(
                newTrigger => this.Triggers.push(newTrigger)
            );
            // remove the trigger
            this.Triggers.splice(this.Triggers.indexOf(trigger), 1);
        }
    }

    private checkCrafter(crafter: ICrafter) {
        this.checkFinishedCrafting(crafter);
        this.checkStartCrafting(crafter);
    }
    private checkFinishedCrafting(crafter: ICrafter) {
        let duration = this.FastMode ? this.FastMode : crafter.getDuration();
        let startTime = crafter.getStartTime();
        if (startTime != null && (startTime.getTime() + duration < new Date().getTime())) {
            crafter.resetStartTime();
            crafter.getCraftedResources().forEach(
                resourceQty =>  this.Player.changeStorage(resourceQty)
            );
        }
    }
    private checkStartCrafting(crafter: ICrafter) {
        if (crafter.isAuto() && this.Player.hasResources(crafter.getCost())) {
            crafter.initStartTime();
            crafter.getCost().forEach(
                resourceQty =>  this.Player.decreaseStorage(resourceQty)
            );
        }
    }
    public startCrafting(crafterName: string) {
        let crafter = this.getCrafterByName(crafterName);
        if (crafter != null) {
            this.startManualCrafting(crafter);
        }
    }
    public startManualCrafting(crafter: ICrafter) : boolean {
        if (!crafter.isAuto() && !crafter.isCrafting() && this.Player.hasResources(crafter.getCost())) {
            crafter.initStartTime();
            crafter.getCost().forEach(
                resourceQty =>  this.Player.decreaseStorage(resourceQty)
            );
            return true;
        }
        return false;
    }

    public getCrafterByName(crafterName : string) : ICrafter | null {
        let crafters: ICrafter[] =  this.Crafters.filter(
            src => src.getName() == crafterName
        );
        if (crafters.length == 0) {
            return null;
        }
        return crafters[0];
    }
}