const LINKS = {
    whatsapp: 'https://wa.me/5515996979766',
};


function abrir(url) {
    window.open(url, '_blank', 'noopener');
}


document.querySelector('.goWhatsapp').addEventListener('click', () => {
    abrir(LINKS.whatsapp + '?text=' + encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços.'));
});



const backInit = document.querySelector('.backInit');

backInit.addEventListener('click', () => {
    window.location.href = '/index.html';
});