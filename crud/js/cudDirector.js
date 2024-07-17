const botonGuardarDirector = document.querySelector('#b-guarda-dire');
const botonCancelarDirector= document.querySelector('#b-cancelar-dire');

botonCancelarDirector.addEventListener('click',cancelarDirector);

function cancelarDirector(){
    borrarContenidoDirector();
}


function borrarContenidoDirector(){
    document.querySelector("#nombre-dire").value ="";
    document.querySelector("#apellido-dire").value ="";
    document.querySelector("#nacionalidad-dire").value ="";
    document.querySelector("#imagen-dire").value ="";
    document.querySelector("#edad-dire").value =40;
    document.querySelector("#id-dire").value ="";

}
function cambiarEditorDirector(){
    
    cambiarVisibilidad('#editordirector');
    
    cambiarVisibilidad('#directores');
}

function cambiarVisibilidad(idSelector){
    const d = document.querySelector(idSelector);
    if(d.className.indexOf('ocultar') !==-1){
        d.classList.add('mostrar');
        d.classList.remove('ocultar');
    } else{
        d.classList.add('mostrar');
        d.classList.remove('ocultar');
    }
}

function generarCuerpoDatos(){
    document.querySelector("#nombre-dire").value ="";
    document.querySelector("#apellido-dire").value ="";
    document.querySelector("#nacionalidad-dire").value ="";
    document.querySelector("#imagen-dire").value ="";
    document.querySelector("#edad-dire").value =40;
    const id = document.querySelector("#id-dire").value;
    const cuerpo = JSON.stringify(
        {
            metodo: id == 'nuevo' ? 'POST' : 'PUT',
            objeto: {
                id_director: id == 'nuevo' ? null : id,
                nombre:document.querySelector("#nombre-dire").value,
                apellido: document.querySelector("#apellido-dire").value,
                edad: document.querySelector("#edad-dire").value,
                nacionalidad: document.getElementById('anio-peli').value,
                url_imagen: document.getElementById('imagen-peli').value
            }
        })

}