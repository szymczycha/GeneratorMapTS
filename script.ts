// let spritesContainer: HTMLCanvasElement = document.getElementById("sprites") as HTMLCanvasElement;
// let mapContainer: HTMLCanvasElement = document.getElementById("sprites") as HTMLCanvasElement;

// interface Square{
//     x: number
//     y: number
//     width: number
//     height: number
// }


// let image = new Image();
// image.src="sprites.png";
// image.onload = function(){
//     let spritesContext: CanvasRenderingContext2D = spritesContainer.getContext("2d") as CanvasRenderingContext2D;
//     spritesContainer.width = 400;
//     spritesContainer.height = 1200;
//     spritesContext.drawImage(image, 0, 0, 768, 960, 0, 0, 400, 600);    
//     spritesContext.drawImage(image, 768, 0, 768, 960, 0, 600, 400, 600);    
// }

interface Square{
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
}
class SpriteSquare implements Square{
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public arrayI: number;
    public arrayJ: number;
    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, arrayI: number, arrayJ: number){
        this.canvas = canvas;
        this.context = context;
        this.arrayI = arrayI;
        this.arrayJ = arrayJ;
    }
}
class MapSquare implements Square{
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public arrayI: number;
    public arrayJ: number;
    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, arrayI: number, arrayJ: number){
        this.canvas = canvas;
        this.context = context;
        this.arrayI = arrayI;
        this.arrayJ = arrayJ;
    }
}
class MapSelection{
    public sprites: MapSquare[][];
    public startSquare: MapSquare;
    public endSquare: MapSquare;
}
let spriteSquares: SpriteSquare[][] = [];
let mapSquares: MapSquare[][] = [];

let spritesContainer: HTMLDivElement = document.getElementById("sprites") as HTMLDivElement;
let mapContainer: HTMLDivElement = document.getElementById("map") as HTMLDivElement
let image = new Image();
image.src="sprites.png";
image.onload = function(){
    for(let i = 0; i<20; i++){
        let row: SpriteSquare[] = [];
        for(let j = 0; j<16; j++){
            let canvas = document.createElement("canvas") as HTMLCanvasElement;
            canvas.width = 25;
            canvas.height = 25;
            let context = canvas.getContext("2d") as CanvasRenderingContext2D;
            context.drawImage(image, 1+48*j, 1+48*i, 47, 47, 0, 0, 25, 25);
            spritesContainer.appendChild(canvas);
            let tile = new SpriteSquare(canvas, context, i, j);
            row.push(tile);
        }
        spriteSquares.push(row);
    }    
    for(let i = 0; i<20; i++){
        let row: SpriteSquare[] = [];
        for(let j = 0; j<16; j++){
            let canvas = document.createElement("canvas") as HTMLCanvasElement;
            canvas.width = 25;
            canvas.height = 25;
            let context = canvas.getContext("2d") as CanvasRenderingContext2D;
            context.drawImage(image, 769+48*j, 1+48*i, 47, 47, 0, 0, 25, 25);
            spritesContainer.appendChild(canvas);
            let tile = new SpriteSquare(canvas, context, i+20, j+16);
            row.push(tile);
        }
        spriteSquares.push(row);
    }    
    for(let i = 0; i<20; i++){
        let row: MapSquare[] = [];
        for(let j = 0; j<20; j++){
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