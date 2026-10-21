const filtros = document.querySelectorAll('.botoes-conteiner2 .filtro');
const cards = document.querySelectorAll('.fotosIlustrativas > div');
const menu = document.getElementById('fix-conteiner');
const LINKS = {
    whatsapp: 'https://wa.me/5515996979766',
    instagram: 'https://www.instagram.com/comanpatrimonial?utm_source=ig_web_button_share_sheet&xtok=ZDNlZDc0MzIxNw=='
};
const campoTelefone = document.querySelector('.social input');



filtros.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        filtros.forEach(l => l.classList.remove('ativo'));
        link.classList.add('ativo');

        const categoria = link.dataset.filtro;

        cards.forEach(card => {
            const mostrar = categoria === 'todas' || card.dataset.categoria === categoria;
            card.classList.toggle('oculto', !mostrar);
        });
    });
});


window.addEventListener('scroll', () => {
    menu.classList.toggle('rolou', window.scrollY > 30);
});


function abrir(url) {
    window.open(url, '_blank', 'noopener');
}

const ligacoes = [
    ['.conecteBotoes .fa-instagram', LINKS.instagram],
    ['.conecteBotoes .fa-whatsapp', LINKS.whatsapp],
    ['.whatsappContato', LINKS.whatsapp + '?text=' + encodeURIComponent('Olá! Gostaria de agendar uma visita técnica.')],
    ['.agendar-btn', LINKS.whatsapp + '?text=' + encodeURIComponent('Olá! Gostaria de agendar uma visita técnica.')],
];

document.querySelector('.whatsappFixo').addEventListener('click', () => {
    abrir(LINKS.whatsapp + '?text=' + encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços.'));
});

ligacoes.forEach(([seletor, url]) => {
    const elemento = document.querySelector(seletor);
    const alvo = elemento.closest('button, a');
    alvo.addEventListener('click', () => abrir(url));
});


const campoNome = document.querySelector('.name input');
const campoServico = document.querySelector('.tipoServico select');
const campoMensagem = document.querySelector('.menssagem textarea');

function mostrarErro(campo, mensagem) {
    const caixa = campo.parentElement;
    let erro = caixa.querySelector('.erro');

    if (!erro) {
        erro = document.createElement('small');
        erro.className = 'erro';
        caixa.appendChild(erro);
    }

    erro.textContent = mensagem;
    campo.classList.add('invalido');
}

function limparErro(campo) {
    const erro = campo.parentElement.querySelector('.erro');
    if (erro) erro.remove();
    campo.classList.remove('invalido');
}

[campoNome, campoTelefone].forEach(campo => {
    campo.addEventListener('input', () => limparErro(campo));
});
campoServico.addEventListener('change', () => limparErro(campoServico));

document.querySelector('.feedbackBtn').addEventListener('click', () => {
    const nome = campoNome.value.trim();
    const telefone = campoTelefone.value.trim();
    const servico = campoServico.value;
    const mensagem = campoMensagem.value.trim();

    let valido = true;
    let primeiroInvalido = null;

    if (!nome) {
        mostrarErro(campoNome, 'Digite seu nome.');
        primeiroInvalido = primeiroInvalido || campoNome;
        valido = false;
    }

    if (telefone.replace(/\D/g, '').length !== 11) {
        mostrarErro(campoTelefone, 'Digite um telefone válido: (00) 00000-0000.');
        primeiroInvalido = primeiroInvalido || campoTelefone;
        valido = false;
    }

    if (campoServico.selectedIndex === 0) {
        mostrarErro(campoServico, 'Escolha um tipo de serviço.');
        primeiroInvalido = primeiroInvalido || campoServico;
        valido = false;
    }

    if (!valido) {
        primeiroInvalido.focus();
        return;
    }

    const texto = `Olá! Meu nome é ${nome}.\nTelefone: ${telefone}\nServiço: ${servico}\nMensagem: ${mensagem}`;

    abrir(`${LINKS.whatsapp}?text=${encodeURIComponent(texto)}`);
});

campoTelefone.addEventListener('input', () => {
    const numeros = campoTelefone.value.replace(/\D/g, '').slice(0, 11);

    let formatado = '';
    if (numeros.length > 7) {
        formatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    } else if (numeros.length > 2) {
        formatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    } else if (numeros.length > 0) {
        formatado = `(${numeros}`;
    }

    campoTelefone.value = formatado;
});


const telaErro = document.getElementById('tela-erro');

function mostrarTelaErro(
    titulo = 'Algo deu errado',
    texto = 'Não foi possível concluir a ação. Tente novamente em instantes.'
) {
    document.getElementById('erro-titulo').textContent = titulo;
    document.getElementById('erro-texto').textContent = texto;
    telaErro.classList.add('ativa');
    document.getElementById('erro-fechar').focus();
}

function fecharTelaErro() {
    telaErro.classList.remove('ativa');
}

document.getElementById('erro-fechar').addEventListener('click', fecharTelaErro);

telaErro.addEventListener('click', (e) => {
    if (e.target === telaErro) fecharTelaErro();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharTelaErro();
});

window.addEventListener('error', () => mostrarTelaErro());
window.addEventListener('unhandledrejection', () => mostrarTelaErro());