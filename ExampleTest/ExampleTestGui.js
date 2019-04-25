var IncrGui = (function () {
    function IncrGui(engine) {
        this.Engine = engine;
    }
    IncrGui.prototype.displayStorage = function () {
        var h = '<table border="1">';
        h += "<tr><th>quantity</th><th>resource</th></tr>";
        this.Engine.Player.getStorage().forEach(function (res) { return h += "<tr><td>" + res.show() + "</td></tr>"; });
        h += "</table>";
        return h;
    };
    IncrGui.prototype.displayProducers = function () {
        var h = '<table border="1">';
        h += "<tr><th>producer name</th><th>resource</th><th>when</th></tr>";
        this.Engine.Producers.forEach(function (producer) {
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
        h += '<th>spwan crafters</th><th>spwan triggers</th></tr>';
        this.Engine.Triggers.forEach(function (trigger) { return h += _this.displayTrigger(trigger); });
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
        h += '</tr>';
        return h;
    };
    IncrGui.prototype.displayCrafters = function () {
        var _this = this;
        var h = '<table border="1">';
        h += "<tr><th>name</th><th>remaining time</th><th>cost</th><th>will craft</th><th>craft</th></tr>";
        this.Engine.Crafters.forEach(function (trigger) { return h += _this.displayCrafter(trigger); });
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
        h += '<td>' + this.displayCraftButton(crafter) + '</td>';
        h += '</tr>';
        return h;
    };
    IncrGui.prototype.displayCraftButton = function (crafter) {
        if (crafter.isAuto()) {
            return 'Auto Crafting';
        }
        if (crafter.isCrafting()) {
            return '<button disabled="disabled">craft</button> Crafting in progress';
        }
        if (!this.Engine.Player.hasResources(crafter.getCost())) {
            return '<button disabled="disabled">craft</button> not enough resources';
        }
        return '<button onclick="engine.startCrafting(\'' + crafter.getName() + '\');">craft</button>';
    };
    IncrGui.prototype.displayTime = function (miliSeconds) {
        return "" + Math.round(miliSeconds / 1000) + "s";
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