
class ResourceQuantity {
    constructor(public Resource: Resource, public Quantity: number) {
    }
    
}
const EMPTY_RQ : ResourceQuantity = new ResourceQuantity(new Resource("nothing"), 0);
