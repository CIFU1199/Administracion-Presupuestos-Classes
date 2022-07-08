// Variables y selectorea 
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit',agregarGasto);
    
}

//classes
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        console.log(this.gastos);
    }

}

class UI{
    insertarPresupuesto(cantidad){
        //extrayendo los valores
        const{presupuesto, restante} = cantidad;
        //agregar al html 
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje , tipo){
        //crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert');

        if (tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //mensaje de error
        divMensaje.textContent = mensaje;

        //insertar en el HTML 
        document.querySelector('.primario').insertBefore(divMensaje,formulario );

        // Quitar del HTML 
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    agregarGastoListado(gastos){
        this.limpiarHTML();//elimina el html previo 

        //iterar sobre los gastos 
        gastos.forEach(gasto => {
            
            const {cantidad , nombre ,id} =gasto;

            //Crear un li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className='list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;
            

            //agregar el html del gasto 
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> ${cantidad}</span>`;
            
            // boton para borrar el gasto  
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger','borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times;'
            nuevoGasto.appendChild(btnBorrar);

            //agregar al html 

            gastoListado.appendChild(nuevoGasto);

        });
    }

    limpiarHTML(){
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }
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

    ui.insertarPresupuesto(presupuesto);
}

//añade gastos 
function agregarGasto(e){
    e.preventDefault();

    //leer los datos del formulario 
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    //validar 
    if (nombre === '' || cantidad ===''){
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    }else if (cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no valida', 'error');
        return;
    }

    //generar objeto con el gasto
    const gasto =  { nombre, cantidad, id: Date.now()} 

    //añade el presupuesto 
    presupuesto.nuevoGasto(gasto);

    // Mensaje de todo bien 
    ui.imprimirAlerta('Gasto agregado Correctamente');

    //imprimir los gastos 
    const {gastos} = presupuesto;
    ui.agregarGastoListado(gastos);

    //reinicia el formulario
    formulario.reset();

}