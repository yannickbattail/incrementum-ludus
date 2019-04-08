
class ResourceQuantity {
    $type : string = 'ResourceQuantity';
    constructor(public Resource: Resource, public Quantity: number) {
    }
    public static load(data : any) : ResourceQuantity {
        let rq : ResourceQuantity = new ResourceQuantity(Resource.load(data.Resource), data.Quantity);
        return rq;
    }
}
const EMPTY_RQ : ResourceQuantity = new ResourceQuantity(new Resource("nothing"), 0);
