const formulario=
`<div id="formulario-login" class="mostrar">
        <div id="sombra"
            onclick="cerrarLogin()"
            style="width: 100%; height: 100%;top: 0;left: 0; z-index: 50000;background-color: rgba(0, 0, 0, 0.753); position: absolute;cursor:pointer">
        </div>

        <div class="login-modal" id="login">

            <div class="login">
                <a id="cerrar" onclick="cerrarLogin()" style="cursor: pointer;">X</a>
                <div class="form">

                    <div class="grupo-registro">
                        <input type="email" name="email" id="email" placeholder="Correo Electronico..."
                        onchange="ocultaError('#error-email')"
                        onkeydouwn="ocultaError('#error-email')">
                        <div class="error" style="visibility: hidden;" id="error-email">Email Error</div>
                    </div>
                    <div class="grupo-registro">

                        <input type="password" name="contrasenia" id="contrasenia" placeholder="Contraseña..."
                        onchange="ocultaError('#error-contrasenia')"
                        onkeydouwn="ocultaError('#error-contrasenia')">
                        <div class="error" style="visibility: hidden;" id="error-contrasenia">Contraseña error</div>
                    </div>
                    <div class="grupo-registro terminos">
                        <input type="checkbox" name="recordar" id="recordar"
                            placeholder="Recordar usuario y contraseña.">
                        <label for="recordar">Recordar usuario y contraseña.</label>

                    </div>
                    <div class="grupo-registro ">
                        <button id="iniciar-sesion"
                        onclick="iniciarSesion()">Iniciar Sesión</button>

                    </div>

                </div>
            </div>

        </div>
    </div>`;

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
    document.querySelector('#usuario-logueado').innerHTML = `BIENVENIDO ${user.nombreMostrar}!!`;
    botonLogin.innerHTML='Cerrar Sesión'
}