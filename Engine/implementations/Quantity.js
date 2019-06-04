"use strict";
var Quantity = (function () {
    function Quantity(quantity, resource) {
        this.quantity = quantity;
        this.resource = resource;
        this.$type = 'Quantity';
    }
    Quantity.load = function (data) {
        var curContext = window;
        var res = curContext[data.resource.$type].load(data.resource);
        var rq = new Quantity(data.quantity, res);
        return rq;
    };
    Quantity.prototype.getQuantity = function () {
        return this.quantity;
    };
    Quantity.prototype.setQuantity = function (quantity) {
        this.quantity = quantity;
    };
    Quantity.prototype.getResource = function () {
        return this.resource;
    };
    Quantity.prototype.show = function () {
        return this.resource.show(this.quantity);
    };
    return Quantity;
}());
var EMPTY_QUANTITY = new Quantity(0, new Resource("nothing"));
//# sourceMappingURL=Quantity.js.map