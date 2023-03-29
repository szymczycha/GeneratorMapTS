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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MapHistory\": () => (/* binding */ MapHistory)\n/* harmony export */ });\nvar MapHistory = /** @class */ (function () {\n    function MapHistory() {\n        this.history = [];\n    }\n    MapHistory.prototype.getCurrent = function () {\n        return this.history[this.history.length - 1];\n    };\n    MapHistory.prototype.pop = function () {\n        return this.history.pop();\n    };\n    MapHistory.prototype.add = function (state) {\n        this.history.push(state);\n    };\n    return MapHistory;\n}());\n\n\n\n//# sourceURL=webpack://generatormapts/./src/MapHistory.ts?");

/***/ }),

/***/ "./src/MapSelection.ts":
/*!*****************************!*\
  !*** ./src/MapSelection.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MapSelection\": () => (/* binding */ MapSelection)\n/* harmony export */ });\nvar MapSelection = /** @class */ (function () {\n    function MapSelection(stateHistory) {\n        this.stateHistory = stateHistory;\n        this.selectedMapSquares = [];\n        // this.selectedMapSquares = [];\n        // let topLeftI: number = Math.min(firstSquare.arrayI, secondSquare.arrayI);\n        // let topLeftJ: number = Math.min(firstSquare.arrayJ, secondSquare.arrayJ);\n        // let bottomRightI: number = Math.max(firstSquare.arrayI, secondSquare.arrayI);\n        // let bottomRightJ: number = Math.max(firstSquare.arrayJ, secondSquare.arrayJ);\n        // this.topLeftMapSquare = state.mapSquares[topLeftI][topLeftJ];\n        // this.bottomRightMapSquare = state.mapSquares[bottomRightI][bottomRightJ];\n        // console.log(topLeftI, topLeftJ, bottomRightI, bottomRightJ);\n        // for (let j = topLeftJ; j <= bottomRightJ; j++) {\n        //     for (let i = topLeftI; i <= bottomRightI; i++) {\n        //         this.selectedMapSquares.push(state.mapSquares[j][i])\n        //         state.mapSquares[j][i].select();\n        //     }\n        // }\n    }\n    MapSelection.prototype.empty = function () {\n        this.selectedMapSquares = [];\n    };\n    MapSelection.prototype.addSprites = function (firstSquare, secondSquare) {\n        var state = this.stateHistory.getCurrent();\n        var topLeftI = Math.min(firstSquare.arrayI, secondSquare.arrayI);\n        var topLeftJ = Math.min(firstSquare.arrayJ, secondSquare.arrayJ);\n        var bottomRightI = Math.max(firstSquare.arrayI, secondSquare.arrayI);\n        var bottomRightJ = Math.max(firstSquare.arrayJ, secondSquare.arrayJ);\n        this.topLeftMapSquare = state.mapSquares[topLeftI][topLeftJ];\n        this.bottomRightMapSquare = state.mapSquares[bottomRightI][bottomRightJ];\n        console.log(topLeftI, topLeftJ, bottomRightI, bottomRightJ);\n        for (var j = topLeftJ; j <= bottomRightJ; j++) {\n            for (var i = topLeftI; i <= bottomRightI; i++) {\n                this.selectedMapSquares.push(state.mapSquares[j][i]);\n                state.mapSquares[j][i].select();\n            }\n        }\n    };\n    MapSelection.prototype.setSprites = function (sprite) {\n        this.selectedMapSquares.forEach(function (square) {\n            square.setSprite(sprite);\n        });\n    };\n    MapSelection.prototype.deselectAll = function () {\n        this.selectedMapSquares.forEach(function (_) {\n            _.deselect();\n        });\n        this.empty();\n    };\n    return MapSelection;\n}());\n\n\n\n//# sourceURL=webpack://generatormapts/./src/MapSelection.ts?");

/***/ }),

/***/ "./src/MapSquare.ts":
/*!**************************!*\
  !*** ./src/MapSquare.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MapSquare\": () => (/* binding */ MapSquare)\n/* harmony export */ });\nvar MapSquare = /** @class */ (function () {\n    function MapSquare(canvas, context, arrayI, arrayJ, selection, copySquare) {\n        if (canvas === void 0) { canvas = null; }\n        if (context === void 0) { context = null; }\n        if (arrayI === void 0) { arrayI = null; }\n        if (arrayJ === void 0) { arrayJ = null; }\n        if (selection === void 0) { selection = null; }\n        if (copySquare === void 0) { copySquare = null; }\n        var _this = this;\n        if (copySquare != null) { //jezeli kopiuje\n            this.canvas = copySquare.canvas;\n            this.selected = copySquare.selected;\n            this.selection = copySquare.selection;\n            this.context = copySquare.context;\n            // this.context.putImageData(copySquare.context.getImageData(0,0,25,25), 0,0);\n            this.arrayI = copySquare.arrayI;\n            this.arrayJ = copySquare.arrayJ;\n        }\n        else {\n            this.canvas = canvas;\n            this.selected = false;\n            this.selection = selection;\n            this.context = context;\n            this.arrayI = arrayI;\n            this.arrayJ = arrayJ;\n        }\n        this.canvas.addEventListener(\"mousedown\", function (event) {\n            if (selection && !event.ctrlKey) {\n                selection.deselectAll();\n            }\n            selection.firstSquare = _this;\n        });\n        this.canvas.addEventListener(\"mouseup\", function (event) {\n            var secondSquare = _this;\n            if (event.ctrlKey) {\n                selection.addSprites(selection.firstSquare, secondSquare);\n            }\n            else {\n                selection.empty();\n                selection.addSprites(selection.firstSquare, secondSquare);\n                // selection = new MapSelection(selection.firstSquare, secondSquare);\n            }\n        });\n    }\n    MapSquare.prototype.setSprite = function (sprite) {\n        this.context.putImageData(sprite.context.getImageData(0, 0, 25, 25), 0, 0);\n    };\n    MapSquare.prototype.select = function () {\n        this.selected = true;\n        this.canvas.classList.add(\"selected\");\n    };\n    MapSquare.prototype.deselect = function () {\n        this.selected = false;\n        this.canvas.classList.remove(\"selected\");\n    };\n    MapSquare.prototype.toggle = function () {\n        this.selected = !this.selected;\n        this.canvas.classList.toggle(\"selected\");\n    };\n    return MapSquare;\n}());\n\n\n\n//# sourceURL=webpack://generatormapts/./src/MapSquare.ts?");

/***/ }),

/***/ "./src/MapState.ts":
/*!*************************!*\
  !*** ./src/MapState.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MapState\": () => (/* binding */ MapState)\n/* harmony export */ });\n/* harmony import */ var _MapSquare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapSquare */ \"./src/MapSquare.ts\");\n\nvar MapState = /** @class */ (function () {\n    function MapState(copyState) {\n        if (copyState === void 0) { copyState = null; }\n        var _this = this;\n        this.mapSquares = [];\n        if (copyState != null) {\n            copyState.mapSquares.forEach(function (row) {\n                var newRow = [];\n                row.forEach(function (element) {\n                    var newElement = new _MapSquare__WEBPACK_IMPORTED_MODULE_0__.MapSquare(null, null, null, null, null, element);\n                    newRow.push(newElement);\n                });\n                _this.mapSquares.push(newRow);\n            });\n        }\n    }\n    MapState.prototype.load = function (state) {\n        state.mapSquares.forEach(function (row) {\n            row.forEach(function (element) {\n                element.context.putImageData(element.context.getImageData(0, 0, 25, 25), 0, 0);\n            });\n        });\n    };\n    return MapState;\n}());\n\n\n\n//# sourceURL=webpack://generatormapts/./src/MapState.ts?");

/***/ }),

/***/ "./src/SpriteSquare.ts":
/*!*****************************!*\
  !*** ./src/SpriteSquare.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteSquare\": () => (/* binding */ SpriteSquare)\n/* harmony export */ });\n/* harmony import */ var _MapState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapState */ \"./src/MapState.ts\");\n\nvar SpriteSquare = /** @class */ (function () {\n    function SpriteSquare(canvas, context, arrayI, arrayJ, selection, mapHistory) {\n        var _this = this;\n        this.canvas = canvas;\n        this.selection = selection;\n        this.mapHistory = mapHistory;\n        this.canvas.onclick = function () {\n            //cale zaznaczenie ustaw na dany sprite\n            selection.setSprites(_this);\n            selection.deselectAll();\n            mapHistory.add(new _MapState__WEBPACK_IMPORTED_MODULE_0__.MapState(mapHistory.getCurrent()));\n        };\n        this.context = context;\n        this.arrayI = arrayI;\n        this.arrayJ = arrayJ;\n    }\n    return SpriteSquare;\n}());\n\n\n\n//# sourceURL=webpack://generatormapts/./src/SpriteSquare.ts?");

/***/ }),

/***/ "./src/script.ts":
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SpriteSquare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriteSquare */ \"./src/SpriteSquare.ts\");\n/* harmony import */ var _MapSquare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MapSquare */ \"./src/MapSquare.ts\");\n/* harmony import */ var _MapSelection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MapSelection */ \"./src/MapSelection.ts\");\n/* harmony import */ var _MapState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MapState */ \"./src/MapState.ts\");\n/* harmony import */ var _MapHistory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MapHistory */ \"./src/MapHistory.ts\");\n\n\n\n\n\nvar mapSizeLeftRight = 45;\nvar mapSizeTopBottom = 40;\nvar spriteSquares = [];\nvar mapSquares = [];\nvar firstSquare;\nvar secondSquare;\nvar mapState = new _MapState__WEBPACK_IMPORTED_MODULE_3__.MapState();\nvar mapHistory = new _MapHistory__WEBPACK_IMPORTED_MODULE_4__.MapHistory();\nmapHistory.add(mapState);\nvar selection = new _MapSelection__WEBPACK_IMPORTED_MODULE_2__.MapSelection(mapHistory);\nvar spritesContainer = document.getElementById(\"sprites\");\nvar mapContainer = document.getElementById(\"map\");\nvar image = new Image();\nimage.src = \"sprites.png\";\nfunction undo() {\n    var undoMapState = mapHistory.pop();\n    mapState.load(undoMapState);\n}\ndocument.addEventListener(\"keydown\", function (ev) {\n    console.log(ev.key);\n    console.log(ev.ctrlKey);\n    if (ev.key === 'z' && ev.ctrlKey) {\n        undo();\n    }\n});\nconsole.log(\"sdsdfasdfa\");\nimage.onload = function () {\n    for (var i = 0; i < 20; i++) {\n        var row = [];\n        for (var j = 0; j < 16; j++) {\n            var canvas = document.createElement(\"canvas\");\n            canvas.width = 25;\n            canvas.height = 25;\n            var context = canvas.getContext(\"2d\");\n            context.drawImage(image, 1 + 48 * j, 1 + 48 * i, 47, 47, 0, 0, 25, 25);\n            spritesContainer.appendChild(canvas);\n            var tile = new _SpriteSquare__WEBPACK_IMPORTED_MODULE_0__.SpriteSquare(canvas, context, i, j, selection, mapHistory);\n            row.push(tile);\n        }\n        spriteSquares.push(row);\n    }\n    for (var i = 0; i < 20; i++) {\n        var row = [];\n        for (var j = 0; j < 16; j++) {\n            var canvas = document.createElement(\"canvas\");\n            canvas.width = 25;\n            canvas.height = 25;\n            var context = canvas.getContext(\"2d\");\n            context.drawImage(image, 769 + 48 * j, 1 + 48 * i, 47, 47, 0, 0, 25, 25);\n            spritesContainer.appendChild(canvas);\n            var tile = new _SpriteSquare__WEBPACK_IMPORTED_MODULE_0__.SpriteSquare(canvas, context, i + 20, j + 16, selection, mapHistory);\n            row.push(tile);\n        }\n        spriteSquares.push(row);\n    }\n    for (var j = 0; j < mapSizeTopBottom; j++) {\n        var row = [];\n        for (var i = 0; i < mapSizeLeftRight; i++) {\n            var canvas = document.createElement(\"canvas\");\n            canvas.width = 25;\n            canvas.height = 25;\n            var context = canvas.getContext(\"2d\");\n            mapContainer.appendChild(canvas);\n            var tile = new _MapSquare__WEBPACK_IMPORTED_MODULE_1__.MapSquare(canvas, context, i, j, selection);\n            row.push(tile);\n        }\n        mapState.mapSquares.push(row);\n    }\n};\n\n\n//# sourceURL=webpack://generatormapts/./src/script.ts?");

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