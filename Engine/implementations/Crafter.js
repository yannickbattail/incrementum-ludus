var Crafter = (function () {
    function Crafter(Name, Duration, Cost, CraftedResources, AutoCrafting) {
        if (Duration === void 0) { Duration = 0; }
        if (Cost === void 0) { Cost = []; }
        if (CraftedResources === void 0) { CraftedResources = []; }
        if (AutoCrafting === void 0) { AutoCrafting = false; }
        this.Name = Name;
        this.Duration = Duration;
        this.Cost = Cost;
        this.CraftedResources = CraftedResources;
        this.AutoCrafting = AutoCrafting;
        this.$type = 'Crafter';
    }
    Crafter.load = function (data) {
        var curContext = window;
        var newObj = new Crafter(data.Name);
        newObj.Duration = data.Duration;
        newObj.Cost = data.Cost.map(function (p) { return curContext[p.$type].load(p); });
        newObj.CraftedResources = data.CraftedResources.map(function (p) { return curContext[p.$type].load(p); });
        newObj.AutoCrafting = data.AutoCrafting;
        return newObj;
    };
    Crafter.prototype.getStartTime = function () {
        return this.StartTime;
    };
    Crafter.prototype.resetStartTime = function () {
        this.StartTime = null;
    };
    Crafter.prototype.initStartTime = function () {
        this.StartTime = new Date();
    };
    Crafter.prototype.getName = function () {
        return this.Name;
    };
    Crafter.prototype.getDuration = function () {
        return this.Duration;
    };
    Crafter.prototype.getCost = function () {
        return this.Cost;
    };
    Crafter.prototype.getCraftedResources = function () {
        return this.CraftedResources;
    };
    Crafter.prototype.isAuto = function () {
        return this.AutoCrafting;
    };
    Crafter.prototype.thatCraft = function (quantity) {
        this.CraftedResources.push(quantity);
        return this;
    };
    Crafter.prototype.andCraft = function (quantity) {
        return this.thatCraft(quantity);
    };
    Crafter.prototype["in"] = function (interval) {
        this.Duration = interval;
        return this;
    };
    Crafter.prototype.seconds = function () {
        this.Duration *= 1000;
        return this;
    };
    Crafter.prototype.minutes = function () {
        this.Duration *= 60 * 1000;
        return this;
    };
    Crafter.prototype.automaticaly = function () {
        this.AutoCrafting = true;
        return this;
    };
    Crafter.prototype.atCostOf = function (quantity) {
        this.Cost.push(quantity);
        return this;
    };
    Crafter.prototype.and = function (quantity) {
        return this.atCostOf(quantity);
    };
    Crafter.prototype.isCrafting = function () {
        return this.StartTime != null;
    };
    return Crafter;
}());
//# sourceMappingURL=Crafter.js.map