
const user = JSON.parse(sessionStorage.getItem('user')) || {};
let paginaActiva = parseInt(sessionStorage.getItem('paginaActiva')) || 1;
const botonSiguiente = document.querySelector('#siguiente');
const botonAnterior = document.querySelector('#anterior');

const tendencias = document.querySelector('#cartas-tendencias');
const aclamadas = document.querySelector('#peli-aclamadas');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTJhNWYwMWYyNDE5NjU4MzIyNjgyNTFkMmVkMzUxNiIsInN1YiI6IjY2NGQ2NDEyNzdlZDQxMTZiZjEzZWMxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wHAgiz8Ui-_jhnXCnY11VgdlT6M3IUARpmX3Pb0_KTM'
    }
};

function loguearse() {
    alert('Debe loguearse para ver los detalles de la pelicula!!')
};

function insertaCarta(clase, imagen, titulo, id, categoria) {

    return `<div class=${clase} id=${categoria + id} onclick=detalle(${id})>
    <img src='${imagen}' alt="">
    <p>${titulo}</p>
    </div>`
}

function logueado() {
    return user.email;
}

function detalle(id) {
    if (!logueado()) {
        loguearse();
        return;
    } else {
        //user = JSON.parse(sessionStorage.getItem('user'));
    }
}

async function cargarPagina() {
    aclamadas.innerHTML = '';
    tendencias.innerHTML = '';
    mostrarUsuario();
    if (!logueado()) {

        defaultTendencias.forEach(peli => {
            tendencias.innerHTML = tendencias.innerHTML + insertaCarta(peli.class, peli.src, peli.title, peli.id, 'tendencia')
        })

        defaultAclamadas.forEach(peli => {
            aclamadas.innerHTML = aclamadas.innerHTML + insertaCarta(peli.class, peli.src, peli.title, peli.id, 'aclamada')
        })
        botonAnterior.disabled = true;
        botonSiguiente.disabled = true;
        document.querySelector('#n-pagina').innerHTML = '';
        document.querySelector('#no-logueado').innerHTML= noLogueado;
        return;
    }
    document.querySelector('#no-logueado').innerHTML='';

    await apiTendencias(paginaActiva);

    listaTendencias.results.forEach(peli => {
        tendencias.innerHTML = tendencias.innerHTML + insertaCarta('carta', urlImagen + peli.poster_path, peli.title, peli.id, 'tendencia')
    });

    await apiAclamadas();




    enableBotones();
}

window.onload = cargarPagina;

let listaTendencias;
let listaAclamadas;
const urlImagen = 'https://image.tmdb.org/t/p/w500/';



function enableBotones() {
    botonAnterior.disabled = listaTendencias.page === 1;
    botonSiguiente.disabled = listaTendencias.page === listaTendencias.total_pages;
    document.querySelector('#n-pagina').innerHTML = listaTendencias.page + ' de ' + listaTendencias.total_pages;
    sessionStorage.setItem('paginaActiva', paginaActiva);
}

botonSiguiente.addEventListener('click', paginaSiguiente);
botonAnterior.addEventListener('click', paginaAnterior);

async function paginaSiguiente() {
    paginaActiva = paginaActiva + 1;

    await apiTendencias(paginaActiva);

    enableBotones();
    window.scroll(0, document.getElementById('buscar').offsetTop);
}

async function paginaAnterior() {
    paginaActiva = paginaActiva - 1;

    await apiTendencias(paginaActiva);

    enableBotones()

    window.scroll(0, document.getElementById('buscar').offsetTop);
}


