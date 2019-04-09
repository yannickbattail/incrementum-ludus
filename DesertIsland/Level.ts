/// <reference path="../Engine/Resource.ts" />

class Level extends Resource {
    public $type : string = 'Level';
    constructor(public Name : string, public Image : string){
        super(Name);
    }
    public static load(data : any) : Level {
        let r : Level = new Level(data.Name, data.Image);
        return r;
    }
    public show(quantity : number) : string {
        return '<div class="resource Level">' + quantity +  ' <img src="images/' + this.Image + '.svg" title="' + this.Name + '" alt="' + this.Name + '" class="resource_img"></div>';
    }
}
