"use strict";
var Resource = (function () {
    function Resource(name) {
        this.name = name;
        this.$type = 'Resource';
    }
    Resource.prototype.getName = function () {
        return this.name;
    };
    Resource.load = function (data) {
        var r = new Resource(data.name);
        return r;
    };
    Resource.prototype.equals = function (obj) {
        return this.getName() == obj.getName();
    };
    Resource.prototype.show = function (quantity) {
        return quantity + ' ' + this.name;
    };
    return Resource;
}());
//# sourceMappingURL=Resource.js.map