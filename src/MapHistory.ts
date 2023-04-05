import { MapState } from "./MapState";
export class MapHistory{
    history: MapState[];
    currentIndex: number = 0;
    constructor(){
        this.currentIndex = -1;
        this.history = [];
    }
    getCurrent(): MapState{
        return this.history[this.currentIndex];
    }
    getNext(): MapState{
        console.log(this.history, this.currentIndex)
        if(this.currentIndex + 1 <= this.history.length - 1){
            this.currentIndex += 1;
        }
        return this.getCurrent();
    }
    pop(): MapState{
        if(this.currentIndex > 0){
            this.currentIndex -= 1;
        }
        return this.getCurrent();
    }
    add(state: MapState): void{
        this.currentIndex += 1;
        this.history.splice(this.currentIndex,this.history.length,state);
    }
}