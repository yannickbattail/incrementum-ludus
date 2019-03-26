class Resource {
    constructor(public Name: string) {
    }
}

class ResourceQuantity {
    constructor(public Resource: Resource, public Quantity: number) {
    }
}

abstract class Source {
    constructor(public Name: string, public Resource: ResourceQuantity) {

    }
}

class TimedSource extends Source {
    public LastTime: Date = new Date(1970, 0, 1);
    constructor(Name: string, Resource: ResourceQuantity, public Interval: number) {
        super(Name, Resource);
    }
}

class ManualSource extends Source {
    constructor(Name: string, Resource: ResourceQuantity) {
        super(Name, Resource);
    }
}

class Trigger {
    constructor(public Name: string,
        public ResourcesTrigger: Array<ResourceQuantity> = [],
        public SpawnSource: Source/*,
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
    Sources: Array<Source> = [];
    Triggers: Array<Trigger> = [];
    Crafters: Array<Crafter> = [];
    run() {
        window.setInterval(() => this.runTick(), 1000);
    }
    private runTick() {
        this.Sources.forEach(
            source => {
                 if (source instanceof TimedSource) {
                   this.collectTimedSource(source);
                 }
            }
        );
        this.Triggers.forEach(
            trigger => this.checkTriggers(trigger)
        );
    }
    private collectTimedSource(source: TimedSource) {
        if (source.LastTime.getTime() + source.Interval < new Date().getTime()) {
            source.LastTime = new Date();
            this.Player.changeStorage(source.Resource);
        }
    }
    public collectManualSource(source: ManualSource) {
        this.Player.changeStorage(source.Resource);
    }
    public collectSource(sourceName: string) {
        let source = this.getSourceByName(sourceName);
        if (source != null) {
            if (source instanceof ManualSource) {
                this.collectManualSource(source);
            }
        }
    }
    public getSourceByName(sourceName : string) : Source | null {
        let sources : Source[] =  this.Sources.filter(
            src => src.Name == sourceName
        );
        if (sources.length == 0) {
            return null;
        }
        return sources[0];
    }
    private checkTriggers(trigger: Trigger) {
        if (this.Player.hasResources(trigger.ResourcesTrigger)) {
            this.Sources.push(trigger.SpawnSource);
            //add TriggeredNewTriggers
            //add TriggeredResources
            // remove the trigger
            this.Triggers.splice(this.Triggers.indexOf(trigger), 1);
        }
    }
}