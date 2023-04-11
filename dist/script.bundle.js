/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/MapHistory.ts":
/*!***************************!*\
  !*** ./src/MapHistory.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MapHistory\": () => (/* binding */ MapHistory)\n/* harmony export */ });\nvar MapHistory = /** @class */ (function () {\n    function MapHistory() {\n        this.currentIndex = 0;\n        this.currentIndex = -1;\n        this.history = [];\n    }\n    MapHistory.prototype.getCurrent = function () {\n        return this.history[this.currentIndex];\n    };\n    MapHistory.prototype.getNext = function () {\n        console.log(this.history, this.currentIndex);\n        if (this.currentIndex + 1 <= this.history.length - 1) {\n            this.currentIndex += 1;\n        }\n        return this.getCurrent();\n    };\n    MapHistory.prototype.pop = function () {\n        if (this.currentIndex > 0) {\n            this.currentIndex -= 1;\n        }\n        return this.getCurrent();\n    };\n    MapHistory.prototype.add = function (state) {\n        this.currentIndex += 1;\n        this.history.splice(this.currentIndex, this.history.length, state);\n    };\n    return MapHistory;\n}());\n\n\n\n//# sourceURL=webpack://generatormapts/./src/MapHistory.ts?");

/***/ }),

/***/ "./src/MapSelection.ts":
/*!*****************************!*\
  !*** ./src/MapSelection.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MapSelection\": () => (/* binding */ MapSelection)\n/* harmony export */ });\n/* harmony import */ var _MapSquare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapSquare */ \"./src/MapSquare.ts\");\n/* harmony import */ var _MapState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MapState */ \"./src/MapState.ts\");\n\n\nvar MapSelection = /** @class */ (function () {\n    function MapSelection(stateHistory) {\n        this.stateHistory = stateHistory;\n        this.selectedMapSquares = [];\n        this.isCopying = false;\n        this.copiedSquares = [];\n    }\n    MapSelection.prototype.isEmpty = function () {\n        return this.selectedMapSquares.length == 0;\n    };\n    MapSelection.prototype.empty = function () {\n        this.selectedMapSquares = [];\n        this.stateHistory.getCurrent().mapSquares.forEach(function (row) {\n            row.forEach(function (mapSquare) {\n                mapSquare.deselect();\n            });\n        });\n    };\n    MapSelection.prototype.doAutomat = function () {\n        console.log(\"automat\");\n        console.log(this.secondSquare);\n        var state = this.stateHistory.getCurrent();\n        var nextI = this.secondSquare.arrayI + 1;\n        var nextJ = this.secondSquare.arrayJ;\n        if (nextI > state.mapSquares[0].length - 1) { // jesli wychodzi w prawo poza mape \n            nextI = 0;\n            nextJ += 1;\n            if (nextJ > state.mapSquares.length - 1) {\n                nextJ = 0;\n            }\n        }\n        var nextSquare = state.mapSquares[nextJ][nextI];\n        console.log(nextI, nextJ, nextSquare.arrayI, nextSquare.arrayJ);\n        this.toggleSprites(nextSquare, nextSquare);\n    };\n    MapSelection.prototype.isAutomat = function () {\n        return document.getElementById(\"automat\").checked == true;\n    };\n    MapSelection.prototype.copy = function () {\n        this.isCopying = true;\n        this.copiedSquares = this.selectedMapSquares;\n    };\n    MapSelection.prototype.paste = function () {\n        var _this = this;\n        if (!this.isEmpty()) {\n            var firstCopiedSquare = this.copiedSquares[0];\n            var toSquare = this.selectedMapSquares[0];\n            console.log(firstCopiedSquare);\n            console.log(toSquare);\n            var iDiff_1 = toSquare.arrayI - firstCopiedSquare.arrayI;\n            var jDiff_1 = toSquare.arrayJ - firstCopiedSquare.arrayJ;\n            this.copiedSquares.forEach(function (mapSquare) {\n                var newI = mapSquare.arrayI + iDiff_1;\n                var newJ = mapSquare.arrayJ + jDiff_1;\n                if (newI < _MapSquare__WEBPACK_IMPORTED_MODULE_0__.MapSquare.iSize && newJ < _MapSquare__WEBPACK_IMPORTED_MODULE_0__.MapSquare.jSize) {\n                    _this.stateHistory.getCurrent().mapSquares[newJ][newI].setImageData(mapSquare.imageData);\n                }\n            });\n            this.stateHistory.add(new _MapState__WEBPACK_IMPORTED_MODULE_1__.MapState(this.stateHistory.getCurrent()));\n            this.deselectAll();\n        }\n        this.isCopying = false;\n    };\n    MapSelection.prototype.toggleSprites = function (firstSquare, secondSquare) {\n        console.log(\"toggleSprites\");\n        this.secondSquare = secondSquare;\n        console.log(this);\n        var state = this.stateHistory.getCurrent();\n        console.log(firstSquare.arrayI, secondSquare.arrayI);\n        var topLeftI = Math.min(firstSquare.arrayI, secondSquare.arrayI);\n        console.log(topLeftI);\n        var topLeftJ = Math.min(firstSquare.arrayJ, secondSquare.arrayJ);\n        var bottomRightI = Math.max(firstSquare.arrayI, secondSquare.arrayI);\n        var bottomRightJ = Math.max(firstSquare.arrayJ, secondSquare.arrayJ);\n        this.topLeftMapSquare = state.mapSquares[topLeftJ][topLeftI];\n        this.bottomRightMapSquare = state.mapSquares[bottomRightJ][bottomRightI];\n        for (var j = topLeftJ; j <= bottomRightJ; j++) {\n            for (var i = topLeftI; i <= bottomRightI; i++) {\n                //jesli juz jest w selected map squares to zamiast tego usun\n                if (this.selectedMapSquares.includes(state.mapSquares[j][i])) {\n                    this.selectedMapSquares.splice(this.selectedMapSquares.indexOf(state.mapSquares[j][i]), 1);\n                }\n                else {\n                    this.selectedMapSquares.push(state.mapSquares[j][i]);\n                }\n                state.mapSquares[j][i].toggle();\n            }\n        }\n        console.log(this);\n    };\n    MapSelection.prototype.setFirstSquare = function (firstSquare) {\n        this.firstSquare = firstSquare;\n    };\n    MapSelection.prototype.setSprites = function (sprite) {\n        this.selectedMapSquares.forEach(function (square) {\n            square.setSprite(sprite);\n        });\n    };\n    MapSelection.prototype.deselectAll = function () {\n        this.selectedMapSquares.forEach(function (selectedSquare) {\n            selectedSquare.deselect();\n        });\n        this.empty();\n    };\n    return MapSelection;\n}());\n\n\n\n//# sourceURL=webpack://generatormapts/./src/MapSelection.ts?");

/***/ }),

/***/ "./src/MapSquare.ts":
/*!**************************!*\
  !*** ./src/MapSquare.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MapSquare\": () => (/* binding */ MapSquare)\n/* harmony export */ });\nvar MapSquare = /** @class */ (function () {\n    function MapSquare(canvas, context, arrayI, arrayJ, selection, copySquare) {\n        if (canvas === void 0) { canvas = null; }\n        if (context === void 0) { context = null; }\n        if (arrayI === void 0) { arrayI = null; }\n        if (arrayJ === void 0) { arrayJ = null; }\n        if (selection === void 0) { selection = null; }\n        if (copySquare === void 0) { copySquare = null; }\n        if (copySquare != null) { //jezeli kopiuje\n            this.canvas = copySquare.canvas;\n            this.selected = copySquare.selected;\n            this.selection = copySquare.selection;\n            this.context = copySquare.context;\n            // this.context.putImageData(copySquare.context.getImageData(0,0,25,25), 0,0);\n            this.arrayI = copySquare.arrayI;\n            this.arrayJ = copySquare.arrayJ;\n            this.imageData = this.canvas.getContext(\"2d\").getImageData(0, 0, 25, 25);\n        }\n        else {\n            this.canvas = canvas;\n            this.selected = false;\n            this.selection = selection;\n            this.context = context;\n            this.arrayI = arrayI;\n            this.arrayJ = arrayJ;\n            this.imageData = this.canvas.getContext(\"2d\").getImageData(0, 0, 25, 25);\n        }\n    }\n    MapSquare.prototype.setSprite = function (sprite) {\n        this.context.putImageData(sprite.context.getImageData(0, 0, 25, 25), 0, 0);\n    };\n    MapSquare.prototype.setImageData = function (imageData) {\n        this.context.putImageData(imageData, 0, 0);\n    };\n    MapSquare.prototype.select = function () {\n        this.selected = true;\n        this.canvas.classList.add(\"selected\");\n    };\n    MapSquare.prototype.deselect = function () {\n        this.selected = false;\n        this.canvas.classList.remove(\"selected\");\n    };\n    MapSquare.prototype.toggle = function () {\n        this.selected = !this.selected;\n        this.canvas.classList.toggle(\"selected\");\n    };\n    MapSquare.iSize = 45;\n    MapSquare.jSize = 40;\n    return MapSquare;\n}());\n\n\n//# sourceURL=webpack://generatormapts/./src/MapSquare.ts?");

/***/ }),

/***/ "./src/MapState.ts":
/*!*************************!*\
  !*** ./src/MapState.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MapState\": () => (/* binding */ MapState)\n/* harmony export */ });\n/* harmony import */ var _MapSquare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapSquare */ \"./src/MapSquare.ts\");\n\nvar MapState = /** @class */ (function () {\n    function MapState(copyState) {\n        if (copyState === void 0) { copyState = null; }\n        var _this = this;\n        this.mapSquares = [];\n        if (copyState != null) {\n            copyState.mapSquares.forEach(function (row) {\n                var newRow = [];\n                row.forEach(function (element) {\n                    var newElement = new _MapSquare__WEBPACK_IMPORTED_MODULE_0__.MapSquare(null, null, null, null, null, element);\n                    newRow.push(newElement);\n                });\n                _this.mapSquares.push(newRow);\n            });\n        }\n    }\n    MapState.prototype.load = function (state) {\n        var _this = this;\n        state.mapSquares.forEach(function (row, i) {\n            row.forEach(function (element, j) {\n                _this.mapSquares[i][j].setImageData(element.imageData);\n            });\n        });\n    };\n    return MapState;\n}());\n\n\n\n//# sourceURL=webpack://generatormapts/./src/MapState.ts?");

/***/ }),

/***/ "./src/Point.ts":
/*!**********************!*\
  !*** ./src/Point.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Point\": () => (/* binding */ Point)\n/* harmony export */ });\nvar Point = /** @class */ (function () {\n    function Point(pageX, pageY) {\n        this.x = pageX;\n        this.y = pageY;\n    }\n    return Point;\n}());\n\n\n\n//# sourceURL=webpack://generatormapts/./src/Point.ts?");

/***/ }),

/***/ "./src/SelectionDiv.ts":
/*!*****************************!*\
  !*** ./src/SelectionDiv.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SelectionDiv\": () => (/* binding */ SelectionDiv)\n/* harmony export */ });\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ \"./src/Point.ts\");\n\nvar SelectionDiv = /** @class */ (function () {\n    function SelectionDiv() {\n        this.isMoving = false;\n        this.div = document.getElementById(\"selectionDiv\");\n    }\n    SelectionDiv.prototype.startSelect = function (pageX, pageY) {\n        this.startPoint = new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(pageX, pageY);\n        this.isMoving = true;\n    };\n    SelectionDiv.prototype.moveTo = function (currentX, currentY) {\n        if (this.isMoving) {\n            var currentPoint = new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(currentX, currentY);\n            var topLeftPoint = new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(Math.min(this.startPoint.x, currentPoint.x), Math.min(this.startPoint.y, currentPoint.y));\n            var bottomRightPoint = new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(Math.max(this.startPoint.x, currentPoint.x), Math.max(this.startPoint.y, currentPoint.y));\n            var width = bottomRightPoint.x - topLeftPoint.x;\n            var height = bottomRightPoint.y - topLeftPoint.y;\n            this.div.style.width = width - 2 + \"px\";\n            this.div.style.height = height - 2 + \"px\";\n            this.div.style.left = topLeftPoint.x + 2 + \"px\";\n            this.div.style.top = topLeftPoint.y + 2 + \"px\";\n        }\n    };\n    SelectionDiv.prototype.endSelect = function () {\n        this.div.style.width = \"0\";\n        this.div.style.height = \"0\";\n        this.isMoving = false;\n    };\n    return SelectionDiv;\n}());\n\n\n\n//# sourceURL=webpack://generatormapts/./src/SelectionDiv.ts?");

/***/ }),

/***/ "./src/SpriteSquare.ts":
/*!*****************************!*\
  !*** ./src/SpriteSquare.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteSquare\": () => (/* binding */ SpriteSquare)\n/* harmony export */ });\n/* harmony import */ var _MapState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapState */ \"./src/MapState.ts\");\n\nvar SpriteSquare = /** @class */ (function () {\n    function SpriteSquare(canvas, context, arrayI, arrayJ, selection, mapHistory) {\n        var _this = this;\n        this.canvas = canvas;\n        this.selection = selection;\n        this.mapHistory = mapHistory;\n        this.canvas.onclick = function () {\n            //cale zaznaczenie ustaw na dany sprite\n            if (!_this.selection.isEmpty()) {\n                _this.selection.setSprites(_this);\n                _this.selection.deselectAll();\n                mapHistory.add(new _MapState__WEBPACK_IMPORTED_MODULE_0__.MapState(mapHistory.getCurrent()));\n                if (_this.selection.isAutomat()) {\n                    _this.selection.doAutomat();\n                }\n            }\n        };\n        this.context = context;\n        this.arrayI = arrayI;\n        this.arrayJ = arrayJ;\n    }\n    return SpriteSquare;\n}());\n\n\n\n//# sourceURL=webpack://generatormapts/./src/SpriteSquare.ts?");

/***/ }),

/***/ "./src/script.ts":
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SpriteSquare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriteSquare */ \"./src/SpriteSquare.ts\");\n/* harmony import */ var _MapSquare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MapSquare */ \"./src/MapSquare.ts\");\n/* harmony import */ var _MapSelection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MapSelection */ \"./src/MapSelection.ts\");\n/* harmony import */ var _MapState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MapState */ \"./src/MapState.ts\");\n/* harmony import */ var _MapHistory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MapHistory */ \"./src/MapHistory.ts\");\n/* harmony import */ var _SelectionDiv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SelectionDiv */ \"./src/SelectionDiv.ts\");\n\n\n\n\n\n\n// nie jestem z tego wszystkiego dumny\nvar mapSizeLeftRight = 45;\nvar mapSizeTopBottom = 40;\nvar spriteSquares = [];\nvar mapSquares = [];\nvar firstSquare;\nvar secondSquare;\nvar mapState = new _MapState__WEBPACK_IMPORTED_MODULE_3__.MapState();\nvar mapHistory = new _MapHistory__WEBPACK_IMPORTED_MODULE_4__.MapHistory();\nmapHistory.add(mapState);\nvar selection = new _MapSelection__WEBPACK_IMPORTED_MODULE_2__.MapSelection(mapHistory);\nvar spritesContainer = document.getElementById(\"sprites\");\nvar mapContainer = document.getElementById(\"map\");\nvar image = new Image();\nvar selectionDiv = new _SelectionDiv__WEBPACK_IMPORTED_MODULE_5__.SelectionDiv();\nimage.src = \"sprites.png\";\nvar deleteCanvas = document.createElement(\"canvas\");\nvar deleteSpriteSquare = new _SpriteSquare__WEBPACK_IMPORTED_MODULE_0__.SpriteSquare(deleteCanvas, deleteCanvas.getContext(\"2d\"), -1, -1, selection, mapHistory);\nfunction undo() {\n    console.log(\"undo\");\n    var undoMapState = mapHistory.pop();\n    mapState.load(undoMapState);\n}\nfunction deleteSquares() {\n    if (!selection.isEmpty()) { // lol \n        selection.setSprites(deleteSpriteSquare);\n        selection.deselectAll();\n        mapHistory.add(new _MapState__WEBPACK_IMPORTED_MODULE_3__.MapState(mapHistory.getCurrent()));\n        if (selection.isAutomat()) {\n            selection.doAutomat();\n        }\n    }\n}\nfunction redo() {\n    console.log(\"redo\");\n    var redoMapState = mapHistory.getNext();\n    mapState.load(redoMapState);\n}\nfunction copy() {\n    console.log(\"copy\");\n    selection.copy();\n}\nfunction paste() {\n    selection.paste();\n}\nconsole.log(\"sdsdfasdfa\");\nimage.onload = function () {\n    document.addEventListener(\"keydown\", function (ev) {\n        if (ev.key === 'z' && (ev.ctrlKey || ev.metaKey)) {\n            undo();\n        }\n        else if (ev.key === 'y' && (ev.ctrlKey || ev.metaKey)) {\n            redo();\n        }\n        else if (ev.key === 'Delete') {\n            deleteSquares();\n        }\n        else if (ev.key === 'c' && (ev.ctrlKey || ev.metaKey)) {\n            copy();\n        }\n        else if (ev.key === 'v' && (ev.ctrlKey || ev.metaKey)) {\n            paste();\n        }\n    });\n    document.addEventListener(\"mousedown\", function (ev) {\n        selectionDiv.startSelect(ev.pageX, ev.pageY);\n    });\n    document.addEventListener(\"mousemove\", function (ev) {\n        selectionDiv.moveTo(ev.pageX, ev.pageY);\n    });\n    document.addEventListener(\"mouseup\", function (ev) {\n        selectionDiv.endSelect();\n    });\n    for (var i = 0; i < 20; i++) {\n        var row = [];\n        for (var j = 0; j < 16; j++) {\n            var canvas = document.createElement(\"canvas\");\n            canvas.width = 25;\n            canvas.height = 25;\n            var context = canvas.getContext(\"2d\");\n            context.drawImage(image, 1 + 48 * j, 1 + 48 * i, 47, 47, 0, 0, 25, 25);\n            spritesContainer.appendChild(canvas);\n            var tile = new _SpriteSquare__WEBPACK_IMPORTED_MODULE_0__.SpriteSquare(canvas, context, i, j, selection, mapHistory);\n            row.push(tile);\n        }\n        spriteSquares.push(row);\n    }\n    for (var i = 0; i < 20; i++) {\n        var row = [];\n        for (var j = 0; j < 16; j++) {\n            var canvas = document.createElement(\"canvas\");\n            canvas.width = 25;\n            canvas.height = 25;\n            var context = canvas.getContext(\"2d\");\n            context.drawImage(image, 769 + 48 * j, 1 + 48 * i, 47, 47, 0, 0, 25, 25);\n            spritesContainer.appendChild(canvas);\n            var tile = new _SpriteSquare__WEBPACK_IMPORTED_MODULE_0__.SpriteSquare(canvas, context, i + 20, j + 16, selection, mapHistory);\n            row.push(tile);\n        }\n        spriteSquares.push(row);\n    }\n    var _loop_1 = function (j) {\n        var row = [];\n        var _loop_2 = function (i) {\n            var canvas = document.createElement(\"canvas\");\n            canvas.setAttribute(\"willReadFrequently\", \"true\");\n            canvas.addEventListener(\"mousedown\", function (event) {\n                var mapSquare = mapHistory.getCurrent().mapSquares[j][i];\n                if (!event.ctrlKey) {\n                    mapSquare.selection.deselectAll();\n                }\n                mapSquare.selection.setFirstSquare(mapSquare);\n            });\n            canvas.addEventListener(\"mouseup\", function (event) {\n                var mapSquare = mapHistory.getCurrent().mapSquares[j][i];\n                var secondSquare = mapSquare;\n                if (!event.ctrlKey) {\n                    mapSquare.selection.empty();\n                }\n                mapSquare.selection.toggleSprites(mapSquare.selection.firstSquare, secondSquare);\n            });\n            canvas.width = 25;\n            canvas.height = 25;\n            var context = canvas.getContext(\"2d\", { willReadFrequently: true });\n            mapContainer.appendChild(canvas);\n            console.log(selection);\n            var tile = new _MapSquare__WEBPACK_IMPORTED_MODULE_1__.MapSquare(canvas, context, i, j, selection);\n            row.push(tile);\n        };\n        for (var i = 0; i < mapSizeLeftRight; i++) {\n            _loop_2(i);\n        }\n        mapState.mapSquares.push(row);\n    };\n    for (var j = 0; j < mapSizeTopBottom; j++) {\n        _loop_1(j);\n    }\n};\n\n\n//# sourceURL=webpack://generatormapts/./src/script.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/script.ts");
/******/ 	
/******/ })()
;