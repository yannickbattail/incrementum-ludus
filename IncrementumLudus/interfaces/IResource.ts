interface IResource {
    $type : string;
    getName() : string;
    equals(obj: IResource) : boolean ;
    show(quantity : number) : string ;
}
