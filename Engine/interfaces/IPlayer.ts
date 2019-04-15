/// <reference path="IResource.ts" />
/// <reference path="IResourceAmount.ts" />

interface IPlayer {
    $type : string;
    // getters
    getName() : string;
    getStorage() : Array<IResourceAmount>;
    // storage management
    changeStorage(resourceQuantity: IResourceAmount) : void;
    decreaseStorage(resourceQuantity: IResourceAmount) : void;
    getResourceInStorage(resourceName: string): IResourceAmount | null ;
    hasResources(resourcesQuantity: Array<IResourceAmount>): boolean ;
}