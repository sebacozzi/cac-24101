const arraysCards = [];

function creaTarjeta(titulo, descripcion, imagen) {
    return {
        id: Math.random(),
        title: titulo,
        description: descripcion,
        imageSrc: imagen
    }
}

function main() {
    //simular la carga de datos en el array (Rest API)
    arraysCards.push(
        creaTarjeta('Mi gato Persa', 'Gato de pelo largo hermoso', './imgs/persa.jpg'),
        creaTarjeta('Mi gato Persa 2', 'Gato de pelo corto', './imgs/persa.jpg')
    );

    //llamo la funcion Cards(arrays)
    Cards(arraysCards);
}

function Cards(cards) {

    //iterar las Cards y por cada uno dibujar un Card
    for (let aCard of cards) {
        document.getElementById('cards').innerHTML += Card(aCard);
    }
}

function Card(card) {
    //console.log(card);
    return `
        <div class="card" style="width: 18rem;">
            <img src="${card.imageSrc}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <p class="card-text">${card.description}</p>
                <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                onClick="detail(${card.id})">Ver detalle</a>
            </div>
        </div>
    `;
}



function detail(id) {

    const carta = arraysCards.find(x => x.id === id);
    
    document.getElementById('exampleModalLabel').innerText = carta.title;
    document.getElementById('exampleModalContent').innerText = carta.description;

    const myModal = document.getElementById('exampleModal');

}

function limpiarFormulario() {
    document.getElementById('exampleFormControlInput1').value = '';
    document.getElementById('exampleFormControlInput2').value = '';
    document.getElementById('formFile').value = '';
}


function add() {
    const title = document.getElementById('exampleFormControlInput1').value;
    const description = document.getElementById('exampleFormControlInput2').value;
    const filename = document.getElementById('formFile');

    if (title.trim() == '') {
        alert('No se ingreso titulo');
        return;
    }
    if (description.trim() == '') {
        alert('no se ingreso Descripcion');
        return;
    }

    limpiarFormulario();

    arraysCards.push(creaTarjeta(title, description, './imgs/persa.jpg'));

    document.getElementById('cards').innerHTML += Card(arraysCards[arraysCards.length - 1]);

}


//cuando se carga la pagina se invoca
main();