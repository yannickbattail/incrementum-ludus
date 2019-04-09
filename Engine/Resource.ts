class Resource {
    public $type : string = 'Resource';
    constructor(public Name: string) {
    }
    public static load(data : any) : Resource {
        let r : Resource = new Resource(data.Name);
        return r;
    }
    public equals(obj: Resource) : boolean {
        return this.Name == obj.Name;
    }
    public show(quantity : number) : string {
        return quantity + ' ' + this.Name;
    }
}
