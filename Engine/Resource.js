var Resource = (function () {
    function Resource(Name) {
        this.Name = Name;
    }
    Resource.prototype.show = function (quantity) {
        return quantity + ' ' + this.Name;
    };
    return Resource;
}());
//# sourceMappingURL=Resource.js.map