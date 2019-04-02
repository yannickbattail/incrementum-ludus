var DesertIslandGui = (function () {
    function DesertIslandGui(engine) {
        this.Engine = engine;
    }
    DesertIslandGui.prototype.displayLevel = function () {
        var level = this.Engine.Player.getResourceInStorage("level");
        if (level == null)
            return "XXX level";
        return 'Level: ' + level.Resource.show(level.Quantity);
    };
    DesertIslandGui.prototype.displayStorage = function () {
        var h = '<table border="1">';
        h += "<tr><th>resource</th></tr>";
        this.Engine.Player.Storage.forEach(function (res) {
            if (!(res.Resource instanceof Level)) {
                h += '<tr><td>' + res.Resource.show(res.Quantity) + '</td></tr>';
            }
        });
        h += "</table>";
        return h;
    };
    DesertIslandGui.prototype.displayProducers = function () {
        var _this = this;
        var h = '<table border="1">';
        h += "<tr><th>Production</th><th>resource</th><th>when</th></tr>";
        this.Engine.Producers.forEach(function (producer) {
            if (producer instanceof TimedProducer) {
                h += "<tr><td>" + producer.Name + "</td><td>" + producer.ResourceQuantity.Resource.show(producer.ResourceQuantity.Quantity) + "</td><td>every " + _this.displayTime(producer.Interval) + "</td></tr>";
            }
            else if (producer instanceof ManualProducer) {
                h += "<tr><td>" + producer.Name + "</td><td>" + producer.ResourceQuantity.Resource.show(producer.ResourceQuantity.Quantity) + '</td><td><button onclick="engine.collectProducer(\'' + producer.Name + '\');">Collect</button></td></tr>';
            }
        });
        h += "</table>";
        return h;
    };
    DesertIslandGui.prototype.displayCrafters = function () {
        var _this = this;
        var h = '<table border="1">';
        h += "<tr><th>Crafter</th><th>cost</th><th>will craft</th><th>craft</th></tr>";
        this.Engine.Crafters.forEach(function (trigger) { return h += _this.displayCrafter(trigger); });
        h += "</table>";
        return h;
    };
    DesertIslandGui.prototype.displayCrafter = function (crafter) {
        var h = "<tr>";
        h += '<td>' + crafter.Name + '</td>';
        h += "<td><ul>";
        crafter.Cost.forEach(function (res) { return h += '<li>' + res.Resource.show(res.Quantity) + '</li>'; });
        h += "</ul></td>";
        h += '<td>' + crafter.CraftedResource.Resource.show(crafter.CraftedResource.Quantity) + '</td>';
        h += '<td>' + this.displayCraftButton(crafter) + '</td>';
        h += '</tr>';
        return h;
    };
    DesertIslandGui.prototype.displayCraftButton = function (crafter) {
        if (crafter.AutoCrafting) {
            return 'Auto Crafting';
        }
        if (crafter.isCrafting()) {
            return this.displayProgress(crafter.StartTime, crafter.Duration);
        }
        if (!this.Engine.Player.hasResources(crafter.Cost)) {
            return 'Not enough resources';
        }
        return '<button onclick="engine.startCrafting(\'' + crafter.Name + '\');">craft (' + this.displayTime(crafter.Duration) + ')</button>';
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
        h += '<td>' + trigger.Name + '</td>';
        h += "<td><ul>";
        trigger.ResourcesTrigger.forEach(function (res) { return h += '<li>' + res.Resource.show(res.Quantity) + '</li>'; });
        h += "</ul></td>";
        h += '</tr>';
        return h;
    };
    DesertIslandGui.prototype.displayTime = function (miliSeconds) {
        if (miliSeconds < 1000) {
            return "" + Math.round(miliSeconds / 1000) + "ms";
        }
        else if (miliSeconds < 60000) {
            return "" + Math.round(miliSeconds / 1000) + "s";
        }
        var sec = Math.round(miliSeconds / 1000);
        var min = Math.round(sec / 60);
        return "" + min + "min " + this.displayTime(sec % 60);
    };
    DesertIslandGui.prototype.displayRemainingTime = function (startTime) {
        if (startTime == null) {
            return ' - ';
        }
        return this.displayTime(new Date().getTime() - startTime.getTime());
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