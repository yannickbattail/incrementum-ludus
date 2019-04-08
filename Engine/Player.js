var Player = (function () {
    function Player(Name) {
        this.Name = Name;
        this.$type = 'Player';
        this.Storage = new Array();
    }
    Player.load = function (data) {
        var curContext = window;
        var player = new Player(data.Name);
        player.Storage = data.Storage.map(function (p) { return curContext[p.$type].load(p); });
        return player;
    };
    Player.prototype.changeStorage = function (resourceQuantity) {
        var resQ = this.getResourceInStorage(resourceQuantity.Resource.Name);
        if (resQ == null) {
            this.Storage.push(new ResourceQuantity(resourceQuantity.Resource, resourceQuantity.Quantity));
        }
        else {
            resQ.Quantity += resourceQuantity.Quantity;
        }
    };
    Player.prototype.decreaseStorage = function (resourceQuantity) {
        var resQ = this.getResourceInStorage(resourceQuantity.Resource.Name);
        if (resQ == null) {
            this.Storage.push(new ResourceQuantity(resourceQuantity.Resource, -1 * resourceQuantity.Quantity));
        }
        else {
            resQ.Quantity += -1 * resourceQuantity.Quantity;
        }
    };
    Player.prototype.getResourceInStorage = function (resourceName) {
        var res = this.Storage.filter(function (res) { return res.Resource.Name == resourceName; });
        if (res.length) {
            return res[0];
        }
        return null;
    };
    Player.prototype.hasResources = function (resourcesQuantity) {
        var _this = this;
        var hasRes = true;
        resourcesQuantity.forEach(function (resQ) {
            var playerRes = _this.getResourceInStorage(resQ.Resource.Name);
            if (playerRes == null || playerRes.Quantity < resQ.Quantity) {
                hasRes = false;
            }
        });
        return hasRes;
    };
    return Player;
}());
//# sourceMappingURL=Player.js.map