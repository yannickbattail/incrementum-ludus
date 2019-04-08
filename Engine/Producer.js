var Producer = (function () {
    function Producer(Name, ResourceQuantity) {
        if (ResourceQuantity === void 0) { ResourceQuantity = EMPTY_RQ; }
        this.Name = Name;
        this.ResourceQuantity = ResourceQuantity;
        this.$type = 'Producer';
    }
    return Producer;
}());
//# sourceMappingURL=Producer.js.map