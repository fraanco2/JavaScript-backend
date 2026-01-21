const vehiculos = [
    {

      id:1,
      modelo:"Peugeot",
      precio:20000,
},
{
    id:2,
    modelo:"Chevrolet",
    precio:12000,
},
{
    id:3,
    modelo:"Fiat",
    precio:8000,
},
{
    id:4,
    modelo:"Volvo",
    precio:25000,
}

]

function mostrarVehiculos() {
    let mensaje = "Vehiculos disponibles:\n";

    for (let i =0;i <vehiculos.length; i++){
        mensaje +=`${vehiculos[i].id}-${vehiculos[i].modelo} ($${vehiculos[i].precio})\n`;
    }

    return mensaje;
}

function buscarVehiculo(id) {
    for (let vehiculo of vehiculos) {
        if (vehiculo.id === id) {
            return vehiculo;
        }
    }
    return null;
}

function calcularPrecioFinal(precioBase, cuotas) {
    let interes = 0;

    if (cuotas === 3) {
        interes = 0.10;
    } else if (cuotas === 6) {
        interes = 0.20;
    } else {
        interes = 0.30;
    }

    return precioBase + (precioBase * interes);
}

alert("Bienvenido al concesionario");

const seleccion = parseInt(prompt(mostrarVehiculos()));
let vehiculoElegido = null;

if (isNaN(seleccion)) {
    alert("Debe ingresar un número válido");
} else {
    vehiculoElegido = buscarVehiculo(seleccion);
}

if (vehiculoElegido) {
    const financiar = confirm("¿Desea financiar el vehículo?");

    if (financiar) {
        const cuotas = parseInt(prompt("Ingrese cantidad de cuotas (3, 6 o 12):"));
        const precioFinal = calcularPrecioFinal(vehiculoElegido.precio, cuotas);

        alert(`Usted eligió un ${vehiculoElegido.modelo}\nPrecio final: $${precioFinal}`);
        console.log("Compra financiada:", vehiculoElegido, precioFinal);
    } else {
        alert(`Compra al contado\nPrecio: $${vehiculoElegido.precio}`);
        console.log("Compra al contado:", vehiculoElegido);
    }
} else {
    alert("Vehículo no válido");
}


