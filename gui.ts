class IncrGui {
    Engine: Engine;
    constructor(engine: Engine) {
        this.Engine = engine;
    }

    displayStorage(): string {
        var h = '<table border="1">';
        h += "<tr><th>quantity</th><th>resource</th></tr>";
        this.Engine.Player.Storage.forEach(
            res => h += "<tr><td>" + res.Quantity + "</td><td>" + res.Resource.Name + "</td></tr>"
        );
        h += "</table>";
        return h;
    }

    displaySources(): string {
        var h = '<table border="1">';
        h += "<tr><th>source name</th><th>resource</th><th>when</th></tr>";
        this.Engine.Sources.forEach(
            source => {
                if (source instanceof TimedSource) {
                    h += "<tr><td>" + source.Name + "</td><td>" + source.Resource.Quantity + " " + source.Resource.Resource.Name + "</td><td>every " + source.Interval + " ms</td></tr>"
                } else if (source instanceof ManualSource) {
                    h += "<tr><td>" + source.Name + "</td><td>" + source.Resource.Quantity + " " + source.Resource.Resource.Name + '</td><td><button onclick="engine.collectSource(\'' + source.Name + '\');">Collect</button></td></tr>'
                }
            }
        );
        h += "</table>";
        return h;
    }

    displayTriggers(): string {
        var h = '<table border="1">';
        h += "<tr><th>name</th><th>triggerd when</th><th>resource</th><th>spwan</th></tr>";
        this.Engine.Triggers.forEach(
            trigger => h += this.displayTrigger(trigger)
        );
        h += "</table>";
        return h;
    }

    private displayTrigger(trigger : Trigger) : string {
        let h = "<tr>";
        h += '<td>' + trigger.Name + '</td>';
        h += "<td><ul>"
        trigger.ResourcesTrigger.forEach(
            res => h += '<li>' + res.Quantity + ' ' + res.Resource + '</li>'
        );
        h += "</ul></td>"
        if (trigger.SpawnSource instanceof TimedSource) {
            h += "<td>" + trigger.SpawnSource.Name + ": " + trigger.SpawnSource.Resource.Quantity + " " + trigger.SpawnSource.Resource.Resource.Name + " every " + trigger.SpawnSource.Interval + " ms</td>"
        } else if (trigger.SpawnSource instanceof TimedSource) {
            "<td>" + trigger.SpawnSource.Name + ": " + trigger.SpawnSource.Resource.Quantity + " " + trigger.SpawnSource.Resource.Resource.Name + " manualy</td>"
        }
        h += '</tr>';
        return h;
    }
}