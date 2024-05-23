
function loguearse() {
    alert('Debe loguearse para ver los detalles de la pelicula!!')
};

function insertaCarta(clase, imagen, titulo, id, categoria) {
    
    return `<div class=${clase} id=${categoria+id} onclick=detalle(${id})>
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
    return sessionStorage.getItem.user;
}

function detalle (id){
    if(!logueado()){
        loguearse();
        return;
    }
}

window.onload = () => {
    const tendencias = document.querySelector('#cartas-tendencias');
    const aclamadas = document.querySelector('#peli-aclamadas');
    aclamadas.innerHTML = '';
    tendencias.innerHTML = '';
    if (!logueado()) {

        defaultTendencias.forEach(peli => {
            tendencias.innerHTML = tendencias.innerHTML + insertaCarta(peli.class, peli.src, peli.title, peli.id,'tendencia')
        })

        defaultAclamadas.forEach(peli => {
            aclamadas.innerHTML = aclamadas.innerHTML + insertaCarta(peli.class, peli.src, peli.title, peli.id,'aclamada')
        })


    }
}

function iniciarLogin(){
    console.log('mostrar');
    document.querySelector('#fondo').classList.remove('ocultar');
    document.querySelector('#fondo').classList.add('mostrar');
}

document.querySelector('#boton-login').addEventListener('click',iniciarLogin);