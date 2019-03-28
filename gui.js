var IncrGui = (function () {
    function IncrGui(engine) {
        this.Engine = engine;
    }
    IncrGui.prototype.displayStorage = function () {
        var h = '<table border="1">';
        h += "<tr><th>quantity</th><th>resource</th></tr>";
        this.Engine.Player.Storage.forEach(function (res) { return h += "<tr><td>" + res.Quantity + "</td><td>" + res.Resource.Name + "</td></tr>"; });
        h += "</table>";
        return h;
    };
    IncrGui.prototype.displayProducers = function () {
        var h = '<table border="1">';
        h += "<tr><th>producer name</th><th>resource</th><th>when</th></tr>";
        this.Engine.Producers.forEach(function (producer) {
            if (producer instanceof TimedProducer) {
                h += "<tr><td>" + producer.Name + "</td><td>" + producer.ResourceQuantity.Quantity + " " + producer.ResourceQuantity.Resource.Name + "</td><td>every " + producer.Interval + " ms</td></tr>";
            }
            else if (producer instanceof ManualProducer) {
                h += "<tr><td>" + producer.Name + "</td><td>" + producer.ResourceQuantity.Quantity + " " + producer.ResourceQuantity.Resource.Name + '</td><td><button onclick="engine.collectProducer(\'' + producer.Name + '\');">Collect</button></td></tr>';
            }
        });
        h += "</table>";
        return h;
    };
    IncrGui.prototype.displayTriggers = function () {
        var _this = this;
        var h = '<table border="1">';
        h += "<tr><th>name</th><th>triggerd when</th><th>resource</th><th>spwan</th></tr>";
        this.Engine.Triggers.forEach(function (trigger) { return h += _this.displayTrigger(trigger); });
        h += "</table>";
        return h;
    };
    IncrGui.prototype.displayTrigger = function (trigger) {
        var h = "<tr>";
        h += '<td>' + trigger.Name + '</td>';
        h += "<td><ul>";
        trigger.ResourcesTrigger.forEach(function (res) { return h += '<li>' + res.Quantity + ' ' + res.Resource.Name + '</li>'; });
        h += "</ul></td>";
        trigger.SpawnProducers.forEach(function (producer) {
            if (producer instanceof TimedProducer) {
                h += "<td>" + producer.Name + ": " + producer.ResourceQuantity.Quantity + " " + producer.ResourceQuantity.Resource.Name + " every " + producer.Interval + " ms</td>";
            }
            else if (trigger.SpawnProducers instanceof TimedProducer) {
                h += "<td>" + producer.Name + ": " + producer.ResourceQuantity.Quantity + " " + producer.ResourceQuantity.Resource.Name + " manualy</td>";
            }
        });
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
        h += '<td>' + crafter.Name + '</td>';
        h += '<td>' + this.displayRemainingTime(crafter.StartTime) + "/" + this.displayTime(crafter.Duration) + '</td>';
        h += "<td><ul>";
        crafter.Cost.forEach(function (res) { return h += '<li>' + res.Quantity + ' ' + res.Resource.Name + '</li>'; });
        h += "</ul></td>";
        h += '<td>' + crafter.CraftedResource.Quantity + ' ' + crafter.CraftedResource.Resource.Name + '</td>';
        h += '<td>' + this.displayCraftButton(crafter) + '</td>';
        h += '</tr>';
        return h;
    };
    IncrGui.prototype.displayCraftButton = function (crafter) {
        if (crafter.AutoCrafting) {
            return 'Auto Crafting';
        }
        if (crafter.isCrafting()) {
            return '<button disabled="disabled">craft</button> Crafting in progress';
        }
        if (!this.Engine.Player.hasResources(crafter.Cost)) {
            return '<button disabled="disabled">craft</button> not enough resources';
        }
        return '<button onclick="engine.startCrafting(\'' + crafter.Name + '\');">craft</button>';
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
//# sourceMappingURL=gui.js.map