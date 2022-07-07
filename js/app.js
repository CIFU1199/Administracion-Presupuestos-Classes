// Variables y selectorea 
const formulario = document.querySelector('#agregar-gasto');

const gastoListado = document.querySelector('gastos ul');

// eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}

//classes
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

class UI{

}
//Instanciar 
const ui = new UI();

let presupuesto;

//Funciones 

function preguntarPresupuesto(){
    const presupuestoUser = prompt('¿Cual es tu presupuesto?');

    //console.log(Number(presupuestoUser));

    if (presupuestoUser ==='' || presupuestoUser === null || isNaN(presupuestoUser) || presupuestoUser <= 0){
        window.location.reload();
    }

    //Presupuesto valido 
    presupuesto = new Presupuesto(presupuestoUser);
    console.log(presupuesto);
}