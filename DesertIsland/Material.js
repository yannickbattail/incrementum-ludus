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
    function Material(name, unit, image) {
        var _this = _super.call(this, name) || this;
        _this.unit = unit;
        _this.image = image;
        return _this;
    }
    return Material;
}(Resource));
//# sourceMappingURL=Material.js.map