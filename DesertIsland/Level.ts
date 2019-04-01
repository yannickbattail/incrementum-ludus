/// <reference path="../Engine/Resource.ts" />

class Level extends Resource {
    constructor(name : string, public image : string){
        super(name);
    }
    public show(quantity : number) : string {
        return quantity +  ' <img src="images/' + this.image + '.svg" title="' + this.Name + '" alt="' + this.Name + '" class="resource_img">';
    }
}
