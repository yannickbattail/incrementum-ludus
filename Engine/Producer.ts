/// <reference path="Resource.ts" />
/// <reference path="ResourceQuantity.ts" />
/// <reference path="TimedProducer.ts" />
/// <reference path="ManualProducer.ts" />
/// <reference path="Crafter.ts" />

abstract class Producer {
    $type : string = 'Producer';
    constructor(public Name: string, public ResourceQuantity: ResourceQuantity = EMPTY_RQ) {

    }
}