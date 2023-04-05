import { MapSquare } from "./MapSquare";
import {SpriteSquare } from "./SpriteSquare";
import { MapState } from "./MapState";
import { MapHistory } from "./MapHistory";
import { collapseTextChangeRangesAcrossMultipleVersions } from "../node_modules/typescript/lib/typescript";
export class MapSelection {
    selectedMapSquares: MapSquare[];
    topLeftMapSquare: MapSquare;
    bottomRightMapSquare: MapSquare;
    firstSquare: MapSquare;
    stateHistory: MapHistory;
    constructor(stateHistory: MapHistory) {
        this.stateHistory = stateHistory;
        this.selectedMapSquares = [];
        // this.selectedMapSquares = [];
        // let topLeftI: number = Math.min(firstSquare.arrayI, secondSquare.arrayI);
        // let topLeftJ: number = Math.min(firstSquare.arrayJ, secondSquare.arrayJ);
        // let bottomRightI: number = Math.max(firstSquare.arrayI, secondSquare.arrayI);
        // let bottomRightJ: number = Math.max(firstSquare.arrayJ, secondSquare.arrayJ);
        // this.topLeftMapSquare = state.mapSquares[topLeftI][topLeftJ];
        // this.bottomRightMapSquare = state.mapSquares[bottomRightI][bottomRightJ];
        // console.log(topLeftI, topLeftJ, bottomRightI, bottomRightJ);
        // for (let j = topLeftJ; j <= bottomRightJ; j++) {
        //     for (let i = topLeftI; i <= bottomRightI; i++) {
        //         this.selectedMapSquares.push(state.mapSquares[j][i])
        //         state.mapSquares[j][i].select();
        //     }
        // }
    }
    isEmpty(){
        return this.selectedMapSquares.length == 0;
    }
    empty(){
        this.selectedMapSquares = [];
        this.stateHistory.getCurrent().mapSquares.forEach(row => {
            row.forEach(mapSquare => {
                mapSquare.deselect();
            });
        });
    }
    toggleSprites(firstSquare: MapSquare, secondSquare: MapSquare){
        console.log(this)
        let state = this.stateHistory.getCurrent();
        let topLeftI: number = Math.min(firstSquare.arrayI, secondSquare.arrayI);
        let topLeftJ: number = Math.min(firstSquare.arrayJ, secondSquare.arrayJ);
        let bottomRightI: number = Math.max(firstSquare.arrayI, secondSquare.arrayI);
        let bottomRightJ: number = Math.max(firstSquare.arrayJ, secondSquare.arrayJ);
        this.topLeftMapSquare = state.mapSquares[topLeftI][topLeftJ];
        this.bottomRightMapSquare = state.mapSquares[bottomRightI][bottomRightJ];

        for (let j = topLeftJ; j <= bottomRightJ; j++) {
            for (let i = topLeftI; i <= bottomRightI; i++) {
                //jesli juz jest w selected map squares to zamiast tego usun
                if(this.selectedMapSquares.includes(state.mapSquares[j][i])){
                    this.selectedMapSquares.splice(
                        this.selectedMapSquares.indexOf(state.mapSquares[j][i]), 1);
                }else{
                    this.selectedMapSquares.push(state.mapSquares[j][i])
                }
                state.mapSquares[j][i].toggle();
            }
        }
        console.log(this)
    }
    setFirstSquare(firstSquare: MapSquare){
        this.firstSquare = firstSquare;
        console.log(firstSquare);
    }
    setSprites(sprite: SpriteSquare){
        this.selectedMapSquares.forEach((square: MapSquare) => {
            square.setSprite(sprite);
        });
    }
    deselectAll(){
        this.selectedMapSquares.forEach( selectedSquare => {
            selectedSquare.deselect()
        })
        this.empty();
    }
}