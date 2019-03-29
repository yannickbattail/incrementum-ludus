var Crafter = (function () {
    function Crafter(Name, Duration, Cost, CraftedResource, AutoCrafting) {
        if (Duration === void 0) { Duration = 0; }
        if (Cost === void 0) { Cost = []; }
        if (CraftedResource === void 0) { CraftedResource = EMPTY_RQ; }
        if (AutoCrafting === void 0) { AutoCrafting = false; }
        this.Name = Name;
        this.Duration = Duration;
        this.Cost = Cost;
        this.CraftedResource = CraftedResource;
        this.AutoCrafting = AutoCrafting;
    }
    Crafter.prototype.thatCraft = function (quantity, resource) {
        this.CraftedResource = new ResourceQuantity(resource, quantity);
        return this;
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
    Crafter.prototype.atCostOf = function (quantity, resource) {
        this.Cost.push(new ResourceQuantity(resource, quantity));
        return this;
    };
    Crafter.prototype.and = function (quantity, resource) {
        return this.atCostOf(quantity, resource);
    };
    Crafter.prototype.isCrafting = function () {
        return this.StartTime != null;
    };
    return Crafter;
}());
//# sourceMappingURL=Crafter.js.map