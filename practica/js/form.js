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

asignarClick('calcularSiMayor', verifiMayor);

function verifiMayor() {
    const edad = parseInt(valorPorID('edad'));
    const esMayor = (edad) => { return edad >= 18 };
    const resu = elemento('resultado3');
    if (isNaN(edad)) {
        alert('No se ha ingresado una edad!!!!!!!!!!');
        return;
    }
    if (esMayor(edad)) {
        resu.innerText = 'Es mayor de edad';
    } else {
        resu.innerText = 'Es menor de edad';
    }
}

asignarClick('agregarNum', agregaALista)

const lista = [];

function agregaALista() {
    const valor = parseInt(valorPorID('numero'));
    if (isNaN(valor)) {
        alert('"' + valorPorID('numero') + '" no es número!');
        return;
    }

    lista.push(valor);

    elemento('lista1').innerText = lista.toString();
    elemento('numero').value = "";
}

asignarClick('buscaMayor', buscaMayor);



function buscaMayor() {
    let mayor = undefined;

    const resu = elemento('resultado4');

    if (lista.length) {
        if (lista.length == 1) {
            resu.innerText = 'La lista tiene 1 solo dato y es ' + lista[0];
        } else {
            mayor = lista[0];
            lista.forEach((v) => { if (v > mayor) { mayor = v } });
            resu.innerText = 'El mayor de la lista es ' + mayor;
        }
    } else {
        alert('La lista está vacia');
    }
}

asignarClick('buscaMenor', buscaMenor);