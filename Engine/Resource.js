var Resource = (function () {
    function Resource(Name) {
        this.Name = Name;
        this.$type = 'Resource';
    }
    Resource.prototype.getName = function () {
        return this.Name;
    };
    Resource.load = function (data) {
        var r = new Resource(data.Name);
        return r;
    };
    Resource.prototype.equals = function (obj) {
        return this.getName() == obj.getName();
    };
    Resource.prototype.show = function (quantity) {
        return quantity + ' ' + this.Name;
    };
    return Resource;
}());
//# sourceMappingURL=Resource.js.map