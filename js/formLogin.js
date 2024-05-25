

const botonLogin=document.querySelector('#boton-login');

botonLogin.addEventListener('click', iniciarLogin);
let usuario;
let pass;
const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

function iniciarLogin() {
    if (logueado()){
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('paginaActiva');
        user.email ='';
        cargarPagina();
        botonLogin.innerHTML='Iniciar Sesión';
        return;
    }
    document.querySelector("#flogin").innerHTML= formulario;
 
     usuario = document.querySelector('#email');
     pass = document.querySelector('#contrasenia');

    document.querySelector('body').style.overflow = 'hidden';
    
}


function cerrarLogin() {

    document.querySelector("#flogin").innerHTML = '';
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

    user.email = email;
    user.pass = password;
    user.nombreMostrar = email.split('@')[0];

    console.log(user);
    mostrarUsuario();


    sessionStorage.setItem('user', JSON.stringify(user));
}

function mostrarUsuario(){
    document.querySelector('#usuario-logueado').innerHTML = logueado()? `<b>Hola</b> ${user.nombreMostrar}!!`:'¡Inicia sesión!';
    botonLogin.innerHTML=logueado()?'Cerrar Sesión':'Iniciar Sesión';
}