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

class Gui {
    intervalId : number;
    constructor(private engine: Engine) {
        this.engine = engine;
    }

    private displayLevel(): string {
        let level = this.engine.player.getResourceInStorage("level");
        let h = "XXX level";
        if (level != null) {
            h = 'Level: '+this.displayQuantity(level);
        }
        h +=  '<button onclick="gui.restart()">Restart</button>';
        return h;
    }

    private displayStorage(): string {
        var h = '<table border="1">';
        h += "<tr><th>Sac à pin's</th></tr>";
        h += "<tr><td>";
        if (this.engine.player.getStorage().length <= 1) {
            h += "no resource";
        } else {
            this.engine.player.getStorage().forEach(
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
        this.engine.producers.forEach(
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
        h += "<tr><th>Faire</th><th>Va donner</th><th>Coût</th></tr>";
        this.engine.crafters.forEach(
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
        let h = '';
        if (crafter.isAuto()) {
            h = '<div'
                + (!this.engine.player.hasResources(crafter.getCost())?' title="Not enough resources"':'') + '>'
                + this.displayAutoCraft(crafter) + crafter.getName() + ' ('+this.displayTime(crafter.getDuration())+')'
                + '<br />' + this.displayProgress(crafter.getStartTime(), crafter.getDuration())
                +'</div>';
        } else {
            h = '<button onclick="engine.startCrafting(\'' + crafter.getName() + '\');"'
                + (!this.engine.player.hasResources(crafter.getCost())?' disabled="disabled" title="Not enough resources"':'') + '>'
                + this.displayAutoCraft(crafter) + crafter.getName() + ' ('+this.displayTime(crafter.getDuration())+')'
                + '<br />' + this.displayProgress(crafter.getStartTime(), crafter.getDuration())
                +'</button>';
        }
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
        h += "<tr><th>Objectifs</th><th>Atteindre</th><th>Débloque</th></tr>";
        if (this.engine.triggers.length <= 0){
            h += '<tr><td colspan="3"><b>Vous avez gagné!</b> Fini! (pour le moment, en attendant la prochaine évolution du jeux)</td></tr>';
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
                    + "<td>" + ((trig.getSpawnProducers().length)?' <b>Production</b>:'+trig.getSpawnProducers().map(p => p.getName()).join(', '):'')
                             + ((trig.getSpawnCrafters().length)?' <b>Objectif</b>:'+trig.getSpawnCrafters().map(p => p.getName()).join(', '):'')
                             + ((trig.getSpawnResources().length)?' <b>Ressources</b>:'+this.displayQuantities(trig.getSpawnResources()):'') + "</td>"
                + "</tr>";
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
                let storageRes = this.engine.player.getResourceInStorage(resQ.getResource().getName());
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
            + ((image=='')?quantity.getResource().getName() : '<img src="images/' + image + '" title="' + quantity.getResource().getName() + '" alt="' + quantity.getResource().getName() + '" class="resource_img">')
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

    public static youDie(raison : string) {
        let raisonDiv = document.getElementById('raison');
        if (raisonDiv != null) {
            raisonDiv.innerHTML = raison;
        }
        let overlay = document.getElementById('overlay');
        if (overlay != null) {
            let o = overlay;
            o.className = 'show';
            window.setTimeout(() => {o.className += ' shade'}, 500);
        }
    }

    stop() {
        window.clearInterval(this.intervalId);
        engine.stop();
    }
    static eraseStorage() {
        window.localStorage.removeItem('Fal');
        window.localStorage.removeItem('FalVersion');
    }
    clearStorage() {
        Gui.eraseStorage();
    }
    restart() {
        if (window.confirm('Ça va redémarrer le jeu depuis zéro. sûre?')) {
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
