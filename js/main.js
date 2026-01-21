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
    const intereses = {
        3: 0.10,
        6: 0.20,
        12: 0.30
    };

    return intereses[cuotas]
        ? precioBase + (precioBase * intereses[cuotas])
        : null;
}

alert("Bienvenido al concesionario");

const seleccion = parseInt(prompt(mostrarVehiculos()));
let vehiculoElegido = !isNaN(seleccion) && buscarVehiculo(seleccion);

if (!vehiculoElegido) {
    alert("Vehículo no válido");
} else {
    const financiar = confirm("¿Desea financiar el vehículo?");

    if (!financiar) {
        alert(`Compra al contado\nPrecio: $${vehiculoElegido.precio}`);
        console.log("Compra al contado:", vehiculoElegido);
    } else {
        const cuotas = parseInt(prompt("Ingrese cantidad de cuotas (3, 6 o 12):"));
        const precioFinal = calcularPrecioFinal(vehiculoElegido.precio, cuotas);

        if (!precioFinal) {
            alert("Cantidad de cuotas no válida");
        } else {
            alert(`Usted eligió un ${vehiculoElegido.modelo}\nPrecio final: $${precioFinal}`);
            console.log("Compra financiada:", vehiculoElegido, precioFinal);
        }
    }
}



