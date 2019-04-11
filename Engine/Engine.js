var Engine = (function () {
    function Engine() {
        this.$type = 'Engine';
        this.tickInterval = 500;
        this.Producers = [];
        this.Triggers = [];
        this.Crafters = [];
        this.FastMode = 0;
    }
    Engine.load = function (data) {
        var curContext = window;
        var newObj = new Engine();
        newObj.tickInterval = data.tickInterval;
        newObj.Player = curContext[data.Player.$type].load(data.Player);
        newObj.Producers = data.Producers.map(function (p) { return curContext[p.$type].load(p); });
        newObj.Triggers = data.Triggers.map(function (p) { return curContext[p.$type].load(p); });
        newObj.Crafters = data.Crafters.map(function (p) { return curContext[p.$type].load(p); });
        newObj.FastMode = data.FastMode;
        return newObj;
    };
    Engine.prototype.run = function () {
        var _this = this;
        window.setInterval(function () { return _this.onTick(); }, this.tickInterval);
    };
    Engine.prototype.onTick = function () {
        var _this = this;
        this.Producers.forEach(function (producer) {
            if (producer instanceof TimedProducer) {
                _this.collectTimedProducer(producer);
            }
        });
        this.Triggers.forEach(function (trigger) { return _this.checkTrigger(trigger); });
        this.Crafters.forEach(function (crafter) { return _this.checkCrafter(crafter); });
    };
    Engine.prototype.collectTimedProducer = function (producer) {
        var interval = this.FastMode ? this.FastMode : producer.Interval;
        if (producer.LastTime.getTime() + interval < new Date().getTime()) {
            producer.LastTime = new Date();
            this.Player.changeStorage(producer.ResourceQuantity);
        }
    };
    Engine.prototype.collectManualProducer = function (producer) {
        this.Player.changeStorage(producer.ResourceQuantity);
    };
    Engine.prototype.collectProducer = function (producerName) {
        var producer = this.getProducerByName(producerName);
        if (producer != null) {
            if (producer instanceof ManualProducer) {
                this.collectManualProducer(producer);
            }
        }
    };
    Engine.prototype.getProducerByName = function (producerName) {
        var producers = this.Producers.filter(function (src) { return src.Name == producerName; });
        if (producers.length == 0) {
            return null;
        }
        return producers[0];
    };
    Engine.prototype.checkTrigger = function (trigger) {
        var _this = this;
        if (this.Player.hasResources(trigger.ResourcesTrigger)) {
            trigger.SpawnProducers.forEach(function (pawnProducer) { return _this.Producers.push(pawnProducer); });
            trigger.SpawnResources.forEach(function (res) { return _this.Player.changeStorage(res); });
            trigger.SpawnCrafters.forEach(function (crafter) { return _this.Crafters.push(crafter); });
            trigger.SpawnNewTriggers.forEach(function (newTrigger) { return _this.Triggers.push(newTrigger); });
            this.Triggers.splice(this.Triggers.indexOf(trigger), 1);
        }
    };
    Engine.prototype.checkCrafter = function (crafter) {
        this.checkFinishedCrafting(crafter);
        this.checkStartCrafting(crafter);
    };
    Engine.prototype.checkFinishedCrafting = function (crafter) {
        var _this = this;
        var duration = this.FastMode ? this.FastMode : crafter.Duration;
        if (crafter.StartTime != null && (crafter.StartTime.getTime() + duration < new Date().getTime())) {
            crafter.StartTime = null;
            crafter.CraftedResource.forEach(function (resourceQty) { return _this.Player.changeStorage(resourceQty); });
        }
    };
    Engine.prototype.checkStartCrafting = function (crafter) {
        var _this = this;
        if (crafter.AutoCrafting && this.Player.hasResources(crafter.Cost)) {
            crafter.StartTime = new Date();
            crafter.Cost.forEach(function (resourceQty) { return _this.Player.decreaseStorage(resourceQty); });
        }
    };
    Engine.prototype.startCrafting = function (crafterName) {
        var crafter = this.getCrafterByName(crafterName);
        if (crafter != null) {
            this.startManualCrafting(crafter);
        }
    };
    Engine.prototype.startManualCrafting = function (crafter) {
        var _this = this;
        if (!crafter.AutoCrafting && !crafter.isCrafting() && this.Player.hasResources(crafter.Cost)) {
            crafter.StartTime = new Date();
            crafter.Cost.forEach(function (resourceQty) { return _this.Player.decreaseStorage(resourceQty); });
            return true;
        }
        return false;
    };
    Engine.prototype.getCrafterByName = function (crafterName) {
        var crafters = this.Crafters.filter(function (src) { return src.Name == crafterName; });
        if (crafters.length == 0) {
            return null;
        }
        return crafters[0];
    };
    return Engine;
}());
//# sourceMappingURL=Engine.js.map