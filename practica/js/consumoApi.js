
async function cargaAPI(url) {
    let resultado;
    console.log('url antes del fetch: ', url);
    const respuesta = await fetch(url);
    return respuesta.json();
}
let datos;

async function obtenerDatos() {
    const url = document.getElementById('url').value;
    datos = await cargaAPI(url);
    document.getElementById('respuesta').innerHTML = '';

    document.getElementById('siguiente').attributes.disabled = datos.page < datos.total_page;
    //document.getElementById('anterior').attributes.disabled = datos.page === 1;
    console.log(document.getElementById('siguiente').attributes)


    datos.data.forEach(pers => {
        document.getElementById('respuesta').innerHTML += carta(pers.first_name, pers.last_name, pers.avatar, pers.email);
    });
}

function carta(nombre, apellido, urlImg, email) {
    return `<div class="card" style="width: 18rem; margin:10px;">
        <img class="card-img-top" src="${urlImg}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${nombre} ${apellido}</h5>
                <p class="card-text">${email}</p>
                <!--<a href="#" class="btn btn-primary">Go somewhere</a>-->
            </div>
    </div>`
}