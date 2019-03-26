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
var Source = (function () {
    function Source(Name, Resource) {
        this.Name = Name;
        this.Resource = Resource;
    }
    return Source;
}());
var TimedSource = (function (_super) {
    __extends(TimedSource, _super);
    function TimedSource(Name, Resource, Interval) {
        var _this = _super.call(this, Name, Resource) || this;
        _this.Interval = Interval;
        _this.LastTime = new Date(1970, 0, 1);
        return _this;
    }
    return TimedSource;
}(Source));
var ManualSource = (function (_super) {
    __extends(ManualSource, _super);
    function ManualSource(Name, Resource) {
        return _super.call(this, Name, Resource) || this;
    }
    return ManualSource;
}(Source));
var Trigger = (function () {
    function Trigger(Name, ResourcesTrigger, SpawnSource) {
        if (ResourcesTrigger === void 0) { ResourcesTrigger = []; }
        this.Name = Name;
        this.ResourcesTrigger = ResourcesTrigger;
        this.SpawnSource = SpawnSource;
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
        this.Sources = [];
        this.Triggers = [];
        this.Crafters = [];
    }
    Engine.prototype.run = function () {
        var _this = this;
        window.setInterval(function () { return _this.runTick(); }, 1000);
    };
    Engine.prototype.runTick = function () {
        var _this = this;
        this.Sources.forEach(function (source) {
            if (source instanceof TimedSource) {
                _this.collectTimedSource(source);
            }
        });
        this.Triggers.forEach(function (trigger) { return _this.checkTriggers(trigger); });
    };
    Engine.prototype.collectTimedSource = function (source) {
        if (source.LastTime.getTime() + source.Interval < new Date().getTime()) {
            source.LastTime = new Date();
            this.Player.changeStorage(source.Resource);
        }
    };
    Engine.prototype.collectManualSource = function (source) {
        this.Player.changeStorage(source.Resource);
    };
    Engine.prototype.collectSource = function (sourceName) {
        var source = this.getSourceByName(sourceName);
        if (source != null) {
            if (source instanceof ManualSource) {
                this.collectManualSource(source);
            }
        }
    };
    Engine.prototype.getSourceByName = function (sourceName) {
        var sources = this.Sources.filter(function (src) { return src.Name == sourceName; });
        if (sources.length == 0) {
            return null;
        }
        return sources[0];
    };
    Engine.prototype.checkTriggers = function (trigger) {
        if (this.Player.hasResources(trigger.ResourcesTrigger)) {
            this.Sources.push(trigger.SpawnSource);
            this.Triggers.splice(this.Triggers.indexOf(trigger), 1);
        }
    };
    return Engine;
}());
//# sourceMappingURL=incrEngine.js.map