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
const rifas = [
    {id: 1, 
    nombre: "Rifa de bicicleta", 
    imagen: "img/Premio-Bicicleta.jpg", 
    precio: 1000, 
    stockTotal: 30, 
    numerosOcupados: [],
    fechaSorteo: null, 
    ganador: null, 
    }
];

const divcatalogo = document.getElementById('catalogo');
if (divcatalogo) {
    rifas.forEach(rifa => {
        const disponibles = rifa.stockTotal - rifa.numerosOcupados.length;
        let htmlNumeros = '';
        for (let i =1; i <= rifa.stockTotal; i++) {
            const ocupado = rifa.numerosOcupados.includes(i);
            htmlNumeros += `<span class="${ocupado ? 'ocupado' : 'disponible'}">${i}</span>`;
        }        
        divcatalogo.innerHTML += `
            <div class="tarjeta">
                <img src="${rifa.imagen}" alt="${rifa.nombre}">
                <h3>${rifa.nombre}</h3>
                <p class="precio">Valor de boleto: $${rifa.precio.toLocaleString()}</p>
                <p class="stock">Numeros disponibles: ${disponibles}/${rifa.stockTotal}</p>
                <div class="grilla-numeros">${htmlNumeros}</div>
            </div>`;
    });
}
