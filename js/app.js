// Manejo del menú responsivo
const botonMenu = document.getElementById('boton_menu');
const nav = document.querySelector('nav');

botonMenu.addEventListener('click', () => {
    nav.classList.toggle('nav-activo');
});

// Equipo organizador de la rifa
const equipo = [
    { nombre: "Kevin Trujillo", rol: "Desarrollador — 4°D", foto: "img/kevin.jpg", descripcion: "Encargado del desarrollo web y la lógica de la plataforma de rifa." },
    { nombre: "Camila Torres", rol: "Tesorera — 4°D", foto: "img/camila.jpg", descripcion: "Encargada de la gestión de fondos recaudados y control financiero de la rifa." },
    { nombre: "Matías Rojas", rol: "Encargado de Difusión — 4°D", foto: "img/matias.jpg", descripcion: "Responsable de la promoción y comunicación de la rifa en redes sociales del liceo." },
    { nombre: "Fernanda Muñoz", rol: "Coordinadora General — 4°D", foto: "img/fernanda.jpg", descripcion: "Encargada de coordinar la logística general y el contacto con los premios de la rifa." },
    { nombre: "Diego Salazar", rol: "Encargado de Premios — 4°D", foto: "img/diego.jpg", descripcion: "Responsable de conseguir y gestionar los premios ofrecidos en la rifa." },
    { nombre: "Valentina Soto", rol: "Diseñadora Gráfica — 4°D", foto: "img/valentina.jpg", descripcion: "Encargada del diseño visual de afiches y material promocional de la rifa." },
    { nombre: "Benjamín Castro", rol: "Encargado de Ventas — 4°D", foto: "img/benjamin.jpg", descripcion: "Responsable de coordinar la venta de boletos entre los cursos del liceo." },
    { nombre: "Isidora Fuentes", rol: "Secretaria — 4°D", foto: "img/isidora.jpg", descripcion: "Encargada de llevar el registro de participantes y comunicaciones internas." },
    { nombre: "Tomás Vergara", rol: "Encargado de Logística — 4°D", foto: "img/tomas.jpg", descripcion: "Responsable de la organización del evento del sorteo y entrega de premios." },
    { nombre: "Antonia Reyes", rol: "Community Manager — 4°D", foto: "img/antonia.jpg", descripcion: "Encargada de mantener actualizadas las redes sociales del proyecto." },
    { nombre: "Joaquín Herrera", rol: "Encargado de Contacto con Sponsors — 4°D", foto: "img/joaquin.jpg", descripcion: "Responsable de buscar y coordinar auspiciadores para los premios de la rifa." },
    { nombre: "Martina López", rol: "Supervisora de Calidad — 4°D", foto: "img/martina.jpg", descripcion: "Encargada de revisar que todo el proceso de la rifa se realice de forma transparente." }
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
    numerosOcupados: JSON.parse(localStorage.getItem('rifa_1_numeros')) || [],
    fechaSorteo: null, 
    ganador: null, 
    }
];

function renderizarCatalogo() {
    const divcatalogo = document.getElementById('catalogo');
    if (!divcatalogo) return;

    divcatalogo.innerHTML = '';

    rifas.forEach(rifa => {
        const disponibles = rifa.stockTotal - rifa.numerosOcupados.length;
        let htmlNumeros = '';
        for (let i = 1; i <= rifa.stockTotal; i++) {
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
                <button class="boton-comprar" data-id="${rifa.id}" ${disponibles === 0 ? 'disabled' : ''}>
                    ${disponibles === 0 ? 'Agotado' : 'Comprar'}
                </button>
            </div>`;
    });

    document.querySelectorAll('.boton-comprar').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.getAttribute('data-id'));
            const rifa = rifas.find(r => r.id === id);
            if (rifa) {
                comprarBoleto(rifa);
            }
        });
    });
}

function comprarBoleto(rifa) {
    const numerosLibres = [];
    for (let i = 1; i <= rifa.stockTotal; i++) {
        if (!rifa.numerosOcupados.includes(i)) {
            numerosLibres.push(i);
        }
    }

    if (numerosLibres.length === 0) return;

    const indiceAleatorio = Math.floor(Math.random() * numerosLibres.length);
    const numeroElegido = numerosLibres[indiceAleatorio];

    rifa.numerosOcupados.push(numeroElegido);

    localStorage.setItem(`rifa_${rifa.id}_numeros`, JSON.stringify(rifa.numerosOcupados));
    localStorage.setItem('compraActiva', JSON.stringify({ rifa: rifa.nombre, numero: numeroElegido }));

    renderizarCatalogo();
}

renderizarCatalogo();

// Barra de estado (solo se activa si existe el contenedor, o sea, solo en index.html)
const divEstado = document.getElementById('barra-estado');
if (divEstado) {
    const compra = JSON.parse(localStorage.getItem('compraActiva'));
    if (compra) {
        divEstado.innerHTML = `
            <p class="alerta-compra">
                🎟️ Ya hay boletos comprados: <strong>${compra.rifa}</strong> — Último número asignado: ${compra.numero}
            </p>`;
    }
}

// Validación del formulario de contacto
const formContacto = document.getElementById('contacto-form');
if (formContacto) {
    formContacto.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        const divErrores = document.getElementById('errores-contacto');

        let errores = [];

        if (nombre.length === 0) {
            errores.push('El nombre no puede estar vacío.');
        }
        if (email.length === 0) {
            errores.push('El email no puede estar vacío.');
        }
        if (mensaje.length === 0) {
            errores.push('El mensaje no puede estar vacío.');
        }
        if (mensaje.length > 0 && mensaje.length < 10) {
            errores.push('El mensaje debe tener al menos 10 caracteres.');
        }

        if (errores.length > 0) {
            divErrores.innerHTML = errores.map(err => `<p class="error">${err}</p>`).join('');
        } else {
            divErrores.innerHTML = `<p class="exito">¡Mensaje enviado correctamente!</p>`;
            formContacto.reset();
        }
    });
}

// Login administrador
const formLogin = document.getElementById('login-form');
if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const usuario = document.getElementById('usuario-login').value.trim();
        const clave = document.getElementById('clave-login').value.trim();
        const errorLogin = document.getElementById('error-login');

        if (usuario === 'admin' && clave === '1234') {
            errorLogin.innerHTML = '';
            formContacto.style.display = 'none';
            formLogin.style.display = 'none';
            mostrarPanelAdmin();
        } else {
            errorLogin.innerHTML = `<p class="error">Usuario o contraseña incorrectos.</p>`;
        }
    });
}

function mostrarPanelAdmin() {
    const panel = document.getElementById('panel-admin');
    panel.style.display = 'block';

    const rifa = rifas[0];
    let filas = '';
    rifa.numerosOcupados.forEach(numero => {
        filas += `<tr><td>${numero}</td><td>${rifa.nombre}</td></tr>`;
    });

    panel.innerHTML = `
        <h3>Panel de Administración</h3>
        <p class="exito">Bienvenido, Administrador</p>
        <table border="1">
            <thead>
                <tr><th>Número comprado</th><th>Rifa</th></tr>
            </thead>
            <tbody>
                ${filas.length > 0 ? filas : '<tr><td colspan="2">Sin compras registradas todavía.</td></tr>'}
            </tbody>
        </table>`;
}

// Finanzas: costos fijos + calculadora de Google Ads
const costoDominio = 11828;
const costoHosting = 26061;
const costoCapitalHumano = 3000 * 20;

const subtotalFijo = document.getElementById('subtotal-fijo');
if (subtotalFijo) {
    const totalFijo = costoDominio + costoHosting + costoCapitalHumano;
    subtotalFijo.innerHTML = `<strong>Subtotal (Dominio + Hosting + Capital Humano): $${totalFijo.toLocaleString()} CLP</strong>`;
}

const formAds = document.getElementById('calculadora-ads');
if (formAds) {
    formAds.addEventListener('submit', (e) => {
        e.preventDefault();

        const cpcInput = document.getElementById('cpc').value.trim();
        const clicsInput = document.getElementById('clics').value.trim();
        const errorAds = document.getElementById('error-ads');
        const resultadoAds = document.getElementById('resultado-ads');
        const costoTotalDiv = document.getElementById('costo-total');

        if (cpcInput.length === 0 || clicsInput.length === 0) {
            errorAds.innerHTML = `<p class="error">Debes ingresar ambos valores.</p>`;
            return;
        }

        const cpc = Number(cpcInput);
        const clics = Number(clicsInput);

        if (isNaN(cpc) || isNaN(clics)) {
            errorAds.innerHTML = `<p class="error">Los valores deben ser numéricos.</p>`;
            return;
        }

        errorAds.innerHTML = '';

        const costoAds = cpc * clics;
        resultadoAds.innerHTML = `<p>Costo mensual de la campaña: <strong>$${costoAds.toLocaleString()} CLP</strong></p>`;

        if (costoAds > 50000) {
            resultadoAds.innerHTML += `
                <p class="advertencia-ads">⚠️ Presupuesto de marketing alto para fase de lanzamiento</p>
                <button class="cta-ads">¡Adquiere esta campaña ahora!</button>`;
        }
        // Dentro del listener del formulario de Ads, justo donde generas el botón,
        // después de la línea que arma el innerHTML con el botón .cta-ads, agrega:
        const botonCta = document.querySelector('.cta-ads');
        if (botonCta) {
            botonCta.addEventListener('click', () => {
                resultadoAds.innerHTML += `<p class="exito">¡Gracias! Te contactaremos para coordinar tu campaña de Google Ads.</p>`;
            });
        }

        const totalFijo = costoDominio + costoHosting + costoCapitalHumano;
        const costoTotal = totalFijo + costoAds;
        costoTotalDiv.innerHTML = `<h3>Costo Total del Proyecto: $${costoTotal.toLocaleString()} CLP</h3>`;
    });
}

