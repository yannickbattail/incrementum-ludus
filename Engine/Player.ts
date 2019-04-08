/// <reference path="Resource.ts" />
/// <reference path="ResourceQuantity.ts" />
/// <reference path="Producer.ts" />
/// <reference path="TimedProducer.ts" />
/// <reference path="ManualProducer.ts" />
/// <reference path="Trigger.ts" />
/// <reference path="Crafter.ts" />

class Player {
    $type : string = 'Player';
    Storage: Array<ResourceQuantity> = new Array<ResourceQuantity>();
    constructor(public Name: string) {
    }
    public static load(data : any) : Player {
        let curContext : any = window;
        let player : Player = new Player(data.Name);
        player.Storage = (data.Storage as Array<any>).map(p => curContext[p.$type].load(p));
        return player;
    }

    public changeStorage(resourceQuantity: ResourceQuantity) {
        let resQ = this.getResourceInStorage(resourceQuantity.Resource.Name);
        if (resQ == null) {
            this.Storage.push(new ResourceQuantity(resourceQuantity.Resource, resourceQuantity.Quantity));
        } else {
            resQ.Quantity += resourceQuantity.Quantity;
        }
    }
    public decreaseStorage(resourceQuantity: ResourceQuantity) {
        let resQ = this.getResourceInStorage(resourceQuantity.Resource.Name);
        if (resQ == null) {
            this.Storage.push(new ResourceQuantity(resourceQuantity.Resource, -1 * resourceQuantity.Quantity));
        } else {
            resQ.Quantity += -1 * resourceQuantity.Quantity;
        }
    }


    public getResourceInStorage(resourceName: string): ResourceQuantity | null {
        let res = this.Storage.filter((res: ResourceQuantity) => res.Resource.Name == resourceName);
        if (res.length) {
            return res[0];
        }
        return null;
    }
    public hasResources(resourcesQuantity: ResourceQuantity[]): boolean {
        let hasRes = true;
        resourcesQuantity.forEach(
            resQ => {
                let playerRes = this.getResourceInStorage(resQ.Resource.Name);
                if (playerRes == null || playerRes.Quantity < resQ.Quantity) {
                    hasRes = false;
                }
            }
        );
        return hasRes;
    }
}