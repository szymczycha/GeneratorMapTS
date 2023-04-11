import { Square } from "./Square";
import { SpriteSquare } from "./SpriteSquare";
import { MapSquare } from "./MapSquare";
import { MapSelection } from "./MapSelection";
import { MapState } from "./MapState";
import { MapHistory } from "./MapHistory";
import { SelectionDiv } from "./SelectionDiv";

// nie jestem z tego wszystkiego dumny

let mapSizeLeftRight = 45;
let mapSizeTopBottom = 40;

let spriteSquares: SpriteSquare[][] = [];
let mapSquares: MapSquare[][] = [];
let firstSquare: MapSquare;
let secondSquare: MapSquare;
let mapState: MapState = new MapState();
let mapHistory: MapHistory = new MapHistory();
mapHistory.add(mapState);
let selection: MapSelection = new MapSelection(mapHistory);
let spritesContainer: HTMLDivElement = document.getElementById("sprites") as HTMLDivElement;
let mapContainer: HTMLDivElement = document.getElementById("map") as HTMLDivElement
let image = new Image();
let selectionDiv = new SelectionDiv();
image.src = "sprites.png";
let deleteCanvas = document.createElement("canvas") as HTMLCanvasElement;
let deleteSpriteSquare = new SpriteSquare(
    deleteCanvas,
    deleteCanvas.getContext("2d"),
    -1,
    -1,
    selection,
    mapHistory
);
function undo() {
    console.log("undo");
    let undoMapState: MapState = mapHistory.pop();
    mapState.load(undoMapState);
}
function deleteSquares() {

    if (!selection.isEmpty()) { // lol 
        selection.setSprites(deleteSpriteSquare);
        selection.deselectAll();
        mapHistory.add(new MapState(mapHistory.getCurrent()));
        if (selection.isAutomat()) {
            selection.doAutomat();
        }
    }
}
function redo() {
    console.log("redo");
    let redoMapState: MapState = mapHistory.getNext();
    mapState.load(redoMapState);
}
function copy() {
    console.log("copy");
    selection.copy();

}
function paste() {
    selection.paste();
}
console.log("sdsdfasdfa")

image.onload = function () {
    document.addEventListener("keydown", ev => {
        if (ev.key === 'z' && (ev.ctrlKey || ev.metaKey)) {
            undo();
        } else if (ev.key === 'y' && (ev.ctrlKey || ev.metaKey)) {
            redo();
        } else if (ev.key === 'Delete') {
            deleteSquares();
        } else if (ev.key === 'c' && (ev.ctrlKey || ev.metaKey)) {
            copy();
        } else if (ev.key === 'v' && (ev.ctrlKey || ev.metaKey)) {
            paste();
        }
    })
    document.addEventListener("mousedown", (ev: MouseEvent) => {
        selectionDiv.startSelect(ev.pageX, ev.pageY);
    })
    document.addEventListener("mousemove", (ev: MouseEvent) => {
        selectionDiv.moveTo(ev.pageX, ev.pageY);
    })
    document.addEventListener("mouseup", (ev: MouseEvent) => {
        selectionDiv.endSelect();
    })
    for (let i = 0; i < 20; i++) {
        let row: SpriteSquare[] = [];
        for (let j = 0; j < 16; j++) {
            let canvas = document.createElement("canvas") as HTMLCanvasElement;
            canvas.width = 25;
            canvas.height = 25;
            let context = canvas.getContext("2d") as CanvasRenderingContext2D;
            context.drawImage(image, 1 + 48 * j, 1 + 48 * i, 47, 47, 0, 0, 25, 25);
            spritesContainer.appendChild(canvas);
            let tile = new SpriteSquare(canvas, context, i, j, selection, mapHistory);
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
            let tile = new SpriteSquare(canvas, context, i + 20, j + 16, selection, mapHistory);
            row.push(tile);
        }
        spriteSquares.push(row);
    }
    for (let j = 0; j < mapSizeTopBottom; j++) {
        let row: MapSquare[] = [];
        for (let i = 0; i < mapSizeLeftRight; i++) {
            let canvas = document.createElement("canvas") as HTMLCanvasElement;
            canvas.setAttribute("willReadFrequently", "true");

            canvas.addEventListener("mousedown", (event: MouseEvent) => {
                let mapSquare = mapHistory.getCurrent().mapSquares[j][i];
                if (!event.ctrlKey) {
                    mapSquare.selection.deselectAll();
                }
                mapSquare.selection.setFirstSquare(mapSquare);
            })
            canvas.addEventListener("mouseup", (event: MouseEvent) => {
                let mapSquare = mapHistory.getCurrent().mapSquares[j][i];
                let secondSquare = mapSquare;
                if (!event.ctrlKey) {
                    mapSquare.selection.empty();
                }
                mapSquare.selection.toggleSprites(mapSquare.selection.firstSquare, secondSquare);
            })
            canvas.width = 25;
            canvas.height = 25;
            let context = canvas.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;
            mapContainer.appendChild(canvas);
            console.log(selection)
            let tile = new MapSquare(canvas, context, i, j, selection);
            row.push(tile);
        }
        mapState.mapSquares.push(row);
    }
}