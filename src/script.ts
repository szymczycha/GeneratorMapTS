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
function cut() {
    copy();
    deleteSquares();
}
function save(filename: string, type: string) {
    let imgDataArray = [] as Array<Array<Uint8ClampedArray>>
    let mapItems = mapHistory.getCurrent().mapSquares;
    mapItems.forEach(e => {
        let array = [] as Array<Uint8ClampedArray>
        for (let i = 0; i < 30; i++) {
            if (e[i].imageData == null) array.push(null)
            else array.push(e[i].imageData.data)
        }
        imgDataArray.push(array)
    })
    console.log(imgDataArray);
    let data = JSON.stringify(imgDataArray)
    const blob = new Blob([data], { type: type });
    console.log(blob);

    const url = URL.createObjectURL(blob);
    console.log(url);

    const link = document.createElement("a");
    link.innerText = "save";
    link.download = filename;

    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function () {
        link.href = reader.result as string;
        link.click();
    };
}
console.log("sdsdfasdfa")

image.onload = function () {
    document.getElementById("file").addEventListener("change", async (ev) => {
        console.log("load")
        let fileList: FileList | null = (ev.target as HTMLInputElement).files;
        let file: File | null = fileList?.item(0);
        let text = await file.text();
        let json: Array<Array<Uint8ClampedArray>> = JSON.parse(text) as Array<Array<Uint8ClampedArray>>;
        let state = new MapState(mapHistory.getCurrent());
        json.forEach((e, i) => {
            e.forEach((f, j) => {
                let mapItem = state.mapSquares[i][j];
                if (f != null) {
                    let idata = mapItem.context.createImageData(25, 25);
                    for (var k = 0; k < idata.data.length; k++) {
                        idata.data[k] = f[k];
                    }
                    mapItem.imageData = idata
                    // mapItem.context.putImageData(idata, 0, 0)
                }
            })
        })
        mapHistory.getCurrent().load(state);
    })
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
        } else if (ev.key === 'x' && (ev.ctrlKey || ev.metaKey)) {
            cut();
        } else if (ev.key === 'q' && (ev.ctrlKey || ev.metaKey)) {
            save("data.json", "application/json");
        } else if (ev.key === 'l' && (ev.ctrlKey || ev.metaKey)) {
            cut();
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
            let tile = new MapSquare(canvas, context, i, j, selection);
            row.push(tile);
        }
        mapState.mapSquares.push(row);
    }
}