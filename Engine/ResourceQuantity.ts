
class ResourceQuantity {
    $type : string = 'ResourceQuantity';
    constructor(public Resource: Resource, public Quantity: number) {
    }
    public static load(data : any) : ResourceQuantity {
        let curContext : any = window;
        let res = curContext[data.Resource.$type].load(data.Resource);
        let rq : ResourceQuantity = new ResourceQuantity(res, data.Quantity);
        return rq;
    }
}
const EMPTY_RQ : ResourceQuantity = new ResourceQuantity(new Resource("nothing"), 0);
