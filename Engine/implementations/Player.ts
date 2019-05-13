/// <reference path="../interfaces/IResource.ts" />
/// <reference path="../interfaces/IQuantity.ts" />
/// <reference path="../interfaces/IProducer.ts" />
/// <reference path="../interfaces/ITrigger.ts" />
/// <reference path="../interfaces/ICrafter.ts" />
/// <reference path="../interfaces/IPlayer.ts" />

class Player implements IPlayer {
    $type : string = 'Player';
    protected preventNegativeStorage : boolean = false;
    protected storage: Array<Quantity> = new Array<Quantity>();
    constructor(protected name: string) {
    }
    public static load(data : any) : Player {
        let curContext : any = window;
        let player : Player = new Player(data.name);
        player.preventNegativeStorage = data.preventNegativeStorage;
        player.storage = (data.storage as Array<any>).map(p => curContext[p.$type].load(p));
        return player;
    }
    public getName() : string {
        return this.name;
    }
    public getStorage() : Array<IQuantity>{
        return this.storage;
    }

    public getPreventNegativeStorage() : boolean {
        return this.preventNegativeStorage;
    }

    public setPreventNegativeStorage(preventNegativeStorage : boolean) : Player {
        this.preventNegativeStorage = preventNegativeStorage;
        return this;
    }

    public increaseStorage(quantity: IQuantity) {
        let resQ = this.getResourceInStorage(quantity.getResource().getName());
        if (resQ == null) {
            if (quantity.getQuantity() < 0 && this.preventNegativeStorage) {
                this.storage.push(new Quantity(0, quantity.getResource()));
            } else {
                this.storage.push(new Quantity(quantity.getQuantity(), quantity.getResource()));
            }
        } else {
            if ((resQ.getQuantity() + quantity.getQuantity()) < 0 && this.preventNegativeStorage) {
                this.storage.push(new Quantity(0, quantity.getResource()));
            } else {
                resQ.setQuantity(resQ.getQuantity() + quantity.getQuantity());
            }
        }
    }
    
    public decreaseStorage(quantity: IQuantity) {
        let resQ = this.getResourceInStorage(quantity.getResource().getName());
        if (resQ == null) {
            if ((-1 * quantity.getQuantity()) < 0 && this.preventNegativeStorage) {
                this.storage.push(new Quantity(0, quantity.getResource()));
            } else {
                this.storage.push(new Quantity(-1 * quantity.getQuantity(), quantity.getResource()));
            }
        } else {
            if ((resQ.getQuantity() + -1 * quantity.getQuantity()) < 0 && this.preventNegativeStorage) {
                this.storage.push(new Quantity(0, quantity.getResource()));
            } else {
                resQ.setQuantity(resQ.getQuantity() + -1 * quantity.getQuantity());
            }
        }
    }

    public getResourceInStorage(resourceName: string): Quantity | null {
        let res = this.storage.filter((res: Quantity) => res.getResource().getName() == resourceName);
        if (res.length) {
            return res[0];
        }
        return null;
    }
    public hasResources(resourcesQuantity: Quantity[]): boolean {
        let hasRes = true;
        resourcesQuantity.forEach(
            resQ => {
                let playerRes = this.getResourceInStorage(resQ.getResource().getName());
                if (playerRes == null || playerRes.getQuantity() < resQ.getQuantity()) {
                    hasRes = false;
                }
            }
        );
        return hasRes;
    }
}