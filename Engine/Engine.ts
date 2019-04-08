/// <reference path="Resource.ts" />
/// <reference path="ResourceQuantity.ts" />
/// <reference path="Producer.ts" />
/// <reference path="TimedProducer.ts" />
/// <reference path="ManualProducer.ts" />
/// <reference path="Trigger.ts" />
/// <reference path="Crafter.ts" />
/// <reference path="Player.ts" />

class Engine {
    $type : string = 'Engine';
    tickInterval: number = 1000;
    Player: Player;
    Producers: Array<Producer> = [];
    Triggers: Array<Trigger> = [];
    Crafters: Array<Crafter> = [];
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
                 if (producer instanceof TimedProducer) {
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
    private collectTimedProducer(producer: TimedProducer) {
        let interval = this.FastMode ? this.FastMode :  producer.Interval;
        if (producer.LastTime.getTime() + interval < new Date().getTime()) {
            producer.LastTime = new Date();
            this.Player.changeStorage(producer.ResourceQuantity);
        }
    }
    public collectManualProducer(producer: ManualProducer) {
        this.Player.changeStorage(producer.ResourceQuantity);
    }
    public collectProducer(producerName: string) {
        let producer = this.getProducerByName(producerName);
        if (producer != null) {
            if (producer instanceof ManualProducer) {
                this.collectManualProducer(producer);
            }
        }
    }
    public getProducerByName(producerName : string) : Producer | null {
        let producers : Producer[] =  this.Producers.filter(
            src => src.Name == producerName
        );
        if (producers.length == 0) {
            return null;
        }
        return producers[0];
    }

    private checkTrigger(trigger: Trigger) {
        if (this.Player.hasResources(trigger.ResourcesTrigger)) {
            trigger.SpawnProducers.forEach(
                pawnProducer => this.Producers.push(pawnProducer)
            );
            trigger.SpawnResources.forEach(
                res => this.Player.changeStorage(res)
            );
            trigger.SpawnCrafters.forEach(
                crafter => this.Crafters.push(crafter)
            );
            trigger.SpawnNewTriggers.forEach(
                newTrigger => this.Triggers.push(newTrigger)
            );
            // remove the trigger
            this.Triggers.splice(this.Triggers.indexOf(trigger), 1);
        }
    }

    private checkCrafter(crafter: Crafter) {
        this.checkFinishedCrafting(crafter);
        this.checkStartCrafting(crafter);
    }
    private checkFinishedCrafting(crafter: Crafter) {
        let duration = this.FastMode ? this.FastMode : crafter.Duration;
        if (crafter.StartTime != null && (crafter.StartTime.getTime() + duration < new Date().getTime())) {
            crafter.StartTime = null;
            this.Player.changeStorage(crafter.CraftedResource);
        }
    }
    private checkStartCrafting(crafter: Crafter) {
        if (crafter.AutoCrafting && this.Player.hasResources(crafter.Cost)) {
            crafter.StartTime = new Date();
            crafter.Cost.forEach(
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
    public startManualCrafting(crafter: Crafter) : boolean {
        if (!crafter.AutoCrafting && !crafter.isCrafting() && this.Player.hasResources(crafter.Cost)) {
            crafter.StartTime = new Date();
            crafter.Cost.forEach(
                resourceQty =>  this.Player.decreaseStorage(resourceQty)
            );
            return true;
        }
        return false;
    }

    public getCrafterByName(crafterName : string) : Crafter | null {
        let crafters: Crafter[] =  this.Crafters.filter(
            src => src.Name == crafterName
        );
        if (crafters.length == 0) {
            return null;
        }
        return crafters[0];
    }
}