const turnos = (JSON.parse(localStorage.getItem('listado')) || []);


function getDNI() {
    const dni = document.getElementById('dni').value;

    document.getElementById('dni').value = '';
    document.getElementById('dni').focus();
    return dni.trim();

}

function sacarTurno(tipo) {

    const dni = getDNI();

    if (dni === '') { return; };


    turnos.push(creaTurno(dni, tipo));

    guardar(turnos)
}

function creaTurno(dni, tipo) {
    return { dni: dni, tipo: tipo };
}



function listarTurnos(turnos) {

    document.getElementById('turnos').innerHTML = "";
    document.getElementById('atendidos').innerHTML = "";
    document.getElementById('terminados').innerHTML = "";


    for (const turno of turnos) {
        if (turno.fechainicio == null) {
            agregarProgreso('turnos', turno.dni, turno.tipo, 'atender');
        } else if (turno.fechafin == null) {
            agregarProgreso('atendidos', turno.dni, turno.tipo, 'terminar');
        } else {
            agregarProgreso('terminados', turno.dni, turno.tipo);
            /*  document.getElementById('terminados').innerHTML += `<li>${turno.dni} - ${turno.tipo} - Ya fue atendido</li>`; */
        }
    }
}

function agregarProgreso(listado, dni, tipo, nombrefuncion) {
    console.log(tipo);
    document.getElementById(listado).innerHTML += `<li>${dni} - ${tipo} - 
       ${nombrefuncion ? ` <a href="#" onclick="${nombrefuncion}(${dni})">${nombrefuncion}</a></li>` : 'Ya fue atendido'}`;

}


function atender(dni) {

    const turno = turnos.find(t => t.dni == dni);
    turno.fechainicio = Date.now();
    guardar(turnos);
}

function terminar(dni) {

    const turno = turnos.find(t => t.dni == dni);
    turno.fechafin = Date.now();
    guardar(turnos);

}

function guardar(turnos) {
    localStorage.setItem('listado', JSON.stringify(turnos));
    listarTurnos(turnos);
}

listarTurnos(turnos);
