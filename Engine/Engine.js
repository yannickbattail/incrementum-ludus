var Engine = (function () {
    function Engine() {
        this.tick = 1000;
        this.Producers = [];
        this.Triggers = [];
        this.Crafters = [];
    }
    Engine.prototype.run = function () {
        var _this = this;
        window.setInterval(function () { return _this.runTick(); }, 1000);
    };
    Engine.prototype.runTick = function () {
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
        if (producer.LastTime.getTime() + producer.Interval < new Date().getTime()) {
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
            this.Triggers.splice(this.Triggers.indexOf(trigger), 1);
        }
    };
    Engine.prototype.checkCrafter = function (crafter) {
        this.checkFinishedCrafting(crafter);
        this.checkStartCrafting(crafter);
    };
    Engine.prototype.checkFinishedCrafting = function (crafter) {
        if (crafter.StartTime != null && (crafter.StartTime.getTime() + crafter.Duration < new Date().getTime())) {
            crafter.StartTime = null;
            this.Player.changeStorage(crafter.CraftedResource);
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