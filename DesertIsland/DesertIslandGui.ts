/// <reference path="../Engine/Resource.ts" />
/// <reference path="../Engine/ResourceQuantity.ts" />
/// <reference path="../Engine/Producer.ts" />
/// <reference path="../Engine/TimedProducer.ts" />
/// <reference path="../Engine/ManualProducer.ts" />
/// <reference path="../Engine/Trigger.ts" />
/// <reference path="../Engine/Crafter.ts" />
/// <reference path="../Engine/Player.ts" />
/// <reference path="../Engine/Engine.ts" />

/// <reference path="./Material.ts" />
/// <reference path="./Item.ts" />
/// <reference path="./Level.ts" />

class DesertIslandGui {
    Engine: Engine;
    constructor(engine: Engine) {
        this.Engine = engine;
    }

    displayLevel(): string {
        let level = this.Engine.Player.getResourceInStorage("level");
        if (level == null)
            return "XXX level";
        return level.Resource.show(level.Quantity);
    }

    displayStorage(): string {
        var h = '<table border="1">';
        h += "<tr><th>resource</th></tr>";
        this.Engine.Player.Storage.forEach(
            res => h += '<tr><td>' + res.Resource.show(res.Quantity) + '</td></tr>'
        );
        h += "</table>";
        return h;
    }

    displayProducers(): string {
        var h = '<table border="1">';
        h += "<tr><th>name</th><th>resource</th><th>when</th></tr>";
        this.Engine.Producers.forEach(
            producer => {
                if (producer instanceof TimedProducer) {
                    h += "<tr><td>" + producer.Name + "</td><td>" + producer.ResourceQuantity.Resource.show(producer.ResourceQuantity.Quantity) + "</td><td>every " + this.displayTime(producer.Interval) + "</td></tr>"
                } else if (producer instanceof ManualProducer) {
                    h += "<tr><td>" + producer.Name + "</td><td>" + producer.ResourceQuantity.Resource.show(producer.ResourceQuantity.Quantity) + '</td><td><button onclick="engine.collectProducer(\'' + producer.Name + '\');">Collect</button></td></tr>'
                }
            }
        );
        h += "</table>";
        return h;
    }
    displayCrafters(): string {
        var h = '<table border="1">';
        h += "<tr><th>name</th><th>remaining time</th><th>cost</th><th>will craft</th><th>craft</th></tr>";
        this.Engine.Crafters.forEach(
            trigger => h += this.displayCrafter(trigger)
        );
        h += "</table>";
        return h;
    }

    private displayCrafter(crafter : Crafter) : string {
        let h = "<tr>";
        h += '<td>' + crafter.Name + '</td>';
        h += '<td>' + this.displayRemainingTime(crafter.StartTime) + "/" + this.displayTime(crafter.Duration) + '</td>';
        h += "<td><ul>"
        crafter.Cost.forEach(
            res => h += '<li>' + res.Resource.show(res.Quantity) + '</li>'
        );
        h += "</ul></td>"
        h += '<td>' + crafter.CraftedResource.Resource.show(crafter.CraftedResource.Quantity) + '</td>';
        h += '<td>' + this.displayCraftButton(crafter) + '</td>';
        h += '</tr>';
        return h;
    }

    private displayCraftButton(crafter : Crafter) : string {
        if (crafter.AutoCrafting) {
            return 'Auto Crafting';
        }
        if (crafter.isCrafting()) {
            return '<button disabled="disabled">craft</button><br/>Crafting in progress';
        }
        if (!this.Engine.Player.hasResources(crafter.Cost)) {
            return '<button disabled="disabled">craft</button><br/>not enough resources';
        }
        return '<button onclick="engine.startCrafting(\'' + crafter.Name + '\');">craft</button>';
    }

    displayTriggers(): string {
        if (this.Engine.Triggers.length == 0){
            return '...No more goal for now. Wait for next version of the game. PERDU!';
        }
        var h = '<table border="1">';
        h += '<tr><th>Goal</th><th>needed resources</th></tr>';
        this.Engine.Triggers.forEach(
            trigger => h += this.displayTrigger(trigger)
        );
        h += "</table>";
        return h;
    }

    private displayTrigger(trigger : Trigger) : string {
        let h = "<tr>";
        h += '<td>' + trigger.Name + '</td>';
        h += "<td><ul>";
        trigger.ResourcesTrigger.forEach(
            res => h += '<li>' + res.Resource.show(res.Quantity) + '</li>'
        );
        h += "</ul></td>";
        h += '</tr>';
        return h;
    }

    private displayTime(miliSeconds : number) : string {
        if (miliSeconds < 1000) {
            return "" + Math.round(miliSeconds / 1000) + "ms";
        } else if (miliSeconds < 60000) {
            return "" + (Math.round(miliSeconds / 100) / 10) + "s";
        }
        let sec = Math.round(miliSeconds / 1000);
        let min = Math.round(sec / 60);
        return "" + min + "min " + this.displayTime(sec % 60);
    }
    private displayRemainingTime(startTime : Date | null) : string {
        if (startTime == null) {
            return ' - ';
        }
        return this.displayTime(new Date().getTime() - startTime.getTime())
    }
}