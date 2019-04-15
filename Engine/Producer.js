var Producer = (function () {
    function Producer(Name, resourceAmount, Interval) {
        if (resourceAmount === void 0) { resourceAmount = EMPTY_RQ; }
        if (Interval === void 0) { Interval = null; }
        this.Name = Name;
        this.resourceAmount = resourceAmount;
        this.Interval = Interval;
        this.$type = 'Producer';
        this.StartTime = new Date(1970, 0, 1);
    }
    Producer.prototype.getName = function () {
        return this.Name;
    };
    Producer.prototype.getResourceAmount = function () {
        return this.resourceAmount;
    };
    Producer.prototype.getInterval = function () {
        return this.Interval;
    };
    Producer.prototype.isAuto = function () {
        return this.Interval != null;
    };
    Producer.prototype.getStartTime = function () {
        return this.StartTime;
    };
    Producer.prototype.resetStartTime = function () {
        this.StartTime = null;
    };
    Producer.prototype.initStartTime = function () {
        this.StartTime = new Date();
    };
    Producer.load = function (data) {
        var curContext = window;
        var newObj = new Producer(data.Name);
        newObj.Interval = data.Interval;
        newObj.resourceAmount = curContext[data.ResourceQuantity.$type].load(data.ResourceQuantity);
        return newObj;
    };
    Producer.prototype.thatProduce = function (quantity, resource) {
        this.resourceAmount = new ResourceQuantity(resource, quantity);
        return this;
    };
    Producer.prototype.every = function (interval) {
        this.Interval = interval;
        return this;
    };
    Producer.prototype.seconds = function () {
        if (this.Interval != null) {
            this.Interval *= 1000;
        }
        return this;
    };
    Producer.prototype.minutes = function () {
        if (this.Interval != null) {
            this.Interval *= 60 * 1000;
        }
        return this;
    };
    return Producer;
}());
//# sourceMappingURL=Producer.js.map