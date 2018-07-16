var canvas = document.getElementById("elevadorCanvas");
var ctx = canvas.getContext("2d");

// window.addEventListener("resize", OnResizeCalled, false);

// function OnResizeCalled() {
//     canvas.style.width = window.innerWidth + 'px';
//     canvas.style.height = window.innerHeight + 'px';
// }

// var gameWidth = window.innerWidth;
// var gameHeight = window.innerHeight;
// var scaleToFitX = gameWidth / 800;
// var scaleToFitY = gameHeight / 480;
// var currentScreenRatio = gameWidth / gameHeight;
// var optimalRatio = Math.min(scaleToFitX, scaleToFitY);
// if (currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79) {
//     canvas.style.width = gameWidth + "px";
//     canvas.style.height = gameHeight + "px";
// }
// else {
//     canvas.style.width = 800 * optimalRatio + "px";
//     canvas.style.height = 480 * optimalRatio + "px";
// }


class plataformaDoElevador {
    
    constructor() {
    
    }
}

var yChao = 550;

/* Prédio */
var xPredio = 100;
var yPredio = 50;
var pAndar = 100;
var quantidadeAndares = 5;

/* Elevador */
var xElevador = xPredio + 450 / 2;
var yElevador = yChao - 100;
var yElevadorSolicitado = yElevador;


desenharFrame();

function desenharFrame() {
    limparFrame();

    desenharChao();
    desenharPredio();
    desenharElevador();

    document.getElementById("yElevadorSolicitado").value = yElevadorSolicitado;
    document.getElementById("yElevador").value = yElevador;
}

function limparFrame() {
     ctx.clearRect(0,0,canvas.width,canvas.height)
}

function desenharChao() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, yChao, canvas.width, 50); 
}


function desenharPredio() {
    ctx.fillStyle = 'black';
    ctx.strokeRect(xPredio, yPredio, 550, 500); 

    for(var i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(xPredio,yPredio + (i * pAndar));
        ctx.lineTo(xPredio + 550,yPredio + (i * pAndar));
        ctx.closePath();
        ctx.stroke();
    }

    ctx.strokeRect(xPredio + 450 / 2, yPredio, pAndar, 500); 
}


function desenharElevador() {

    var frameJumpElevador = 10;
    if(yElevador > yElevadorSolicitado) {
        yElevador -= frameJumpElevador;
    } else if(yElevador < yElevadorSolicitado) {
         yElevador += frameJumpElevador;
    }

    ctx.lineWidth = 10;
    ctx.strokeRect(xElevador, yElevador, 100, 100); 
    ctx.lineWidth = 1;

}

function definirAndar(numeroAndar) {
    if(numeroAndar <= 0 || numeroAndar > quantidadeAndares) {
        console.log("Andar indexistente");
        return false;
    } else {
        numeroAndar -= 1;
        yElevadorSolicitado = yPredio + ((quantidadeAndares - 1 - numeroAndar) * pAndar);
        return true;
    }
}

document.addEventListener('keydown', function(e) {
    if(e.keyCode == 38) {
        yElevadorSolicitado += pAndar;
    }

    if(e.keyCode == 40) {
        yElevadorSolicitado -= pAndar;
    }
});


setInterval(desenharFrame, 100);