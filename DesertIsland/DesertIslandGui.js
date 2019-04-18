var DesertIslandGui = (function () {
    function DesertIslandGui(engine) {
        this.Engine = engine;
    }
    DesertIslandGui.prototype.displayLevel = function () {
        var level = this.Engine.Player.getResourceInStorage("level");
        if (level == null)
            return '<div>Level: XXX<div>';
        return '<div>Level: ' + this.displayQuantity(level) + '<div>';
    };
    DesertIslandGui.prototype.displayStorage = function () {
        var _this = this;
        var h = '<table border="1">';
        h += "<tr><th>resource</th></tr>";
        if (this.Engine.Player.getStorage().length <= 1) {
            h += "<tr><td>no resource</td></tr>";
        }
        else {
            this.Engine.Player.getStorage().forEach(function (res) {
                if (!(res.getResource() instanceof Level)) {
                    h += '<tr><td>' + _this.displayQuantity(res) + '</td></tr>';
                }
            });
        }
        h += "</table>";
        return h;
    };
    DesertIslandGui.prototype.displayProducers = function () {
        var _this = this;
        var h = '';
        h += '<table border="1">';
        h += "<tr><th>Production</th><th>resource</th><th>when</th></tr>";
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
        h += "<tr><th>Crafter</th><th>cost</th><th>it will make</th><th></th></tr>";
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
        h += '<td>' + this.displayCraftButton(crafter) + '</td>';
        h += '</tr>';
        return h;
    };
    DesertIslandGui.prototype.displayCraftButton = function (crafter) {
        if (crafter.isAuto()) {
            return 'Auto Crafting';
        }
        if (crafter.isCrafting()) {
            return this.displayProgress(crafter.getStartTime(), crafter.getDuration());
        }
        if (!this.Engine.Player.hasResources(crafter.getCost())) {
            return 'Not enough resources';
        }
        return '<button onclick="engine.startCrafting(\'' + crafter.getName() + '\');">craft (' + this.displayTime(crafter.getDuration()) + ')</button>';
    };
    DesertIslandGui.prototype.displayTriggers = function () {
        var _this = this;
        if (this.Engine.Triggers.length == 0) {
            return '...No more goal for now. Wait for next version of the game.';
        }
        var h = '<table border="1">';
        h += '<tr><th>Next goal</th><th>needed resources</th></tr>';
        this.Engine.Triggers.forEach(function (trigger) { return h += _this.displayTrigger(trigger); });
        h += "</table>";
        return h;
    };
    DesertIslandGui.prototype.displayTrigger = function (trigger) {
        var h = "<tr>";
        h += '<td>' + trigger.getName() + '</td>';
        h += "<td>";
        trigger.getResourcesTrigger().forEach(function (res) { return h += res.show(); });
        h += "</td>";
        h += '</tr>';
        return h;
    };
    DesertIslandGui.prototype.displayTree = function () {
        var h = '<table border="1">';
        h += "<tr><th>next goal</th><th>Evolutions</th><th>needed resources</th><th>unlock</th></tr>";
        h += this.displayBranch(engine.Triggers);
        h += "</table>";
        return h;
    };
    DesertIslandGui.prototype.displayBranch = function (triggers) {
        var _this = this;
        var h = '';
        triggers.forEach(function (trig) {
            var nextGoal = '';
            if (engine.Triggers.indexOf(trig) != -1) {
                nextGoal = '<img src="images/arrow_right.svg" alt="arrow right" title="arrow right" widht="40px" height="40px"  />';
            }
            h += "<tr>"
                + "<td>" + nextGoal + "</td>"
                + "<td>" + trig.getName() + "</td>"
                + "<td>" + _this.displayAvailableQuantities(trig.getResourcesTrigger()) + "</td>"
                + "<td>" + ((trig.getSpawnProducers().length) ? '<b>Producers</b>:' + trig.getSpawnProducers().map(function (p) { return p.getName(); }).join(', ') : '')
                + ((trig.getSpawnCrafters().length) ? ' <b>crafters</b>:' + trig.getSpawnCrafters().map(function (p) { return p.getName(); }).join(', ') : '') + "</td>"
                + "</tr>";
            if (trig.getSpawnNewTriggers().length) {
                h += _this.displayBranch(trig.getSpawnNewTriggers());
            }
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
        return '<div class="resource ' + quantity.$type + ' ' + optionnalCss + '">'
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
    return DesertIslandGui;
}());
//# sourceMappingURL=DesertIslandGui.js.map