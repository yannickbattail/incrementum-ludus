/// <reference path="IResource.ts" />
/// <reference path="IResourceAmount.ts" />

interface IPlayer {
    changeStorage(resourceQuantity: IResourceAmount) : void;
    decreaseStorage(resourceQuantity: IResourceAmount) : void;
    getResourceInStorage(resourceName: string): IResourceAmount | null ;
    hasResources(resourcesQuantity: Array<IResourceAmount>): boolean ;
}