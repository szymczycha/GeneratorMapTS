import { MapState } from "./MapState";
export class MapHistory{
    history: MapState[];
    pop(): MapState{
        return this.history.pop();
    }
    add(state: MapState): void{
        this.history.push(state);
    }
}