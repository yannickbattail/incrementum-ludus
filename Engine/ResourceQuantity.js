var ResourceQuantity = (function () {
    function ResourceQuantity(Resource, Quantity) {
        this.Resource = Resource;
        this.Quantity = Quantity;
        this.$type = 'ResourceQuantity';
    }
    ResourceQuantity.load = function (data) {
        var rq = new ResourceQuantity(Resource.load(data.Resource), data.Quantity);
        return rq;
    };
    return ResourceQuantity;
}());
var EMPTY_RQ = new ResourceQuantity(new Resource("nothing"), 0);
//# sourceMappingURL=ResourceQuantity.js.map