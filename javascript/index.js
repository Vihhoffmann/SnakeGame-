

const somFundo = new Audio("music/music.mp3");
const somGameOver = new Audio("music/gameover.mp3");
const somMover = new Audio("music/move.mp3");
const somComer = new Audio("music/food.mp3");

var direcao = { x: 0, y: 0 };
var cobrinha = [{ x: 5, y: 5 }]
var fruta = {
    x: Math.floor(Math.random() * 18),
    y: Math.floor(Math.random() * 18)
}
var pontos = 0;
var ultimavezAtualizada = 0;
var velocidade = 4;

function principal(tempoAtual) {
    window.requestAnimationFrame(principal);
    if ((tempoAtual - ultimavezAtualizada) / 1000 < 1 / velocidade) {
        return;
    }
    ultimavezAtualizada = tempoAtual;
    atualizaGame();
}

function verificaColisao() {

    for (var i = 1; i < cobrinha.length; i++) {
        if (cobrinha[i].x == cobrinha[0].x && cobrinha[i].y == cobrinha[0].y) {
            return true;
        }
    }
    //verifica colisao com paredes
    if (cobrinha[0].x >= 18 || cobrinha[0].x <= 0 || cobrinha[0].y >= 18 || cobrinha[0].y <= 0) {
        return true;
    }
    return false;

}
function verificaComeuFrutinha() {
    if (cobrinha[0].x == fruta.x && cobrinha[0].y == fruta.y) {
        console.log("entrou aqui")
        somComer.play();
        pontos = pontos + 10;
        pontuacao.innerHTML = pontos + "pontos";
        cobrinha.unshift (
            { x: cobrinha[0].x + direcao.x, y: cobrinha[0].y + direcao.y}
        )
        fruta.x = Math.floor(Math.random() * 16) + 1;
        fruta.y =  Math.floor(Math.random() * 16) + 1;
        velocidade = velocidade + 0.5;
     

    }

}


function atualizaGame() {
    var colidiu = verificaColisao();
    if (colidiu == true) {
        somFundo.pause();
        somGameOver.play();
        alert("GAME OVERRRRRR 💀")
        cobrinha = [{ x: 5, y: 5 }]
        direcao.x = 0;
        direcao.y = 0;
        pontos = 0;
    }
    verificaComeuFrutinha();

    for (var i = cobrinha.length - 2; i >= 0; i--) {
        cobrinha[i + 1] = { ...cobrinha[i] }
    }
    cobrinha[0].y += direcao.y;
    cobrinha[0].x += direcao.x;
    board.innerHTML = "";
    for (var i = 0; i < cobrinha.length; i++) {
        var parteCobrinha = document.createElement('div');
        parteCobrinha.style.gridRowStart = cobrinha[i].y;
        parteCobrinha.style.gridColumnStart = cobrinha[i].x;

        if (i == 0) {
            parteCobrinha.classList.add('head');
        } else {
            parteCobrinha.classList.add('snake');
        }

        board.appendChild(parteCobrinha);
    }
    var frutinha = document.createElement("div");
    frutinha.style.gridColumnStart = fruta.x;
    frutinha.style.gridRowStart = fruta.y;
    frutinha.classList.add("fruta");
    board.appendChild(frutinha);

}

function direcionaCobrinha(e) {

    somMover.play();
    switch (e.code) {
        case "ArrowUp":
            direcao.x = 0
            direcao.y = -1;
            //subir
            break;
        case "ArrowDown":
            direcao.x = 0
            direcao.y = 1;
            //esquerda
            break;
        case "ArrowRight":
            direcao.x = 1
            direcao.y = 0;
            //baixo
            break;
        case "ArrowLeft":
            direcao.x = -1
            direcao.y = 0;
            //direit
            break
        case "Enter":
            direcao.x = 1;
            direcao.y = 0;
            somFundo.play();



    }
}

window.addEventListener("keydown", (e) => direcionaCobrinha(e))


principal();