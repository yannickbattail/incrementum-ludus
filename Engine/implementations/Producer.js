var Producer = (function () {
    function Producer(name, resourcesQuantity, interval) {
        if (resourcesQuantity === void 0) { resourcesQuantity = []; }
        if (interval === void 0) { interval = null; }
        this.name = name;
        this.resourcesQuantity = resourcesQuantity;
        this.interval = interval;
        this.$type = 'Producer';
        this.startTime = new Date(1970, 0, 1);
    }
    Producer.prototype.getName = function () {
        return this.name;
    };
    Producer.prototype.getResourcesQuantity = function () {
        return this.resourcesQuantity;
    };
    Producer.prototype.getInterval = function () {
        return this.interval;
    };
    Producer.prototype.isAuto = function () {
        return this.interval != null;
    };
    Producer.prototype.getStartTime = function () {
        return this.startTime;
    };
    Producer.prototype.resetStartTime = function () {
        this.startTime = null;
    };
    Producer.prototype.initStartTime = function () {
        this.startTime = new Date();
    };
    Producer.load = function (data) {
        var curContext = window;
        var newObj = new Producer(data.name);
        newObj.interval = data.interval;
        newObj.startTime = data.startTime != null ? new Date(data.startTime) : null;
        newObj.resourcesQuantity = data.resourcesQuantity.map(function (p) { return curContext[p.$type].load(p); });
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
        this.interval = null;
        return this;
    };
    Producer.prototype.every = function (interval) {
        this.interval = interval;
        return this;
    };
    Producer.prototype.seconds = function () {
        if (this.interval != null) {
            this.interval *= 1000;
        }
        return this;
    };
    Producer.prototype.minutes = function () {
        if (this.interval != null) {
            this.interval *= 60 * 1000;
        }
        return this;
    };
    return Producer;
}());
//# sourceMappingURL=Producer.js.map