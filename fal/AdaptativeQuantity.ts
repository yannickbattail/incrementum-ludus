/// <reference path="../Engine/interfaces/IResource.ts" />
/// <reference path="../Engine/interfaces/IQuantity.ts" />
/// <reference path="../Engine/interfaces/IProducer.ts" />
/// <reference path="../Engine/interfaces/ITrigger.ts" />
/// <reference path="../Engine/interfaces/ICrafter.ts" />
/// <reference path="../Engine/interfaces/IPlayer.ts" />
/// <reference path="../Engine/Engine.ts" />

class AdaptativeQuantity implements IQuantity {
    $type : string = 'AdaptativeQuantity';
    protected quantityIfYes: Quantity;
    protected quantityIfNot: Quantity;
    protected quantityStep: Quantity;
    protected showQuantityIfNot: boolean;

    constructor() {
    }

    public static load(data : any) : AdaptativeQuantity {
        let curContext : any = window;
        let rq : AdaptativeQuantity = new AdaptativeQuantity();
        rq.quantityIfYes = curContext[data.quantityIfYes.$type].load(data.quantityIfYes);
        rq.quantityIfNot = curContext[data.quantityIfNot.$type].load(data.quantityIfNot);
        rq.quantityStep = curContext[data.quantityStep.$type].load(data.quantityStep);
        rq.showQuantityIfNot = data.showQuantityIfNot;
        return rq;
    }
    getQuantity() : number {
        let e : Engine = engine;
        if (e.player.hasResources([this.quantityStep])) {
            return this.quantityIfYes.getQuantity();
        }
        return this.quantityIfNot.getQuantity();
    }
    getResource() : IResource{
        let e : Engine = engine;
        if (e.player.hasResources([this.quantityStep])) {
            return this.quantityIfYes.getResource();
        }
        return this.quantityIfNot.getResource();
    }
    show() : string {
        if (this.showQuantityIfNot) {
            return this.quantityIfNot.getResource().show(this.quantityIfNot.getQuantity());
        }
        return this.quantityIfYes.getResource().show(this.quantityIfYes.getQuantity());
    }

    getDetails() : string {
        return '<div class="chanceOf">mais pas toujours</div>';
    }

    // builder methods
    ifHas(quantityStep : Quantity) : AdaptativeQuantity {
        this.quantityStep = quantityStep;
        return this;
    }

    give(quantityIfYes : Quantity) : AdaptativeQuantity {
        this.quantityIfYes = quantityIfYes;
        return this;
    }
    
    elseGive(quantityIfNot : Quantity) : AdaptativeQuantity {
        this.quantityIfNot = quantityIfNot;
        return this;
    }
    showTheQuantityIfNot() {
        this.showQuantityIfNot = true;
        return this;
    }

}