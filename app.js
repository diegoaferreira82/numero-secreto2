let lista = [];
let maximo = 3;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let novoJogo = document.getElementById("reiniciar");

function gerarNumeroAleatorio() {
    let numSecreto = parseInt(Math.random() * maximo + 1);
    if (lista.length == maximo) lista = [];
    if (lista.includes(numSecreto)) {
        return gerarNumeroAleatorio();
    } else {
        lista.push(numSecreto);
        return numSecreto;
    }
}

function reiniciar() {
    document.querySelector('input').value = "";
    exibirTextoNaTela("h1", "Jogo do Número Secreto");
    exibirTextoNaTela("p", `Escolha um número entre 1 e ${maximo}`);
    novoJogo.disabled = true;
    tentativas = 1;
    numeroSecreto = gerarNumeroAleatorio();
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela("p", `Acertou! com ${tentativas} tentativa(s)`);
        novoJogo.disabled = false;
    } else {
        chute > numeroSecreto
            ? exibirTextoNaTela("p", "O número é menor")
            : exibirTextoNaTela("p", "O número é maior");
        document.querySelector('input').value = "";
        tentativas++;
    }
}

reiniciar();
