"use strict";
var Crafter = (function () {
    function Crafter(name, duration, cost, craftedResources, autoCrafting, automatable) {
        if (duration === void 0) { duration = 0; }
        if (cost === void 0) { cost = []; }
        if (craftedResources === void 0) { craftedResources = []; }
        if (autoCrafting === void 0) { autoCrafting = false; }
        if (automatable === void 0) { automatable = false; }
        this.name = name;
        this.duration = duration;
        this.cost = cost;
        this.craftedResources = craftedResources;
        this.autoCrafting = autoCrafting;
        this.automatable = automatable;
        this.$type = 'Crafter';
        this.startTime = null;
    }
    Crafter.load = function (data) {
        var curContext = window;
        var newObj = new Crafter(data.name);
        newObj.duration = data.duration;
        newObj.startTime = data.startTime != null ? new Date(data.startTime) : null;
        newObj.cost = data.cost.map(function (p) { return curContext[p.$type].load(p); });
        newObj.craftedResources = data.craftedResources.map(function (p) { return curContext[p.$type].load(p); });
        newObj.autoCrafting = data.autoCrafting;
        newObj.automatable = data.automatable;
        return newObj;
    };
    Crafter.prototype.getStartTime = function () {
        return this.startTime;
    };
    Crafter.prototype.resetStartTime = function () {
        this.startTime = null;
    };
    Crafter.prototype.initStartTime = function () {
        this.startTime = new Date();
    };
    Crafter.prototype.getName = function () {
        return this.name;
    };
    Crafter.prototype.getDuration = function () {
        return this.duration;
    };
    Crafter.prototype.getCost = function () {
        return this.cost;
    };
    Crafter.prototype.getCraftedResources = function () {
        return this.craftedResources;
    };
    Crafter.prototype.isAuto = function () {
        return this.autoCrafting;
    };
    Crafter.prototype.setAuto = function (auto) {
        this.autoCrafting = auto;
    };
    Crafter.prototype.isAutomatable = function () {
        return this.automatable;
    };
    Crafter.prototype.setAutomatable = function (automatable) {
        this.automatable = automatable;
    };
    Crafter.prototype.thatCraft = function (quantity) {
        this.craftedResources.push(quantity);
        return this;
    };
    Crafter.prototype.andCraft = function (quantity) {
        return this.thatCraft(quantity);
    };
    Crafter.prototype["in"] = function (interval) {
        this.duration = interval;
        return this;
    };
    Crafter.prototype.seconds = function () {
        this.duration *= 1000;
        return this;
    };
    Crafter.prototype.minutes = function () {
        this.duration *= 60 * 1000;
        return this;
    };
    Crafter.prototype.automaticaly = function () {
        this.autoCrafting = true;
        return this;
    };
    Crafter.prototype.canBeSwitchedToAuto = function () {
        this.automatable = true;
        return this;
    };
    Crafter.prototype.atCostOf = function (quantity) {
        this.cost.push(quantity);
        return this;
    };
    Crafter.prototype.and = function (quantity) {
        return this.atCostOf(quantity);
    };
    Crafter.prototype.isCrafting = function () {
        return this.startTime != null;
    };
    return Crafter;
}());
//# sourceMappingURL=Crafter.js.map