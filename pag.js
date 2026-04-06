import { HEROES_POR_PAGINA } from './config.js';

export const recortarLista = (lista, paginaActual) => {
    if(!lista || lista.length===0) return[];
    const inicio = (paginaActual - 1) * HEROES_POR_PAGINA;
    const fin = inicio + HEROES_POR_PAGINA;
    return lista.slice(inicio, fin);
};

export const calcularPaginasTotales = (totalItems) => {
    if(totalItems===0) return 1;
    return Math.ceil(totalItems / HEROES_POR_PAGINA);
};
