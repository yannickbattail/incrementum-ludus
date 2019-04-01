/// <reference path="../Engine/Resource.ts" />

class Item extends Resource {
    constructor(name : string, public image : string){
        super(name);
    }
    public show(quantity : number) : string {
        return '<div class="resource Item">' +quantity +  ' <img src="images/' + this.image + '.svg" title="' + this.Name + '" alt="' + this.Name + '" class="resource_img"></div>';
    }
}
