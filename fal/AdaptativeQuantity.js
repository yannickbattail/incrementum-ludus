var AdaptativeQuantity = (function () {
    function AdaptativeQuantity(quantity, resource, resourceDependencyName, quanityStep) {
        this.quantity = quantity;
        this.resource = resource;
        this.resourceDependencyName = resourceDependencyName;
        this.quanityStep = quanityStep;
        this.$type = 'AdaptativeQuantity';
    }
    AdaptativeQuantity.load = function (data) {
        var curContext = window;
        var res = curContext[data.resource.$type].load(data.resource);
        var rq = new AdaptativeQuantity(data.quantity, res, data.resourceDependencyName, data.quanityStep);
        return rq;
    };
    AdaptativeQuantity.prototype.getQuantity = function () {
        var e = engine;
        var res = e.player.getResourceInStorage(this.resourceDependencyName);
        if (res == null) {
            return 0;
        }
        if (res.getQuantity() < this.quanityStep) {
            return 0;
        }
        return this.quantity;
    };
    AdaptativeQuantity.prototype.setQuantity = function (quantity) {
        this.quantity = quantity;
    };
    AdaptativeQuantity.prototype.getResource = function () {
        return this.resource;
    };
    AdaptativeQuantity.prototype.show = function () {
        return '?' + this.resource.show(this.quantity);
    };
    return AdaptativeQuantity;
}());
//# sourceMappingURL=AdaptativeQuantity.js.map