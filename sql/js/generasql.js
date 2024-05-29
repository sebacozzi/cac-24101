//Script generar datos

const botonGenerar = document.querySelector('#generar');
const bDescarga = document.querySelector('#descargar');
const paises = ['Argentina', 'Brasil', 'Uruguay', 'Estados Unidos', 'España', 'Mexico', 'Colombia', 'Bolivia', 'Chile', 'Francia']

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTJhNWYwMWYyNDE5NjU4MzIyNjgyNTFkMmVkMzUxNiIsInN1YiI6IjY2NGQ2NDEyNzdlZDQxMTZiZjEzZWMxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wHAgiz8Ui-_jhnXCnY11VgdlT6M3IUARpmX3Pb0_KTM'
    }
};

bDescarga.addEventListener('click', descargarSQL);

botonGenerar.addEventListener('click', generar);

function descargarSQL() {
    let sql = document.querySelectorAll('code');
    let archivo = '';
    for (let i = 0; i < sql.length; i++) {
        if (sql[i].innerHTML != '') {
            archivo = archivo + sql[i].innerHTML + '\n';
        } else {
            archivo = archivo + '/* ' + sql[i].attributes['descripcion'].value + ' no generado' + ' */\n';
        }

    }
    console.log(archivo);
    bDescarga.href = "data:application/octet-stream,"
        + encodeURIComponent(archivo);
    bDescarga.download = 'archivo.sql';

}

function randomPais() {
    return paises[parseInt(Math.random() * paises.length - 1)]
}
function pelicula(nombre, descripcion, genero, calificacion, anio, estrellas, id_director) {
    return `("${nombre}", "${descripcion}", "${genero}", "${calificacion}", "${anio}", "${estrellas}", "${id_director}")`;
}

function convertirFecha(fecha) {

    return fecha.split('T')[0];
}

function usuarioAString(usuario) {
    return `("${usuario.name.first}","${usuario.name.last}","${usuario.email}","${convertirFecha(usuario.dob.date)}","${usuario.location.country}")`;
}
async function generar(ev) {

    const contDirectores = parseInt(document.querySelector('#count-directores').value);
    const contPelis = parseInt(document.querySelector('#count-peliculas').value);
    const contUsuarios = parseInt(document.querySelector('#count-usuarios').value);
    const insertUsuarios = document.querySelector('#insert_usuarios');
    const insertDirectores = document.querySelector('#insert_usuarios');
    const insertPeliculas = document.querySelector('#insert_usuarios');

    let listaUsuarios = [];

    insertUsuarios.innerHTML = 'Generando Usuarios...';

    /*  const usuarios = await generarDatosUsuarios(contUsuarios);
 
     for (const usuario of usuarios.results) {
         listaUsuarios.push(usuarioAString(usuario));
     }
 
     insertUsuarios.innerHTML = `INSERT INTO usuarios(nombre,apellido,email,fecha_nac,pais) VAULES (\n\t${listaUsuarios.join(', \n\t')});`;
  */
    let listaPeliculas = await generarListaPeliculas(contPelis);
    console.log('listaPeliculas: ', listaPeliculas)
    insertPeliculas.innerHTML = listaPeliculas.join(',\n');
    /*   console.log(listaPeliculas)
      let peli = await detallePelicula(listaPeliculas.results[0].id);
      console.log('PELI::: ',peli);
      const director = await detalleDirector(peli.crew[0].id);
      console.log(await detalleDirector(peli.crew[0].id))//listaDirectores.results[0].id));
   */
}

// apis

async function generarListaPeliculas(count) {
    let lista = count;

    const url = `'https://api.themoviedb.org/3/find/154?external_source=imdb_id&language=es`;

    let result = [];
    while (result.length <= lista) {
        const id = parseInt(Math.random() * 25000 + 1);
        await fetch(`https://api.themoviedb.org/3/movie/${id}?language=es`, options)
            .then(response => response.json())
            .then(response => {
                if (response.status_code != 34) {

                    result.push(pelicula(response.title, response.overview, response.genres[0].name, response.vote_average, response.release_date, parseInt(response.vote_average / 2), response.id));
                    console.log('id ', id, ': ', response)
                }

            })
            .catch(err => console.error('id: ', id, '  --  ', err));
        if (count === 0) return result
    }

    return result;
}

async function detalleDirector(id) {
    let result;
    const url = `https://api.themoviedb.org/3/person/${id}`;


    await fetch(url, options)
        .then(response => response.json())
        .then(response => result = response)
        .catch(err => console.error(err));
    return result;
    /* await fetch(url)
        .then(response => response.json())
        .then(json => result = json) */

}
async function generarDatosUsuarios(count) {
    let result;
    const url = `https://randomuser.me/api/?results=${count}&nat=es,br,mx,ch,ca&inc=name,location,email,dob`;
    await fetch(url)
        .then(response => response.json())
        .then(json => result = json)

    return result;
}

async function detallePelicula(id) {
    let result;
    console.log('detalle Pelicula: ', id)

    await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=es`, options)
        .then(response => response.json())
        .then(response => result = response);
    return result;
}

