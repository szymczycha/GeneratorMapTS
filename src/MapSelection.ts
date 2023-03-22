import { MapSquare } from "./MapSquare";
import {SpriteSquare } from "./SpriteSquare";
import { MapState } from "./MapState";
export class MapSelection {
    selectedMapSquares: MapSquare[];
    topLeftMapSquare: MapSquare;
    bottomRightMapSquare: MapSquare;
    firstSquare: MapSquare;
    state: MapState;
    constructor(state: MapState) {
        this.state = state;
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
    empty(){
        this.selectedMapSquares = [];
    }
    addSprites(firstSquare: MapSquare, secondSquare: MapSquare){
        let topLeftI: number = Math.min(firstSquare.arrayI, secondSquare.arrayI);
        let topLeftJ: number = Math.min(firstSquare.arrayJ, secondSquare.arrayJ);
        let bottomRightI: number = Math.max(firstSquare.arrayI, secondSquare.arrayI);
        let bottomRightJ: number = Math.max(firstSquare.arrayJ, secondSquare.arrayJ);
        this.topLeftMapSquare = this.state.mapSquares[topLeftI][topLeftJ];
        this.bottomRightMapSquare = this.state.mapSquares[bottomRightI][bottomRightJ];
        console.log(topLeftI, topLeftJ, bottomRightI, bottomRightJ);
        for (let j = topLeftJ; j <= bottomRightJ; j++) {
            for (let i = topLeftI; i <= bottomRightI; i++) {
                this.selectedMapSquares.push(this.state.mapSquares[j][i])
                this.state.mapSquares[j][i].select();
            }
        }
    }
    setSprites(sprite: SpriteSquare){
        this.selectedMapSquares.forEach((square: MapSquare) => {
            square.setSprite(sprite);
        });
    }
}