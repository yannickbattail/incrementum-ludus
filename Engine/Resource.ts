class Resource {
    constructor(public Name: string) {
    }
    public show(quantity : number) : string {
        return quantity + ' ' + this.Name;
    }
}