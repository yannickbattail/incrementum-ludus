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
        var resQ = this.getResourceInStorage(resourceQuantity.getResource().getName());
        if (resQ == null) {
            this.Storage.push(new ResourceQuantity(resourceQuantity.getResource(), resourceQuantity.getQuantity()));
        }
        else {
            resQ.setQuantity(resQ.getQuantity() + resourceQuantity.getQuantity());
        }
    };
    Player.prototype.decreaseStorage = function (resourceQuantity) {
        var resQ = this.getResourceInStorage(resourceQuantity.getResource().getName());
        if (resQ == null) {
            this.Storage.push(new ResourceQuantity(resourceQuantity.getResource(), -1 * resourceQuantity.getQuantity()));
        }
        else {
            resQ.setQuantity(resQ.getQuantity() + -1 * resourceQuantity.getQuantity());
        }
    };
    Player.prototype.getResourceInStorage = function (resourceName) {
        var res = this.Storage.filter(function (res) { return res.getResource().getName() == resourceName; });
        if (res.length) {
            return res[0];
        }
        return null;
    };
    Player.prototype.hasResources = function (resourcesQuantity) {
        var _this = this;
        var hasRes = true;
        resourcesQuantity.forEach(function (resQ) {
            var playerRes = _this.getResourceInStorage(resQ.getResource().getName());
            if (playerRes == null || playerRes.getQuantity() < resQ.getQuantity()) {
                hasRes = false;
            }
        });
        return hasRes;
    };
    return Player;
}());
//# sourceMappingURL=Player.js.map