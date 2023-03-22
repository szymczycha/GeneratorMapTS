import { Square } from "./Square";
// import { MapSquare } 
let mapSizeLeftRight = 45;
let mapSizeTopBottom = 40;

let spriteSquares: SpriteSquare[][] = [];
let mapSquares: MapSquare[][] = [];
let firstSquare: MapSquare;
let secondSquare: MapSquare;
let selection: MapSelection;
let spritesContainer: HTMLDivElement = document.getElementById("sprites") as HTMLDivElement;
let mapContainer: HTMLDivElement = document.getElementById("map") as HTMLDivElement
let image = new Image();
image.src = "sprites.png";


function deselectAll(){
    mapSquares.forEach((row: MapSquare[]) => {
        row.forEach((element: MapSquare) => {
            element.deselect();
        });
    });
}

class MapSquare implements Square {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public arrayI: number;
    public arrayJ: number;
    public selected: boolean;
    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, arrayI: number, arrayJ: number) {
        this.canvas = canvas;
        this.selected = false;
        this.canvas.addEventListener("mousedown", (event: MouseEvent) => {
            if(selection && !event.ctrlKey){
                deselectAll();
            }
            firstSquare = this;
        })
        this.canvas.addEventListener("mouseup", (event: MouseEvent) => {
            secondSquare = this;
            if(event.ctrlKey){
                selection.addSprites(firstSquare, secondSquare);
            }else{
                selection = new MapSelection(firstSquare, secondSquare);
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
class MapSelection {
    selectedMapSquares: MapSquare[];
    topLeftMapSquare: MapSquare;
    bottomRightMapSquare: MapSquare;
    constructor(firstSquare: MapSquare, secondSquare: MapSquare) {
        this.selectedMapSquares = [];
        let topLeftI: number = Math.min(firstSquare.arrayI, secondSquare.arrayI);
        let topLeftJ: number = Math.min(firstSquare.arrayJ, secondSquare.arrayJ);
        let bottomRightI: number = Math.max(firstSquare.arrayI, secondSquare.arrayI);
        let bottomRightJ: number = Math.max(firstSquare.arrayJ, secondSquare.arrayJ);
        this.topLeftMapSquare = mapSquares[topLeftI][topLeftJ];
        this.bottomRightMapSquare = mapSquares[bottomRightI][bottomRightJ];
        console.log(topLeftI, topLeftJ, bottomRightI, bottomRightJ);
        for (let j = topLeftJ; j <= bottomRightJ; j++) {
            for (let i = topLeftI; i <= bottomRightI; i++) {
                this.selectedMapSquares.push(mapSquares[j][i])
                mapSquares[j][i].select();
            }
        }
    }
    addSprites(firstSquare: MapSquare, secondSquare: MapSquare){
        let topLeftI: number = Math.min(firstSquare.arrayI, secondSquare.arrayI);
        let topLeftJ: number = Math.min(firstSquare.arrayJ, secondSquare.arrayJ);
        let bottomRightI: number = Math.max(firstSquare.arrayI, secondSquare.arrayI);
        let bottomRightJ: number = Math.max(firstSquare.arrayJ, secondSquare.arrayJ);
        this.topLeftMapSquare = mapSquares[topLeftI][topLeftJ];
        this.bottomRightMapSquare = mapSquares[bottomRightI][bottomRightJ];
        console.log(topLeftI, topLeftJ, bottomRightI, bottomRightJ);
        for (let j = topLeftJ; j <= bottomRightJ; j++) {
            for (let i = topLeftI; i <= bottomRightI; i++) {
                this.selectedMapSquares.push(mapSquares[j][i])
                mapSquares[j][i].select();
            }
        }
    }
    setSprites(sprite: SpriteSquare){
        this.selectedMapSquares.forEach((square: MapSquare) => {
            square.setSprite(sprite);
        });
    }
}
class SpriteSquare implements Square {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public arrayI: number;
    public arrayJ: number;
    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, arrayI: number, arrayJ: number) {
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

image.onload = function () {
    for (let i = 0; i < 20; i++) {
        let row: SpriteSquare[] = [];
        for (let j = 0; j < 16; j++) {
            let canvas = document.createElement("canvas") as HTMLCanvasElement;
            canvas.width = 25;
            canvas.height = 25;
            let context = canvas.getContext("2d") as CanvasRenderingContext2D;
            context.drawImage(image, 1 + 48 * j, 1 + 48 * i, 47, 47, 0, 0, 25, 25);
            spritesContainer.appendChild(canvas);
            let tile = new SpriteSquare(canvas, context, i, j);
            row.push(tile);
        }
        spriteSquares.push(row);
    }
    for (let i = 0; i < 20; i++) {
        let row: SpriteSquare[] = [];
        for (let j = 0; j < 16; j++) {
            let canvas = document.createElement("canvas") as HTMLCanvasElement;
            canvas.width = 25;
            canvas.height = 25;
            let context = canvas.getContext("2d") as CanvasRenderingContext2D;
            context.drawImage(image, 769 + 48 * j, 1 + 48 * i, 47, 47, 0, 0, 25, 25);
            spritesContainer.appendChild(canvas);
            let tile = new SpriteSquare(canvas, context, i + 20, j + 16);
            row.push(tile);
        }
        spriteSquares.push(row);
    }
    for (let j = 0; j < mapSizeTopBottom; j++) {
        let row: MapSquare[] = [];
        for (let i = 0; i < mapSizeLeftRight; i++) {
            let canvas = document.createElement("canvas") as HTMLCanvasElement;
            canvas.width = 25;
            canvas.height = 25;
            let context = canvas.getContext("2d") as CanvasRenderingContext2D;
            mapContainer.appendChild(canvas);
            let tile = new MapSquare(canvas, context, i, j);
            row.push(tile);
        }
        mapSquares.push(row);
    }
}