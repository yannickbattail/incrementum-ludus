/// <reference path="../interfaces/IResource.ts" />
/// <reference path="../interfaces/IQuantity.ts" />
/// <reference path="../interfaces/IProducer.ts" />
/// <reference path="../interfaces/ITrigger.ts" />
/// <reference path="../interfaces/ICrafter.ts" />
/// <reference path="../interfaces/IPlayer.ts" />

class Player implements IPlayer{
    $type : string = 'Player';
    protected Storage: Array<Quantity> = new Array<Quantity>();
    constructor(protected Name: string) {
    }
    public static load(data : any) : Player {
        let curContext : any = window;
        let player : Player = new Player(data.Name);
        player.Storage = (data.Storage as Array<any>).map(p => curContext[p.$type].load(p));
        return player;
    }
    public getName() : string {
        return this.Name;
    }
    public getStorage() : Array<IQuantity>{
        return this.Storage;
    }

    public changeStorage(quantity: IQuantity) {
        let resQ = this.getResourceInStorage(quantity.getResource().getName());
        if (resQ == null) {
            this.Storage.push(new Quantity(quantity.getQuantity(), quantity.getResource()));
        } else {
            resQ.setQuantity(resQ.getQuantity() + quantity.getQuantity());
        }
    }
    public decreaseStorage(quantity: IQuantity) {
        let resQ = this.getResourceInStorage(quantity.getResource().getName());
        if (resQ == null) {
            this.Storage.push(new Quantity(-1 * quantity.getQuantity(), quantity.getResource()));
        } else {
            resQ.setQuantity(resQ.getQuantity() + -1 * quantity.getQuantity());
        }
    }


    public getResourceInStorage(resourceName: string): Quantity | null {
        let res = this.Storage.filter((res: Quantity) => res.getResource().getName() == resourceName);
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