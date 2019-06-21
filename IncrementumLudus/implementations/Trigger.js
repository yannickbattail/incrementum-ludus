"use strict";
var Trigger = (function () {
    function Trigger(name, resourcesTrigger, spawnProducers, spawnResources, spawnCrafters, spawnNewTriggers, callback, changeEngineStatus) {
        if (resourcesTrigger === void 0) { resourcesTrigger = []; }
        if (spawnProducers === void 0) { spawnProducers = []; }
        if (spawnResources === void 0) { spawnResources = []; }
        if (spawnCrafters === void 0) { spawnCrafters = []; }
        if (spawnNewTriggers === void 0) { spawnNewTriggers = []; }
        if (callback === void 0) { callback = ""; }
        if (changeEngineStatus === void 0) { changeEngineStatus = null; }
        this.name = name;
        this.resourcesTrigger = resourcesTrigger;
        this.spawnProducers = spawnProducers;
        this.spawnResources = spawnResources;
        this.spawnCrafters = spawnCrafters;
        this.spawnNewTriggers = spawnNewTriggers;
        this.callback = callback;
        this.changeEngineStatus = changeEngineStatus;
        this.$type = 'Trigger';
    }
    Trigger.prototype.getName = function () {
        return this.name;
    };
    Trigger.prototype.getResourcesTrigger = function () {
        return this.resourcesTrigger;
    };
    Trigger.prototype.getSpawnProducers = function () {
        return this.spawnProducers;
    };
    Trigger.prototype.getSpawnResources = function () {
        return this.spawnResources;
    };
    Trigger.prototype.getSpawnCrafters = function () {
        return this.spawnCrafters;
    };
    Trigger.prototype.getSpawnNewTriggers = function () {
        return this.spawnNewTriggers;
    };
    Trigger.prototype.getCallback = function () {
        return this.callback;
    };
    Trigger.prototype.getChangeEngineStatus = function () {
        return this.changeEngineStatus;
    };
    Trigger.load = function (data) {
        var curContext = window;
        var newObj = new Trigger(data.name);
        newObj.resourcesTrigger = data.resourcesTrigger.map(function (p) { return curContext[p.$type].load(p); });
        newObj.spawnProducers = data.spawnProducers.map(function (p) { return curContext[p.$type].load(p); });
        newObj.spawnResources = data.spawnResources.map(function (p) { return curContext[p.$type].load(p); });
        newObj.spawnCrafters = data.spawnCrafters.map(function (p) { return curContext[p.$type].load(p); });
        newObj.spawnNewTriggers = data.spawnNewTriggers.map(function (p) { return curContext[p.$type].load(p); });
        newObj.callback = data.callback;
        newObj.changeEngineStatus = data.changeEngineStatus;
        return newObj;
    };
    Trigger.prototype.whenReached = function (quantity) {
        this.resourcesTrigger.push(quantity);
        return this;
    };
    Trigger.prototype.and = function (quantity) {
        return this.whenReached(quantity);
    };
    Trigger.prototype.spawnProducer = function (producer) {
        this.spawnProducers.push(producer);
        return this;
    };
    Trigger.prototype.spawnResource = function (quantity) {
        this.spawnResources.push(quantity);
        return this;
    };
    Trigger.prototype.spawnCrafter = function (crafter) {
        this.spawnCrafters.push(crafter);
        return this;
    };
    Trigger.prototype.appendTrigger = function (trigger) {
        this.spawnNewTriggers.push(trigger);
        return this;
    };
    Trigger.prototype.execFunction = function (fct) {
        this.callback = fct;
        return this;
    };
    Trigger.prototype.thenWin = function () {
        this.changeEngineStatus = IncrementumLudusStatus.WIN;
        return this;
    };
    Trigger.prototype.thenLoose = function () {
        this.changeEngineStatus = IncrementumLudusStatus.LOOSE;
        return this;
    };
    return Trigger;
}());
//# sourceMappingURL=Trigger.js.map