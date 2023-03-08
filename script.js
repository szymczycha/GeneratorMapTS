// let spritesContainer: HTMLCanvasElement = document.getElementById("sprites") as HTMLCanvasElement;
// let mapContainer: HTMLCanvasElement = document.getElementById("sprites") as HTMLCanvasElement;
var SpriteSquare = /** @class */ (function () {
    function SpriteSquare(canvas, context, arrayI, arrayJ) {
        this.canvas = canvas;
        this.context = context;
        this.arrayI = arrayI;
        this.arrayJ = arrayJ;
    }
    return SpriteSquare;
}());
var MapSquare = /** @class */ (function () {
    function MapSquare(canvas, context, arrayI, arrayJ) {
        this.canvas = canvas;
        this.context = context;
        this.arrayI = arrayI;
        this.arrayJ = arrayJ;
    }
    return MapSquare;
}());
var MapSelection = /** @class */ (function () {
    function MapSelection() {
    }
    return MapSelection;
}());
var spriteSquares = [];
var mapSquares = [];
var spritesContainer = document.getElementById("sprites");
var mapContainer = document.getElementById("map");
var image = new Image();
image.src = "sprites.png";
image.onload = function () {
    for (var i = 0; i < 20; i++) {
        var row = [];
        for (var j = 0; j < 16; j++) {
            var canvas = document.createElement("canvas");
            canvas.width = 25;
            canvas.height = 25;
            var context = canvas.getContext("2d");
            context.drawImage(image, 1 + 48 * j, 1 + 48 * i, 47, 47, 0, 0, 25, 25);
            spritesContainer.appendChild(canvas);
            var tile = new SpriteSquare(canvas, context, i, j);
            row.push(tile);
        }
        spriteSquares.push(row);
    }
    for (var i = 0; i < 20; i++) {
        var row = [];
        for (var j = 0; j < 16; j++) {
            var canvas = document.createElement("canvas");
            canvas.width = 25;
            canvas.height = 25;
            var context = canvas.getContext("2d");
            context.drawImage(image, 769 + 48 * j, 1 + 48 * i, 47, 47, 0, 0, 25, 25);
            spritesContainer.appendChild(canvas);
            var tile = new SpriteSquare(canvas, context, i + 20, j + 16);
            row.push(tile);
        }
        spriteSquares.push(row);
    }
    for (var i = 0; i < 20; i++) {
        var row = [];
        for (var j = 0; j < 20; j++) {
            var canvas = document.createElement("canvas");
            canvas.width = 25;
            canvas.height = 25;
            var context = canvas.getContext("2d");
            mapContainer.appendChild(canvas);
            var tile = new MapSquare(canvas, context, i, j);
            row.push(tile);
        }
        mapSquares.push(row);
    }
};
