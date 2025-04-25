let listaDeNumerosSorteados = [];
const numberMax = 1000;
let tentativa = 1;
let numberSecret = gerarNumeroAleatorio();
let chutesErrados = [];

const inputChute = document.querySelector('input');
const btnChutar =  document.getElementById('chutar');
const btnReiniciar = document.getElementById('reiniciar');

// console.log(numberSecret);
mensagemInicial();

// ----- EVENT LISTENER PARA TECLA ENTER -----
inputChute.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        // Se jogo em andamento (botão ainda está desabilitado) → tentar chute
        if (btnReiniciar.disabled) {
            verificarChute();
        }
        // Se jogo já ganhou (botão habilitado) → reiniciar
        else {
            reiniciarJogo();
        }
    }
});
// -------------------------------------------

function mensagemInicial() {
    exibirTexto('h1', 'Adivinhe o número');
    exibirTexto('p', `Escolha um número de 1 a ${numberMax}`);
}

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function verificarChute() {
    const chute = inputChute.value.trim();

    // Verificação de entrada vazia
    if (chute === '') {
        exibirTexto('p', 'Digite um número antes de continuar.');
        return;
    }

    // Verificação se é número válido
    const numero = parseInt(chute);
    if (isNaN(numero) || numero < 1 || numero > numberMax) {
        exibirTexto('p', `Digite um número válido entre 1 e ${numberMax}.`);
        limpar();
        return;
    }

    // Verificação de repetição
    if (chutesErrados.includes(chute)) {
        exibirTexto('p', `Você já tentou o número ${chute}. Tente outro.`);
        limpar();
        return;
    }

    let msgTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';

    if (chute == numberSecret) {
        let mensagem = `Parabéns, você descobriu o número secreto que era ${numberSecret}, após ${tentativa} ${msgTentativa}!!`;
        exibirTexto('h1', 'Acertou :)');
        exibirTexto('p', mensagem);
        btnReiniciar.removeAttribute('disabled');
        btnChutar.disabled = true;


    } else {
        if (chute > numberSecret) {
            exibirTexto('p', `O número secreto é <span class="dica">menor</span> que ${chute}`);
        } else {
            exibirTexto('p', `O número secreto é <span class="dica">maior</span> que ${chute}`);
        }

        if (!chutesErrados.includes(chute)) {
            chutesErrados.push(chute);
            atualizarChutesErrados();
        }

        tentativa++;
    }

    limpar(); // limpa o campo sempre que Enter for pressionado
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numberMax + 1);
    let qtdDeNumSorteados = listaDeNumerosSorteados.length;

    if (qtdDeNumSorteados == numberMax) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        // console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limpar() {
    inputChute.value = '';
}

function reiniciarJogo() {
    numberSecret = gerarNumeroAleatorio();
    // console.log(numberSecret);
    limpar();
    mensagemInicial();
    tentativa = 1;
    chutesErrados = [];
    atualizarChutesErrados();
    btnReiniciar.setAttribute('disabled', true);
    btnChutar.disabled = false;
}

function atualizarChutesErrados() {
    const container = document.getElementById('chutesErradosContainer');
    container.innerHTML = '';

    if (chutesErrados.length > 0) {
        container.innerHTML = '<p>Números já tentados:</p>';
        
        chutesErrados.forEach((chute, i) => {
            const span = document.createElement('span');
            span.textContent = chute + (i < chutesErrados.length - 1 ? ' | ' : '');
            container.appendChild(span);
        });
    }
}
