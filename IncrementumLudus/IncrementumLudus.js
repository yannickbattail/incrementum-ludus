"use strict";
var IncrementumLudusStatus;
(function (IncrementumLudusStatus) {
    IncrementumLudusStatus[IncrementumLudusStatus["NOT_YET_STARTED"] = 0] = "NOT_YET_STARTED";
    IncrementumLudusStatus[IncrementumLudusStatus["IN_PROGRESS"] = 1] = "IN_PROGRESS";
    IncrementumLudusStatus[IncrementumLudusStatus["LOOSE"] = 2] = "LOOSE";
    IncrementumLudusStatus[IncrementumLudusStatus["WIN"] = 3] = "WIN";
})(IncrementumLudusStatus || (IncrementumLudusStatus = {}));
var IncrementumLudus = (function () {
    function IncrementumLudus() {
        this.$type = 'IncrementumLudus';
        this.tickInterval = 100;
        this.status = IncrementumLudusStatus.NOT_YET_STARTED;
        this.player = new Player("");
        this.producers = [];
        this.triggers = [];
        this.crafters = [];
        this.fastMode = 0;
        this.intervalId = 0;
        this.saveCallback = function () { };
    }
    IncrementumLudus.load = function (data) {
        var curContext = window;
        var newObj = new IncrementumLudus();
        newObj.tickInterval = data.tickInterval;
        newObj.status = data.status;
        newObj.player = curContext[data.player.$type].load(data.player);
        newObj.producers = data.producers.map(function (p) { return curContext[p.$type].load(p); });
        newObj.triggers = data.triggers.map(function (p) { return curContext[p.$type].load(p); });
        newObj.crafters = data.crafters.map(function (p) { return curContext[p.$type].load(p); });
        newObj.fastMode = data.fastMode;
        return newObj;
    };
    IncrementumLudus.prototype.run = function (tickInterval, saveCallback) {
        var _this = this;
        this.tickInterval = tickInterval;
        this.saveCallback = saveCallback;
        if (this.status == IncrementumLudusStatus.NOT_YET_STARTED) {
            this.status = IncrementumLudusStatus.IN_PROGRESS;
        }
        this.intervalId = window.setInterval(function () { return _this.onTick(); }, this.tickInterval);
    };
    IncrementumLudus.prototype.stop = function () {
        window.clearInterval(this.intervalId);
    };
    IncrementumLudus.prototype.onTick = function () {
        var _this = this;
        if (this.status == IncrementumLudusStatus.LOOSE || this.status == IncrementumLudusStatus.WIN) {
            console.log("Status is " + this.status + ", STOP");
            this.stop();
        }
        this.producers.forEach(function (producer) {
            if (producer.isAuto) {
                _this.autoCollectProducer(producer);
            }
        });
        this.triggers.forEach(function (trigger) { return _this.checkTrigger(trigger); });
        this.crafters.forEach(function (crafter) { return _this.checkCrafter(crafter); });
        this.saveCallback(this);
    };
    IncrementumLudus.prototype.autoCollectProducer = function (producer) {
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
    IncrementumLudus.prototype.collectManualProducer = function (producer) {
        var _this = this;
        if (this.status == IncrementumLudusStatus.IN_PROGRESS) {
            producer.getResourcesQuantity().forEach(function (res) { return _this.player.increaseStorage(res); });
        }
    };
    IncrementumLudus.prototype.collectProducer = function (producerName) {
        var producer = this.getProducerByName(producerName);
        if (producer != null) {
            if (!producer.isAuto()) {
                this.collectManualProducer(producer);
            }
        }
    };
    IncrementumLudus.prototype.getProducerByName = function (producerName) {
        var producers = this.producers.filter(function (src) { return src.getName() == producerName; });
        if (producers.length == 0) {
            return null;
        }
        return producers[0];
    };
    IncrementumLudus.prototype.checkTrigger = function (trigger) {
        var _this = this;
        if (this.player.hasResources(trigger.getResourcesTrigger())) {
            trigger.getSpawnProducers().forEach(function (pawnProducer) { return _this.producers.push(pawnProducer); });
            trigger.getSpawnResources().forEach(function (res) { return _this.player.increaseStorage(res); });
            trigger.getSpawnCrafters().forEach(function (crafter) { return _this.crafters.push(crafter); });
            trigger.getSpawnNewTriggers().forEach(function (newTrigger) { return _this.triggers.push(newTrigger); });
            if (trigger.getCallback() != "") {
                window.setTimeout(trigger.getCallback(), 1);
            }
            var newStatus = trigger.getChangeEngineStatus();
            if (newStatus != null) {
                this.status = newStatus;
            }
            this.triggers.splice(this.triggers.indexOf(trigger), 1);
        }
    };
    IncrementumLudus.prototype.checkCrafter = function (crafter) {
        this.checkFinishedCrafting(crafter);
        this.checkStartAutoCrafting(crafter);
    };
    IncrementumLudus.prototype.checkFinishedCrafting = function (crafter) {
        var _this = this;
        var duration = this.fastMode ? this.fastMode : crafter.getDuration();
        var startTime = crafter.getStartTime();
        if (startTime != null && (startTime.getTime() + duration <= new Date().getTime())) {
            crafter.resetStartTime();
            crafter.getCraftedResources().forEach(function (resourceQty) { return _this.player.increaseStorage(resourceQty); });
        }
    };
    IncrementumLudus.prototype.checkStartAutoCrafting = function (crafter) {
        var _this = this;
        if (crafter.isAuto() && crafter.getStartTime() == null && this.player.hasResources(crafter.getCost())) {
            crafter.initStartTime();
            crafter.getCost().forEach(function (resourceQty) { return _this.player.decreaseStorage(resourceQty); });
        }
    };
    IncrementumLudus.prototype.startCrafting = function (crafterName) {
        var crafter = this.getCrafterByName(crafterName);
        if (crafter != null) {
            this.startManualCrafting(crafter);
        }
    };
    IncrementumLudus.prototype.startManualCrafting = function (crafter) {
        var _this = this;
        if (this.status == IncrementumLudusStatus.IN_PROGRESS) {
            if (!crafter.isAuto() && !crafter.isCrafting() && this.player.hasResources(crafter.getCost())) {
                crafter.initStartTime();
                crafter.getCost().forEach(function (resourceQty) { return _this.player.decreaseStorage(resourceQty); });
                return true;
            }
        }
        return false;
    };
    IncrementumLudus.prototype.switchAutoCrafting = function (crafterName) {
        if (this.status == IncrementumLudusStatus.IN_PROGRESS) {
            var crafter = this.getCrafterByName(crafterName);
            if (crafter != null) {
                crafter.setAuto(!crafter.isAuto());
            }
        }
    };
    IncrementumLudus.prototype.getCrafterByName = function (crafterName) {
        var crafters = this.crafters.filter(function (src) { return src.getName() == crafterName; });
        if (crafters.length == 0) {
            return null;
        }
        return crafters[0];
    };
    return IncrementumLudus;
}());
//# sourceMappingURL=IncrementumLudus.js.map