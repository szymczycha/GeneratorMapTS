import { MapState } from "./MapState";
export class MapHistory{
    history: MapState[];
    constructor(){
        this.history = [];
    }
    getCurrent(): MapState{
        return this.history[this.history.length-1];
    }
    pop(): MapState{
        return this.history.pop();
    }
    add(state: MapState): void{
        this.history.push(state);
    }
}