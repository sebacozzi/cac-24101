document.getElementsByTagName('body')[0].innerHTML = "<h1>Pruebas JavaScript <i>(Titulo agregado en JavaScript)</i></h1>" +
    document.getElementsByTagName('body')[0].innerHTML;


function asignarClick(id, funcion) {
    elemento(id).addEventListener('click', funcion);
}

const valorPorID = (id) => {
    return elemento(id).value;
}

function elemento(id) {
    return document.getElementById(id);
}

asignarClick('calcularDato', tipoDeValor);
asignarClick('calcularMayorMenor', mayorMenor);


function tipoDeValor() {

    const valor = document.getElementById("dato").value;

    if (isNaN(Number(valor))) {
        if (String(valor).toString().toUpperCase() == 'TRUE' || String(valor).toString().toUpperCase() == 'FALSE') {
            document.getElementById("resultado1").innerText = "Tipo Boolean";
        } else {
            document.getElementById("resultado1").innerText = "Tipo String";
        }
    } else {
        document.getElementById("resultado1").innerText = "Tipo Number";
    }
}

function mayorMenor() {
    
    const vA = parseFloat(valorPorID('datoA'));
    const vB = parseFloat(valorPorID('datoB'));
    const resu = elemento('resultado2');

    resu.innerText = "";
    if (vA > vB) {
        resu.innerText = 'A es Mayor que B!!!';
        return;
    }
    if (vA < vB) {
        resu.innerText = 'A es Menor que B!!!';
        return;
    }
    if (vA == vB) {
        resu.innerText = 'A es Igual que B!!!';
        return;
    }
}