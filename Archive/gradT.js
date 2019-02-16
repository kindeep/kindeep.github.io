//document.innerHTML = 'hatma;ladfkjsl;sdkfjl;sadkfjl;sdkfjl;sadfjkl';

//console.log('asljkdfa;sld');

var resulta = [];

doStuff();

function doStuff() {
    let canvaselement = document.createElement('canvas');
    let ctx = canvaselement.getContext("2d");


    let grd = ctx.createLinearGradient(0, 0, 300, 0);
    addStops(grd);

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 500, 500);


    document.body.appendChild(canvaselement);


    function addStops(gradient) {

        let rgb = [255, 0, 0];

        colshit(0, 1, rgb);
        colshit(1, 2, rgb);

        //console.log(JSON.stringify(resulta));
        let curr = 0.0;
        let dx = 1.0/resulta.length;
        resulta.forEach(function (hexcode, index) {
            grd.addColorStop(curr + index*dx, hexcode);
        })

    }

    function colshit(a, b, array) {
        let i = 1;
        while (array[a] > 0) {
            array[a] -= i;
            array[b] += i;
            resulta.push(arrToHex(array));
        }
    }

    function arrToHex(arr) {
        return '#'+hex2(arr[0]) + hex2(arr[1]) + hex2(arr[2]);
    }

    function hex2(num) {
        let hexString = num.toString(16);
        if (hexString.length % 2) {
            hexString = '0' + hexString;
        }

        return hexString;
    }
}