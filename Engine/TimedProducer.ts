class TimedProducer extends Producer {
    $type : string = 'TimedProducer';
    public LastTime: Date = new Date(1970, 0, 1);
    constructor(public Name: string, public ResourceQuantity: ResourceQuantity = EMPTY_RQ, public Interval: number = 0) {
        super(Name, ResourceQuantity);
    }
    public static load(data : any) : TimedProducer {
        let curContext : any = window;
        let newObj : TimedProducer = new TimedProducer(data.Name);
        newObj.Interval = data.Interval;
        newObj.ResourceQuantity = curContext[data.ResourceQuantity.$type].load(data.ResourceQuantity);
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