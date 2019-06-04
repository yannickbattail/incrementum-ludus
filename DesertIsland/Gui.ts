/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IQuantity.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
/// <reference path="../Engine/Engine.ts" />

/// <reference path="./CategorizedMaterial.ts" />
/// <reference path="./CategorizedItem.ts" />
/// <reference path="./Level.ts" />
/// <reference path="../NodeUpdate/NodeUpdate.ts" />

class Gui {
    intervalId : number = 0;
    constructor(private engine: Engine) {
        this.engine = engine;
    }

    private displayLevel(): string {
        let level = this.engine.player.getResourceInStorage("level");
        let h = "<strong>Level</strong>: ";
        if (level != null) {
            let q = level.getQuantity();
            let res = level.getResource();
            if ('getStepName' in res) {
                let getStepName : Function = res['getStepName'];
                h += q + " " + getStepName.call(res, q) ;
            }
        }
        return h;
    }

    private displayStorage(): string {
        var h = '<table border="1">';
        h += "<tr><th>Resource storage</th></tr>";
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

    private displayStorageCategory(title : string, category : string): string {
        let content = this.displayStorageCategoryContent(category);
        if (content != "") {
            return this.displayStorageBox(title, content);
        }
        return "";
    }

    private displayStorageBox(title : string, content : string): string {
        var h = '<table border="1">';
        h += "<tr><th>"+title+"</th></tr>";
        h += "<tr><td>";
        h += content;
        h += "</td></tr>";
        h += "</table>";
        return h;
    }

    private displayStorageCategoryContent(category : string): string {
        return this.engine.player.getStorage()
            .filter(
                resQ =>
                {   
                    let resource = resQ.getResource();
                    return ('category' in resource) && (resource['category'] ==  category);
                }
            )
            .map(
                res => this.displayQuantity(res)
            ).join("");
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
                        + '<td>' + producer.getName() + ' ' + this.displayProgress(producer.getStartTime(), interval) + '</td>'
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
        h += "<tr>";
        h += "<th>Craft</th>";
        if(!this.getSimple()) {
            h += "<th>It will make</th>";
        }
        h += "<th>Cost</th>";
        h += "</tr>";
        this.engine.crafters.forEach(
            trigger => h += this.displayCrafter(trigger)
        );
        h += "</table>";
        return h;
    }

    private displayCrafter(crafter : ICrafter) : string {
        let h = '<tr>';
        h += '<td>' + this.displayCraftButton(crafter) + '</td>';
        if(!this.getSimple()) {
            h += '<td>' + this.displayQuantities(crafter.getCraftedResources()) + '</td>';
        }
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
                + ' ' + this.displayProgress(crafter.getStartTime(), crafter.getDuration())
                +'</div>';
        } else {
            h = '<button onclick="engine.startCrafting(\'' + crafter.getName() + '\');"'
                + (!this.engine.player.hasResources(crafter.getCost())?' disabled="disabled" title="Not enough resources"':'')
                + ((crafter.isCrafting())?' disabled="disabled" title="In progress..."':'') + '>'
                + this.displayAutoCraft(crafter) + crafter.getName() + ' ('+this.displayTime(crafter.getDuration())+')'
                + ' ' + this.displayProgress(crafter.getStartTime(), crafter.getDuration())
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
        h += "<tr>";
        h += "<th>Next goals</th>"
        h += "<th>Needed resources</th>";
        if (!this.getSimple()) {
            h += "<th>Reward</th>";
        }
        h += "</tr>";
        if (this.engine.triggers.length <= 0){
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
                h += "<tr>";
                if (trig.getChangeEngineStatus() == EngineStatus.WIN) {
                    h += '<td>[<span class="win" title="Reach this goal and you win.">Win</span>] ' + trig.getName() + "</td>";
                } else if (trig.getChangeEngineStatus() == EngineStatus.LOOSE) {
                    h += '<td>[<span class="loose" title="Reach this qoal and you loose.">Loose</span>] ' + trig.getName() + "</td>";
                } else {
                    h += '<td>' + trig.getName() + "</td>";
                }
                h += "<td>" + this.displayAvailableQuantities(trig.getResourcesTrigger()) + "</td>";
                if (!this.getSimple()) {
                    h += "<td>" + ((trig.getSpawnProducers().length)?' <b>Producers</b>:'+trig.getSpawnProducers().map(p => p.getName()).join(', '):'')
                             + ((trig.getSpawnCrafters().length)?' <b>Crafters</b>:'+trig.getSpawnCrafters().map(p => p.getName()).join(', '):'')
                             + ((trig.getSpawnResources().length)?' <b>Resources</b>:'+this.displayQuantities(trig.getSpawnResources()):'') + "</td>";
                }
                h += "</tr>";
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
                h += this.displayQuantity(resQ, cssClass, storageRes)
            }
        );
        h += '';
        return h;
    }

    private displayQuantity(quantity : IQuantity, optionnalCss : string = '', storageRes : IQuantity | null = null) : string {
        let res : any = quantity.getResource();
        let image : string = '';
        if ('image' in res) {
            image = res.image;
        }
        let details : any = null;
        if ('getDetails' in quantity) {
            details = quantity['getDetails'];
        }
        return '<div class="resource ' + quantity.getResource().$type + ' ' + optionnalCss + '">'
        + '<div class="resource_label">'
        + ((storageRes!=null)?'<span>'+storageRes.show()+'</span>/':'')
        + quantity.show()
        + '</div>'
            + ((image=='')?quantity.getResource().getName() : '<img src="images/' + image + '" title="' + quantity.getResource().getName() + '" alt="' + quantity.getResource().getName() + '" class="resource_img">')
            + ((details != null)?details.call(quantity) : '')
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

    private getSimple() : boolean {
        let checkbox = document.getElementById('simple');
        if (checkbox != null && ('checked' in checkbox) && checkbox['checked']) {
            return true;
        }
        return false;
    }


    private engineStatus : EngineStatus = EngineStatus.NOT_YET_STARTED;

    loose() {
        if (this.engine.status == EngineStatus.LOOSE 
            && this.engineStatus != EngineStatus.LOOSE) {
                this.endGame(false, "You die! Try again, you may have better luck next time.");
                this.engineStatus = this.engine.status;
        }
        if (this.engine.status == EngineStatus.WIN
            && this.engineStatus != EngineStatus.WIN) {
                this.endGame(true, "You win! Wait for the next evolution of the game.");
                this.engineStatus = this.engine.status;
        }
    }

    public endGame(win : boolean, raison : string) {
        let raisonDiv = document.getElementById('raison');
        if (raisonDiv != null) {
            raisonDiv.innerHTML = raison;
        }
        let overlayTitle = document.getElementById('overlayTitle');
        if (overlayTitle != null) {
            if (win) {
                overlayTitle.innerText = "You win!";
                overlayTitle.className = 'win';
            } else {
                overlayTitle.innerText = "You die!";
                overlayTitle.className = 'loose';
            }
        }
        let overlay = document.getElementById('overlay');
        if (overlay != null) {
            let o = overlay;
            o.className = 'show';
            window.setTimeout(() => {o.className += ' shade'}, 500);
        }
    }

    public static youWin(raison : string) {
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
        window.localStorage.removeItem('DesertIsland');
        window.localStorage.removeItem('DesertIslandVersion');
        console.log('eraseStorage');
    }
    clearStorage() {
        Gui.eraseStorage();
    }
    restart() {
        if (window.confirm('It will restart the game from zero. Are you sure?')) {
            Gui.eraseStorage();
            window.location.reload();
            Gui.eraseStorage();
            this.stop();
            Gui.eraseStorage();
        }
    }
    fastMode() {
        engine.fastMode=1000;
    }

    private updateGui() {
        NodeUpdate.updateDiv('level', this.displayLevel());
        NodeUpdate.updateDiv('storageGlobal', this.displayStorageCategory("Info", "global"));
        NodeUpdate.updateDiv('producers', this.displayProducers());
        NodeUpdate.updateDiv('crafters', this.displayCrafters());
        NodeUpdate.updateDiv('tree', this.displayTree());
        this.loose();
    }

    start(refreshInterval : number) {
        this.intervalId = window.setInterval(() => this.updateGui(), refreshInterval);
    }
}
