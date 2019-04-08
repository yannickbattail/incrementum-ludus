class ManualProducer extends Producer {
    $type : string = 'ManualProducer';
    constructor(public Name: string, public ResourceQuantity: ResourceQuantity = EMPTY_RQ) {
        super(Name, ResourceQuantity);
    }
    public static load(data : any) : ManualProducer {
        let curContext : any = window;
        let newObj : ManualProducer = new ManualProducer(data.Name);
        newObj.ResourceQuantity = curContext[data.ResourceQuantity.$type].load(data.ResourceQuantity);
        return newObj;
    }
    public thatProduce(quantity : number, resource : Resource) : ManualProducer {
        this.ResourceQuantity = new ResourceQuantity(resource, quantity);
        return this;
    }
}