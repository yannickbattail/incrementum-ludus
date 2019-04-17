/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IQuantity.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
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
        return 'Level: '+this.displayQuantity(level);
    }

    displayStorage(): string {
        var h = '<table border="1">';
        h += "<tr><th>resource</th></tr>";
        if (this.Engine.Player.getStorage().length <= 1) {
            h += "<tr><td>no resource</td></tr>";
        } else {
            this.Engine.Player.getStorage().forEach(
                res => {
                    if (!(res.getResource() instanceof Level)) {
                        h += '<tr><td>' + this.displayQuantity(res) + '</td></tr>';
                    }
                }
            );
        }
        h += "</table>";
        return h;
    }

    displayProducers(): string {
        var h = '<table border="1">';
        h += "<tr><th>Production</th><th>resource</th><th>when</th></tr>";
        this.Engine.Producers.forEach(
            producer => {
                if (producer.isAuto()) {
                    h += "<tr><td>" + producer.getName() + "</td><td>" + this.displayQuantities(producer.getResourcesQuantity()) + "</td><td>every " + this.displayTime(producer.getInterval()) + "</td></tr>"
                } else {
                    h += "<tr><td>" + producer.getName() + "</td><td>" + this.displayQuantities(producer.getResourcesQuantity()) + '</td><td><button onclick="engine.collectProducer(\'' + producer.getName() + '\');">Collect</button></td></tr>'
                }
            }
        );
        h += "</table>";
        return h;
    }
    displayCrafters(): string {
        var h = '<table border="1">';
        h += "<tr><th>Crafter</th><th>cost</th><th>it will make</th><th></th></tr>";
        this.Engine.Crafters.forEach(
            trigger => h += this.displayCrafter(trigger)
        );
        h += "</table>";
        return h;
    }

    private displayCrafter(crafter : ICrafter) : string {
        let h = "<tr>";
        h += '<td>' + crafter.getName() + '</td>';
        h += "<td>"
        h += this.displayAvailableQuantities(crafter.getCost());
        h += "</td>"
        h += '<td>' + this.displayQuantities(crafter.getCraftedResources()) + '</td>';
        h += '<td>' + this.displayCraftButton(crafter) + '</td>';
        h += '</tr>';
        return h;
    }

    private displayCraftButton(crafter : ICrafter) : string {
        if (crafter.isAuto()) {
            return 'Auto Crafting';
        }
        if (crafter.isCrafting()) {
            return this.displayProgress(crafter.getStartTime(), crafter.getDuration());
        }
        if (!this.Engine.Player.hasResources(crafter.getCost())) {
            return 'Not enough resources';
        }
        return '<button onclick="engine.startCrafting(\'' + crafter.getName() + '\');">craft ('+this.displayTime(crafter.getDuration())+')</button>';
    }

    displayTriggers(): string {
        if (this.Engine.Triggers.length == 0){
            return '...No more goal for now. Wait for next version of the game.';
        }
        var h = '<table border="1">';
        h += '<tr><th>Next goal</th><th>needed resources</th></tr>';
        this.Engine.Triggers.forEach(
            trigger => h += this.displayTrigger(trigger)
        );
        h += "</table>";
        return h;
    }

    private displayTrigger(trigger : ITrigger) : string {
        let h = "<tr>";
        h += '<td>' + trigger.getName() + '</td>';
        h += "<td>";
        trigger.getResourcesTrigger().forEach(
            res => h += res.show()
        );
        h += "</td>";
        h += '</tr>';
        return h;
    }

    displayTree(): string {
        let h = '<table border="1">';
        h += "<tr><th>next goal</th><th>Evolutions</th><th>needed resources</th><th>unlock</th></tr>";
        h += this.displayBranch(engine.Triggers);
        h += "</table>";
        return h;
    }

    private displayBranch(triggers : Array<ITrigger>) : string {
        let h = '';
        triggers.forEach(
            trig => {
                let nextGoal = '';
                if (engine.Triggers.indexOf(trig) != -1) {
                    nextGoal = '<img src="images/arrow_right.svg" alt="arrow right" title="arrow right" widht="40px" height="40px"  />';
                }
                h += "<tr>"
                    + "<td>" + nextGoal + "</td>"
                    + "<td>" + trig.getName() + "</td>"
                    + "<td>" + this.displayAvailableQuantities(trig.getResourcesTrigger()) + "</td>"
                    + "<td>" + ((trig.getSpawnProducers().length)?'<b>Producers</b>:'+trig.getSpawnProducers().map(p => p.getName()).join(', '):'')
                    + ((trig.getSpawnCrafters().length)?' <b>crafters</b>:'+trig.getSpawnCrafters().map(p => p.getName()).join(', '):'') + "</td>"
                + "</tr>";
                if (trig.getSpawnNewTriggers().length) {
                    h += this.displayBranch(trig.getSpawnNewTriggers());
                }
            }
        );
        return h;
    }

    private displayQuantities(quantities : Array<IQuantity>) : string {
        return quantities.map(
                resQ => this.displayQuantity(resQ)
            )
            .join(' ');
    }
    private displayAvailableQuantities(quantities : Array<IQuantity>) : string {
        var h = '';
        quantities.forEach(
            resQ => {
                let storageRes = engine.Player.getResourceInStorage(resQ.getResource().getName());
                let cssClass = 'notAvailableResource';
                if (storageRes != null && storageRes.getQuantity() >= resQ.getQuantity()) {
                    cssClass = 'availableResource';
                }
                h += this.displayQuantity(resQ, cssClass)
            }
        );
        h += '';
        return h;
    }

    private displayQuantity(quantity : IQuantity, optionnalCss : string = '') : string {
        let res : any = quantity.getResource();
        let image : string = '';
        if ('Image' in res) {
            image = res.Image;
        }
        return '<div class="resource ' + quantity.$type + ' ' + optionnalCss + '">'
            + '<div class="resource_label">' + quantity.show() +  '</div>'
            + ((image=='')?quantity.getResource().getName() : '<img src="images/' + image + '.svg" title="' + quantity.getResource().getName() + '" alt="' + quantity.getResource().getName() + '" class="resource_img">')
            + '</div>';
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

    private displayProgress(startTime : Date | null, duration : number) : string {
        let progress = this.calculateProgress(startTime)
        return this.formatProgress(progress / duration, this.displayTime(duration - progress));
    }

    private calculateProgress(startTime : Date | null) : number {
        if (startTime == null) {
            return 0;
        }
        return (new Date().getTime() - startTime.getTime());
    }

    private formatProgress(percent01 : number, text : string) : string {
        var percent100 = Math.round(percent01 * 100);
        return '<div class="progressBar">' +
            '<div class="progressBarIn" style="width:' + percent100 + 'px;">' + text + '</div>' +
            '</div>';
    }
}
