import { MapState } from "./MapState";
export class MapHistory {
    history: MapState[];
    currentIndex: number = 0;
    constructor() {
        this.currentIndex = -1;
        this.history = [];
    }
    /**
     * 
     * @returns aktualny stan mapy
     */
    getCurrent(): MapState {
        return this.history[this.currentIndex];
    }
    /**
     * tzw "redo" 
     * @returns zwraca aktualny stan mapy po przesunięciu
     */
    getNext(): MapState {
        console.log(this.history, this.currentIndex)
        if (this.currentIndex + 1 <= this.history.length - 1) {
            this.currentIndex += 1;
        }
        return this.getCurrent();
    }
    /**
     * tzw "undo"
     * @returns zwraca aktualny stan mapy po przesunięciu
     */
    pop(): MapState {
        if (this.currentIndex > 0) {
            this.currentIndex -= 1;
        }
        return this.getCurrent();
    }
    /**
     * dodaje nowy stan mapy do historii
     * @returns void
     */
    add(state: MapState): void {
        this.currentIndex += 1;
        this.history.splice(this.currentIndex, this.history.length, state);
    }
}