function check() {
    console.log(sessionStorage.getItem('token'))
    if (sessionStorage.getItem('token') == null) {
        location.href = '../index.html';
        alert('usuario no logueado.');
    }
}