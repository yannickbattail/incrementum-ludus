var DesertIslandGui = (function () {
    function DesertIslandGui(engine) {
        this.engine = engine;
        this.engine = engine;
    }
    DesertIslandGui.prototype.displayLevel = function () {
        var level = this.engine.player.getResourceInStorage("level");
        var h = "XXX level";
        if (level != null) {
            h = 'Level: ' + this.displayQuantity(level);
        }
        h += '<button onclick="gui.restart()">Restart</button>';
        return h;
    };
    DesertIslandGui.prototype.displayStorage = function () {
        var _this = this;
        var h = '<table border="1">';
        h += "<tr><th>Resource storage</th></tr>";
        h += "<tr><td>";
        if (this.engine.player.getStorage().length <= 1) {
            h += "no resource";
        }
        else {
            this.engine.player.getStorage().forEach(function (res) {
                if (!(res.getResource() instanceof Level)) {
                    h += _this.displayQuantity(res);
                }
            });
        }
        h += "</td></tr>";
        h += "</table>";
        return h;
    };
    DesertIslandGui.prototype.displayProducers = function () {
        var _this = this;
        var h = '<table border="1">';
        h += '<tr><th>Production</th><th>Resource</th></tr>';
        this.engine.producers.forEach(function (producer) {
            if (producer.isAuto()) {
                var i = producer.getInterval();
                var interval = 0;
                if (i != null) {
                    interval = i;
                }
                h += '<tr>'
                    + '<td>' + producer.getName() + '<br />' + _this.displayProgress(producer.getStartTime(), interval) + '</td>'
                    + '<td>' + _this.displayQuantities(producer.getResourcesQuantity()) + '</td>'
                    + '</tr>';
            }
            else {
                h += '<tr>'
                    + '<td><button onclick="engine.collectProducer(\'' + producer.getName() + '\');">' + producer.getName() + '</button></td>'
                    + '<td>' + _this.displayQuantities(producer.getResourcesQuantity()) + '</td>'
                    + '</tr>';
            }
        });
        h += '</table>';
        return h;
    };
    DesertIslandGui.prototype.displayCrafters = function () {
        var _this = this;
        var h = '<table border="1">';
        h += "<tr><th>Craft</th><th>It will make</th><th>Cost</th></tr>";
        this.engine.crafters.forEach(function (crafter) { return h += _this.displayCrafter(crafter); });
        h += "</table>";
        return h;
    };
    DesertIslandGui.prototype.displayCrafter = function (crafter) {
        var h = '<tr>';
        h += '<td>' + this.displayCraftButton(crafter) + '</td>';
        h += '<td>' + this.displayQuantities(crafter.getCraftedResources()) + '</td>';
        h += '<td>' + this.displayAvailableQuantities(crafter.getCost()) + '</td>';
        h += '</tr>';
        return h;
    };
    DesertIslandGui.prototype.displayCraftButton = function (crafter) {
        var h = '<button onclick="engine.startCrafting(\'' + crafter.getName() + '\');"'
            + (!this.engine.player.hasResources(crafter.getCost()) ? ' disabled="disabled" title="Not enough resources"' : '') + '>'
            + this.displayAutoCraft(crafter) + crafter.getName() + ' (' + this.displayTime(crafter.getDuration()) + ')'
            + '<br />' + this.displayProgress(crafter.getStartTime(), crafter.getDuration())
            + '</button>';
        return h;
    };
    DesertIslandGui.prototype.displayAutoCraft = function (crafter) {
        if (crafter.isAutomatable()) {
            return '<input type="checkbox" '
                + 'onclick="engine.switchAutoCrafting(\'' + crafter.getName() + '\');" '
                + 'title="Auto" '
                + (crafter.isAuto() ? ' checked="checked"' : '') + ' />';
        }
        return '';
    };
    DesertIslandGui.prototype.displayTree = function () {
        var h = '<table border="1">';
        h += "<tr><th>Next goals</th><th>Needed resources</th><th>Reward</th></tr>";
        if (this.engine.triggers.length <= 1) {
            h += '<tr><td colspan="3">Finish! <b>You win!</b> Wait for next version of the game.</td></tr>';
        }
        else {
            h += this.displayBranch(engine.triggers);
        }
        h += "</table>";
        return h;
    };
    DesertIslandGui.prototype.displayBranch = function (triggers) {
        var _this = this;
        var h = '';
        triggers.forEach(function (trig) {
            h += "<tr>"
                + "<td>" + trig.getName() + "</td>"
                + "<td>" + _this.displayAvailableQuantities(trig.getResourcesTrigger()) + "</td>"
                + "<td>" + ((trig.getSpawnProducers().length) ? ' <b>Producers</b>:' + trig.getSpawnProducers().map(function (p) { return p.getName(); }).join(', ') : '')
                + ((trig.getSpawnCrafters().length) ? ' <b>Crafters</b>:' + trig.getSpawnCrafters().map(function (p) { return p.getName(); }).join(', ') : '')
                + ((trig.getSpawnResources().length) ? ' <b>Resources</b>:' + _this.displayQuantities(trig.getSpawnResources()) : '') + "</td>"
                + "</tr>";
        });
        return h;
    };
    DesertIslandGui.prototype.displayQuantities = function (quantities) {
        var _this = this;
        return quantities.map(function (resQ) { return _this.displayQuantity(resQ); })
            .join(' ');
    };
    DesertIslandGui.prototype.displayAvailableQuantities = function (quantities) {
        var _this = this;
        var h = '';
        quantities.forEach(function (resQ) {
            var storageRes = _this.engine.player.getResourceInStorage(resQ.getResource().getName());
            var cssClass = 'notAvailableResource';
            if (storageRes != null && storageRes.getQuantity() >= resQ.getQuantity()) {
                cssClass = 'availableResource';
            }
            h += _this.displayQuantity(resQ, cssClass, storageRes);
        });
        h += '';
        return h;
    };
    DesertIslandGui.prototype.displayQuantity = function (quantity, optionnalCss, storageRes) {
        if (optionnalCss === void 0) { optionnalCss = ''; }
        if (storageRes === void 0) { storageRes = null; }
        var res = quantity.getResource();
        var image = '';
        if ('image' in res) {
            image = res.image;
        }
        var details = null;
        if ('getDetails' in quantity) {
            details = quantity['getDetails'];
        }
        return '<div class="resource ' + quantity.getResource().$type + ' ' + optionnalCss + '">'
            + '<div class="resource_label">'
            + ((storageRes != null) ? '<span>' + storageRes.show() + '</span>/' : '')
            + quantity.show()
            + '</div>'
            + ((image == '') ? quantity.getResource().getName() : '<img src="images/' + image + '" title="' + quantity.getResource().getName() + '" alt="' + quantity.getResource().getName() + '" class="resource_img">')
            + ((details != null) ? details.call(quantity) : '')
            + '</div>';
    };
    DesertIslandGui.prototype.displayTime = function (miliSeconds) {
        if (miliSeconds == null) {
            return '';
        }
        var time = '';
        if (miliSeconds >= 60000) {
            time += Math.round(miliSeconds / 60000) + 'min';
            miliSeconds = miliSeconds % 60000;
        }
        if (miliSeconds < 500 && time != "") {
            return time;
        }
        time += Math.round(miliSeconds / 1000) + 's';
        return time;
    };
    DesertIslandGui.prototype.displayProgress = function (startTime, duration) {
        var progress = this.calculateProgress(startTime);
        return this.formatProgress(progress / duration, this.displayTime(duration - progress));
    };
    DesertIslandGui.prototype.calculateProgress = function (startTime) {
        if (startTime == null) {
            return 0;
        }
        return (new Date().getTime() - startTime.getTime());
    };
    DesertIslandGui.prototype.formatProgress = function (percent01, text) {
        var percent100 = Math.round(percent01 * 100);
        return '<progress value="' + percent100 + '" max="100">' + text + '</progress>';
    };
    DesertIslandGui.youDie = function () {
        var overlay = document.getElementById('overlay');
        if (overlay != null) {
            var o_1 = overlay;
            o_1.className = 'show';
            window.setTimeout(function () { o_1.className += ' shade'; }, 500);
        }
    };
    DesertIslandGui.prototype.stop = function () {
        window.clearInterval(this.intervalId);
        engine.stop();
    };
    DesertIslandGui.eraseStorage = function () {
        window.localStorage.removeItem('DesertIsland');
        window.localStorage.removeItem('DesertIslandVersion');
    };
    DesertIslandGui.prototype.clearStorage = function () {
        DesertIslandGui.eraseStorage();
    };
    DesertIslandGui.prototype.restart = function () {
        if (window.confirm('It will restart the game from zero. Are you sure?')) {
            this.stop();
            this.clearStorage();
            window.location.reload();
        }
    };
    DesertIslandGui.prototype.fastMode = function () {
        engine.fastMode = 1000;
    };
    DesertIslandGui.prototype.updateGui = function () {
        NodeUpdate.updateDiv('level', this.displayLevel());
        NodeUpdate.updateDiv('storage', this.displayStorage());
        NodeUpdate.updateDiv('producers', this.displayProducers());
        NodeUpdate.updateDiv('crafters', this.displayCrafters());
        NodeUpdate.updateDiv('tree', this.displayTree());
    };
    DesertIslandGui.prototype.start = function (refreshInterval) {
        var _this = this;
        this.intervalId = window.setInterval(function () { return _this.updateGui(); }, refreshInterval);
    };
    return DesertIslandGui;
}());
//# sourceMappingURL=Gui.js.map