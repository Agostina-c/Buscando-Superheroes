export const crearCard = (heroe) => {
    const imagenUrl=heroe.image.url && heroe.image.url ? heroe.image.url:'https:superheroapi.com/api.php/4526f4f2e46227c62a1461133017e010';
    return `
    <div class="column is-3-desktop is-6-tablet is-12-mobile">
        <div class="card comic-card" onclick="verHeroe('${heroe.id}')">
            <div class="card-image">
                <figure class="image is-4by5">
                    <img src="${imagenUrl}" alt="${heroe.name}">
                </figure>
            </div>
            <div class="card-content">
                <p class="title is-4">${heroe.name}</p>
                <p class="subtitle is-6">${heroe.biography.publisher}</p>
            </div>
        </div>
    </div>`;
};

export const renderizarDetalles = (h) => {
    if(!h || !h.image) return;
    const modalBody = document.querySelector('#modal-content');
    modalBody.innerHTML = `
        <div class="columns">
            <div class="column is-5">
             <figure class="image">
                <img src="${h.image}" class="image-modal">
             </figure>
            </div>
            <div class="column is-7">
                <h3 class="title is-3">${h.name}</h3>
                <p><strong>• Nombre Real:</strong> ${h.biography['full-name']}</p>
                <p><strong>• Editorial:</strong> ${h.biography.publisher}</p>
                <p><strong>• Lugar de nacimiento:</strong> ${h.biography['place-of-birth']}</p>
                <p><strong>• Ocupación:</strong> ${h.work.occupation}</p>
                <hr>
                <p><strong>• Altura:</strong> ${h.appearance.height[1]} | <strong>Peso:</strong> ${h.appearance.weight[1]}</p>
                <p><strong>• Afiliaciones:</strong> ${h.connections['group-affiliation']}</p>
                <hr>
                <h4 class="subtitle is-5"> <strong> Estadísticas de Combate </strong></h4>
                <p> <strong> 🧠Inteligencia: </strong> ${h.powerstats.intelligence}%</p>
                <p> <strong> 💪Fuerza: </strong> ${h.powerstats.strength}%</p>
                <p> <strong> 💯Combate: </strong> ${h.powerstats.combat}%</p>
            </div>
        </div>`;
        document.querySelector('#hero-modal').classList.add('is-active');
};