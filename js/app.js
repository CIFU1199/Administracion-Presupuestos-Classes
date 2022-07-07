// Variables y selectorea 
const formulario = document.querySelector('#agregar-gasto');

const gastoListado = document.querySelector('gastos ul');

// eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}

//classes


//Funciones 

function preguntarPresupuesto(){
    const presupuestoUser = prompt('¿Cual es tu presupuesto?');

    console.log(Number(presupuestoUser));

    if (presupuestoUser ==='' || presupuestoUser === null || isNaN(presupuestoUser)){
        window.location.reload();
    }
}