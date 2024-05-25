const noLogueado =`            <section id="presentacion">
<h2>Películas y series ilimitadas<br>en un solo lugar</h2>
<p>Disfrutas donde quieras.<br> Cancelas en cualquier momento.</p>
<a href="./registro.html">Registrate
</a>
</section>`;

const defaultAclamadas = [
    {
        id: 1,
        src: './media/peli1.jpg',
        title: '',
        class: 'peli-aclamada'
    }, {
        id: 2,
        src: './media/peli2.jpg',
        title: '',
        class: 'peli-aclamada'
    },
    {
        id: 3,
        src: './media/peli3.jpg',
        title: '',
        class: 'peli-aclamada'
    },
    {
        id: 4,
        src: './media/peli4.jpg',
        title: '',
        class: 'peli-aclamada'
    },
    {
        id: 5,
        src: './media/peli5.jpg',
        title: '',
        class: 'peli-aclamada'
    },
    {
        id: 6,
        src: './media/peli6.jpg',
        title: '',
        class: 'peli-aclamada'
    },
    {
        id: 7,
        src: './media/peli7.jpg',
        title: '',
        class: 'peli-aclamada'
    },
    {
        id: 8,
        src: './media/peli8.jpg',
        title: '',
        class: 'peli-aclamada'
    },
    {
        id: 9,
        src: './media/peli9.jpg',
        title: '',
        class: 'peli-aclamada'
    },
    {
        id: 10,
        src: './media/peli10.jpg',
        title: '',
        class: 'peli-aclamada'
    }
];

const defaultTendencias =
    [
        {
            id: 1,
            src: './media/peli1.jpg',
            title: 'Halloween',
            class: 'carta'
        },
        {
            id: 2,
            src: "./media/peli2.jpg",
            title: 'Joker',
            class: 'carta'
        },
        {
            id: 3,
            src: './media/peli3.jpg',
            title: 'Rocky III',
            class: 'carta'
        },
        {
            id: 4,
            src: './media/peli4.jpg',
            title: 'Guardianes de la galaxia - Vol. 2',
            class: 'carta'
        },
        {
            id: 5,
            src: './media/peli5.jpg',
            title: 'Indiana Jones y la ultima cruzada',
            class: 'carta'
        },
        {
            id: 6,
            src: './media/peli6.jpg',
            title: 'Volver al futuro',
            class: 'carta'
        },
        {
            id: 7,
            src: './media/peli7.jpg',
            title: 'La vida es bella',
            class: 'carta'
        },
        {
            id: 8,
            src: './media/peli8.jpg',
            title: 'Forrest Gump',
            class: 'carta'
        },
        {
            id: 9,
            src: './media/peli9.jpg',
            title: 'The hangover',
            class: 'carta'
        },
        {
            id: 10,
            src: './media/peli10.jpg',
            title: 'Tiburón',
            class: 'carta'
        }
    ]

 const formulario =
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
    