
interface IResourceAmount {
    $type : string;
    getQuantity() : number ;
    getResource() : IResource;
    show() : string;
}