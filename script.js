var mapSizeLeftRight = 45;
var mapSizeTopBottom = 40;
var spriteSquares = [];
var mapSquares = [];
var firstSquare;
var secondSquare;
var selection;
var spritesContainer = document.getElementById("sprites");
var mapContainer = document.getElementById("map");
var image = new Image();
image.src = "sprites.png";
function deselectAll() {
    mapSquares.forEach(function (row) {
        row.forEach(function (element) {
            element.deselect();
        });
    });
}
var MapSelection = /** @class */ (function () {
    function MapSelection(firstSquare, secondSquare) {
        this.selectedMapSquares = [];
        var topLeftI = Math.min(firstSquare.arrayI, secondSquare.arrayI);
        var topLeftJ = Math.min(firstSquare.arrayJ, secondSquare.arrayJ);
        var bottomRightI = Math.max(firstSquare.arrayI, secondSquare.arrayI);
        var bottomRightJ = Math.max(firstSquare.arrayJ, secondSquare.arrayJ);
        this.topLeftMapSquare = mapSquares[topLeftI][topLeftJ];
        this.bottomRightMapSquare = mapSquares[bottomRightI][bottomRightJ];
        console.log(topLeftI, topLeftJ, bottomRightI, bottomRightJ);
        for (var j = topLeftJ; j <= bottomRightJ; j++) {
            for (var i = topLeftI; i <= bottomRightI; i++) {
                this.selectedMapSquares.push(mapSquares[j][i]);
                mapSquares[j][i].select();
            }
        }
    }
    MapSelection.prototype.addSprites = function (firstSquare, secondSquare) {
        var topLeftI = Math.min(firstSquare.arrayI, secondSquare.arrayI);
        var topLeftJ = Math.min(firstSquare.arrayJ, secondSquare.arrayJ);
        var bottomRightI = Math.max(firstSquare.arrayI, secondSquare.arrayI);
        var bottomRightJ = Math.max(firstSquare.arrayJ, secondSquare.arrayJ);
        this.topLeftMapSquare = mapSquares[topLeftI][topLeftJ];
        this.bottomRightMapSquare = mapSquares[bottomRightI][bottomRightJ];
        console.log(topLeftI, topLeftJ, bottomRightI, bottomRightJ);
        for (var j = topLeftJ; j <= bottomRightJ; j++) {
            for (var i = topLeftI; i <= bottomRightI; i++) {
                this.selectedMapSquares.push(mapSquares[j][i]);
                mapSquares[j][i].select();
            }
        }
    };
    MapSelection.prototype.setSprites = function (sprite) {
        this.selectedMapSquares.forEach(function (square) {
            square.setSprite(sprite);
        });
    };
    return MapSelection;
}());
var SpriteSquare = /** @class */ (function () {
    function SpriteSquare(canvas, context, arrayI, arrayJ) {
        var _this = this;
        this.canvas = canvas;
        this.canvas.onclick = function () {
            //cale zaznaczenie ustaw na dany sprite
            selection.setSprites(_this);
            deselectAll();
        };
        this.context = context;
        this.arrayI = arrayI;
        this.arrayJ = arrayJ;
    }
    return SpriteSquare;
}());
var MapSquare = /** @class */ (function () {
    function MapSquare(canvas, context, arrayI, arrayJ) {
        var _this = this;
        this.canvas = canvas;
        this.selected = false;
        this.canvas.addEventListener("mousedown", function (event) {
            if (selection && !event.ctrlKey) {
                deselectAll();
            }
            firstSquare = _this;
        });
        this.canvas.addEventListener("mouseup", function (event) {
            secondSquare = _this;
            if (event.ctrlKey) {
                selection.addSprites(firstSquare, secondSquare);
            }
            else {
                selection = new MapSelection(firstSquare, secondSquare);
            }
        });
        this.context = context;
        this.arrayI = arrayI;
        this.arrayJ = arrayJ;
    }
    MapSquare.prototype.setSprite = function (sprite) {
        this.context.putImageData(sprite.context.getImageData(0, 0, 25, 25), 0, 0);
    };
    MapSquare.prototype.select = function () {
        this.selected = true;
        this.canvas.classList.add("selected");
    };
    MapSquare.prototype.deselect = function () {
        this.selected = false;
        this.canvas.classList.remove("selected");
    };
    MapSquare.prototype.toggle = function () {
        this.selected = !this.selected;
        this.canvas.classList.toggle("selected");
    };
    return MapSquare;
}());
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
    for (var j = 0; j < mapSizeTopBottom; j++) {
        var row = [];
        for (var i = 0; i < mapSizeLeftRight; i++) {
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
