var Trigger = (function () {
    function Trigger(Name, ResourcesTrigger, SpawnProducers, SpawnResources, SpawnCrafters, SpawnNewTriggers) {
        if (ResourcesTrigger === void 0) { ResourcesTrigger = []; }
        if (SpawnProducers === void 0) { SpawnProducers = []; }
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
    Trigger.prototype.whenReached = function (quantity, resource) {
        this.ResourcesTrigger.push(new ResourceQuantity(resource, quantity));
        return this;
    };
    Trigger.prototype.and = function (quantity, resource) {
        return this.whenReached(quantity, resource);
    };
    Trigger.prototype.spawnProducer = function (producer) {
        this.SpawnProducers.push(producer);
        return this;
    };
    Trigger.prototype.spawnResource = function (quantity, resource) {
        this.SpawnResources.push(new ResourceQuantity(resource, quantity));
        return this;
    };
    Trigger.prototype.spawnCrafter = function (crafter) {
        this.SpawnCrafters.push(crafter);
        return this;
    };
    Trigger.prototype.appendTrigger = function (trigger) {
        this.SpawnNewTriggers.push(trigger);
        return this;
    };
    return Trigger;
}());
//# sourceMappingURL=Trigger.js.map