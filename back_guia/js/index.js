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
     let indiHTML="";
     console.log (indice)
     for (const val in (await (await fetch("json/indices.json")).json())) {
        console.log(val.title)
    } 
        indice.parte1.subs.map(val=> {
        console.log(val)
        indiHTML +=`<h3>${val.title}</h3>`;
        indiHTML += load(val.subs,"");
    })
    document.getElementById('nindice').innerHTML = indiHTML;
}



window.addEventListener('load', cargarIndice);