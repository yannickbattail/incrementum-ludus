class TimedProducer extends Producer {
    public LastTime: Date = new Date(1970, 0, 1);
    constructor(Name: string, Resource: ResourceQuantity, public Interval: number) {
        super(Name, Resource);
    }
}