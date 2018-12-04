// let canvas = document.getElementById("tictactoe");
// window.onload = function () {
//
//     drawCanvas();
//     //resizeCanvas();
// }
// let X = -1;
// let O = 1;
// let boardArray = create2DArray();
//
// function initializeBoard() {
//     for (var i = 0; i < boardArray.length; i++) {
//         for (var j = 0; j < boardArray.length; j++) {
//             boardArray[i][j] = 0;
//         }
//     }
// }
//
// function start() {
//     let w = window.innerWidth;
//     let h = window.innerHeight;
//     console.log(w);
//     console.log(h);
//     if ((w / h) > (9 / 16)) {
//
//     } else {
//         var navbar = document.getElementById("navbar");
//         navbar.style.display = "none";
//     }
// }
//
// window.onresize = function onresize() {
//     //resizeCanvas();
// }
//
// function resizeCanvas() {
//     let w = window.innerWidth;
//     let h = window.innerHeight;
//     let maxsize = (2 * h) / 3;
//     if (w - 32 < maxsize) {
//         canvas.width = w - 32;
//         canvas.height = w - 32;
//     } else {
//         canvas.width = maxsize;
//         canvas.height = maxsize;
//     }
//     CANVAS_WIDTH = canvas.width;
//     CANVAS_HEIGHT = canvas.height;
//     drawCanvas();
// }
//
// function create2DArray(rows) {
//     var arr = [];
//
//     for (var i = 0; i < rows; i++) {
//         arr[i] = [];
//     }
//
//     return arr;
// }
// var CANVAS_HEIGHT, CANVAS_WIDTH;
//
// function drawCanvas() {
//     //let ctx = canvas.getContext("2d");
//     //ctx.font = "30px Arial";
//     //ctx.strokeText("Hello World",  CANVAS_WIDTH, CANVAS_HEIGHT);
//
//     drawX(0, 0);
// }
//
// function drawX(x, y) {
//     let ctx = canvas.getContext("2d");
//     ctx.beginPath();
//     ctx.moveTo(x - 20, y - 20);
//     ctx.lineTo(x + 20, y + 20);
//
//     ctx.moveTo(x + 20, y - 20);
//     ctx.lineTo(x - 20, y + 20);
//     ctx.stroke();
// }