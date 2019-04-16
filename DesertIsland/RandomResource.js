var RandomResource = (function () {
    function RandomResource(quantity, resource, probability) {
        this.quantity = quantity;
        this.resource = resource;
        this.probability = probability;
        this.$type = 'RandomResource';
    }
    RandomResource.load = function (data) {
        var curContext = window;
        var res = curContext[data.resource.$type].load(data.resource);
        var rq = new RandomResource(data.quantity, res, data.probability);
        return rq;
    };
    RandomResource.prototype.getQuantity = function () {
        if (Math.random() < this.probability) {
            return this.quantity;
        }
        return 0;
    };
    RandomResource.prototype.setQuantity = function (quantity) {
        this.quantity = quantity;
    };
    RandomResource.prototype.getResource = function () {
        return this.resource;
    };
    RandomResource.prototype.show = function () {
        return this.probability + ' chance of ' + this.resource.show(this.quantity);
    };
    return RandomResource;
}());
//# sourceMappingURL=RandomResource.js.map