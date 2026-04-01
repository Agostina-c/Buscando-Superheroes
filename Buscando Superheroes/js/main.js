import { buscarPersonajes, obtenerDetalles } from './api.js';
import { crearCard, renderizarDetalles } from './ui.js';
import { gestionarTema } from './tema.js';
import { HEROES_POR_PAGINA } from './config.js';

let paginaActual = 1;
const TOTAL_MAX_HEROES = 731;

const grid = document.querySelector('#results-grid');
const counter = document.querySelector('#results-counter');
const pageText = document.querySelector('#current-page');
const cargarCatalogo = async () => {
    grid.innerHTML = '<div class="column is-12 has-text-centered"><p class="title">Cargando héroes...</p></div>';
    const inicio = (paginaActual - 1) * HEROES_POR_PAGINA + 1;
    const fin = Math.min(inicio + (HEROES_POR_PAGINA - 1), TOTAL_MAX_HEROES);
    
    let promesas = [];
    for (let i = inicio; i <= fin; i++) {
        promesas.push(obtenerDetalles(i));
    }
    const resultados = await Promise.all(promesas);
    const heroesValidos = resultados.filter(h => h && h.response !== "error");
    grid.innerHTML = heroesValidos.map(h => crearCard(h)).join('');
    counter.innerText = `Catálogo: IDs ${inicio} al ${fin}`;
    const totalPaginas = Math.ceil(TOTAL_MAX_HEROES / HEROES_POR_PAGINA);
    pageText.innerText = `Página ${paginaActual} de ${totalPaginas}`;
};

window.verHeroe = async (id) => {
    const data = await obtenerDetalles(id);
    if (data && data.response !== "error") {
        renderizarDetalles(data);
    }
};

document.querySelector('#btn-next').onclick = () => {
    if (paginaActual * HEROES_POR_PAGINA < TOTAL_MAX_HEROES) {
        paginaActual++;
        cargarCatalogo();
    }
};

document.querySelector('#btn-prev').onclick = () => {
    if (paginaActual > 1) {
        paginaActual--;
        cargarCatalogo();
    }
};

document.querySelector('#btn-first').onclick = () => {
    paginaActual = 1;
    cargarCatalogo();
};

document.querySelector('#btn-last').onclick = () => {
    paginaActual = Math.ceil(TOTAL_MAX_HEROES / HEROES_POR_PAGINA);
    cargarCatalogo();
};
document.querySelector('#search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.querySelector('#search-input').value;
    if (!query) return cargarCatalogo();

    counter.innerText = "Buscando...";
    const results = await buscarPersonajes(query);
    grid.innerHTML = results.map(h => crearCard(h)).join('');
    pageText.innerText = "Resultados de búsqueda";
});

document.querySelector('#sort-order').addEventListener('change', (e) => {
    const orden = e.target.value;
    
    if (heroesEnMemoria.length === 0) return;

    heroesEnMemoria.sort((a, b) => {
        if (orden === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    renderizarGrid();
});

gestionarTema();
cargarCatalogo();