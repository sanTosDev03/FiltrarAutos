const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puerta = document.querySelector('#puertas');
const color = document.querySelector('#color');
const transmision = document.querySelector('#transmision');
const year = document.querySelector('#year');
const resultadoBusqueda = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10;

// Generar un Objeto con los parametros de busqueda
const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',  
    puerta : '',
    color : '',
    transmision : '',
}


document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Muestra todos los automoviles

    llenarselect();
})

marca.addEventListener('change', e => {
    const marcaValor = e.target.value;
    datosBusqueda.marca = marcaValor;

    filtarAuto();
})
year.addEventListener('change', e => {
    const yearValor = e.target.value;
    datosBusqueda.year = yearValor;
    filtarAuto();
})
minimo.addEventListener('change', e => {
    const minimoValor = e.target.value;
    datosBusqueda.minimo = minimoValor;
    filtarAuto();
})
maximo.addEventListener('change', e => {
    const maximoValor = e.target.value;
    datosBusqueda.maximo = maximoValor;  
    filtarAuto();

})
puerta.addEventListener('change', e => {
    const puertaValor = e.target.value;
    datosBusqueda.puerta = parseInt(puertaValor);
    filtarAuto();
})
color.addEventListener('change', e => {
    const colorValor = e.target.value;
    datosBusqueda.color = colorValor;
    filtarAuto();
})
transmision.addEventListener('change', e => {
    const transmisionValor = e.target.value;
    datosBusqueda.transmision = transmisionValor;
    console.log(datosBusqueda);
    filtarAuto();
})




// Muestra todos los automoviles en el HTML
function mostrarAutos(autos) {
    limpiarHTML();
    autos.forEach( auto => {
       

        const autoHTML = document.createElement('P');

        autoHTML.textContent = `
           ${auto.marca}-
           ${auto.modelo}-
           Año: ${auto.year}-
           Precio: ${auto.precio}-
           Puertas: ${auto.puertas}-
            ${auto.color}- 
            ${auto.transmision}
        `;
        
        // Insertamos en el HTML en el Div que le asignamos a resutladoBusqueda
        resultadoBusqueda.appendChild(autoHTML);

    }) 
}
function limpiarHTML() {
    while (resultadoBusqueda.firstChild) {
        resultadoBusqueda.removeChild(resultadoBusqueda.firstChild);
    }
}

// Genera los años de la selec
function llenarselect() {
    for (let index = max; index >= min; index--) {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = index;
        year.appendChild(option);
    }
}


function filtarAuto() {
    const resultadoNuevo = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTrasmicion).filter(filtrarColor);
    console.log(resultadoNuevo);

    if (resultadoNuevo.length) {
        mostrarAutos(resultadoNuevo);
    } else {
        noResultado("No existen autos con esas características");

    }

}

function noResultado(mensaje){
    limpiarHTML();
    const mensajeAlerta = document.createElement('P');
        mensajeAlerta.classList.add('vacio');
        mensajeAlerta.textContent = mensaje;
        resultadoBusqueda.appendChild(mensajeAlerta);
}

function filtrarMarca(auto) {
    if (datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    }
    return auto; // Devuelve true si no hay marca seleccionada, lo que significa que no se aplica el filtro por marca.
}
function filtrarYear(auto) {
    const year = parseInt(datosBusqueda.year);
    if(datosBusqueda.year){
        return auto.year === year;
    }
    return auto;
}
function filtrarMinimo(auto) {
    const minimo = datosBusqueda.minimo;

    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;
}
function filtrarMaximo(auto) {
    const maximo = datosBusqueda.maximo;

    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;
}
function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda ;

    if(puertas){
        return auto.puertas === puertas;
    }
    return auto;
}
function filtrarTrasmicion(auto) {
    const transmision = datosBusqueda.transmision;

    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}
function filtrarColor(auto) {
    const color = datosBusqueda.color;
    if(color){
        return auto.color === color;
    }
    return auto;
}