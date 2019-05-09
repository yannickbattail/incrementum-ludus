/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IQuantity.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
/// <reference path="../Engine/Engine.ts" />

class IncrGui {
    engine: Engine;
    constructor(engine: Engine) {
        this.engine = engine;
    }

    displayStorage(): string {
        var h = '<table border="1">';
        h += "<tr><th>quantity</th><th>resource</th></tr>";
        this.engine.player.getStorage().forEach(
            res => h += "<tr><td>" + res.show() + "</td></tr>"
        );
        h += "</table>";
        return h;
    }

    displayProducers(): string {
        var h = '<table border="1">';
        h += "<tr><th>producer name</th><th>resource</th><th>when</th></tr>";
        this.engine.producers.forEach(
            producer => {
                if (producer.isAuto()) {
                    h += "<tr><td>" + producer.getName() + "</td><td>" + producer.getResourcesQuantity().map(r=>r.show()).join(', ') + "</td><td>every " + producer.getInterval() + " ms</td></tr>"
                } else {
                    h += "<tr><td>" + producer.getName() + "</td><td>" + producer.getResourcesQuantity().map(r=>r.show()).join(', ') + '</td><td><button onclick="engine.collectProducer(\'' + producer.getName() + '\');">Collect</button></td></tr>'
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
        this.engine.triggers.forEach(
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
                    h += "<li>" + producer.getName() + ": " + producer.getResourcesQuantity().map(r=>r.show()).join(', ') + " every " + producer.getInterval() + " ms</li>"
                } else {
                    h += "<li>" + producer.getName() + ": " + producer.getResourcesQuantity().map(r=>r.show()).join(', ') + " manualy</li>"
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
        this.engine.crafters.forEach(
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
        h += '<td>' + this.displayCraftButton(crafter) + this.displayAutoCraft(crafter) + '</td>';
        h += '</tr>';
        return h;
    }


    private displayCraftButton(crafter : ICrafter) : string {
        let h = '';
        if (crafter.isCrafting()) {
            h += this.displayProgress(crafter.getStartTime(), crafter.getDuration());
        } else if (!this.engine.player.hasResources(crafter.getCost())) {
            h += 'Not enough resources';
        } else {
            h += '<button onclick="engine.startCrafting(\'' + crafter.getName() + '\');">'
                + 'craft ('+this.displayTime(crafter.getDuration())+')</button>';
        }
        return h;
    }

    private displayAutoCraft(crafter : ICrafter) : string {
        let h = '<br />[';
        if (!crafter.isAutomatable()) {
            if (crafter.isAuto()) {
                h += 'Auto';
            } else {
                h += 'Manual';
            }
        } else {
            h += '<label>'
            + '<input type="checkbox" onclick="engine.switchAutoCrafting(\'' + crafter.getName() + '\');" '
            +   (crafter.isAuto()?' checked="checked"':'')+' />'
            + 'Auto</label>';
        }
        h += ']';
        return h;
    }

    private displayProgress(startTime : Date | null, duration : number) : string {
        let progress = this.calculateProgress(startTime)
        return this.displayTime(progress)+'/'+this.displayTime(duration);
    }

    private calculateProgress(startTime : Date | null) : number {
        if (startTime == null) {
            return 0;
        }
        return (new Date().getTime() - startTime.getTime());
    }

    private displayTime(miliSeconds : number | null) : string {
        if (miliSeconds == null) {
            return '';
        }
        let time = '';
        if (miliSeconds >= 60000) {
            time += Math.round(miliSeconds / 60000) + 'min';
            miliSeconds = miliSeconds % 60000;
        }
        if (miliSeconds < 500 && time != "") {
            return time;
        }
        time += Math.round(miliSeconds / 1000) + 's';
        return time;
    }

    private displayRemainingTime(startTime : Date | null) : string {
        if (startTime == null) {
            return ' - ';
        }
        return this.displayTime(new Date().getTime() - startTime.getTime())
    }
}