function load(valor,ref){
    if(valor.length ==0 )return "";
    let result ='<ul>\n';
    valor.map(val=>{
        result += `<li><a href=#${ref}${ref?'-':''}${val.ref}>${val.title}</a> ${load(val.subs,val.ref)}\n</li>`;
    })
    result +='</ul>';
    return result;
}


function cargarIndice (){
    const indi = load(indice,"");
    document.getElementById('nindice').innerHTML=indi;
}

window.addEventListener('load',cargarIndice);