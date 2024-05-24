const user = JSON.parse(sessionStorage.getItem('user')) || {};
let paginaActiva = parseInt(sessionStorage.getItem('paginaActiva'))|| 1;
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
const defaultAclamadas = [
    {
        id: 1,
        src: './media/peli1.jpg',
        title: '',
        class: 'peli-aclamada'
    }, {
        id: 2,
        src: './media/peli2.jpg',
        title: '',
        class: 'peli-aclamada'
    },
    {
        id: 3,
        src: './media/peli3.jpg',
        title: '',
        class: 'peli-aclamada'
    },
    {
        id: 4,
        src: './media/peli4.jpg',
        title: '',
        class: 'peli-aclamada'
    },
    {
        id: 5,
        src: './media/peli5.jpg',
        title: '',
        class: 'peli-aclamada'
    },
    {
        id: 6,
        src: './media/peli6.jpg',
        title: '',
        class: 'peli-aclamada'
    },
    {
        id: 7,
        src: './media/peli7.jpg',
        title: '',
        class: 'peli-aclamada'
    },
    {
        id: 8,
        src: './media/peli8.jpg',
        title: '',
        class: 'peli-aclamada'
    },
    {
        id: 9,
        src: './media/peli9.jpg',
        title: '',
        class: 'peli-aclamada'
    },
    {
        id: 10,
        src: './media/peli10.jpg',
        title: '',
        class: 'peli-aclamada'
    }
];

const defaultTendencias =
    [
        {
            id: 1,
            src: './media/peli1.jpg',
            title: 'Halloween',
            class: 'carta'
        },
        {
            id: 2,
            src: "./media/peli2.jpg",
            title: 'Joker',
            class: 'carta'
        },
        {
            id: 3,
            src: './media/peli3.jpg',
            title: 'Rocky III',
            class: 'carta'
        },
        {
            id: 4,
            src: './media/peli4.jpg',
            title: 'Guardianes de la galaxia - Vol. 2',
            class: 'carta'
        },
        {
            id: 5,
            src: './media/peli5.jpg',
            title: 'Indiana Jones y la ultima cruzada',
            class: 'carta'
        },
        {
            id: 6,
            src: './media/peli6.jpg',
            title: 'Volver al futuro',
            class: 'carta'
        },
        {
            id: 7,
            src: './media/peli7.jpg',
            title: 'La vida es bella',
            class: 'carta'
        },
        {
            id: 8,
            src: './media/peli8.jpg',
            title: 'Forrest Gump',
            class: 'carta'
        },
        {
            id: 9,
            src: './media/peli9.jpg',
            title: 'The hangover',
            class: 'carta'
        },
        {
            id: 10,
            src: './media/peli10.jpg',
            title: 'Tiburón',
            class: 'carta'
        }
    ]

function logueado() {

    return user.email;
}

function detalle(id) {
    if (!logueado()) {
        loguearse();
        return;
    } else {
        user = JSON.parse(sessionStorage.getItem('user'));
    }
}

async function cargarPagina(){
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
        botonSiguiente.disabled =true;
        document.querySelector('#n-pagina').innerHTML ='';
        return;
    }

    
    await apiTendencias(paginaActiva);
    
    listaTendencias.results.forEach(peli => {
        tendencias.innerHTML = tendencias.innerHTML + insertaCarta('carta', urlImagen + peli.poster_path, peli.title, peli.id, 'tendencia')
    });

    await apiAclamadas();

    for (let index = 0; index < 15; index++) {
        aclamadas.innerHTML = aclamadas.innerHTML + insertaCarta('peli-aclamada',urlImagen + listaAclamadas.results[index].poster_path,'',listaAclamadas.results[index].id,'aclamada');
        
    }
    

    enableBotones();
}

window.onload = cargarPagina;

let listaTendencias;
let listaAclamadas;
const urlImagen = 'https://image.tmdb.org/t/p/w500/';

async function apiTendencias(pagina) {

    await fetch(`https://api.themoviedb.org/3/movie/popular?language=es&page=${pagina}`, options)
        .then(response => response.json())
        .then(response => listaTendencias = response)
        .catch(err => console.error(err));

}

function enableBotones() {
    botonAnterior.disabled = listaTendencias.page === 1;
    botonSiguiente.disabled = listaTendencias.page === listaTendencias.total_pages;
    document.querySelector('#n-pagina').innerHTML = listaTendencias.page + ' de ' + listaTendencias.total_pages;
    sessionStorage.setItem('paginaActiva',paginaActiva);
    
    window.scroll(0,document.getElementById('buscar').offsetTop);
}

botonSiguiente.addEventListener('click', paginaSiguiente);
botonAnterior.addEventListener('click', paginaAnterior);

async function paginaSiguiente() {
    paginaActiva = paginaActiva + 1 ;
    tendencias.innerHTML='';
    await apiTendencias(paginaActiva);

    listaTendencias.results.forEach(peli => {
        tendencias.innerHTML = tendencias.innerHTML + insertaCarta('carta', urlImagen + peli.poster_path, peli.title, peli.id, 'tendencia')
    });

    enableBotones();
}

async function paginaAnterior() {
    paginaActiva = paginaActiva - 1;
    tendencias.innerHTML='';
    await apiTendencias(paginaActiva);
    listaTendencias.results.forEach(peli => {
        tendencias.innerHTML = tendencias.innerHTML + insertaCarta('carta', urlImagen + peli.poster_path, peli.title, peli.id, 'tendencia')
    });
    
    enableBotones()
}


async function apiAclamadas(){
    await fetch('https://api.themoviedb.org/3/movie/top_rated?language=es&page=1', options)
    .then(response => response.json())
    .then(response => listaAclamadas=response)
    .catch(err => console.error(err));
}
