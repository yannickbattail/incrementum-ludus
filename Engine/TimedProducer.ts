class TimedProducer extends Producer {
    $type : string = 'TimedProducer';
    public LastTime: Date = new Date(1970, 0, 1);
    constructor(public Name: string, public Resource: ResourceQuantity = EMPTY_RQ, public Interval: number = 0) {
        super(Name, Resource);
    }
    public static load(data : any) : TimedProducer {
        let curContext : any = window;
        let newObj : TimedProducer = new TimedProducer(data.Name);
        newObj.Interval = data.Interval;
        newObj.Resource = curContext[data.Resource.$type].load(data.Resource);
        return newObj;
    }
    public thatProduce(quantity : number, resource : Resource) : TimedProducer {
        this.ResourceQuantity = new ResourceQuantity(resource, quantity);
        return this;
    }

    public every(interval: number) : TimedProducer {
        this.Interval = interval;
        return this;
    }

    public seconds() : TimedProducer {
        this.Interval *= 1000;
        return this;
    }

    public minutes() : TimedProducer {
        this.Interval *= 60 * 1000;
        return this;
    }
}