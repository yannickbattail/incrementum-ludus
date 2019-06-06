"use strict";
var AdaptativeQuantity = (function () {
    function AdaptativeQuantity() {
        this.$type = 'AdaptativeQuantity';
        this.quantityIfYes = EMPTY_QUANTITY;
        this.quantityIfNot = EMPTY_QUANTITY;
        this.quantityStep = EMPTY_QUANTITY;
        this.showQuantityIfNot = true;
    }
    AdaptativeQuantity.load = function (data) {
        var curContext = window;
        var rq = new AdaptativeQuantity();
        rq.quantityIfYes = curContext[data.quantityIfYes.$type].load(data.quantityIfYes);
        rq.quantityIfNot = curContext[data.quantityIfNot.$type].load(data.quantityIfNot);
        rq.quantityStep = curContext[data.quantityStep.$type].load(data.quantityStep);
        rq.showQuantityIfNot = data.showQuantityIfNot;
        return rq;
    };
    AdaptativeQuantity.prototype.getVariableQuanity = function () {
        var e = engine;
        if (e.player.hasResources([this.quantityStep])) {
            return this.quantityIfYes;
        }
        return this.quantityIfNot;
    };
    AdaptativeQuantity.prototype.getQuantity = function () {
        return this.getVariableQuanity().getQuantity();
    };
    AdaptativeQuantity.prototype.getResource = function () {
        return this.getVariableQuanity().getResource();
    };
    AdaptativeQuantity.prototype.show = function () {
        return this.getResource().show(this.getQuantity());
    };
    AdaptativeQuantity.prototype.getDetails = function () {
        return '<div class="chanceOf">mais pas toujours</div>';
    };
    AdaptativeQuantity.prototype.ifHas = function (quantityStep) {
        this.quantityStep = quantityStep;
        return this;
    };
    AdaptativeQuantity.prototype.give = function (quantityIfYes) {
        this.quantityIfYes = quantityIfYes;
        return this;
    };
    AdaptativeQuantity.prototype.elseGive = function (quantityIfNot) {
        this.quantityIfNot = quantityIfNot;
        return this;
    };
    AdaptativeQuantity.prototype.showTheQuantityIfNot = function () {
        this.showQuantityIfNot = true;
        return this;
    };
    return AdaptativeQuantity;
}());
//# sourceMappingURL=AdaptativeQuantity.js.map