/// <reference path="Resource.ts" />
/// <reference path="ResourceQuantity.ts" />
/// <reference path="Producer.ts" />
/// <reference path="TimedProducer.ts" />
/// <reference path="ManualProducer.ts" />
/// <reference path="Trigger.ts" />
/// <reference path="Crafter.ts" />
/// <reference path="Player.ts" />

class Engine {
    tick: number = 1000;
    Player: Player;
    Producers: Array<Producer> = [];
    Triggers: Array<Trigger> = [];
    Crafters: Array<Crafter> = [];
    run() {
        window.setInterval(() => this.runTick(), 1000);
    }
    private runTick() {
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
        if (producer.LastTime.getTime() + producer.Interval < new Date().getTime()) {
            producer.LastTime = new Date();
            this.Player.changeStorage(producer.Resource);
        }
    }
    public collectManualProducer(producer: ManualProducer) {
        this.Player.changeStorage(producer.Resource);
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
            // remove the trigger
            this.Triggers.splice(this.Triggers.indexOf(trigger), 1);
        }
    }

    private checkCrafter(crafter: Crafter) {
        this.checkFinishedCrafting(crafter);
        this.checkStartCrafting(crafter);
    }
    private checkFinishedCrafting(crafter: Crafter) {
        if (crafter.StartTime != null && (crafter.StartTime.getTime() + crafter.Duration < new Date().getTime())) {
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