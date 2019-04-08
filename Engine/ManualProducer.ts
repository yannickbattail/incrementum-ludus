class ManualProducer extends Producer {
    $type : string = 'ManualProducer';
    constructor(public Name: string, public Resource: ResourceQuantity = EMPTY_RQ) {
        super(Name, Resource);
    }
    public static load(data : any) : ManualProducer {
        let curContext : any = window;
        let newObj : ManualProducer = new ManualProducer(data.Name);
        newObj.Resource = curContext[data.Resource.$type].load(data.Resource);
        return newObj;
    }
    public thatProduce(quantity : number, resource : Resource) : ManualProducer {
        this.ResourceQuantity = new ResourceQuantity(resource, quantity);
        return this;
    }
}