// Manejo del menú responsivo
const botonMenu = document.getElementById('boton_menu');
const nav = document.querySelector('nav');

botonMenu.addEventListener('click', () => {
    nav.classList.toggle('nav-activo');
});

// Equipo organizador de la rifa
const equipo = [
    { nombre: "Kevin Trujillo", rol: "Desarrollador — 4°D", foto: "img/ProgramadorPromedio.avif", descripcion: "Encargado del desarrollo web y la lógica de la plataforma de rifa." }
];

const divEquipo = document.getElementById('equipo');
if (divEquipo) {
    equipo.forEach(persona => {
        divEquipo.innerHTML += `
            <div class="tarjeta">
                <img src="${persona.foto}" alt="${persona.nombre}">
                <h3>${persona.nombre}</h3>
                <p class="rol">${persona.rol}</p>
                <p class="descripcion">${persona.descripcion}</p>
            </div>`;
    });
}

// Sistema de rifa
