async function auth() {
    const usuario = sessionStorage.getItem('loginUsuario');
    const password = sessionStorage.getItem('loginPassword');

    const data = JSON.stringify({
        usuario,
        password
    });

    const ops = {
        method: 'post',
        body: data,
        headers: {
            'Content-Type': 'API-Key'
        },
        credentials: "same-origin"
    };

    const url = 'https://api.genesrincon.net.ar/webapp/private/login/';
    //const url = 'http://127.0.0.1/webapp/private/login/';
    let resultado;
    let status;
    await fetch(url, ops)
        .then(response => response.json())
        .then(jSON => {

            resultado = jSON;
            if (jSON.result) {
                sessionStorage.removeItem('nombre');
                sessionStorage.removeItem('apellido');
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('roles');
                sessionStorage.removeItem('token');
                console.log('401')
            } else {
                sessionStorage.setItem('nombre', resultado.nombre);
                sessionStorage.setItem('apellido', resultado.apellido);
                sessionStorage.setItem('email', usuario)
                sessionStorage.setItem('roles', resultado.roles);
                sessionStorage.setItem('token', resultado.token);
                console.log('200')
            }
            tok = resultado.token;
        });


    sessionStorage.removeItem('loginUsuario');
    sessionStorage.removeItem('loginPassword');
    location.href = './index.html';


}