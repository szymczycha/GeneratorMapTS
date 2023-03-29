import { MapHistory } from "./MapHistory";
import { MapSelection } from "./MapSelection";
import { MapState } from "./MapState";
import { Square } from "./Square";
export class SpriteSquare implements Square {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public arrayI: number;
    public arrayJ: number;
    public selection: MapSelection
    public mapHistory: MapHistory
    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, arrayI: number, arrayJ: number, selection: MapSelection, mapHistory: MapHistory) {
        this.canvas = canvas;
        this.selection = selection
        this.mapHistory = mapHistory
        this.canvas.onclick = () => {
            //cale zaznaczenie ustaw na dany sprite
            selection.setSprites(this);
            selection.deselectAll();
            mapHistory.add(new MapState(mapHistory.getCurrent()));
        };
        this.context = context;
        this.arrayI = arrayI;
        this.arrayJ = arrayJ;
    }
}