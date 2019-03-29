class ManualProducer extends Producer {
    constructor(Name: string, Resource: ResourceQuantity = EMPTY_RQ) {
        super(Name, Resource);
    }

    public thatProduce(quantity : number, resource : Resource) : ManualProducer {
        this.ResourceQuantity = new ResourceQuantity(resource, quantity);
        return this;
    }
}