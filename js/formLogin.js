

const botonLogin = document.querySelector('#boton-login');

botonLogin.addEventListener('click', iniciarLogin);
let usuario;
let pass;
const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

function iniciarLogin() {
    if (logueado()) {

        sessionStorage.removeItem('paginaActiva');

        sessionStorage.removeItem('nombre');
        sessionStorage.removeItem('apellido');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('roles');
        sessionStorage.removeItem('token');
        cargarPagina();
        botonLogin.innerHTML = 'Iniciar Sesión';
        return;
    }
    document.querySelector("#flogin").innerHTML = formulario;
    console.log('loguear')
    usuario = document.querySelector('#email');
    pass = document.querySelector('#contrasenia');

    document.querySelector('body').style.overflow = 'hidden';

}


function cerrarLogin() {

    document.querySelector("#flogin").innerHTML = '';
    document.querySelector("#flogin").style.innerHTML = '';
    document.querySelector('body').style.overflow = 'auto';

}

function ocultaError(selector) {
    document.querySelector(selector).style.visibility = 'hidden'
}
function mostrarError(selector) {
    document.querySelector(selector).style.visibility = 'visible';
};

function validarEmail(selector, valor) {

    if (!valor) {
        document.querySelector(selector).innerHTML = 'El correo electronico está vacio.'
        return false;
    }
    console.log(valor);
    if (!emailRegex.test(valor)) {
        document.querySelector(selector).innerHTML = 'El correo electronico es incorrecto.'
        return false;
    }

    return true;
}

function validarPass(selector, valor) {
    if (!valor) {
        document.querySelector(selector).innerHTML = 'La contraseña no debe estar vacia.'
        return false;
    }

    if (valor.length < 6) {
        document.querySelector(selector).innerHTML = 'La contraseña debe ser mayor de 6 caracteres.'
        return false;
    }

    return true;
}

function checkValor(selector, valido) {
    if (valido) {
        ocultaError(selector);
    } else {
        mostrarError(selector);
    }

}

function puedeContinuar() {
    return document.querySelector('#error-email').style.visibility == 'visible' || document.querySelector('#error-contrasenia').style.visibility == 'visible';
}

function iniciarSesion() {

    checkValor('#error-email', validarEmail('#error-email', usuario.value));
    checkValor('#error-contrasenia', validarPass('#error-contrasenia', pass.value));

    if (puedeContinuar()) {
        return;
    }

    guardaSesion(usuario.value, pass.value);

    cerrarLogin();
    cargarPagina();
}

function guardaSesion(email, password) {

    sessionStorage.setItem('loginUsuario', email);
    sessionStorage.setItem('loginPassword', password);

    location.href = "./auth.html";



}

function mostrarUsuario() {
    document.querySelector('#usuario-logueado').innerHTML = logueado() ? `<b>Hola ${rol()}</b> ${user.nombre} ${user.apellido}!!` : '¡Inicia sesión!';
    botonLogin.innerHTML = logueado() ? 'Cerrar Sesión' : 'Iniciar Sesión';
}

function rol() {
    const roles = sessionStorage.getItem('roles');
    let resultado = "";
    if (roles.includes('1', 0)) {
        resultado = 'usuario';
    }
    if (roles.includes('2', 0)) {
        resultado = 'administrador';
    }
    if (roles.includes('3', 0)) {
        resultado = 'super admin';
    }
    return resultado;
}