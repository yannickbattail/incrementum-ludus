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
    Player.prototype.getName = function () {
        return this.Name;
    };
    Player.prototype.getStorage = function () {
        return this.Storage;
    };
    Player.prototype.changeStorage = function (quantity) {
        var resQ = this.getResourceInStorage(quantity.getResource().getName());
        if (resQ == null) {
            this.Storage.push(new Quantity(quantity.getQuantity(), quantity.getResource()));
        }
        else {
            resQ.setQuantity(resQ.getQuantity() + quantity.getQuantity());
        }
    };
    Player.prototype.decreaseStorage = function (quantity) {
        var resQ = this.getResourceInStorage(quantity.getResource().getName());
        if (resQ == null) {
            this.Storage.push(new Quantity(-1 * quantity.getQuantity(), quantity.getResource()));
        }
        else {
            resQ.setQuantity(resQ.getQuantity() + -1 * quantity.getQuantity());
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