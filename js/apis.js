async function apiTendencias(pagina) {
    tendencias.innerHTML = '';
    await fetch(`https://api.themoviedb.org/3/movie/popular?language=es&page=${pagina}`, options)
        .then(response => response.json())
        .then(response => {
            listaTendencias = response;

            listaTendencias.result.forEach(peli => {
                tendencias.innerHTML = tendencias.innerHTML + insertaCarta('carta', urlImagen + peli.poster_path, peli.title, peli.id, 'tendencia')
            });
        })
        .catch(err => console.error(err));

}

async function apiAclamadas() {
    aclamadas.innerHTML = '';
    await fetch('https://api.themoviedb.org/3/movie/top_rated?language=es&page=1', options)
        .then(response => response.json())
        .then(response => {
            listaAclamadas = response;
            for (let index = 0; index < 15; index++) {
                aclamadas.innerHTML = aclamadas.innerHTML + insertaCarta('peli-aclamada', urlImagen + listaAclamadas.results[index].poster_path, '', listaAclamadas.results[index].id, 'aclamada');
            }
        })
        .catch(err => console.error(err));
}