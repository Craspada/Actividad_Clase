// Manejo del menú responsivo
const botonMenu = document.getElementById('boton_menu');
const nav = document.querySelector('nav');

botonMenu.addEventListener('click', () => {
    nav.classList.toggle('nav-activo');
});

// Manejo del catálogo de servicios
const equipo = [
    { nombre: "Kevin Trujillo", curso: "4°D", frase: "Nos haremos ricos con esta ****", foto: "img/ProgramadorPromedio.avif" }
];

const divEquipo = document.getElementById('equipo');
if (divEquipo) {
    equipo.forEach(persona => {
        divEquipo.innerHTML += `
            <div class="tarjeta">
                <img src="${persona.foto}" alt="${persona.nombre}">
                <h3>${persona.nombre}</h3>
                <p>${persona.curso} - "${persona.frase}"</p>
            </div>`;
    });
}


