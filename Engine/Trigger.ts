class Trigger {
    constructor(public Name: string,
        public ResourcesTrigger: Array<ResourceQuantity> = [],
        public SpawnProducers:  Array<Producer>/*,
        public SpawnResources: Array<ResourceQuantity> = [],
        public SpawnCrafters: Array<Crafter> = [],
        public SpawnNewTriggers: Array<Trigger> = []*/) {

    }
}