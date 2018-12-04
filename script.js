let canvas;
canvas = document.getElementById("tictactoe");
window.onload = function () {

    drawCanvas();
    //resizeCanvas();
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
    //resizeCanvas();
}

function resizeCanvas() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let maxsize = (2*h)/3;
    if (w - 32 < maxsize) {
        canvas.width = w - 32;
        canvas.height = w - 32;
    }
    else {
        canvas.width = maxsize;
        canvas.height = maxsize;
    }
    drawCanvas();
}

function drawCanvas() {
    let ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.strokeText("Hello World", 10, 50);
}