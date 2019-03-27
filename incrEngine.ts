class Resource {
    constructor(public Name: string) {
    }
}

class ResourceQuantity {
    constructor(public Resource: Resource, public Quantity: number) {
    }
}

abstract class Producer {
    constructor(public Name: string, public Resource: ResourceQuantity) {

    }
}

class TimedProducer extends Producer {
    public LastTime: Date = new Date(1970, 0, 1);
    constructor(Name: string, Resource: ResourceQuantity, public Interval: number) {
        super(Name, Resource);
    }
}

class ManualProducer extends Producer {
    constructor(Name: string, Resource: ResourceQuantity) {
        super(Name, Resource);
    }
}

class Trigger {
    constructor(public Name: string,
        public ResourcesTrigger: Array<ResourceQuantity> = [],
        public SpawnProducer: Producer/*,
                public TriggeredNewTriggers: Array<Trigger> = [],
                public TriggeredResources: Array<ResourceQuantity> = []*/) {

    }
}

class Crafter {
    Name: string;
    Duration: number;
    AutoCrafting: boolean = false;
    Cost: Array<ResourceQuantity> = [];
    CraftedResource: ResourceQuantity;
}

class Player {
    Storage: Array<ResourceQuantity> = new Array<ResourceQuantity>();
    constructor(public Name: string) {
    }
    public changeStorage(resourceQuantity: ResourceQuantity) {
        let resQ = this.getResourceInStorage(resourceQuantity.Resource.Name);
        if (resQ == null) {
            this.Storage.push(new ResourceQuantity(resourceQuantity.Resource, resourceQuantity.Quantity));
        } else {
            resQ.Quantity += resourceQuantity.Quantity;
        }
    }
    public getResourceInStorage(resourceName: string): ResourceQuantity | null {
        let res = this.Storage.filter((res: ResourceQuantity) => res.Resource.Name == resourceName);
        if (res.length) {
            return res[0];
        }
        return null;
    }
    public hasResources(resourcesQuantity: ResourceQuantity[]): boolean {
        let hasRes = true;
        resourcesQuantity.forEach(
            resQ => {
                let playerRes = this.getResourceInStorage(resQ.Resource.Name);
                if (playerRes == null || playerRes.Quantity < resQ.Quantity) {
                    hasRes = false;
                }
            }
        );
        return hasRes;
    }
}

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