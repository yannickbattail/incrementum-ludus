class IncrGui {
    Engine: Engine;
    constructor(engine: Engine) {
        this.Engine = engine;
    }

    displayStorage(): string {
        var h = "<table>";
        this.Engine.Player.Storage.forEach(
            res => h += "<tr><td>" + res.Quantity + "</td><td>" + res.Resource.Name + "</td></tr>"
        );
        h += "</table>";
        return h;
    }

    displaySources(): string {
        var h = "<table>";
        this.Engine.Sources.forEach(
            source => h += "<tr><td>" + source.Name + "</td><td>" + source.Resource.Quantity + " " + source.Resource.Resource.Name + "</td><td>every " + source.Interval + " ms</td></tr>"
        );
        h += "</table>";
        return h;
    }

    displayTrigger(): string {
        var h = "<table>";
        this.Engine.Sources.forEach(
            source => h += "<tr><td>" + source.Name + "</td><td>" + source.Resource.Quantity + " " + source.Resource.Resource.Name + "</td><td>every " + source.Interval + " ms</td></tr>"
        );
        h += "</table>";
        return h;
    }
}