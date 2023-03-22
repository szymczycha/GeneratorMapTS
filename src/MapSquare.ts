import { Square } from "./Square";
import { SpriteSquare } from "./SpriteSquare";
import {MapSelection} from "./MapSelection"
export class MapSquare implements Square {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public arrayI: number;
    public arrayJ: number;
    public selected: boolean;
    public selection: MapSelection;
    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, arrayI: number, arrayJ: number, selection: MapSelection) {
        this.canvas = canvas;
        this.selected = false;
        this.selection = selection
        this.canvas.addEventListener("mousedown", (event: MouseEvent) => {
            if(selection && !event.ctrlKey){
                deselectAll();
            }
            selection.firstSquare = this;
        })
        this.canvas.addEventListener("mouseup", (event: MouseEvent) => {
            secondSquare = this;
            if(event.ctrlKey){
                selection.addSprites(selection.firstSquare, secondSquare);
            }else{
                selection.empty();
                selection.addSprites(selection.firstSquare, secondSquare);
                // selection = new MapSelection(selection.firstSquare, secondSquare);
            }
        })
        this.context = context;
        this.arrayI = arrayI;
        this.arrayJ = arrayJ;
    }
    setSprite(sprite: SpriteSquare){
        this.context.putImageData(sprite.context.getImageData(0,0,25,25), 0, 0);
    }
    select() {
        this.selected = true;
        this.canvas.classList.add("selected");
    }
    deselect(){
        this.selected = false;
        this.canvas.classList.remove("selected");
    }
    toggle(){
        this.selected = !this.selected;
        this.canvas.classList.toggle("selected");
    }
}