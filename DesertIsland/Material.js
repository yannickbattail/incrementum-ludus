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
var Material = (function (_super) {
    __extends(Material, _super);
    function Material(Name, Unit, Image) {
        var _this = _super.call(this, name) || this;
        _this.Name = Name;
        _this.Unit = Unit;
        _this.Image = Image;
        _this.$type = 'Material';
        return _this;
    }
    Material.load = function (data) {
        var r = new Material(data.Name, data.Unit, data.Image);
        return r;
    };
    Material.prototype.show = function (quantity) {
        var u = this.Unit;
        var q = quantity;
        if (u == 'g') {
            if (quantity >= 1000) {
                u = 'kg';
                q = Math.round(q / 100) / 10;
            }
        }
        if (u == 'cl') {
            if (quantity >= 100) {
                u = 'l';
                q = Math.round(q / 10) / 10;
            }
        }
        return '<div class="resource Material">' + q + u + ' <img src="images/' + this.Image + '.svg" title="' + this.Name + '" alt="' + this.Name + '" class="resource_img"></div>';
    };
    return Material;
}(Resource));
//# sourceMappingURL=Material.js.map