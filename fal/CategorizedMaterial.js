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
var CategorizedMaterial = (function (_super) {
    __extends(CategorizedMaterial, _super);
    function CategorizedMaterial(name, unit, image, category) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        _this.unit = unit;
        _this.image = image;
        _this.category = category;
        _this.$type = 'CategorizedMaterial';
        return _this;
    }
    CategorizedMaterial.load = function (data) {
        var r = new CategorizedMaterial(data.name, data.unit, data.image, data.category);
        return r;
    };
    CategorizedMaterial.prototype.show = function (quantity) {
        var u = this.unit;
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
        return q + u;
    };
    return CategorizedMaterial;
}(Resource));
//# sourceMappingURL=CategorizedMaterial.js.map