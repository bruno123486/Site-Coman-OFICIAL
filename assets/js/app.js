const filtros = document.querySelectorAll('.botoes-conteiner2 .filtro');
const cards = document.querySelectorAll('.fotosIlustrativas > div');

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