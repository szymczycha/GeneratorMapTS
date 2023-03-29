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
        state.mapSquares.forEach(row => {
            row.forEach(element => {
                element.context.putImageData(element.context.getImageData(0,0,25,25),0,0)
            });
        });
    }
}