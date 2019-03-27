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

    displayProducers(): string {
        var h = '<table border="1">';
        h += "<tr><th>producer name</th><th>resource</th><th>when</th></tr>";
        this.Engine.Producers.forEach(
            producer => {
                if (producer instanceof TimedProducer) {
                    h += "<tr><td>" + producer.Name + "</td><td>" + producer.Resource.Quantity + " " + producer.Resource.Resource.Name + "</td><td>every " + producer.Interval + " ms</td></tr>"
                } else if (producer instanceof ManualProducer) {
                    h += "<tr><td>" + producer.Name + "</td><td>" + producer.Resource.Quantity + " " + producer.Resource.Resource.Name + '</td><td><button onclick="engine.collectProducer(\'' + producer.Name + '\');">Collect</button></td></tr>'
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
        if (trigger.SpawnProducer instanceof TimedProducer) {
            h += "<td>" + trigger.SpawnProducer.Name + ": " + trigger.SpawnProducer.Resource.Quantity + " " + trigger.SpawnProducer.Resource.Resource.Name + " every " + trigger.SpawnProducer.Interval + " ms</td>"
        } else if (trigger.SpawnProducer instanceof TimedProducer) {
            "<td>" + trigger.SpawnProducer.Name + ": " + trigger.SpawnProducer.Resource.Quantity + " " + trigger.SpawnProducer.Resource.Resource.Name + " manualy</td>"
        }
        h += '</tr>';
        return h;
    }
}