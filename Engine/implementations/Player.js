var Player = (function () {
    function Player(name) {
        this.name = name;
        this.$type = 'Player';
        this.storage = new Array();
    }
    Player.load = function (data) {
        var curContext = window;
        var player = new Player(data.name);
        player.storage = data.storage.map(function (p) { return curContext[p.$type].load(p); });
        return player;
    };
    Player.prototype.getName = function () {
        return this.name;
    };
    Player.prototype.getStorage = function () {
        return this.storage;
    };
    Player.prototype.increaseStorage = function (quantity) {
        var resQ = this.getResourceInStorage(quantity.getResource().getName());
        if (resQ == null) {
            this.storage.push(new Quantity(quantity.getQuantity(), quantity.getResource()));
        }
        else {
            resQ.setQuantity(resQ.getQuantity() + quantity.getQuantity());
        }
    };
    Player.prototype.decreaseStorage = function (quantity) {
        var resQ = this.getResourceInStorage(quantity.getResource().getName());
        if (resQ == null) {
            this.storage.push(new Quantity(-1 * quantity.getQuantity(), quantity.getResource()));
        }
        else {
            resQ.setQuantity(resQ.getQuantity() + -1 * quantity.getQuantity());
        }
    };
    Player.prototype.getResourceInStorage = function (resourceName) {
        var res = this.storage.filter(function (res) { return res.getResource().getName() == resourceName; });
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