import {MapSquare} from "./MapSquare";
export class MapState{
    mapSquares: MapSquare[][];
    constructor(copyState: MapState = null){
        this.mapSquares = [];
        if(copyState != null){
            copyState.mapSquares.forEach(row => {
                let newRow: Array<MapSquare> = []
                row.forEach(element => {
                    let newElement = new MapSquare(null, null, null, null, null, element);
                    newRow.push(newElement);
                })
                this.mapSquares.push(newRow);
            });
        }
    }
    load(state: MapState){
        state.mapSquares.forEach((row, i) => {
            row.forEach((element, j) => {
                this.mapSquares[i][j].setImageData(element.imageData);
            });
        });
    }
}