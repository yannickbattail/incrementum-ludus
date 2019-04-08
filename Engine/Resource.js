var Resource = (function () {
    function Resource(Name) {
        this.Name = Name;
        this.$type = 'Resource';
    }
    Resource.load = function (data) {
        var r = new Resource(data.Name);
        return r;
    };
    Resource.prototype.equals = function (obj) {
        return this.Name == obj.Name;
    };
    Resource.prototype.show = function (quantity) {
        return quantity + ' ' + this.Name;
    };
    return Resource;
}());
//# sourceMappingURL=Resource.js.map