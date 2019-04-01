/// <reference path="../Engine/Resource.ts" />

class Material extends Resource {
    constructor(name : string, public unit : string, public image : string){
        super(name);
    }
    public show(quantity : number) : string {
        let u = this.unit;
        let q = quantity;
        if (u == 'g') {
            if (quantity >= 1000) {
                u = 'kg';
                q = Math.round(q / 100) / 10;
            }
        }
        if (u == 'cl') {
            if (quantity >= 100) {
                u = 'l';
                q = Math.round(q / 10) / 10;
            }
        }
        return q + u + ' <img src="images/' + this.image + '.svg" title="' + this.Name + '" alt="' + this.Name + '" class="resource_img">';
    }
}
