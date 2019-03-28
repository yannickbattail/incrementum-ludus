var Crafter = (function () {
    function Crafter(Name, Duration, Cost, CraftedResource, AutoCrafting) {
        if (Cost === void 0) { Cost = []; }
        if (AutoCrafting === void 0) { AutoCrafting = false; }
        this.Name = Name;
        this.Duration = Duration;
        this.Cost = Cost;
        this.CraftedResource = CraftedResource;
        this.AutoCrafting = AutoCrafting;
    }
    Crafter.prototype.isCrafting = function () {
        return this.StartTime != null;
    };
    return Crafter;
}());
//# sourceMappingURL=Crafter.js.map