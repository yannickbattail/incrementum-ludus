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
var TimedProducer = (function (_super) {
    __extends(TimedProducer, _super);
    function TimedProducer(Name, Resource, Interval) {
        var _this = _super.call(this, Name, Resource) || this;
        _this.Interval = Interval;
        _this.LastTime = new Date(1970, 0, 1);
        return _this;
    }
    return TimedProducer;
}(Producer));
//# sourceMappingURL=TimedProducer.js.map