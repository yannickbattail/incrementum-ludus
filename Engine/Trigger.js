var Trigger = (function () {
    function Trigger(Name, ResourcesTrigger, SpawnProducers, SpawnResources, SpawnCrafters, SpawnNewTriggers) {
        if (ResourcesTrigger === void 0) { ResourcesTrigger = []; }
        if (SpawnResources === void 0) { SpawnResources = []; }
        if (SpawnCrafters === void 0) { SpawnCrafters = []; }
        if (SpawnNewTriggers === void 0) { SpawnNewTriggers = []; }
        this.Name = Name;
        this.ResourcesTrigger = ResourcesTrigger;
        this.SpawnProducers = SpawnProducers;
        this.SpawnResources = SpawnResources;
        this.SpawnCrafters = SpawnCrafters;
        this.SpawnNewTriggers = SpawnNewTriggers;
    }
    return Trigger;
}());
//# sourceMappingURL=Trigger.js.map