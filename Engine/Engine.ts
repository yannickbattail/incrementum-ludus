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
            trigger => this.checkTriggers(trigger)
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
    private checkTriggers(trigger: Trigger) {
        if (this.Player.hasResources(trigger.ResourcesTrigger)) {
            this.Producers.push(trigger.SpawnProducer);
            //add TriggeredNewTriggers
            //add TriggeredResources
            // remove the trigger
            this.Triggers.splice(this.Triggers.indexOf(trigger), 1);
        }
    }
}