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
        this.$type = 'Trigger';
    }
    Trigger.prototype.getName = function () {
        return this.Name;
    };
    Trigger.prototype.getResourcesTrigger = function () {
        return this.ResourcesTrigger;
    };
    Trigger.prototype.getSpawnProducers = function () {
        return this.SpawnProducers;
    };
    Trigger.prototype.getSpawnResources = function () {
        return this.SpawnResources;
    };
    Trigger.prototype.getSpawnCrafters = function () {
        return this.SpawnCrafters;
    };
    Trigger.prototype.getSpawnNewTriggers = function () {
        return this.SpawnNewTriggers;
    };
    Trigger.load = function (data) {
        var curContext = window;
        var newObj = new Trigger(data.Name);
        newObj.ResourcesTrigger = data.ResourcesTrigger.map(function (p) { return curContext[p.$type].load(p); });
        newObj.SpawnProducers = data.SpawnProducers.map(function (p) { return curContext[p.$type].load(p); });
        newObj.SpawnResources = data.SpawnResources.map(function (p) { return curContext[p.$type].load(p); });
        newObj.SpawnCrafters = data.SpawnCrafters.map(function (p) { return curContext[p.$type].load(p); });
        newObj.SpawnNewTriggers = data.SpawnNewTriggers.map(function (p) { return curContext[p.$type].load(p); });
        return newObj;
    };
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