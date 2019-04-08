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
var ManualProducer = (function (_super) {
    __extends(ManualProducer, _super);
    function ManualProducer(Name, Resource) {
        if (Resource === void 0) { Resource = EMPTY_RQ; }
        var _this = _super.call(this, Name, Resource) || this;
        _this.Name = Name;
        _this.Resource = Resource;
        _this.$type = 'ManualProducer';
        return _this;
    }
    ManualProducer.load = function (data) {
        var curContext = window;
        var newObj = new ManualProducer(data.Name);
        newObj.Resource = curContext[data.Resource.$type].load(data.Resource);
        return newObj;
    };
    ManualProducer.prototype.thatProduce = function (quantity, resource) {
        this.ResourceQuantity = new ResourceQuantity(resource, quantity);
        return this;
    };
    return ManualProducer;
}(Producer));
//# sourceMappingURL=ManualProducer.js.map