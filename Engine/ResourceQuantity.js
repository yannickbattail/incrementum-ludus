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
    return ResourceQuantity;
}());
var EMPTY_RQ = new ResourceQuantity(new Resource("nothing"), 0);
//# sourceMappingURL=ResourceQuantity.js.map