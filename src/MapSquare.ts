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
    public imageData: ImageData;
    constructor(canvas: HTMLCanvasElement = null,
        context: CanvasRenderingContext2D = null,
        arrayI: number = null,
        arrayJ: number = null,
        selection: MapSelection = null, 
        copySquare: MapSquare = null) {
        if(copySquare != null){ //jezeli kopiuje
            this.canvas = copySquare.canvas;
            this.selected = copySquare.selected;
            this.selection = copySquare.selection;
            this.context = copySquare.context
            // this.context.putImageData(copySquare.context.getImageData(0,0,25,25), 0,0);
            this.arrayI = copySquare.arrayI;
            this.arrayJ = copySquare.arrayJ;
            this.imageData = this.canvas.getContext("2d").getImageData(0,0,25,25);
        }else{
            this.canvas = canvas;
            this.selected = false;
            this.selection = selection
            this.context = context;
            this.arrayI = arrayI;
            this.arrayJ = arrayJ;
            this.imageData = this.canvas.getContext("2d").getImageData(0,0,25,25);
        }
    }
    setSprite(sprite: SpriteSquare){
        this.context.putImageData(sprite.context.getImageData(0,0,25,25), 0, 0);
    }
    setImageData(imageData: ImageData){
        this.context.putImageData(imageData, 0, 0);
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