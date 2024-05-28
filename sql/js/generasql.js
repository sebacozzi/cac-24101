//Script generar datos

const botonGenerar = document.querySelector('#generar');

botonGenerar.addEventListener('click', generar);


async function generar(ev) {

    const contDirectores = parseInt(document.querySelector('#count-directores').value);
    const contPelis = parseInt(document.querySelector('#count-peliculas').value);
    const contUsuarios = parseInt(document.querySelector('#count-usuarios').value);

    console.log('directores: ', contDirectores, '; peliculas: ', contPelis, ' usuarios: ', contUsuarios)

    //const listaDirectores = await generarDatosDirector();
    let listaUsuarios = [];
    let paso = '';
    for (let i = 0; i < contUsuarios; i++) {
        paso = paso + '.';
        listaUsuarios.push(await generarDatosUsuarios(paso));
    }

    document.querySelector('#insert_usuarios').innerHTML = `INSERT INTO usuarios(nombre,apellido,email,fecha_nac,pais) VAULES (\n\t${listaUsuarios.join(', \n\t')});`;

    let listaDirectores = [];
    paso = '';
    for (let i = 0; i < contDirectores; i++) {
        paso = paso + '.';
        listaDirectores.push(await generarDatosDirector(paso));
    }


}

// apis

async function generarDatosDirector(step) {
    await fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(json => {
            document.querySelector('#insert_directores').innerHTML = 'generando directores' + step;
            console.log(json);
        })

}
async function generarDatosUsuarios(step) {
    let result;
    await fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(json => {
            document.querySelector('#insert_usuarios').innerHTML = 'generando Usuarios' + step;
            if ('IranNorwayTurkeySerbia'.includes(json.results[0].location.country)) {
                result = generarDatosUsuarios(step);
            } else {
                result =
                    `(${json.results[0].name.first},${json.results[0].name.last}, ${json.results[0].email}, ${json.results[0].dob.date}, ${json.results[0].location.country})`;
            }
        })

    return result;
}