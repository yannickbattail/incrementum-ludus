var DesertIslandGui = (function () {
    function DesertIslandGui(engine) {
        this.Engine = engine;
    }
    DesertIslandGui.prototype.displayLevel = function () {
        var level = this.Engine.Player.getResourceInStorage("level");
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
        if (this.Engine.Player.getStorage().length <= 1) {
            h += "no resource";
        }
        else {
            this.Engine.Player.getStorage().forEach(function (res) {
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
        h += "<tr><th>Production</th><th>Resource</th><th>When</th></tr>";
        this.Engine.Producers.forEach(function (producer) {
            if (producer.isAuto()) {
                h += "<tr><td>" + producer.getName() + "</td><td>" + _this.displayQuantities(producer.getResourcesQuantity()) + "</td><td>every " + _this.displayTime(producer.getInterval()) + "</td></tr>";
            }
            else {
                h += "<tr><td>" + producer.getName() + "</td><td>" + _this.displayQuantities(producer.getResourcesQuantity()) + '</td><td><button onclick="engine.collectProducer(\'' + producer.getName() + '\');">Collect</button></td></tr>';
            }
        });
        h += "</table>";
        return h;
    };
    DesertIslandGui.prototype.displayCrafters = function () {
        var _this = this;
        var h = '<table border="1">';
        h += "<tr><th>Crafter</th><th>Cost</th><th>It will make</th><th></th></tr>";
        this.Engine.Crafters.forEach(function (trigger) { return h += _this.displayCrafter(trigger); });
        h += "</table>";
        return h;
    };
    DesertIslandGui.prototype.displayCrafter = function (crafter) {
        var h = "<tr>";
        h += '<td>' + crafter.getName() + '</td>';
        h += "<td>";
        h += this.displayAvailableQuantities(crafter.getCost());
        h += "</td>";
        h += '<td>' + this.displayQuantities(crafter.getCraftedResources()) + '</td>';
        h += '<td>' + this.displayCraftButton(crafter) + this.displayAutoCraft(crafter) + '</td>';
        h += '</tr>';
        return h;
    };
    DesertIslandGui.prototype.displayCraftButton = function (crafter) {
        var h = '';
        if (crafter.isCrafting()) {
            h += this.displayProgress(crafter.getStartTime(), crafter.getDuration());
        }
        else if (!this.Engine.Player.hasResources(crafter.getCost())) {
            h += 'Not enough resources';
        }
        else {
            h += '<button onclick="engine.startCrafting(\'' + crafter.getName() + '\');">'
                + 'craft (' + this.displayTime(crafter.getDuration()) + ')</button>';
        }
        return h;
    };
    DesertIslandGui.prototype.displayAutoCraft = function (crafter) {
        var h = '<br />[';
        if (!crafter.isAutomatable()) {
            if (crafter.isAuto()) {
                h += 'Auto';
            }
            else {
                h += 'Manual';
            }
        }
        else {
            h += '<label>'
                + '<input type="checkbox" onclick="engine.switchAutoCrafting(\'' + crafter.getName() + '\');" '
                + (crafter.isAuto() ? ' checked="checked"' : '') + ' />'
                + 'Auto</label>';
        }
        h += ']';
        return h;
    };
    DesertIslandGui.prototype.displayTree = function () {
        var h = '<table border="1">';
        h += "<tr><th>Next goals</th><th>Needed resources</th><th>It will unlock</th></tr>";
        if (this.Engine.Triggers.length == 0) {
            h += '<tr><td colspan="3">Finish! <b>You win!</b> Wait for next version of the game.</td></tr>';
        }
        else {
            h += this.displayBranch(engine.Triggers);
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
            var storageRes = engine.Player.getResourceInStorage(resQ.getResource().getName());
            var cssClass = 'notAvailableResource';
            if (storageRes != null && storageRes.getQuantity() >= resQ.getQuantity()) {
                cssClass = 'availableResource';
            }
            h += _this.displayQuantity(resQ, cssClass);
        });
        h += '';
        return h;
    };
    DesertIslandGui.prototype.displayQuantity = function (quantity, optionnalCss) {
        if (optionnalCss === void 0) { optionnalCss = ''; }
        var res = quantity.getResource();
        var image = '';
        if ('Image' in res) {
            image = res.Image;
        }
        return '<div class="resource ' + quantity.getResource().$type + ' ' + optionnalCss + '">'
            + '<div class="resource_label">' + quantity.show() + '</div>'
            + ((image == '') ? quantity.getResource().getName() : '<img src="images/' + image + '.svg" title="' + quantity.getResource().getName() + '" alt="' + quantity.getResource().getName() + '" class="resource_img">')
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
        return '<div class="progressBar">' +
            '<div class="progressBarIn" style="width:' + percent100 + 'px;">' + text + '</div>' +
            '</div>';
    };
    DesertIslandGui.prototype.stop = function () {
        window.clearInterval(this.intervalId);
    };
    DesertIslandGui.prototype.clearStorage = function () {
        window.localStorage.removeItem('DesertIsland');
        window.localStorage.removeItem('DesertIslandVersion');
    };
    DesertIslandGui.prototype.restart = function () {
        if (window.confirm('It will restart the game from zero. Are you sure?')) {
            this.stop();
            this.clearStorage();
            window.location.reload();
        }
    };
    DesertIslandGui.prototype.fastMode = function () {
        engine.FastMode = 1000;
    };
    DesertIslandGui.prototype.updateGui = function () {
        var level = document.getElementById('level');
        if (level)
            level.innerHTML = this.displayLevel();
        var storage = document.getElementById('storage');
        if (storage)
            storage.innerHTML = this.displayStorage();
        var producers = document.getElementById('producers');
        if (producers)
            producers.innerHTML = this.displayProducers();
        var crafters = document.getElementById('crafters');
        if (crafters)
            crafters.innerHTML = this.displayCrafters();
        var tree = document.getElementById('tree');
        if (tree)
            tree.innerHTML = this.displayTree();
        saveEngine(engine);
    };
    DesertIslandGui.prototype.start = function (refreshInterval) {
        var _this = this;
        this.intervalId = window.setInterval(function () { return _this.updateGui(); }, refreshInterval);
    };
    return DesertIslandGui;
}());
//# sourceMappingURL=DesertIslandGui.js.map