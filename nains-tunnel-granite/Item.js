"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Item = (function (_super) {
    __extends(Item, _super);
    function Item(name, image) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        _this.image = image;
        _this.$type = 'Item';
        return _this;
    }
    Item.load = function (data) {
        var r = new Item(data.name, data.image);
        return r;
    };
    Item.prototype.show = function (quantity) {
        return "" + quantity;
    };
    return Item;
}(Resource));
//# sourceMappingURL=Item.js.map