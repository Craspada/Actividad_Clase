const botonMenu = document.getElementById('boton_menu');
const nav = document.querySelector('nav');

botonMenu.addEventListener('click', () => {
    nav.classList.toggle('nav-activo');
});