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
        if (this.Engine.Player.Storage.length <= 1) {
            h += "<tr><td>no resource</td></tr>";
        }
        else {
            this.Engine.Player.Storage.forEach(function (res) {
                if (!(res.Resource instanceof Level)) {
                    h += '<tr><td>' + res.Resource.show(res.Quantity) + '</td></tr>';
                }
            });
        }
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
        h += "<tr><th>Crafter</th><th>cost</th><th>it will make</th><th></th></tr>";
        this.Engine.Crafters.forEach(function (trigger) { return h += _this.displayCrafter(trigger); });
        h += "</table>";
        return h;
    };
    DesertIslandGui.prototype.displayCrafter = function (crafter) {
        var h = "<tr>";
        h += '<td>' + crafter.Name + '</td>';
        h += "<td>";
        crafter.Cost.forEach(function (res) { return h += res.Resource.show(res.Quantity); });
        h += "</td>";
        h += '<td>' + crafter.CraftedResource.map(function (r) { return r.Resource.show(r.Quantity); }).join(' ') + '</td>';
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
        h += "<td>";
        trigger.ResourcesTrigger.forEach(function (res) { return h += res.Resource.show(res.Quantity); });
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
                + "<td>" + trig.Name + "</td>"
                + "<td>" + _this.displayResources(trig.ResourcesTrigger) + "</td>"
                + "<td>" + ((trig.SpawnProducers.length) ? '<b>Producers</b>:' + trig.SpawnProducers.map(function (p) { return p.Name; }).join(', ') : '')
                + ((trig.SpawnCrafters.length) ? ' <b>crafters</b>:' + trig.SpawnCrafters.map(function (p) { return p.Name; }).join(', ') : '') + "</td>"
                + "</tr>";
            if (trig.SpawnNewTriggers.length) {
                h += _this.displayBranch(trig.SpawnNewTriggers);
            }
        });
        return h;
    };
    DesertIslandGui.prototype.displayResources = function (resourceQuantity) {
        var h = '';
        resourceQuantity.forEach(function (resQ) { return h += resQ.Resource.show(resQ.Quantity); });
        h += '';
        return h;
    };
    DesertIslandGui.prototype.displayTime = function (miliSeconds) {
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