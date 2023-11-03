var canvas = document.getElementById("elevadorCanvas");
var ctx = canvas.getContext("2d");

class plataformaDoElevador {
    
    constructor() {
    
    }
}

var solicitacao = [];
var yChao = 0;
var yChaoMax = 100;

/* Prédio */
var xPredio = 100;
var yPredio = 100;
var xPredioMax = xPredio + 600;
var yPredioMax = yPredio + 500;
var pAndar = 100;
var quantidadeAndares = 5;

/* Elevador */
var xElevador = (xPredio + xPredioMax - 100) / 2;
var yElevador = yChaoMax;
var xElevadorRelativo = xElevador + 100
var yElevadorRelativo = yElevador + 100
var yElevadorSolicitado = yElevador;
var frameJumpElevador = 1;

let canvasHeight = canvas.height;
let canvasWidth = canvas.width;

desenharFrame();

function desenharFrame() {
    limparFrame();
    logicaNegocio();
    desenharCenario();
}

function desenharCenario() {
    desenharCeu();
    desenharChao();
    desenharPredio();
    desenharElevador();
}

function logicaNegocio() {
    logicaElevador();
}

function logicaElevador() {
    //filtrar solictacao que estão como não processado
    result = solicitacao.filter((item) => {
        return item['processado'] == false;
    })  

    if (result.length > 0) {
        solicitacao_atual = result[0]
        
        //yElevadorSolicitado
        // andarAtualElevador = yElevador == 0 ? 0 : yElevador / 100
        let andarAtualElevador = yElevador
        let andarAtualP = solicitacao_atual['andarAtual'] * 100

        if (andarAtualP != andarAtualElevador) {
            yElevadorSolicitado = andarAtualP;
            if(yElevador > yElevadorSolicitado) {
                yElevador -= frameJumpElevador;
            } else if(yElevador < yElevadorSolicitado) {
                 yElevador += frameJumpElevador;
            }
        } else {
            solicitacao_atual['processado'] = true
        }
    }

    console.log(result);
}

function desenharCeu() {
    ctx.fillStyle = '#00bfff';
    fillRectCoord(0, 0, canvasWidth, canvasHeight);
}

function limparFrame() {
     ctx.clearRect(0,0,canvas.width,canvas.height)
}

function desenharChao() {
    ctx.fillStyle = 'gray';
    fillRectCoord(0, yChao, canvasWidth, yChaoMax)
}

function fillRectCoord(x, y, width, height) {
    const x1 = x
    const y1 = canvasHeight - y
    const y2 = canvasHeight - height - y1
    ctx.fillRect(x1,y1, width - x1, y2); 
}

function strokeRectCoord(x, y, width, height) {
    const x1 = x
    const y1 = canvasHeight - y
    const y2 = canvasHeight - height - y1
    ctx.strokeRect(x1,y1, width - x1, y2); 
}


function desenharPredio() {
    ctx.fillStyle = 'orange';
    fillRectCoord(xPredio, yPredio, xPredioMax, yPredioMax); 

    for(var i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(xPredio, yPredio + (i * pAndar));
        ctx.lineTo(xPredioMax, yPredio + (i * pAndar));
        ctx.closePath();
        ctx.stroke();
    }

    strokeRectCoord(xElevador, yPredio, xElevadorRelativo, yPredioMax); 
}


function desenharElevador() {
    ctx.lineWidth = 10;
    yElevadorRelativo = yElevador + 100;
    strokeRectCoord(xElevador, yElevador, xElevadorRelativo, yElevadorRelativo); 
    ctx.lineWidth = 1;

}

function subirAndar() {
    yElevadorSolicitado += pAndar;
}

function descerAndar() {
    yElevadorSolicitado -= pAndar;
}

function adicionarSolicitacao() {
    let numeroAndarDesejado = document.getElementById("numeroAndarDesejado").value;
    let andarAtual = document.getElementById("andarAtual").value;
    
    if(validarSolicitacao(numeroAndarDesejado, andarAtual)) {
        solicitacao.push({
            numeroAndarDesejado: parseInt(numeroAndarDesejado),
            andarAtual: parseInt(andarAtual),
            processado: false
        });
    }
}

function validarSolicitacao(numeroAndarDesejado, andarAtual) {
    if(
        (numeroAndarDesejado <= 0 || numeroAndarDesejado > quantidadeAndares)
        && (andarAtual <= 0 || andarAtual > quantidadeAndares)) {
        alert("Andar indexistente");
        return false;
    } else {
        // numeroAndar -= 1;
        // yElevadorSolicitado = yPredio + ((quantidadeAndares - 1 - numeroAndar) * pAndar);
        return true;
    }
}

document.addEventListener('keydown', function(e) {
    if(e.keyCode == 40) {
        descerAndar();
    }

    if(e.keyCode == 38) {
        subirAndar();
    }
    console.log(yElevadorSolicitado)
});


setInterval(desenharFrame, 15);