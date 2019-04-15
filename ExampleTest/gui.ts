/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IResourceAmount.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
/// <reference path="../Engine/Engine.ts" />

class IncrGui {
    Engine: Engine;
    constructor(engine: Engine) {
        this.Engine = engine;
    }

    displayStorage(): string {
        var h = '<table border="1">';
        h += "<tr><th>quantity</th><th>resource</th></tr>";
        this.Engine.Player.getStorage().forEach(
            res => h += "<tr><td>" + res.show() + "</td></tr>"
        );
        h += "</table>";
        return h;
    }

    displayProducers(): string {
        var h = '<table border="1">';
        h += "<tr><th>producer name</th><th>resource</th><th>when</th></tr>";
        this.Engine.Producers.forEach(
            producer => {
                if (producer.isAuto()) {
                    h += "<tr><td>" + producer.getName() + "</td><td>" + producer.getResourceAmount().show() + "</td><td>every " + producer.getInterval() + " ms</td></tr>"
                } else {
                    h += "<tr><td>" + producer.getName() + "</td><td>" + producer.getResourceAmount().show() + '</td><td><button onclick="engine.collectProducer(\'' + producer.getName() + '\');">Collect</button></td></tr>'
                }
            }
        );
        h += "</table>";
        return h;
    }

    displayTriggers(): string {
        var h = '<table border="1">';
        h += '<tr><th>name</th><th>triggered when resources</th>';
        h += '<th>spwan producers</th><th>spwan resources</th>';
        h += '<th>spwan crafters</th><th>spwan triggers</th></tr>';
        this.Engine.Triggers.forEach(
            trigger => h += this.displayTrigger(trigger)
        );
        h += "</table>";
        return h;
    }

    private displayTrigger(trigger : ITrigger) : string {
        let h = "<tr>";
        h += '<td>' + trigger.getName() + '</td>';
        h += "<td><ul>";
        trigger.getResourcesTrigger().forEach(
            res => h += '<li>' + res.show() + '</li>'
        );
        h += "</ul></td>";
        h += "<td><ul>";
        trigger.getSpawnProducers().forEach(
            producer => {
                if (producer.isAuto()) {
                    h += "<li>" + producer.getName() + ": " + producer.getResourceAmount().show() + " every " + producer.getInterval() + " ms</li>"
                } else {
                    h += "<li>" + producer.getName() + ": " + producer.getResourceAmount().show() + " manualy</li>"
                }
            }
        );
        h += "</ul></td>";
        h += "<td><ul>";
        trigger.getSpawnResources().forEach(
            res => h += '<li>' + res.show() + '</li>'
        );
        h += "</ul></td>";
        h += "<td><ul>";
        trigger.getSpawnCrafters().forEach(
            crafter => h += '<li>' + crafter.getName() + ' craft: ' + crafter.getCraftedResources().map(r=>r.show()).join(', ') 
             + ' in '+this.displayTime(crafter.getDuration())+' '+(crafter.isAuto?'automaticly':'mannualy')+'</li>'
        );
        h += "</ul></td>";
        h += "<td><ul>";
        trigger.getSpawnNewTriggers().forEach(
            trig => h += '<li>' + trig.getName() +'</li>'
        );
        h += "</ul></td>";
        h += '</tr>';
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

    private displayCrafter(crafter : ICrafter) : string {
        let h = "<tr>";
        h += '<td>' + crafter.getName() + '</td>';
        h += '<td>' + this.displayRemainingTime(crafter.getStartTime()) + "/" + this.displayTime(crafter.getDuration()) + '</td>';
        h += "<td><ul>"
        crafter.getCost().forEach(
            res => h += '<li>' + res.show() + '</li>'
        );
        h += "</ul></td>"
        h += "<td><ul>"
        crafter.getCraftedResources().forEach(
            res => h += '<li>' + res.show() + '</li>'
        );
        h += "</ul></td>"
        h += '<td>' + this.displayCraftButton(crafter) + '</td>';
        h += '</tr>';
        return h;
    }


    private displayCraftButton(crafter : ICrafter) : string {
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
    }

    private displayTime(miliSeconds : number) : string {
        return "" + Math.round(miliSeconds / 1000) + "s";

    }
    private displayRemainingTime(startTime : Date | null) : string {
        if (startTime == null) {
            return ' - ';
        }
        return this.displayTime(new Date().getTime() - startTime.getTime())
    }
}