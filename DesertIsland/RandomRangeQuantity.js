var RandomRangeQuantity = (function () {
    function RandomRangeQuantity(minQuantity, maxQuantity, resource) {
        this.minQuantity = minQuantity;
        this.maxQuantity = maxQuantity;
        this.resource = resource;
        this.$type = 'RandomRangeQuantity';
    }
    RandomRangeQuantity.load = function (data) {
        var curContext = window;
        var res = curContext[data.Resource.$type].load(data.Resource);
        var rq = new RandomRangeQuantity(data.minQuantity, data.maxQuantity, res);
        return rq;
    };
    RandomRangeQuantity.prototype.getQuantity = function () {
        return Math.floor(Math.random() * (this.maxQuantity - this.minQuantity + 1) + this.minQuantity);
    };
    RandomRangeQuantity.prototype.setQuantity = function (minQuantity, maxQuantity) {
        this.minQuantity = minQuantity;
        this.maxQuantity = maxQuantity;
    };
    RandomRangeQuantity.prototype.getResource = function () {
        return this.resource;
    };
    RandomRangeQuantity.prototype.show = function () {
        return '' + this.minQuantity + ' ' + this.resource.show(this.maxQuantity);
    };
    return RandomRangeQuantity;
}());
//# sourceMappingURL=RandomRangeQuantity.js.map