window.onload = function() {
    start();
}

function start() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    console.log(w);
    console.log(h);
    if((w/h)>(9/16)) {

    }
    else {
        var navbar = document.getElementById("navbar");
        navbar.style.display = "none";
    }
}

window.onresize = function navhide() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    console.log(w);
    console.log(h);
    if((w/h)>(13/16)) {
        var navbar = document.getElementById("navbar");
        navbar.style.display = "block";
    }
    else {
        var navbar = document.getElementById("navbar");
        navbar.style.display = "none";
    }
}

function drawCanvas() {
    var c = document.getElementById("itc");
    var ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    ctx.strokeText("Hello World", 10, 50);
}