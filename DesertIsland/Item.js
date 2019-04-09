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
    function Item(Name, Image) {
        var _this = _super.call(this, name) || this;
        _this.Name = Name;
        _this.Image = Image;
        _this.$type = 'Item';
        return _this;
    }
    Item.load = function (data) {
        var r = new Item(data.Name, data.Image);
        return r;
    };
    Item.prototype.show = function (quantity) {
        return '<div class="resource Item">' + quantity + ' <img src="images/' + this.Image + '.svg" title="' + this.Name + '" alt="' + this.Name + '" class="resource_img"></div>';
    };
    return Item;
}(Resource));
//# sourceMappingURL=Item.js.map