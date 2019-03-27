class Trigger {
    constructor(public Name: string,
        public ResourcesTrigger: Array<ResourceQuantity> = [],
        public SpawnProducer: Producer/*,
                public TriggeredNewTriggers: Array<Trigger> = [],
                public TriggeredResources: Array<ResourceQuantity> = []*/) {

    }
}