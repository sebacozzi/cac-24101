let indicePagina = 1;
let datos;

async function cargaAPI(url) {
    const respuesta = await fetch(url);
    datos = await respuesta.json();
}

async function obtenerDatos() {
    const url ='https://rickandmortyapi.com/api/character?page=1';
    await cargaAPI(url);
     
     mostrarDatos();
}


function mostrarDatos() {
    document.getElementById('respuesta').innerHTML = '';
    chequearBotones();
    datos.results.forEach(pers => {
        document.getElementById('respuesta').innerHTML += carta(pers.name, pers.id, pers.image, pers.status, pers.species);
    });
}


function chequearBotones() {
    document.getElementById('siguiente').disabled = datos.info.next == null;
        document.getElementById('anterior').disabled = datos.info.prev == null;
}

function carta(nombre, id, urlImg, estado,especie) {
    return `<div class="card" style="width: 18rem; margin:10px;">
        <img class="card-img-top" src="${urlImg}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${nombre} (${id})</h5>
                <p class="card-text">Estado: ${estado=='Alive'?'Vivo':estado=='Dead'? 'Muerto':'Desconocido'}.</p>
                <p class="card-text">Especie: ${especie=='Human'?'Humano':estado=='Alien'? 'Alien':'Desconocido'}.</p>

                <!--<a href="#" class="btn btn-primary">Go somewhere</a>-->
            </div>
    </div>`
}

async function botonSiguiente(ev) {
        if (datos.info.next){
            indicePagina ++;
            const url = datos.info.next;
            await cargaAPI(url);
        }
            mostrarDatos();
}

async function botonAnterior(ev){
    if (datos.info.prev){
        indicePagina --;
        const url = datos.info.prev;
        await cargaAPI(url);
    }
        mostrarDatos();
}

document.getElementById('anterior').addEventListener('click',botonAnterior);
document.getElementById('siguiente').addEventListener('click',botonSiguiente);
