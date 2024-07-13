const botonCerrarSesion = document.getElementById('boton-login');

botonCerrarSesion.addEventListener('click', cerrarSesion);

document.getElementById('info-login').innerHTML = `<b>${rol()}</b> ${sessionStorage.getItem('nombre')} ${sessionStorage.getItem('apellido')} `;

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

function cerrarSesion() {
    location.href = '../auth.html';
}

