"use strict";
var Gui = (function () {
    function Gui(engine) {
        this.engine = engine;
        this.intervalId = 0;
        this.engineStatus = EngineStatus.NOT_YET_STARTED;
        this.engine = engine;
    }
    Gui.prototype.displayLevel = function () {
        var level = this.engine.player.getResourceInStorage("level");
        var h = "<strong>Level</strong>: ";
        if (level != null) {
            var q = level.getQuantity();
            var res = level.getResource();
            if ('getStepName' in res) {
                var getStepName = res['getStepName'];
                h += q + " " + getStepName.call(res, q);
            }
        }
        return h;
    };
    Gui.prototype.displayStorage = function () {
        var _this = this;
        var h = '<table border="1">';
        h += "<tr><th>Resource storage</th></tr>";
        h += "<tr><td>";
        if (this.engine.player.getStorage().length <= 1) {
            h += "no resource";
        }
        else {
            this.engine.player.getStorage().forEach(function (res) {
                if (!(res.getResource() instanceof Level)) {
                    h += _this.displayQuantity(res);
                }
            });
        }
        h += "</td></tr>";
        h += "</table>";
        return h;
    };
    Gui.prototype.displayStorageCategory = function (title, category) {
        var content = this.displayStorageCategoryContent(category);
        if (content != "") {
            return this.displayStorageBox(title, content);
        }
        return "";
    };
    Gui.prototype.displayStorageBox = function (title, content) {
        var h = '<table border="1">';
        h += "<tr><th>" + title + "</th></tr>";
        h += "<tr><td>";
        h += content;
        h += "</td></tr>";
        h += "</table>";
        return h;
    };
    Gui.prototype.displayStorageCategoryContent = function (category) {
        var _this = this;
        return this.engine.player.getStorage()
            .filter(function (resQ) {
            var resource = resQ.getResource();
            return ('category' in resource) && (resource['category'] == category);
        })
            .map(function (res) { return _this.displayQuantity(res); }).join("");
    };
    Gui.prototype.displayProducers = function () {
        var _this = this;
        var h = '<table border="1">';
        h += '<tr><th>Production</th><th>Resource</th></tr>';
        this.engine.producers.forEach(function (producer) {
            if (producer.isAuto()) {
                var i = producer.getInterval();
                var interval = 0;
                if (i != null) {
                    interval = i;
                }
                h += '<tr>'
                    + '<td>' + producer.getName() + ' ' + _this.displayProgress(producer.getStartTime(), interval) + '</td>'
                    + '<td>' + _this.displayQuantities(producer.getResourcesQuantity()) + '</td>'
                    + '</tr>';
            }
            else {
                h += '<tr>'
                    + '<td><button onclick="engine.collectProducer(\'' + producer.getName() + '\');">' + producer.getName() + '</button></td>'
                    + '<td>' + _this.displayQuantities(producer.getResourcesQuantity()) + '</td>'
                    + '</tr>';
            }
        });
        h += '</table>';
        return h;
    };
    Gui.prototype.displayCrafters = function () {
        var _this = this;
        var h = '<table border="1">';
        h += "<tr>";
        h += "<th>Craft</th>";
        if (!this.getSimple()) {
            h += "<th>It will make</th>";
        }
        h += "<th>Cost</th>";
        h += "</tr>";
        this.engine.crafters.forEach(function (trigger) { return h += _this.displayCrafter(trigger); });
        h += "</table>";
        return h;
    };
    Gui.prototype.displayCrafter = function (crafter) {
        var h = '<tr>';
        h += '<td>' + this.displayCraftButton(crafter) + '</td>';
        if (!this.getSimple()) {
            h += '<td>' + this.displayQuantities(crafter.getCraftedResources()) + '</td>';
        }
        h += '<td>' + this.displayAvailableQuantities(crafter.getCost()) + '</td>';
        h += '</tr>';
        return h;
    };
    Gui.prototype.displayCraftButton = function (crafter) {
        var h = '';
        if (crafter.isAuto()) {
            h = '<div'
                + (!this.engine.player.hasResources(crafter.getCost()) ? ' title="Not enough resources"' : '') + '>'
                + this.displayAutoCraft(crafter) + crafter.getName() + ' (' + this.displayTime(crafter.getDuration()) + ')'
                + ' ' + this.displayProgress(crafter.getStartTime(), crafter.getDuration())
                + '</div>';
        }
        else {
            h = '<button onclick="engine.startCrafting(\'' + crafter.getName() + '\');"'
                + (!this.engine.player.hasResources(crafter.getCost()) ? ' disabled="disabled" title="Not enough resources"' : '')
                + ((crafter.isCrafting()) ? ' disabled="disabled" title="In progress..."' : '') + '>'
                + this.displayAutoCraft(crafter) + crafter.getName() + ' (' + this.displayTime(crafter.getDuration()) + ')'
                + ' ' + this.displayProgress(crafter.getStartTime(), crafter.getDuration())
                + '</button>';
        }
        return h;
    };
    Gui.prototype.displayAutoCraft = function (crafter) {
        if (crafter.isAutomatable()) {
            return '<input type="checkbox" '
                + 'onclick="engine.switchAutoCrafting(\'' + crafter.getName() + '\');" '
                + 'title="Auto" '
                + (crafter.isAuto() ? ' checked="checked"' : '') + ' />';
        }
        return '';
    };
    Gui.prototype.displayTree = function () {
        var h = '<table border="1">';
        h += "<tr>";
        h += "<th>Next goals</th>";
        h += "<th>Needed resources</th>";
        if (!this.getSimple()) {
            h += "<th>Reward</th>";
        }
        h += "</tr>";
        if (this.engine.triggers.length <= 0) {
            h += '<tr><td colspan="3">Finish! <b>You win!</b> Wait for next version of the game.</td></tr>';
        }
        else {
            h += this.displayBranch(engine.triggers);
        }
        h += "</table>";
        return h;
    };
    Gui.prototype.displayBranch = function (triggers) {
        var _this = this;
        var h = '';
        triggers.forEach(function (trig) {
            h += "<tr>";
            if (trig.getChangeEngineStatus() == EngineStatus.WIN) {
                h += '<td>[<span class="win" title="Reach this goal and you win.">Win</span>] ' + trig.getName() + "</td>";
            }
            else if (trig.getChangeEngineStatus() == EngineStatus.LOOSE) {
                h += '<td>[<span class="loose" title="Reach this qoal and you loose.">Loose</span>] ' + trig.getName() + "</td>";
            }
            else {
                h += '<td>' + trig.getName() + "</td>";
            }
            h += "<td>" + _this.displayAvailableQuantities(trig.getResourcesTrigger()) + "</td>";
            if (!_this.getSimple()) {
                h += "<td>" + ((trig.getSpawnProducers().length) ? ' <b>Producers</b>:' + trig.getSpawnProducers().map(function (p) { return p.getName(); }).join(', ') : '')
                    + ((trig.getSpawnCrafters().length) ? ' <b>Crafters</b>:' + trig.getSpawnCrafters().map(function (p) { return p.getName(); }).join(', ') : '')
                    + ((trig.getSpawnResources().length) ? ' <b>Resources</b>:' + _this.displayQuantities(trig.getSpawnResources()) : '') + "</td>";
            }
            h += "</tr>";
        });
        return h;
    };
    Gui.prototype.displayQuantities = function (quantities) {
        var _this = this;
        return quantities.map(function (resQ) { return _this.displayQuantity(resQ); })
            .join(' ');
    };
    Gui.prototype.displayAvailableQuantities = function (quantities) {
        var _this = this;
        var h = '';
        quantities.forEach(function (resQ) {
            var storageRes = _this.engine.player.getResourceInStorage(resQ.getResource().getName());
            var cssClass = 'notAvailableResource';
            if (storageRes != null && storageRes.getQuantity() >= resQ.getQuantity()) {
                cssClass = 'availableResource';
            }
            h += _this.displayQuantity(resQ, cssClass, storageRes);
        });
        h += '';
        return h;
    };
    Gui.prototype.displayQuantity = function (quantity, optionnalCss, storageRes) {
        if (optionnalCss === void 0) { optionnalCss = ''; }
        if (storageRes === void 0) { storageRes = null; }
        var res = quantity.getResource();
        var image = '';
        if ('image' in res) {
            image = res.image;
        }
        var details = null;
        if ('getDetails' in quantity) {
            details = quantity['getDetails'];
        }
        return '<div class="resource ' + quantity.getResource().$type + ' ' + optionnalCss + '">'
            + '<div class="resource_label">'
            + ((storageRes != null) ? '<span>' + storageRes.show() + '</span>/' : '')
            + quantity.show()
            + '</div>'
            + ((image == '') ? quantity.getResource().getName() : '<img src="images/' + image + '" title="' + quantity.getResource().getName() + '" alt="' + quantity.getResource().getName() + '" class="resource_img">')
            + ((details != null) ? details.call(quantity) : '')
            + '</div>';
    };
    Gui.prototype.displayTime = function (miliSeconds) {
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
    Gui.prototype.displayProgress = function (startTime, duration) {
        var progress = this.calculateProgress(startTime);
        return this.formatProgress(progress / duration, this.displayTime(duration - progress));
    };
    Gui.prototype.calculateProgress = function (startTime) {
        if (startTime == null) {
            return 0;
        }
        return (new Date().getTime() - startTime.getTime());
    };
    Gui.prototype.formatProgress = function (percent01, text) {
        var percent100 = Math.round(percent01 * 100);
        return '<progress value="' + percent100 + '" max="100">' + text + '</progress>';
    };
    Gui.prototype.getSimple = function () {
        var checkbox = document.getElementById('simple');
        if (checkbox != null && ('checked' in checkbox) && checkbox['checked']) {
            return true;
        }
        return false;
    };
    Gui.prototype.loose = function () {
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
    };
    Gui.prototype.endGame = function (win, raison) {
        var raisonDiv = document.getElementById('raison');
        if (raisonDiv != null) {
            raisonDiv.innerHTML = raison;
        }
        var overlayTitle = document.getElementById('overlayTitle');
        if (overlayTitle != null) {
            if (win) {
                overlayTitle.innerText = "You win!";
                overlayTitle.className = 'win';
            }
            else {
                overlayTitle.innerText = "You die!";
                overlayTitle.className = 'loose';
            }
        }
        var overlay = document.getElementById('overlay');
        if (overlay != null) {
            var o_1 = overlay;
            o_1.className = 'show';
            window.setTimeout(function () { o_1.className += ' shade'; }, 500);
        }
    };
    Gui.youWin = function (raison) {
        var raisonDiv = document.getElementById('raison');
        if (raisonDiv != null) {
            raisonDiv.innerHTML = raison;
        }
        var overlay = document.getElementById('overlay');
        if (overlay != null) {
            var o_2 = overlay;
            o_2.className = 'show';
            window.setTimeout(function () { o_2.className += ' shade'; }, 500);
        }
    };
    Gui.prototype.stop = function () {
        window.clearInterval(this.intervalId);
        engine.stop();
    };
    Gui.eraseStorage = function () {
        window.localStorage.removeItem('DesertIsland');
        window.localStorage.removeItem('DesertIslandVersion');
        console.log('eraseStorage');
    };
    Gui.prototype.clearStorage = function () {
        Gui.eraseStorage();
    };
    Gui.prototype.restart = function () {
        if (window.confirm('It will restart the game from zero. Are you sure?')) {
            Gui.eraseStorage();
            window.location.reload();
            Gui.eraseStorage();
            this.stop();
            Gui.eraseStorage();
        }
    };
    Gui.prototype.fastMode = function () {
        engine.fastMode = 1000;
    };
    Gui.prototype.updateGui = function () {
        NodeUpdate.updateDiv('level', this.displayLevel());
        NodeUpdate.updateDiv('storageGlobal', this.displayStorageCategory("Info", "global"));
        NodeUpdate.updateDiv('producers', this.displayProducers());
        NodeUpdate.updateDiv('crafters', this.displayCrafters());
        NodeUpdate.updateDiv('tree', this.displayTree());
        this.loose();
    };
    Gui.prototype.start = function (refreshInterval) {
        var _this = this;
        this.intervalId = window.setInterval(function () { return _this.updateGui(); }, refreshInterval);
    };
    return Gui;
}());
//# sourceMappingURL=Gui.js.map