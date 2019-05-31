var IncrGui = (function () {
    function IncrGui(engine) {
        this.engine = engine;
    }
    IncrGui.prototype.displayStatus = function () {
        if (this.engine.status == EngineStatus.WIN) {
            return "<b>YOU WIN!!! 😁</b>";
        }
        else if (this.engine.status == EngineStatus.LOOSE) {
            return "<b>YOU LOOSE! 😢</b>";
        }
        else {
            return "<b>in progress 😉</b>";
        }
    };
    IncrGui.prototype.displayStorage = function () {
        var h = '<table border="1">';
        h += "<tr><th>resource</th></tr>";
        this.engine.player.getStorage().forEach(function (res) { return h += "<tr><td>" + res.show() + "</td></tr>"; });
        h += "</table>";
        return h;
    };
    IncrGui.prototype.displayProducers = function () {
        var h = '<table border="1">';
        h += "<tr><th>producer name</th><th>resource</th><th>when</th></tr>";
        this.engine.producers.forEach(function (producer) {
            if (producer.isAuto()) {
                h += "<tr><td>" + producer.getName() + "</td><td>" + producer.getResourcesQuantity().map(function (r) { return r.show(); }).join(', ') + "</td><td>every " + producer.getInterval() + " ms</td></tr>";
            }
            else {
                h += "<tr><td>" + producer.getName() + "</td><td>" + producer.getResourcesQuantity().map(function (r) { return r.show(); }).join(', ') + '</td><td><button onclick="engine.collectProducer(\'' + producer.getName() + '\');">Collect</button></td></tr>';
            }
        });
        h += "</table>";
        return h;
    };
    IncrGui.prototype.displayTriggers = function () {
        var _this = this;
        var h = '<table border="1">';
        h += '<tr><th>name</th><th>triggered when resources</th>';
        h += '<th>spwan producers</th><th>spwan resources</th>';
        h += '<th>spwan crafters</th><th>spwan triggers</th><th>callback and win/loose</th></tr>';
        this.engine.triggers.forEach(function (trigger) { return h += _this.displayTrigger(trigger); });
        h += "</table>";
        return h;
    };
    IncrGui.prototype.displayTrigger = function (trigger) {
        var _this = this;
        var h = "<tr>";
        h += '<td>' + trigger.getName() + '</td>';
        h += "<td><ul>";
        trigger.getResourcesTrigger().forEach(function (res) { return h += '<li>' + res.show() + '</li>'; });
        h += "</ul></td>";
        h += "<td><ul>";
        trigger.getSpawnProducers().forEach(function (producer) {
            if (producer.isAuto()) {
                h += "<li>" + producer.getName() + ": " + producer.getResourcesQuantity().map(function (r) { return r.show(); }).join(', ') + " every " + producer.getInterval() + " ms</li>";
            }
            else {
                h += "<li>" + producer.getName() + ": " + producer.getResourcesQuantity().map(function (r) { return r.show(); }).join(', ') + " manualy</li>";
            }
        });
        h += "</ul></td>";
        h += "<td><ul>";
        trigger.getSpawnResources().forEach(function (res) { return h += '<li>' + res.show() + '</li>'; });
        h += "</ul></td>";
        h += "<td><ul>";
        trigger.getSpawnCrafters().forEach(function (crafter) { return h += '<li>' + crafter.getName() + ' craft: ' + crafter.getCraftedResources().map(function (r) { return r.show(); }).join(', ')
            + ' in ' + _this.displayTime(crafter.getDuration()) + ' ' + (crafter.isAuto ? 'automaticly' : 'mannualy') + '</li>'; });
        h += "</ul></td>";
        h += "<td><ul>";
        trigger.getSpawnNewTriggers().forEach(function (trig) { return h += '<li>' + trig.getName() + '</li>'; });
        h += "</ul></td>";
        h += "<td>";
        var status = trigger.getChangeEngineStatus();
        if (status == EngineStatus.WIN) {
            h += "WIN!";
        }
        if (status == EngineStatus.LOOSE) {
            h += "LOOSE!";
        }
        if (trigger.getCallback() != null && trigger.getCallback() != "") {
            h += " Callback: " + trigger.getCallback();
        }
        h += "</td>";
        h += '</tr>';
        return h;
    };
    IncrGui.prototype.displayCrafters = function () {
        var _this = this;
        var h = '<table border="1">';
        h += "<tr><th>name</th><th>remaining time</th><th>cost</th><th>will craft</th><th>craft</th></tr>";
        this.engine.crafters.forEach(function (trigger) { return h += _this.displayCrafter(trigger); });
        h += "</table>";
        return h;
    };
    IncrGui.prototype.displayCrafter = function (crafter) {
        var h = "<tr>";
        h += '<td>' + crafter.getName() + '</td>';
        h += '<td>' + this.displayRemainingTime(crafter.getStartTime()) + "/" + this.displayTime(crafter.getDuration()) + '</td>';
        h += "<td><ul>";
        crafter.getCost().forEach(function (res) { return h += '<li>' + res.show() + '</li>'; });
        h += "</ul></td>";
        h += "<td><ul>";
        crafter.getCraftedResources().forEach(function (res) { return h += '<li>' + res.show() + '</li>'; });
        h += "</ul></td>";
        h += '<td>' + this.displayCraftButton(crafter) + this.displayAutoCraft(crafter) + '</td>';
        h += '</tr>';
        return h;
    };
    IncrGui.prototype.displayCraftButton = function (crafter) {
        var h = '';
        if (crafter.isCrafting()) {
            h += this.displayProgress(crafter.getStartTime(), crafter.getDuration());
        }
        else if (!this.engine.player.hasResources(crafter.getCost())) {
            h += 'Not enough resources';
        }
        else {
            h += '<button onclick="engine.startCrafting(\'' + crafter.getName() + '\');">'
                + 'craft (' + this.displayTime(crafter.getDuration()) + ')</button>';
        }
        return h;
    };
    IncrGui.prototype.displayAutoCraft = function (crafter) {
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
    IncrGui.prototype.displayProgress = function (startTime, duration) {
        var progress = this.calculateProgress(startTime);
        return this.displayTime(progress) + '/' + this.displayTime(duration);
    };
    IncrGui.prototype.calculateProgress = function (startTime) {
        if (startTime == null) {
            return 0;
        }
        return (new Date().getTime() - startTime.getTime());
    };
    IncrGui.prototype.displayTime = function (miliSeconds) {
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
    IncrGui.prototype.displayRemainingTime = function (startTime) {
        if (startTime == null) {
            return ' - ';
        }
        return this.displayTime(new Date().getTime() - startTime.getTime());
    };
    return IncrGui;
}());
//# sourceMappingURL=ExampleTestGui.js.map