/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/arkanoid.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/arkanoid.js":
/*!************************!*\
  !*** ./js/arkanoid.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction Game() {\n  var canvas = document.getElementById(\"myCanvas\");\n  var ctx = canvas.getContext(\"2d\");\n  var ballRadius = 7;\n  var rightPressed = false;\n  var leftPressed = false;\n  var boardHeight = 10;\n  var boardWidth = 100;\n  var boardX = (canvas.width - boardWidth) / 2;\n  var x = canvas.width / 2;\n  var y = canvas.height - 30;\n  var brickColumnCount = 15;\n  var brickRowCount = 3;\n  var brickWidth = 50;\n  var brickHeight = 20;\n  var brickPadding = 0;\n  var brickOffsetTop = 30;\n  var brickOffsetLeft = 25;\n  var bricks = [];\n  var score = 40;\n  var gradient = ctx.createLinearGradient(0, 0, 0, 170);\n  gradient.addColorStop(\"0\", \"red\");\n  gradient.addColorStop(\"0.33\", \"blue\");\n  gradient.addColorStop(\"0.66\", \"red\");\n  gradient.addColorStop(\"1\", \"darkred\");\n\n  for (var i = 0; i < brickColumnCount; i++) {\n    bricks[i] = [];\n    for (var j = 0; j < brickRowCount; j++) {\n      bricks[i][j] = { x: 0, y: 0, status: 1 };\n    }\n  }\n  document.addEventListener(\"keydown\", keyDownHandler, false);\n  document.addEventListener(\"keyup\", keyUpHandler, false);\n  document.getElementById(\"reset\").addEventListener(\"click\", resetPage);\n  function resetPage() {\n    document.location.reload(true);\n  }\n\n  function displayGameWon() {\n    ctx.font = \"50px Verdana\";\n    ctx.fillText(\"YOU WON!\", canvas.width / 2 - 130, canvas.height / 2 - 90);\n    document.getElementById(\"win\").disabled = false;\n    document.getElementById(\"win\").style.display = \"inline-block\";\n    document.getElementById(\"win\").addEventListener(\"click\", function () {\n      resetPage();\n    });\n    document.getElementById(\"next\").disabled = false;\n    document.getElementById(\"next\").style.display = \"inline-block\";\n  }\n  function displayGameOver() {\n    ctx.font = \"50px Verdana\";\n    ctx.fillText(\"YOU LOST!\", canvas.width / 2 - 130, canvas.height / 2 - 90);\n    document.getElementById(\"reset\").disabled = false;\n    document.getElementById(\"reset\").style.display = \"inline-block\";\n  }\n  function drawScore() {\n    ctx.font = \"16px Arial\";\n    ctx.fillStyle = \"#0095DD\";\n    ctx.fillText(\"Score: \" + score, 8, 20);\n  }\n  function drawBoard() {\n    ctx.beginPath();\n    ctx.rect(boardX, canvas.height - boardHeight, boardWidth, boardHeight);\n    ctx.fillStyle = \"lightgreen\";\n    ctx.fill();\n    ctx.closePath();\n  }\n  function drawBricks() {\n    for (var _i = 0; _i < brickColumnCount; _i++) {\n      for (var _j = 0; _j < brickRowCount; _j++) {\n        if (bricks[_i][_j].status == 1) {\n          var brickX = _i * (brickWidth + brickPadding) + brickOffsetLeft;\n          var brickY = _j * (brickHeight + brickPadding) + brickOffsetTop;\n          bricks[_i][_j].x = brickX;\n          bricks[_i][_j].y = brickY;\n          ctx.beginPath();\n          ctx.rect(brickX, brickY, brickWidth, brickHeight);\n          ctx.strokeStyle = \"#fff\";\n          ctx.stroke();\n          ctx.fillStyle = gradient;\n          ctx.fill();\n        }\n      }\n    }\n  }\n\n  function drawBall() {\n    ctx.beginPath();\n    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);\n    ctx.fillStyle = \"yellow\";\n    ctx.fill();\n    ctx.closePath();\n  }\n  function keyDownHandler(e) {\n    if (e.keyCode == 39) {\n      rightPressed = true;\n    } else if (e.keyCode == 37) {\n      leftPressed = true;\n    }\n  }\n\n  function keyUpHandler(e) {\n    if (e.keyCode == 39) {\n      rightPressed = false;\n    } else if (e.keyCode == 37) {\n      leftPressed = false;\n    }\n  }\n  function checkCollison() {\n    var ballBottom = y - 7;\n    var ballTop = y + 7;\n    var ballLeft = x - 7;\n    var ballRight = x + 7;\n    for (var _i2 = 0; _i2 < brickColumnCount; _i2++) {\n      for (var _j2 = 0; _j2 < brickRowCount; _j2++) {\n        var b = bricks[_i2][_j2];\n        if (b.status == 1) {\n          if (ballRight > b.x + ballRadius && ballLeft < b.x + brickWidth && ballTop > b.y + ballRadius && ballBottom < b.y + brickHeight) {\n            dy = -dy;\n            b.status = 0;\n            ++score;\n          }\n        }\n      }\n    }\n  }\n\n  var dx = -Math.random();\n  var dy = 5;\n  function draw() {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    drawBricks();\n    drawBall();\n    drawBoard();\n    drawScore();\n    checkCollison();\n    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {\n      dx = -dx;\n    }\n    if (y + dy < ballRadius) {\n      dy = -dy;\n    } else if (score == 45) {\n      return displayGameWon();\n    } else if (y + dy > canvas.height - ballRadius) {\n      if (x > boardX && x < boardX + boardWidth) {\n        dy = -dy;\n        var deltaX = x - (boardX + boardWidth / 2);\n        dx = deltaX * 0.1;\n      } else {\n        return displayGameOver();\n      }\n    }\n\n    if (rightPressed && boardX < canvas.width - boardWidth) {\n      boardX += 7;\n    } else if (leftPressed && boardX > 0) {\n      boardX += -7;\n    }\n    x += dx;\n    y += dy;\n  }\n\n  setInterval(draw, 16);\n}\ndocument.getElementById(\"start\").addEventListener(\"click\", function () {\n  new Game();\n  this.style.display = \"none\";\n});\n\n//# sourceURL=webpack:///./js/arkanoid.js?");

/***/ })

/******/ });