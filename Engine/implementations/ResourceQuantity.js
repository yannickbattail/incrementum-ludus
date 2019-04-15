var ResourceQuantity = (function () {
    function ResourceQuantity(Resource, Quantity) {
        this.Resource = Resource;
        this.Quantity = Quantity;
        this.$type = 'ResourceQuantity';
    }
    ResourceQuantity.load = function (data) {
        var curContext = window;
        var res = curContext[data.Resource.$type].load(data.Resource);
        var rq = new ResourceQuantity(res, data.Quantity);
        return rq;
    };
    ResourceQuantity.prototype.getQuantity = function () {
        return this.Quantity;
    };
    ResourceQuantity.prototype.setQuantity = function (quantity) {
        this.Quantity = quantity;
    };
    ResourceQuantity.prototype.getResource = function () {
        return this.Resource;
    };
    ResourceQuantity.prototype.show = function () {
        return this.Resource.show(this.Quantity);
    };
    return ResourceQuantity;
}());
var EMPTY_RQ = new ResourceQuantity(new Resource("nothing"), 0);
//# sourceMappingURL=ResourceQuantity.js.map