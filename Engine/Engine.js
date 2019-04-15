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
            if (producer.isAuto) {
                _this.collectTimedProducer(producer);
            }
        });
        this.Triggers.forEach(function (trigger) { return _this.checkTrigger(trigger); });
        this.Crafters.forEach(function (crafter) { return _this.checkCrafter(crafter); });
    };
    Engine.prototype.collectTimedProducer = function (producer) {
        if (producer.isAuto()) {
            var interval = 666000;
            if (producer.getInterval() != null) {
                producer.getInterval();
            }
            interval = this.FastMode ? this.FastMode : interval;
            var startTime = producer.getStartTime();
            if (startTime != null && startTime.getTime() + interval < new Date().getTime()) {
                producer.initStartTime();
                this.Player.changeStorage(producer.getResourceAmount());
            }
        }
    };
    Engine.prototype.collectManualProducer = function (producer) {
        this.Player.changeStorage(producer.getResourceAmount());
    };
    Engine.prototype.collectProducer = function (producerName) {
        var producer = this.getProducerByName(producerName);
        if (producer != null) {
            if (!producer.isAuto()) {
                this.collectManualProducer(producer);
            }
        }
    };
    Engine.prototype.getProducerByName = function (producerName) {
        var producers = this.Producers.filter(function (src) { return src.getName() == producerName; });
        if (producers.length == 0) {
            return null;
        }
        return producers[0];
    };
    Engine.prototype.checkTrigger = function (trigger) {
        var _this = this;
        if (this.Player.hasResources(trigger.getResourcesTrigger())) {
            trigger.getSpawnProducers().forEach(function (pawnProducer) { return _this.Producers.push(pawnProducer); });
            trigger.getSpawnResources().forEach(function (res) { return _this.Player.changeStorage(res); });
            trigger.getSpawnCrafters().forEach(function (crafter) { return _this.Crafters.push(crafter); });
            trigger.getSpawnNewTriggers().forEach(function (newTrigger) { return _this.Triggers.push(newTrigger); });
            this.Triggers.splice(this.Triggers.indexOf(trigger), 1);
        }
    };
    Engine.prototype.checkCrafter = function (crafter) {
        this.checkFinishedCrafting(crafter);
        this.checkStartCrafting(crafter);
    };
    Engine.prototype.checkFinishedCrafting = function (crafter) {
        var _this = this;
        var duration = this.FastMode ? this.FastMode : crafter.getDuration();
        var startTime = crafter.getStartTime();
        if (startTime != null && (startTime.getTime() + duration < new Date().getTime())) {
            crafter.resetStartTime();
            crafter.getCraftedResources().forEach(function (resourceQty) { return _this.Player.changeStorage(resourceQty); });
        }
    };
    Engine.prototype.checkStartCrafting = function (crafter) {
        var _this = this;
        if (crafter.isAuto() && this.Player.hasResources(crafter.getCost())) {
            crafter.initStartTime();
            crafter.getCost().forEach(function (resourceQty) { return _this.Player.decreaseStorage(resourceQty); });
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
        if (!crafter.isAuto() && !crafter.isCrafting() && this.Player.hasResources(crafter.getCost())) {
            crafter.initStartTime();
            crafter.getCost().forEach(function (resourceQty) { return _this.Player.decreaseStorage(resourceQty); });
            return true;
        }
        return false;
    };
    Engine.prototype.getCrafterByName = function (crafterName) {
        var crafters = this.Crafters.filter(function (src) { return src.getName() == crafterName; });
        if (crafters.length == 0) {
            return null;
        }
        return crafters[0];
    };
    return Engine;
}());
//# sourceMappingURL=Engine.js.map