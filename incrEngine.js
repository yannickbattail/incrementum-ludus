var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Resource = (function () {
    function Resource(Name) {
        this.Name = Name;
    }
    return Resource;
}());
var ResourceQuantity = (function () {
    function ResourceQuantity(Resource, Quantity) {
        this.Resource = Resource;
        this.Quantity = Quantity;
    }
    return ResourceQuantity;
}());
var Producer = (function () {
    function Producer(Name, Resource) {
        this.Name = Name;
        this.Resource = Resource;
    }
    return Producer;
}());
var TimedProducer = (function (_super) {
    __extends(TimedProducer, _super);
    function TimedProducer(Name, Resource, Interval) {
        var _this = _super.call(this, Name, Resource) || this;
        _this.Interval = Interval;
        _this.LastTime = new Date(1970, 0, 1);
        return _this;
    }
    return TimedProducer;
}(Producer));
var ManualProducer = (function (_super) {
    __extends(ManualProducer, _super);
    function ManualProducer(Name, Resource) {
        return _super.call(this, Name, Resource) || this;
    }
    return ManualProducer;
}(Producer));
var Trigger = (function () {
    function Trigger(Name, ResourcesTrigger, SpawnProducer) {
        if (ResourcesTrigger === void 0) { ResourcesTrigger = []; }
        this.Name = Name;
        this.ResourcesTrigger = ResourcesTrigger;
        this.SpawnProducer = SpawnProducer;
    }
    return Trigger;
}());
var Crafter = (function () {
    function Crafter() {
        this.AutoCrafting = false;
        this.Cost = [];
    }
    return Crafter;
}());
var Player = (function () {
    function Player(Name) {
        this.Name = Name;
        this.Storage = new Array();
    }
    Player.prototype.changeStorage = function (resourceQuantity) {
        var resQ = this.getResourceInStorage(resourceQuantity.Resource.Name);
        if (resQ == null) {
            this.Storage.push(new ResourceQuantity(resourceQuantity.Resource, resourceQuantity.Quantity));
        }
        else {
            resQ.Quantity += resourceQuantity.Quantity;
        }
    };
    Player.prototype.getResourceInStorage = function (resourceName) {
        var res = this.Storage.filter(function (res) { return res.Resource.Name == resourceName; });
        if (res.length) {
            return res[0];
        }
        return null;
    };
    Player.prototype.hasResources = function (resourcesQuantity) {
        var _this = this;
        var hasRes = true;
        resourcesQuantity.forEach(function (resQ) {
            var playerRes = _this.getResourceInStorage(resQ.Resource.Name);
            if (playerRes == null || playerRes.Quantity < resQ.Quantity) {
                hasRes = false;
            }
        });
        return hasRes;
    };
    return Player;
}());
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
//# sourceMappingURL=incrEngine.js.map