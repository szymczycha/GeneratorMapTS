import { MapSelection } from "./MapSelection";
import { Square } from "./Square";
export class SpriteSquare implements Square {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public arrayI: number;
    public arrayJ: number;
    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, arrayI: number, arrayJ: number, selection: MapSelection) {
        this.canvas = canvas;
        this.canvas.onclick = () => {
            //cale zaznaczenie ustaw na dany sprite
            selection.setSprites(this);
            deselectAll();
        };
        this.context = context;
        this.arrayI = arrayI;
        this.arrayJ = arrayJ;
    }
}