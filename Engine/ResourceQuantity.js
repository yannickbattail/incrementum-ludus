var ResourceQuantity = (function () {
    function ResourceQuantity(Resource, Quantity) {
        this.Resource = Resource;
        this.Quantity = Quantity;
    }
    return ResourceQuantity;
}());
var EMPTY_RQ = new ResourceQuantity(new Resource("nothing"), 0);
//# sourceMappingURL=ResourceQuantity.js.map