//Script generar datos

const botonGenerar = document.querySelector('#generar');
const bDescarga = document.querySelector('#descargar');

const insertUsuarios = document.querySelector('#insert_usuarios');
const insertDirectores = document.querySelector('#insert_directores');
const insertPeliculas = document.querySelector('#insert_movies');

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
function convertirFecha(fecha) {
    return fecha.split('T')[0];
}

function enProceso(texto) {
    const puntos = texto.split(' ').at(-1);
    const msg = texto.replace(puntos, '');
    let nPuntos = '';

    if (puntos.length > 5) {
        nPuntos = '.'
    } else {
        for (let i = 0; i < puntos.length + 1; i++) {
            nPuntos += '.';

        }
    }

    return msg + nPuntos + '\n';
}

function pelicula(nombre, descripcion, genero, calificacion, anio, estrellas, id_director) {
    return `("${nombre}", "${descripcion}", "${genero}", "${calificacion}", "${anio}", "${estrellas}", "${id_director}")`;
}

function usuarioAString(usuario) {
    return `("${usuario.name.first}","${usuario.name.last}","${usuario.email}","${convertirFecha(usuario.dob.date)}","${usuario.location.country}")`;
}

async function generar(ev) {
    window.scroll(0, 1500);
    const contDirectores = parseInt(document.querySelector('#count-directores').value);
    const contPelis = parseInt(document.querySelector('#count-peliculas').value);
    const contUsuarios = parseInt(document.querySelector('#count-usuarios').value);


    let listaUsuarios = [];
    let listaDirectores = [];

    insertUsuarios.innerHTML = 'Generando Usuarios...\n';

    const usuarios = await generarDatosUsuarios(contUsuarios);

    for (const usuario of usuarios.results) {
        listaUsuarios.push(usuarioAString(usuario));
    }

    insertUsuarios.innerHTML = `INSERT INTO usuarios(nombre,apellido,email,fecha_nac,pais) VAULES (\n\t${listaUsuarios.join(', \n\t')});\n`;
    window.scroll(0, 1500);
    insertPeliculas.innerHTML = 'Generando Peliculas ....\n'
    let listaPeliculas = await generarListaPeliculas(contPelis, listaDirectores);

    insertPeliculas.innerHTML = `INSERT INTO movies(nombre,descripcion,genero,calificacion,anio,estrellas,director) VALUES (\n\t${listaPeliculas.join(',\n\t')});\n`;
    insertDirectores.innerHTML = 'Generando Directores ....\n'
    while (listaDirectores.length < contDirectores) {
        {
            insertDirectores.innerHTML = enProceso(insertDirectores.innerHTML);
            const texto = await detalleDirector(parseInt(Math.random() * 25000 + 1));
            if (texto != '') {
                listaDirectores.push({ id: listaDirectores.length + 1, texto: texto });
            }
        }
    }

    insertDirectores.innerHTML = `INSERT INTO directores(nombre,apellido,edad,nacionalidad) VALUES (\n\t${listaDirectores.map(v => v.texto).join(',\n\t')});\n`;
    console.clear();
    window.scroll(0, 1500);
}

// apis

async function generarListaPeliculas(count, listaDirectores) {
    let lista = count;

    let result = [];
    while (result.length < lista) {
        const id = parseInt(Math.random() * 25000 + 1);
        await fetch(`https://api.themoviedb.org/3/movie/${id}?language=es`, options)
            .then(response => response.json())
            .then(async response => {
                insertPeliculas.innerHTML = enProceso(insertPeliculas.innerHTML);
                if (response.status_code != 34 ) {
                    if ( response.overview != ''){
                    const texto = await directorDePelicula(id);
                    if (texto != '') {
                        listaDirectores.push({ id: listaDirectores.length + 1, texto: texto })
                        result.push(pelicula(response.title, response.overview, response.genres[0].name, response.vote_average, response.release_date, parseInt(response.vote_average / 2), listaDirectores[listaDirectores.length - 1].id));
                    };
                }
                }
            })
            .catch(err => console.error('id: ', id, '  --  ', err));
    }
    return result;
}

async function detalleDirector(id) {
    let result = '';
    await fetch(`https://api.themoviedb.org/3/person/${id}`, options)
        .then(response => response.json())
        .then(response => {
            if (response.status_code != 34) {
                if (response.birthday && !response.deathday && response.place_of_birth) {
                    const nombre = response.name.split(' ')[0].trim();
                    const apellido = response.name.replace(nombre + ' ', '').trim();
                    const edad = (new Date().getFullYear()) - parseInt(response.birthday.split('-')[0]);
                    const nacionalidad = response.place_of_birth.split(',').at(-1).trim();
                    result = `("${nombre}","${apellido}","${edad}","${nacionalidad}")`;
                }
            }
        })
        .catch(err => console.error(err));


    return result;
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
    await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=es`, options)
        .then(response => response.json())
        .then(response => {
            response.crew.forEach(element => {
                if (element.job == "Director") {
                    result = element.id
                };
            });
        });
    return result;
}

async function directorDePelicula(id) {
    const idDirector = await detallePelicula(id);
    return await detalleDirector(idDirector);
}
