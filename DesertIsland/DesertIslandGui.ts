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
/// <reference path="../NodeUpdate/NodeUpdate.ts" />

class DesertIslandGui {
    Engine: Engine;
    intervalId : number;
    constructor(engine: Engine) {
        this.Engine = engine;
    }

    private displayLevel(): string {
        let level = this.Engine.player.getResourceInStorage("level");
        let h = "XXX level";
        if (level != null) {
            h = 'Level: '+this.displayQuantity(level);
        }
        h +=  '<button onclick="gui.restart()">Restart</button>';
        return h;
    }

    private displayStorage(): string {
        var h = '<table border="1">';
        h += "<tr><th>Resource storage</th></tr>";
        h += "<tr><td>";
        if (this.Engine.player.getStorage().length <= 1) {
            h += "no resource";
        } else {
            this.Engine.player.getStorage().forEach(
                res => {
                    if (!(res.getResource() instanceof Level)) {
                        h += this.displayQuantity(res);
                    }
                }
            );
        }
        h += "</td></tr>";
        h += "</table>";
        return h;
    }

    private displayProducers(): string {
        var h = '<table border="1">';
        h += '<tr><th>Production</th><th>Resource</th></tr>';
        this.Engine.producers.forEach(
            producer => {
                if (producer.isAuto()) {
                    var i = producer.getInterval();
                    let interval = 0;
                    if (i != null) {
                        interval = i;
                    }
                    h += '<tr>'
                        + '<td>' + producer.getName() + '<br />' + this.displayProgress(producer.getStartTime(), interval) + '</td>'
                        + '<td>' + this.displayQuantities(producer.getResourcesQuantity()) + '</td>'
                        + '</tr>'
                } else {
                    h += '<tr>'
                        + '<td><button onclick="engine.collectProducer(\'' + producer.getName() + '\');">' + producer.getName() + '</button></td>'
                        + '<td>' + this.displayQuantities(producer.getResourcesQuantity()) + '</td>'
                        + '</tr>'
                }
            }
        );
        h += '</table>';
        return h;
    }
    private displayCrafters(): string {
        var h = '<table border="1">';
        h += "<tr><th>Craft</th><th>It will make</th><th>Cost</th></tr>";
        this.Engine.crafters.forEach(
            trigger => h += this.displayCrafter(trigger)
        );
        h += "</table>";
        return h;
    }

    private displayCrafter(crafter : ICrafter) : string {
        let h = '<tr>';
        h += '<td>' + this.displayCraftButton(crafter) + '</td>';
        h += '<td>' + this.displayQuantities(crafter.getCraftedResources()) + '</td>';
        h += '<td>' + this.displayAvailableQuantities(crafter.getCost()) + '</td>';
        h += '</tr>';
        return h;
    }

    private displayCraftButton(crafter : ICrafter) : string {
        let h = '<button onclick="engine.startCrafting(\'' + crafter.getName() + '\');"'
                + (!this.Engine.player.hasResources(crafter.getCost())?' disabled="disabled" title="Not enough resources"':'') + '>'
                + this.displayAutoCraft(crafter) + crafter.getName() + ' ('+this.displayTime(crafter.getDuration())+')'
                + '<br />' + this.displayProgress(crafter.getStartTime(), crafter.getDuration())
                +'</button>';
        
        return h;
    }

    private displayAutoCraft(crafter : ICrafter) : string {
        if (crafter.isAutomatable()) {
            return '<input type="checkbox" '
                + 'onclick="engine.switchAutoCrafting(\'' + crafter.getName() + '\');" '
                + 'title="Auto" '
                + (crafter.isAuto()?' checked="checked"':'') + ' />';
        }
        return '';
    }

    private displayTree(): string {
        let h = '<table border="1">';
        h += "<tr><th>Next goals</th><th>Needed resources</th><th>Reward</th></tr>";
        if (this.Engine.triggers.length <= 1){
            h += '<tr><td colspan="3">Finish! <b>You win!</b> Wait for next version of the game.</td></tr>';
        } else {
            h += this.displayBranch(engine.triggers);
        }
        h += "</table>";
        return h;
    }

    private displayBranch(triggers : Array<ITrigger>) : string {
        let h = '';
        triggers.forEach(
            trig => {
                h += "<tr>"
                    + "<td>" + trig.getName() + "</td>"
                    + "<td>" + this.displayAvailableQuantities(trig.getResourcesTrigger()) + "</td>"
                    + "<td>" + ((trig.getSpawnProducers().length)?' <b>Producers</b>:'+trig.getSpawnProducers().map(p => p.getName()).join(', '):'')
                             + ((trig.getSpawnCrafters().length)?' <b>Crafters</b>:'+trig.getSpawnCrafters().map(p => p.getName()).join(', '):'')
                             + ((trig.getSpawnResources().length)?' <b>Resources</b>:'+this.displayQuantities(trig.getSpawnResources()):'') + "</td>"
                + "</tr>";
                /*
                if (trig.getSpawnNewTriggers().length) {
                    h += this.displayBranch(trig.getSpawnNewTriggers());
                }*/
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
                let storageRes = this.Engine.player.getResourceInStorage(resQ.getResource().getName());
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
        if ('image' in res) {
            image = res.image;
        }
        return '<div class="resource ' + quantity.getResource().$type + ' ' + optionnalCss + '">'
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
        return '<progress value="' + percent100 + '" max="100">' + text + '</progress>';
    }

    stop() {
        window.clearInterval(this.intervalId);
        engine.stop();
    }
    static eraseStorage() {
        window.localStorage.removeItem('DesertIsland');
        window.localStorage.removeItem('DesertIslandVersion');
    }
    clearStorage() {
        DesertIslandGui.eraseStorage();
    }
    restart() {
        if (window.confirm('It will restart the game from zero. Are you sure?')) {
            this.stop();
            this.clearStorage();
            window.location.reload();
        }
    }
    fastMode() {
        engine.fastMode=1000;
    }

    private updateGui() {
        NodeUpdate.updateDiv('level', this.displayLevel());
        NodeUpdate.updateDiv('storage', this.displayStorage());
        NodeUpdate.updateDiv('producers', this.displayProducers());
        NodeUpdate.updateDiv('crafters', this.displayCrafters());
        NodeUpdate.updateDiv('tree', this.displayTree());
    }

    start(refreshInterval : number) {
        this.intervalId = window.setInterval(() => this.updateGui(), refreshInterval);
    }
}
