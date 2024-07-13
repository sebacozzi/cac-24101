let indicePagina = 1;
let pelis;
let directores;
let usuarios;

async function cargaAPI(url) {
    const respuesta = await fetch(url);
    console.log(await respuesta.body);
    return await respuesta.json();
}

async function obtenerDatos() {

    //const url ='https://rickandmortyapi.com/api/character?page=1';
    //const url = 'https://reqres.in/api/users?page=1';
    const urlPelis = 'http://127.0.0.1/webapp/peliculas/all';
    //const urlPelis = 'https://api.genesrincon.net.ar/webapp/peliculas/all';
    const urlDirectores = 'https://api.genesrincon.net.ar/webapp/directores/all';
    const urlUsuarios = 'https://api.genesrincon.net.ar/webapp/usuarios/all';
    pelis = await cargaAPI(urlPelis);
    //directores = await cargaAPI(urlDirectores);
    //usuarios= await cargaAPI(urlUsuarios);

    mostrarDatos();
}


function mostrarDatos() {
    document.getElementById('respuesta').innerHTML = '';
    chequearBotones();
    console.log('Pelis: ', pelis);
    let tabla = `<table border="1"> 
        <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Genero</th>
            <th>Año</th>
            <th>Calificación</th>
            <th>Estrellas</th>
            <th>idDirector</th>
        </tr>
        </thead>
        <tbody>
        `;


    pelis.result.forEach(pers => {
        tabla += `<tr>
            <td>${pers.id_movie}</td>
            <td>${pers.nombre}</td>
            <td>${pers.descripcion}</td>
            <td>${pers.genero}</td>
            <td>${pers.anio}</td>
            <td>${pers.calificacion}</td>
            <td>${pers.estrellas}</td>
            <td>${pers.director}</td>
        </tr>
        `;

        //document.getElementById('respuesta').innerHTML += carta(pers.first_name + ' ' + pers.last_name, pers.id, pers.avatar, pers.email, "Human");
    });
    tabla += "</tbody> </table>";
    document.getElementById('respuesta').innerHTML = tabla;
}


function chequearBotones() {
    /* if (datos.info.next) return;
    document.getElementById('siguiente').disabled = datos.info.next == null;
    document.getElementById('anterior').disabled = datos.info.prev == null; */
}

function carta(nombre, id, urlImg, estado, especie) {
    return `<div class="card" style="width: 18rem; margin:10px;">
        <img class="card-img-top" src="${urlImg}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${nombre} (${id})</h5>
                <p class="card-text">Estado: ${estado /* == 'Alive' ? 'Vivo' : estado == 'Dead' ? 'Muerto' : 'Desconocido' */}.</p>
                <p class="card-text">Especie: ${especie == 'Human' ? 'Humano' : estado == 'Alien' ? 'Alien' : 'Desconocido'}.</p>

                <!--<a href="#" class="btn btn-primary">Go somewhere</a>-->
            </div>
    </div>`
}

async function botonSiguiente(ev) {
    if (datos.info.next) {
        indicePagina++;
        const url = datos.info.next;
        await cargaAPI(url);
    }
    mostrarDatos();
}

async function botonAnterior(ev) {
    if (datos.info.prev) {
        indicePagina--;
        const url = datos.info.prev;
        await cargaAPI(url);
    }
    mostrarDatos();
}

document.getElementById('anterior').addEventListener('click', botonAnterior);

document.getElementById('siguiente').addEventListener('click', botonSiguiente);
document.getElementById('login').addEventListener('click', login);
document.getElementById('check').addEventListener('click', checkToken);

function login() {
    const nUsuario = document.getElementById('nombre-usuario').value;
    const pUsuario = document.getElementById('password-usuario').value;
    iniciarSession(nUsuario, pUsuario);


}
let tok;
function iniciarSession(usuario, password) {
    const data = JSON.stringify({
        usuario,
        password
    });
    const ops = {
        method: 'post',
        body: data,
        headers: {
            'Content-Type': 'API-Key'
        },
        credentials: "same-origin"
    };
    //const url= 'https://api.genesrincon.net.ar/webapp/login';
    const url = 'http://127.0.0.1/webapp/private/login/';
    let resultado;
    fetch(url, ops)
        .then(response => response.json())
        .then(jSON => {
            console.log('Token de registro: ', jSON)
            resultado = jSON;
            document.getElementById('token').innerText += resultado.token + '\n';
            tok = resultado.token;
        });

}

function checkToken() {
    console.log('Token a chequear: ', tok);
    const data = JSON.stringify({
        Datos: "post desde el Front",
        password: "password"

    });
    const inv = document.getElementById('inv').value;
    const ops = {
        method: 'post',
        body: data,
        headers: {
            'Content-Type': 'API-Key',
            'Authorization': tok + inv
        },
        credentials: "same-origin"
    };
    //const url= 'https://api.genesrincon.net.ar/webapp/login';
    const url = 'http://127.0.0.1/webapp/peliculas/';
    let resultado;
    fetch(url, ops)
        .then(response => response.json())
        .then(jSON => {
            console.log('Test de post con token: ', jSON)
            //resultado = jSON;
            //document.getElementById('token').innerText += resultado.token + '\n';
        });
}

function crearPelicula() {
    const cuerpo = JSON.stringify(
        {
            metodo: 'POST',
            objeto: {
                nombre: document.getElementById('nombre').value,
                descripcion: document.getElementById('descripcion').value,
                genero: document.getElementById('genero').value,
                anio: document.getElementById('anio').value,
                calificacion: document.getElementById('calificacion').value,
                estrellas: document.getElementById('estrellas').value,
                director: document.getElementById('director').value,
            }
        })


    cudPeliculas(cuerpo);

}
function borrarPelicula() {
    const cuerpo = JSON.stringify(
        {
            metodo: 'DELETE',
            objeto: {
                id_movie: document.getElementById('id_pelicula_borrar').value,
                nombre: "",
                descripcion: "",
                genero: "",
                anio: 0,
                calificacion: 0,
                estrellas: 0,
                director: 0,
            }
        });

    cudPeliculas(cuerpo);

}

function cudPeliculas(cuerpo) {
    const ops = {
        method: 'post',
        body: cuerpo,
        headers: {
            'Content-Type': 'API-Key',
            'Authorization': tok
        },
        credentials: "same-origin"
    };
    //const url= 'https://api.genesrincon.net.ar/webapp/login';
    const url = 'http://127.0.0.1/webapp/peliculas/';
    let resultado;
    fetch(url, ops)
        .then(response => response.json())
        .then(jSON => {
            console.log('Test de post con token: ', jSON)
            //resultado = jSON;
            //document.getElementById('token').innerText += resultado.token + '\n';
        });
}

function buscarPelicula() {
    const id = document.getElementById('id_pelicula').value;
    const url = 'http://127.0.0.1/webapp/peliculas/' + id;

    const ops = {
        method: 'get',
        headers: {
            'Content-Type': 'API-Key',
            'Authorization': tok
        },
        credentials: "same-origin"
    };
    fetch(url)
        .then(response => response.json())
        .then(datos => {
            console.log('BuscarPelicula: ', datos)
            if (datos.count === 0) { alert('No existe la peli') }
            document.getElementById('id_movie1').value = datos.result[0].id_movie;
            document.getElementById('nombre1').value = datos.result[0].nombre;
            document.getElementById('descripcion1').value = datos.result[0].descripcion;
            document.getElementById('genero1').value = datos.result[0].genero;
            document.getElementById('calificacion1').value = datos.result[0].calificacion;
            document.getElementById('anio1').value = datos.result[0].anio;
            document.getElementById('estrellas1').value = datos.result[0].estrellas;
            document.getElementById('director1').value = datos.result[0].director;
        });
}

function modificarPelicula() {

    const cuerpo = JSON.stringify(
        {
            metodo: 'PUT',
            objeto: {
                id_movie: document.getElementById('id_movie1').value,
                nombre: document.getElementById('nombre1').value,
                descripcion: document.getElementById('descripcion1').value,
                genero: document.getElementById('genero1').value,
                anio: document.getElementById('anio1').value,
                calificacion: document.getElementById('calificacion1').value,
                estrellas: document.getElementById('estrellas1').value,
                director: document.getElementById('director1').value,
            }
        });
    cudPeliculas(cuerpo);

}

document.getElementById('urlnow').innerText = window.location;