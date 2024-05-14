//ejercicios.js

function ingresarNumero() {
    let valor;

    do {
        valor = obtenerValor();
    } while (!validarRango(valor, 1, 10));


    resultado(valor);

};

function validarRango(numero, desde, hasta) {
    return numero >= desde && numero <= hasta;
};

function obtenerValor() {
    let valor = -1;
    do {
        valor = Number(prompt("ingresar Numero"));
    } while (!valor);
    return valor;
};

function resultado(valor) {
    const resultado = document.getElementById('resultado1');
    resultado.innerText = "";

    for (let i = 1; i <= 10; i++) {
        resultado.innerText = resultado.innerText + `${valor} x ${i} = ${valor * i}\n`;
    };
};