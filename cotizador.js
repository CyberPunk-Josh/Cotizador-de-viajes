// cotizador de viaje:
// se deben recolectar los datos del formulario.
function cotizador(personas, origen, viaje, tipo){
    this.personas = personas;
    this.origen = origen;
    this.viaje = viaje;
    this.tipo = tipo;
}


//Interfaz de usuario:
function Interfaz() {}


// Event Listener
const formulario = document.getElementById('cotiza-viaje');
formulario.addEventListener('submit', function(e){
    e.preventDefault();
    // acceder a las personas seleccionada:
    const personas = document.getElementById('personas');
    const personasSeleccionadas = personas.options[personas.selectedIndex].value;
    // console.log(personasSeleccionadas);
    // Acceder al origen seleccionado:
    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;
    // console.log(origenSeleccionado);
    // Aceder al origen seleccionado:
    const viaje = document.getElementById('destino');
    const destinoSeleccionado = viaje.options[viaje.selectedIndex].value;
    // console.log("destino: " + destinoSeleccionado);
    //Leer el valor del radio-button.
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    // console.log(tipo);
   
    //Crear Instancia de Interfaz:
    const interfaz = new Interfaz();

    //Revisando que los campos no esten vacios:
    if(personasSeleccionadas === "" || origenSeleccionado === "" || destinoSeleccionado === "" || tipo === ""){
        //Interfza imprimiendo error:
        // alert('Error');
        interfaz.mostrarError('Faltan datos, revisa el formulario', 'error'); //Esto se carga en la seccion de interfaz
    }else{
        // limpiar los resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if (resultados != null){
            resultados.remove();
        }
        // instanciar seguro y mostrar interfaz:
        const seguro = new cotizador(personasSeleccionadas, origenSeleccionado, destinoSeleccionado, tipo);
        // cotizar el viaje:
        const cantidad = seguro.cotizaViaje(seguro);
        // mostrar el resultado:
        interfaz.mostrarResultado(seguro, cantidad);
    }
});
//Mensaje que se imprime en el HTML:
Interfaz.prototype.mostrarError = function(mensaje,tipo){
    const div = document.createElement('div');
    if(tipo === 'error'){
        div.classList.add('mensaje', 'error'); //Se crea una clase "mensaje"
    }else{
        div.classList.add('mensaje', 'correcto'); 
    }
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('.form-group'));
    //Eliminar el error de mensaje:
    setTimeout(function(){
        document.querySelector('.mensaje').remove();
    }, 3000);
}

// Cotizar el viaje:
cotizador.prototype.cotizaViaje = function(){
    /*
    1 = 1-4: 1.05
    2 = 5-7: 1.15
    3 = 8-14: 1.35
    4 = 15-20: 1.50 
    */
   let cantidad;
   const base = 100;
   switch(this.personas){
        case '1':
           cantidad = base + 10;
           break;
        case '2':
           cantidad = base*1.674;
           break;
        case '3':
           cantidad = base*1.35;
           break;
        case '4':
            cantidad = base*1.50;     
   }
   // obtener el lugar de origen
   let cantidad2;
   switch(this.origen){
       case '1':
           cantidad2 = cantidad*1;
           break;
        case '2':
            cantidad2 = cantidad*2;
   }
    // obtener el lugar de destino:
    let cantidad3;
    switch(this.viaje){
        case '1':
            cantidad3 = cantidad2 + 5;
            break;
        case '2':
            cantidad3 = cantidad2 + 25;
            break;
        case '3':
            cantidad3 = cantidad2 + 30;
            break;
        case '4':
            cantidad3 = cantidad2 + 60;
            break;
        case '5':
            cantidad3 = cantidad2 + 80;
            break;
        case '6':
            cantidad3 = cantidad2 + 80;
            break;
        case '7':
            cantidad3 = cantidad2 + 90;
            break;
        case '8':
            cantidad3 = cantidad2 + 100;
            break;
        case '9':
            cantidad3 = cantidad2 + 110;
            break;
        case '10':
            cantidad3 = cantidad2 + 115;
            break;
        case '11':
            cantidad3 = cantidad2 + 170;
            break;
        case '12':
            cantidad3 = cantidad2 + 180;
            break;
        case '13':
            cantidad3 = cantidad2 + 200;
            break;
        case '14':
            cantidad3 = cantidad2 + 220;
            break;
        case '15':
            cantidad3 = cantidad2 + 250;
            break;
        case '16':
            cantidad3 = cantidad2 + 260;
            break;
        case '17':
            cantidad3 = cantidad2 + 305;
            break;
        case '18':
            cantidad3 = cantidad2 + 330;
            break;
        case '19':
            cantidad3 = cantidad2 + 370;
            break;
        case '20':
            cantidad3 = cantidad2 + 450;
            break;
        case '21':
            cantidad3 = cantidad2 + 465;
            break;
        case '22':
            cantidad3 = cantidad2 + 515;
            break;
        case '23':
            cantidad3 = cantidad2 + 555;
            break;
        case '24':
            cantidad3 = cantidad2 + 635;
            break;
        case '25':
            cantidad3 = cantidad2 + 730;
            break;
        case '26':
            cantidad3 = cantidad2 + 730;
            break;
        case '27':
            cantidad3 = cantidad2 + 750;
            break;
        case '28':
            cantidad3 = cantidad2 + 1010;
    }    
    
    //Si el seguro es basico, se multiplica por 30% mas
    //Si es completo 50% mas
    let cantidadFinal
  if(this.tipo === 'transfer'){
        cantidadFinal = cantidad3 * 1;
    }else{
        cantidadFinal = cantidad3 * 2;
    }  
    console.log(cantidadFinal);
    return cantidadFinal; 
};
// mostrar el resultado
Interfaz.prototype.mostrarResultado = function (seguro, total){
    const resultado = document.getElementById('resultado');
    // seleccionar el numero de personas:
    let grupo;
    switch(seguro.personas){
        case '1':
            grupo = "1-4";
            break;
        case '2':
            grupo = "5-7";
            break;
        case '3':
            grupo = "8-14";
            break;
        case '4':
            grupo = "15-20";
    }
    // seleccionar el lugar de origen:
    let origen;
    switch(seguro.origen){
        case '1':
            origen = 'CDMX';
            break;
        case '2':
            origen = 'EDOMEX';
    }
    // Seleccionar el lugar de destino:
    let destino;
    switch(seguro.viaje){
        case '1':
            destino = "Tepotzotlan";
            break;
        case '2':
            destino = "La Marquesa";
            break;
        case '3':
            destino = "Teotihuacan";
            break;
        case '4':
            destino = "Toluca";
            break;
        case '5':
            destino = "Tepoztlan";
            break;
        case '6':
            destino = "Ciudad de Mexico";
            break;
        case '7':
            destino = "Ciudad Universitaria y Xochimilco";
            break;
        case '8':
            destino = "Cuernavaca";
            break;
        case '9':
            destino = "Tula";
            break;
        case '10':
            destino = "Pachuca";
            break;
        case '11':
            destino = "Tlaxcala";
            break;
        case '12':
            destino = "Puebla-Centro";
            break;
        case '13':
            destino = "Basilica";
            break;
        case '14':
            destino = "Valle de Bravo";
            break;
        case '15':
            destino = "Taxco";
            break;
        case '16':
            destino = "Mariposa Monarca";
            break;
        case '17':
            destino = "Queretaro";
            break;
        case '18':
            destino = "Puebla-Cholula";
            break;
        case '19':
            destino = "Puebla-Tehuacan";
            break;
        case '20':
            destino = "San Miguel de Allende";
            break;
        case '21':
            destino = "Chilpancingo";
            break;
        case '22':
            destino = "Morelia";
            break;
        case '23':
            destino = "Xalapa";
            break;
        case '24':
            destino = "Guanajuato";
            break;
        case '25':
            destino = "Veracruz";
            break;
        case '26':
            destino = "Acapulco";
            break;
        case '27':
            destino = "San Luis Potosi";
            break;
        case '28':
            destino = "Guadalajara";
    }


    // crear un div
    const div = document.createElement('div');
    //Insertar la informacion:
    div.innerHTML = `
       <p class='header'>Resumen:</p>
       <p>Personas: ${grupo}</p>
       <p>Origen: ${origen}</p>
       <p>Destino: ${destino}</p>
       <p>Tipo de viaje: ${seguro.tipo.toUpperCase()}</p>
       <p>Total: $ ${total.toFixed(2)}</p>
    `
    //Cargar el spinner:
    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    setTimeout(function(){
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 3000);
}