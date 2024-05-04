const turnos = (JSON.parse(localStorage.getItem('listado')) || []);

function dniValido(dni) {

    if (isNaN(dni)) {
        alert('DNI ' + dni + ' es invalido.')
        return '';
    }
    return dni;

}

function resetInputDNI(){

    document.getElementById('dni').value = '';
    document.getElementById('dni').focus();

}

function getDNI() {
    const dni = document.getElementById('dni').value;

    resetInputDNI();

    return dniValido(dni);

}

function buscaDNI(dni) {

    return turnos.find(t => t.dni == dni);

}

function sacarTurno(tipo) {

    const dni = getDNI();

    if (dni === '') { return; };

    if (buscaDNI(dni)) {
        alert('el dni ya fue cargado');
        return;
    }

    turnos.push(creaTurno(dni, tipo));

    guardar(turnos)
}

function creaTurno(dni, tipo) {
    return { dni: dni, tipo: tipo };
}

function borraLista(l) {
    document.getElementById(l).innerHTML = "";
};

function limpiarListas() {

    const listas = ['turnos', 'atendidos', 'terminados'];
    listas.forEach(borraLista);

};

function listarTurnos(turnos) {

    limpiarListas();

    for (const turno of turnos) {
        if (turno.fechainicio == null) {
            agregarProgreso('turnos', turno.dni, turno.tipo, 'atender');
        } else if (turno.fechafin == null) {
            agregarProgreso('atendidos', turno.dni, turno.tipo, 'terminar');
        } else {
            agregarProgreso('terminados', turno.dni, turno.tipo);
        }
    }
}


function agregarProgreso(listado, dni, tipo, nombrefuncion) {

    document.getElementById(listado).innerHTML += `<li>${dni} - ${tipo} - 
    ${nombrefuncion ? ` <a href="#" onclick="${nombrefuncion}(${dni})">${primeraMayuscula(nombrefuncion)}</a></li>` : 'Ya fue atendido'}`;

}

function primeraMayuscula(texto) {

    return texto.charAt(0).toUpperCase() + texto.slice(1);

}

function atender(dni) {

    buscaDNI(dni).fechainicio = Date.now();
    guardar(turnos);

}

function terminar(dni) {
    
    buscaDNI(dni).fechafin = Date.now();
    guardar(turnos);

};

function guardar(turnos) {

    localStorage.setItem('listado', JSON.stringify(turnos));
    listarTurnos(turnos);

};

function limpiarTurnos() {

    turnos.splice(0, turnos.length);
    guardar(turnos);

};

listarTurnos(turnos);

