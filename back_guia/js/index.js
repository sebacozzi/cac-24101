function load(valor, ref) {
    if (valor.length == 0) return "";
    let result = '<ul>\n';
    valor.map(val => {
        result += `<li><a href=#${ref}${ref ? '-' : ''}${val.ref}>${val.title}</a> ${load(val.subs, val.ref)}\n</li>`;
    })
    result += '</ul>';
    return result;
}



async function cargarIndice() {
    const indice = await (await fetch("json/indices.json")).json();
    const indi = load(indice.indice, "");
    document.getElementById('nindice').innerHTML = indi;
}



window.addEventListener('load', cargarIndice);