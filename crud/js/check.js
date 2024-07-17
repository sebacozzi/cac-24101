function check() {
    console.log(sessionStorage.getItem('token'))
    if (sessionStorage.getItem('token') == null) {
        location.href = '../index.html';
        alert('usuario no logueado.');
    }
    console.log(sessionStorage.getItem('vence'));

    const d = sessionStorage.getItem('vence').split(" ");
    console.log(d[2] + " " + d[1] + " " + d[5] + " " + d[3] + " GMT")
    const fe = Date.parse(d[2] + " " + d[1] + " " + d[5] + " " + d[3] + " GMT");
    if (fe - Date.now() > 0) {
        location.href = '../index.html';
        sessionStorage.removeItem('nombre');
        sessionStorage.removeItem('apellido');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('roles');
        sessionStorage.removeItem('vence');
        sessionStorage.removeItem('token');
        alert('Se vencio la sesión. Debe loguearse nuevamente.');
    }


    // checkToken();
}

/* 
function checkToken() {
    tok = sessionStorage.getItem('token')
    console.log('Token a chequear: ', tok);
    const data = JSON.stringify({
        Datos: "post desde el Front",
        password: "password"

    });
    const ops = {
        method: 'post',
        body: data,
        headers: {
            'Content-Type': 'API-Key',
            'Authorization': tok
        },
        credentials: "same-origin"
    };
    const url = 'https://api.genesrincon.net.ar/webapp/peliculas/';

    let resultado;
    fetch(url, ops)
        .then(response => {
            console.log(response)
            response.json()
        })
        .then(jSON => {
            console.log('Test de post con token: ', jSON);
            //resultado = jSON;
            //document.getElementById('token').innerText += resultado.token + '\n';
        });
} */