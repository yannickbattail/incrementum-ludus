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
var TimedProducer = (function (_super) {
    __extends(TimedProducer, _super);
    function TimedProducer(Name, Resource, Interval) {
        if (Resource === void 0) { Resource = EMPTY_RQ; }
        if (Interval === void 0) { Interval = 0; }
        var _this = _super.call(this, Name, Resource) || this;
        _this.Interval = Interval;
        _this.LastTime = new Date(1970, 0, 1);
        return _this;
    }
    TimedProducer.prototype.thatProduce = function (quantity, resource) {
        this.ResourceQuantity = new ResourceQuantity(resource, quantity);
        return this;
    };
    TimedProducer.prototype.every = function (interval) {
        this.Interval = interval;
        return this;
    };
    TimedProducer.prototype.seconds = function () {
        this.Interval *= 1000;
        return this;
    };
    TimedProducer.prototype.minutes = function () {
        this.Interval *= 60 * 1000;
        return this;
    };
    return TimedProducer;
}(Producer));
//# sourceMappingURL=TimedProducer.js.map