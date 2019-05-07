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
var Level = (function (_super) {
    __extends(Level, _super);
    function Level(name, image, stepNames) {
        var _this = _super.call(this, name, image, stepNames) || this;
        _this.name = name;
        _this.image = image;
        _this.stepNames = stepNames;
        _this.$type = 'Level';
        return _this;
    }
    Level.load = function (data) {
        var r = new Level(data.name, data.image, data.stepNames);
        return r;
    };
    Level.prototype.show = function (quantity) {
        if (quantity < 0 || quantity >= this.stepNames.length) {
            return "" + quantity + ": UNKOWN";
        }
        return "" + quantity + ": " + this.stepNames[quantity];
    };
    return Level;
}(NamedStepResource));
//# sourceMappingURL=Level.js.map