function check() {

    if (sessionStorage.getItem('token') == null) {
        location.href = '../index.html';
        alert('usuario no logueado.');
    }
}