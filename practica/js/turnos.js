const turnos = {
    os: 0,
    pre: 0,
    par: 0
};

function sacarTurno(tipo) {


    turnos[tipo]++;

    document.getElementById('turnos').innerHTML =
        '<li>' + turnos['os'] + ' - Obra social</li> ' +
        '<li>' + turnos['pre'] + ' - Prepaga</li>' +
        '<li>' + turnos['par'] + ' - Particular</li>';

}