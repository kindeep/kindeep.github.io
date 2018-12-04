let canvas = document.getElementById("tictactoe");
var boardArray = create2DArray();
var CANVAS_HEIGHT, CANVAS_WIDTH;
var turn = 0;

window.onload = function () {
    initializeBoard();
    drawCanvas();
    resizeCanvas();
};

function playTurn(x, y) {
    if(x!==-1&&y!==-1) {
        if (Math.pow(-1, turn) === 1) {
            Oturn(x, y);
        } else Xturn(x, y);
        drawCanvas();
    }
}

function isIntersect(point, circle) {
    return Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
}

canvas.addEventListener('click', (e) => {
    var rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    let x_click = -1, y_click = -1;
    if (x < CANVAS_WIDTH / 3 && x > 0) y_click = 0;
    if (x > CANVAS_WIDTH / 3 && x < ((CANVAS_WIDTH / 3) * 2)) y_click = 1;
    if (x < CANVAS_WIDTH && x > ((CANVAS_WIDTH / 3) * 2)) y_click = 2;

    if (y < CANVAS_HEIGHT/ 3 && y > 0) x_click = 0;
    if (y > CANVAS_HEIGHT / 3 && y < ((CANVAS_HEIGHT / 3) * 2)) x_click = 1;
    if (y < CANVAS_HEIGHT && y > ((CANVAS_HEIGHT / 3) * 2)) x_click = 2;

    console.log(x+" "+y+" "+CANVAS_HEIGHT+" "+CANVAS_WIDTH);
    console.log(x_click, y_click);
    playTurn(x_click, y_click);

});


function Xturn(x, y) {
    if (boardArray[x][y] === 0) {
        boardArray[x][y] = -1;
        turn++;
    }
    detectWin();
}

function Oturn(x, y) {
    if (boardArray[x][y] === 0) {
        boardArray[x][y] = 1;
        turn++;
    }
    detectWin();
}

function detectWin() {

    for (var i = 0; i < boardArray.length; i++) {
        let sum = 0;
        for (var j = 0; j < boardArray.length; j++) {
            sum += boardArray[i][j];
        }
        if (sum === 3 || sum === -3) {
            victoryEvent(sum);
            return;
        }
    }
    for (var j = 0; j < boardArray.length; j++) {
        let sum = 0;
        for (var i = 0; i < boardArray.length; i++) {
            sum += boardArray[i][j];
        }
        if (sum === 3 || sum === -3) {
            victoryEvent(sum);
            return;
        }

    }
    let sum = 0;
    let sum2 = 0;
    for (var i = 0; i < boardArray.length; i++) {
        sum += boardArray[i][i];
        sum2 += boardArray[i][2-i];
    }
    if (sum === 3 || sum === -3) {
        victoryEvent(sum);
        return;
    }
    if (sum2 === 3 || sum2 === -3) {
        victoryEvent(sum);
        return;
    }

}

function victoryEvent(sum) {
    console.log("Victory"+sum);
    if (sum < 0) {
        //x won
    }
    if (sum > 0) {
        //y won
    }
    turn = 0;
    initializeBoard();
    drawCanvas();
}

function start() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    console.log(w);
    console.log(h);
    if ((w / h) > (9 / 16)) {

    } else {
        var navbar = document.getElementById("navbar");
        navbar.style.display = "none";
    }
}

window.onresize = function onresize() {
    resizeCanvas();
};

function resizeCanvas() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let maxsize = (2 * h) / 3;
    if (w - 32 < maxsize) {
        canvas.width = w - 32;
        canvas.height = w - 32;
    } else {
        canvas.width = maxsize;
        canvas.height = maxsize;
    }
    CANVAS_HEIGHT = canvas.height;
    CANVAS_WIDTH = canvas.width;
    drawCanvas();
}

function create2DArray() {
    var x = new Array(3);

    for (var i = 0; i < x.length; i++) {
        x[i] = new Array(3);
    }

    return x;
}

function drawCanvas() {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawArray();
    drawGrid();
}

function drawArray() {
    let count = 1;
    for (var i = 0; i < boardArray.length; i++) {
        for (var j = 0; j < boardArray.length; j++) {
            if (boardArray[i][j] === 1) drawOat(count);
            else if (boardArray[i][j] === -1) drawXat(count);
            count++;
        }
    }
}

/* 123
   456
   789
 */
function drawXat(pos) {
    let x, y;
    if (pos > 6) {
        y = 3;
        x = pos - 6;
    } else if (pos > 3) {
        y = 2;
        x = pos - 3;
    } else {
        y = 1;
        x = pos;
    }
    drawX((CANVAS_WIDTH / 6) + (x - 1) * (CANVAS_WIDTH / 3), (CANVAS_HEIGHT / 6) + (y - 1) * (CANVAS_HEIGHT / 3), CANVAS_WIDTH / 6, CANVAS_HEIGHT / 6);
}

function drawOat(pos) {
    let x, y;
    if (pos > 6) {
        y = 3;
        x = pos - 6;
    } else if (pos > 3) {
        y = 2;
        x = pos - 3;
    } else {
        y = 1;
        x = pos;
    }
    drawO((CANVAS_WIDTH / 6) + (x - 1) * (CANVAS_WIDTH / 3), (CANVAS_HEIGHT / 6) + (y - 1) * (CANVAS_HEIGHT / 3), CANVAS_WIDTH / 6);
}

function drawX(x, y, sizex, sizey) {
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x - sizex, y - sizey);
    ctx.lineTo(x + sizex, y + sizey);

    ctx.moveTo(x + sizex, y - sizey);
    ctx.lineTo(x - sizex, y + sizey);
    ctx.stroke();
}

function initializeBoard() {
    for (var i = 0; i < boardArray.length; i++) {
        for (var j = 0; j < boardArray.length; j++) {
            boardArray[i][j] = 0;
        }
    }
}

function drawO(x, y, r) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawGrid() {

}