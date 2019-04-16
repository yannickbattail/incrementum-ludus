/// <reference path="IResource.ts" />
/// <reference path="IQuantity.ts" />

interface IPlayer {
    $type : string;
    // getters
    getName() : string;
    getStorage() : Array<IQuantity>;
    // storage management
    changeStorage(resourceQuantity: IQuantity) : void;
    decreaseStorage(resourceQuantity: IQuantity) : void;
    getResourceInStorage(resourceName: string): IQuantity | null ;
    hasResources(resourcesQuantity: Array<IQuantity>): boolean ;
}