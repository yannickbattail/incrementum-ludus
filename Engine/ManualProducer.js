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
    function ManualProducer(Name, ResourceQuantity) {
        if (ResourceQuantity === void 0) { ResourceQuantity = EMPTY_RQ; }
        var _this = _super.call(this, Name, ResourceQuantity) || this;
        _this.Name = Name;
        _this.ResourceQuantity = ResourceQuantity;
        _this.$type = 'ManualProducer';
        return _this;
    }
    ManualProducer.load = function (data) {
        var curContext = window;
        var newObj = new ManualProducer(data.Name);
        newObj.ResourceQuantity = curContext[data.ResourceQuantity.$type].load(data.ResourceQuantity);
        return newObj;
    };
    ManualProducer.prototype.thatProduce = function (quantity, resource) {
        this.ResourceQuantity = new ResourceQuantity(resource, quantity);
        return this;
    };
    return ManualProducer;
}(Producer));
//# sourceMappingURL=ManualProducer.js.map