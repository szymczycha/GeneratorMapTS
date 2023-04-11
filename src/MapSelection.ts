import { MapSquare } from "./MapSquare";
import { SpriteSquare } from "./SpriteSquare";
import { MapState } from "./MapState";
import { MapHistory } from "./MapHistory";
import { collapseTextChangeRangesAcrossMultipleVersions } from "../node_modules/typescript/lib/typescript";
export class MapSelection {
    selectedMapSquares: MapSquare[];
    copiedSquares: MapSquare[];
    topLeftMapSquare: MapSquare;
    bottomRightMapSquare: MapSquare;
    firstSquare: MapSquare;
    secondSquare: MapSquare;
    stateHistory: MapHistory;
    isCopying: boolean;
    constructor(stateHistory: MapHistory) {
        this.stateHistory = stateHistory;
        this.selectedMapSquares = [];
        this.isCopying = false;
        this.copiedSquares = [];
    }
    isEmpty() {
        return this.selectedMapSquares.length == 0;
    }
    empty() {
        this.selectedMapSquares = [];
        this.stateHistory.getCurrent().mapSquares.forEach(row => {
            row.forEach(mapSquare => {
                mapSquare.deselect();
            });
        });
    }
    doAutomat() {
        console.log("automat");
        console.log(this.secondSquare);
        let state = this.stateHistory.getCurrent();
        let nextI = this.secondSquare.arrayI + 1;
        let nextJ = this.secondSquare.arrayJ;
        if (nextI > state.mapSquares[0].length - 1) { // jesli wychodzi w prawo poza mape 
            nextI = 0;
            nextJ += 1;
            if (nextJ > state.mapSquares.length - 1) {
                nextJ = 0;
            }
        }
        let nextSquare: MapSquare = state.mapSquares[nextJ][nextI];
        console.log(nextI, nextJ, nextSquare.arrayI, nextSquare.arrayJ)
        this.toggleSprites(nextSquare, nextSquare);
    }
    isAutomat() {
        return (document.getElementById("automat") as HTMLInputElement).checked == true;
    }
    copy() {
        this.isCopying = true;
        this.copiedSquares = this.selectedMapSquares;
    }
    paste() {
        if (!this.isEmpty()) {
            let firstCopiedSquare = this.copiedSquares[0];
            let toSquare = this.selectedMapSquares[0];
            console.log(firstCopiedSquare);
            console.log(toSquare);

            let iDiff = toSquare.arrayI - firstCopiedSquare.arrayI;
            let jDiff = toSquare.arrayJ - firstCopiedSquare.arrayJ;

            this.copiedSquares.forEach((mapSquare: MapSquare) => {
                let newI = mapSquare.arrayI + iDiff;
                let newJ = mapSquare.arrayJ + jDiff;
                if (newI < MapSquare.iSize && newJ < MapSquare.jSize) {
                    this.stateHistory.getCurrent().mapSquares[newJ][newI].setImageData(mapSquare.imageData);
                }
            });
            this.stateHistory.add(new MapState(this.stateHistory.getCurrent()));
            this.deselectAll();
        }
        this.isCopying = false;
    }
    toggleSprites(firstSquare: MapSquare, secondSquare: MapSquare) {
        console.log("toggleSprites");
        this.secondSquare = secondSquare;

        console.log(this)
        let state = this.stateHistory.getCurrent();
        console.log(firstSquare.arrayI, secondSquare.arrayI);
        let topLeftI: number = Math.min(firstSquare.arrayI, secondSquare.arrayI);
        console.log(topLeftI);

        let topLeftJ: number = Math.min(firstSquare.arrayJ, secondSquare.arrayJ);
        let bottomRightI: number = Math.max(firstSquare.arrayI, secondSquare.arrayI);
        let bottomRightJ: number = Math.max(firstSquare.arrayJ, secondSquare.arrayJ);
        this.topLeftMapSquare = state.mapSquares[topLeftJ][topLeftI];
        this.bottomRightMapSquare = state.mapSquares[bottomRightJ][bottomRightI];

        for (let j = topLeftJ; j <= bottomRightJ; j++) {
            for (let i = topLeftI; i <= bottomRightI; i++) {
                //jesli juz jest w selected map squares to zamiast tego usun
                if (this.selectedMapSquares.includes(state.mapSquares[j][i])) {
                    this.selectedMapSquares.splice(
                        this.selectedMapSquares.indexOf(state.mapSquares[j][i]), 1);
                } else {
                    this.selectedMapSquares.push(state.mapSquares[j][i])
                }
                state.mapSquares[j][i].toggle();
            }
        }
        console.log(this)
    }
    setFirstSquare(firstSquare: MapSquare) {
        this.firstSquare = firstSquare;
    }
    setSprites(sprite: SpriteSquare) {
        this.selectedMapSquares.forEach((square: MapSquare) => {
            square.setSprite(sprite);
        });
    }
    deselectAll() {
        this.selectedMapSquares.forEach(selectedSquare => {
            selectedSquare.deselect()
        })
        this.empty();
    }
}