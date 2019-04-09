/// <reference path="../Engine/Resource.ts" />

class Item extends Resource {
    public $type : string = 'Item';
    constructor(public Name : string, public Image : string){
        super(name);
    }
    public static load(data : any) : Item {
        let r : Item = new Item(data.Name, data.Image);
        return r;
    }
    public show(quantity : number) : string {
        return '<div class="resource Item">' +quantity +  ' <img src="images/' + this.Image + '.svg" title="' + this.Name + '" alt="' + this.Name + '" class="resource_img"></div>';
    }
}
