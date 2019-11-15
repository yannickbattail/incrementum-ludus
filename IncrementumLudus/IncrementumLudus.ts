/// <reference path="interfaces/IResource.ts" />
/// <reference path="interfaces/IQuantity.ts" />
/// <reference path="interfaces/IProducer.ts" />
/// <reference path="interfaces/ITrigger.ts" />
/// <reference path="interfaces/ICrafter.ts" />
/// <reference path="interfaces/IPlayer.ts" />

enum IncrementumLudusStatus {
    NOT_YET_STARTED,
    IN_PROGRESS,
    LOOSE,
    WIN
}

class IncrementumLudus {
    $type : string = 'IncrementumLudus';
    tickInterval : number = 100;
    status : IncrementumLudusStatus = IncrementumLudusStatus.NOT_YET_STARTED;
    player : IPlayer = new Player("");
    producers : Array<IProducer> = [];
    triggers : Array<ITrigger> = [];
    crafters : Array<ICrafter> = [];
    fastMode : number = 0;
    private intervalId : number = 0;
    private saveCallback: (engine: IncrementumLudus) => void = function () {};
    public static load(data : any) : IncrementumLudus {
        let curContext : any = window;
        let newObj : IncrementumLudus = new IncrementumLudus();
        newObj.tickInterval = data.tickInterval;
        newObj.status = data.status;
        newObj.player = curContext[data.player.$type].load(data.player);
        newObj.producers = (data.producers as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.triggers = (data.triggers as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.crafters = (data.crafters as Array<any>).map(p => curContext[p.$type].load(p));
        newObj.fastMode = data.fastMode;
        return newObj;
    }

    run(tickInterval : number, saveCallback: (engine: IncrementumLudus) => void) {
        this.tickInterval = tickInterval;
        this.saveCallback = saveCallback;
        if (this.status == IncrementumLudusStatus.NOT_YET_STARTED) {
            this.status = IncrementumLudusStatus.IN_PROGRESS;
        }
        this.intervalId = window.setInterval(() => this.onTick(), this.tickInterval);
    }
    stop() {
        window.clearInterval(this.intervalId);
    }
    private onTick() {
        if (this.status == IncrementumLudusStatus.LOOSE || this.status == IncrementumLudusStatus.WIN) {
            console.log("Status is "+this.status+", STOP");
            this.stop();
        }
        this.producers.forEach(
            producer => this.autoCollectProducer(producer)
        );
        this.triggers.forEach(
            trigger => this.checkTrigger(trigger)
        );
        this.crafters.forEach(
            crafter => this.checkCrafter(crafter)
        );
        this.saveCallback(this);
    }
    private autoCollectProducer(producer: IProducer) {
        if (producer.isAuto()) {
            let interval : number = 6666666;
            let i = producer.getInterval();
            if (i != null) {
                interval = i;
            }
            interval = this.fastMode ? this.fastMode : interval;
            let startTime = producer.getStartTime();
            if (startTime != null && startTime.getTime() + interval <= new Date().getTime()) {
                producer.initStartTime();
                producer.getResourcesQuantity().forEach(
                    res => this.player.increaseStorage(res)
                );
            }
        }
    }
    public collectManualProducer(producer: IProducer) {
        if (this.status == IncrementumLudusStatus.IN_PROGRESS) {
            producer.getResourcesQuantity().forEach(
                res => this.player.increaseStorage(res)
            );
        }
    }
    public collectProducer(producerName: string) {
        let producer = this.getProducerByName(producerName);
        if (producer != null) {
            if (!producer.isAuto()) {
                this.collectManualProducer(producer);
            }
        }
    }
    public getProducerByName(producerName : string) : IProducer | null {
        let producers : IProducer[] =  this.producers.filter(
            src => src.getName() == producerName
        );
        if (producers.length == 0) {
            return null;
        }
        return producers[0];
    }

    private checkTrigger(trigger: ITrigger) {
        if (this.player.hasResources(trigger.getResourcesTrigger())) {
            trigger.getSpawnProducers().forEach(
                pawnProducer => this.producers.push(pawnProducer)
            );
            trigger.getSpawnResources().forEach(
                res => this.player.increaseStorage(res)
            );
            trigger.getSpawnCrafters().forEach(
                crafter => this.crafters.push(crafter)
            );
            trigger.getSpawnNewTriggers().forEach(
                newTrigger => this.triggers.push(newTrigger)
            );
            if (trigger.getCallback() != "") {
                //use window.setTimeout() to start the callback in an other thread
                window.setTimeout(trigger.getCallback(), 1);
            }
            let newStatus = trigger.getChangeEngineStatus();
            if (newStatus != null) {
                this.status = newStatus;
            }
            // remove the trigger
            this.triggers.splice(this.triggers.indexOf(trigger), 1);
        }
    }

    private checkCrafter(crafter: ICrafter) {
        this.checkFinishedCrafting(crafter);
        this.checkStartAutoCrafting(crafter);
    }
    private checkFinishedCrafting(crafter: ICrafter) {
        let duration = this.fastMode ? this.fastMode : crafter.getDuration();
        let startTime = crafter.getStartTime();
        if (startTime != null && (startTime.getTime() + duration <= new Date().getTime())) {
            crafter.resetStartTime();
            crafter.getCraftedResources().forEach(
                resourceQty =>  this.player.increaseStorage(resourceQty)
            );
        }
    }
    private checkStartAutoCrafting(crafter: ICrafter) {
        if (crafter.isAuto() && crafter.getStartTime() == null && this.player.hasResources(crafter.getCost())) {
            crafter.initStartTime();
            crafter.getCost().forEach(
                resourceQty =>  this.player.decreaseStorage(resourceQty)
            );
        }
    }
    public startCrafting(crafterName: string) {
        let crafter = this.getCrafterByName(crafterName);
        if (crafter != null) {
            this.startManualCrafting(crafter);
        }
    }
    public startManualCrafting(crafter: ICrafter) : boolean {
        if (this.status == IncrementumLudusStatus.IN_PROGRESS) {
            if (!crafter.isAuto() && !crafter.isCrafting() && this.player.hasResources(crafter.getCost())) {
                crafter.initStartTime();
                crafter.getCost().forEach(
                    resourceQty =>  this.player.decreaseStorage(resourceQty)
                );
                return true;
            }
        }
        return false;
    }

    public switchAutoCrafting(crafterName: string) {
        if (this.status == IncrementumLudusStatus.IN_PROGRESS) {
            let crafter = this.getCrafterByName(crafterName);
            if (crafter != null) {
                crafter.setAuto(!crafter.isAuto());
            }
        }
    }

    public getCrafterByName(crafterName : string) : ICrafter | null {
        let crafters: ICrafter[] =  this.crafters.filter(
            src => src.getName() == crafterName
        );
        if (crafters.length == 0) {
            return null;
        }
        return crafters[0];
    }
}
