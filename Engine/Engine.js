var Engine = (function () {
    function Engine() {
        this.$type = 'Engine';
        this.tickInterval = 100;
        this.producers = [];
        this.triggers = [];
        this.crafters = [];
        this.fastMode = 0;
    }
    Engine.load = function (data) {
        var curContext = window;
        var newObj = new Engine();
        newObj.tickInterval = data.tickInterval;
        newObj.player = curContext[data.player.$type].load(data.player);
        newObj.producers = data.producers.map(function (p) { return curContext[p.$type].load(p); });
        newObj.triggers = data.triggers.map(function (p) { return curContext[p.$type].load(p); });
        newObj.crafters = data.crafters.map(function (p) { return curContext[p.$type].load(p); });
        newObj.fastMode = data.fastMode;
        return newObj;
    };
    Engine.prototype.run = function (tickInterval, saveCallback) {
        var _this = this;
        this.tickInterval = tickInterval;
        this.saveCallback = saveCallback;
        this.intervalId = window.setInterval(function () { return _this.onTick(); }, this.tickInterval);
    };
    Engine.prototype.stop = function () {
        window.clearInterval(this.intervalId);
    };
    Engine.prototype.onTick = function () {
        var _this = this;
        this.producers.forEach(function (producer) {
            if (producer.isAuto) {
                _this.autoCollectProducer(producer);
            }
        });
        this.triggers.forEach(function (trigger) { return _this.checkTrigger(trigger); });
        this.crafters.forEach(function (crafter) { return _this.checkCrafter(crafter); });
        this.saveCallback(this);
    };
    Engine.prototype.autoCollectProducer = function (producer) {
        var _this = this;
        if (producer.isAuto()) {
            var interval = 6666666;
            var i = producer.getInterval();
            if (i != null) {
                interval = i;
            }
            interval = this.fastMode ? this.fastMode : interval;
            var startTime = producer.getStartTime();
            if (startTime != null && startTime.getTime() + interval <= new Date().getTime()) {
                producer.initStartTime();
                producer.getResourcesQuantity().forEach(function (res) { return _this.player.increaseStorage(res); });
            }
        }
    };
    Engine.prototype.collectManualProducer = function (producer) {
        var _this = this;
        producer.getResourcesQuantity().forEach(function (res) { return _this.player.increaseStorage(res); });
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
        var producers = this.producers.filter(function (src) { return src.getName() == producerName; });
        if (producers.length == 0) {
            return null;
        }
        return producers[0];
    };
    Engine.prototype.checkTrigger = function (trigger) {
        var _this = this;
        if (this.player.hasResources(trigger.getResourcesTrigger())) {
            trigger.getSpawnProducers().forEach(function (pawnProducer) { return _this.producers.push(pawnProducer); });
            trigger.getSpawnResources().forEach(function (res) { return _this.player.increaseStorage(res); });
            trigger.getSpawnCrafters().forEach(function (crafter) { return _this.crafters.push(crafter); });
            trigger.getSpawnNewTriggers().forEach(function (newTrigger) { return _this.triggers.push(newTrigger); });
            this.triggers.splice(this.triggers.indexOf(trigger), 1);
        }
    };
    Engine.prototype.checkCrafter = function (crafter) {
        this.checkFinishedCrafting(crafter);
        this.checkStartAutoCrafting(crafter);
    };
    Engine.prototype.checkFinishedCrafting = function (crafter) {
        var _this = this;
        var duration = this.fastMode ? this.fastMode : crafter.getDuration();
        var startTime = crafter.getStartTime();
        if (startTime != null && (startTime.getTime() + duration <= new Date().getTime())) {
            crafter.resetStartTime();
            crafter.getCraftedResources().forEach(function (resourceQty) { return _this.player.increaseStorage(resourceQty); });
        }
    };
    Engine.prototype.checkStartAutoCrafting = function (crafter) {
        var _this = this;
        if (crafter.isAuto() && crafter.getStartTime() == null && this.player.hasResources(crafter.getCost())) {
            crafter.initStartTime();
            crafter.getCost().forEach(function (resourceQty) { return _this.player.decreaseStorage(resourceQty); });
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
        if (!crafter.isAuto() && !crafter.isCrafting() && this.player.hasResources(crafter.getCost())) {
            crafter.initStartTime();
            crafter.getCost().forEach(function (resourceQty) { return _this.player.decreaseStorage(resourceQty); });
            return true;
        }
        return false;
    };
    Engine.prototype.switchAutoCrafting = function (crafterName) {
        var crafter = this.getCrafterByName(crafterName);
        if (crafter != null) {
            crafter.setAuto(!crafter.isAuto());
        }
    };
    Engine.prototype.getCrafterByName = function (crafterName) {
        var crafters = this.crafters.filter(function (src) { return src.getName() == crafterName; });
        if (crafters.length == 0) {
            return null;
        }
        return crafters[0];
    };
    return Engine;
}());
//# sourceMappingURL=Engine.js.map