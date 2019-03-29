/// <reference path="../Engine/Resource.ts" />

class Material extends Resource {
    constructor(name : string, public unit : string, public image : string){
        super(name);
    }
}
