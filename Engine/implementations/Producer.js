var Producer = (function () {
    function Producer(Name, resourcesQuantity, Interval) {
        if (resourcesQuantity === void 0) { resourcesQuantity = []; }
        if (Interval === void 0) { Interval = null; }
        this.Name = Name;
        this.resourcesQuantity = resourcesQuantity;
        this.Interval = Interval;
        this.$type = 'Producer';
        this.StartTime = new Date(1970, 0, 1);
    }
    Producer.prototype.getName = function () {
        return this.Name;
    };
    Producer.prototype.getResourcesQuantity = function () {
        return this.resourcesQuantity;
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
        newObj.resourcesQuantity = curContext[data.resourceAmount.$type].load(data.resourceAmount);
        return newObj;
    };
    Producer.prototype.thatProduce = function (quantity) {
        this.resourcesQuantity.push(quantity);
        return this;
    };
    Producer.prototype.andProduce = function (quantity) {
        return this.thatProduce(quantity);
    };
    Producer.prototype.manualy = function () {
        this.Interval = null;
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