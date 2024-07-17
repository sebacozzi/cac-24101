const botonCerrarSesion = document.getElementById('boton-login');
const tabMovies = document.querySelector('#tab-movies');
const tabDirectores = document.querySelector('#tab-directores');
const tabUsuarios = document.querySelector('#tab-usuarios');
const tabRoles = document.querySelector('#tab-roles');
const tabRolesUsuarios = document.querySelector('#tab-rolusuarios');
const tablaMovies = document.querySelector('#movies');
const tablaDirectores = document.querySelector('#direcotres');
const tablaUsuarios = document.querySelector('#usuarios');
const tablaRoles = document.querySelector('#roles');
const botonEditorCancelar = document.querySelector('#b-cancelar-peli');
const botonEditorGuardar = document.querySelector('#b-guardar-peli')
const botonCrear = document.querySelector('#crear');
let datos;
const recursos = {
    movies: 'peliculas',
    directores: 'directores',
    usuarios: 'usuarios',
    roles: 'roles',
    rolusuario: 'roles-usuarios'
}

botonCerrarSesion.addEventListener('click', cerrarSesion);
tabMovies.addEventListener('click', tabSelect);
tabDirectores.addEventListener('click', tabSelect);
tabUsuarios.addEventListener('click', tabSelect);
tabRoles.addEventListener('click', tabSelect);
tabRolesUsuarios.addEventListener('click', tabSelect);
botonEditorCancelar.addEventListener('click', cancelarMovie);
botonEditorGuardar.addEventListener('click', guardarMovie)


document.getElementById('info-login').innerHTML = `<b>${rol()}</b> ${sessionStorage.getItem('nombre')} ${sessionStorage.getItem('apellido')} `;

tabMovies.click();

function rol() {
    const roles = sessionStorage.getItem('roles');
    let resultado = "";
    if (roles.includes('1', 0)) {
        resultado = 'usuario';
    }
    if (roles.includes('2', 0)) {
        resultado = 'administrador';
    }
    if (roles.includes('3', 0)) {
        resultado = 'super admin';
    }
    return resultado;
}

async function tabSelect(ev) {
    const tabs = document.querySelector('#botones-tab');
    const botones = tabs.querySelectorAll('button');
    const tab = ev.currentTarget;
    const recurso = tab.id.substring(4);
    const tabla = document.querySelector('#' + recurso);

    botones.forEach(element => {
        element.classList.remove('activo');
        element.classList.add('no-activo');
        document.querySelector('#' + element.id.substring(4)).classList.remove('mostrar');
        document.querySelector('#' + element.id.substring(4)).classList.add('ocultar');
    });
    botonCrear.addEventListener('click', function () { creaNuevo(recursos[recurso]) })

    tab.classList.remove('no-activo')
    tab.classList.add('activo')
    tabla.classList.remove('ocultar');
    tabla.classList.add('mostrar');


    await obtenerTodosLosDatos(recursos[recurso]);
    const bod = document.getElementById('data' + recursos[recurso]);
    bod.innerHTML = '';
    console.log(datos);
    datos.result.forEach(d => bod.appendChild(cargarFila(d)));
}

function cargarFila(fila) {

    const tr = document.createElement('tr')
    for (const f in fila) {
        if (Object.hasOwnProperty.call(fila, f)) {
            const td = document.createElement('td');

            if (f.localeCompare('fecha_nac') === 0) {
                td.innerText = `${fila[f].dayOfMonth.toString().padStart(2, '0')}/${fila[f].monthValue.toString().padStart(2, '0')}/${fila[f].year}`;
            } else
                if (f.indexOf('ima') !== -1) {
                    const img = document.createElement('img');

                    img.src = fila[f];
                    img.style.height = '100px';
                    td.appendChild(img);
                } else if (f.indexOf('estre') !== -1) {
                    for (let i = 0; i < fila[f]; i++) {
                        const img = document.createElement('img');
                        img.src = './img/estrella.png';
                        img.style.height = '15px';
                        td.appendChild(img);
                    }
                } else {
                    td.innerText = fila[f];
                }
            tr.appendChild(td);
        }
    }
    const td = document.createElement('td');
    const img = document.createElement('img');
    img.src = './img/delete.png';
    img.onclick = function () { eliminar(Object.values(fila)[0]) };
    img.style.width = '30px';
    img.style.padding = '3px';
    img.style.cursor = 'pointer';
    td.appendChild(img);
    const img1 = document.createElement('img');
    img1.src = './img/edit.png';
    img1.style.padding = '3px';
    img1.style.cursor = 'pointer';
    img1.onclick = function () { editar(Object.values(fila)[0]) };
    img1.style.width = '30px';
    td.appendChild(img1);
    tr.appendChild(td)
    return tr;

}

function cerrarSesion() {
    location.href = '../auth.html';
}

function editar(id) {
    console.log('editar ', id);
    document.querySelector('#movies').classList.remove('mostrar');
    document.querySelector('#movies').classList.add('ocultar');
    editarPelicula(id)
}
async function obtenerTodosLosDatos(recurso) {
    const url = `https://api.genesrincon.net.ar/webapp/${recurso}/all`;

    await fetch(url)
        .then(resp => resp.json())
        .then(json => datos = json);

}

function getToken() {
    return sessionStorage.getItem('token');
}

async function editarPelicula(id) {

    if (id) {
        const peli = await obtenerUnDato('peliculas', id);
        const nombre = document.getElementById('nombre-peli');
        const genero = document.getElementById('genero-peli');
        const calificacion = document.getElementById('calificacion-peli');
        const anio = document.getElementById('anio-peli');
        const descripcion = document.getElementById('descripcion-peli');
        const estrellas = document.getElementById('estrellas-peli');
        const url_imagen = document.getElementById('imagen-peli');
        const id_movie = document.getElementById('id_movie')
        id_movie.value = peli.result[0].id_movie;
        nombre.value = peli.result[0].nombre;
        genero.value = peli.result[0].genero;
        calificacion.value = peli.result[0].calificacion;
        anio.value = peli.result[0].anio;
        descripcion.innerText = peli.result[0].descripcion;
        estrellas.value = peli.result[0].estrellas;
        url_imagen.value = peli.result[0].url_imagen;
        selectDirectores(peli.result[0].director);
    } else {
        selectDirectores();
    }
    document.getElementById('editormovie').classList.remove('ocultar');
    document.getElementById('editormovie').classList.add('mostrar');

}

async function eliminar(id) {
    if (!confirm(`¿Desea eliminar la pelicula Id ${id} ?`)) { return }
    const cuerpo = JSON.stringify(
        {
            metodo: 'DELETE',
            objeto: {
                id_movie: id,
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

    await obtenerTodosLosDatos('peliculas');
    const bod = document.getElementById('datapeliculas');
    bod.innerHTML = '';
    console.log(datos);
    datos.result.forEach(d => bod.appendChild(cargarFila(d)));
}

async function cudPeliculas(cuerpo) {
    //const url= 'https://api.genesrincon.net.ar/webapp/login';
    const url = 'https://api.genesrincon.net.ar/webapp/peliculas/';
    cud(cuerpo, url);
}

function cud(cuerpo, url) {
    const ops = {
        method: 'post',
        body: cuerpo,
        headers: {
            'Content-Type': 'API-Key',
            'Authorization': getToken()
        },
        credentials: "same-origin"
    };
    fetch(url, ops)
        .then(response => response.json())
        .then(jSON => {
            console.log('Test de post con token: ', jSON)
            //resultado = jSON;
            //document.getElementById('token').innerText += resultado.token + '\n';
        });
}

async function obtenerUnDato(recurso, id) {
    const url = `https://api.genesrincon.net.ar/webapp/${recurso}/${id}`;
    let temp;
    await fetch(url)
        .then(resp => resp.json())
        .then(json => {
            console.log(json);
            temp = json;
        });
    return temp;

}

async function selectDirectores(seleccionado) {

    const combo = document.getElementById('director-peli');

    await obtenerTodosLosDatos('directores');

    datos.result.forEach(d => {
        const op = document.createElement('option');
        op.value = d.id_director;
        op.innerText = `${d.id_director} - ${d.nombre} ${d.apellido}`;
        combo.appendChild(op);
    });
    console.log(seleccionado)
    if (seleccionado) {
        combo.value = seleccionado;
    }
}

function cancelarMovie() {
    document.querySelector('#movies').classList.add('mostrar');
    document.getElementById('movies').classList.remove('ocultar');
    document.getElementById('editormovie').classList.remove('mostrar');
    document.getElementById('editormovie').classList.add('ocultar');
}

async function guardarMovie() {

    const id = document.getElementById('id_movie').value;
    console.log('id en guardar: ', id)
    const cuerpo = JSON.stringify(
        {
            metodo: id == 'nuevo' ? 'POST' : 'PUT',
            objeto: {
                id_movie: id == 'nuevo' ? null : id,
                nombre: document.getElementById('nombre-peli').value,
                descripcion: document.getElementById('descripcion-peli').value,
                genero: document.getElementById('genero-peli').value,
                anio: document.getElementById('anio-peli').value,
                calificacion: document.getElementById('calificacion-peli').value,
                estrellas: document.getElementById('estrellas-peli').value,
                director: document.getElementById('director-peli').value,
                url_imagen: document.getElementById('imagen-peli').value
            }
        })
    cudPeliculas(cuerpo);

    document.getElementById('nombre-peli').value = "";
    document.getElementById('genero-peli').value = "";
    document.getElementById('calificacion-peli').value = "";
    document.getElementById('anio-peli').value = "";
    document.getElementById('descripcion-peli').value = "";
    document.getElementById('estrellas-peli').value = "";
    document.getElementById('imagen-peli').value = "";
    document.getElementById('id_movie').value = "";

    cancelarMovie();

    await obtenerTodosLosDatos('peliculas');
    const bod = document.getElementById('datapeliculas');
    bod.innerHTML = '';
    console.log(datos);
    datos.result.forEach(d => bod.appendChild(cargarFila(d)));

}

function creaNuevo(tabla) {
    if (tabla.localeCompare('peliculas') === 0) {
        document.querySelector('#movies').classList.remove('mostrar');
        document.querySelector('#movies').classList.add('ocultar');
        document.getElementById('id_movie').value = 'nuevo';
        editarPelicula(null)
    }
}

