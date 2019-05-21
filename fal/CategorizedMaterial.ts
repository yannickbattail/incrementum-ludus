/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IQuantity.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
/// <reference path="../Engine/Engine.ts" />
/// <reference path="./ICategorized.ts" />

class CategorizedMaterial extends Resource implements ICategorized {
    public $type : string = 'CategorizedMaterial';
    constructor(public name : string, public unit : string, public image : string, public category : string){
        super(name);
    }
    public static load(data : any) : CategorizedMaterial {
        let r : CategorizedMaterial = new CategorizedMaterial(data.name, data.unit, data.image, data.category);
        return r;
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
        return q + u;
    }
}
