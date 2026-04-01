export const gestionarTema = () => {
    const boton = document.querySelector('#tema-toggle');
    const body = document.body;
    const modoGuardado = localStorage.getItem('modo-color');
    if (modoGuardado === 'oscuro') {
        body.classList.add('is-dark-mode');
        boton.innerText = "MODO CLARO";
    }
    boton.addEventListener('click', () => {
        body.classList.toggle('is-dark-mode');
        
        const esOscuro = body.classList.contains('is-dark-mode');
        localStorage.setItem('modo-color', esOscuro ? 'oscuro' : 'claro');
        boton.innerText = esOscuro ? "MODO CLARO" : "MODO OSCURO";
    });
};