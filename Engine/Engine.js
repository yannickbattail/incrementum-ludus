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
        this.Triggers.forEach(function (trigger) { return _this.checkTriggers(trigger); });
    };
    Engine.prototype.collectTimedProducer = function (producer) {
        if (producer.LastTime.getTime() + producer.Interval < new Date().getTime()) {
            producer.LastTime = new Date();
            this.Player.changeStorage(producer.Resource);
        }
    };
    Engine.prototype.collectManualProducer = function (producer) {
        this.Player.changeStorage(producer.Resource);
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
    Engine.prototype.checkTriggers = function (trigger) {
        if (this.Player.hasResources(trigger.ResourcesTrigger)) {
            this.Producers.push(trigger.SpawnProducer);
            this.Triggers.splice(this.Triggers.indexOf(trigger), 1);
        }
    };
    return Engine;
}());
//# sourceMappingURL=Engine.js.map