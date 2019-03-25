class Resource {
    constructor(public Name: string) {
    }
}

class ResourceQuantity {
    constructor(public Resource: Resource, public Quantity: number) {
    }
}

class Source {
    public LastTime: Date = new Date(1970, 0, 1);
    constructor(public Name: string, public Resource: ResourceQuantity,
        public SourceType: string, public Interval: number) {
    }
}

class Trigger {
    constructor(public Name: string,
        public ResourcesTrigger: Array<ResourceQuantity> = [],
        public TriggeredSource: Source/*,
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
            source => this.collectSource(source)
        );
        this.Triggers.forEach(
            trigger => this.checkTriggers(trigger)
        );
    }
    private collectSource(source: Source) {
        if (source.LastTime.getTime() + source.Interval < new Date().getTime()) {
            source.LastTime = new Date();
            this.Player.changeStorage(source.Resource);
        }
    }
    private checkTriggers(trigger: Trigger) {
        if (this.Player.hasResources(trigger.ResourcesTrigger)) {
            this.Sources.push(trigger.TriggeredSource);
            //add TriggeredNewTriggers
            //add TriggeredResources
            // remove the trigger
            this.Triggers.splice(this.Triggers.indexOf(trigger), 1);
        }
    }
}